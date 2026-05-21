import type { CreateBuyerRequest, UpdateBuyerRequest } from "../types/buyer.types";

export function validateCreate(data: CreateBuyerRequest): void {
   if (!data.name || data.name.trim().length < 3) {
      throw Object.assign(new Error("Nome deve ter pelo menos 3 caracteres."), { code: 400 });
   }
   if (data.name.trim().length > 50) {
      throw Object.assign(new Error("Nome não pode ter mais de 50 caracteres."), { code: 400 });
   }
   if (!data.document || data.document.trim().length < 11) {
      throw Object.assign(new Error("Documento deve ter pelo menos 11 caracteres."), { code: 400 });
   }
   if (data.document.trim().length > 14) {
      throw Object.assign(new Error("Documento não pode ter mais de 14 caracteres."), {
         code: 400,
      });
   }
   if (data.email && data.email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
         throw Object.assign(new Error("Email inválido."), { code: 400 });
      }
   }
   if (data.notes && data.notes.trim().length > 500) {
      throw Object.assign(new Error("Observações não pode ter mais de 500 caracteres."), {
         code: 400,
      });
   }
   if (!data.farmId) {
      throw Object.assign(new Error("ID da fazenda é obrigatório."), { code: 400 });
   }
}
export function validateUpdate(data: UpdateBuyerRequest): void {
   if (data.name !== undefined) {
      if (data.name.trim().length < 3) {
         throw Object.assign(new Error("Nome deve ter pelo menos 3 caracteres."), { code: 400 });
      }
      if (data.name.trim().length > 50) {
         throw Object.assign(new Error("Nome não pode ter mais de 50 caracteres."), { code: 400 });
      }
   }
   if (data.document !== undefined) {
      if (data.document.trim().length < 11) {
         throw Object.assign(new Error("Documento deve ter pelo menos 11 caracteres."), {
            code: 400,
         });
      }
      if (data.document.trim().length > 14) {
         throw Object.assign(new Error("Documento não pode ter mais de 14 caracteres."), {
            code: 400,
         });
      }
   }
   if (data.email && data.email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
         throw Object.assign(new Error("Email inválido."), { code: 400 });
      }
   }
   if (data.notes && data.notes.trim().length > 500) {
      throw Object.assign(new Error("Observações não pode ter mais de 500 caracteres."), {
         code: 400,
      });
   }
}
