import type { CreateBreedRequest, UpdateBreedRequest } from "../types/breed.types";

export function validateCreate(data: CreateBreedRequest): void {
   if (!data.name || data.name.trim().length < 2) {
      throw new Error("Raça deve ter pelo menos 2 caracteres");
   }
   if (data.name.trim().length > 50) {
      throw new Error("Raça deve ter no máximo 50 caracteres");
   }
   if (!/^[a-zA-ZÀ-ÿ0-9\s-]+$/.test(data.name.trim())) {
      throw new Error("Nome da raça contém caracteres inválidos");
   }
}

export function validateUpdate(data: UpdateBreedRequest): void {
   if (data.name !== undefined) {
      if (data.name.trim().length < 2) {
         throw new Error("Raça deve ter pelo menos 2 caracteres");
      }
      if (data.name.trim().length > 50) {
         throw new Error("Raça deve ter no máximo 50 caracteres");
      }
      if (!/^[a-zA-ZÀ-ÿ0-9\s-]+$/.test(data.name.trim())) {
         throw new Error("Nome da raça contém caracteres inválidos");
      }
   }
}
export default { validateCreate, validateUpdate };
