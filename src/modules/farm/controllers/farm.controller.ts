// ========================================
// FARM CONTROLLER
// ========================================

import type { NextFunction, Request, Response } from "express";
import farmService from "../services/farm.service";
import type { CreateFarmRequest, ListFarmsQuery, UpdateFarmRequest } from "../types/farm.types";

class FarmController {
   /**
    * POST /api/farms
    * Cria uma nova fazenda — apenas admin
    */
   async create(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const body = req.body as CreateFarmRequest;
         const farm = await farmService.create(body);
         res.status(201).json(farm);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/farms
    * Admin: lista todas com filtros | Owner/outros: retorna apenas a própria
    */
   async list(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const callerRole = req.role as string;
         const callerFarmId = req.farmId as string;

         const query: ListFarmsQuery = {
            active: req.query.active !== undefined ? req.query.active === "true" : undefined,
            search: req.query.search as string | undefined,
         };

         const farms = await farmService.list(callerRole, callerFarmId, query);
         res.status(200).json(farms);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/farms/:id
    * Admin: qualquer fazenda | Owner/outros: apenas a própria
    */
   async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const callerRole = req.role as string;
         const callerFarmId = req.farmId as string;
         const { id } = req.params as { id: string };

         const farm = await farmService.findById(id, callerRole, callerFarmId);
         res.status(200).json(farm);
      } catch (error) {
         next(error);
      }
   }

   /**
    * PUT /api/farms/:id
    * Admin: qualquer fazenda | Owner: apenas a própria
    */
   async update(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const callerRole = req.role as string;
         const callerFarmId = req.farmId as string;
         const { id } = req.params as { id: string };
         const body = req.body as UpdateFarmRequest;

         const farm = await farmService.update(id, callerRole, callerFarmId, body);
         res.status(200).json(farm);
      } catch (error) {
         next(error);
      }
   }

   /**
    * PATCH /api/farms/:id/activate
    * Apenas admin
    */
   async activate(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farm = await farmService.toggleActive(req.params.id as string, true);
         res.status(200).json(farm);
      } catch (error) {
         next(error);
      }
   }

   /**
    * PATCH /api/farms/:id/deactivate
    * Apenas admin
    */
   async deactivate(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farm = await farmService.toggleActive(req.params.id as string, false);
         res.status(200).json(farm);
      } catch (error) {
         next(error);
      }
   }

   /**
    * PATCH /api/farms/:id/logo
    * Recebe o arquivo via multipart/form-data (campo: "logo")
    * Admin: qualquer fazenda | Owner: apenas a própria
    */
   async uploadLogo(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const callerRole = req.role as string;
         const callerFarmId = req.farmId as string;
         const { id } = req.params as { id: string };

         if (!req.file) {
            res.status(400).json({ error: "No file uploaded. Send a file in the 'logo' field" });
            return;
         }

         const { buffer, mimetype } = req.file;

         const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
         if (!ALLOWED_TYPES.includes(mimetype)) {
            res.status(400).json({ error: "Invalid file type. Allowed: jpeg, png, webp" });
            return;
         }

         const MAX_SIZE_MB = 5;
         if (buffer.length > MAX_SIZE_MB * 1024 * 1024) {
            res.status(400).json({ error: `File too large. Maximum size: ${MAX_SIZE_MB}MB` });
            return;
         }

         const farm = await farmService.uploadLogo(id, callerRole, callerFarmId, buffer, mimetype);
         res.status(200).json(farm);
      } catch (error) {
         next(error);
      }
   }

   /**
    * DELETE /api/farms/:id
    * Apenas admin
    */
   async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         await farmService.remove(req.params.id);
         res.status(204).send();
      } catch (error) {
         next(error);
      }
   }
}

export default new FarmController();
