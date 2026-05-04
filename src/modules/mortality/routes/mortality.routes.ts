// ========================================
// MORTALITY ROUTES
// ========================================

import { Router } from "express";
import { protectRoute, requirePermission } from "@/shared/middlewares/authMiddleware";
import mortalityController from "../controllers/mortality.controller";

const mortalityRoutes = Router();

mortalityRoutes.use(protectRoute);

// ⚠️ Rotas específicas ANTES de /:id
mortalityRoutes.get(
   "/animal/:animalId",
   mortalityController.listByAnimal.bind(mortalityController),
);

/**
 * POST /api/mortalities
 * Registra morte — owner, farmmanager, veterinarian, admin
 */
mortalityRoutes.post(
   "/",
   requirePermission("register_mortality"),
   mortalityController.create.bind(mortalityController),
);

/**
 * GET /api/mortalities
 * Lista mortalidades da fazenda
 */
mortalityRoutes.get("/", mortalityController.list.bind(mortalityController));

/**
 * GET /api/mortalities/:id
 */
mortalityRoutes.get("/:id", mortalityController.getById.bind(mortalityController));

/**
 * PUT /api/mortalities/:id
 */
mortalityRoutes.put(
   "/:id",
   requirePermission("edit_mortality"),
   mortalityController.update.bind(mortalityController),
);

/**
 * PATCH /api/mortalities/:id/photos
 * Adiciona fotos (URLs já enviadas ao Cloudinary)
 */
mortalityRoutes.patch(
   "/:id/photos",
   requirePermission("upload_mortality_photo"),
   mortalityController.addPhotos.bind(mortalityController),
);

export default mortalityRoutes;
