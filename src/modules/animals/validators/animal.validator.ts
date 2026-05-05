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
      throw new Error("Chip ID deve ter pelo menos 3 caracteres");
   }
   if (data.chipId.trim().length > 30) {
      throw new Error("Chip ID deve ter no máximo 30 caracteres");
   }
   if (!/^[a-zA-Z0-9-]+$/.test(data.chipId.trim())) {
      throw new Error("Chip ID deve conter apenas letras, números e hífens");
   }

   // Brinco — opcional, mas se informado deve ser válido
   if (data.currentEarTag !== undefined && data.currentEarTag !== null) {
      if (data.currentEarTag.trim().length < 1) {
         throw new Error("Brinco não pode ser vazio");
      }
      if (data.currentEarTag.trim().length > 20) {
         throw new Error("Brinco deve ter no máximo 20 caracteres");
      }
   }

   // Nome — opcional, mas se informado deve ter tamanho mínimo
   if (data.name !== undefined && data.name !== null) {
      if (data.name.trim().length < 1) {
         throw new Error("Nome não pode ser vazio");
      }
      if (data.name.trim().length > 50) {
         throw new Error("Nome deve ter no máximo 50 caracteres");
      }
   }

   // Raça — obrigatória
   if (!data.breed || data.breed.trim().length < 2) {
      throw new Error("Raça deve ter pelo menos 2 caracteres");
   }
   if (data.breed.trim().length > 50) {
      throw new Error("Raça deve ter no máximo 50 caracteres");
   }

   // Sexo — obrigatório
   if (!data.gender || !VALID_GENDERS.includes(data.gender)) {
      throw new Error(`Sexo inválido. Permitidos: ${VALID_GENDERS.join(", ")}`);
   }

   // Data de nascimento — obrigatória
   if (!data.birthDate) {
      throw new Error("Data de nascimento é obrigatória");
   }
   if (!isValideDate(data.birthDate)) {
      throw new Error("Data de nascimento inválida. Use formato ISO (YYYY-MM-DD)");
   }
   if (!isNotFutureDate(data.birthDate)) {
      throw new Error("Data de nascimento não pode ser futura");
   }

   // Origem — obrigatória
   if (!data.origin || !VALID_ORIGINS.includes(data.origin)) {
      throw new Error(`Origem inválida. Permitidas: ${VALID_ORIGINS.join(", ")}`);
   }

   // Pasto — obrigatório para nascidos, opcional para comprados
   if (data.origin === "born" && !data.pastureId) {
      throw new Error("Animais nascidos na fazenda devem ter pasto informado");
   }

   // Status inicial — opcional, mas se informado deve ser válido
   if (data.status !== undefined && !VALID_STATUS.includes(data.status)) {
      throw new Error(`Status inválido. Permitidos: ${VALID_STATUS.join(", ")}`);
   }

   // Genealogia interna — IDs opcionais mas não podem ser vazios se informados
   if (data.sireId !== undefined && data.sireId !== null && data.sireId.trim() === "") {
      throw new Error("ID do pai não pode ser vazio");
   }
   if (data.damId !== undefined && data.damId !== null && data.damId.trim() === "") {
      throw new Error("ID da mãe não pode ser vazio");
   }

   // Genealogia externa — nome do pai (opcional)
   if (data.sireExternalName !== undefined && data.sireExternalName !== null) {
      if (data.sireExternalName.trim().length > 100) {
         throw new Error("Nome externo do pai deve ter no máximo 100 caracteres");
      }
   }

   // Genealogia externa — nome da mãe (opcional)
   if (data.damExternalName !== undefined && data.damExternalName !== null) {
      if (data.damExternalName.trim().length > 100) {
         throw new Error("Nome externo da mãe deve ter no máximo 100 caracteres");
      }
   }
}

function validateUpdate(data: UpdateAnimalRequest): void {
   // Brinco
   if (data.currentEarTag !== undefined && data.currentEarTag !== null) {
      if (data.currentEarTag.trim().length < 1) {
         throw new Error("Brinco não pode ser vazio");
      }
      if (data.currentEarTag.trim().length > 20) {
         throw new Error("Brinco deve ter no máximo 20 caracteres");
      }
   }

   // Nome
   if (data.name !== undefined && data.name !== null) {
      if (data.name.trim().length < 1) {
         throw new Error("Nome não pode ser vazio");
      }
      if (data.name.trim().length > 50) {
         throw new Error("Nome deve ter no máximo 50 caracteres");
      }
   }

   // Raça
   if (data.breed !== undefined) {
      if (data.breed.trim().length < 2) {
         throw new Error("Raça deve ter pelo menos 2 caracteres");
      }
      if (data.breed.trim().length > 50) {
         throw new Error("Raça deve ter no máximo 50 caracteres");
      }
   }

   // Sexo
   if (data.gender !== undefined && !VALID_GENDERS.includes(data.gender)) {
      throw new Error(`Sexo inválido. Permitidos: ${VALID_GENDERS.join(", ")}`);
   }

   // Data de nascimento
   if (data.birthDate !== undefined && data.birthDate !== null) {
      if (!isValideDate(data.birthDate)) {
         throw new Error("Data de nascimento inválida. Use formato ISO (YYYY-MM-DD)");
      }
      if (!isNotFutureDate(data.birthDate)) {
         throw new Error("Data de nascimento não pode ser futura");
      }
   }

   // Status
   if (data.status !== undefined && !VALID_STATUS.includes(data.status)) {
      throw new Error(`Status inválido. Permitidos: ${VALID_STATUS.join(", ")}`);
   }

   // Pasto
   if (data.pastureId !== undefined && data.pastureId !== null) {
      if (data.pastureId.trim() === "") {
         throw new Error("ID do pasto não pode ser vazio");
      }
   }
}

export default { validateCreate, validateUpdate };
