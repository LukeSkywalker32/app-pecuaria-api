import type { AnimalStatus, Gender } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import animalService from "../services/animal.service";
import type {
   CreateAnimalRequest,
   ListAnimalsQuery,
   UpdateAnimalRequest,
} from "../types/animal.types";

class AnimalController {
   async create(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const body = req.body as CreateAnimalRequest;
         const animal = await animalService.create(farmId, body);
         res.status(201).json(animal);
      } catch (error) {
         next(error);
      }
   }

   async list(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const query: ListAnimalsQuery = {
            status: req.query.status as AnimalStatus,
            gender: req.query.gender as Gender,
            pastureId: req.query.pastureId as string,
            search: req.query.search as string,
         };
         const animals = await animalService.list(farmId, query);
         res.status(200).json(animals);
      } catch (error) {
         next(error);
      }
   }

   async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };
         const animal = await animalService.findById(farmId, id);
         res.status(200).json(animal);
      } catch (error) {
         next(error);
      }
   }

   async update(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };
         const body = req.body as UpdateAnimalRequest;
         const animal = await animalService.update(farmId, id, body);
         res.status(200).json(animal);
      } catch (error) {
         next(error);
      }
   }

   async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };
         await animalService.remove(farmId, id);
         res.status(204).send();
      } catch (error) {
         next(error);
      }
   }
}

export default new AnimalController();
