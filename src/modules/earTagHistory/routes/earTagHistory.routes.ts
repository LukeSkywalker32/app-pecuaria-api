// ========================================
// EAR TAG HISTORY ROUTES
// ========================================

import { Router } from "express";
import { protectRoute, requirePermission } from "@/shared/middlewares/authMiddleware";
import earTagController from "../controllers/earTagHistory.controller";

const earTagRoutes = Router();

earTagRoutes.use(protectRoute);

// ⚠️ Rotas específicas ANTES de /:id
earTagRoutes.get("/animal/:animalId", earTagController.listByAnimal.bind(earTagController));

/**
 * POST /api/ear-tags
 * Registra colocação de brinco — owner, farmmanager, admin
 */
earTagRoutes.post(
   "/",
   requirePermission("place_ear_tag"),
   earTagController.place.bind(earTagController),
);

/**
 * GET /api/ear-tags
 * Lista histórico de brincos da fazenda
 * Query: ?animalId=x&activeOnly=true
 */
earTagRoutes.get("/", earTagController.list.bind(earTagController));

/**
 * GET /api/ear-tags/:id
 * Busca registro por ID
 */
earTagRoutes.get("/:id", earTagController.getById.bind(earTagController));

/**
 * PATCH /api/ear-tags/:id/remove
 * Registra remoção do brinco — owner, farmmanager, admin
 */
earTagRoutes.patch(
   "/:id/remove",
   requirePermission("remove_ear_tag"),
   earTagController.markRemoved.bind(earTagController),
);

/**
 * DELETE /api/ear-tags/:id
 * Remove registro histórico — somente brincos já removidos — admin only
 */
earTagRoutes.delete(
   "/:id",
   requirePermission("delete_ear_tag_history"),
   earTagController.deleteRecord.bind(earTagController),
);

export default earTagRoutes;
