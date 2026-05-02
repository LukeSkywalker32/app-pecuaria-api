// ========================================
// PREGNANCY SERVICE
// ========================================

import type { PregnancyStatus, Prisma } from "@prisma/client";
import { prisma } from "@/config/database";
import type {
   AttemptResponse,
   CreateAttemptRequest,
   CreatePregnancyRequest,
   CreateUltrasoundRequest,
   ListPregnanciesQuery,
   PregnancyResponse,
   UltrasoundResponse,
} from "../types/pregnancy.types";
import pregnancyValidator from "../validators/pregnancy.validator";

// Período fértil em dias após cobertura
// Se resultado VAZIA vier dentro desse período, nova tentativa
// Se vier fora, animal volta ao CIO
const PERIODO_FERTIL_DIAS = 21;

// Calcula data estimada de parto: cobertura + 283 dias
function calcDataPartoPrevista(matingDate: Date): Date {
   const parto = new Date(matingDate);
   parto.setDate(parto.getDate() + 283);
   return parto;
}

// Verifica se ainda está dentro do período fértil
function dentroPeríodoFertil(matingDate: Date): boolean {
   const diasPassados = Math.floor((Date.now() - matingDate.getTime()) / (1000 * 60 * 60 * 24));
   return diasPassados <= PERIODO_FERTIL_DIAS;
}

// ─── Seletores ───
const ULTRASOUND_SELECT = {
   id: true,
   attemptId: true,
   days: true,
   result: true,
   notes: true,
   ultrasoundDate: true,
   veterinarianId: true,
   createdAt: true,
   veterinarian: { select: { fullName: true } },
} satisfies Prisma.UltrasoundSelect;

const ATTEMPT_SELECT = {
   id: true,
   pregnancyId: true,
   number: true,
   matingDate: true,
   matingType: true,
   bullId: true,
   semenName: true,
   technician: true,
   estimatedBirthDate: true,
   attemptStatus: true,
   notes: true,
   createdAt: true,
   bull: { select: { currentEarTag: true } },
   ultrasounds: { select: ULTRASOUND_SELECT, orderBy: { days: "asc" as const } },
} satisfies Prisma.AttemptSelect;

const PREGNANCY_SELECT = {
   id: true,
   farmId: true,
   animalId: true,
   currentStatus: true,
   currentStatusDate: true,
   createdAt: true,
   updatedAt: true,
   animal: { select: { currentEarTag: true, name: true } },
   attempts: { select: ATTEMPT_SELECT, orderBy: { number: "asc" as const } },
} satisfies Prisma.PregnancySelect;

// ─── Formatadores ───
function formatUltrasound(u: any): UltrasoundResponse {
   return {
      id: u.id,
      attemptId: u.attemptId,
      days: u.days,
      result: u.result,
      notes: u.notes,
      ultrasoundDate: u.ultrasoundDate,
      veterinarianId: u.veterinarianId,
      veterinarianName: u.veterinarian?.fullName ?? null,
      createdAt: u.createdAt,
   };
}

function formatAttempt(a: any): AttemptResponse {
   return {
      id: a.id,
      pregnancyId: a.pregnancyId,
      number: a.number,
      matingDate: a.matingDate,
      matingType: a.matingType,
      bullId: a.bullId,
      bullEarTag: a.bull?.currentEarTag ?? null,
      semenName: a.semenName,
      technician: a.technician,
      estimatedBirthDate: a.estimatedBirthDate,
      attemptStatus: a.attemptStatus,
      notes: a.notes,
      ultrasounds: (a.ultrasounds ?? []).map(formatUltrasound),
      createdAt: a.createdAt,
   };
}

function formatPregnancy(p: any): PregnancyResponse {
   return {
      id: p.id,
      farmId: p.farmId,
      animalId: p.animalId,
      animalEarTag: p.animal?.currentEarTag ?? null,
      animalName: p.animal?.name ?? null,
      currentStatus: p.currentStatus,
      currentStatusDate: p.currentStatusDate,
      totalAttempts: p.attempts?.length ?? 0,
      attempts: (p.attempts ?? []).map(formatAttempt),
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
   };
}

class PregnancyService {
   /**
    * Inicia uma nova prenhez para o animal
    * Regra: animal não pode ter outra prenhez em andamento
    */
   async create(farmId: string, data: CreatePregnancyRequest): Promise<PregnancyResponse> {
      pregnancyValidator.validateCreatePregnancy(data);

      // Verificar se animal existe e é fêmea
      const animal = await prisma.animal.findFirst({
         where: { id: data.animalId, farmId },
      });

      if (!animal) {
         throw Object.assign(new Error("Animal não encontrado"), { statusCode: 404 });
      }

      if (animal.gender !== "F") {
         throw Object.assign(new Error("Apenas fêmeas podem ter prenhez registrada"), {
            statusCode: 400,
         });
      }

      if (animal.status !== "active") {
         throw Object.assign(
            new Error(`Animal com status ${animal.status} não pode iniciar prenhez`),
            { statusCode: 400 },
         );
      }

      // Verifica se já há prenhez em andamento
      const prenhezeEmAndamento = await prisma.pregnancy.findFirst({
         where: {
            farmId,
            animalId: data.animalId,
            currentStatus: { in: ["in_progress", "pregnant"] },
         },
      });

      if (prenhezeEmAndamento) {
         throw Object.assign(new Error("Animal já possui prenhez em andamento"), {
            statusCode: 409,
         });
      }

      const pregnancy = await prisma.pregnancy.create({
         data: {
            farmId,
            animalId: data.animalId,
            currentStatus: "not_started",
            currentStatusDate: new Date(),
         },
         select: PREGNANCY_SELECT,
      });

      return formatPregnancy(pregnancy);
   }

   /**
    * Registra cobertura (MONTA ou IA) — inicia uma tentativa
    * Uma prenhez pode ter várias tentativas se der vazia
    */
   async registerAttempt(
      farmId: string,
      pregnancyId: string,
      data: CreateAttemptRequest,
   ): Promise<PregnancyResponse> {
      pregnancyValidator.validateCreateAttempt(data);

      const pregnancy = await this.getById(farmId, pregnancyId);

      // Só pode registrar cobertura se não estiver já prenha
      if (pregnancy.currentStatus === "pregnant") {
         throw Object.assign(
            new Error("Animal já está prenha — não é possível registrar nova cobertura"),
            { statusCode: 400 },
         );
      }

      // Se houver tentativa em andamento, encerra antes de criar nova
      const tentativaEmAndamento = await prisma.attempt.findFirst({
         where: { pregnancyId, attemptStatus: "in_progress" },
      });

      if (tentativaEmAndamento) {
         throw Object.assign(
            new Error(
               "Já existe cobertura em andamento. Registre o ultrassom antes de nova cobertura.",
            ),
            { statusCode: 400 },
         );
      }

      // Valida touro (se MONTA)
      if (data.bullId) {
         const touro = await prisma.animal.findFirst({
            where: { id: data.bullId, farmId, gender: "M" },
         });

         if (!touro) {
            throw Object.assign(new Error("Touro não encontrado na fazenda"), { statusCode: 404 });
         }
      }

      // Número da tentativa = total existente + 1
      const totalTentativas = await prisma.attempt.count({ where: { pregnancyId } });

      const matingDate = new Date(data.matingDate);
      const estimatedBirthDate = calcDataPartoPrevista(matingDate);

      await prisma.$transaction(async tx => {
         // Cria a tentativa
         await tx.attempt.create({
            data: {
               pregnancyId,
               number: totalTentativas + 1,
               matingDate,
               matingType: data.matingType,
               bullId: data.bullId ?? null,
               semenName: data.semenName?.trim() ?? null,
               technician: data.technician?.trim() ?? null,
               estimatedBirthDate,
               attemptStatus: "in_progress",
               notes: data.notes?.trim() ?? null,
            },
         });

         // Atualiza status da prenhez para in_progress
         await tx.pregnancy.update({
            where: { id: pregnancyId },
            data: {
               currentStatus: "in_progress",
               currentStatusDate: new Date(),
            },
         });

         // Atualiza status reprodutivo do animal
         await tx.animal.update({
            where: { id: pregnancy.animalId },
            data: { status: "active" },
         });
      });

      return this.getById(farmId, pregnancyId);
   }

   /**
    * Registra resultado de ultrassom
    * Aplica as regras de negócio:
    *  - PREGNANT → continua o ciclo
    *  - EMPTY dentro do período fértil → encerra tentativa, aguarda nova cobertura
    *  - EMPTY fora do período fértil → encerra prenhez, animal volta ao CIO
    *  - VIABLE → prenhez confirmada, aguarda parto
    *  - ABSORPTION → encerra tentativa, aguarda nova cobertura
    */
   async registerUltrasound(
      farmId: string,
      pregnancyId: string,
      data: CreateUltrasoundRequest,
   ): Promise<PregnancyResponse> {
      pregnancyValidator.validateCreateUltrasound(data);

      await this.getById(farmId, pregnancyId);

      // Busca tentativa em andamento
      const tentativa = await prisma.attempt.findFirst({
         where: { pregnancyId, attemptStatus: "in_progress" },
         include: { ultrasounds: true },
      });

      if (!tentativa) {
         throw Object.assign(new Error("Nenhuma cobertura em andamento para registrar ultrassom"), {
            statusCode: 400,
         });
      }

      // Impede registrar ultrassom duplicado para o mesmo número de dias
      const jaExiste = tentativa.ultrasounds.some(u => u.days === data.days);
      if (jaExiste) {
         throw Object.assign(
            new Error(`Ultrassom de ${data.days} dias já registrado nesta tentativa`),
            { statusCode: 409 },
         );
      }

      await prisma.$transaction(async tx => {
         // Registra o ultrassom
         await tx.ultrasound.create({
            data: {
               attemptId: tentativa.id,
               days: data.days,
               result: data.result,
               ultrasoundDate: new Date(data.ultrasoundDate),
               notes: data.notes?.trim() ?? null,
               veterinarianId: data.veterinarianId ?? null,
            },
         });

         // Aplica regras de negócio conforme resultado
         if (data.result === "PREGNANT") {
            // Continua em andamento — apenas confirma prenhez provisoriamente
            await tx.pregnancy.update({
               where: { id: pregnancyId },
               data: {
                  currentStatus: "pregnant",
                  currentStatusDate: new Date(),
               },
            });
         } else if (data.result === "VIABLE") {
            // Ultrassom final — prenhez confirmada, aguarda parto
            await tx.attempt.update({
               where: { id: tentativa.id },
               data: { attemptStatus: "success" },
            });

            await tx.pregnancy.update({
               where: { id: pregnancyId },
               data: {
                  currentStatus: "pregnant",
                  currentStatusDate: new Date(),
               },
            });
         } else if (data.result === "EMPTY" || data.result === "ABSORPTION") {
            // Encerra a tentativa atual como falha
            await tx.attempt.update({
               where: { id: tentativa.id },
               data: { attemptStatus: "failed" },
            });

            const fora = !dentroPeríodoFertil(tentativa.matingDate);

            if (fora) {
               // Fora do período fértil → encerra prenhez, animal volta ao CIO
               await tx.pregnancy.update({
                  where: { id: pregnancyId },
                  data: {
                     currentStatus: "failed",
                     currentStatusDate: new Date(),
                  },
               });
            } else {
               // Dentro do período fértil → aguarda nova cobertura (nova tentativa)
               await tx.pregnancy.update({
                  where: { id: pregnancyId },
                  data: {
                     currentStatus: "not_started",
                     currentStatusDate: new Date(),
                  },
               });
            }
         }
      });

      return this.getById(farmId, pregnancyId);
   }

   /**
    * Lista prenhezes da fazenda
    */
   async list(farmId: string, query: ListPregnanciesQuery): Promise<PregnancyResponse[]> {
      const where: Prisma.PregnancyWhereInput = { farmId };

      if (query.animalId) where.animalId = query.animalId;
      if (query.status) where.currentStatus = query.status as PregnancyStatus;

      const pregnancies = await prisma.pregnancy.findMany({
         where,
         select: PREGNANCY_SELECT,
         orderBy: { createdAt: "desc" },
      });

      return pregnancies.map(formatPregnancy);
   }

   /**
    * Busca prenhez por ID
    */
   async getById(farmId: string, id: string): Promise<PregnancyResponse> {
      const pregnancy = await prisma.pregnancy.findFirst({
         where: { id, farmId },
         select: PREGNANCY_SELECT,
      });

      if (!pregnancy) {
         throw Object.assign(new Error("Prenhez não encontrada"), { statusCode: 404 });
      }

      return formatPregnancy(pregnancy);
   }

   /**
    * Lista prenhezes de um animal específico
    */
   async listByAnimal(farmId: string, animalId: string): Promise<PregnancyResponse[]> {
      const animal = await prisma.animal.findFirst({
         where: { id: animalId, farmId },
      });

      if (!animal) {
         throw Object.assign(new Error("Animal não encontrado"), { statusCode: 404 });
      }

      const pregnancies = await prisma.pregnancy.findMany({
         where: { farmId, animalId },
         select: PREGNANCY_SELECT,
         orderBy: { createdAt: "desc" },
      });

      return pregnancies.map(formatPregnancy);
   }
}

export default new PregnancyService();
