// ========================================
// MANAGEMENT VALIDATOR
// ========================================

import type {
   CreateBatchManagementRequest,
   CreateManagementRequest,
} from "../types/management.types";

// Valida se é uma data valida
function isValidDate(value: unknown): value is Date {
   return value instanceof Date && !Number.isNaN(value.getTime());
}
// Valida Movimentação de Animal
function validateMove(data: CreateManagementRequest): void {
   // Animal Id - obrigatório
   if (!data.animalId || data.animalId.trim() === "") {
      throw new Error("ID do animal é obrigatório");
   }
   //Pasto de destino - obrigatório
   if (!data.destinationPastureId || data.destinationPastureId.trim() === "") {
      throw new Error("Pasto de destino é obrigatório");
   }
   // Motivo — obrigatório
   if (!data.reason || data.reason.trim().length < 3) {
      throw new Error("Motivo da movimentação deve ter pelo menos 3 caracteres");
   }
   if (data.reason.trim().length > 200) {
      throw new Error("Motivo deve ter no máximo 200 caracteres");
   }

   // Responsável — obrigatório
   if (!data.employee || data.employee.trim().length < 2) {
      throw new Error("Nome do responsável deve ter pelo menos 2 caracteres");
   }
   if (data.employee.trim().length > 100) {
      throw new Error("Nome do responsável deve ter no máximo 100 caracteres");
   }

   // Data — opcional, mas se informada deve ser válida e não futura
   if (data.movementDate !== undefined) {
      if (!isValidDate(data.movementDate)) {
         throw new Error("Data de movimentação inválida. Use formato ISO (YYYY-MM-DD)");
      }
      if (new Date(data.movementDate) > new Date()) {
         throw new Error("Data de movimentação não pode ser futura");
      }
   }
}

function validateMoveBatch(data: CreateBatchManagementRequest): void {
   // Lista de animais — obrigatória e não vazia
   if (!data.animalIds || !Array.isArray(data.animalIds)) {
      throw new Error("Lista de animais é obrigatória");
   }
   if (data.animalIds.length === 0) {
      throw new Error("Informe pelo menos um animal para movimentar");
   }
   if (data.animalIds.length > 500) {
      throw new Error("Máximo de 500 animais por movimentação em lote");
   }

   // Valida cada ID da lista
   for (const id of data.animalIds) {
      if (!id || id.trim() === "") {
         throw new Error("ID de animal inválido na lista");
      }
   }

   // IDs duplicados na lista
   const uniqueIds = new Set(data.animalIds);
   if (uniqueIds.size !== data.animalIds.length) {
      throw new Error("Lista de animais contém IDs duplicados");
   }

   // Pasto de destino — obrigatório
   if (!data.destinationPastureId || data.destinationPastureId.trim() === "") {
      throw new Error("Pasto de destino é obrigatório");
   }

   // Motivo — obrigatório
   if (!data.reason || data.reason.trim().length < 3) {
      throw new Error("Motivo da movimentação deve ter pelo menos 3 caracteres");
   }
   if (data.reason.trim().length > 200) {
      throw new Error("Motivo deve ter no máximo 200 caracteres");
   }

   // Responsável — obrigatório
   if (!data.employee || data.employee.trim().length < 2) {
      throw new Error("Nome do responsável deve ter pelo menos 2 caracteres");
   }
   if (data.employee.trim().length > 100) {
      throw new Error("Nome do responsável deve ter no máximo 100 caracteres");
   }

   // Data — opcional
   if (data.movementDate !== undefined) {
      if (!isValidDate(data.movementDate)) {
         throw new Error("Data de movimentação inválida. Use formato ISO (YYYY-MM-DD)");
      }
      if (new Date(data.movementDate) > new Date()) {
         throw new Error("Data de movimentação não pode ser futura");
      }
   }
}
export default { validateMove, validateMoveBatch };
