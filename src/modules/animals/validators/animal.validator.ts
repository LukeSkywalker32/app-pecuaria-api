import type { AnimalStatus, Gender } from "@prisma/client";
import type { CreateAnimalRequest, UpdateAnimalRequest } from "../types/animal.types";

const VALID_GENDERS: Gender[] = ["M", "F"];
const VALID_STATUS: AnimalStatus[] = ["active", "dead", "sold", "quarantine", "treatment"];

const VALID_ORIGINS = ["born", "purchased"] as const;

// Valida se é uma data valida
function isValideDate(value: unknown): boolean {
   if (!value) return false;
   const date = new Date(value as string);
   return !Number.isNaN(date.getTime());
}

//Valida se a data nao é futura
function isNotFutureDate(value: unknown): boolean {
   if (!value) return false;
   const date = new Date(value as string);
   return !Number.isNaN(date.getTime()) && date.getTime() <= Date.now();
}

function validateCreate(data: CreateAnimalRequest): void {
   // Chip ID — obrigatório e único
   if (!data.chipId || data.chipId.trim().length < 3) {
      throw Object.assign(new Error("Chip ID deve ter pelo menos 3 caracteres"), {
         statusCode: 400,
      });
   }
   if (data.chipId.trim().length > 30) {
      throw Object.assign(new Error("Chip ID deve ter no máximo 30 caracteres"), {
         statusCode: 400,
      });
   }
   if (!/^[a-zA-Z0-9-]+$/.test(data.chipId.trim())) {
      throw Object.assign(new Error("Chip ID deve conter apenas letras, números e hífens"), {
         statusCode: 400,
      });
   }

   // Brinco — opcional, mas se informado deve ser válido
   if (data.currentEarTag !== undefined && data.currentEarTag !== null) {
      if (data.currentEarTag.trim().length < 1) {
         throw Object.assign(new Error("Brinco não pode ser vazio"), { statusCode: 400 });
      }
      if (data.currentEarTag.trim().length > 20) {
         throw Object.assign(new Error("Brinco deve ter no máximo 20 caracteres"), {
            statusCode: 400,
         });
      }
   }

   // Nome — opcional, mas se informado deve ter tamanho mínimo
   if (data.name !== undefined && data.name !== null) {
      if (data.name.trim().length < 1) {
         throw Object.assign(new Error("Nome não pode ser vazio"), { statusCode: 400 });
      }
      if (data.name.trim().length > 50) {
         throw Object.assign(new Error("Nome deve ter no máximo 50 caracteres"), {
            statusCode: 400,
         });
      }
   }

   // Raça — obrigatória
   if (!data.breed || data.breed.trim().length < 2) {
      throw Object.assign(new Error("Raça deve ter pelo menos 2 caracteres"), { statusCode: 400 });
   }
   if (data.breed.trim().length > 50) {
      throw Object.assign(new Error("Raça deve ter no máximo 50 caracteres"), { statusCode: 400 });
   }

   // Sexo — obrigatório
   if (!data.gender || !VALID_GENDERS.includes(data.gender)) {
      throw Object.assign(new Error(`Sexo inválido. Permitidos: ${VALID_GENDERS.join(", ")}`), {
         statusCode: 400,
      });
   }

   // Data de nascimento — obrigatória
   if (!data.birthDate) {
      throw Object.assign(new Error("Data de nascimento é obrigatória"), { statusCode: 400 });
   }
   if (!isValideDate(data.birthDate)) {
      throw Object.assign(new Error("Data de nascimento inválida. Use formato ISO (YYYY-MM-DD)"), {
         statusCode: 400,
      });
   }
   if (!isNotFutureDate(data.birthDate)) {
      throw Object.assign(new Error("Data de nascimento não pode ser futura"), { statusCode: 400 });
   }

   // Origem — obrigatória
   if (!data.origin || !VALID_ORIGINS.includes(data.origin)) {
      throw Object.assign(new Error(`Origem inválida. Permitidas: ${VALID_ORIGINS.join(", ")}`), {
         statusCode: 400,
      });
   }

   // Pasto — obrigatório para nascidos, opcional para comprados
   if (data.origin === "born" && !data.pastureId) {
      throw Object.assign(new Error("Animais nascidos na fazenda devem ter pasto informado"), {
         statusCode: 400,
      });
   }

   // Status inicial — opcional, mas se informado deve ser válido
   if (data.status !== undefined && !VALID_STATUS.includes(data.status)) {
      throw Object.assign(new Error(`Status inválido. Permitidos: ${VALID_STATUS.join(", ")}`), {
         statusCode: 400,
      });
   }

   // Genealogia interna — IDs opcionais mas não podem ser vazios se informados
   if (data.sireId !== undefined && data.sireId !== null && data.sireId.trim() === "") {
      throw Object.assign(new Error("ID do pai não pode ser vazio"), { statusCode: 400 });
   }
   if (data.damId !== undefined && data.damId !== null && data.damId.trim() === "") {
      throw Object.assign(new Error("ID da mãe não pode ser vazio"), { statusCode: 400 });
   }

   // Genealogia externa — nome do pai (opcional)
   if (data.sireExternalName !== undefined && data.sireExternalName !== null) {
      if (data.sireExternalName.trim().length > 100) {
         throw Object.assign(new Error("Nome externo do pai deve ter no máximo 100 caracteres"), {
            statusCode: 400,
         });
      }
   }

   // Genealogia externa — nome da mãe (opcional)
   if (data.damExternalName !== undefined && data.damExternalName !== null) {
      if (data.damExternalName.trim().length > 100) {
         throw Object.assign(new Error("Nome externo da mãe deve ter no máximo 100 caracteres"), {
            statusCode: 400,
         });
      }
   }
}

function validateUpdate(data: UpdateAnimalRequest): void {
   // Brinco
   if (data.currentEarTag !== undefined && data.currentEarTag !== null) {
      if (data.currentEarTag.trim().length < 1) {
         throw Object.assign(new Error("Brinco não pode ser vazio"), { statusCode: 400 });
      }
      if (data.currentEarTag.trim().length > 20) {
         throw Object.assign(new Error("Brinco deve ter no máximo 20 caracteres"), {
            statusCode: 400,
         });
      }
   }

   // Nome
   if (data.name !== undefined && data.name !== null) {
      if (data.name.trim().length < 1) {
         throw Object.assign(new Error("Nome não pode ser vazio"), { statusCode: 400 });
      }
      if (data.name.trim().length > 50) {
         throw Object.assign(new Error("Nome deve ter no máximo 50 caracteres"), {
            statusCode: 400,
         });
      }
   }

   // Raça
   if (data.breed !== undefined) {
      if (data.breed.trim().length < 2) {
         throw Object.assign(new Error("Raça deve ter pelo menos 2 caracteres"), {
            statusCode: 400,
         });
      }
      if (data.breed.trim().length > 50) {
         throw Object.assign(new Error("Raça deve ter no máximo 50 caracteres"), {
            statusCode: 400,
         });
      }
   }

   // Sexo
   if (data.gender !== undefined && !VALID_GENDERS.includes(data.gender)) {
      throw Object.assign(new Error(`Sexo inválido. Permitidos: ${VALID_GENDERS.join(", ")}`), {
         statusCode: 400,
      });
   }

   // Data de nascimento
   if (data.birthDate !== undefined && data.birthDate !== null) {
      if (!isValideDate(data.birthDate)) {
         throw Object.assign(
            new Error("Data de nascimento inválida. Use formato ISO (YYYY-MM-DD)"),
            { statusCode: 400 },
         );
      }
      if (!isNotFutureDate(data.birthDate)) {
         throw Object.assign(new Error("Data de nascimento não pode ser futura"), {
            statusCode: 400,
         });
      }
   }

   // Status
   if (data.status !== undefined && !VALID_STATUS.includes(data.status)) {
      throw Object.assign(new Error(`Status inválido. Permitidos: ${VALID_STATUS.join(", ")}`), {
         statusCode: 400,
      });
   }

   // Pasto
   if (data.pastureId !== undefined && data.pastureId !== null) {
      if (data.pastureId.trim() === "") {
         throw Object.assign(new Error("ID do pasto não pode ser vazio"), { statusCode: 400 });
      }
   }
   // Comprador
   if (data.buyerId !== undefined && data.buyerId !== null) {
      if (data.buyerId.trim() === "") {
         throw Object.assign(new Error("ID do comprador não pode ser vazio"), { statusCode: 400 });
      }
   }

   // Data da venda — opcional, mas se informada deve ser válida e não futura
   if (data.saleDate !== undefined && data.saleDate !== null) {
      if (!isValideDate(data.saleDate)) {
         throw Object.assign(new Error("Data da venda inválida. Use formato ISO (YYYY-MM-DD)"), {
            statusCode: 400,
         });
      }
      if (!isNotFutureDate(data.saleDate)) {
         throw Object.assign(new Error("Data da venda não pode ser futura"), { statusCode: 400 });
      }
   }

   // Observações da venda — opcional, mas com limite de tamanho
   if (data.saleNotes !== undefined && data.saleNotes !== null) {
      if (data.saleNotes.trim().length > 500) {
         throw Object.assign(new Error("Observações da venda devem ter no máximo 500 caracteres"), {
            statusCode: 400,
         });
      }
   }
}

export default { validateCreate, validateUpdate };
