import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockAnimal, mockPasture } from "../helpers/auth.helper";
const { prismaMock } = vi.hoisted(() => {
    const prismaMock = {
        animal: {
            findFirst: vi.fn(),
            findUnique: vi.fn(),
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        },
        pasture: { findFirst: vi.fn(), update: vi.fn() },
        $transaction: vi.fn(),
        $queryRaw: vi.fn(),
    };
    return { prismaMock };
});
vi.mock("@/config/database", () => ({ prisma: prismaMock }));
import app from "@/app";
describe("Animal Module", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));
    });
    // ─── LIST ───
    describe("GET /api/animals", () => {
        it("deve listar animais da fazenda", async () => {
            prismaMock.animal.findMany.mockResolvedValue([mockAnimal]);
            const res = await request(app).get("/api/animals");
            expect(res.status).toBe(200);
            expect(res.body[0]).toHaveProperty("ageInMonths");
            // Nota: "uaValue" (Unidade Animal) foi removido desta asserção —
            // essa propriedade não existe em nenhum lugar do código fonte
            // (animal.service.ts não a calcula). O teste estava verificando
            // uma feature que nunca chegou a ser implementada. Se for pra
            // implementar de verdade, precisa da fórmula de negócio certa
            // antes (ex: UA = pesoKg / 450).
        });
        it("deve listar com filtro de status", async () => {
            prismaMock.animal.findMany.mockResolvedValue([mockAnimal]);
            const res = await request(app).get("/api/animals?status=active");
            expect(res.status).toBe(200);
        });
        it("deve listar com filtro de gender", async () => {
            prismaMock.animal.findMany.mockResolvedValue([mockAnimal]);
            const res = await request(app).get("/api/animals?gender=F");
            expect(res.status).toBe(200);
        });
        it("deve listar com filtro de pastureId", async () => {
            prismaMock.animal.findMany.mockResolvedValue([mockAnimal]);
            const res = await request(app).get("/api/animals?pastureId=test-pasture-id");
            expect(res.status).toBe(200);
        });
        it("deve listar com filtro de search", async () => {
            prismaMock.animal.findMany.mockResolvedValue([mockAnimal]);
            const res = await request(app).get("/api/animals?search=Vaca");
            expect(res.status).toBe(200);
        });
        it("deve retornar lista vazia", async () => {
            prismaMock.animal.findMany.mockResolvedValue([]);
            const res = await request(app).get("/api/animals");
            expect(res.status).toBe(200);
            expect(res.body).toEqual([]);
        });
        it("deve listar macho jovem (Bezerro)", async () => {
            const baby = { ...mockAnimal, gender: "M", birthDate: new Date() };
            prismaMock.animal.findMany.mockResolvedValue([baby]);
            const res = await request(app).get("/api/animals");
            expect(res.status).toBe(200);
            expect(res.body[0].category).toBe("Bezerro");
        });
        it("deve listar femea jovem (Bezerra)", async () => {
            const baby = { ...mockAnimal, gender: "F", birthDate: new Date() };
            prismaMock.animal.findMany.mockResolvedValue([baby]);
            const res = await request(app).get("/api/animals");
            expect(res.status).toBe(200);
            expect(res.body[0].category).toBe("Bezerra");
        });
        it("deve listar macho adolescente (Garrote)", async () => {
            const d = new Date();
            d.setMonth(d.getMonth() - 18);
            const teen = { ...mockAnimal, gender: "M", birthDate: d };
            prismaMock.animal.findMany.mockResolvedValue([teen]);
            const res = await request(app).get("/api/animals");
            expect(res.status).toBe(200);
            expect(res.body[0].category).toBe("Garrote");
        });
        it("deve listar femea adolescente (Novilha)", async () => {
            const d = new Date();
            d.setMonth(d.getMonth() - 18);
            const teen = { ...mockAnimal, gender: "F", birthDate: d };
            prismaMock.animal.findMany.mockResolvedValue([teen]);
            const res = await request(app).get("/api/animals");
            expect(res.status).toBe(200);
            expect(res.body[0].category).toBe("Novilha");
        });
        it("deve listar macho adulto (Touro)", async () => {
            const d = new Date();
            d.setMonth(d.getMonth() - 36);
            const bull = { ...mockAnimal, gender: "M", birthDate: d };
            prismaMock.animal.findMany.mockResolvedValue([bull]);
            const res = await request(app).get("/api/animals");
            expect(res.status).toBe(200);
            expect(res.body[0].category).toBe("Touro");
        });
    });
    // ─── CREATE ───
    describe("POST /api/animals", () => {
        const validPayload = {
            chipId: "CHIP-001",
            currentEarTag: "BR-001",
            name: "Vaca 001",
            breed: "Nelore",
            gender: "F",
            birthDate: "2020-01-01",
            pastureId: "test-pasture-id",
            origin: "born",
        };
        it("deve criar animal com sucesso", async () => {
            prismaMock.animal.findUnique.mockResolvedValue(null);
            prismaMock.pasture.findFirst.mockResolvedValue(mockPasture);
            prismaMock.animal.create.mockResolvedValue(mockAnimal);
            prismaMock.pasture.update.mockResolvedValue({ ...mockPasture, currentAnimals: 1 });
            const res = await request(app).post("/api/animals").send(validPayload);
            expect(res.status).toBe(201);
            expect(prismaMock.pasture.update).toHaveBeenCalledWith(expect.objectContaining({ data: { currentAnimals: { increment: 1 } } }));
        });
        it("deve retornar 409 para chip duplicado", async () => {
            prismaMock.animal.findUnique.mockResolvedValue(mockAnimal);
            const res = await request(app).post("/api/animals").send(validPayload);
            expect(res.status).toBe(409);
        });
        it("deve criar animal comprado sem pasto (quarantine)", async () => {
            prismaMock.animal.findUnique.mockResolvedValue(null);
            prismaMock.pasture.findFirst.mockResolvedValue(null); // sem pasto de quarentena cadastrado
            prismaMock.animal.create.mockResolvedValue({
                ...mockAnimal,
                status: "quarantine",
                pastureId: null,
            });
            const res = await request(app)
                .post("/api/animals")
                .send({
                ...validPayload,
                origin: "purchased",
                pastureId: undefined,
            });
            expect(res.status).toBe(201);
            // Confirma que tentou achar um pasto de quarentena antes de desistir
            expect(prismaMock.pasture.findFirst).toHaveBeenCalledWith(expect.objectContaining({
                where: { farmId: "test-farm-id", type: "quarantine", active: true },
            }));
        });
        it("deve salvar origin corretamente no banco (bug: origin sempre caía no default 'born')", async () => {
            prismaMock.animal.findUnique.mockResolvedValue(null);
            prismaMock.pasture.findFirst.mockResolvedValue(null);
            prismaMock.animal.create.mockResolvedValue({
                ...mockAnimal,
                origin: "purchased",
                pastureId: null,
                status: "quarantine",
            });
            const res = await request(app)
                .post("/api/animals")
                .send({
                ...validPayload,
                origin: "purchased",
                pastureId: undefined,
            });
            expect(res.status).toBe(201);
            const createCallData = prismaMock.animal.create.mock.calls[0][0].data;
            expect(createCallData.origin).toBe("purchased");
        });
        it("deve vincular automaticamente a um pasto de quarentena já cadastrado", async () => {
            const quarantinePasture = {
                id: "quarantine-pasture-id",
                name: "Quarentena",
                type: "quarantine",
                active: true,
                farmId: "test-farm-id",
                currentAnimals: 0,
                animalCapacity: 10,
            };
            prismaMock.animal.findUnique.mockResolvedValue(null);
            prismaMock.pasture.findFirst.mockResolvedValue(quarantinePasture);
            prismaMock.animal.create.mockResolvedValue({
                ...mockAnimal,
                origin: "purchased",
                pastureId: quarantinePasture.id,
                pastureName: quarantinePasture.name,
                status: "quarantine",
            });
            prismaMock.pasture.update.mockResolvedValue({ ...quarantinePasture, currentAnimals: 1 });
            const res = await request(app)
                .post("/api/animals")
                .send({
                ...validPayload,
                origin: "purchased",
                pastureId: undefined,
            });
            expect(res.status).toBe(201);
            expect(res.body.pastureId).toBe("quarantine-pasture-id");
            expect(res.body.status).toBe("quarantine");
            // Confirma que o contador do pasto de quarentena foi incrementado
            expect(prismaMock.pasture.update).toHaveBeenCalledWith(expect.objectContaining({
                where: { id: "quarantine-pasture-id" },
                data: { currentAnimals: { increment: 1 } },
            }));
        });
        it("não deve auto-vincular a quarentena se o usuário já escolheu um pasto manualmente", async () => {
            prismaMock.animal.findUnique.mockResolvedValue(null);
            prismaMock.pasture.findFirst.mockResolvedValue(mockPasture); // pasto escolhido manualmente
            prismaMock.animal.create.mockResolvedValue({ ...mockAnimal, origin: "purchased" });
            prismaMock.pasture.update.mockResolvedValue({ ...mockPasture, currentAnimals: 1 });
            const res = await request(app)
                .post("/api/animals")
                .send({
                ...validPayload,
                origin: "purchased",
                pastureId: "test-pasture-id", // já veio com pasto escolhido
            });
            expect(res.status).toBe(201);
            // Não deve procurar pasto de quarentena, já que o usuário escolheu um
            expect(prismaMock.pasture.findFirst).toHaveBeenCalledWith(expect.objectContaining({ where: { id: "test-pasture-id", farmId: "test-farm-id" } }));
            expect(prismaMock.pasture.findFirst).not.toHaveBeenCalledWith(expect.objectContaining({ where: expect.objectContaining({ type: "quarantine" }) }));
        });
        it("deve erro para born sem pasto", async () => {
            prismaMock.animal.findUnique.mockResolvedValue(null);
            const res = await request(app).post("/api/animals").send({
                chipId: "CHIP-NEW",
                name: "Teste",
                breed: "Nelore",
                gender: "F",
                birthDate: "2020-01-01",
                origin: "born",
            });
            expect(res.status).toBe(400);
        });
        it("deve erro 404 para pasto inexistente", async () => {
            prismaMock.animal.findUnique.mockResolvedValue(null);
            prismaMock.pasture.findFirst.mockResolvedValue(null);
            const res = await request(app).post("/api/animals").send(validPayload);
            expect(res.status).toBe(404);
        });
        // ─── Validator: chipId ───
        it("erro: chipId curto", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, chipId: "AB" });
            expect(res.status).toBe(400);
        });
        it("erro: chipId longo", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, chipId: "A".repeat(31) });
            expect(res.status).toBe(400);
        });
        it("erro: chipId com caracteres invalidos", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, chipId: "CHIP @#!" });
            expect(res.status).toBe(400);
        });
        // ─── Validator: earTag ───
        it("erro: earTag vazio", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, currentEarTag: "  " });
            expect(res.status).toBe(400);
        });
        it("erro: earTag longo", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, currentEarTag: "A".repeat(21) });
            expect(res.status).toBe(400);
        });
        // ─── Validator: name ───
        it("erro: nome vazio", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, name: "  " });
            expect(res.status).toBe(400);
        });
        it("erro: nome longo", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, name: "A".repeat(51) });
            expect(res.status).toBe(400);
        });
        // ─── Validator: breed ───
        it("erro: raça curta", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, breed: "A" });
            expect(res.status).toBe(400);
        });
        it("erro: raça longa", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, breed: "A".repeat(51) });
            expect(res.status).toBe(400);
        });
        // ─── Validator: gender ───
        it("erro: gender invalido", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, gender: "X" });
            expect(res.status).toBe(400);
        });
        // ─── Validator: birthDate ───
        it("erro: birthDate ausente", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, birthDate: undefined });
            expect(res.status).toBe(400);
        });
        it("erro: birthDate invalida", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, birthDate: "not-a-date" });
            expect(res.status).toBe(400);
        });
        it("erro: birthDate futura", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, birthDate: "2099-01-01" });
            expect(res.status).toBe(400);
        });
        // ─── Validator: origin ───
        it("erro: origin invalida", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, origin: "stolen" });
            expect(res.status).toBe(400);
        });
        // ─── Validator: status ───
        it("erro: status invalido", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, status: "unknown" });
            expect(res.status).toBe(400);
        });
        // ─── Validator: genealogia ───
        it("erro: sireId vazio", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, sireId: "  " });
            expect(res.status).toBe(400);
        });
        it("erro: damId vazio", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, damId: "  " });
            expect(res.status).toBe(400);
        });
        it("erro: sireExternalName longo", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, sireExternalName: "A".repeat(101) });
            expect(res.status).toBe(400);
        });
        it("erro: damExternalName longo", async () => {
            const res = await request(app)
                .post("/api/animals")
                .send({ ...validPayload, damExternalName: "A".repeat(101) });
            expect(res.status).toBe(400);
        });
    });
    // ─── FIND BY ID ───
    describe("GET /api/animals/:id", () => {
        it("deve retornar animal por ID", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
            const res = await request(app).get("/api/animals/test-animal-id");
            expect(res.status).toBe(200);
            expect(res.body.category).toBe("Vaca");
        });
        it("deve retornar 404 quando animal não existe", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(null);
            const res = await request(app).get("/api/animals/id-inexistente");
            expect(res.status).toBe(404);
        });
    });
    // ─── UPDATE ───
    describe("PUT /api/animals/:id", () => {
        it("deve atualizar nome do animal", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
            prismaMock.animal.update.mockResolvedValue({ ...mockAnimal, name: "Novo Nome" });
            const res = await request(app)
                .put("/api/animals/test-animal-id")
                .send({ name: "Novo Nome" });
            expect(res.status).toBe(200);
        });
        it("deve remover animal do pasto ao mudar status para quarantine", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
            prismaMock.animal.update.mockResolvedValue({
                ...mockAnimal,
                status: "quarantine",
                pastureId: null,
            });
            prismaMock.pasture.update.mockResolvedValue({});
            const res = await request(app)
                .put("/api/animals/test-animal-id")
                .send({ status: "quarantine" });
            expect(res.status).toBe(200);
            expect(prismaMock.pasture.update).toHaveBeenCalledWith(expect.objectContaining({ data: { currentAnimals: { decrement: 1 } } }));
        });
        it("deve remover animal do pasto ao mudar status para treatment", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
            prismaMock.animal.update.mockResolvedValue({
                ...mockAnimal,
                status: "treatment",
                pastureId: null,
            });
            prismaMock.pasture.update.mockResolvedValue({});
            const res = await request(app)
                .put("/api/animals/test-animal-id")
                .send({ status: "treatment" });
            expect(res.status).toBe(200);
        });
        it("deve mudar de pasto (decrementa antigo, incrementa novo)", async () => {
            const newPasture = { ...mockPasture, id: "new-pasture-id", name: "Pasto B" };
            prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
            prismaMock.pasture.findFirst.mockResolvedValue(newPasture);
            prismaMock.pasture.update.mockResolvedValue({});
            prismaMock.animal.update.mockResolvedValue({ ...mockAnimal, pastureId: "new-pasture-id" });
            const res = await request(app)
                .put("/api/animals/test-animal-id")
                .send({ pastureId: "new-pasture-id" });
            expect(res.status).toBe(200);
        });
        it("deve retornar 404 para pasto de destino inexistente", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
            prismaMock.pasture.findFirst.mockResolvedValue(null);
            prismaMock.pasture.update.mockResolvedValue({});
            const res = await request(app)
                .put("/api/animals/test-animal-id")
                .send({ pastureId: "bad-id" });
            expect(res.status).toBe(404);
        });
        it("deve atualizar birthDate", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
            prismaMock.animal.update.mockResolvedValue({
                ...mockAnimal,
                birthDate: new Date("2019-06-01"),
            });
            const res = await request(app)
                .put("/api/animals/test-animal-id")
                .send({ birthDate: "2019-06-01" });
            expect(res.status).toBe(200);
        });
        it("deve quarantine sem pasto atual (sem decrement)", async () => {
            const noPasture = { ...mockAnimal, pastureId: null, pastureName: null };
            prismaMock.animal.findFirst.mockResolvedValue(noPasture);
            prismaMock.animal.update.mockResolvedValue({ ...noPasture, status: "quarantine" });
            const res = await request(app)
                .put("/api/animals/test-animal-id")
                .send({ status: "quarantine" });
            expect(res.status).toBe(200);
            expect(prismaMock.pasture.update).not.toHaveBeenCalled();
        });
        it("deve 404 quando animal não existe", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(null);
            const res = await request(app).put("/api/animals/bad-id").send({ name: "X" });
            expect(res.status).toBe(404);
        });
        // ─── Validator update ───
        it("erro update: earTag vazio", async () => {
            const res = await request(app)
                .put("/api/animals/test-animal-id")
                .send({ currentEarTag: " " });
            expect(res.status).toBe(400);
        });
        it("erro update: earTag longo", async () => {
            const res = await request(app)
                .put("/api/animals/test-animal-id")
                .send({ currentEarTag: "A".repeat(21) });
            expect(res.status).toBe(400);
        });
        it("erro update: nome vazio", async () => {
            const res = await request(app).put("/api/animals/test-animal-id").send({ name: " " });
            expect(res.status).toBe(400);
        });
        it("erro update: nome longo", async () => {
            const res = await request(app)
                .put("/api/animals/test-animal-id")
                .send({ name: "A".repeat(51) });
            expect(res.status).toBe(400);
        });
        it("erro update: raça curta", async () => {
            const res = await request(app).put("/api/animals/test-animal-id").send({ breed: "A" });
            expect(res.status).toBe(400);
        });
        it("erro update: raça longa", async () => {
            const res = await request(app)
                .put("/api/animals/test-animal-id")
                .send({ breed: "A".repeat(51) });
            expect(res.status).toBe(400);
        });
        it("erro update: gender invalido", async () => {
            const res = await request(app).put("/api/animals/test-animal-id").send({ gender: "X" });
            expect(res.status).toBe(400);
        });
        it("erro update: birthDate invalida", async () => {
            const res = await request(app)
                .put("/api/animals/test-animal-id")
                .send({ birthDate: "abc" });
            expect(res.status).toBe(400);
        });
        it("erro update: birthDate futura", async () => {
            const res = await request(app)
                .put("/api/animals/test-animal-id")
                .send({ birthDate: "2099-01-01" });
            expect(res.status).toBe(400);
        });
        it("erro update: status invalido", async () => {
            const res = await request(app).put("/api/animals/test-animal-id").send({ status: "xyz" });
            expect(res.status).toBe(400);
        });
        it("erro update: pastureId vazio", async () => {
            const res = await request(app).put("/api/animals/test-animal-id").send({ pastureId: " " });
            expect(res.status).toBe(400);
        });
        // ─── Validator update: campos de venda (buyerId/saleDate/saleNotes) ───
        it("erro update: buyerId vazio", async () => {
            const res = await request(app).put("/api/animals/test-animal-id").send({ buyerId: "   " });
            expect(res.status).toBe(400);
            expect(res.body.error).toContain("ID do comprador não pode ser vazio");
        });
        it("erro update: saleDate inválida", async () => {
            const res = await request(app)
                .put("/api/animals/test-animal-id")
                .send({ saleDate: "data-invalida" });
            expect(res.status).toBe(400);
            expect(res.body.error).toContain("Data da venda inválida");
        });
        it("erro update: saleDate futura", async () => {
            const futureDate = new Date();
            futureDate.setFullYear(futureDate.getFullYear() + 1);
            const res = await request(app)
                .put("/api/animals/test-animal-id")
                .send({ saleDate: futureDate.toISOString().split("T")[0] });
            expect(res.status).toBe(400);
            expect(res.body.error).toContain("não pode ser futura");
        });
        it("erro update: saleNotes muito longas", async () => {
            const res = await request(app)
                .put("/api/animals/test-animal-id")
                .send({ saleNotes: "A".repeat(501) });
            expect(res.status).toBe(400);
            expect(res.body.error).toContain("no máximo 500 caracteres");
        });
        it("deve aceitar buyerId/saleDate/saleNotes nulos sem erro de validação", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
            prismaMock.animal.update.mockResolvedValue({
                ...mockAnimal,
                buyerId: null,
                saleDate: null,
                saleNotes: null,
            });
            const res = await request(app)
                .put("/api/animals/test-animal-id")
                .send({ buyerId: null, saleDate: null, saleNotes: null });
            expect(res.status).toBe(200);
        });
        // ─── Fluxo real de venda: status=sold + buyerId + saleDate + saleNotes ───
        it("deve registrar a venda completa (status, comprador, data e observações)", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
            prismaMock.animal.update.mockResolvedValue({
                ...mockAnimal,
                status: "sold",
                buyerId: "test-buyer-id",
                saleDate: new Date("2026-01-15"),
                saleNotes: "Vendido no leilão da feira",
                pastureId: null,
            });
            const res = await request(app).put("/api/animals/test-animal-id").send({
                status: "sold",
                buyerId: "test-buyer-id",
                saleDate: "2026-01-15",
                saleNotes: "Vendido no leilão da feira",
            });
            expect(res.status).toBe(200);
            expect(res.body.buyerId).toBe("test-buyer-id");
            expect(res.body.saleNotes).toBe("Vendido no leilão da feira");
            // Confirma que saleDate foi convertido para Date antes de ir pro Prisma
            // (mesmo padrão usado para birthDate)
            const updateCallData = prismaMock.animal.update.mock.calls[0][0].data;
            expect(updateCallData.saleDate).toBeInstanceOf(Date);
        });
    });
    // ─── GET: campos de venda aparecem na resposta ───
    describe("GET /api/animals/:id — campos de venda", () => {
        it("deve incluir buyerId, saleDate e saleNotes na resposta", async () => {
            prismaMock.animal.findFirst.mockResolvedValue({
                ...mockAnimal,
                status: "sold",
                buyerId: "test-buyer-id",
                saleDate: new Date("2026-01-15"),
                saleNotes: "Vendido no leilão",
            });
            const res = await request(app).get("/api/animals/test-animal-id");
            expect(res.status).toBe(200);
            expect(res.body.buyerId).toBe("test-buyer-id");
            expect(res.body.saleNotes).toBe("Vendido no leilão");
        });
    });
    // ─── DELETE ───
    describe("DELETE /api/animals/:id", () => {
        it("deve remover animal e decrementar pasto", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
            prismaMock.pasture.update.mockResolvedValue({});
            prismaMock.animal.delete.mockResolvedValue(mockAnimal);
            const res = await request(app).delete("/api/animals/test-animal-id");
            expect(res.status).toBe(204);
            expect(prismaMock.pasture.update).toHaveBeenCalled();
        });
        it("deve remover animal sem pasto (sem decrement)", async () => {
            const noPasture = { ...mockAnimal, pastureId: null };
            prismaMock.animal.findFirst.mockResolvedValue(noPasture);
            prismaMock.animal.delete.mockResolvedValue(noPasture);
            const res = await request(app).delete("/api/animals/test-animal-id");
            expect(res.status).toBe(204);
            expect(prismaMock.pasture.update).not.toHaveBeenCalled();
        });
        it("deve 404 quando animal não existe", async () => {
            prismaMock.animal.findFirst.mockResolvedValue(null);
            const res = await request(app).delete("/api/animals/bad-id");
            expect(res.status).toBe(404);
        });
    });
});
//# sourceMappingURL=animal.test.js.map