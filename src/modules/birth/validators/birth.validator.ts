import type { BirthSituation, BirthType, Gender } from "@prisma/client";
import type { CreateBirthRequest, UpdateBirthRequest } from "../types/birth.types";

const VALID_BIRTH_TYPES: BirthType[] = ["normal", "assisted", "c_section"];
const VALID_SITUATIONS: BirthSituation[] = ["normal", "dead"];
const VALID_GENDERS: Gender[] = ["M", "F"];

//Validar se data é válida
function isValidDate(dateStr: string): boolean {
   const date = new Date(dateStr);
   return !Number.isNaN(date.getTime());
}
function isNotFuture(dateStr: string): boolean {
   return new Date(dateStr) <= new Date();
}

export function validateCreate(data: CreateBirthRequest): void {
   // Mãe
   if (!data.damId || data.damId.trim() === "") {
      throw new Error("Mãe do parto é obrigatória");
   }
   // Data do parto
   if (!data.birthDate) {
      throw new Error("Data do parto é obrigatória");
   }
   if (!isValidDate(data.birthDate)) {
      throw new Error("Data do parto inválida. Use formato ISO (YYYY-MM-DD)");
   }
   if (!isNotFuture(data.birthDate)) {
      throw new Error("Data do parto não pode ser futura");
   }
   // Hora do parto(opcional, mas se for informado deve ser HH:MM)
   if (data.birthTime !== undefined && data.birthTime !== null) {
      if (!/^\d{2}:\d{2}$/.test(data.birthTime)) {
         throw new Error("Horário do parto inválido. Use formato HH:MM");
      }  
   }
   // Tipo de parto
   if (!data.birthType || !VALID_BIRTH_TYPES.includes(data.birthType)) {
      throw new Error(`Tipo de parto inválido. Permitidos: ${VALID_BIRTH_TYPES.join(", ")}`);
   }
   // Situação
   if (!data.situation || !VALID_SITUATIONS.includes(data.situation)) {
      throw new Error(`Situação do parto inválida. Permitidas: ${VALID_SITUATIONS.join(", ")}`);
   }
   // Motivo da morte - Obrigatorio se bezerro morreu
   if (data.situation === "dead" && !data.deathReason?.trim()) {
      throw new Error("Motivo da morte é obrigatório");
   }
   // Sexo do bezerro (opcional)
   if (data.calfGender !== undefined && !VALID_GENDERS.includes(data.calfGender)) {
      throw new Error(`Sexo do bezerro inválido. Permitidos: ${VALID_GENDERS.join(", ")}`);
   }

   // Peso (opcional, mas deve ser positivo)
   if (data.calfWeight !== undefined && data.calfWeight !== null) {
      if (typeof data.calfWeight !== "number" || data.calfWeight <= 0) {
         throw new Error("Peso do bezerro deve ser um número maior que zero");
      }
      if (data.calfWeight > 999) {
         throw new Error("Peso do bezerro parece inválido (máx 999 kg)");
      }
   }

   // Brinco (opcional)
   if (data.calfEarTag !== undefined && data.calfEarTag !== null) {
      if (data.calfEarTag.trim().length > 20) {
         throw new Error("Brinco do bezerro deve ter no máximo 20 caracteres");
      }
   }

   // Chip (opcional)
   if (data.calfChip !== undefined && data.calfChip !== null) {
      if (data.calfChip.trim().length < 3 || data.calfChip.trim().length > 30) {
         throw new Error("Chip do bezerro deve ter entre 3 e 30 caracteres");
      }
      if (!/^[a-zA-Z0-9-]+$/.test(data.calfChip.trim())) {
         throw new Error("Chip deve conter apenas letras, números e hífens");
      }
   }

   // Não pode registrar bezerro como animal se nasceu morto
   if (data.registerCalfAsAnimal && data.situation === "dead") {
      throw new Error("Não é possível registrar como animal um bezerro que nasceu morto");
   }

   // Para registrar como animal, chip é obrigatório
   if (data.registerCalfAsAnimal && !data.calfChip?.trim()) {
      throw new Error("Chip do bezerro é obrigatório para registrá-lo como animal");
   }

   // Notas (opcional)
   if (data.notes !== undefined && data.notes.trim().length > 500) {
      throw new Error("Notas devem ter no máximo 500 caracteres");
   }
}

export function validateUpdate(data: UpdateBirthRequest): void {
   if (data.birthDate !== undefined) {
      if (!isValidDate(data.birthDate)) {
         throw new Error("Data do parto inválida. Use formato ISO (YYYY-MM-DD)");
      }
      if (!isNotFuture(data.birthDate)) {
         throw new Error("Data do parto não pode ser futura");
      }
   }

   if (data.birthTime !== undefined && data.birthTime !== null) {
      if (!/^\d{2}:\d{2}$/.test(data.birthTime)) {
         throw new Error("Horário do parto inválido. Use formato HH:MM");
      }
   }

   if (data.birthType !== undefined && !VALID_BIRTH_TYPES.includes(data.birthType)) {
      throw new Error(`Tipo de parto inválido. Permitidos: ${VALID_BIRTH_TYPES.join(", ")}`);
   }

   if (data.situation !== undefined && !VALID_SITUATIONS.includes(data.situation)) {
      throw new Error(`Situação inválida. Permitidas: ${VALID_SITUATIONS.join(", ")}`);
   }

   if (data.calfGender !== undefined && !VALID_GENDERS.includes(data.calfGender)) {
      throw new Error(`Sexo do bezerro inválido. Permitidos: ${VALID_GENDERS.join(", ")}`);
   }

   if (data.calfWeight !== undefined && data.calfWeight !== null) {
      if (typeof data.calfWeight !== "number" || data.calfWeight <= 0) {
         throw new Error("Peso do bezerro deve ser um número maior que zero");
      }
      if (data.calfWeight > 999) {
         throw new Error("Peso do bezerro parece inválido (máx 999 kg)");
      }
   }

   if (data.calfEarTag !== undefined && data.calfEarTag !== null) {
      if (data.calfEarTag.trim().length > 20) {
         throw new Error("Brinco do bezerro deve ter no máximo 20 caracteres");
      }
   }

   if (data.notes !== undefined && data.notes.trim().length > 500) {
      throw new Error("Notas devem ter no máximo 500 caracteres");
   }
}

export default { validateCreate, validateUpdate };
