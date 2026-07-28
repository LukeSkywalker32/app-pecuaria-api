import type { NextFunction, Request, Response } from "express";
import { generateTablePdf, generateXlsx } from "@/shared/services/export.service";
import weighingService from "../service/weighing.service";
import type {
   CreateWeighingRequest,
   ListWeighingQuery,
   UpdateWeighingRequest,
} from "../types/weighing.types";

function queryString(value: unknown): string | undefined {
   if (typeof value === "string") return value;
   if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : undefined;
   return undefined;
}

class WeighingController {
   /**
    * POST /api/weighings
    */
   async create(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const userId = req.userId;
         const body = req.body as CreateWeighingRequest;

         const weighing = await weighingService.create(farmId, userId, body);
         res.status(201).json(weighing);
      } catch (error) {
         next(error);
      }
   }
   /**
    * GET /api/weighings
    * Query: ?animalId=...&dateFrom=2026-01-01&dateTo=2026-12-31
    */
   async list(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;

         const query: ListWeighingQuery = {
            animalId: queryString(req.query.animalId),
            dateFrom: queryString(req.query.dateFrom),
            dateTo: queryString(req.query.dateTo),
         };
         const weighings = await weighingService.list(farmId, query);
         res.status(200).json(weighings);
      } catch (error) {
         next(error);
      }
   }
   /** GET /api/weighings/animal/:animalId
    * Histórico de pesagens do animal, com GMD calculado
    */
   async listByAnimal(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { animalId } = req.params as { animalId: string };

         const weighings = await weighingService.listByAnimal(farmId, animalId);
         res.status(200).json(weighings);
      } catch (error) {
         next(error);
      }
   }
   /**
    * GET /api/weighings/:id
    */
   async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         const weighings = await weighingService.getById(farmId, id);
         res.status(200).json(weighings);
      } catch (error) {
         next(error);
      }
   }
   /**
    * PUT /api/weighings/:id
    * */
   async update(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };
         const body = req.body as UpdateWeighingRequest;

         const weighing = await weighingService.update(farmId, id, body);
         res.status(200).json(weighing);
      } catch (error) {
         next(error);
      }
   }
   /**
    *    DELETE /api/weighings/:id
    */
   async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };

         await weighingService.remove(farmId, id);
         res.status(204).send();
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/weighings/export/xlsx
    * Exporta a lista de pesagens da fazenda (com o mesmo filtro que list())
    */
   async exportXlsx(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const query: ListWeighingQuery = {
            animalId: queryString(req.query.animalId),
            dateFrom: queryString(req.query.dateFrom),
            dateTo: queryString(req.query.dateTo),
         };

         const allweighings = await weighingService.list(farmId, query);

         const weighingsByAnimal = new Map<string, typeof allweighings>();
         for (const w of allweighings) {
            const list = weighingsByAnimal.get(w.animalId) ?? [];
            list.push(w);
            weighingsByAnimal.set(w.animalId, list);
         }

         let maxWeighingsCount = 0;
         for (const list of weighingsByAnimal.values()) {
            if (list.length > maxWeighingsCount) {
               maxWeighingsCount = list.length;
            }
         }

         const columns: any[] = [
            { header: "Animal", key: "animal", width: 30 },
            { header: "Brinco (EarTag)", key: "earTag", width: 20 },
         ];

         // Adiciona coluna repetida para cada possivel pesagem
         for (let i = 1; i <= maxWeighingsCount; i++) {
            columns.push(
               { header: `Peso ${i} (kg)`, key: `weight_${i}`, width: 15 },
               { header: `Data ${i}`, key: `date_${i}`, width: 15 },
               { header: `GMD ${i}`, key: `gmd_${i}`, width: 15 },
               { header: `Notas ${i}`, key: `notes_${i}`, width: 25 },
            );
         }

         const rowsData = Array.from(weighingsByAnimal.entries()).map(([_, weighings]) => {
            const sortedWeighings = [...weighings].sort((a, b) => {
               const dateDiff = new Date(a.date).getTime() - new Date(b.date).getTime();
               if (dateDiff !== 0) return dateDiff;
               return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            });
            const row: any = {
               animal: `${sortedWeighings[0].animalName ?? ""}${sortedWeighings[0].animalEarTag ? ` - ${sortedWeighings[0].animalEarTag}` : ""}`,
               earTag: sortedWeighings[0].animalEarTag ?? "-",
            };
            // Preenche as colunas dinâmicas
            sortedWeighings.forEach((w, index) => {
               const i = index + 1; // Começa em 1
               row[`weight_${i}`] = w.weightKg.toFixed(1);
               row[`date_${i}`] = new Date(w.date).toLocaleDateString("pt-BR");
               row[`gmd_${i}`] = w.gmd !== null ? w.gmd.toFixed(3) : "-";
               row[`notes_${i}`] = w.notes ?? "-";
            });

            return row;
         });

         const buffer = await generateXlsx("Pesagens", columns, rowsData);

         res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
         );
         res.setHeader("Content-Disposition", 'attachment; filename="pesagens.xlsx"');
         res.send(buffer);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/weighings/animal/:animalId/export/pdf
    * Exporta o histórico de pesagens (com GMD) de um animal específico
    */
   async exportAnimalPdf(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { animalId } = req.params as { animalId: string };

         const weighings = await weighingService.listByAnimal(farmId, animalId);
         const animalLabel =
            weighings[0]?.animalName ?? weighings[0]?.animalEarTag ?? "Animal sem pesagem";

         const doc = generateTablePdf(
            `Histórico de Pesagens - ${animalLabel}`,
            `Gerado em ${new Date().toLocaleDateString("pt-BR")} . ${weighings.length} pesagem(ns)`,
            [
               { header: "Data", key: "date", width: 14 },
               { header: "Peso (Kg)", key: "weightKg", width: 12 },
               { header: "GMD (kg/dia)", key: "gmd", width: 14 },
               { header: "Notas", key: "notes", width: 30 },
            ],
            weighings.map(w => ({
               date: new Date(w.date).toLocaleDateString("pt-BR"),
               weightKg: w.weightKg.toFixed(1),
               gmd: w.gmd !== null ? w.gmd.toFixed(3) : "-",
               notes: w.notes ?? "-",
            })),
         );
         res.setHeader("Content-Type", "application/pdf");
         res.setHeader(
            "Content-Disposition",
            `attachment; filename="hist-pesagens-${animalLabel}.pdf"`,
         );
         doc.pipe(res);
         doc.end();
      } catch (error) {
         next(error);
      }
   }
}

export default new WeighingController();
