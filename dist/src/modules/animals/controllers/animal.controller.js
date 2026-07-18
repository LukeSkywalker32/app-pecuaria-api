import animalService from "../services/animal.service";
class AnimalController {
    async create(req, res, next) {
        try {
            const farmId = req.farmId;
            const body = req.body;
            const animal = await animalService.create(farmId, body);
            res.status(201).json(animal);
        }
        catch (error) {
            next(error);
        }
    }
    async list(req, res, next) {
        try {
            const farmId = req.farmId;
            const query = {
                status: req.query.status,
                gender: req.query.gender,
                pastureId: req.query.pastureId,
                search: req.query.search,
            };
            const animals = await animalService.list(farmId, query);
            res.status(200).json(animals);
        }
        catch (error) {
            next(error);
        }
    }
    async findById(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const animal = await animalService.findById(farmId, id);
            res.status(200).json(animal);
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const body = req.body;
            const animal = await animalService.update(farmId, id, body);
            res.status(200).json(animal);
        }
        catch (error) {
            next(error);
        }
    }
    async remove(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            await animalService.remove(farmId, id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}
export default new AnimalController();
//# sourceMappingURL=animal.controller.js.map