// ========================================
// USER CONTROLLER
// ========================================

import type { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import type {
   AdminResetPasswordRequest,
   ChangePasswordRequest,
   CreateUserRequest,
   ListUsersQuery,
   UpdateUserRequest,
} from "../types/user.types";

//hierarquia de roles
const ROLE_HIERARCHY: Record<string, number> = {
   admin: 4,
   owner: 3,
   farmmanager: 2,
   veterinarian: 1,
};

class UserController {
   //Cria um novo usuário na fazenda
   // POST /api/users
   async create(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const callerFarmId = req.farmId as string;
         const callerRole = req.role as string;
         const body = req.body as CreateUserRequest;

         // Lógica de Hierarquia Simplificada (Ignora requirePermission da rota)
         if (callerRole === "admin") {
            //Admin cria fazenda e farmId vem no token do body
            if (!body.farmId) {
               res.status(400).json({ error: "admin deve informar no body" });
               return;
            }
         } else if (callerRole === "owner") {
            // Owner pode criar Gerente ou Veterinário na sua fazenda
            const allowed = ["farmmanager", "veterinarian"];
            if (!allowed.includes(body.role)) {
               res.status(403).json({
                  error: "Proprietarios só podem criar gerentes ou veterinários",
               });
               return;
            }
            body.farmId = callerFarmId;
         } else if (callerRole === "farmmanager") {
            // Gerente só cria Veterinário na sua fazenda
            if (body.role !== "veterinarian") {
               res.status(403).json({ error: "Gerente só pode criar veterinários" });
               return;
            }
            body.farmId = callerFarmId;
         } else {
            res.status(403).json({ error: "Permissão insuficiente para criar usuários" });
            return;
         }

         const user = await userService.create(body.farmId, body);
         res.status(201).json(user);
      } catch (error) {
         next(error);
      }
   }

   /**
    * Lista usuários da fazenda
    * GET /api/users?role=veterinarian&active=true&search=João
    * Permissão: qualquer usuário autenticado da fazenda
    */
   async list(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const query: ListUsersQuery = {
            role: req.query.role as ListUsersQuery["role"],
            active: req.query.active !== undefined ? req.query.active === "true" : undefined,
            search: req.query.search as string | undefined,
         };

         const users = await userService.list(farmId, query);

         res.status(200).json(users);
      } catch (error) {
         next(error);
      }
   }

   /**
    * Busca um usuário pelo ID
    * GET /api/users/:id
    * Permissão: qualquer usuário autenticado da fazenda
    */
   async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         const user = await userService.findById(farmId, id);

         res.status(200).json(user);
      } catch (error) {
         next(error);
      }
   }

   /**
    * Retorna o perfil do usuário autenticado
    * GET /api/users/me
    */
   async me(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const userId = req.userId as string;

         const user = await userService.findById(farmId, userId);

         res.status(200).json(user);
      } catch (error) {
         next(error);
      }
   }

   /**
    * Atualiza dados de um usuário
    * PUT /api/users/:id
    * Permissão: edit_user (gerentes) | edit_own_profile (veterinário editando a si mesmo)
    */
   async update(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const callerUserId = req.userId as string;
         const callerRole = req.role as string;
         const { id } = req.params as { id: string };
         const body = req.body as UpdateUserRequest;

         // Veterinário só edita o próprio perfil
         if (callerRole === "veterinarian" && id !== callerUserId) {
            res.status(403).json({ error: "Veterinário só pode editar o próprio perfil" });
            return;
         }

         // Verifica hierarquia — impede editar usuário de role igual ou superior
         if (body.role) {
            const callerLevel = ROLE_HIERARCHY[callerRole] ?? 0;
            const targetLevel = ROLE_HIERARCHY[body.role] ?? 0;

            if (targetLevel >= callerLevel) {
               res.status(403).json({
                  error: "Não é possível atribuir role igual ou superior ao seu",
               });
               return;
            }
         }

         const user = await userService.update(farmId, id, body, callerRole, callerUserId);
         res.status(200).json(user);
      } catch (error) {
         next(error);
      }
   }

   /**
    * Ativa um usuário
    * PATCH /api/users/:id/activate
    * Permissão: activate_user
    */
   async activate(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         const user = await userService.toggleActive(farmId, id, true);

         res.status(200).json(user);
      } catch (error) {
         next(error);
      }
   }

   /**
    * Desativa um usuário (soft delete)
    * PATCH /api/users/:id/deactivate
    * Permissão: deactivate_user
    */
   async deactivate(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         const user = await userService.toggleActive(farmId, id, false);

         res.status(200).json(user);
      } catch (error) {
         next(error);
      }
   }

   /**
    * Altera a senha do próprio usuário
    * PATCH /api/users/me/change-password
    */
   async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const userId = req.userId as string;
         const body = req.body as ChangePasswordRequest;

         await userService.changePassword(farmId, userId, body);

         res.status(200).json({ message: "Senha alterada com sucesso" });
      } catch (error) {
         next(error);
      }
   }

   /**
    * Admin redefine a senha de qualquer usuário
    * PATCH /api/users/:id/reset-password
    * Permissão: reset_user_password
    */
   async adminResetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };
         const body = req.body as AdminResetPasswordRequest;

         await userService.adminResetPassword(farmId, id, body);

         res.status(200).json({ message: "Senha redefinida com sucesso" });
      } catch (error) {
         next(error);
      }
   }

   /**
    * Remove permanentemente um usuário
    * DELETE /api/users/:id
    * Permissão: delete_user (somente admin)
    */
   async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const userId = req.userId as string;
         const { id } = req.params as { id: string };

         await userService.remove(farmId, id, userId);

         res.status(204).send();
      } catch (error) {
         next(error);
      }
   }
}

export default new UserController();
