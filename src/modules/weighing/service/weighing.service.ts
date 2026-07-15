// WEIGHING SERVICE - PESAGEM SERVICE

import { register } from "node:module";
import type { Prisma } from "@prisma/client";
import { W } from "node_modules/vitest/dist/chunks/worker.d.ZpHpO4yb";
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
function calculateGmg(
   currentWeightKg: number,
   currentDate: Date,
   previousWeightKg: number,
   previousDate: Date,
): number | null {
   const days = (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24);
   if (days <= 0) return null;
   return Number(((currentWeightKg - previousWeightKg) / days).toFixed(3));
}

class WeighingService {
   /**
    * Registra pesagem de um animal
    * Regras:
    *  - Animal deve existir e pertencer a fazenda
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
         throw Object.assign(new Error("Animal não encontrado nessa fazenda"), { statusCode: 404 });
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

      return weighings.map(w => formatWeighing(w));
   }

   /**
    * Busca uma pesagem por id (especifica)
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
         throw Object.assign(new Error("Animal não encontrado nessa fazenda"), { statusCode: 404 });
      }

      const weighings = await prisma.weighing.findMany({
         where: { animalId, farmId },
         select: WEIGHING_SELECT,
         orderBy: { date: "desc" },
      });

      const withGmd: WeighingResponse[] = weighings.map((w, index) => {
         if (index === 0) return formatWeighing(w, null);
         const previous = weighings[index - 1];
         const gmd = calculateGmg(w.weightKg, w.date, previous.weightKg, previous.date);
         return formatWeighing(w, gmd);
      });
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
      return formatWeighing(weighing);
   }

   /**
    * Remove registro de pesagem
    */
   async remove(farmId: string, id: string): Promise<void> {
      await this.getById(farmId, id);
      await prisma.weighing.delete({ where: { id } });
   }
}

export default new WeighingService();
