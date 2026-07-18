import { prisma } from "@/config/database";
import breedValidator from "../validators/breed.validator";
const BREED_SELECT = {
    id: true,
    name: true,
    active: true,
    createdAt: true,
    updatedAt: true,
};
class BreedService {
    //Rota pública para o select do formulario de animais
    async list(query) {
        const where = {};
        if (query.active !== undefined) {
            where.active = query.active;
        }
        if (query.search) {
            where.name = { contains: query.search.trim(), mode: "insensitive" };
        }
        return prisma.breed.findMany({
            where,
            select: BREED_SELECT,
            orderBy: { name: "asc" },
        });
    }
    // Busca raça por id
    async findById(id) {
        const breed = await prisma.breed.findUnique({
            where: { id },
            select: BREED_SELECT,
        });
        if (!breed) {
            throw Object.assign(new Error("Raça não encontrada"), { statusCode: 404 });
        }
        return breed;
    }
    // Cria nova raça - somente administradores
    async create(data) {
        breedValidator.validateCreate(data);
        // Verifica nome duplicado
        const existing = await prisma.breed.findFirst({
            where: { name: { equals: data.name.trim(), mode: "insensitive" } },
        });
        if (existing) {
            throw Object.assign(new Error("Já existe uma raça com esse nome"), { statusCode: 409 });
        }
        return prisma.breed.create({
            data: {
                name: data.name.trim(),
            },
            select: BREED_SELECT,
        });
    }
    // Atualiza raça - somente administradores
    async update(id, data) {
        await this.findById(id);
        breedValidator.validateUpdate(data);
        // Verifica conflito de nome
        if (data.name) {
            const conflict = await prisma.breed.findFirst({
                where: {
                    name: { equals: data.name.trim(), mode: "insensitive" },
                    NOT: { id },
                },
            });
            if (conflict) {
                throw Object.assign(new Error("Já existe uma raça com esse nome"), { statusCode: 409 });
            }
        }
        const updateData = {};
        if (data.name !== undefined)
            updateData.name = data.name.trim();
        if (data.active !== undefined)
            updateData.active = data.active;
        return prisma.breed.update({
            where: { id },
            data: updateData,
            select: BREED_SELECT,
        });
    }
    // Remoce raça - somente admin
    // Impede remoção de raça se ainda houver animais usando a raça
    async remove(id) {
        await this.findById(id);
        // Verifica se há animais usando a raça
        const breedRecord = await prisma.breed.findUnique({ where: { id } });
        if (!breedRecord)
            return;
        const animalsUsingBreed = await prisma.animal.count({
            where: { breed: breedRecord.name },
        });
        if (animalsUsingBreed > 0) {
            throw Object.assign(new Error(`Não é possivel excluir: ${animalsUsingBreed} animal(is) cadastrado(s) com essa raça. Desative a raça ao invés de excluir.`), { statusCode: 409 });
        }
        await prisma.breed.delete({ where: { id } });
    }
    /**
     * Ativa ou desativa uma raça
     */
    async toggleActive(id, active) {
        await this.findById(id);
        return prisma.breed.update({
            where: { id },
            data: { active },
            select: BREED_SELECT,
        });
    }
}
export default new BreedService();
//# sourceMappingURL=breed.service.js.map