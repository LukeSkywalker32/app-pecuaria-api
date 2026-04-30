import type { NextFunction, Request, Response } from "express";
import managementService from "../services/management.service";
import type {
   CreateBatchManagementRequest,
   CreateManagementRequest,
} from "../types/management.types";

class ManagementController {
   async move(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const body = req.body as CreateManagementRequest;
         const result = await managementService.moveAnimal(farmId, body);
         res.status(201).json(result);
      } catch (error) {
         next(error);
      }
   }
   async moveBatch(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const body = req.body as CreateBatchManagementRequest;
         const result = await managementService.moveBatch(farmId, body);
         res.status(201).json({ result });
      } catch (error) {
         next(error);
      }
   }
   async listByAnimal(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { animalId } = req.params as { animalId: string };
         const history = await managementService.listByAnimal(farmId, animalId);
         res.status(200).json(history);
      } catch (error) {
         next(error);
      }
   }
}

export default new ManagementController();
