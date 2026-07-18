import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
const { prismaMock } = vi.hoisted(() => ({
    prismaMock: {
        animal: {
            findFirst: vi.fn(),
            findUnique: vi.fn(),
            update: vi.fn(),
        },
        earTagHistory: {
            findFirst: vi.fn(),
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        },
        $transaction: vi.fn(),
    },
}));
vi.mock("@/config/database", () => ({ prisma: prismaMock }));
import earTagRoutes from "@/modules/earTagHistory/routes/earTagHistory.routes";
// --- Setup do App de Teste ---
const app = express();
app.use(express.json());
// O middleware de erro precisa ser injetado caso a rota dê next(error)
app.use((req, res, next) => {
    // Mock properties set by authMiddleware
    req.userId = "user-id";
    req.farmId = "farm-id";
    req.role = "admin";
    req.permissions = ["place_ear_tag", "remove_ear_tag", "delete_ear_tag_history"];
    next();
});
app.use("/api/earTagHistory", earTagRoutes);
// Tratamento de erro local
app.use((err, _req, res, _next) => {
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message });
});
describe("EarTagHistory Module", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    const validPlace = {
        animalId: "animal-id",
        earTagNumber: "BR-12345",
        placementDate: "2024-01-01",
        reason: "Initial tag",
    };
    const mockAnimal = {
        id: "animal-id",
        farmId: "farm-id",
        name: "Mimosa",
        status: "active",
        currentEarTag: null,
    };
    const mockEarTag = {
        id: "tag-id",
        farmId: "farm-id",
        animalId: "animal-id",
        earTagNumber: "BR-12345",
        placementDate: new Date("2024-01-01"),
        removalDate: null,
        reason: "Initial tag",
        createdAt: new Date(),
        animal: {
            name: "Mimosa",
            currentEarTag: "BR-12345",
        },
    };
    describe("POST /api/earTagHistory", () => {
        it("deve registrar novo brinco com sucesso", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
            prismaMock.earTagHistory.findFirst.mockResolvedValue(null);
            // Mock do transaction
            prismaMock.$transaction.mockImplementation(async (cb) => {
                return cb(prismaMock);
            });
            prismaMock.earTagHistory.create.mockResolvedValue(mockEarTag);
            prismaMock.animal.update.mockResolvedValue({ ...mockAnimal, currentEarTag: "BR-12345" });
            const res = await request(app).post("/api/earTagHistory").send(validPlace);
            expect(res.status).toBe(201);
            expect(res.body.earTagNumber).toBe("BR-12345");
        });
        it("deve substituir brinco se já existir um ativo", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
            const activeTag = {
                id: "old-tag",
                animalId: "animal-id",
                farmId: "farm-id",
                removalDate: null,
                reason: "Old tag",
            };
            prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));
            prismaMock.earTagHistory.findFirst.mockResolvedValue(activeTag);
            prismaMock.earTagHistory.update.mockResolvedValue({ ...activeTag, removalDate: new Date() });
            prismaMock.earTagHistory.create.mockResolvedValue(mockEarTag);
            prismaMock.animal.update.mockResolvedValue(mockAnimal);
            const res = await request(app).post("/api/earTagHistory").send(validPlace);
            expect(res.status).toBe(201);
        });
        it("erro validator: animalId vazio", async () => {
            const res = await request(app).post("/api/earTagHistory").send({ ...validPlace, animalId: "" });
            expect(res.status).toBe(500);
        });
        it("erro validator: numero do brinco invalido", async () => {
            let res = await request(app).post("/api/earTagHistory").send({ ...validPlace, earTagNumber: "" });
            expect(res.status).toBe(500);
            res = await request(app).post("/api/earTagHistory").send({ ...validPlace, earTagNumber: "a".repeat(21) });
            expect(res.status).toBe(500);
            res = await request(app).post("/api/earTagHistory").send({ ...validPlace, earTagNumber: "BR@123" });
            expect(res.status).toBe(500);
        });
        it("erro validator: placementDate invalida", async () => {
            let res = await request(app).post("/api/earTagHistory").send({ ...validPlace, placementDate: "" });
            expect(res.status).toBe(500);
            res = await request(app).post("/api/earTagHistory").send({ ...validPlace, placementDate: "invalid" });
            expect(res.status).toBe(500);
            res = await request(app).post("/api/earTagHistory").send({ ...validPlace, placementDate: "2099-01-01" });
            expect(res.status).toBe(500);
        });
        it("erro validator: reason muito longo", async () => {
            const res = await request(app).post("/api/earTagHistory").send({ ...validPlace, reason: "a".repeat(201) });
            expect(res.status).toBe(500);
        });
        it("erro: animal não encontrado", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(null);
            const res = await request(app).post("/api/earTagHistory").send(validPlace);
            expect(res.status).toBe(404);
        });
        it("erro: animal morto", async () => {
            prismaMock.animal.findFirst.mockResolvedValue({ ...mockAnimal, status: "dead" });
            const res = await request(app).post("/api/earTagHistory").send(validPlace);
            expect(res.status).toBe(400);
        });
        it("erro: animal vendido", async () => {
            prismaMock.animal.findFirst.mockResolvedValue({ ...mockAnimal, status: "sold" });
            const res = await request(app).post("/api/earTagHistory").send(validPlace);
            expect(res.status).toBe(400);
        });
        it("deve cobrir animal ausente no formatRecord", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
            prismaMock.earTagHistory.findFirst.mockResolvedValue(null);
            prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));
            // Retornar earTag sem obj animal
            const tagNoAnimal = { ...mockEarTag, animal: null };
            prismaMock.earTagHistory.create.mockResolvedValue(tagNoAnimal);
            prismaMock.animal.update.mockResolvedValue({ ...mockAnimal, currentEarTag: "BR-12345" });
            const res = await request(app).post("/api/earTagHistory").send(validPlace);
            expect(res.status).toBe(201);
            expect(res.body.animalName).toBeNull();
        });
    });
    describe("GET /api/earTagHistory/animal/:animalId", () => {
        it("deve listar historico por animal", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
            prismaMock.earTagHistory.findMany.mockResolvedValue([mockEarTag]);
            const res = await request(app).get("/api/earTagHistory/animal/animal-id");
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0].earTagNumber).toBe("BR-12345");
        });
        it("erro: animal nao encontrado", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(null);
            const res = await request(app).get("/api/earTagHistory/animal/animal-id");
            expect(res.status).toBe(404);
        });
    });
    describe("GET /api/earTagHistory", () => {
        it("deve listar todos os brincos da fazenda", async () => {
            prismaMock.earTagHistory.findMany.mockResolvedValue([mockEarTag]);
            const res = await request(app).get("/api/earTagHistory");
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
        });
        it("deve listar com filtros", async () => {
            prismaMock.earTagHistory.findMany.mockResolvedValue([mockEarTag]);
            const res = await request(app).get("/api/earTagHistory?animalId=animal-id&activeOnly=true");
            expect(res.status).toBe(200);
        });
    });
    describe("GET /api/earTagHistory/:id", () => {
        it("deve buscar brinco por id", async () => {
            prismaMock.earTagHistory.findFirst.mockResolvedValue(mockEarTag);
            const res = await request(app).get("/api/earTagHistory/tag-id");
            expect(res.status).toBe(200);
            expect(res.body.earTagNumber).toBe("BR-12345");
        });
        it("erro: nao encontrado", async () => {
            prismaMock.earTagHistory.findFirst.mockResolvedValue(null);
            const res = await request(app).get("/api/earTagHistory/tag-id");
            expect(res.status).toBe(404);
        });
    });
    describe("PATCH /api/earTagHistory/:id/remove", () => {
        const validRemove = {
            removalDate: "2024-02-01",
            reason: "Lost",
        };
        it("deve marcar brinco como removido", async () => {
            prismaMock.earTagHistory.findFirst.mockResolvedValue(mockEarTag);
            prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));
            prismaMock.earTagHistory.update.mockResolvedValue({ ...mockEarTag, removalDate: new Date() });
            prismaMock.animal.findUnique.mockResolvedValue({ currentEarTag: "BR-12345" });
            prismaMock.animal.update.mockResolvedValue(mockAnimal);
            const res = await request(app).patch("/api/earTagHistory/tag-id/remove").send(validRemove);
            expect(res.status).toBe(200);
        });
        it("deve marcar brinco sem ser currentEarTag", async () => {
            prismaMock.earTagHistory.findFirst.mockResolvedValue(mockEarTag);
            prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));
            prismaMock.earTagHistory.update.mockResolvedValue({ ...mockEarTag, removalDate: new Date() });
            prismaMock.animal.findUnique.mockResolvedValue({ currentEarTag: "OTHER-TAG" });
            const res = await request(app).patch("/api/earTagHistory/tag-id/remove").send(validRemove);
            expect(res.status).toBe(200);
            // animal update shouldn't be called
        });
        it("erro validator: data de remocao", async () => {
            let res = await request(app).patch("/api/earTagHistory/tag-id/remove").send({ reason: "lost" });
            expect(res.status).toBe(500);
            res = await request(app).patch("/api/earTagHistory/tag-id/remove").send({ removalDate: "invalid" });
            expect(res.status).toBe(500);
            res = await request(app).patch("/api/earTagHistory/tag-id/remove").send({ removalDate: "2099-01-01" });
            expect(res.status).toBe(500);
        });
        it("erro validator: reason muito longo", async () => {
            const res = await request(app).patch("/api/earTagHistory/tag-id/remove").send({ ...validRemove, reason: "a".repeat(201) });
            expect(res.status).toBe(500);
        });
        it("erro: ja foi removido", async () => {
            prismaMock.earTagHistory.findFirst.mockResolvedValue({ ...mockEarTag, removalDate: new Date() });
            const res = await request(app).patch("/api/earTagHistory/tag-id/remove").send(validRemove);
            expect(res.status).toBe(400);
        });
    });
    describe("DELETE /api/earTagHistory/:id", () => {
        it("deve deletar brinco inativo (já removido)", async () => {
            prismaMock.earTagHistory.findFirst.mockResolvedValue({ ...mockEarTag, removalDate: new Date() });
            prismaMock.earTagHistory.delete.mockResolvedValue({});
            const res = await request(app).delete("/api/earTagHistory/tag-id");
            expect(res.status).toBe(204);
        });
        it("erro validator: reason vazio (place)", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
            prismaMock.earTagHistory.findFirst.mockResolvedValue(null);
            prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));
            prismaMock.earTagHistory.create.mockResolvedValue(mockEarTag);
            prismaMock.animal.update.mockResolvedValue({ ...mockAnimal, currentEarTag: "BR-12345" });
            const res = await request(app).post("/api/earTagHistory").send({ ...validPlace, reason: "   " });
            expect(res.status).toBe(201);
        });
        it("deve substituir brinco ativo sem motivo anterior", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
            const activeTag = {
                id: "old-tag",
                animalId: "animal-id",
                farmId: "farm-id",
                removalDate: null,
                reason: null, // Testando ramo sem reason
            };
            prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));
            prismaMock.earTagHistory.findFirst.mockResolvedValue(activeTag);
            prismaMock.earTagHistory.update.mockResolvedValue({ ...activeTag, removalDate: new Date() });
            prismaMock.earTagHistory.create.mockResolvedValue(mockEarTag);
            prismaMock.animal.update.mockResolvedValue(mockAnimal);
            const res = await request(app).post("/api/earTagHistory").send(validPlace);
            expect(res.status).toBe(201);
        });
        it("erro: nao pode deletar brinco ativo", async () => {
            prismaMock.earTagHistory.findFirst.mockResolvedValue(mockEarTag);
            const res = await request(app).delete("/api/earTagHistory/tag-id");
            expect(res.status).toBe(400);
        });
    });
});
//# sourceMappingURL=earTagHistory.test.js.map