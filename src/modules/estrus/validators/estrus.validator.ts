import type { EstrusIntensity } from "@prisma/client";
import type { CreateEstrusRequest, UpdateEstrusRequest } from "../types/estrus.types";

const VALID_INTENSITIES: EstrusIntensity[] = ["weak", "normal", "strong"];

function isValideDate(dateStr: string): boolean {
   const date = new Date(dateStr);
   return !Number.isNaN(date.getTime());
}

function isNotFutureDate(value: unknown): value is Date {
   return value instanceof Date && !Number.isNaN(value.getTime()) && value.getTime() <= Date.now();
}
function validateCreate(date: CreateEstrusRequest): void {
   // Animal Id
   if (!date.animalId || date.animalId.trim() === "") {
      throw new Error("Animal ID é obrigatório");
   }
   // Data do CIO
   if (!date.date) {
      throw new Error("Data do CIO é obrigatório");
   }
   if (!isValideDate(date.date)) {
      throw new Error("Data do CIO inválida. Use formato ISO (YYYY-MM-DD)");
   }
   if (!isNotFutureDate(date.date)) {
      throw new Error("Data do CIO não pode ser futura");
   }
   // Intensidade
   if (!date.intensity || !VALID_INTENSITIES.includes(date.intensity)) {
      throw new Error(`Intensidade inválida. Permitidas: ${VALID_INTENSITIES.join(", ")}`);
   }
   // Notas (opcinal, mas se informada deve ter tamanho mínimo)
   if (date.notes !== undefined && date.notes?.trim().length > 500) {
      throw new Error("Nota dem ter no máximo 500 caracteres");
   }
}

function validateUpdate(data: UpdateEstrusRequest): void {
   // Data
   if (data.date !== undefined) {
      if (!isValideDate(data.date)) {
         throw new Error("Data do CIO inválida. Use formato ISO (YYYY-MM-DD)");
      }
      if (!isNotFutureDate(data.date)) {
         throw new Error("Data do CIO não pode ser futura");
      }
   }

   // Intensidade
   if (data.intensity !== undefined && !VALID_INTENSITIES.includes(data.intensity)) {
      throw new Error(`Intensidade inválida. Permitidas: ${VALID_INTENSITIES.join(", ")}`);
   }

   // Notas
   if (data.notes !== undefined && data.notes.trim().length > 500) {
      throw new Error("Notas devem ter no máximo 500 caracteres");
   }
}

export default { validateCreate, validateUpdate };
