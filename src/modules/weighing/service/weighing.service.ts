// ========================================
// WEIGHING SERVICE
// ========================================
import type { Prisma } from "@prisma/client";
import { prisma } from "@/config/database";
import { daysBetween, toWeighingDate } from "@/shared/utils/dateUtils";
import type {
   CreateWeighingRequest,
   ListWeighingQuery,
   UpdateWeighingRequest,
   WeighingResponse,
} from "../types/weighing.types";
import weighingValidator from "../validator/weighing.validator";

const WEIGHING_SELECT = {
   id: true,
   farmId: true,
   animalId: true,
   weightKg: true,
   date: true,
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
} satisfies Prisma.WeighingSelect;

// Formata um registro cru do Prisma pro shape público, sem calcular GMD ainda
function formatWeighing(w: any, gmd: number | null = null): WeighingResponse {
   const { animal, registeredBy, ...data } = w;
   return {
      ...data,
      animalEarTag: animal?.currentEarTag ?? null,
      animalName: animal?.name ?? null,
      registeredByName: registeredBy?.fullName ?? null,
      gmd,
   };
}

// Calcula o GMD (Ganho Médio Diário, kg/dia) entre duas pesagens consecutivas.
// Retorna null se as datas forem iguais (divisão por zero) ou inválidas.
function calculateGmd(
   currentWeightKg: number,
   currentDate: Date,
   previousWeightKg: number,
   previousDate: Date,
): number | null {
   // usa helper que descarta horário, evitando dias negativos
   // por diferença de minutos/horas no mesmo dia
   const days = daysBetween(previousDate, currentDate);
   if (days <= 0) return null;
   return Number(((currentWeightKg - previousWeightKg) / days).toFixed(3));
}

// Sincroniza Animal.weightKg com a pesagem mais recente
async function syncAnimalCurrentWeight(farmId: string, animalId: string): Promise<void> {
   const latest = await prisma.weighing.findFirst({
      where: { farmId, animalId },
      orderBy: { date: "desc" },
      select: { weightKg: true },
   });
   await prisma.animal.update({
      where: { id: animalId },
      data: { weightKg: latest?.weightKg ?? null },
   });
}

// Calcula o GMD de cada pesagem em relação à anterior do MESMO animal
async function buildGmdMap(farmId: string, animalId?: string): Promise<Map<string, number | null>> {
   const allWeighings = await prisma.weighing.findMany({
      where: animalId ? { farmId, animalId } : { farmId },
      select: { id: true, animalId: true, weightKg: true, date: true },
      orderBy: [{ date: "asc" }, { createdAt: "asc" }],
   });

   const byAnimal = new Map<string, typeof allWeighings>();
   for (const w of allWeighings) {
      const list = byAnimal.get(w.animalId) ?? [];
      list.push(w);
      byAnimal.set(w.animalId, list);
   }

   const gmdMap = new Map<string, number | null>();
   for (const list of byAnimal.values()) {
      list.forEach((w, index) => {
         if (index === 0) {
            gmdMap.set(w.id, null);
            return;
         }
         const previous = list[index - 1];
         gmdMap.set(w.id, calculateGmd(w.weightKg, w.date, previous.weightKg, previous.date));
      });
   }
   return gmdMap;
}

// Retorna o id da primeira (mais antiga) pesagem do animal — mesmo
// critério de ordenação do buildGmdMap (date asc, createdAt asc como
// desempate). É essa pesagem, e só ela, que pode ter peso/data editados;
// as seguintes só podem ser corrigidas apagando e registrando de novo,
// pra não embaralhar a cadeia de cálculo do GMD.
async function getFirstWeighingId(farmId: string, animalId: string): Promise<string | null> {
   const first = await prisma.weighing.findFirst({
      where: { farmId, animalId },
      orderBy: [{ date: "asc" }, { createdAt: "asc" }],
      select: { id: true },
   });
   return first?.id ?? null;
}

class WeighingService {
   /**
    * Registra pesagem de um animal
    */
   async create(
      farmId: string,
      userId: string | undefined,
      data: CreateWeighingRequest,
   ): Promise<WeighingResponse> {
      weighingValidator.validateCreate(data);
      const animal = await prisma.animal.findFirst({
         where: { id: data.animalId, farmId },
      });
      if (!animal) {
         throw Object.assign(new Error("Animal não encontrado nesta fazenda"), {
            statusCode: 404,
         });
      }
      const weighing = await prisma.weighing.create({
         data: {
            farmId,
            animalId: data.animalId,
            weightKg: data.weightKg,
            date: toWeighingDate(data.date),
            notes: data.notes?.trim() ?? null,
            registeredById: userId ?? null,
         },
         select: WEIGHING_SELECT,
      });
      await syncAnimalCurrentWeight(farmId, data.animalId);

      const gmdMap = await buildGmdMap(farmId, data.animalId);
      return formatWeighing(weighing, gmdMap.get(weighing.id) ?? null);
   }

   /**
    * Lista pesagens da fazenda, com filtros opcionais
    */
   async list(farmId: string, query: ListWeighingQuery): Promise<WeighingResponse[]> {
      const where: Prisma.WeighingWhereInput = { farmId };
      if (query.animalId) where.animalId = query.animalId;
      if (query.dateFrom || query.dateTo) {
         where.date = {};
         if (query.dateFrom) where.date.gte = toWeighingDate(query.dateFrom); // ✅
         if (query.dateTo) where.date.lte = toWeighingDate(query.dateTo); // ✅
      }
      const weighings = await prisma.weighing.findMany({
         where,
         select: WEIGHING_SELECT,
         orderBy: { date: "desc" },
      });
      const gmdMap = await buildGmdMap(farmId, query.animalId);
      return weighings.map(w => formatWeighing(w, gmdMap.get(w.id) ?? null));
   }

   /**
    * Busca uma pesagem por id
    */
   async getById(farmId: string, id: string): Promise<WeighingResponse> {
      const weighing = await prisma.weighing.findFirst({
         where: { id, farmId },
         select: WEIGHING_SELECT,
      });
      if (!weighing) {
         throw Object.assign(new Error("Pesagem não encontrada"), { statusCode: 404 });
      }

      const gmdMap = await buildGmdMap(farmId, weighing.animalId);
      return formatWeighing(weighing, gmdMap.get(weighing.id) ?? null);
   }

   /**
    * Histórico de pesagens de um animal
    */
   async listByAnimal(farmId: string, animalId: string): Promise<WeighingResponse[]> {
      const animal = await prisma.animal.findFirst({
         where: { id: animalId, farmId },
      });
      if (!animal) {
         throw Object.assign(new Error("Animal não encontrado"), { statusCode: 404 });
      }
      const weighings = await prisma.weighing.findMany({
         where: { farmId, animalId },
         select: WEIGHING_SELECT,
         orderBy: { date: "asc" },
      });
      const gmdMap = await buildGmdMap(farmId, animalId);
      const withGmd: WeighingResponse[] = weighings.map(w =>
         formatWeighing(w, gmdMap.get(w.id) ?? null),
      );
      return withGmd.reverse();
   }

   /**
    * Atualiza pesagem
    */
   async update(
      farmId: string,
      id: string,
      data: UpdateWeighingRequest,
   ): Promise<WeighingResponse> {
      weighingValidator.validateUpdate(data);
      const current = await this.getById(farmId, id);

      // Só a primeira pesagem do animal pode ter peso/data alterados.
      // Editar uma pesagem no meio do histórico mudaria o GMD de tudo que
      // vem depois dela silenciosamente — a correção segura é apagar e
      // registrar de novo, não editar in-place.
      const isWeightOrDateChange = data.weightKg !== undefined || data.date !== undefined;
      if (isWeightOrDateChange) {
         const firstId = await getFirstWeighingId(farmId, current.animalId);
         if (firstId !== id) {
            throw Object.assign(
               new Error(
                  "Só é possível editar peso e data da primeira pesagem do animal. Para corrigir uma pesagem mais recente, apague o registro e cadastre de novo.",
               ),
               { statusCode: 400 },
            );
         }
      }

      const updateData: Prisma.WeighingUpdateInput = {};
      if (data.weightKg !== undefined) updateData.weightKg = data.weightKg;
      if (data.date !== undefined) updateData.date = toWeighingDate(data.date); // ✅
      if (data.notes !== undefined) updateData.notes = data.notes?.trim() ?? null;
      const weighing = await prisma.weighing.update({
         where: { id },
         data: updateData,
         select: WEIGHING_SELECT,
      });
      await syncAnimalCurrentWeight(farmId, weighing.animalId);

      // ✅ ADICIONADO: retorna com GMD recalculado
      const gmdMap = await buildGmdMap(farmId, weighing.animalId);
      return formatWeighing(weighing, gmdMap.get(weighing.id) ?? null);
   }

   /**
    * Remove registro de pesagem
    */
   async remove(farmId: string, id: string): Promise<void> {
      const existing = await this.getById(farmId, id);
      await prisma.weighing.delete({ where: { id } });
      await syncAnimalCurrentWeight(farmId, existing.animalId);
   }
}

export default new WeighingService();
