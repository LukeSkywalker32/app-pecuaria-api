// ========================================
// PREGNANCY CONTROLLER
// ========================================
import pregnancyService from "../services/pregnancy.service";
function queryString(value) {
    if (typeof value === "string")
        return value;
    if (Array.isArray(value))
        return typeof value[0] === "string" ? value[0] : undefined;
    return undefined;
}
class PregnancyController {
    /**
     * POST /api/pregnancies
     * Inicia nova prenhez
     */
    async create(req, res, next) {
        try {
            const farmId = req.farmId;
            const body = req.body;
            const pregnancy = await pregnancyService.create(farmId, body);
            res.status(201).json(pregnancy);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/pregnancies
     * Lista prenhezes com filtros
     * Query: ?animalId=x&status=pregnant
     */
    async list(req, res, next) {
        try {
            const farmId = req.farmId;
            const query = {
                animalId: queryString(req.query.animalId),
                status: queryString(req.query.status),
            };
            const pregnancies = await pregnancyService.list(farmId, query);
            res.status(200).json(pregnancies);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/pregnancies/:id
     * Busca prenhez por ID
     */
    async getById(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const pregnancy = await pregnancyService.getById(farmId, id);
            res.status(200).json(pregnancy);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/pregnancies/animal/:animalId
     * Histórico de prenhezes de um animal
     */
    async listByAnimal(req, res, next) {
        try {
            const farmId = req.farmId;
            const { animalId } = req.params;
            const pregnancies = await pregnancyService.listByAnimal(farmId, animalId);
            res.status(200).json(pregnancies);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * POST /api/pregnancies/:id/attempts
     * Registra cobertura (nova tentativa)
     */
    async registerAttempt(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const body = req.body;
            const pregnancy = await pregnancyService.registerAttempt(farmId, id, body);
            res.status(201).json(pregnancy);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * POST /api/pregnancies/:id/ultrasounds
     * Registra resultado de ultrassom
     */
    async registerUltrasound(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const body = req.body;
            const pregnancy = await pregnancyService.registerUltrasound(farmId, id, body);
            res.status(201).json(pregnancy);
        }
        catch (error) {
            next(error);
        }
    }
}
export default new PregnancyController();
//# sourceMappingURL=pregnancy.controller.js.map