// ========================================
// BIRTH CONTROLLER
// ========================================
import birthService from "../services/birth.service";
function queryString(value) {
    if (typeof value === "string")
        return value;
    if (Array.isArray(value))
        return typeof value[0] === "string" ? value[0] : undefined;
    return undefined;
}
class BirthController {
    /**
     * POST /api/births
     * Registra um parto
     */
    async create(req, res, next) {
        try {
            const farmId = req.farmId;
            const userId = req.userId;
            const body = req.body;
            const birth = await birthService.create(farmId, userId, body);
            res.status(201).json(birth);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/births
     * Lista partos com filtros opcionais
     */
    async list(req, res, next) {
        try {
            const farmId = req.farmId;
            const query = {
                damId: queryString(req.query.damId),
                situation: queryString(req.query.situation),
                dateFrom: queryString(req.query.dateFrom),
                dateTo: queryString(req.query.dateTo),
            };
            const births = await birthService.list(farmId, query);
            res.status(200).json(births);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/births/:id
     * Busca parto por ID
     */
    async getById(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const birth = await birthService.getById(farmId, id);
            res.status(200).json(birth);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/births/animal/:damId
     * Histórico de partos de uma fêmea
     */
    async listByAnimal(req, res, next) {
        try {
            const farmId = req.farmId;
            const { damId } = req.params;
            const births = await birthService.listByAnimal(farmId, damId);
            res.status(200).json(births);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PUT /api/births/:id
     * Atualiza dados do parto
     */
    async update(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const body = req.body;
            const birth = await birthService.update(farmId, id, body);
            res.status(200).json(birth);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * DELETE /api/births/:id
     * Remove um parto (apenas se bezerro não foi registrado como animal)
     */
    async remove(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            await birthService.remove(farmId, id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}
export default new BirthController();
//# sourceMappingURL=birth.controller.js.map