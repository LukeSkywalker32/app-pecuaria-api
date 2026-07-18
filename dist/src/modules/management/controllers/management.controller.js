import managementService from "../services/management.service";
class ManagementController {
    async move(req, res, next) {
        try {
            const farmId = req.farmId;
            const body = req.body;
            const result = await managementService.moveAnimal(farmId, body);
            res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async moveBatch(req, res, next) {
        try {
            const farmId = req.farmId;
            const body = req.body;
            const result = await managementService.moveBatch(farmId, body);
            res.status(201).json({ result });
        }
        catch (error) {
            next(error);
        }
    }
    async listAll(req, res, next) {
        try {
            const farmId = req.farmId;
            const history = await managementService.listAll(farmId);
            res.setHeader("Cache-Control", "no-store");
            res.removeHeader("ETag");
            res.status(200).json(history);
        }
        catch (error) {
            next(error);
        }
    }
    async listByAnimal(req, res, next) {
        try {
            const farmId = req.farmId;
            const { animalId } = req.params;
            const history = await managementService.listByAnimal(farmId, animalId);
            res.status(200).json(history);
        }
        catch (error) {
            next(error);
        }
    }
}
export default new ManagementController();
//# sourceMappingURL=management.controller.js.map