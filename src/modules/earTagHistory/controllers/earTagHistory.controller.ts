// ========================================
// EAR TAG HISTORY CONTROLLER
// ========================================

import type { NextFunction, Request, Response } from "express";
import earTagService from "../services/earTagHisotory.service";
import type {
   ListEarTagsQuery,
   PlaceEarTagRequest,
   RemoveEarTagRequest,
} from "../types/eartaghistory.types";

class EarTagController {
   /**
    * POST /api/ear-tags
    * Registra colocação de novo brinco no animal
    */
   async place(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const body = req.body as PlaceEarTagRequest;

         const record = await earTagService.place(farmId, body);
         res.status(201).json(record);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/ear-tags
    * Lista brincos da fazenda
    * Query: ?animalId=x&activeOnly=true
    */
   async list(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;

         const query: ListEarTagsQuery = {
            animalId: req.query.animalId as string | undefined,
            activeOnly: req.query.activeOnly === "true",
         };

         const records = await earTagService.list(farmId, query);
         res.status(200).json(records);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/ear-tags/animal/:animalId
    * Histórico completo de brincos de um animal
    */
   async listByAnimal(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { animalId } = req.params as { animalId: string };

         const records = await earTagService.listByAnimal(farmId, animalId);
         res.status(200).json(records);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/ear-tags/:id
    * Busca registro de brinco por ID
    */
   async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         const record = await earTagService.getById(farmId, id);
         res.status(200).json(record);
      } catch (error) {
         next(error);
      }
   }

   /**
    * PATCH /api/ear-tags/:id/remove
    * Registra remoção do brinco (fecha o histórico ativo)
    */
   async markRemoved(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };
         const body = req.body as RemoveEarTagRequest;

         const record = await earTagService.markRemoved(farmId, id, body);
         res.status(200).json(record);
      } catch (error) {
         next(error);
      }
   }

   /**
    * DELETE /api/ear-tags/:id
    * Remove permanentemente um registro do histórico (somente brincos já removidos)
    */
   async deleteRecord(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         await earTagService.deleteRecord(farmId, id);
         res.status(204).send();
      } catch (error) {
         next(error);
      }
   }
}

export default new EarTagController();
