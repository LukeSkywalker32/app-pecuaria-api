// ========================================
// ESTRUS CONTROLLER (CIO)
// ========================================

import type { NextFunction, Request, Response } from "express";
import estrusService from "../services/estrus.service";
import type {
   CreateEstrusRequest,
   ListEstrusQuery,
   UpdateEstrusRequest,
} from "../types/estrus.types";

function queryString(value: unknown): string | undefined {
   if (typeof value === "string") return value;
   if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : undefined;
   return undefined;
}

class EstrusController {
   /**
    * POST /api/estrus
    */
   async create(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const userId = req.userId as string;
         const body = req.body as CreateEstrusRequest;

         const estrus = await estrusService.create(farmId, userId, body);
         res.status(201).json(estrus);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/estrus
    */
   async list(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;

         const query: ListEstrusQuery = {
            animalId: queryString(req.query.animalId),
            intensity: queryString(req.query.intensity) as ListEstrusQuery["intensity"],
            dateFrom: queryString(req.query.dateFrom),
            dateTo: queryString(req.query.dateTo),
            upcoming: req.query.upcoming === "true",
         };

         const estrus = await estrusService.list(farmId, query);
         res.status(200).json(estrus);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/estrus/:id
    */
   async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         const estrus = await estrusService.getById(farmId, id);
         res.status(200).json(estrus);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/estrus/animal/:animalId
    */
   async listByAnimal(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { animalId } = req.params as { animalId: string };

         const estrus = await estrusService.listByAnimal(farmId, animalId);
         res.status(200).json(estrus);
      } catch (error) {
         next(error);
      }
   }

   /**
    * PUT /api/estrus/:id
    */
   async update(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };
         const body = req.body as UpdateEstrusRequest;

         const estrus = await estrusService.update(farmId, id, body);
         res.status(200).json(estrus);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/estrus/upcoming
    */
   async getUpcoming(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const dias = req.query.dias ? Number(req.query.dias) : 7;

         const estrus = await estrusService.getUpcoming(farmId, dias);
         res.status(200).json(estrus);
      } catch (error) {
         next(error);
      }
   }
}

export default new EstrusController();
