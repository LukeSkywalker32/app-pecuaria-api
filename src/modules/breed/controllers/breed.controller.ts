import type { NextFunction, Request, Response } from "express";
import breedService from "@/modules/breed/services/breed.service";
import type {
   CreateBreedRequest,
   ListBreedsQuery,
   UpdateBreedRequest,
} from "@/modules/breed/types/breed.types";

function queryString(value: unknown): string | undefined {
   if (typeof value === "string") return value;
   if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : undefined;
   return undefined;
}

class BreedController {
   // GET /api/breeds - Lista raças

   async list(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const activeParam = queryString(req.query.active);
         const query: ListBreedsQuery = {
            active: activeParam !== undefined ? activeParam === "true" : undefined,
            search: queryString(req.query.search),
         };

         const breeds = await breedService.list(query);
         res.status(200).json(breeds);
      } catch (error) {
         next(error);
      }
   }

   // GET /api/breeds/:id - Busca raça por id
   async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const { id } = req.params as { id: string };
         const breed = await breedService.findById(id);
         res.status(200).json(breed);
      } catch (error) {
         next(error);
      }
   }
   /**
    * POST /api/breeds — apenas admin
    */
   async create(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const body = req.body as CreateBreedRequest;
         const breed = await breedService.create(body);
         res.status(201).json(breed);
      } catch (error) {
         next(error);
      }
   }

   /**
    * PUT /api/breeds/:id — apenas admin
    */
   async update(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const { id } = req.params as { id: string };
         const body = req.body as UpdateBreedRequest;
         const breed = await breedService.update(id, body);
         res.status(200).json(breed);
      } catch (error) {
         next(error);
      }
   }

   /**
    * PATCH /api/breeds/:id/activate — apenas admin
    */
   async activate(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const { id } = req.params as { id: string };
         const breed = await breedService.toggleActive(id, true);
         res.status(200).json(breed);
      } catch (error) {
         next(error);
      }
   }

   /**
    * PATCH /api/breeds/:id/deactivate — apenas admin
    */
   async deactivate(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const { id } = req.params as { id: string };
         const breed = await breedService.toggleActive(id, false);
         res.status(200).json(breed);
      } catch (error) {
         next(error);
      }
   }

   /**
    * DELETE /api/breeds/:id — apenas admin
    */
   async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const { id } = req.params as { id: string };
         await breedService.remove(id);
         res.status(204).send();
      } catch (error) {
         next(error);
      }
   }
}

export default new BreedController();
