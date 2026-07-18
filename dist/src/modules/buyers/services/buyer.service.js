import { prisma } from "@/config/database";
import { validateCreate, validateUpdate } from "../validators/buyer.validator";
const PUBLIC_BUYER_SELECT = {
    id: true,
    name: true,
    document: true,
    phone: true,
    email: true,
    city: true,
    notes: true,
    createdAt: true,
    updatedAt: true,
    farmId: true,
};
class BuyerService {
    async create(data) {
        validateCreate(data);
        return prisma.buyer.create({
            data: {
                name: data.name.trim(),
                document: data.document?.trim() || null,
                phone: data.phone?.trim() || null,
                email: data.email?.trim() || null,
                city: data.city?.trim() || null,
                notes: data.notes?.trim() || null,
                farmId: data.farmId,
            },
            select: PUBLIC_BUYER_SELECT,
        });
    }
    async list(farmId, query) {
        const where = { farmId };
        if (query.search) {
            const term = query.search.trim();
            where.OR = [
                { name: { contains: term, mode: "insensitive" } },
                { document: { contains: term, mode: "insensitive" } },
                { city: { contains: term, mode: "insensitive" } },
            ];
        }
        return prisma.buyer.findMany({
            where,
            select: PUBLIC_BUYER_SELECT,
            orderBy: { name: "asc" },
        });
    }
    async findById(id, farmId) {
        const buyer = await prisma.buyer.findFirst({
            where: { id, farmId },
            select: PUBLIC_BUYER_SELECT,
        });
        if (!buyer) {
            throw Object.assign(new Error("Comprador não encontrado."), { statusCode: 404 });
        }
        return buyer;
    }
    async update(id, farmId, data) {
        await this.findById(id, farmId);
        validateUpdate(data);
        const updateData = {};
        if (data.name !== undefined)
            updateData.name = data.name.trim();
        if (data.document !== undefined)
            updateData.document = data.document?.trim() || null;
        if (data.phone !== undefined)
            updateData.phone = data.phone?.trim() || null;
        if (data.email !== undefined)
            updateData.email = data.email?.trim() || null;
        if (data.city !== undefined)
            updateData.city = data.city?.trim() || null;
        if (data.notes !== undefined)
            updateData.notes = data.notes?.trim() || null;
        return prisma.buyer.update({
            where: { id },
            data: updateData,
        });
    }
    async remove(id, farmId) {
        await this.findById(id, farmId);
        await prisma.buyer.delete({ where: { id } });
    }
}
export default new BuyerService();
//# sourceMappingURL=buyer.service.js.map