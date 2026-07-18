// ========================================
// FARM CONTROLLER
// ========================================
import farmService from "../services/farm.service";
// Garante que o valor do query param seja sempre string ou undefined
// req.query pode retornar string | string[] | ParsedQs — essa função normaliza
function queryString(value) {
    if (typeof value === "string")
        return value;
    if (Array.isArray(value))
        return typeof value[0] === "string" ? value[0] : undefined;
    return undefined;
}
class FarmController {
    /**
     * GET /api/farms/public
     * Lista fazendas ativas para o login — sem autenticação
     */
    async listPublic(_req, res, next) {
        try {
            const farms = await farmService.listPublic();
            res.status(200).json(farms);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * POST /api/farms
     * Cria uma nova fazenda — apenas admin
     */
    async create(req, res, next) {
        try {
            const body = req.body;
            const farm = await farmService.create(body);
            res.status(201).json(farm);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/farms
     * Admin: lista todas com filtros | Owner/outros: retorna apenas a própria
     */
    async list(req, res, next) {
        try {
            const callerRole = req.role;
            const callerFarmId = req.farmId;
            const activeParam = queryString(req.query.active);
            const query = {
                active: activeParam !== undefined ? activeParam === "true" : undefined,
                search: queryString(req.query.search),
            };
            const farms = await farmService.list(callerRole, callerFarmId, query);
            res.status(200).json(farms);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/farms/:id
     * Admin: qualquer fazenda | Owner/outros: apenas a própria
     */
    async findById(req, res, next) {
        try {
            const callerRole = req.role;
            const callerFarmId = req.farmId;
            const { id } = req.params;
            const farm = await farmService.findById(id, callerRole, callerFarmId);
            res.status(200).json(farm);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PUT /api/farms/:id
     * Admin: qualquer fazenda | Owner: apenas a própria
     */
    async update(req, res, next) {
        try {
            const callerRole = req.role;
            const callerFarmId = req.farmId;
            const { id } = req.params;
            const body = req.body;
            const farm = await farmService.update(id, callerRole, callerFarmId, body);
            res.status(200).json(farm);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PATCH /api/farms/:id/activate
     * Apenas admin
     */
    async activate(req, res, next) {
        try {
            const farm = await farmService.toggleActive(req.params.id, true);
            res.status(200).json(farm);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PATCH /api/farms/:id/deactivate
     * Apenas admin
     */
    async deactivate(req, res, next) {
        try {
            const farm = await farmService.toggleActive(req.params.id, false);
            res.status(200).json(farm);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * GET /api/farms/public
     * Lista fazendas ativas para o dropdown de login
     * Sem autenticação
     */
    async listPublic(req, res, next) {
        try {
            const farms = await farmService.listPublic();
            res.status(200).json(farms);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * PATCH /api/farms/:id/logo
     * Admin: qualquer fazenda | Owner: apenas a própria
     */
    async uploadLogo(req, res, next) {
        try {
            const callerRole = req.role;
            const callerFarmId = req.farmId;
            const { id } = req.params;
            if (!req.file) {
                res.status(400).json({ error: "No file uploaded. Send a file in the 'logo' field" });
                return;
            }
            const { buffer, mimetype } = req.file;
            const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
            if (!ALLOWED_TYPES.includes(mimetype)) {
                res.status(400).json({ error: "Invalid file type. Allowed: jpeg, png, webp" });
                return;
            }
            const MAX_SIZE_MB = 5;
            if (buffer.length > MAX_SIZE_MB * 1024 * 1024) {
                res.status(400).json({ error: `File too large. Maximum size: ${MAX_SIZE_MB}MB` });
                return;
            }
            const farm = await farmService.uploadLogo(id, callerRole, callerFarmId, buffer, mimetype);
            res.status(200).json(farm);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * DELETE /api/farms/:id
     * Apenas admin
     */
    async remove(req, res, next) {
        try {
            await farmService.remove(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}
export default new FarmController();
//# sourceMappingURL=farm.controller.js.map