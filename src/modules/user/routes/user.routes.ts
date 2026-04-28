import { Router } from "express";
import { protectRoute, requirePermission } from "@/shared/middlewares/authMiddleware";
import userController from "../controllers/user.controller";

const userRoutes = Router();

//Todas as rotas exigem autenticação
userRoutes.use(protectRoute);
//GET/api/users/me
//Retorna o perfil do usuario autenticado
userRoutes.get("/me", userController.me.bind(userController));
//PACTH /api/users/me/change-password
//Altera a própria senha
userRoutes.patch("/me/change-password", userController.changePassword.bind(userController));
//GET/api/users
//Lista todos os usuarios da fazenda
userRoutes.get("/", userController.list.bind(userController));
/**
 * POST /api/users
 * Cria um novo usuário
 * Permissão: admin pode criar qualquer role | owner e farmmanager só criam veterinários
 */
userRoutes.post("/", userController.create.bind(userController));

/**
 * GET /api/users/:id
 * Busca usuário por ID
 */
userRoutes.get("/:id", userController.findById.bind(userController));

/**
 * PUT /api/users/:id
 * Atualiza dados de um usuário
 * A lógica de "só editar o próprio perfil" para veterinários fica no controller
 */
userRoutes.put("/:id", userController.update.bind(userController));

/**
 * PATCH /api/users/:id/activate
 * Ativa um usuário desativado
 */
userRoutes.patch(
   "/:id/activate",
   requirePermission("activate_user"),
   userController.activate.bind(userController),
);

/**
 * PATCH /api/users/:id/deactivate
 * Desativa um usuário (soft delete)
 */
userRoutes.patch(
   "/:id/deactivate",
   requirePermission("deactivate_user"),
   userController.deactivate.bind(userController),
);

/**
 * PATCH /api/users/:id/reset-password
 * Admin redefine senha de qualquer usuário
 */
userRoutes.patch(
   "/:id/reset-password",
   requirePermission("reset_user_password"),
   userController.adminResetPassword.bind(userController),
);

/**
 * DELETE /api/users/:id
 * Remove permanentemente um usuário (apenas admin)
 */
userRoutes.delete(
   "/:id",
   requirePermission("delete_user"),
   userController.remove.bind(userController),
);

export default userRoutes;
