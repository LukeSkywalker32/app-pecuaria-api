import { Router } from "express";
import { protectRoute, requirePermission } from "@/shared/middlewares/authMiddleware";
import animalController from "../controllers/animal.controller";

const animalRoutes = Router();

animalRoutes.use(protectRoute);

animalRoutes.post(
   "/",
   requirePermission("create_animal"),
   animalController.create.bind(animalController),
);
animalRoutes.get("/", animalController.list.bind(animalController));
animalRoutes.get("/:id", animalController.findById.bind(animalController));
animalRoutes.put(
   "/:id",
   requirePermission("edit_animal"),
   animalController.update.bind(animalController),
);
animalRoutes.delete(
   "/:id",
   requirePermission("delete_animal"),
   animalController.remove.bind(animalController),
);

export default animalRoutes;
