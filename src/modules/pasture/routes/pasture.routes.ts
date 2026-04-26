// ========================================
// PASTURE ROUTES
// ========================================

import { protectRoute, requirePermission } from "@shared/middlewares/authMiddleware";
import { Router } from "express";
import pastureController from "../controllers/pasture.controller";

const pastureRoutes = Router();

// Todas as rotas exigem autenticação
pastureRoutes.use(protectRoute);

/**
 * POST /api/pastures
 * Cria um pasto — owner, farmmanager, admin
 */
pastureRoutes.post(
   "/",
   requirePermission("create_pasture"),
   pastureController.create.bind(pastureController),
);

/**
 * GET /api/pastures
 * Lista pastos da fazenda
 * Query: ?active=true&type=native&search=pasto1
 */
pastureRoutes.get("/", pastureController.list.bind(pastureController));

/**
 * GET /api/pastures/:id
 * Busca pasto por ID
 */
pastureRoutes.get("/:id", pastureController.findById.bind(pastureController));

/**
 * PUT /api/pastures/:id
 * Atualiza pasto — owner, farmmanager, admin
 */
pastureRoutes.put(
   "/:id",
   requirePermission("edit_pasture"),
   pastureController.update.bind(pastureController),
);

/**
 * PATCH /api/pastures/:id/activate
 * Ativa pasto — owner, farmmanager, admin
 */
pastureRoutes.patch(
   "/:id/activate",
   requirePermission("edit_pasture"),
   pastureController.activate.bind(pastureController),
);

/**
 * PATCH /api/pastures/:id/deactivate
 * Desativa pasto — bloqueia se houver animais
 */
pastureRoutes.patch(
   "/:id/deactivate",
   requirePermission("edit_pasture"),
   pastureController.deactivate.bind(pastureController),
);

/**
 * DELETE /api/pastures/:id
 * Remove pasto — owner, farmmanager, admin
 */
pastureRoutes.delete(
   "/:id",
   requirePermission("delete_pasture"),
   pastureController.remove.bind(pastureController),
);

export default pastureRoutes;
