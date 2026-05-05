import type { Mortality, MortalitySeverity } from "@prisma/client";
import type { CreateMortalityRequest, UpdateMortalityRequest } from "../types/mortality.types";

const VALID_SEVERITIES: MortalitySeverity[] = ["mild", "moderate", "severe"];

// Validar se data é válida
function isValidDate(dateStr: string): boolean {
   const date = new Date(dateStr);
   return !Number.isNaN(date.getTime());
}
// Validar se data é futura
function isNotFutureDate(dateStr: string): boolean {
   return new Date(dateStr) <= new Date();
}
export function validateCreate(data: CreateMortalityRequest): void {
   // Animal - Obrigatorio
   if (!data.animalId || data.animalId.trim() === "") {
      throw new Error("Animal é obrigatório");
   }
   // Data da morte - Obrigatorio
   if (!data.deathDate) {
      throw new Error("Data da morte é obrigatória");
   }
   if (!isValidDate(data.deathDate)) {
      throw new Error("Data da morte inválida. Use formato ISO (YYYY-MM-DD)");
   }
   if (!isNotFutureDate(data.deathDate)) {
      throw new Error("Data da morte não pode ser futura");
   }
   // Hora da morte (opcional, mas se for informado deve ser HH:MM)
   if (data.deathTime !== undefined && data.deathTime !== null) {
      if (!/^\d{2}:\d{2}$/.test(data.deathTime)) {
         throw new Error("Horário da morte inválido. Use formato HH:MM");
      }
   }
   // Local da morte - Obrigatorio
   if (!data.deathLocation || data.deathLocation.trim().length < 2) {
      throw new Error("Local da morte deve ter pelo menos 2 caracteres");
   }
   if (data.deathLocation && data.deathLocation.trim().length > 50) {
      throw new Error("Local da morte deve ter no máximo 50 caracteres");
   }
   //Causa da morte - Obrigatorio
   if (!data.causeOfDeath || data.causeOfDeath.trim().length < 3) {
      throw new Error("Causa da morte deve ter pelo menos 3 caracteres");
   }
   if (data.causeOfDeath.trim().length > 50) {
      throw new Error("Causa da morte deve ter no máximo 50 caracteres");
   }
   // Severidade (opcional)
   if (data.severity !== undefined && !VALID_SEVERITIES.includes(data.severity)) {
      throw new Error(`Severidade inválida. Permitidas: ${VALID_SEVERITIES.join(", ")}`);
   }

   // Destinação
   if (data.disposal !== undefined && data.disposal !== null) {
      if (data.disposal.trim().length > 200) {
         throw new Error("Destinação deve ter no máximo 200 caracteres");
      }
   }
   // Fotos — array de URLs (opcional)
   if (data.photos !== undefined) {
      if (!Array.isArray(data.photos)) {
         throw new Error("Fotos deve ser um array de URLs");
      }
      if (data.photos.length > 10) {
         throw new Error("Máximo de 10 fotos por registro");
      }
   }

   // Notas — opcional
   if (data.notes !== undefined && data.notes !== null) {
      if (data.notes.trim().length > 500) {
         throw new Error("Notas devem ter no máximo 500 caracteres");
      }
   }
}

export function validateUpdate(data: UpdateMortalityRequest): void {
   if (data.deathDate !== undefined) {
      if (!isValidDate(data.deathDate)) {
         throw new Error("Data da morte inválida. Use formato ISO (YYYY-MM-DD)");
      }
      if (!isNotFutureDate(data.deathDate)) {
         throw new Error("Data da morte não pode ser futura");
      }
   }

   if (data.deathTime !== undefined && data.deathTime !== null) {
      if (!/^\d{2}:\d{2}$/.test(data.deathTime)) {
         throw new Error("Hora da morte inválida. Use formato HH:MM");
      }
   }

   if (data.deathLocation !== undefined) {
      if (data.deathLocation.trim().length < 2) {
         throw new Error("Local da morte deve ter pelo menos 2 caracteres");
      }
      if (data.deathLocation.trim().length > 200) {
         throw new Error("Local da morte deve ter no máximo 200 caracteres");
      }
   }

   if (data.causeOfDeath !== undefined) {
      if (data.causeOfDeath.trim().length < 3) {
         throw new Error("Causa da morte deve ter pelo menos 3 caracteres");
      }
      if (data.causeOfDeath.trim().length > 300) {
         throw new Error("Causa da morte deve ter no máximo 300 caracteres");
      }
   }

   if (data.severity !== undefined && !VALID_SEVERITIES.includes(data.severity)) {
      throw new Error(`Severidade inválida. Permitidas: ${VALID_SEVERITIES.join(", ")}`);
   }

   if (data.disposal !== undefined && data.disposal !== null) {
      if (data.disposal.trim().length > 200) {
         throw new Error("Destinação deve ter no máximo 200 caracteres");
      }
   }

   if (data.notes !== undefined && data.notes !== null) {
      if (data.notes.trim().length > 500) {
         throw new Error("Notas devem ter no máximo 500 caracteres");
      }
   }
}
export default { validateCreate, validateUpdate };
