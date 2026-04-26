//Controller de pasto
// ========================================
// PASTURE CONTROLLER
// ========================================

import type { NextFunction, Request, Response } from "express";
import pastureService from "../services/pasture.service";
import type {
   CreatePastureRequest,
   ListPasturesQuery,
   PastureType,
   UpdatePastureRequest,
} from "../types/pasture.types";

// Normaliza query params — req.query pode ser string | string[] | ParsedQs
function queryString(value: unknown): string | undefined {
   if (typeof value === "string") return value;
   if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : undefined;
   return undefined;
}

class PastureController {
   /**
    * POST /api/pastures
    * Cria um novo pasto — owner, farmmanager, admin
    */
   async create(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const body = req.body as CreatePastureRequest;

         const pasture = await pastureService.create(farmId, body);
         res.status(201).json(pasture);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/pastures
    * Lista pastos da fazenda com filtros opcionais
    */
   async list(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const activeParam = queryString(req.query.active);

         const query: ListPasturesQuery = {
            active: activeParam !== undefined ? activeParam === "true" : undefined,
            type: queryString(req.query.type) as PastureType | undefined,
            search: queryString(req.query.search),
         };

         const pastures = await pastureService.list(farmId, query);
         res.status(200).json(pastures);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/pastures/:id
    * Busca pasto por ID
    */
   async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         const pasture = await pastureService.findById(farmId, id);
         res.status(200).json(pasture);
      } catch (error) {
         next(error);
      }
   }

   /**
    * PUT /api/pastures/:id
    * Atualiza dados do pasto
    */
   async update(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };
         const body = req.body as UpdatePastureRequest;

         const pasture = await pastureService.update(farmId, id, body);
         res.status(200).json(pasture);
      } catch (error) {
         next(error);
      }
   }

   /**
    * PATCH /api/pastures/:id/activate
    * Ativa o pasto
    */
   async activate(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         const pasture = await pastureService.toggleActive(farmId, id, true);
         res.status(200).json(pasture);
      } catch (error) {
         next(error);
      }
   }

   /**
    * PATCH /api/pastures/:id/deactivate
    * Desativa o pasto — bloqueia se houver animais
    */
   async deactivate(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         const pasture = await pastureService.toggleActive(farmId, id, false);
         res.status(200).json(pasture);
      } catch (error) {
         next(error);
      }
   }

   /**
    * DELETE /api/pastures/:id
    * Remove pasto — bloqueia se houver animais
    */
   async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         await pastureService.remove(farmId, id);
         res.status(204).send();
      } catch (error) {
         next(error);
      }
   }
}

export default new PastureController();
