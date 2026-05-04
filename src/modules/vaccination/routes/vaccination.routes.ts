// ========================================
// VACCINATION ROUTES
// ========================================

import { Router } from "express";
import { protectRoute, requirePermission } from "@/shared/middlewares/authMiddleware";
import vaccinationController from "../controller/vaccination.controller";

const vaccinationRoutes = Router();

vaccinationRoutes.use(protectRoute);

// ⚠️ Rotas específicas ANTES de /:id
vaccinationRoutes.get("/upcoming", vaccinationController.getUpcoming.bind(vaccinationController));
vaccinationRoutes.get(
   "/animal/:animalId",
   vaccinationController.listByAnimal.bind(vaccinationController),
);

/**
 * POST /api/vaccinations
 * Registra vacinação — owner, farmmanager, veterinarian, admin
 */
vaccinationRoutes.post(
   "/",
   requirePermission("register_vaccination"),
   vaccinationController.create.bind(vaccinationController),
);

/**
 * GET /api/vaccinations
 * Lista vacinações
 * Query: ?animalId=x&vaccineType=Aftosa&dateFrom=2024-01-01&upcoming=true
 */
vaccinationRoutes.get("/", vaccinationController.list.bind(vaccinationController));

/**
 * GET /api/vaccinations/:id
 */
vaccinationRoutes.get("/:id", vaccinationController.getById.bind(vaccinationController));

/**
 * PUT /api/vaccinations/:id
 */
vaccinationRoutes.put(
   "/:id",
   requirePermission("edit_vaccination"),
   vaccinationController.update.bind(vaccinationController),
);

/**
 * DELETE /api/vaccinations/:id
 */
vaccinationRoutes.delete(
   "/:id",
   requirePermission("edit_vaccination"),
   vaccinationController.remove.bind(vaccinationController),
);

export default vaccinationRoutes;
