// ========================================
// BIRTH ROUTES
// ========================================

import { Router } from "express";
import { protectRoute, requirePermission } from "@/shared/middlewares/authMiddleware";
import birthController from "../controllers/birth.controller";

const birthRoutes = Router();

birthRoutes.use(protectRoute);

// ⚠️ Rota específica ANTES de /:id
birthRoutes.get("/animal/:damId", birthController.listByAnimal.bind(birthController));

/**
 * POST /api/births
 * Registra um parto — owner, farmmanager, veterinarian, admin
 */
birthRoutes.post(
   "/",
   requirePermission("register_birth"),
   birthController.create.bind(birthController),
);

/**
 * GET /api/births
 * Lista partos da fazenda
 * Query: ?damId=x&situation=normal&dateFrom=2024-01-01&dateTo=2024-12-31
 */
birthRoutes.get("/", birthController.list.bind(birthController));

/**
 * GET /api/births/:id
 * Busca parto por ID
 */
birthRoutes.get("/:id", birthController.getById.bind(birthController));

/**
 * PUT /api/births/:id
 * Atualiza dados do parto
 */
birthRoutes.put(
   "/:id",
   requirePermission("edit_birth"),
   birthController.update.bind(birthController),
);

/**
 * DELETE /api/births/:id
 * Remove parto — apenas se bezerro ainda não foi registrado como animal
 */
birthRoutes.delete(
   "/:id",
   requirePermission("delete_birth"),
   birthController.remove.bind(birthController),
);

export default birthRoutes;
