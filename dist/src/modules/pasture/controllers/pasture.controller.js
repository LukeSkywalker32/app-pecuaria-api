//Controller de pasto
// ========================================
// PASTURE CONTROLLER
// ========================================
import pastureService from "../services/pasture.service";
// Normaliza query params — req.query pode ser string | string[] | ParsedQs
function queryString(value) {
    if (typeof value === "string")
        return value;
    if (Array.isArray(value))
        return typeof value[0] === "string" ? value[0] : undefined;
    return undefined;
}
class PastureController {
    /**
     * POST /api/pastures
     * Cria um novo pasto — owner, farmmanager, admin
     */
    async create(req, res, next) {
        try {
            const farmId = req.farmId;
            const body = req.body;
            const pasture = await pastureService.create(farmId, body);
            res.status(201).json(pasture);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/pastures
     * Lista pastos da fazenda com filtros opcionais
     */
    async list(req, res, next) {
        try {
            const farmId = req.farmId;
            const activeParam = queryString(req.query.active);
            const query = {
                active: activeParam !== undefined ? activeParam === "true" : undefined,
                type: queryString(req.query.type),
                search: queryString(req.query.search),
            };
            const pastures = await pastureService.list(farmId, query);
            res.status(200).json(pastures);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/pastures/:id
     * Busca pasto por ID
     */
    async findById(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const pasture = await pastureService.findById(farmId, id);
            res.status(200).json(pasture);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PUT /api/pastures/:id
     * Atualiza dados do pasto
     */
    async update(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const body = req.body;
            const pasture = await pastureService.update(farmId, id, body);
            res.status(200).json(pasture);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PATCH /api/pastures/:id/activate
     * Ativa o pasto
     */
    async activate(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const pasture = await pastureService.toggleActive(farmId, id, true);
            res.status(200).json(pasture);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PATCH /api/pastures/:id/deactivate
     * Desativa o pasto — bloqueia se houver animais
     */
    async deactivate(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const pasture = await pastureService.toggleActive(farmId, id, false);
            res.status(200).json(pasture);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * DELETE /api/pastures/:id
     * Remove pasto — bloqueia se houver animais
     */
    async remove(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            await pastureService.remove(farmId, id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}
export default new PastureController();
//# sourceMappingURL=pasture.controller.js.map