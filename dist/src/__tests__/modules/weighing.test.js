import { beforeEach, describe, expect, it, vi } from "vitest";
const { prismaMock } = vi.hoisted(() => {
    const prismaMock = {
        weighing: {
            findFirst: vi.fn(),
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        },
        animal: {
            findFirst: vi.fn(),
            update: vi.fn(),
        },
    };
    return { prismaMock };
});
vi.mock("@/config/database", () => ({ prisma: prismaMock }));
import weighingService from "@/modules/weighing/service/weighing.service";
describe("WeighingService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it("deve retornar o GMD ao buscar uma pesagem por id", async () => {
        prismaMock.weighing.findFirst.mockResolvedValue({
            id: "weighing-1",
            farmId: "farm-1",
            animalId: "animal-1",
            weightKg: 350,
            date: new Date(2024, 0, 5),
            notes: null,
            registeredById: null,
            createdAt: new Date(2024, 0, 5),
            updatedAt: new Date(2024, 0, 5),
            animal: { currentEarTag: "123", name: "Mimosa" },
            registeredBy: null,
        });
        prismaMock.weighing.findMany.mockResolvedValue([
            {
                id: "weighing-0",
                animalId: "animal-1",
                weightKg: 300,
                date: new Date(2024, 0, 1),
            },
            {
                id: "weighing-1",
                animalId: "animal-1",
                weightKg: 350,
                date: new Date(2024, 0, 5),
            },
        ]);
        const result = await weighingService.getById("farm-1", "weighing-1");
        expect(result.gmd).toBe(12.5);
        expect(result.weightKg).toBe(350);
    });
});
//# sourceMappingURL=weighing.test.js.map