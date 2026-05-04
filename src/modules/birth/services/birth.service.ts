// ========================================
// BIRTH SERVICE
// ========================================

import type { Prisma } from "@prisma/client";
import { prisma } from "@/config/database";
import type {
   BirthResponse,
   CreateBirthRequest,
   ListBirthsQuery,
   UpdateBirthRequest,
} from "../types/birth.types";
import birthValidator from "..//validators/birth.validator";

const BIRTH_SELECT = {
   id: true,
   farmId: true,
   damId: true,
   attemptId: true,
   birthDate: true,
   birthTime: true,
   birthType: true,
   situation: true,
   deathReason: true,
   calfGender: true,
   calfWeight: true,
   calfEarTag: true,
   calfChip: true,
   calfStatus: true,
   notes: true,
   veterinarianId: true,
   createdAt: true,
   updatedAt: true,
   dam: {
      select: {
         currentEarTag: true,
         name: true,
      },
   },
   veterinarian: {
      select: {
         fullName: true,
      },
   },
} satisfies Prisma.BirthSelect;

function formatBirth(birth: any, calfAnimalId: string | null = null): BirthResponse {
   const { dam, veterinarian, ...data } = birth;
   return {
      ...data,
      damEarTag: dam?.currentEarTag ?? null,
      damName: dam?.name ?? null,
      veterinarianName: veterinarian?.fullName ?? null,
      calfAnimalId,
   };
}

class BirthService {
   /**
    * Registra um parto
    * Regras:
    * - A mãe deve ser fêmea ativa
    * - Se vinculado a uma tentativa, ela deve estar em andamento ou como prenhe
    * - Se bezerro nasceu morto → cria Mortality automaticamente
    * - Se registerCalfAsAnimal = true e situation = normal → cria Animal automaticamente
    * - Encerra a prenhez ao registrar o parto
    */
   async create(farmId: string, userId: string, data: CreateBirthRequest): Promise<BirthResponse> {
      birthValidator.validateCreate(data);

      // Validar a mãe
      const dam = await prisma.animal.findFirst({
         where: { id: data.damId, farmId },
      });

      if (!dam) {
         throw Object.assign(new Error("Animal mãe não encontrado"), { statusCode: 404 });
      }
      if (dam.gender !== "F") {
         throw Object.assign(new Error("O animal mãe deve ser fêmea"), { statusCode: 400 });
      }
      if (dam.status !== "active") {
         throw Object.assign(
            new Error(`Animal com status ${dam.status} não pode ter parto registrado`),
            { statusCode: 400 },
         );
      }

      // Validar tentativa vinculada (se informada)
      let pregnancyId: string | null = null;
      if (data.attemptId) {
         const attempt = await prisma.attempt.findFirst({
            where: { id: data.attemptId },
            include: { pregnancy: true },
         });

         if (!attempt) {
            throw Object.assign(new Error("Tentativa não encontrada"), { statusCode: 404 });
         }
         if (attempt.pregnancy.farmId !== farmId) {
            throw Object.assign(new Error("Tentativa não pertence a esta fazenda"), {
               statusCode: 403,
            });
         }
         if (attempt.pregnancy.animalId !== data.damId) {
            throw Object.assign(new Error("Tentativa não pertence à mãe informada"), {
               statusCode: 400,
            });
         }

         pregnancyId = attempt.pregnancyId;
      }

      // Validar chip do bezerro — não pode já existir
      if (data.calfChip) {
         const chipExists = await prisma.animal.findFirst({
            where: { chipId: data.calfChip.trim() },
         });
         if (chipExists) {
            throw Object.assign(new Error("Chip do bezerro já cadastrado"), { statusCode: 409 });
         }
      }

      // Validar veterinário (se informado)
      if (data.veterinarianId) {
         const vet = await prisma.user.findFirst({
            where: { id: data.veterinarianId, farmId },
         });
         if (!vet) {
            throw Object.assign(new Error("Veterinário não encontrado nesta fazenda"), {
               statusCode: 404,
            });
         }
      }

      let calfAnimalId: string | null = null;

      const birth = await prisma.$transaction(async tx => {
         // 1. Criar o registro de parto
         const created = await tx.birth.create({
            data: {
               farmId,
               damId: data.damId,
               attemptId: data.attemptId ?? null,
               birthDate: new Date(data.birthDate),
               birthTime: data.birthTime?.trim() ?? null,
               birthType: data.birthType,
               situation: data.situation,
               deathReason: data.deathReason?.trim() ?? null,
               calfGender: data.calfGender ?? null,
               calfWeight: data.calfWeight ?? null,
               calfEarTag: data.calfEarTag?.trim() ?? null,
               calfChip: data.calfChip?.trim() ?? null,
               calfStatus: "pending",
               notes: data.notes?.trim() ?? null,
               veterinarianId: data.veterinarianId ?? null,
            },
            select: BIRTH_SELECT,
         });

         // 2. Encerrar a tentativa e prenhez (se vinculadas)
         if (data.attemptId && pregnancyId) {
            await tx.attempt.update({
               where: { id: data.attemptId },
               data: { attemptStatus: "success" },
            });

            await tx.pregnancy.update({
               where: { id: pregnancyId },
               data: {
                  currentStatus: "failed", // prenhez encerrada — parto ocorreu
                  currentStatusDate: new Date(),
               },
            });
         }

         // 3. Se bezerro nasceu morto → cria Mortality automaticamente
         if (data.situation === "dead") {
            await tx.mortality.create({
               data: {
                  farmId,
                  animalId: data.damId, // referência à mãe, pois bezerro não tem animal cadastrado
                  birthId: created.id,
                  deathDate: new Date(data.birthDate),
                  deathTime: data.birthTime ?? null,
                  deathLocation: dam.pastureName ?? "Não informado",
                  causeOfDeath: data.deathReason ?? "Natimorto",
                  origin: "natimorto",
                  notes: data.notes?.trim() ?? null,
                  registeredById: userId,
               },
            });
         }

         // 4. Se registerCalfAsAnimal = true → cria o bezerro como Animal
         if (data.registerCalfAsAnimal && data.situation === "normal" && data.calfChip) {
            const calf = await tx.animal.create({
               data: {
                  farmId,
                  chipId: data.calfChip.trim(),
                  currentEarTag: data.calfEarTag?.trim() ?? null,
                  name: data.calfEarTag?.trim() ?? `Bezerro(a) de ${dam.name}`,
                  breed: dam.breed,
                  gender: data.calfGender ?? "M",
                  birthDate: new Date(data.birthDate),
                  status: "active",
                  origin: "born",
                  damId: data.damId,
                  pastureId: dam.pastureId,
                  pastureName: dam.pastureName,
               },
            });

            calfAnimalId = calf.id;

            // Incrementa contador do pasto (se a mãe estiver em algum)
            if (dam.pastureId) {
               await tx.pasture.update({
                  where: { id: dam.pastureId },
                  data: { currentAnimals: { increment: 1 } },
               });
            }

            // Marca parto como completo
            await tx.birth.update({
               where: { id: created.id },
               data: { calfStatus: "complete" },
            });
         }

         return created;
      });

      return formatBirth(birth, calfAnimalId);
   }

   /**
    * Lista partos da fazenda com filtros
    */
   async list(farmId: string, query: ListBirthsQuery): Promise<BirthResponse[]> {
      const where: Prisma.BirthWhereInput = { farmId };

      if (query.damId) where.damId = query.damId;
      if (query.situation) where.situation = query.situation;

      if (query.dateFrom || query.dateTo) {
         where.birthDate = {
            ...(query.dateFrom ? { gte: new Date(query.dateFrom) } : {}),
            ...(query.dateTo ? { lte: new Date(query.dateTo) } : {}),
         };
      }

      const births = await prisma.birth.findMany({
         where,
         select: BIRTH_SELECT,
         orderBy: { birthDate: "desc" },
      });

      return births.map(b => formatBirth(b));
   }

   /**
    * Busca parto por ID
    */
   async getById(farmId: string, id: string): Promise<BirthResponse> {
      const birth = await prisma.birth.findFirst({
         where: { id, farmId },
         select: BIRTH_SELECT,
      });

      if (!birth) {
         throw Object.assign(new Error("Parto não encontrado"), { statusCode: 404 });
      }

      return formatBirth(birth);
   }

   /**
    * Histórico de partos de um animal (mãe)
    */
   async listByAnimal(farmId: string, damId: string): Promise<BirthResponse[]> {
      const animal = await prisma.animal.findFirst({
         where: { id: damId, farmId },
      });

      if (!animal) {
         throw Object.assign(new Error("Animal não encontrado"), { statusCode: 404 });
      }

      const births = await prisma.birth.findMany({
         where: { farmId, damId },
         select: BIRTH_SELECT,
         orderBy: { birthDate: "desc" },
      });

      return births.map(b => formatBirth(b));
   }

   /**
    * Atualiza dados de um parto
    */
   async update(farmId: string, id: string, data: UpdateBirthRequest): Promise<BirthResponse> {
      await this.getById(farmId, id);

      birthValidator.validateUpdate(data);

      const updateData: Prisma.BirthUpdateInput = {};

      if (data.birthDate) updateData.birthDate = new Date(data.birthDate);
      if (data.birthTime !== undefined) updateData.birthTime = data.birthTime?.trim() ?? null;
      if (data.birthType) updateData.birthType = data.birthType;
      if (data.situation) updateData.situation = data.situation;
      if (data.deathReason !== undefined) updateData.deathReason = data.deathReason?.trim() ?? null;
      if (data.calfGender !== undefined) updateData.calfGender = data.calfGender;
      if (data.calfWeight !== undefined) updateData.calfWeight = data.calfWeight;
      if (data.calfEarTag !== undefined) updateData.calfEarTag = data.calfEarTag?.trim() ?? null;
      if (data.calfChip !== undefined) updateData.calfChip = data.calfChip?.trim() ?? null;
      if (data.calfStatus) updateData.calfStatus = data.calfStatus;
      if (data.notes !== undefined) updateData.notes = data.notes?.trim() ?? null;
      if (data.veterinarianId !== undefined) {
         updateData.veterinarian = data.veterinarianId
            ? { connect: { id: data.veterinarianId } }
            : { disconnect: true };
      }

      const birth = await prisma.birth.update({
         where: { id },
         data: updateData,
         select: BIRTH_SELECT,
      });

      return formatBirth(birth);
   }

   /**
    * Remove um parto
    * Apenas se o bezerro não foi registrado como animal (calfStatus = pending)
    */
   async remove(farmId: string, id: string): Promise<void> {
      const birth = await this.getById(farmId, id);

      if (birth.calfStatus === "complete") {
         throw Object.assign(
            new Error(
               "Não é possível excluir um parto cujo bezerro já foi registrado como animal. Exclua o animal primeiro.",
            ),
            { statusCode: 400 },
         );
      }

      await prisma.birth.delete({ where: { id } });
   }
}

export default new BirthService();
