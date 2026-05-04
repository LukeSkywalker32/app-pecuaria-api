import type {
   CreateVaccinationRequest,
   UpdateVaccinationRequest,
} from "../types/vaccination.types";

function isValidDate(dateStr: string): boolean {
   const date = new Date(dateStr);
   return !Number.isNaN(date.getTime());
}

function isNotFuture(dateStr: string): boolean {
   return new Date(dateStr) <= new Date();
}

export function validateCreate(data: CreateVaccinationRequest): void {
   // Animal
   if (!data.animalId || data.animalId.trim() === "") {
      throw new Error("ID do animal é obrigatório");
   }

   // Tipo de vacina
   if (!data.vaccineType || data.vaccineType.trim().length < 2) {
      throw new Error("Tipo de vacina deve ter pelo menos 2 caracteres");
   }
   if (data.vaccineType.trim().length > 100) {
      throw new Error("Tipo de vacina deve ter no máximo 100 caracteres");
   }

   // Marca
   if (!data.brand || data.brand.trim().length < 2) {
      throw new Error("Marca da vacina deve ter pelo menos 2 caracteres");
   }
   if (data.brand.trim().length > 100) {
      throw new Error("Marca da vacina deve ter no máximo 100 caracteres");
   }

   // Lote
   if (!data.batch || data.batch.trim().length < 1) {
      throw new Error("Número do lote é obrigatório");
   }
   if (data.batch.trim().length > 50) {
      throw new Error("Número do lote deve ter no máximo 50 caracteres");
   }

   // Data de vacinação
   if (!data.vaccinationDate) {
      throw new Error("Data de vacinação é obrigatória");
   }
   if (!isValidDate(data.vaccinationDate)) {
      throw new Error("Data de vacinação inválida. Use formato ISO (YYYY-MM-DD)");
   }
   if (!isNotFuture(data.vaccinationDate)) {
      throw new Error("Data de vacinação não pode ser futura");
   }

   // Data de validade
   if (!data.expirationDate) {
      throw new Error("Data de validade do produto é obrigatória");
   }
   if (!isValidDate(data.expirationDate)) {
      throw new Error("Data de validade inválida. Use formato ISO (YYYY-MM-DD)");
   }

   // Validade deve ser posterior à data de vacinação
   if (new Date(data.expirationDate) <= new Date(data.vaccinationDate)) {
      throw new Error("Data de validade deve ser posterior à data de vacinação");
   }

   // Próxima dose (opcional, mas se informada deve ser futura à vacinação)
   if (data.nextDoseDate !== undefined && data.nextDoseDate !== null) {
      if (!isValidDate(data.nextDoseDate)) {
         throw new Error("Data da próxima dose inválida. Use formato ISO (YYYY-MM-DD)");
      }
      if (new Date(data.nextDoseDate) <= new Date(data.vaccinationDate)) {
         throw new Error("Data da próxima dose deve ser posterior à data de vacinação");
      }
   }

   // Reação (opcional)
   if (data.reaction !== undefined && data.reaction !== null) {
      if (data.reaction.trim().length > 300) {
         throw new Error("Descrição da reação deve ter no máximo 300 caracteres");
      }
   }

   // Notas (opcional)
   if (data.notes !== undefined && data.notes !== null) {
      if (data.notes.trim().length > 500) {
         throw new Error("Notas devem ter no máximo 500 caracteres");
      }
   }
}

export function validateUpdate(data: UpdateVaccinationRequest): void {
   if (data.vaccineType !== undefined) {
      if (data.vaccineType.trim().length < 2) {
         throw new Error("Tipo de vacina deve ter pelo menos 2 caracteres");
      }
      if (data.vaccineType.trim().length > 100) {
         throw new Error("Tipo de vacina deve ter no máximo 100 caracteres");
      }
   }

   if (data.brand !== undefined) {
      if (data.brand.trim().length < 2) {
         throw new Error("Marca da vacina deve ter pelo menos 2 caracteres");
      }
      if (data.brand.trim().length > 100) {
         throw new Error("Marca da vacina deve ter no máximo 100 caracteres");
      }
   }

   if (data.batch !== undefined) {
      if (data.batch.trim().length < 1) {
         throw new Error("Número do lote é obrigatório");
      }
      if (data.batch.trim().length > 50) {
         throw new Error("Número do lote deve ter no máximo 50 caracteres");
      }
   }

   if (data.vaccinationDate !== undefined) {
      if (!isValidDate(data.vaccinationDate)) {
         throw new Error("Data de vacinação inválida. Use formato ISO (YYYY-MM-DD)");
      }
      if (!isNotFuture(data.vaccinationDate)) {
         throw new Error("Data de vacinação não pode ser futura");
      }
   }

   if (data.expirationDate !== undefined) {
      if (!isValidDate(data.expirationDate)) {
         throw new Error("Data de validade inválida. Use formato ISO (YYYY-MM-DD)");
      }
   }

   // Validade vs data de vacinação (só valida se ambas foram informadas)
   if (data.expirationDate && data.vaccinationDate) {
      if (new Date(data.expirationDate) <= new Date(data.vaccinationDate)) {
         throw new Error("Data de validade deve ser posterior à data de vacinação");
      }
   }

   if (data.nextDoseDate !== undefined && data.nextDoseDate !== null) {
      if (!isValidDate(data.nextDoseDate)) {
         throw new Error("Data da próxima dose inválida. Use formato ISO (YYYY-MM-DD)");
      }
   }

   if (data.reaction !== undefined && data.reaction !== null) {
      if (data.reaction.trim().length > 300) {
         throw new Error("Descrição da reação deve ter no máximo 300 caracteres");
      }
   }

   if (data.notes !== undefined && data.notes !== null) {
      if (data.notes.trim().length > 500) {
         throw new Error("Notas devem ter no máximo 500 caracteres");
      }
   }
}

export default { validateCreate, validateUpdate };
