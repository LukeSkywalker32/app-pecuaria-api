import { generateTablePdf, generateXlsx } from "@/shared/services/export.service";
import weighingService from "../service/weighing.service";
function queryString(value) {
    if (typeof value === "string")
        return value;
    if (Array.isArray(value))
        return typeof value[0] === "string" ? value[0] : undefined;
    return undefined;
}
class WeighingController {
    /**
     * POST /api/weighings
     */
    async create(req, res, next) {
        try {
            const farmId = req.farmId;
            const userId = req.userId;
            const body = req.body;
            const weighing = await weighingService.create(farmId, userId, body);
            res.status(201).json(weighing);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/weighings
     * Query: ?animalId=...&dateFrom=2026-01-01&dateTo=2026-12-31
     */
    async list(req, res, next) {
        try {
            const farmId = req.farmId;
            const query = {
                animalId: queryString(req.query.animalId),
                dateFrom: queryString(req.query.dateFrom),
                dateTo: queryString(req.query.dateTo),
            };
            const weighings = await weighingService.list(farmId, query);
            res.status(200).json(weighings);
        }
        catch (error) {
            next(error);
        }
    }
    /** GET /api/weighings/animal/:animalId
     * Histórico de pesagens do animal, com GMD calculado
     */
    async listByAnimal(req, res, next) {
        try {
            const farmId = req.farmId;
            const { animalId } = req.params;
            const weighings = await weighingService.listByAnimal(farmId, animalId);
            res.status(200).json(weighings);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/weighings/:id
     */
    async getById(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const weighings = await weighingService.getById(farmId, id);
            res.status(200).json(weighings);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PUT /api/weighings/:id
     * */
    async update(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const body = req.body;
            const weighing = await weighingService.update(farmId, id, body);
            res.status(200).json(weighing);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     *    DELETE /api/weighings/:id
     */
    async remove(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            await weighingService.remove(farmId, id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/weighings/export/xlsx
     * Exporta a lista de pesagens da fazenda (com o mesmo filtro que list())
     */
    async exportXlsx(req, res, next) {
        try {
            const farmId = req.farmId;
            const query = {
                animalId: queryString(req.query.animalId),
                dateFrom: queryString(req.query.dateFrom),
                dateTo: queryString(req.query.dateTo),
            };
            const weighings = await weighingService.list(farmId, query);
            const buffer = await generateXlsx("Pesagens", [
                { header: "Animal", key: "animal", width: 28 },
                { header: "Peso (Kg)", key: "weightKg", width: 12 },
                { header: "Data", key: "date", width: 14 },
                { header: "GMD (kg/dia", key: "gmd", width: 14 },
                { header: "Registrado por", key: "registeredBy", width: 22 },
                { header: "Notas", key: "notes", width: 30 },
            ], weighings.map(w => ({
                animal: `${w.animalName ?? ""}${w.animalEarTag ? ` - ${w.animalEarTag}` : ""}`,
                weightKg: w.weightKg,
                date: new Date(w.date).toLocaleDateString("pt-BR"),
                gmd: w.gmd !== null ? w.gmd.toFixed(3) : "-",
                registeredBy: w.registeredByName ?? "-",
                notes: w.notes ?? "-",
            })));
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", 'attachment; filename="pesagens.xlsx"');
            res.send(buffer);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/weighings/animal/:animalId/export/pdf
     * Exporta o histórico de pesagens (com GMD) de um animal específico
     */
    async exportAnimalPdf(req, res, next) {
        try {
            const farmId = req.farmId;
            const { animalId } = req.params;
            const weighings = await weighingService.listByAnimal(farmId, animalId);
            const animalLabel = weighings[0]?.animalName ?? weighings[0]?.animalEarTag ?? "Animal sem pesagem";
            const doc = generateTablePdf(`Histórico de Pesagens - ${animalLabel}`, `Gerado em ${new Date().toLocaleDateString("pt-BR")} . ${weighings.length} pesagem(ns)`, [
                { header: "Data", key: "date", width: 14 },
                { header: "Peso (Kg)", key: "weightKg", width: 12 },
                { header: "GMD (kg/dia)", key: "gmd", width: 14 },
                { header: "Notas", key: "notes", width: 30 },
            ], weighings.map(w => ({
                date: new Date(w.date).toLocaleDateString("pt-BR"),
                weightKg: w.weightKg.toFixed(1),
                gmd: w.gmd !== null ? w.gmd.toFixed(3) : "-",
                notes: w.notes ?? "-",
            })));
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename="hist-pesagens-${animalLabel}.pdf"`);
            doc.pipe(res);
            doc.end();
        }
        catch (error) {
            next(error);
        }
    }
}
export default new WeighingController();
//# sourceMappingURL=weighing.controller.js.map