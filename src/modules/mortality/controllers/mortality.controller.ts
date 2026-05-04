// ========================================
// MORTALITY CONTROLLER
// ========================================

import type { NextFunction, Request, Response } from "express";
import mortalityService from "../services/mortality.service";
import type {
   CreateMortalityRequest,
   ListMortalitiesQuery,
   UpdateMortalityRequest,
} from "../types/mortality.types";

function queryString(value: unknown): string | undefined {
   if (typeof value === "string") return value;
   if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : undefined;
   return undefined;
}

class MortalityController {
   /**
    * POST /api/mortalities
    * Registra a morte de um animal
    */
   async create(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const userId = req.userId as string;
         const body = req.body as CreateMortalityRequest;

         const mortality = await mortalityService.create(farmId, userId, body);
         res.status(201).json(mortality);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/mortalities
    * Lista mortalidades da fazenda
    * Query: ?dateFrom=2024-01-01&dateTo=2024-12-31&severity=severe&necropsy=true
    */
   async list(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;

         const query: ListMortalitiesQuery = {
            dateFrom: queryString(req.query.dateFrom),
            dateTo: queryString(req.query.dateTo),
            severity: queryString(req.query.severity) as ListMortalitiesQuery["severity"],
            necropsy: req.query.necropsy !== undefined ? req.query.necropsy === "true" : undefined,
         };

         const mortalities = await mortalityService.list(farmId, query);
         res.status(200).json(mortalities);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/mortalities/animal/:animalId
    * Histórico de mortalidade de um animal
    */
   async listByAnimal(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { animalId } = req.params as { animalId: string };

         const mortalities = await mortalityService.listByAnimal(farmId, animalId);
         res.status(200).json(mortalities);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/mortalities/:id
    */
   async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         const mortality = await mortalityService.getById(farmId, id);
         res.status(200).json(mortality);
      } catch (error) {
         next(error);
      }
   }

   /**
    * PUT /api/mortalities/:id
    * Atualiza dados do registro
    */
   async update(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };
         const body = req.body as UpdateMortalityRequest;

         const mortality = await mortalityService.update(farmId, id, body);
         res.status(200).json(mortality);
      } catch (error) {
         next(error);
      }
   }

   /**
    * PATCH /api/mortalities/:id/photos
    * Adiciona fotos ao registro (append — não substitui)
    * Body: { photoUrls: string[] }
    */
   async addPhotos(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };
         const { photoUrls } = req.body as { photoUrls: string[] };

         if (!Array.isArray(photoUrls) || photoUrls.length === 0) {
            res.status(400).json({ error: "photoUrls deve ser um array com pelo menos 1 URL" });
            return;
         }

         const mortality = await mortalityService.addPhotos(farmId, id, photoUrls);
         res.status(200).json(mortality);
      } catch (error) {
         next(error);
      }
   }
}

export default new MortalityController();
