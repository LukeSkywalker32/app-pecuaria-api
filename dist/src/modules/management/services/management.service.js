import { prisma } from "@/config/database";
import managementValidator from "../validators/management.validator";
class ManagementService {
    async moveAnimal(farmId, data) {
        managementValidator.validateMove(data);
        const { animalId, destinationPastureId, reason, employee, movementDate } = data;
        //1 . Validar animal
        const animal = await prisma.animal.findFirst({
            where: {
                id: animalId,
                farmId,
            },
        });
        if (!animal)
            throw Object.assign(new Error("Animal não encontrado"), { statusCode: 404 });
        // 2. validar pasto de destinantionPastureId
        const destPasture = await prisma.pasture.findFirst({
            where: {
                id: destinationPastureId,
                farmId,
            },
        });
        if (!destPasture)
            throw Object.assign(new Error("Pasto de destino nao encontrado"), { statusCode: 404 });
        const originPastureName = animal.pastureName || "Sem Pasto";
        const destinationPastureName = destPasture.name;
        //3 . Executar Movimento em transação
        const management = await prisma.$transaction(async (tx) => {
            //criar registro de movimentação
            const created = await tx.management.create({
                data: {
                    farmId,
                    animalId,
                    originPasture: originPastureName,
                    destinationPasture: destinationPastureName,
                    reason,
                    employee,
                    movementDate: movementDate ? new Date(movementDate) : new Date(),
                },
            });
            //Atualizar Animal
            await tx.animal.update({
                where: { id: animalId },
                data: {
                    pastureId: destinationPastureId,
                    pastureName: destinationPastureName,
                },
            });
            //Decrementar Pasto de origem (se houver)
            if (animal.pastureId) {
                await tx.pasture.update({
                    where: { id: animal.pastureId },
                    data: { currentAnimals: { decrement: 1 } },
                });
            }
            //Incrementar Pasto de destino
            await tx.pasture.update({
                where: { id: destinationPastureId },
                data: { currentAnimals: { increment: 1 } },
            });
            return created;
        });
        return management;
    }
    async moveBatch(farmId, data) {
        managementValidator.validateMoveBatch(data);
        const { animalIds, destinationPastureId, reason, employee, movementDate } = data;
        //1. valida pasto de destino
        const destPasture = await prisma.pasture.findFirst({
            where: { id: destinationPastureId, farmId },
        });
        if (!destPasture)
            throw Object.assign(new Error("Pasto de destino não encontrado"), {
                statusCode: 404,
            });
        //2. Buscar animais para saber as origens
        const animals = await prisma.animal.findMany({
            where: { id: { in: animalIds }, farmId },
        });
        if (animals.length === 0)
            throw Object.assign(new Error("Animais não encontrados"), { statusCode: 404 });
        await prisma.$transaction(async (tx) => {
            for (const animal of animals) {
                const originPastureName = animal.pastureName || "Sem Pasto";
                //Cria registro de movimentação
                await tx.management.create({
                    data: {
                        farmId,
                        animalId: animal.id,
                        originPasture: originPastureName,
                        destinationPasture: destPasture.name,
                        reason,
                        employee,
                        movementDate: movementDate ? new Date(movementDate) : new Date(),
                    },
                });
                // Atualizar Animal
                await tx.animal.update({
                    where: { id: animal.id },
                    data: {
                        pastureId: destinationPastureId,
                        pastureName: destPasture.name,
                    },
                });
                // Decrementar pasto de origem (se houver)
                if (animal.pastureId) {
                    await tx.pasture.update({
                        where: { id: animal.pastureId },
                        data: { currentAnimals: { decrement: 1 } },
                    });
                }
                // Incrementar pasto de destino
                await tx.pasture.update({
                    where: { id: destinationPastureId },
                    data: { currentAnimals: { increment: 1 } },
                });
            }
        });
        return { count: animals.length };
    }
    async listByAnimal(farmId, animalId) {
        return (await prisma.management.findMany({
            where: { farmId, animalId },
            orderBy: { movementDate: "desc" },
        }));
    }
    async listAll(farmId) {
        const records = await prisma.management.findMany({
            where: { farmId },
            orderBy: { movementDate: "desc" },
            include: {
                animal: {
                    select: { name: true },
                },
            },
        });
        return records.map(r => ({
            ...r,
            animalName: r.animal?.name ?? r.animalId,
        }));
    }
}
export default new ManagementService();
//# sourceMappingURL=management.service.js.map