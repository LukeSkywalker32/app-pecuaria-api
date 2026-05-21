import type { NextFunction, Request, Response } from "express";
import buyerService from "../services/buyer.service";
import type {
   BuyerResponse,
   CreateBuyerRequest,
   ListBuyersQuery,
   UpdateBuyerRequest,
} from "../types/buyer.types";

function queryString(value: unknown): string | undefined {
   if (typeof value === "string") return value;
   if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : undefined;
   return undefined;
}

class BuyerController {
   async create(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const body = req.body as CreateBuyerRequest;
         const buyer = await buyerService.create({ ...body, farmId });
         res.status(201).json(buyer);
      } catch (error) {
         next(error);
      }
   }
   async list(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const query: ListBuyersQuery = {
            search: queryString(req.query.search),
         };
         const buyers = await buyerService.list(farmId, query);
         res.json(buyers);
      } catch (error) {
         next(error);
      }
   }
   async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         const buyer = await buyerService.findById(id, farmId);
         res.status(200).json(buyer);
      } catch (error) {
         next(error);
      }
   }

   async update(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };
         const body = req.body as UpdateBuyerRequest;

         const buyer = await buyerService.update(id, farmId, body);
         res.status(200).json(buyer);
      } catch (error) {
         next(error);
      }
   }

   async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         await buyerService.remove(id, farmId);
         res.status(204).send();
      } catch (error) {
         next(error);
      }
   }
}
export default new BuyerController();
