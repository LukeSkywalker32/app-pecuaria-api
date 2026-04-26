import type { CreatePastureRequest, UpdatePastureRequest } from "../types/pasture.types";

const VALID_TYPES = ["native", "planted", "irrigated", "feedlot", "quarantine"] as const;

function validateCreate(data: CreatePastureRequest): void {
   //Nome
   if (!data.name || data.name.trim().length < 3) {
      throw new Error("Nome do pasto deve ter pelo menos 3 caracteres");
   }
   if (data.name.trim().length > 100) {
      throw new Error("Nome do pasto deve ter no máximo 100 caracteres");
   }

   // Hectares
   if (data.hectares === undefined || data.hectares === null) {
      throw new Error("Hectares é obrigatório");
   }
   if (typeof data.hectares !== "number" || data.hectares <= 0) {
      throw new Error("Hectares deve ser um número maior que zero");
   }

   // Tipo
   if (!data.type || !VALID_TYPES.includes(data.type)) {
      throw new Error(`Tipo inválido. Tipos permitidos: ${VALID_TYPES.join(", ")}`);
   }

   // Capacidade
   if (data.animalCapacity === undefined || data.animalCapacity === null) {
      throw new Error("Capacidade de animais é obrigatória");
   }
   if (!Number.isInteger(data.animalCapacity) || data.animalCapacity <= 0) {
      throw new Error("Capacidade de animais deve ser um número inteiro maior que zero");
   }
}
function validateUpdate(data: UpdatePastureRequest): void {
   if (data.name !== undefined) {
      if (data.name.trim().length < 2) {
         throw new Error("Nome do pasto deve ter pelo menos 2 caracteres");
      }
      if (data.name.trim().length > 100) {
         throw new Error("Nome do pasto deve ter no máximo 100 caracteres");
      }
   }

   if (data.hectares !== undefined) {
      if (typeof data.hectares !== "number" || data.hectares <= 0) {
         throw new Error("Hectares deve ser um número maior que zero");
      }
   }

   if (data.type !== undefined && !VALID_TYPES.includes(data.type)) {
      throw new Error(`Tipo inválido. Tipos permitidos: ${VALID_TYPES.join(", ")}`);
   }

   if (data.animalCapacity !== undefined) {
      if (!Number.isInteger(data.animalCapacity) || data.animalCapacity <= 0) {
         throw new Error("Capacidade de animais deve ser um número inteiro maior que zero");
      }
   }
}
export default { validateCreate, validateUpdate };
