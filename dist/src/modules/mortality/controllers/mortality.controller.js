// ========================================
// MORTALITY CONTROLLER
// ========================================
import { generateXlsx } from "@/shared/services/export.service";
import mortalityService from "../services/mortality.service";
function queryString(value) {
    if (typeof value === "string")
        return value;
    if (Array.isArray(value))
        return typeof value[0] === "string" ? value[0] : undefined;
    return undefined;
}
class MortalityController {
    /**
     * POST /api/mortalities
     * Registra a morte de um animal
     */
    async create(req, res, next) {
        try {
            const farmId = req.farmId;
            const userId = req.userId;
            const body = req.body;
            const mortality = await mortalityService.create(farmId, userId, body);
            res.status(201).json(mortality);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/mortalities
     * Lista mortalidades da fazenda
     * Query: ?dateFrom=2024-01-01&dateTo=2024-12-31&severity=severe&necropsy=true
     */
    async list(req, res, next) {
        try {
            const farmId = req.farmId;
            const query = {
                dateFrom: queryString(req.query.dateFrom),
                dateTo: queryString(req.query.dateTo),
                severity: queryString(req.query.severity),
                necropsy: req.query.necropsy !== undefined ? req.query.necropsy === "true" : undefined,
            };
            const mortalities = await mortalityService.list(farmId, query);
            res.status(200).json(mortalities);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/mortalities/animal/:animalId
     * Histórico de mortalidade de um animal
     */
    async listByAnimal(req, res, next) {
        try {
            const farmId = req.farmId;
            const { animalId } = req.params;
            const mortalities = await mortalityService.listByAnimal(farmId, animalId);
            res.status(200).json(mortalities);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/mortalities/:id
     */
    async getById(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const mortality = await mortalityService.getById(farmId, id);
            res.status(200).json(mortality);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PUT /api/mortalities/:id
     * Atualiza dados do registro
     */
    async update(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const body = req.body;
            const mortality = await mortalityService.update(farmId, id, body);
            res.status(200).json(mortality);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PATCH /api/mortalities/:id/photos
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
            const mortality = await mortalityService.addPhotos(farmId, id, photoUrls);
            res.status(200).json(mortality);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * DELETE /api/mortalities/:id/photos
     * Remove uma foto especifica do registro pela URL
     * Body: { photoUrl: string }
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
            const mortality = await mortalityService.removePhoto(farmId, id, photoUrl);
            res.status(200).json(mortality);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/mortalities/export/xlsx
     * Exporta a lista de mortalidades da fazenda (com os mesmos filtros de list())
     */
    async exportXlsx(req, res, next) {
        try {
            const farmId = req.farmId;
            const query = {
                dateFrom: queryString(req.query.dateFrom),
                dateTo: queryString(req.query.dateTo),
                severity: queryString(req.query.severity),
                necropsy: req.query.necropsy !== undefined ? req.query.necropsy === "true" : undefined,
            };
            const mortalities = await mortalityService.list(farmId, query);
            const buffer = await generateXlsx("Mortalidade", [
                { header: "Animal", key: "animal", width: 28 },
                { header: "Data", key: "date", width: 14 },
                { header: "Local", key: "location", width: 20 },
                { header: "Causa", key: "cause", width: 25 },
                { header: "Severidade", key: "severity", width: 14 },
                { header: "Necropsia", key: "necropsy", width: 12 },
                { header: "Destinação", key: "disposal", width: 20 },
                { header: "Fotos", key: "photoCount", width: 8 },
            ], mortalities.map(m => ({
                animal: `${m.animalName ?? ""}${m.animalEarTag ? ` — ${m.animalEarTag}` : ""}`,
                date: new Date(m.deathDate).toLocaleDateString("pt-BR"),
                location: m.deathLocation,
                cause: m.causeOfDeath,
                severity: m.severity ?? "-",
                necropsy: m.necropsy ? "Sim" : "Não",
                disposal: m.disposal ?? "-",
                photoCount: m.photos?.length ?? 0,
            })));
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", 'attachment; filename="mortalidade.xlsx"');
            res.send(buffer);
        }
        catch (error) {
            next(error);
        }
    }
}
export default new MortalityController();
//# sourceMappingURL=mortality.controller.js.map