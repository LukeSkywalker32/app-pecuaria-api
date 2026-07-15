// ========================================
// VACCINATION CONTROLLER
// ========================================

import type { NextFunction, Request, Response } from "express";
import { generateTablePdf, generateXlsx } from "@/shared/services/export.service";
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

   /**
    * PATCH /api/vaccinations/:id/photos
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

         const vaccination = await vaccinationService.addPhotos(farmId, id, photoUrls);
         res.status(200).json(vaccination);
      } catch (error) {
         next(error);
      }
   }

   /**
    * DELETE /api/vaccinations/:id/photos
    * Remove uma foto especifica do registro pela URL
    * Body: { photoUrl: string, reason?: string }
    * OBS: "reason" ainda não é obrigatório nem persistido — reservado para
    * a próxima sprint (log de auditoria). Aceito aqui só pra não quebrar
    * o contrato da rota quando a validação obrigatória entrar.
    */
   async removePhoto(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { id } = req.params as { id: string };
         const { photoUrl } = req.body as { photoUrl: string; reason?: string };

         if (!photoUrl || typeof photoUrl !== "string") {
            res.status(400).json({ error: "photoUrl é obrigatório" });
            return;
         }
         const vaccination = await vaccinationService.removePhoto(farmId, id, photoUrl);
         res.status(200).json(vaccination);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/vaccinations/export/xlsx
    * Exporta a lista de vacinações da fazenda (com os mesmos filtros de list())
    */
   async exportXlsx(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const query: ListVaccinationsQuery = {
            animalId: queryString(req.query.animalId),
            vaccineType: queryString(req.query.vaccineType),
            dateFrom: queryString(req.query.dateFrom),
            dateTo: queryString(req.query.dateTo),
         };

         const vaccinations = await vaccinationService.list(farmId, query);

         const buffer = await generateXlsx(
            "Vacinações",
            [
               { header: "Animal", key: "animal", width: 28 },
               { header: "Vacina", key: "vaccineType", width: 20 },
               { header: "Marca", key: "brand", width: 18 },
               { header: "Lote", key: "batch", width: 14 },
               { header: "Data", key: "date", width: 14 },
               { header: "Próxima dose", key: "nextDose", width: 14 },
               { header: "Veterinário", key: "vet", width: 22 },
               { header: "Fotos", key: "photoCount", width: 8 },
            ],
            vaccinations.map(v => ({
               animal: `${v.animalName ?? ""}${v.animalEarTag ? ` — ${v.animalEarTag}` : ""}`,
               vaccineType: v.vaccineType,
               brand: v.brand,
               batch: v.batch,
               date: new Date(v.vaccinationDate).toLocaleDateString("pt-BR"),
               nextDose: v.nextDoseDate
                  ? new Date(v.nextDoseDate).toLocaleDateString("pt-BR")
                  : "-",
               vet: v.veterinarianName ?? "-",
               photoCount: v.photos?.length ?? 0,
            })),
         );

         res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
         );
         res.setHeader("Content-Disposition", 'attachment; filename="vacinacoes.xlsx"');
         res.send(buffer);
      } catch (error) {
         next(error);
      }
   }

   /**
    * GET /api/vaccinations/animal/:animalId/export/pdf
    * Exporta o histórico de vacinações de um animal em PDF
    * (mesmo conjunto de dados exibido no botão de Histórico do front)
    */
   async exportAnimalPdf(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const farmId = req.farmId as string;
         const { animalId } = req.params as { animalId: string };

         const vaccinations = await vaccinationService.listByAnimal(farmId, animalId);
         const animalLabel =
            vaccinations[0]?.animalName ?? vaccinations[0]?.animalEarTag ?? "Animal sem vacinações";

         const doc = generateTablePdf(
            `Histórico de Vacinações — ${animalLabel}`,
            `Gerado em ${new Date().toLocaleDateString("pt-BR")} · ${vaccinations.length} registro(s)`,
            [
               { header: "Vacina", key: "vaccineType" },
               { header: "Marca", key: "brand" },
               { header: "Lote", key: "batch" },
               { header: "Data", key: "date" },
               { header: "Veterinário", key: "vet" },
               { header: "Fotos", key: "photoCount" },
            ],
            vaccinations.map(v => ({
               vaccineType: v.vaccineType,
               brand: v.brand,
               batch: v.batch,
               date: new Date(v.vaccinationDate).toLocaleDateString("pt-BR"),
               vet: v.veterinarianName ?? "-",
               photoCount: v.photos?.length ?? 0,
            })),
         );

         res.setHeader("Content-Type", "application/pdf");
         res.setHeader("Content-Disposition", `attachment; filename="vacinacoes-${animalId}.pdf"`);
         doc.pipe(res);
         doc.end();
      } catch (error) {
         next(error);
      }
   }
}

export default new VaccinationController();
