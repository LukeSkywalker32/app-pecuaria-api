// ========================================
// ESTRUS SERVICE (CIO)
// ========================================

import type { EstrusIntensity, Prisma } from "@prisma/client";
import { prisma } from "@/config/database";
import type {
   CreateEstrusRequest,
   EstrusResponse,
   ListEstrusQuery,
   UpdateEstrusRequest,
} from "../types/estrus.types";
import estrusValidator from "../validators/estrus.validator";

const ESTRUS_SELECT = {
   id: true,
   farmId: true,
   animalId: true,
   date: true,
   intensity: true,
   nextEstrus: true,
   notes: true,
   detectedById: true,
   createdAt: true,
   updatedAt: true,
   animal: {
      select: {
         currentEarTag: true,
         name: true,
      },
   },
   detectedBy: {
      select: {
         fullName: true,
      },
   },
} satisfies Prisma.EstrusSelect;

function calcNextEstrus(date: Date): Date {
   const next = new Date(date);
   next.setDate(next.getDate() + 21);
   return next;
}

function formatEstrus(estrus: any): EstrusResponse {
   const { animal, detectedBy, ...data } = estrus;
   return {
      ...data,
      animalEarTag: animal?.currentEarTag ?? null,
      animalName: animal?.name ?? null,
      detectedByName: detectedBy?.fullName ?? null,
   };
}

class EstrusService {
   /**
    * Registra um novo CIO
    */
   async create(
      farmId: string,
      userId: string,
      data: CreateEstrusRequest,
   ): Promise<EstrusResponse> {
      estrusValidator.validateCreate(data);

      const animal = await prisma.animal.findFirst({
         where: { id: data.animalId, farmId },
      });

      if (!animal) {
         throw Object.assign(new Error("Animal não encontrado"), { statusCode: 404 });
      }

      if (animal.gender !== "F") {
         throw Object.assign(new Error("CIO só pode ser registrado em fêmeas"), {
            statusCode: 400,
         });
      }

      if (animal.status !== "active") {
         throw Object.assign(
            new Error(`Animal não pode registrar CIO com status: ${animal.status}`),
            { statusCode: 400 },
         );
      }

      const date = new Date(data.date);
      const nextEstrus = calcNextEstrus(date);

      const estrus = await prisma.estrus.create({
         data: {
            farmId,
            animalId: data.animalId,
            date,
            intensity: data.intensity,
            nextEstrus,
            notes: data.notes?.trim() ?? null,
            detectedById: userId,
         },
         select: ESTRUS_SELECT,
      });

      return formatEstrus(estrus);
   }

   /**
    * Lista CIOs da fazenda com filtros
    */
   async list(farmId: string, query: ListEstrusQuery): Promise<EstrusResponse[]> {
      const where: Prisma.EstrusWhereInput = { farmId };

      if (query.animalId) {
         where.animalId = query.animalId;
      }

      if (query.intensity) {
         where.intensity = query.intensity as EstrusIntensity;
      }

      // Filtros de data — combinados corretamente
      if (query.dateFrom || query.dateTo) {
         where.date = {
            ...(query.dateFrom ? { gte: new Date(query.dateFrom) } : {}),
            ...(query.dateTo ? { lte: new Date(query.dateTo) } : {}),
         };
      }

      // CIOs esperados nos próximos 7 dias
      if (query.upcoming) {
         const hoje = new Date();
         const em7Dias = new Date();
         em7Dias.setDate(hoje.getDate() + 7);

         where.nextEstrus = { gte: hoje, lte: em7Dias };
      }

      const estrus = await prisma.estrus.findMany({
         where,
         select: ESTRUS_SELECT,
         orderBy: { date: "desc" },
      });

      return estrus.map(formatEstrus);
   }

   /**
    * Busca CIO por ID
    */
   async getById(farmId: string, id: string): Promise<EstrusResponse> {
      const estrus = await prisma.estrus.findFirst({
         where: { id, farmId },
         select: ESTRUS_SELECT,
      });

      if (!estrus) {
         throw Object.assign(new Error("Registro de CIO não encontrado"), { statusCode: 404 });
      }

      return formatEstrus(estrus);
   }

   /**
    * Histórico de CIOs de um animal
    */
   async listByAnimal(farmId: string, animalId: string): Promise<EstrusResponse[]> {
      const animal = await prisma.animal.findFirst({
         where: { id: animalId, farmId },
      });

      if (!animal) {
         throw Object.assign(new Error("Animal não encontrado"), { statusCode: 404 });
      }

      const estrus = await prisma.estrus.findMany({
         where: { farmId, animalId },
         select: ESTRUS_SELECT,
         orderBy: { date: "desc" },
      });

      return estrus.map(formatEstrus);
   }

   /**
    * Atualiza CIO existente
    */
   async update(farmId: string, id: string, data: UpdateEstrusRequest): Promise<EstrusResponse> {
      await this.getById(farmId, id);

      estrusValidator.validateUpdate(data);

      const updateData: Prisma.EstrusUpdateInput = {};

      if (data.intensity) updateData.intensity = data.intensity;

      if (data.notes !== undefined) {
         updateData.notes = data.notes?.trim() ?? null;
      }

      // Se data mudou, recalcula nextEstrus automaticamente
      if (data.date) {
         const novaData = new Date(data.date);
         updateData.date = novaData;
         updateData.nextEstrus = calcNextEstrus(novaData);
      }

      const estrus = await prisma.estrus.update({
         where: { id },
         data: updateData,
         select: ESTRUS_SELECT,
      });

      return formatEstrus(estrus);
   }

   /**
    * CIOs esperados nos próximos X dias — para o dashboard
    */
   async getUpcoming(farmId: string, dias = 7): Promise<EstrusResponse[]> {
      const hoje = new Date();
      const limite = new Date();
      limite.setDate(hoje.getDate() + dias);

      const estrus = await prisma.estrus.findMany({
         where: {
            farmId,
            nextEstrus: { gte: hoje, lte: limite },
         },
         select: ESTRUS_SELECT,
         orderBy: { nextEstrus: "asc" },
      });

      return estrus.map(formatEstrus);
   }
}

export default new EstrusService();
