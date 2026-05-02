import type { MatingType, UltrasoundResult } from "@prisma/client";
import type {
   CreateAttemptRequest,
   CreatePregnancyRequest,
   CreateUltrasoundRequest,
} from "../types/pregnancy.types";

const VALID_MATING_TYPES: MatingType[] = ["NATURAL", "AI"];
const VALID_ULTRASOUND_RESULTS: UltrasoundResult[] = ["PREGNANT", "EMPTY", "ABSORPTION", "VIABLE"];
const VALID_ULTRASOUND_DAYS = [30, 60, 260] as const;

function isValidDate(dateStr: string): boolean {
   const date = new Date(dateStr);
   return !Number.isNaN(date.getTime());
}

function isNotFuture(dateStr: string): boolean {
   return new Date(dateStr) <= new Date();
}

function validateCreatePregnancy(data: CreatePregnancyRequest): void {
   if (!data.animalId || data.animalId.trim() === "") {
      throw new Error("ID do animal é obrigatório");
   }
}

function validateCreateAttempt(data: CreateAttemptRequest): void {
   // Data da cobertura
   if (!data.matingDate) {
      throw new Error("Data da cobertura é obrigatória");
   }
   if (!isValidDate(data.matingDate)) {
      throw new Error("Data da cobertura inválida. Use formato ISO (YYYY-MM-DD)");
   }
   if (!isNotFuture(data.matingDate)) {
      throw new Error("Data da cobertura não pode ser futura");
   }

   // Tipo de cobertura
   if (!data.matingType || !VALID_MATING_TYPES.includes(data.matingType)) {
      throw new Error(`Tipo de cobertura inválido. Permitidos: ${VALID_MATING_TYPES.join(", ")}`);
   }

   // MONTA exige touro
   if (data.matingType === "NATURAL" && !data.bullId) {
      throw new Error("ID do touro é obrigatório para cobertura natural");
   }

   // IA exige nome do sêmen
   if (data.matingType === "AI" && !data.semenName) {
      throw new Error("Nome do sêmen é obrigatório para inseminação artificial");
   }

   // Notas
   if (data.notes !== undefined && data.notes.trim().length > 500) {
      throw new Error("Notas devem ter no máximo 500 caracteres");
   }
}

function validateCreateUltrasound(data: CreateUltrasoundRequest): void {
   // Dias
   if (!VALID_ULTRASOUND_DAYS.includes(data.days as any)) {
      throw new Error(`Ultrassom inválido. Permitidos: ${VALID_ULTRASOUND_DAYS.join(", ")} dias`);
   }

   // Resultado
   if (!data.result || !VALID_ULTRASOUND_RESULTS.includes(data.result)) {
      throw new Error(`Resultado inválido. Permitidos: ${VALID_ULTRASOUND_RESULTS.join(", ")}`);
   }

   // Data
   if (!data.ultrasoundDate) {
      throw new Error("Data do ultrassom é obrigatória");
   }
   if (!isValidDate(data.ultrasoundDate)) {
      throw new Error("Data do ultrassom inválida. Use formato ISO (YYYY-MM-DD)");
   }
   if (!isNotFuture(data.ultrasoundDate)) {
      throw new Error("Data do ultrassom não pode ser futura");
   }

   // Notas
   if (data.notes !== undefined && data.notes.trim().length > 500) {
      throw new Error("Notas devem ter no máximo 500 caracteres");
   }
}

export default {
   validateCreatePregnancy,
   validateCreateAttempt,
   validateCreateUltrasound,
};
