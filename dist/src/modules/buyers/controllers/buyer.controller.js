import buyerService from "../services/buyer.service";
function queryString(value) {
    if (typeof value === "string")
        return value;
    if (Array.isArray(value))
        return typeof value[0] === "string" ? value[0] : undefined;
    return undefined;
}
class BuyerController {
    async create(req, res, next) {
        try {
            const farmId = req.farmId;
            const body = req.body;
            const buyer = await buyerService.create({ ...body, farmId });
            res.status(201).json(buyer);
        }
        catch (error) {
            next(error);
        }
    }
    async list(req, res, next) {
        try {
            const farmId = req.farmId;
            const query = {
                search: queryString(req.query.search),
            };
            const buyers = await buyerService.list(farmId, query);
            res.json(buyers);
        }
        catch (error) {
            next(error);
        }
    }
    async findById(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            const buyer = await buyerService.findById(id, farmId);
            res.status(200).json(buyer);
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
            const buyer = await buyerService.update(id, farmId, body);
            res.status(200).json(buyer);
        }
        catch (error) {
            next(error);
        }
    }
    async remove(req, res, next) {
        try {
            const farmId = req.farmId;
            const { id } = req.params;
            await buyerService.remove(id, farmId);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}
export default new BuyerController();
//# sourceMappingURL=buyer.controller.js.map