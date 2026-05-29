import { Router } from "express";
import breedController from "@/modules/breed/controllers/breed.controller";
import { protectRoute, requirePermission } from "@/shared/middlewares/authMiddleware";

const breedRoutes = Router();

breedRoutes.use(protectRoute);

//GET /api/breeds
breedRoutes.get("/", breedController.list.bind(breedController));
//GET /api/breeds/:id
breedRoutes.get("/:id", breedController.findById.bind(breedController));
//POST /api/breeds - apenas admin
breedRoutes.post(
   "/",
   requirePermission("manage_breeds"),
   breedController.create.bind(breedController),
);
//PUT /api/breeds/:id - apenas admin
breedRoutes.put(
   "/:id",
   requirePermission("manage_breeds"),
   breedController.update.bind(breedController),
);
//PATCH /api/breeds/:id/activate - apenas admin
breedRoutes.patch(
   "/:id/activate",
   requirePermission("manage_breeds"),
   breedController.activate.bind(breedController),
);
//PATCH /api/breeds/:id/deactivate - apenas admin
breedRoutes.patch(
   "/:id/deactivate",
   requirePermission("manage_breeds"),
   breedController.deactivate.bind(breedController),
);
//DELETE /api/breeds/:id - apenas admin
breedRoutes.delete(
   "/:id",
   requirePermission("manage_breeds"),
   breedController.remove.bind(breedController),
);

export default breedRoutes;
