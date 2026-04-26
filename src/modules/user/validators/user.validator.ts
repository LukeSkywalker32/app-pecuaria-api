import type {
   AdminResetPasswordRequest,
   ChangePasswordRequest,
   CreateUserRequest,
   UpdateUserRequest,
} from "../types/user.types";

const VALID_ROLES = ["admin", "owner", "farmmanager", "veterinarian"] as const;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

function validateCreate(data: CreateUserRequest): void {
   if (!data.fullName || data.fullName.trim().length < 3) {
      throw new Error("Nome completo deve ter pelo menos 3 caracteres");
   }

   if (!data.username || data.username.trim().length < 3) {
      throw new Error("usuario deve ter pelo menos 3 caracteres");
   }

   if (!/^[a-zA-Z0-9_.-]+$/.test(data.username)) {
      throw new Error("usuario deve conter apenas letras, números, underscores, dots e dashes");
   }

   if (!data.email || !EMAIL_REGEX.test(data.email)) {
      throw new Error("Endereço de email inválido");
   }

   if (!data.password || data.password.length < 8) {
      throw new Error("Senha deve ter pelo menos 8 caracteres");
   }

   if (!STRONG_PASSWORD_REGEX.test(data.password)) {
      throw new Error(
         "Senha deve conter maiúsculas, minúsculas, números e caracteres especiais (@$!%*?&)",
      );
   }

   if (!data.role || !VALID_ROLES.includes(data.role)) {
      throw new Error(`Invalid role. Allowed: ${VALID_ROLES.join(", ")}`);
   }

   if (data.phone && !/^\+?[\d\s\-()]{8,20}$/.test(data.phone)) {
      throw new Error("Formato de telefone inválido");
   }
}

function validateUpdate(data: UpdateUserRequest): void {
   if (data.fullName !== undefined && data.fullName.trim().length < 3) {
      throw new Error("Nome completo deve ter pelo menos 3 caracteres");
   }

   if (data.username !== undefined) {
      if (data.username.trim().length < 3) {
         throw new Error("Nome de usuário deve ter pelo menos 3 caracteres");
      }
      if (!/^[a-zA-Z0-9_.-]+$/.test(data.username)) {
         throw new Error(
            "Nome de usuário deve conter apenas letras, números, underscores, dots e dashes",
         );
      }
   }

   if (data.email !== undefined && !EMAIL_REGEX.test(data.email)) {
      throw new Error("Endereço de email inválido");
   }

   if (data.role !== undefined && !VALID_ROLES.includes(data.role)) {
      throw new Error(`Invalid role. Allowed: ${VALID_ROLES.join(", ")}`);
   }

   if (
      data.phone !== undefined &&
      data.phone !== null &&
      !/^\+?[\d\s\-()]{8,20}$/.test(data.phone)
   ) {
      throw new Error("Formato de telefone inválido");
   }
}

function validateChangePassword(data: ChangePasswordRequest): void {
   if (!data.currentPassword) {
      throw new Error("Senha atual não informada");
   }

   if (!data.newPassword || data.newPassword.length < 8) {
      throw new Error("Nova senha deve ter pelo menos 8 caracteres");
   }

   if (!STRONG_PASSWORD_REGEX.test(data.newPassword)) {
      throw new Error(
         "Nova senha deve conter maiúsculas, minúsculas, números e caracteres especiais (@$!%*?&)",
      );
   }

   if (data.currentPassword === data.newPassword) {
      throw new Error("nova senha e senha atual devem ser diferentes");
   }
}

function validateAdminResetPassword(data: AdminResetPasswordRequest): void {
   if (!data.newPassword || data.newPassword.length < 8) {
      throw new Error("Nova senha deve ter pelo menos 8 caracteres");
   }

   if (!STRONG_PASSWORD_REGEX.test(data.newPassword)) {
      throw new Error(
         "Nova senha deve conter maiúsculas, minúsculas, números e caracteres especiais (@$!%*?&)",
      );
   }
}

export default {
   validateCreate,
   validateUpdate,
   validateChangePassword,
   validateAdminResetPassword,
};
