import { Router } from "express";
import { protectRoute, requirePermission } from "@/shared/middlewares/authMiddleware";
import estrusController from "../controllers/estrus.controller";

const estrusRoutes = Router();

estrusRoutes.use(protectRoute);

// ⚠️ Rotas específicas ANTES de /:id
estrusRoutes.get("/upcoming", estrusController.getUpcoming.bind(estrusController));
estrusRoutes.get("/animal/:animalId", estrusController.listByAnimal.bind(estrusController));

estrusRoutes.post(
   "/",
   requirePermission("register_estrus"),
   estrusController.create.bind(estrusController),
);

estrusRoutes.get("/", estrusController.list.bind(estrusController));

// ✅ getById em vez de findById — alinhado com o service
estrusRoutes.get("/:id", estrusController.getById.bind(estrusController));

estrusRoutes.put(
   "/:id",
   requirePermission("edit_estrus"),
   estrusController.update.bind(estrusController),
);

export default estrusRoutes;
