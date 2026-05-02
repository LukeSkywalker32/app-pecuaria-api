// ========================================
// PREGNANCY CONTROLLER
// ========================================

import type { NextFunction, Request, Response } from "express";
import pregnancyService from "../services/pregnancy.service";
import type {
   CreateAttemptRequest,
   CreatePregnancyRequest,
   CreateUltrasoundRequest,
   ListPregnanciesQuery,
} from "../types/pregnancy.types";

function queryString(value: unknown): string | undefined {
   if (typeof value === "string") return value;
   if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : undefined;
   return undefined;
}

class PregnancyController {
   /**
    * POST /api/pregnancies
    * Inicia nova prenhez
    */
   async create(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const body = req.body as CreatePregnancyRequest;

         const pregnancy = await pregnancyService.create(farmId, body);
         res.status(201).json(pregnancy);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/pregnancies
    * Lista prenhezes com filtros
    * Query: ?animalId=x&status=pregnant
    */
   async list(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;

         const query: ListPregnanciesQuery = {
            animalId: queryString(req.query.animalId),
            status: queryString(req.query.status) as ListPregnanciesQuery["status"],
         };

         const pregnancies = await pregnancyService.list(farmId, query);
         res.status(200).json(pregnancies);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/pregnancies/:id
    * Busca prenhez por ID
    */
   async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         const pregnancy = await pregnancyService.getById(farmId, id);
         res.status(200).json(pregnancy);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/pregnancies/animal/:animalId
    * Histórico de prenhezes de um animal
    */
   async listByAnimal(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { animalId } = req.params as { animalId: string };

         const pregnancies = await pregnancyService.listByAnimal(farmId, animalId);
         res.status(200).json(pregnancies);
      } catch (error) {
         next(error);
      }
   }

   /**
    * POST /api/pregnancies/:id/attempts
    * Registra cobertura (nova tentativa)
    */
   async registerAttempt(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };
         const body = req.body as CreateAttemptRequest;

         const pregnancy = await pregnancyService.registerAttempt(farmId, id, body);
         res.status(201).json(pregnancy);
      } catch (error) {
         next(error);
      }
   }

   /**
    * POST /api/pregnancies/:id/ultrasounds
    * Registra resultado de ultrassom
    */
   async registerUltrasound(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };
         const body = req.body as CreateUltrasoundRequest;

         const pregnancy = await pregnancyService.registerUltrasound(farmId, id, body);
         res.status(201).json(pregnancy);
      } catch (error) {
         next(error);
      }
   }
}

export default new PregnancyController();
