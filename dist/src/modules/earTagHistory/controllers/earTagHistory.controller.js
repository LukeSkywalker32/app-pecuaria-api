// ========================================
// EAR TAG HISTORY CONTROLLER
// ========================================
import earTagService from "../services/earTagHisotory.service";
class EarTagController {
    /**
     * POST /api/ear-tags
     * Registra colocação de novo brinco no animal
     */
    async place(req, res, next) {
        try {
            const farmId = req.farmId;
            const body = req.body;
            const record = await earTagService.place(farmId, body);
            res.status(201).json(record);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/ear-tags
     * Lista brincos da fazenda
     * Query: ?animalId=x&activeOnly=true
     */
    async list(req, res, next) {
        try {
            const farmId = req.farmId;
            const query = {
                animalId: req.query.animalId,
                activeOnly: req.query.activeOnly === "true",
            };
            const records = await earTagService.list(farmId, query);
            res.status(200).json(records);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/ear-tags/animal/:animalId
     * Histórico completo de brincos de um animal
     */
    async listByAnimal(req, res, next) {
        try {
            const farmId = req.farmId;
            const { animalId } = req.params;
            const records = await earTagService.listByAnimal(farmId, animalId);
            res.status(200).json(records);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/ear-tags/:id
     * Busca registro de brinco por ID
     */
    async getById(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const record = await earTagService.getById(farmId, id);
            res.status(200).json(record);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PATCH /api/ear-tags/:id/remove
     * Registra remoção do brinco (fecha o histórico ativo)
     */
    async markRemoved(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const body = req.body;
            const record = await earTagService.markRemoved(farmId, id, body);
            res.status(200).json(record);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * DELETE /api/ear-tags/:id
     * Remove permanentemente um registro do histórico (somente brincos já removidos)
     */
    async deleteRecord(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            await earTagService.deleteRecord(farmId, id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}
export default new EarTagController();
//# sourceMappingURL=earTagHistory.controller.js.map