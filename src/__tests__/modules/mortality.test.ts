import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockAnimal } from "../helpers/auth.helper";

const { prismaMock } = vi.hoisted(() => {
   const prismaMock = {
      animal: { findFirst: vi.fn(), update: vi.fn() },
      pasture: { update: vi.fn() },
      pregnancy: { updateMany: vi.fn() },
      mortality: { findFirst: vi.fn(), findMany: vi.fn(), create: vi.fn(), update: vi.fn() },
      birth: { findFirst: vi.fn() },
      $transaction: vi.fn(),
      $queryRaw: vi.fn(),
   };
   return { prismaMock };
});

vi.mock("@/config/database", () => ({ prisma: prismaMock }));

import app from "@/app";

const mockMortality = {
   id: "test-mortality-id",
   farmId: "test-farm-id",
   animalId: "test-animal-id",
   birthId: null,
   deathDate: new Date("2025-03-15"),
   deathTime: "14:30",
   deathLocation: "Pasto A",
   causeOfDeath: "Intoxicação por planta",
   severity: "severe",
   necropsy: false,
   disposal: null,
   photos: [],
   origin: null,
   notes: null,
   registeredById: "test-user-id",
   createdAt: new Date(),
   updatedAt: new Date(),
   animal: { currentEarTag: "BR-001", name: "Vaca 001" },
   registeredBy: { fullName: "Admin Teste" },
};

const validCreate = {
   animalId: "test-animal-id",
   deathDate: "2025-03-15",
   deathTime: "14:30",
   deathLocation: "Pasto A",
   causeOfDeath: "Intoxicação por planta",
   severity: "severe",
};

describe("Mortality Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      prismaMock.$transaction.mockImplementation(async (cb: any) => cb(prismaMock));
   });

   // ─── CREATE ───
   describe("POST /api/mortalities", () => {
      it("deve registrar morte e atualizar status do animal", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.mortality.create.mockResolvedValue(mockMortality);
         prismaMock.animal.update.mockResolvedValue({ ...mockAnimal, status: "dead" });
         prismaMock.pasture.update.mockResolvedValue({});
         prismaMock.pregnancy.updateMany.mockResolvedValue({ count: 0 });

         const res = await request(app).post("/api/mortalities").send(validCreate);
         expect(res.status).toBe(201);
         expect(prismaMock.animal.update).toHaveBeenCalledWith(
            expect.objectContaining({ data: expect.objectContaining({ status: "dead" }) }),
         );
      });

      it("deve decrementar pasto quando animal tem pasto", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.mortality.create.mockResolvedValue(mockMortality);
         prismaMock.animal.update.mockResolvedValue(mockAnimal);
         prismaMock.pasture.update.mockResolvedValue({});
         prismaMock.pregnancy.updateMany.mockResolvedValue({ count: 0 });

         await request(app).post("/api/mortalities").send(validCreate);
         expect(prismaMock.pasture.update).toHaveBeenCalled();
      });

      it("deve não decrementar pasto quando animal não tem pasto", async () => {
         const noPasture = { ...mockAnimal, pastureId: null };
         prismaMock.animal.findFirst.mockResolvedValue(noPasture);
         prismaMock.mortality.create.mockResolvedValue(mockMortality);
         prismaMock.animal.update.mockResolvedValue(noPasture);
         prismaMock.pregnancy.updateMany.mockResolvedValue({ count: 0 });

         await request(app).post("/api/mortalities").send(validCreate);
         expect(prismaMock.pasture.update).not.toHaveBeenCalled();
      });

      it("deve suportar birthId (natimorto)", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.birth.findFirst.mockResolvedValue({ id: "birth-id" });
         prismaMock.mortality.create.mockResolvedValue({ ...mockMortality, birthId: "birth-id", origin: "natimorto" });
         prismaMock.animal.update.mockResolvedValue(mockAnimal);
         prismaMock.pasture.update.mockResolvedValue({});
         prismaMock.pregnancy.updateMany.mockResolvedValue({ count: 0 });

         const res = await request(app).post("/api/mortalities").send({ ...validCreate, birthId: "birth-id" });
         expect(res.status).toBe(201);
      });

      it("deve 404 para birthId inexistente", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.birth.findFirst.mockResolvedValue(null);
         const res = await request(app).post("/api/mortalities").send({ ...validCreate, birthId: "bad-birth" });
         expect(res.status).toBe(404);
      });

      it("deve 409 para animal já morto", async () => {
         prismaMock.animal.findFirst.mockResolvedValue({ ...mockAnimal, status: "dead" });
         const res = await request(app).post("/api/mortalities").send(validCreate);
         expect(res.status).toBe(409);
      });

      it("deve 400 para animal vendido", async () => {
         prismaMock.animal.findFirst.mockResolvedValue({ ...mockAnimal, status: "sold" });
         const res = await request(app).post("/api/mortalities").send(validCreate);
         expect(res.status).toBe(400);
      });

      it("deve 404 para animal inexistente", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(null);
         const res = await request(app).post("/api/mortalities").send(validCreate);
         expect(res.status).toBe(404);
      });

      // Validator create
      it("erro: animalId vazio", async () => {
         const res = await request(app).post("/api/mortalities").send({ ...validCreate, animalId: "" });
         expect(res.status).toBe(500);
      });

      it("erro: deathDate ausente", async () => {
         const res = await request(app).post("/api/mortalities").send({ ...validCreate, deathDate: undefined });
         expect(res.status).toBe(500);
      });

      it("erro: deathDate futura", async () => {
         const res = await request(app).post("/api/mortalities").send({ ...validCreate, deathDate: "2099-01-01" });
         expect(res.status).toBe(500);
      });

      it("erro: deathTime formato inválido", async () => {
         const res = await request(app).post("/api/mortalities").send({ ...validCreate, deathTime: "1430" });
         expect(res.status).toBe(500);
      });

      it("erro: deathLocation curto", async () => {
         const res = await request(app).post("/api/mortalities").send({ ...validCreate, deathLocation: "A" });
         expect(res.status).toBe(500);
      });

      it("erro: deathLocation longo", async () => {
         const res = await request(app).post("/api/mortalities").send({ ...validCreate, deathLocation: "A".repeat(51) });
         expect(res.status).toBe(500);
      });

      it("erro: causeOfDeath curto", async () => {
         const res = await request(app).post("/api/mortalities").send({ ...validCreate, causeOfDeath: "AB" });
         expect(res.status).toBe(500);
      });

      it("erro: causeOfDeath longo", async () => {
         const res = await request(app).post("/api/mortalities").send({ ...validCreate, causeOfDeath: "A".repeat(51) });
         expect(res.status).toBe(500);
      });

      it("erro: severity inválida", async () => {
         const res = await request(app).post("/api/mortalities").send({ ...validCreate, severity: "extreme" });
         expect(res.status).toBe(500);
      });

      it("erro: disposal longo", async () => {
         const res = await request(app).post("/api/mortalities").send({ ...validCreate, disposal: "A".repeat(201) });
         expect(res.status).toBe(500);
      });

      it("erro: photos não é array", async () => {
         const res = await request(app).post("/api/mortalities").send({ ...validCreate, photos: "photo.jpg" });
         expect(res.status).toBe(500);
      });

      it("erro: photos excede 10", async () => {
         const res = await request(app).post("/api/mortalities").send({ ...validCreate, photos: Array(11).fill("url") });
         expect(res.status).toBe(500);
      });

      it("erro: notes longo", async () => {
         const res = await request(app).post("/api/mortalities").send({ ...validCreate, notes: "A".repeat(501) });
         expect(res.status).toBe(500);
      });
   });

   // ─── LIST ───
   describe("GET /api/mortalities", () => {
      it("deve listar mortalidades", async () => {
         prismaMock.mortality.findMany.mockResolvedValue([mockMortality]);
         const res = await request(app).get("/api/mortalities");
         expect(res.status).toBe(200);
      });

      it("deve filtrar por severity", async () => {
         prismaMock.mortality.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/mortalities?severity=severe");
         expect(res.status).toBe(200);
      });

      it("deve filtrar por datas", async () => {
         prismaMock.mortality.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/mortalities?dateFrom=2025-01-01&dateTo=2025-12-31");
         expect(res.status).toBe(200);
      });

      it("deve filtrar por necropsy", async () => {
         prismaMock.mortality.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/mortalities?necropsy=true");
         expect(res.status).toBe(200);
      });
   });

   // ─── GET BY ID ───
   describe("GET /api/mortalities/:id", () => {
      it("deve retornar por ID", async () => {
         prismaMock.mortality.findFirst.mockResolvedValue(mockMortality);
         const res = await request(app).get("/api/mortalities/test-mortality-id");
         expect(res.status).toBe(200);
      });

      it("deve 404", async () => {
         prismaMock.mortality.findFirst.mockResolvedValue(null);
         const res = await request(app).get("/api/mortalities/bad-id");
         expect(res.status).toBe(404);
      });
   });

   // ─── LIST BY ANIMAL ───
   describe("GET /api/mortalities/animal/:animalId", () => {
      it("deve retornar histórico", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.mortality.findMany.mockResolvedValue([mockMortality]);
         const res = await request(app).get("/api/mortalities/animal/test-animal-id");
         expect(res.status).toBe(200);
      });

      it("deve 404 para animal inexistente", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(null);
         const res = await request(app).get("/api/mortalities/animal/bad-id");
         expect(res.status).toBe(404);
      });
   });

   // ─── UPDATE ───
   describe("PUT /api/mortalities/:id", () => {
      it("deve atualizar registro", async () => {
         prismaMock.mortality.findFirst.mockResolvedValue(mockMortality);
         prismaMock.mortality.update.mockResolvedValue({ ...mockMortality, necropsy: true });
         const res = await request(app).put("/api/mortalities/test-mortality-id").send({ necropsy: true, disposal: "Enterrado" });
         expect(res.status).toBe(200);
         expect(prismaMock.animal.update).not.toHaveBeenCalled();
      });

      it("deve atualizar múltiplos campos", async () => {
         prismaMock.mortality.findFirst.mockResolvedValue(mockMortality);
         prismaMock.mortality.update.mockResolvedValue(mockMortality);
         const res = await request(app).put("/api/mortalities/test-mortality-id").send({
            deathDate: "2025-03-16",
            deathTime: "10:00",
            deathLocation: "Pasto B",
            causeOfDeath: "Nova causa",
            severity: "mild",
            notes: "Observações",
         });
         expect(res.status).toBe(200);
      });

      // Validator update
      it("erro update: deathDate futura", async () => {
         prismaMock.mortality.findFirst.mockResolvedValue(mockMortality);
         const res = await request(app).put("/api/mortalities/test-mortality-id").send({ deathDate: "2099-01-01" });
         expect(res.status).toBe(500);
      });

      it("erro update: deathTime inválido", async () => {
         prismaMock.mortality.findFirst.mockResolvedValue(mockMortality);
         const res = await request(app).put("/api/mortalities/test-mortality-id").send({ deathTime: "abc" });
         expect(res.status).toBe(500);
      });

      it("erro update: causeOfDeath curto", async () => {
         prismaMock.mortality.findFirst.mockResolvedValue(mockMortality);
         const res = await request(app).put("/api/mortalities/test-mortality-id").send({ causeOfDeath: "AB" });
         expect(res.status).toBe(500);
      });

      it("erro update: severity inválida", async () => {
         prismaMock.mortality.findFirst.mockResolvedValue(mockMortality);
         const res = await request(app).put("/api/mortalities/test-mortality-id").send({ severity: "xxx" });
         expect(res.status).toBe(500);
      });
   });

   // ─── ADD PHOTOS ───
   describe("PATCH /api/mortalities/:id/photos", () => {
      it("deve adicionar fotos", async () => {
         prismaMock.mortality.findFirst.mockResolvedValue(mockMortality);
         prismaMock.mortality.update.mockResolvedValue({ ...mockMortality, photos: ["url1"] });
         const res = await request(app).patch("/api/mortalities/test-mortality-id/photos").send({ photoUrls: ["url1"] });
         expect(res.status).toBe(200);
      });

      it("deve 400 para array vazio", async () => {
         const res = await request(app).patch("/api/mortalities/test-mortality-id/photos").send({ photoUrls: [] });
         expect(res.status).toBe(400);
      });

      it("deve 400 para photoUrls não-array", async () => {
         const res = await request(app).patch("/api/mortalities/test-mortality-id/photos").send({ photoUrls: "not-array" });
         expect(res.status).toBe(400);
      });

      it("deve 400 quando excede limite de 10 fotos", async () => {
         prismaMock.mortality.findFirst.mockResolvedValue({ ...mockMortality, photos: Array(9).fill("url") });
         const res = await request(app).patch("/api/mortalities/test-mortality-id/photos").send({ photoUrls: ["a", "b"] });
         expect(res.status).toBe(400);
      });
   });
});
