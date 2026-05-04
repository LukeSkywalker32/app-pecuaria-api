// ========================================
// MORTALITY SERVICE
// ========================================

import type { MortalitySeverity, Prisma } from "@prisma/client";
import { prisma } from "@/config/database";
import type {
   CreateMortalityRequest,
   ListMortalitiesQuery,
   MortalityResponse,
   UpdateMortalityRequest,
} from "../types/mortality.types";
import mortalityValidator from "../validators/mortality.validator";

const MORTALITY_SELECT = {
   id: true,
   farmId: true,
   animalId: true,
   birthId: true,
   deathDate: true,
   deathTime: true,
   deathLocation: true,
   causeOfDeath: true,
   severity: true,
   necropsy: true,
   disposal: true,
   photos: true,
   origin: true,
   notes: true,
   registeredById: true,
   createdAt: true,
   updatedAt: true,
   animal: {
      select: {
         currentEarTag: true,
         name: true,
      },
   },
   registeredBy: {
      select: {
         fullName: true,
      },
   },
} satisfies Prisma.MortalitySelect;

function formatMortality(m: any): MortalityResponse {
   const { animal, registeredBy, ...data } = m;
   return {
      ...data,
      animalEarTag: animal?.currentEarTag ?? null,
      animalName: animal?.name ?? null,
      registeredByName: registeredBy?.fullName ?? null,
   };
}

class MortalityService {
   /**
    * Registra a morte de um animal
    * Regras:
    * - Animal deve existir e pertencer à fazenda
    * - Animal não pode já estar morto
    * - Animal muda para status "dead" e é removido do pasto
    * - Pasto decrementa contador (se havia pasto)
    */
   async create(
      farmId: string,
      userId: string,
      data: CreateMortalityRequest,
   ): Promise<MortalityResponse> {
      mortalityValidator.validateCreate(data);

      // Validar animal
      const animal = await prisma.animal.findFirst({
         where: { id: data.animalId, farmId },
      });

      if (!animal) {
         throw Object.assign(new Error("Animal não encontrado"), { statusCode: 404 });
      }

      // Animal vendido ou já morto não pode ter mortality nova
      if (animal.status === "dead") {
         throw Object.assign(new Error("Animal já está registrado como morto"), {
            statusCode: 409,
         });
      }

      if (animal.status === "sold") {
         throw Object.assign(new Error("Animal vendido não pode ter registro de morte"), {
            statusCode: 400,
         });
      }

      // Validar birthId (se informado) — deve pertencer à fazenda
      if (data.birthId) {
         const birth = await prisma.birth.findFirst({
            where: { id: data.birthId, farmId },
         });
         if (!birth) {
            throw Object.assign(new Error("Parto não encontrado nesta fazenda"), {
               statusCode: 404,
            });
         }
      }

      const mortality = await prisma.$transaction(async tx => {
         // 1. Criar registro de mortalidade
         const created = await tx.mortality.create({
            data: {
               farmId,
               animalId: data.animalId,
               birthId: data.birthId ?? null,
               deathDate: new Date(data.deathDate),
               deathTime: data.deathTime?.trim() ?? null,
               deathLocation: data.deathLocation.trim(),
               causeOfDeath: data.causeOfDeath.trim(),
               severity: data.severity ?? null,
               necropsy: data.necropsy ?? false,
               disposal: data.disposal?.trim() ?? null,
               photos: data.photos ?? [],
               notes: data.notes?.trim() ?? null,
               origin: data.birthId ? "natimorto" : null,
               registeredById: userId,
            },
            select: MORTALITY_SELECT,
         });

         // 2. Atualizar status do animal para "dead"
         await tx.animal.update({
            where: { id: data.animalId },
            data: {
               status: "dead",
               deathDate: new Date(data.deathDate),
            },
         });

         // 3. Remover animal do pasto e decrementar contador
         if (animal.pastureId) {
            await tx.animal.update({
               where: { id: data.animalId },
               data: {
                  pasture: { disconnect: true },
                  pastureName: null,
               },
            });

            await tx.pasture.update({
               where: { id: animal.pastureId },
               data: { currentAnimals: { decrement: 1 } },
            });
         }

         // 4. Encerrar prenhezes em andamento (se houver)
         // Animal morto não pode estar em prenhez ativa
         await tx.pregnancy.updateMany({
            where: {
               farmId,
               animalId: data.animalId,
               currentStatus: { in: ["not_started", "in_progress", "pregnant"] },
            },
            data: {
               currentStatus: "failed",
               currentStatusDate: new Date(),
            },
         });

         return created;
      });

      return formatMortality(mortality);
   }

   /**
    * Lista mortalidades da fazenda
    */
   async list(farmId: string, query: ListMortalitiesQuery): Promise<MortalityResponse[]> {
      const where: Prisma.MortalityWhereInput = { farmId };

      if (query.dateFrom || query.dateTo) {
         where.deathDate = {
            ...(query.dateFrom ? { gte: new Date(query.dateFrom) } : {}),
            ...(query.dateTo ? { lte: new Date(query.dateTo) } : {}),
         };
      }

      if (query.severity) {
         where.severity = query.severity as MortalitySeverity;
      }

      if (query.necropsy !== undefined) {
         where.necropsy = query.necropsy;
      }

      const mortalities = await prisma.mortality.findMany({
         where,
         select: MORTALITY_SELECT,
         orderBy: { deathDate: "desc" },
      });

      return mortalities.map(formatMortality);
   }

   /**
    * Busca mortalidade por ID
    */
   async getById(farmId: string, id: string): Promise<MortalityResponse> {
      const mortality = await prisma.mortality.findFirst({
         where: { id, farmId },
         select: MORTALITY_SELECT,
      });

      if (!mortality) {
         throw Object.assign(new Error("Registro de mortalidade não encontrado"), {
            statusCode: 404,
         });
      }

      return formatMortality(mortality);
   }

   /**
    * Histórico de mortalidade de um animal
    * (geralmente será 1 registro, mas pode ser mais em caso de correções)
    */
   async listByAnimal(farmId: string, animalId: string): Promise<MortalityResponse[]> {
      const animal = await prisma.animal.findFirst({
         where: { id: animalId, farmId },
      });

      if (!animal) {
         throw Object.assign(new Error("Animal não encontrado"), { statusCode: 404 });
      }

      const mortalities = await prisma.mortality.findMany({
         where: { farmId, animalId },
         select: MORTALITY_SELECT,
         orderBy: { deathDate: "desc" },
      });

      return mortalities.map(formatMortality);
   }

   /**
    * Atualiza dados do registro de mortalidade
    * Não altera o status do animal (já foi marcado como morto no create)
    */
   async update(
      farmId: string,
      id: string,
      data: UpdateMortalityRequest,
   ): Promise<MortalityResponse> {
      await this.getById(farmId, id);

      mortalityValidator.validateUpdate(data);

      const updateData: Prisma.MortalityUpdateInput = {};

      if (data.deathDate) updateData.deathDate = new Date(data.deathDate);
      if (data.deathTime !== undefined) updateData.deathTime = data.deathTime?.trim() ?? null;
      if (data.deathLocation) updateData.deathLocation = data.deathLocation.trim();
      if (data.causeOfDeath) updateData.causeOfDeath = data.causeOfDeath.trim();
      if (data.severity !== undefined) updateData.severity = data.severity;
      if (data.necropsy !== undefined) updateData.necropsy = data.necropsy;
      if (data.disposal !== undefined) updateData.disposal = data.disposal?.trim() ?? null;
      if (data.notes !== undefined) updateData.notes = data.notes?.trim() ?? null;

      const mortality = await prisma.mortality.update({
         where: { id },
         data: updateData,
         select: MORTALITY_SELECT,
      });

      return formatMortality(mortality);
   }

   /**
    * Adiciona fotos ao registro (append — não substitui)
    * Recebe array de URLs já enviadas ao Cloudinary
    */
   async addPhotos(farmId: string, id: string, photoUrls: string[]): Promise<MortalityResponse> {
      const current = await this.getById(farmId, id);

      // Limite de 10 fotos total
      const total = (current.photos?.length ?? 0) + photoUrls.length;
      if (total > 10) {
         throw Object.assign(
            new Error(
               `Limite de 10 fotos atingido. Já existem ${current.photos?.length ?? 0} foto(s).`,
            ),
            { statusCode: 400 },
         );
      }

      const mortality = await prisma.mortality.update({
         where: { id },
         data: {
            photos: {
               push: photoUrls,
               // ↑ Prisma suporta push em arrays PostgreSQL nativamente
            },
         },
         select: MORTALITY_SELECT,
      });

      return formatMortality(mortality);
   }
}

export default new MortalityService();
