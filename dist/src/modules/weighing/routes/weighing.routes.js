import { Router } from "express";
import { protectRoute, requirePermission } from "@/shared/middlewares/authMiddleware";
import weighingController from "../controller/weighing.controller";
const weighingRoutes = Router();
weighingRoutes.use(protectRoute);
// ⚠️ Rotas específicas ANTES de /:id
/**
 * GET /api/weighings/animal/:animalId
 * Histórico de pesagens do animal, com GMD calculado entre pesagens consecutivas
 */
weighingRoutes.get("/animal/:animalId", requirePermission("view_weighing"), weighingController.listByAnimal.bind(weighingController));
/**
 * GET /api/weighings/animal/:animalId/export/pdf
 * Exporta o histórico de pesagens (com GMD) de um animal em PDF
 */
weighingRoutes.get("/animal/:animalId/export/pdf", requirePermission("export_pdf"), weighingController.exportAnimalPdf.bind(weighingController));
/**
 * GET /api/weighings/export/xlsx
 * Exporta a lista de pesagens da fazenda em XLSX
 */
weighingRoutes.get("/export/xlsx", requirePermission("export_csv"), weighingController.exportXlsx.bind(weighingController));
/**
 * POST /api/weighings
 * Registra pesagem — owner, farmmanager, veterinarian, admin
 */
weighingRoutes.post("/", requirePermission("register_weighing"), weighingController.create.bind(weighingController));
/**
 * GET /api/weighings
 * Lista pesagens da fazenda
 */
weighingRoutes.get("/", requirePermission("view_weighing"), weighingController.list.bind(weighingController));
/**
 * GET /api/weighings/:id
 * Pesagem específica
 */
weighingRoutes.get("/:id", requirePermission("view_weighing"), weighingController.getById.bind(weighingController));
/**
 * PUT /api/weighings/:id
 * Atualiza pesagem — owner, farmmanager, veterinarian, admin
 */
weighingRoutes.put("/:id", requirePermission("edit_weighing"), weighingController.update.bind(weighingController));
/**
 * DELETE /api/weighings/:id
 * Remove registro de pesagem — owner, farmmanager, veterinarian, admin
 */
weighingRoutes.delete("/:id", requirePermission("delete_weighing"), weighingController.remove.bind(weighingController));
export default weighingRoutes;
//# sourceMappingURL=weighing.routes.js.map