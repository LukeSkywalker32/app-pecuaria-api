import { Router } from "express";
import { protectRoute, requirePermission } from "@/shared/middlewares/authMiddleware";
import buyerController from "../controllers/buyer.controller";
const buyerRoutes = Router();
buyerRoutes.use(protectRoute);
buyerRoutes.post("/", requirePermission("create_buyer"), buyerController.create);
buyerRoutes.get("/", requirePermission("view_buyers"), buyerController.list);
buyerRoutes.get("/:id", requirePermission("view_buyers"), buyerController.findById);
buyerRoutes.put("/:id", requirePermission("edit_buyer"), buyerController.update);
buyerRoutes.delete("/:id", requirePermission("delete_buyer"), buyerController.remove);
export default buyerRoutes;
//# sourceMappingURL=buyer.routes.js.map