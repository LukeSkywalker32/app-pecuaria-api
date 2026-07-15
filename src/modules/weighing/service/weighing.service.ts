// ========================================
// WEIGHING SERVICE
// ========================================

import type { Prisma } from "@prisma/client";
import { prisma } from "@/config/database";
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
// (GMD depende de comparar com a pesagem anterior, calculado em listByAnimal)
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
   const days = (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24);
   if (days <= 0) return null;
   return Number(((currentWeightKg - previousWeightKg) / days).toFixed(3));
}

// Sincroniza Animal.weightKg com a pesagem mais recente (por DATA da pesagem,
// não por ordem de criação — alguém pode registrar uma pesagem atrasada).
// Se o animal não tem mais nenhuma pesagem (ex.: removeu a única), zera o campo.
// Mesmo padrão de earTagHistory.place()/remove() sincronizando currentEarTag.
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

// Calcula o GMD de cada pesagem em relação à anterior do MESMO animal,
// usando o histórico completo (sem filtros) — se calculássemos só sobre
// um resultado filtrado (ex.: ?dateFrom=...), a pesagem "anterior" podería
// ficar de fora do filtro e o GMD sairia errado ou sempre null.
// Retorna um Map<weighingId, gmd>.
async function buildGmdMap(farmId: string, animalId?: string): Promise<Map<string, number | null>> {
   const allWeighings = await prisma.weighing.findMany({
      where: animalId ? { farmId, animalId } : { farmId },
      select: { id: true, animalId: true, weightKg: true, date: true },
      orderBy: { date: "asc" },
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

class WeighingService {
   /**
    * Registra pesagem de um animal
    * Regras:
    * - Animal deve existir e pertencer à fazenda
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
            date: new Date(data.date),
            notes: data.notes?.trim() ?? null,
            registeredById: userId ?? null,
         },
         select: WEIGHING_SELECT,
      });

      await syncAnimalCurrentWeight(farmId, data.animalId);

      return formatWeighing(weighing);
   }

   /**
    * Lista pesagens da fazenda, com filtros opcionais
    */
   async list(farmId: string, query: ListWeighingQuery): Promise<WeighingResponse[]> {
      const where: Prisma.WeighingWhereInput = { farmId };

      if (query.animalId) where.animalId = query.animalId;
      if (query.dateFrom || query.dateTo) {
         where.date = {};
         if (query.dateFrom) where.date.gte = new Date(query.dateFrom);
         if (query.dateTo) where.date.lte = new Date(query.dateTo);
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
      return formatWeighing(weighing);
   }

   /**
    * Histórico de pesagens de um animal, ordenado por data crescente,
    * com o GMD calculado entre cada pesagem e a anterior.
    * Retorna ordenado do mais recente pro mais antigo (igual às outras listas),
    * mas o GMD é calculado na ordem cronológica antes de inverter.
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

      // Inverte pra manter o padrão de "mais recente primeiro" nas listas do sistema
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
      await this.getById(farmId, id);

      const updateData: Prisma.WeighingUpdateInput = {};
      if (data.weightKg !== undefined) updateData.weightKg = data.weightKg;
      if (data.date !== undefined) updateData.date = new Date(data.date);
      if (data.notes !== undefined) updateData.notes = data.notes?.trim() ?? null;

      const weighing = await prisma.weighing.update({
         where: { id },
         data: updateData,
         select: WEIGHING_SELECT,
      });

      await syncAnimalCurrentWeight(farmId, weighing.animalId);

      return formatWeighing(weighing);
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
