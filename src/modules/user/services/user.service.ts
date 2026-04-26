// ========================================
// USER SERVICE
// ========================================

import { prisma } from "@config/database";
import type { Permission, Prisma } from "@prisma-client";
import bcrypt from "bcryptjs";
import type {
   AdminResetPasswordRequest,
   ChangePasswordRequest,
   CreateUserRequest,
   ListUsersQuery,
   UpdateUserRequest,
   UserResponse,
} from "../types/user.types";
import userValidator from "../validators/user.validator";

/**
 * Campos públicos retornados — nunca expõe a senha
 */
const PUBLIC_USER_SELECT = {
   id: true,
   fullName: true,
   username: true,
   email: true,
   phone: true,
   role: true,
   active: true,
   farmId: true,
   crmv: true,
   graduationDate: true,
   specialties: true,
   lastLogin: true,
   createdAt: true,
   updatedAt: true,
} satisfies Prisma.UserSelect;

class UserService {
   /**
    * Cria um novo usuário na fazenda
    * Quem pode chamar: admin, owner, farmmanager (verificado na rota via requirePermission)
    */
   async create(farmId: string, data: CreateUserRequest): Promise<UserResponse> {
      // 1. Validar campos
      userValidator.validateCreate(data);

      // 2. Verificar se username já existe nesta fazenda
      const usernameInUse = await prisma.user.findUnique({
         where: {
            farmId_username: {
               farmId,
               username: data.username.trim(),
            },
         },
      });

      if (usernameInUse) {
         throw Object.assign(new Error("Username already in use in this farm"), {
            statusCode: 409,
         });
      }

      // 3. Verificar se email já existe nesta fazenda
      const emailInUse = await prisma.user.findFirst({
         where: {
            farmId,
            email: data.email.trim().toLowerCase(),
         },
      });

      if (emailInUse) {
         throw Object.assign(new Error("Email already in use in this farm"), { statusCode: 409 });
      }

      // 4. Hash da senha
      const passwordHash = await bcrypt.hash(data.password, 10);

      // 5. Criar usuário
      const user = await prisma.user.create({
         data: {
            farmId,
            fullName: data.fullName.trim(),
            username: data.username.trim(),
            email: data.email.trim().toLowerCase(),
            phone: data.phone?.trim() ?? null,
            password: passwordHash,
            role: data.role,
            crmv: data.crmv?.trim() ?? null,
            graduationDate: data.graduationDate ? new Date(data.graduationDate) : null,
            specialties: data.specialties ?? [],
         },
         select: PUBLIC_USER_SELECT,
      });

      return user as UserResponse;
   }

   /**
    * Lista todos os usuários de uma fazenda
    * Suporta filtro por role, status e busca por nome/username/email
    */
   async list(farmId: string, query: ListUsersQuery): Promise<UserResponse[]> {
      const where: Prisma.UserWhereInput = { farmId };

      if (query.role) {
         where.role = query.role as Permission;
      }

      if (query.active !== undefined) {
         where.active = query.active;
      }

      if (query.search) {
         const term = query.search.trim();
         where.OR = [
            { fullName: { contains: term, mode: "insensitive" } },
            { username: { contains: term, mode: "insensitive" } },
            { email: { contains: term, mode: "insensitive" } },
         ];
      }

      const users = await prisma.user.findMany({
         where,
         select: PUBLIC_USER_SELECT,
         orderBy: { fullName: "asc" },
      });

      return users as UserResponse[];
   }

   /**
    * Busca um usuário pelo ID, dentro da fazenda do solicitante
    */
   async findById(farmId: string, userId: string): Promise<UserResponse> {
      const user = await prisma.user.findFirst({
         where: { id: userId, farmId },
         select: PUBLIC_USER_SELECT,
      });

      if (!user) {
         throw Object.assign(new Error("User not found"), { statusCode: 404 });
      }

      return user as UserResponse;
   }

   /**
    * Atualiza dados de um usuário
    * O próprio usuário pode editar o próprio perfil (verificado no controller)
    * Admin/owner/farmmanager podem editar qualquer usuário da fazenda
    */
   async update(farmId: string, userId: string, data: UpdateUserRequest): Promise<UserResponse> {
      // 1. Verificar se o usuário existe
      await this.findById(farmId, userId);

      // 2. Validar campos
      userValidator.validateUpdate(data);

      // 3. Verificar conflito de username
      if (data.username) {
         const conflict = await prisma.user.findFirst({
            where: {
               farmId,
               username: data.username.trim(),
               NOT: { id: userId },
            },
         });

         if (conflict) {
            throw Object.assign(new Error("Username already in use"), { statusCode: 409 });
         }
      }

      // 4. Verificar conflito de email
      if (data.email) {
         const conflict = await prisma.user.findFirst({
            where: {
               farmId,
               email: data.email.trim().toLowerCase(),
               NOT: { id: userId },
            },
         });

         if (conflict) {
            throw Object.assign(new Error("Email already in use"), { statusCode: 409 });
         }
      }

      // 5. Montar payload de atualização
      const updateData: Prisma.UserUpdateInput = {};

      if (data.fullName) updateData.fullName = data.fullName.trim();
      if (data.username) updateData.username = data.username.trim();
      if (data.email) updateData.email = data.email.trim().toLowerCase();
      if (data.phone !== undefined) updateData.phone = data.phone?.trim() ?? null;
      if (data.role) updateData.role = data.role;
      if (data.crmv !== undefined) updateData.crmv = data.crmv?.trim() ?? null;
      if (data.graduationDate !== undefined) {
         updateData.graduationDate = data.graduationDate ? new Date(data.graduationDate) : null;
      }
      if (data.specialties !== undefined) updateData.specialties = data.specialties;

      const user = await prisma.user.update({
         where: { id: userId },
         data: updateData,
         select: PUBLIC_USER_SELECT,
      });

      return user as UserResponse;
   }

   /**
    * Ativa ou desativa um usuário (toggle)
    */
   async toggleActive(farmId: string, userId: string, active: boolean): Promise<UserResponse> {
      await this.findById(farmId, userId);

      const user = await prisma.user.update({
         where: { id: userId },
         data: { active },
         select: PUBLIC_USER_SELECT,
      });

      return user as UserResponse;
   }

   /**
    * Permite que o próprio usuário altere sua senha
    */
   async changePassword(
      farmId: string,
      userId: string,
      data: ChangePasswordRequest,
   ): Promise<void> {
      userValidator.validateChangePassword(data);

      // Buscar com senha (aqui precisamos da senha para comparar)
      const user = await prisma.user.findFirst({
         where: { id: userId, farmId },
      });

      if (!user) {
         throw Object.assign(new Error("User not found"), { statusCode: 404 });
      }

      const isMatch = await bcrypt.compare(data.currentPassword, user.password);

      if (!isMatch) {
         throw Object.assign(new Error("Current password is incorrect"), { statusCode: 401 });
      }

      const passwordHash = await bcrypt.hash(data.newPassword, 10);

      await prisma.user.update({
         where: { id: userId },
         data: { password: passwordHash },
      });
   }

   /**
    * Admin redefine a senha de qualquer usuário da fazenda
    */
   async adminResetPassword(
      farmId: string,
      userId: string,
      data: AdminResetPasswordRequest,
   ): Promise<void> {
      userValidator.validateAdminResetPassword(data);

      await this.findById(farmId, userId);

      const passwordHash = await bcrypt.hash(data.newPassword, 10);

      await prisma.user.update({
         where: { id: userId },
         data: { password: passwordHash },
      });
   }

   /**
    * Remove permanentemente um usuário da fazenda
    * Apenas admin pode excluir
    */
   async remove(farmId: string, userId: string, requestingUserId: string): Promise<void> {
      await this.findById(farmId, userId);

      if (userId === requestingUserId) {
         throw Object.assign(new Error("You cannot delete your own account"), { statusCode: 400 });
      }

      await prisma.user.delete({
         where: { id: userId },
      });
   }
}

export default new UserService();
