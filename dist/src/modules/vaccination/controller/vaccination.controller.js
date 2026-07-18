// ========================================
// VACCINATION CONTROLLER
// ========================================
import { generateTablePdf, generateXlsx } from "@/shared/services/export.service";
import vaccinationService from "../services/vaccination.service";
function queryString(value) {
    if (typeof value === "string")
        return value;
    if (Array.isArray(value))
        return typeof value[0] === "string" ? value[0] : undefined;
    return undefined;
}
class VaccinationController {
    /**
     * POST /api/vaccinations
     * Registra vacinação
     */
    async create(req, res, next) {
        try {
            const farmId = req.farmId;
            const body = req.body;
            const vaccination = await vaccinationService.create(farmId, body);
            res.status(201).json(vaccination);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/vaccinations
     * Lista vacinações com filtros
     */
    async list(req, res, next) {
        try {
            const farmId = req.farmId;
            const query = {
                animalId: queryString(req.query.animalId),
                vaccineType: queryString(req.query.vaccineType),
                dateFrom: queryString(req.query.dateFrom),
                dateTo: queryString(req.query.dateTo),
                upcoming: req.query.upcoming === "true",
            };
            const vaccinations = await vaccinationService.list(farmId, query);
            res.status(200).json(vaccinations);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/vaccinations/upcoming
     * Próximas doses (próximos 30 dias por padrão)
     */
    async getUpcoming(req, res, next) {
        try {
            const farmId = req.farmId;
            const dias = req.query.dias ? Number(req.query.dias) : 30;
            const vaccinations = await vaccinationService.getUpcoming(farmId, dias);
            res.status(200).json(vaccinations);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/vaccinations/animal/:animalId
     * Histórico de vacinações de um animal
     */
    async listByAnimal(req, res, next) {
        try {
            const farmId = req.farmId;
            const { animalId } = req.params;
            const vaccinations = await vaccinationService.listByAnimal(farmId, animalId);
            res.status(200).json(vaccinations);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/vaccinations/:id
     */
    async getById(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const vaccination = await vaccinationService.getById(farmId, id);
            res.status(200).json(vaccination);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PUT /api/vaccinations/:id
     */
    async update(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const body = req.body;
            const vaccination = await vaccinationService.update(farmId, id, body);
            res.status(200).json(vaccination);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * DELETE /api/vaccinations/:id
     */
    async remove(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            await vaccinationService.remove(farmId, id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PATCH /api/vaccinations/:id/photos
     * Adiciona fotos ao registro (append — não substitui)
     * Body: { photoUrls: string[] }
     */
    async addPhotos(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const { photoUrls } = req.body;
            if (!Array.isArray(photoUrls) || photoUrls.length === 0) {
                res.status(400).json({ error: "photoUrls deve ser um array com pelo menos 1 URL" });
                return;
            }
            const vaccination = await vaccinationService.addPhotos(farmId, id, photoUrls);
            res.status(200).json(vaccination);
        }
        catch (error) {
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
    async removePhoto(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const { photoUrl } = req.body;
            if (!photoUrl || typeof photoUrl !== "string") {
                res.status(400).json({ error: "photoUrl é obrigatório" });
                return;
            }
            const vaccination = await vaccinationService.removePhoto(farmId, id, photoUrl);
            res.status(200).json(vaccination);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/vaccinations/export/xlsx
     * Exporta a lista de vacinações da fazenda (com os mesmos filtros de list())
     */
    async exportXlsx(req, res, next) {
        try {
            const farmId = req.farmId;
            const query = {
                animalId: queryString(req.query.animalId),
                vaccineType: queryString(req.query.vaccineType),
                dateFrom: queryString(req.query.dateFrom),
                dateTo: queryString(req.query.dateTo),
            };
            const vaccinations = await vaccinationService.list(farmId, query);
            const buffer = await generateXlsx("Vacinações", [
                { header: "Animal", key: "animal", width: 28 },
                { header: "Vacina", key: "vaccineType", width: 20 },
                { header: "Marca", key: "brand", width: 18 },
                { header: "Lote", key: "batch", width: 14 },
                { header: "Data", key: "date", width: 14 },
                { header: "Próxima dose", key: "nextDose", width: 14 },
                { header: "Veterinário", key: "vet", width: 22 },
                { header: "Fotos", key: "photoCount", width: 8 },
            ], vaccinations.map(v => ({
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
            })));
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", 'attachment; filename="vacinacoes.xlsx"');
            res.send(buffer);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/vaccinations/animal/:animalId/export/pdf
     * Exporta o histórico de vacinações de um animal em PDF
     * (mesmo conjunto de dados exibido no botão de Histórico do front)
     */
    async exportAnimalPdf(req, res, next) {
        try {
            const farmId = req.farmId;
            const { animalId } = req.params;
            const vaccinations = await vaccinationService.listByAnimal(farmId, animalId);
            const animalLabel = vaccinations[0]?.animalName ?? vaccinations[0]?.animalEarTag ?? "Animal sem vacinações";
            const doc = generateTablePdf(`Histórico de Vacinações — ${animalLabel}`, `Gerado em ${new Date().toLocaleDateString("pt-BR")} · ${vaccinations.length} registro(s)`, [
                { header: "Vacina", key: "vaccineType" },
                { header: "Marca", key: "brand" },
                { header: "Lote", key: "batch" },
                { header: "Data", key: "date" },
                { header: "Veterinário", key: "vet" },
                { header: "Fotos", key: "photoCount" },
            ], vaccinations.map(v => ({
                vaccineType: v.vaccineType,
                brand: v.brand,
                batch: v.batch,
                date: new Date(v.vaccinationDate).toLocaleDateString("pt-BR"),
                vet: v.veterinarianName ?? "-",
                photoCount: v.photos?.length ?? 0,
            })));
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename="vacinacoes-${animalId}.pdf"`);
            doc.pipe(res);
            doc.end();
        }
        catch (error) {
            next(error);
        }
    }
}
export default new VaccinationController();
//# sourceMappingURL=vaccination.controller.js.map