// ========================================
// BIRTH CONTROLLER
// ========================================

import type { NextFunction, Request, Response } from "express";
import birthService from "../services/birth.service";
import type { CreateBirthRequest, ListBirthsQuery, UpdateBirthRequest } from "../types/birth.types";

function queryString(value: unknown): string | undefined {
   if (typeof value === "string") return value;
   if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : undefined;
   return undefined;
}

class BirthController {
   /**
    * POST /api/births
    * Registra um parto
    */
   async create(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const userId = req.userId as string;
         const body = req.body as CreateBirthRequest;

         const birth = await birthService.create(farmId, userId, body);
         res.status(201).json(birth);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/births
    * Lista partos com filtros opcionais
    */
   async list(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;

         const query: ListBirthsQuery = {
            damId: queryString(req.query.damId),
            situation: queryString(req.query.situation) as ListBirthsQuery["situation"],
            dateFrom: queryString(req.query.dateFrom),
            dateTo: queryString(req.query.dateTo),
         };

         const births = await birthService.list(farmId, query);
         res.status(200).json(births);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/births/:id
    * Busca parto por ID
    */
   async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         const birth = await birthService.getById(farmId, id);
         res.status(200).json(birth);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/births/animal/:damId
    * Histórico de partos de uma fêmea
    */
   async listByAnimal(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { damId } = req.params as { damId: string };

         const births = await birthService.listByAnimal(farmId, damId);
         res.status(200).json(births);
      } catch (error) {
         next(error);
      }
   }

   /**
    * PUT /api/births/:id
    * Atualiza dados do parto
    */
   async update(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };
         const body = req.body as UpdateBirthRequest;

         const birth = await birthService.update(farmId, id, body);
         res.status(200).json(birth);
      } catch (error) {
         next(error);
      }
   }

   /**
    * DELETE /api/births/:id
    * Remove um parto (apenas se bezerro não foi registrado como animal)
    */
   async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         await birthService.remove(farmId, id);
         res.status(204).send();
      } catch (error) {
         next(error);
      }
   }
}

export default new BirthController();
