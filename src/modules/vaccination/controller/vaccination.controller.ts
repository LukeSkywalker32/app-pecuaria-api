// ========================================
// VACCINATION CONTROLLER
// ========================================

import type { NextFunction, Request, Response } from "express";
import vaccinationService from "../services/vaccination.service";
import type {
   CreateVaccinationRequest,
   ListVaccinationsQuery,
   UpdateVaccinationRequest,
} from "../types/vaccination.types";

function queryString(value: unknown): string | undefined {
   if (typeof value === "string") return value;
   if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : undefined;
   return undefined;
}

class VaccinationController {
   /**
    * POST /api/vaccinations
    * Registra vacinação
    */
   async create(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const body = req.body as CreateVaccinationRequest;

         const vaccination = await vaccinationService.create(farmId, body);
         res.status(201).json(vaccination);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/vaccinations
    * Lista vacinações com filtros
    */
   async list(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;

         const query: ListVaccinationsQuery = {
            animalId: queryString(req.query.animalId),
            vaccineType: queryString(req.query.vaccineType),
            dateFrom: queryString(req.query.dateFrom),
            dateTo: queryString(req.query.dateTo),
            upcoming: req.query.upcoming === "true",
         };

         const vaccinations = await vaccinationService.list(farmId, query);
         res.status(200).json(vaccinations);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/vaccinations/upcoming
    * Próximas doses (próximos 30 dias por padrão)
    */
   async getUpcoming(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const dias = req.query.dias ? Number(req.query.dias) : 30;

         const vaccinations = await vaccinationService.getUpcoming(farmId, dias);
         res.status(200).json(vaccinations);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/vaccinations/animal/:animalId
    * Histórico de vacinações de um animal
    */
   async listByAnimal(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { animalId } = req.params as { animalId: string };

         const vaccinations = await vaccinationService.listByAnimal(farmId, animalId);
         res.status(200).json(vaccinations);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/vaccinations/:id
    */
   async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         const vaccination = await vaccinationService.getById(farmId, id);
         res.status(200).json(vaccination);
      } catch (error) {
         next(error);
      }
   }

   /**
    * PUT /api/vaccinations/:id
    */
   async update(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };
         const body = req.body as UpdateVaccinationRequest;

         const vaccination = await vaccinationService.update(farmId, id, body);
         res.status(200).json(vaccination);
      } catch (error) {
         next(error);
      }
   }

   /**
    * DELETE /api/vaccinations/:id
    */
   async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         await vaccinationService.remove(farmId, id);
         res.status(204).send();
      } catch (error) {
         next(error);
      }
   }
}

export default new VaccinationController();
