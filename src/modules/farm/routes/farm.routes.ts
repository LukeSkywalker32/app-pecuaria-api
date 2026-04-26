// ========================================
// FARM ROUTES
// ========================================

import { protectRoute, requirePermission } from "@shared/middlewares/authMiddleware";
import { Router } from "express";
import multer from "multer";
import farmController from "../controllers/farm.controller";

const farmRoutes = Router();

// Multer em memória — o buffer é repassado direto ao Cloudinary
// Sem salvar nada em disco
const upload = multer({
   storage: multer.memoryStorage(),
   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB — validação extra no controller
});

// Todas as rotas exigem autenticação
farmRoutes.use(protectRoute);

/**
 * POST /api/farms
 * Cria uma nova fazenda — apenas admin
 */
farmRoutes.post("/", requirePermission("create_farm"), farmController.create.bind(farmController));

/**
 * GET /api/farms
 * Admin: lista todas | Owner/outros: retorna apenas a própria fazenda
 */
farmRoutes.get("/", farmController.list.bind(farmController));

/**
 * GET /api/farms/:id
 * Admin: qualquer fazenda | Owner/outros: apenas a própria
 */
farmRoutes.get("/:id", farmController.findById.bind(farmController));

/**
 * PUT /api/farms/:id
 * Admin: qualquer fazenda | Owner: apenas a própria
 */
farmRoutes.put("/:id", farmController.update.bind(farmController));

/**
 * PATCH /api/farms/:id/logo
 * Upload da logo — admin ou owner da fazenda
 * Campo do form: "logo"
 */
farmRoutes.patch(
   "/:id/logo",
   upload.single("logo"),
   farmController.uploadLogo.bind(farmController),
);

/**
 * PATCH /api/farms/:id/activate
 * Ativa a fazenda — apenas admin
 */
farmRoutes.patch(
   "/:id/activate",
   requirePermission("activate_farm"),
   farmController.activate.bind(farmController),
);

/**
 * PATCH /api/farms/:id/deactivate
 * Desativa a fazenda — apenas admin
 */
farmRoutes.patch(
   "/:id/deactivate",
   requirePermission("deactivate_farm"),
   farmController.deactivate.bind(farmController),
);

/**
 * DELETE /api/farms/:id
 * Remove permanentemente — apenas admin
 */
farmRoutes.delete(
   "/:id",
   requirePermission("delete_farm"),
   farmController.remove.bind(farmController),
);

export default farmRoutes;
