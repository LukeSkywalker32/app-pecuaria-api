import type { Prisma } from "@prisma/client";
import { prisma } from "@/config/database";
import { calculateAnimalUA } from "@/shared/utils/animalUtils";
import type {
   AnimalResponse,
   CreateAnimalRequest,
   ListAnimalsQuery,
   UpdateAnimalRequest,
} from "../types/animal.types";
import animalValidator from "../validators/animal.validator";

const ANIMAL_SELECT = {
   id: true,
   chipId: true,
   currentEarTag: true,
   name: true,
   breed: true,
   gender: true,
   birthDate: true,
   status: true,
   pastureId: true,
   pastureName: true,
   sireId: true,
   damId: true,
   sireExternalName: true,
   sireExternalChip: true,
   damExternalName: true,
   damExternalChip: true,
   farmId: true,
   createdAt: true,
   updatedAt: true,
} satisfies Prisma.AnimalSelect;

class AnimalService {
   private formatAnimal(animal: any): AnimalResponse {
      const { ua, category, ageMonths } = calculateAnimalUA(animal.birthDate, animal.gender);
      return {
         ...animal,
         ageInMonths: ageMonths,
         category,
         uaValue: ua,
      };
   }

   async create(farmId: string, data: CreateAnimalRequest): Promise<AnimalResponse> {
      animalValidator.validateCreate(data);
      // Verifica se chipId já existe
      const existing = await prisma.animal.findUnique({
         where: { chipId: data.chipId },
      });

      if (existing) {
         throw Object.assign(new Error("Chip ID já cadastrado"), { statusCode: 409 });
      }

      // Regra de Pasto: Nascidos (born) obrigatoriamente tem pasto. Comprados (purchased) podem entrar em quarentena sem pasto.
      const isBorn = data.origin === "born";
      if (isBorn && !data.pastureId) {
         throw Object.assign(new Error("Pasto é obrigatório para animais nascidos na fazenda"), {
            statusCode: 400,
         });
      }

      let pastureName = null;
      if (data.pastureId) {
         const pasture = await prisma.pasture.findFirst({
            where: { id: data.pastureId, farmId },
         });
         if (!pasture) throw Object.assign(new Error("Pasto não encontrado"), { statusCode: 404 });
         pastureName = pasture.name;
      }

      // Define status inicial: Comprados sem pasto entram em quarentena por padrão
      const initialStatus =
         data.status || (!data.pastureId && data.origin === "purchased" ? "quarantine" : "active");

      const animal = await prisma.$transaction(async tx => {
         const created = await tx.animal.create({
            data: {
               farmId,
               chipId: data.chipId,
               currentEarTag: data.currentEarTag,
               name: data.name,
               breed: data.breed,
               gender: data.gender,
               birthDate: new Date(data.birthDate),
               status: initialStatus as any,
               pastureId: data.pastureId,
               pastureName,
               // Genealogia interna
               sireId: data.sireId,
               damId: data.damId,
               // Genealogia externa
               sireExternalName: data.sireExternalName,
               sireExternalChip: data.sireExternalChip,
               damExternalName: data.damExternalName,
               damExternalChip: data.damExternalChip,
            },
            select: ANIMAL_SELECT,
         });

         // Gatilho: Incrementa contador no pasto (se houver)
         if (data.pastureId) {
            await tx.pasture.update({
               where: { id: data.pastureId },
               data: { currentAnimals: { increment: 1 } },
            });
         }

         return created;
      });

      return this.formatAnimal(animal);
   }

   async list(farmId: string, query: ListAnimalsQuery): Promise<AnimalResponse[]> {
      const where: Prisma.AnimalWhereInput = { farmId };

      if (query.status) where.status = query.status;
      if (query.gender) where.gender = query.gender;
      if (query.pastureId) where.pastureId = query.pastureId;
      if (query.search) {
         where.OR = [
            { name: { contains: query.search, mode: "insensitive" } },
            { chipId: { contains: query.search, mode: "insensitive" } },
            { currentEarTag: { contains: query.search, mode: "insensitive" } },
         ];
      }

      const animals = await prisma.animal.findMany({
         where,
         select: ANIMAL_SELECT,
         orderBy: { name: "asc" },
      });

      return animals.map(a => this.formatAnimal(a));
   }

   async findById(farmId: string, id: string): Promise<AnimalResponse> {
      const animal = await prisma.animal.findFirst({
         where: { id, farmId },
         select: ANIMAL_SELECT,
      });

      if (!animal) throw Object.assign(new Error("Animal não encontrado"), { statusCode: 404 });
      return this.formatAnimal(animal);
   }

   async update(farmId: string, id: string, data: UpdateAnimalRequest): Promise<AnimalResponse> {
      animalValidator.validateUpdate(data);
      const current = await this.findById(farmId, id);

      const updateData: Prisma.AnimalUpdateInput = { ...data } as any;
      if (data.birthDate) updateData.birthDate = new Date(data.birthDate);

      // Regra de Negócio: Se mudar para Quarentena ou Tratamento, o pasto pode ser removido
      const animal = await prisma.$transaction(async tx => {
         // Regra de status especial: quarantine e treatment removem o animal do pasto
         // a menos que o usuário informe explicitamente um pastureId de destino
         const isSpecialStatus =
            (data.status as string) === "quarantine" || (data.status as string) === "treatment";
         if (isSpecialStatus && data.pastureId === undefined) {
            // Remove o animal do pasto atual
            if (current.pastureId) {
               await tx.pasture.update({
                  where: { id: current.pastureId },
                  data: { currentAnimals: { decrement: 1 } },
               });
            }
            // Preciso desconectar o pastureId antes de remover o animal
            updateData.pasture = { disconnect: true };
            updateData.pastureName = null;
         }
         // Se mudou de pasto explicitamente (pastureId foi informado)
         if (data.pastureId !== undefined && data.pastureId !== current.pastureId) {
            if (current.pastureId) {
               await tx.pasture.update({
                  where: { id: current.pastureId },
                  data: { currentAnimals: { decrement: 1 } },
               });
            }
            if (data.pastureId) {
               const pasture = await tx.pasture.findFirst({
                  where: { id: data.pastureId, farmId },
               });
               if (!pasture)
                  throw Object.assign(new Error("Pasto de destino não encontrado"), {
                     statusCode: 404,
                  });

               updateData.pastureName = pasture.name;
               await tx.pasture.update({
                  where: { id: data.pastureId },
                  data: { currentAnimals: { increment: 1 } },
               });
            } else {
               updateData.pastureName = null;
            }
         }

         return await tx.animal.update({
            where: { id },
            data: updateData,
            select: ANIMAL_SELECT,
         });
      });

      return this.formatAnimal(animal);
   }

   async remove(farmId: string, id: string): Promise<void> {
      const animal = await this.findById(farmId, id);

      await prisma.$transaction(async tx => {
         // Gatilho: Decrementa contador no pasto se o animal estiver em um
         if (animal.pastureId) {
            await tx.pasture.update({
               where: { id: animal.pastureId },
               data: { currentAnimals: { decrement: 1 } },
            });
         }

         await tx.animal.delete({
            where: { id },
         });
      });
   }
}

export default new AnimalService();
