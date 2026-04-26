import type { CreateFarmRequest, UpdateFarmRequest } from "../types/farm.types";

//CNPJ: aceita com ou sem mascara
const CNPJ_REGEX = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/;

function validateCreate(data: CreateFarmRequest): void {
   if (!data.name || data.name.trim().length < 2) {
      throw new Error("Nome da fazenda deve ter pelo menos 2 caracteres");
   }
   if (data.name.trim().length > 50) {
      throw new Error("Nome da fazenda deve ter no máximo 50 caracteres");
   }
   if (!data.location || data.location.trim().length < 3) {
      throw new Error("Localização da fazenda deve ter pelo menos 3 caracteres");
   }
   if (data.cnpj && !CNPJ_REGEX.test(data.cnpj)) {
      throw new Error("CNPJ inválido");
   }
}
function validateUpdate(data: UpdateFarmRequest): void {
   if (data.name !== undefined) {
      if (data.name.trim().length < 2) {
         throw new Error("Farm name must be at least 2 characters");
      }
      if (data.name.trim().length > 100) {
         throw new Error("Farm name must be at most 100 characters");
      }
   }

   if (data.location !== undefined && data.location.trim().length < 3) {
      throw new Error("Location must be at least 3 characters");
   }

   if (data.cnpj !== undefined && data.cnpj !== null && !CNPJ_REGEX.test(data.cnpj.trim())) {
      throw new Error("Invalid CNPJ format");
   }
}
export default { validateCreate, validateUpdate };
