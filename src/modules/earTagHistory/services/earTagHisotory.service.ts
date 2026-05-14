// ========================================
// EAR TAG HISTORY SERVICE
// ========================================

import type { Prisma } from "@prisma/client";
import { prisma } from "@/config/database";
import type {
   EarTagHistoryResponse,
   ListEarTagsQuery,
   PlaceEarTagRequest,
   RemoveEarTagRequest,
} from "../types/eartaghistory.types";
import earTagValidator from "../validators/eartaghistory.validator";

const EAR_TAG_SELECT = {
   id: true,
   farmId: true,
   animalId: true,
   earTagNumber: true,
   placementDate: true,
   removalDate: true,
   reason: true,
   createdAt: true,
   animal: {
      select: {
         name: true,
         currentEarTag: true,
      },
   },
} satisfies Prisma.EarTagHistorySelect;

function formatRecord(record: any): EarTagHistoryResponse {
   const { animal, ...data } = record;
   return {
      ...data,
      animalName: animal?.name ?? null,
      animalEarTag: animal?.currentEarTag ?? null,
      isActive: record.removalDate === null,
   };
}

class EarTagService {
   /**
    * Registra colocação de novo brinco em um animal.
    * Regras de negócio:
    * - Animal deve existir na fazenda e não pode estar morto/vendido
    * - Se o animal já possui brinco ativo, ele é fechado automaticamente
    *   (removalDate = placementDate do novo, reason = "Substituído")
    * - Atualiza animal.currentEarTag com o novo número
    */
   async place(farmId: string, data: PlaceEarTagRequest): Promise<EarTagHistoryResponse> {
      earTagValidator.validatePlace(data);

      // Valida animal
      const animal = await prisma.animal.findFirst({
         where: { id: data.animalId, farmId },
      });

      if (!animal) {
         throw Object.assign(new Error("Animal não encontrado"), { statusCode: 404 });
      }

      if (animal.status === "dead") {
         throw Object.assign(new Error("Não é possível registrar brinco em animal morto"), {
            statusCode: 400,
         });
      }

      if (animal.status === "sold") {
         throw Object.assign(new Error("Não é possível registrar brinco em animal vendido"), {
            statusCode: 400,
         });
      }

      const novaData = new Date(data.placementDate);

      const record = await prisma.$transaction(async tx => {
         // Fecha o brinco ativo atual (se houver)
         const ativoAtual = await tx.earTagHistory.findFirst({
            where: {
               animalId: data.animalId,
               farmId,
               removalDate: null,
            },
         });

         if (ativoAtual) {
            await tx.earTagHistory.update({
               where: { id: ativoAtual.id },
               data: {
                  removalDate: novaData,
                  reason: ativoAtual.reason
                     ? `${ativoAtual.reason} — Substituído`
                     : "Substituído por novo brinco",
               },
            });
         }

         // Cria o novo registro
         const created = await tx.earTagHistory.create({
            data: {
               farmId,
               animalId: data.animalId,
               earTagNumber: data.earTagNumber.trim().toUpperCase(),
               placementDate: novaData,
               reason: data.reason?.trim() ?? null,
            },
            select: EAR_TAG_SELECT,
         });

         // Atualiza currentEarTag do animal
         await tx.animal.update({
            where: { id: data.animalId },
            data: { currentEarTag: data.earTagNumber.trim().toUpperCase() },
         });

         return created;
      });

      return formatRecord(record);
   }

   /**
    * Registra remoção de brinco.
    * Regras:
    * - O registro deve existir e pertencer à fazenda
    * - O brinco deve estar ativo (sem removalDate)
    * - Se o brinco removido é o currentEarTag do animal, limpa o campo
    */
   async markRemoved(
      farmId: string,
      id: string,
      data: RemoveEarTagRequest,
   ): Promise<EarTagHistoryResponse> {
      earTagValidator.validateRemove(data);

      const existing = await this.getById(farmId, id);

      if (existing.removalDate !== null) {
         throw Object.assign(new Error("Este brinco já foi removido anteriormente"), {
            statusCode: 400,
         });
      }

      const record = await prisma.$transaction(async tx => {
         const updated = await tx.earTagHistory.update({
            where: { id },
            data: {
               removalDate: new Date(data.removalDate),
               reason: data.reason?.trim() ?? existing.reason,
            },
            select: EAR_TAG_SELECT,
         });

         // Se era o brinco ativo no animal, limpa currentEarTag
         const animal = await tx.animal.findUnique({
            where: { id: existing.animalId },
            select: { currentEarTag: true },
         });

         if (animal?.currentEarTag === existing.earTagNumber) {
            await tx.animal.update({
               where: { id: existing.animalId },
               data: { currentEarTag: null },
            });
         }

         return updated;
      });

      return formatRecord(record);
   }

   /**
    * Lista histórico de brincos de um animal específico
    */
   async listByAnimal(farmId: string, animalId: string): Promise<EarTagHistoryResponse[]> {
      const animal = await prisma.animal.findFirst({
         where: { id: animalId, farmId },
      });

      if (!animal) {
         throw Object.assign(new Error("Animal não encontrado"), { statusCode: 404 });
      }

      const records = await prisma.earTagHistory.findMany({
         where: { animalId, farmId },
         select: EAR_TAG_SELECT,
         orderBy: { placementDate: "desc" },
      });

      return records.map(formatRecord);
   }

   /**
    * Lista todos os brincos da fazenda com filtros opcionais
    */
   async list(farmId: string, query: ListEarTagsQuery): Promise<EarTagHistoryResponse[]> {
      const where: Prisma.EarTagHistoryWhereInput = { farmId };

      if (query.animalId) {
         where.animalId = query.animalId;
      }

      if (query.activeOnly) {
         where.removalDate = null;
      }

      const records = await prisma.earTagHistory.findMany({
         where,
         select: EAR_TAG_SELECT,
         orderBy: { placementDate: "desc" },
      });

      return records.map(formatRecord);
   }

   /**
    * Busca registro por ID
    */
   async getById(farmId: string, id: string): Promise<EarTagHistoryResponse> {
      const record = await prisma.earTagHistory.findFirst({
         where: { id, farmId },
         select: EAR_TAG_SELECT,
      });

      if (!record) {
         throw Object.assign(new Error("Registro de brinco não encontrado"), { statusCode: 404 });
      }

      return formatRecord(record);
   }

   /**
    * Remove permanentemente um registro do histórico.
    * Regra: só permitido se o brinco JÁ foi removido (removalDate não é null).
    * Para corrigir erros em brincos ativos, use markRemoved primeiro.
    */
   async deleteRecord(farmId: string, id: string): Promise<void> {
      const record = await this.getById(farmId, id);

      if (record.isActive) {
         throw Object.assign(
            new Error(
               "Não é possível excluir um brinco ativo. Registre a remoção antes de excluir.",
            ),
            { statusCode: 400 },
         );
      }

      await prisma.earTagHistory.delete({ where: { id } });
   }
}

export default new EarTagService();
