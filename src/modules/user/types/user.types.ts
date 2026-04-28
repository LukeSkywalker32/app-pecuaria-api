import type { Permission } from "@prisma/client";

/**
 * Payload para criação de usuário
 * Apenas admin, owner e farmmanager podem criar usuários
 */
export interface CreateUserRequest {
   fullName: string;
   username: string;
   email: string;
   phone?: string;
   password: string;
   role: Permission;
   farmId: string;

   // Campos específicos para veterinários
   crmv?: string;
   graduationDate?: string;
   specialties?: string[];
}

/**
 * Payload para atualização de usuário
 */
export interface UpdateUserRequest {
   fullName?: string;
   username?: string;
   email?: string;
   phone?: string;
   role?: Permission;

   crmv?: string;
   graduationDate?: string;
   specialties?: string[];
}

/**
 * Payload para alteração de senha pelo próprio usuário
 */
export interface ChangePasswordRequest {
   currentPassword: string;
   newPassword: string;
}

/**
 * Payload para o admin redefinir senha de um usuário
 */
export interface AdminResetPasswordRequest {
   newPassword: string;
}

/**
 * Resposta pública de usuário (sem senha)
 */
export interface UserResponse {
   id: string;
   fullName: string;
   username: string;
   email: string;
   phone: string | null;
   role: Permission;
   active: boolean;
   farmId: string;
   farmName: string;
   crmv: string | null;
   graduationDate: Date | null;
   specialties: string[];
   lastLogin: Date | null;
   createdAt: Date;
   updatedAt: Date;
}

/**
 * Filtros para listagem de usuários
 */
export interface ListUsersQuery {
   role?: Permission;
   active?: boolean;
   search?: string;
}
