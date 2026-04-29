import type { CreateFarmRequest, UpdateFarmRequest } from "../types/farm.types";

function isValidCNPJ(cnpj: string): boolean {
   const digits = cnpj.replace(/\D/g, "");
   if (digits.length !== 14) return false;
   // Rejeita sequências repetidas (ex: 00000000000000)
   if (/^(\d)\1+$/.test(digits)) return false;

   // Cálculo do 1º dígito verificador
   const calcDigit = (cnpj: string, length: number): number => {
      const weights =
         length === 12
            ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
            : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

      const sum = cnpj
         .slice(0, length)
         .split("")
         .reduce((acc, digit, i) => acc + Number(digit) * weights[i], 0);

      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
   };

   const firstDigit = calcDigit(digits, 12);
   const secondDigit = calcDigit(digits, 13);

   // Compara dígitos calculados com os reais
   return Number(digits[12]) === firstDigit && Number(digits[13]) === secondDigit;
}

export function validateCreate(data: CreateFarmRequest): void {
   if (!data.name || data.name.trim().length < 2) {
      throw new Error("Nome da fazenda deve ter pelo menos 2 caracteres");
   }
   if (data.name.trim().length > 50) {
      throw new Error("Nome da fazenda deve ter no máximo 50 caracteres");
   }
   if (!data.location || data.location.trim().length < 3) {
      throw new Error("Localização da fazenda deve ter pelo menos 3 caracteres");
   }
   if (data.cnpj && data.cnpj.trim() !== "" && !isValidCNPJ(data.cnpj)) {
      throw new Error("CNPJ inválido");
   }
}
export function validateUpdate(data: UpdateFarmRequest): void {
   if (data.name !== undefined) {
      if (data.name.trim().length < 2) {
         throw new Error("Nome da fazenda deve ter pelo menos 2 caracteres");
      }
      if (data.name.trim().length > 100) {
         throw new Error("Nome da fazenda deve ter no máximo 100 caracteres");
      }
   }

   if (data.location !== undefined && data.location.trim().length < 3) {
      throw new Error("Localização da fazenda deve ter pelo menos 3 caracteres");
   }

   if (data.cnpj !== undefined && data.cnpj !== null && data.cnpj.trim() !== "") {
      if (!isValidCNPJ(data.cnpj)) {
         throw new Error("Formato do CNPJ inválido");
      }
   }
}
