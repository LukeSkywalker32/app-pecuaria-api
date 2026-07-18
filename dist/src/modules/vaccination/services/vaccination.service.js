// ========================================
// VACCINATION SERVICE
// ========================================
import { prisma } from "@/config/database";
import vaccinationValidator from "../validators/vaccination.validator";
const VACCINATION_SELECT = {
    id: true,
    farmId: true,
    animalId: true,
    vaccineType: true,
    brand: true,
    batch: true,
    vaccinationDate: true,
    expirationDate: true,
    nextDoseDate: true,
    photos: true,
    reaction: true,
    notes: true,
    veterinarianId: true,
    createdAt: true,
    updatedAt: true,
    animal: {
        select: {
            currentEarTag: true,
            name: true,
        },
    },
    veterinarian: {
        select: {
            fullName: true,
        },
    },
};
function formatVaccination(v) {
    const { animal, veterinarian, ...data } = v;
    return {
        ...data,
        animalEarTag: animal?.currentEarTag ?? null,
        animalName: animal?.name ?? null,
        veterinarianName: veterinarian?.fullName ?? null,
    };
}
class VaccinationService {
    /**
     * Registra vacinação de um animal
     * Regras:
     * - Animal deve existir e estar ativo na fazenda
     * - Veterinário (se informado) deve pertencer à fazenda
     * - Data de validade deve ser posterior à data de vacinação
     */
    async create(farmId, data) {
        vaccinationValidator.validateCreate(data);
        // Validar animal
        const animal = await prisma.animal.findFirst({
            where: { id: data.animalId, farmId },
        });
        if (!animal) {
            throw Object.assign(new Error("Animal não encontrado"), { statusCode: 404 });
        }
        if (animal.status === "dead" || animal.status === "sold") {
            throw Object.assign(new Error(`Animal com status ${animal.status} não pode ser vacinado`), { statusCode: 400 });
        }
        // Validar veterinário (se informado)
        if (data.veterinarianId) {
            const vet = await prisma.user.findFirst({
                where: { id: data.veterinarianId, farmId },
            });
            if (!vet) {
                throw Object.assign(new Error("Veterinário não encontrado nesta fazenda"), {
                    statusCode: 404,
                });
            }
        }
        const vaccination = await prisma.vaccination.create({
            data: {
                farmId,
                animalId: data.animalId,
                vaccineType: data.vaccineType.trim(),
                brand: data.brand.trim(),
                batch: data.batch.trim(),
                vaccinationDate: new Date(data.vaccinationDate),
                expirationDate: new Date(data.expirationDate),
                nextDoseDate: data.nextDoseDate ? new Date(data.nextDoseDate) : null,
                photos: data.photos ?? [],
                reaction: data.reaction?.trim() ?? null,
                notes: data.notes?.trim() ?? null,
                veterinarianId: data.veterinarianId ?? null,
            },
            select: VACCINATION_SELECT,
        });
        return formatVaccination(vaccination);
    }
    /**
     * Lista vacinações da fazenda com filtros
     */
    async list(farmId, query) {
        const where = { farmId };
        if (query.animalId)
            where.animalId = query.animalId;
        if (query.vaccineType) {
            where.vaccineType = { contains: query.vaccineType.trim(), mode: "insensitive" };
        }
        if (query.dateFrom || query.dateTo) {
            where.vaccinationDate = {
                ...(query.dateFrom ? { gte: new Date(query.dateFrom) } : {}),
                ...(query.dateTo ? { lte: new Date(query.dateTo) } : {}),
            };
        }
        // Próximas doses nos próximos X dias (default 30)
        if (query.upcoming) {
            const hoje = new Date();
            const em30Dias = new Date();
            em30Dias.setDate(hoje.getDate() + 30);
            where.nextDoseDate = { gte: hoje, lte: em30Dias };
        }
        const vaccinations = await prisma.vaccination.findMany({
            where,
            select: VACCINATION_SELECT,
            orderBy: { vaccinationDate: "desc" },
        });
        return vaccinations.map(formatVaccination);
    }
    /**
     * Busca vacinação por ID
     */
    async getById(farmId, id) {
        const vaccination = await prisma.vaccination.findFirst({
            where: { id, farmId },
            select: VACCINATION_SELECT,
        });
        if (!vaccination) {
            throw Object.assign(new Error("Vacinação não encontrada"), { statusCode: 404 });
        }
        return formatVaccination(vaccination);
    }
    /**
     * Histórico de vacinações de um animal
     */
    async listByAnimal(farmId, animalId) {
        const animal = await prisma.animal.findFirst({
            where: { id: animalId, farmId },
        });
        if (!animal) {
            throw Object.assign(new Error("Animal não encontrado"), { statusCode: 404 });
        }
        const vaccinations = await prisma.vaccination.findMany({
            where: { farmId, animalId },
            select: VACCINATION_SELECT,
            orderBy: { vaccinationDate: "desc" },
        });
        return vaccinations.map(formatVaccination);
    }
    /**
     * Próximas doses — para dashboard/alertas
     */
    async getUpcoming(farmId, dias = 30) {
        const hoje = new Date();
        const limite = new Date();
        limite.setDate(hoje.getDate() + dias);
        const vaccinations = await prisma.vaccination.findMany({
            where: {
                farmId,
                nextDoseDate: { gte: hoje, lte: limite },
            },
            select: VACCINATION_SELECT,
            orderBy: { nextDoseDate: "asc" },
        });
        return vaccinations.map(formatVaccination);
    }
    /**
     * Atualiza registro de vacinação
     */
    async update(farmId, id, data) {
        await this.getById(farmId, id);
        vaccinationValidator.validateUpdate(data);
        // Validar veterinário (se informado)
        if (data.veterinarianId) {
            const vet = await prisma.user.findFirst({
                where: { id: data.veterinarianId, farmId },
            });
            if (!vet) {
                throw Object.assign(new Error("Veterinário não encontrado nesta fazenda"), {
                    statusCode: 404,
                });
            }
        }
        const updateData = {};
        if (data.vaccineType)
            updateData.vaccineType = data.vaccineType.trim();
        if (data.brand)
            updateData.brand = data.brand.trim();
        if (data.batch)
            updateData.batch = data.batch.trim();
        if (data.vaccinationDate)
            updateData.vaccinationDate = new Date(data.vaccinationDate);
        if (data.expirationDate)
            updateData.expirationDate = new Date(data.expirationDate);
        if (data.nextDoseDate !== undefined) {
            updateData.nextDoseDate = data.nextDoseDate ? new Date(data.nextDoseDate) : null;
        }
        if (data.photos !== undefined)
            updateData.photos = { set: data.photos };
        if (data.reaction !== undefined)
            updateData.reaction = data.reaction?.trim() ?? null;
        if (data.notes !== undefined)
            updateData.notes = data.notes?.trim() ?? null;
        if (data.veterinarianId !== undefined) {
            updateData.veterinarian = data.veterinarianId
                ? { connect: { id: data.veterinarianId } }
                : { disconnect: true };
        }
        const vaccination = await prisma.vaccination.update({
            where: { id },
            data: updateData,
            select: VACCINATION_SELECT,
        });
        return formatVaccination(vaccination);
    }
    /**
     * Remove registro de vacinação
     */
    async remove(farmId, id) {
        await this.getById(farmId, id);
        await prisma.vaccination.delete({ where: { id } });
    }
    /**
     * Adiciona fotos ao registro (append — não substitui)
     * Recebe array de URLs já enviadas ao Cloudinary
     */
    async addPhotos(farmId, id, photoUrls) {
        const current = await this.getById(farmId, id);
        // Limite de 3 fotos total por vacinação
        const total = (current.photos?.length ?? 0) + photoUrls.length;
        if (total > 3) {
            throw Object.assign(new Error(`Limite de 3 fotos atingido. Já existem ${current.photos?.length ?? 0} foto(s).`), { statusCode: 400 });
        }
        const vaccination = await prisma.vaccination.update({
            where: { id },
            data: {
                photos: {
                    push: photoUrls,
                    // ↑ Prisma suporta push em arrays PostgreSQL nativamente
                },
            },
            select: VACCINATION_SELECT,
        });
        return formatVaccination(vaccination);
    }
    /**
     * Remove uma foto especifica do registro pela URL
     * Como o array "photos" no Postgres não suporta "remover por valor"
     * diretamente via Prisma, buscamos o registro, filtramos em memória
     * e gravamos o array completo (set, não push)
     */
    async removePhoto(farmId, id, photoUrl) {
        const current = await this.getById(farmId, id);
        if (!current.photos || !current.photos.includes(photoUrl)) {
            throw Object.assign(new Error("Foto não encontrada neste registro"), {
                statusCode: 404,
            });
        }
        const updatedPhotos = current.photos.filter(url => url !== photoUrl);
        const vaccination = await prisma.vaccination.update({
            where: { id },
            data: {
                photos: { set: updatedPhotos },
            },
            select: VACCINATION_SELECT,
        });
        return formatVaccination(vaccination);
    }
}
export default new VaccinationService();
//# sourceMappingURL=vaccination.service.js.map