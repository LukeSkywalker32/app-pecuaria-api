// ========================================
// ESTRUS CONTROLLER (CIO)
// ========================================
import estrusService from "../services/estrus.service";
function queryString(value) {
    if (typeof value === "string")
        return value;
    if (Array.isArray(value))
        return typeof value[0] === "string" ? value[0] : undefined;
    return undefined;
}
class EstrusController {
    /**
     * POST /api/estrus
     */
    async create(req, res, next) {
        try {
            const farmId = req.farmId;
            const userId = req.userId;
            const body = req.body;
            const estrus = await estrusService.create(farmId, userId, body);
            res.status(201).json(estrus);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/estrus
     */
    async list(req, res, next) {
        try {
            const farmId = req.farmId;
            const query = {
                animalId: queryString(req.query.animalId),
                intensity: queryString(req.query.intensity),
                dateFrom: queryString(req.query.dateFrom),
                dateTo: queryString(req.query.dateTo),
                upcoming: req.query.upcoming === "true",
            };
            const estrus = await estrusService.list(farmId, query);
            res.status(200).json(estrus);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/estrus/:id
     */
    async getById(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const estrus = await estrusService.getById(farmId, id);
            res.status(200).json(estrus);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/estrus/animal/:animalId
     */
    async listByAnimal(req, res, next) {
        try {
            const farmId = req.farmId;
            const { animalId } = req.params;
            const estrus = await estrusService.listByAnimal(farmId, animalId);
            res.status(200).json(estrus);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PUT /api/estrus/:id
     */
    async update(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const body = req.body;
            const estrus = await estrusService.update(farmId, id, body);
            res.status(200).json(estrus);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/estrus/upcoming
     */
    async getUpcoming(req, res, next) {
        try {
            const farmId = req.farmId;
            const dias = req.query.dias ? Number(req.query.dias) : 7;
            const estrus = await estrusService.getUpcoming(farmId, dias);
            res.status(200).json(estrus);
        }
        catch (error) {
            next(error);
        }
    }
}
export default new EstrusController();
//# sourceMappingURL=estrus.controller.js.map