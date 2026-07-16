import type { Prisma } from "@prisma/client";
import { prisma } from "@/config/database";
import { calculateAnimalCategory } from "@/shared/utils/animalUtils";
import { toWeighingDate } from "@/shared/utils/dateUtils";
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
   buyerId: true,
   saleDate: true,
   saleNotes: true,
   sireId: true,
   damId: true,
   sireExternalName: true,
   sireExternalChip: true,
   damExternalName: true,
   damExternalChip: true,
   weightKg: true,
   farmId: true,
   createdAt: true,
   updatedAt: true,
} satisfies Prisma.AnimalSelect;

class AnimalService {
   private formatAnimal(animal: any): AnimalResponse {
      const { category, ageMonths } = calculateAnimalCategory(animal.birthDate, animal.gender);
      return {
         ...animal,
         ageInMonths: ageMonths,
         category,
         weightKg: animal.weightKg ?? null,
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
         const earTagNormalized = data.currentEarTag?.trim()
            ? data.currentEarTag.trim().toUpperCase()
            : null;

         const created = await tx.animal.create({
            data: {
               farmId,
               chipId: data.chipId,
               currentEarTag: earTagNormalized,
               name: data.name,
               breed: data.breed,
               gender: data.gender,
               birthDate: new Date(data.birthDate),
               status: initialStatus as any,
               pastureId: data.pastureId,
               pastureName,

               // Peso por Kg
               weightKg: data.weightKg,

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

         // Se o cadastro já veio com brinco, registrar no histórico de brincos
         // para que o módulo de Brincos enxergue esse brinco como ativo.
         // Sem isso, o animal tem currentEarTag preenchido mas o módulo de
         // brincos não tem nenhum registro correspondente (bug reportado).
         if (earTagNormalized) {
            await tx.earTagHistory.create({
               data: {
                  farmId,
                  animalId: created.id,
                  earTagNumber: earTagNormalized,
                  placementDate: new Date(data.birthDate),
                  reason:
                     data.origin === "purchased"
                        ? "Brinco informado na compra do animal"
                        : "Brinco informado no cadastro do animal",
               },
            });
         }

         // Gatilho: Incrementa contador no pasto (se houver)
         if (data.pastureId) {
            await tx.pasture.update({
               where: { id: data.pastureId },
               data: { currentAnimals: { increment: 1 } },
            });
         }

         // Se o cadastro já veio com peso, registrar como a primeira pesagem
         // do animal no módulo de Pesagens.
         if (data.weightKg !== undefined && data.weightKg !== null) {
            await tx.weighing.create({
               data: {
                  farmId,
                  animalId: created.id,
                  weightKg: data.weightKg,
                  // Nascido na fazenda: pesado ao nascer -> usa a data de nascimento.
                  // Comprado: pesado na chegada -> usa a data do cadastro (hoje),
                  // não a data de nascimento estimada do animal.
                  date:
                     data.origin === "born"
                        ? toWeighingDate(data.birthDate)
                        : toWeighingDate(new Date()),
                  notes:
                     data.origin === "purchased"
                        ? "Peso informado na compra do animal"
                        : "Peso informado no cadastro do animal (nascimento)",
               },
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

      // Constrói updateData explicitamente — nunca fazer spread de 'data' diretamente,
      // pois campos como buyerId, sireId, damId são FKs escalares que o Prisma rejeita.
      // Relações devem usar connect/disconnect; campos escalares diretos devem ser listados.
      const updateData: Prisma.AnimalUpdateInput = {};

      // NOTA: currentEarTag NÃO é editável por aqui. A troca de brinco deve
      // passar sempre por earTagHistory.place(), que é a única fonte de
      // verdade do módulo de Brincos. Editar direto aqui foi a causa raiz
      // do bug onde o módulo de Brincos não enxergava brincos cadastrados
      // fora da tela de Brincos.
      //
      // NOTA: weightKg também NÃO é editável por aqui, pelo mesmo motivo.
      // Editar peso deve passar sempre pelo módulo de Pesagens
      // (weighingService.create/update/remove), que é quem sincroniza
      // Animal.weightKg com a pesagem mais recente. Permitir editar aqui
      // direto reabriria o mesmo bug: o campo mudaria sem nenhum registro
      // correspondente na tabela de Pesagens, e o GMD ficaria incorreto.
      if (data.name !== undefined) updateData.name = data.name;
      if (data.breed !== undefined) updateData.breed = data.breed;
      if (data.gender !== undefined) updateData.gender = data.gender;
      if (data.status !== undefined) updateData.status = data.status;
      if (data.birthDate) updateData.birthDate = new Date(data.birthDate);
      if (data.saleDate) updateData.saleDate = new Date(data.saleDate);
      if (data.saleNotes !== undefined) updateData.saleNotes = data.saleNotes;

      // Relações via connect/disconnect
      if (data.buyerId !== undefined) {
         updateData.buyer = data.buyerId ? { connect: { id: data.buyerId } } : { disconnect: true };
      }
      if (data.sireId !== undefined) {
         updateData.sire = data.sireId ? { connect: { id: data.sireId } } : { disconnect: true };
      }
      if (data.damId !== undefined) {
         updateData.dam = data.damId ? { connect: { id: data.damId } } : { disconnect: true };
      }

      // Genealogia externa (campos escalares simples)
      if (data.sireExternalName !== undefined) updateData.sireExternalName = data.sireExternalName;
      if (data.sireExternalChip !== undefined) updateData.sireExternalChip = data.sireExternalChip;
      if (data.damExternalName !== undefined) updateData.damExternalName = data.damExternalName;
      if (data.damExternalChip !== undefined) updateData.damExternalChip = data.damExternalChip;

      // Regra de Negócio: Se mudar para Quarentena ou Tratamento, o pasto pode ser removido
      const animal = await prisma.$transaction(async tx => {
         // Regra de status especial: quarantine e treatment removem o animal do pasto
         // a menos que o usuário informe explicitamente um pastureId de destino
         const isSpecialStatus =
            (data.status as string) === "quarantine" || (data.status as string) === "treatment";
         const isSold = (data.status as string) === "sold";

         // Controle para evitar duplo decrement no pasto de origem
         let originPastureDecremented = false;

         if (isSpecialStatus && data.pastureId === undefined) {
            if (current.pastureId) {
               await tx.pasture.update({
                  where: { id: current.pastureId },
                  data: { currentAnimals: { decrement: 1 } },
               });
               originPastureDecremented = true;
            }
            updateData.pasture = { disconnect: true };
            updateData.pastureName = null;
         }

         // Se mudou de pasto explicitamente (pastureId foi informado) — ignorar se vendido
         if (!isSold && data.pastureId !== undefined && data.pastureId !== current.pastureId) {
            if (current.pastureId && !originPastureDecremented) {
               await tx.pasture.update({
                  where: { id: current.pastureId },
                  data: { currentAnimals: { decrement: 1 } },
               });
               originPastureDecremented = true;
            }
            if (data.pastureId) {
               const pasture = await tx.pasture.findFirst({
                  where: { id: data.pastureId, farmId },
               });
               if (!pasture)
                  throw Object.assign(new Error("Pasto de destino não encontrado"), {
                     statusCode: 404,
                  });

               updateData.pasture = { connect: { id: data.pastureId } };
               updateData.pastureName = pasture.name;
               await tx.pasture.update({
                  where: { id: data.pastureId },
                  data: { currentAnimals: { increment: 1 } },
               });
            } else {
               updateData.pasture = { disconnect: true };
               updateData.pastureName = null;
            }
         }

         // Regra de venda: animal vendido sai do pasto e perde o brinco
         if (isSold) {
            if (current.pastureId && !originPastureDecremented) {
               await tx.pasture.update({
                  where: { id: current.pastureId },
                  data: { currentAnimals: { decrement: 1 } },
               });
            }
            updateData.pasture = { disconnect: true };
            updateData.pastureName = null;

            // Fechar brinco ativo (se houver)
            const brincoAtivo = await tx.earTagHistory.findFirst({
               where: { animalId: id, farmId, removalDate: null },
            });
            if (brincoAtivo) {
               await tx.earTagHistory.update({
                  where: { id: brincoAtivo.id },
                  data: {
                     removalDate: data.saleDate ? new Date(data.saleDate) : new Date(),
                     reason: "Animal vendido",
                  },
               });
               updateData.currentEarTag = null;
            }
         }

         // Regra de morte via edição direta: fechar brinco ativo
         const isDead = (data.status as string) === "dead";
         if (isDead) {
            const brincoAtivo = await tx.earTagHistory.findFirst({
               where: { animalId: id, farmId, removalDate: null },
            });
            if (brincoAtivo) {
               await tx.earTagHistory.update({
                  where: { id: brincoAtivo.id },
                  data: {
                     removalDate: new Date(),
                     reason: "Animal morto",
                  },
               });
               updateData.currentEarTag = null;
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
