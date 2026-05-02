// ========================================
// PREGNANCY ROUTES
// ========================================

import { Router } from "express";
import { protectRoute, requirePermission } from "@/shared/middlewares/authMiddleware";
import pregnancyController from "../controllers/pregnancy.controller";

const pregnancyRoutes = Router();

pregnancyRoutes.use(protectRoute);

// ⚠️ Rotas específicas ANTES de /:id
pregnancyRoutes.get(
   "/animal/:animalId",
   pregnancyController.listByAnimal.bind(pregnancyController),
);

/**
 * POST /api/pregnancies
 * Inicia prenhez — owner, farmmanager, admin
 */
pregnancyRoutes.post(
   "/",
   requirePermission("edit_pregnancy"),
   pregnancyController.create.bind(pregnancyController),
);

/**
 * GET /api/pregnancies
 * Lista prenhezes
 */
pregnancyRoutes.get("/", pregnancyController.list.bind(pregnancyController));

/**
 * GET /api/pregnancies/:id
 */
pregnancyRoutes.get("/:id", pregnancyController.getById.bind(pregnancyController));

/**
 * POST /api/pregnancies/:id/attempts
 * Registra cobertura — owner, farmmanager, admin
 */
pregnancyRoutes.post(
   "/:id/attempts",
   requirePermission("register_mating"),
   pregnancyController.registerAttempt.bind(pregnancyController),
);

/**
 * POST /api/pregnancies/:id/ultrasounds
 * Registra ultrassom — veterinário, owner, farmmanager, admin
 */
pregnancyRoutes.post(
   "/:id/ultrasounds",
   requirePermission("register_ultrasound_30"),
   pregnancyController.registerUltrasound.bind(pregnancyController),
);

export default pregnancyRoutes;
