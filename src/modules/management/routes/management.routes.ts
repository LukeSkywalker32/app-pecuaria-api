import { Router } from "express";
import { protectRoute, requirePermission } from "@/shared/middlewares/authMiddleware";
import managementController from "../controllers/management.controller";

const managementRouters = Router();
managementRouters.use(protectRoute);

//Movimentar animal (exige permissao de manejo)
managementRouters.post(
   "/move",
   requirePermission("register_management"),
   managementController.move.bind(managementController),
);
//Movimenta lote de animais (exige permissao de manejo)
managementRouters.post(
   "/move-batch",
   requirePermission("register_management"),
   managementController.moveBatch.bind(managementController),
);
//Historico de movimentação de um animal
managementRouters.get(
   "/animal/:animalId",
   managementController.listByAnimal.bind(managementController),
);

export default managementRouters;
