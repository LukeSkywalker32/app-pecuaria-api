import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { mockAnimal } from "../helpers/auth.helper";

const { prismaMock } = vi.hoisted(() => {
   const prismaMock = {
      animal: { findFirst: vi.fn() },
      estrus: { findFirst: vi.fn(), findMany: vi.fn(), create: vi.fn(), update: vi.fn() },
      $transaction: vi.fn(),
      $queryRaw: vi.fn(),
   };
   return { prismaMock };
});

vi.mock("@/config/database", () => ({ prisma: prismaMock }));
import app from "@/app";

const mockEstrus = {
   id: "test-estrus-id",
   farmId: "test-farm-id",
   animalId: "test-animal-id",
   date: new Date("2025-01-10"),
   intensity: "normal",
   nextEstrus: new Date("2025-01-31"),
   notes: null,
   detectedById: "test-user-id",
   createdAt: new Date(),
   updatedAt: new Date(),
   animal: { currentEarTag: "BR-001", name: "Vaca 001" },
   detectedBy: { fullName: "Admin Teste" },
};

describe("Estrus Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
   });

   // ─── CREATE ───
   describe("POST /api/estrus", () => {
      const validPayload = { animalId: "test-animal-id", date: "2025-01-10", intensity: "normal" };

      it("deve registrar CIO em fêmea ativa", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.estrus.create.mockResolvedValue(mockEstrus);
         const res = await request(app).post("/api/estrus").send(validPayload);
         expect(res.status).toBe(201);
      });

      it("deve recusar CIO em macho", async () => {
         prismaMock.animal.findFirst.mockResolvedValue({ ...mockAnimal, gender: "M" });
         const res = await request(app).post("/api/estrus").send(validPayload);
         expect(res.status).toBe(400);
      });

      it("deve recusar CIO em animal inativo", async () => {
         prismaMock.animal.findFirst.mockResolvedValue({ ...mockAnimal, status: "quarantine" });
         const res = await request(app).post("/api/estrus").send(validPayload);
         expect(res.status).toBe(400);
      });

      it("deve 404 para animal inexistente", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(null);
         const res = await request(app).post("/api/estrus").send(validPayload);
         expect(res.status).toBe(404);
      });

      // Validator
      it("erro: animalId vazio", async () => {
         const res = await request(app).post("/api/estrus").send({ ...validPayload, animalId: "" });
         expect(res.status).toBe(500);
      });

      it("erro: data ausente", async () => {
         const res = await request(app).post("/api/estrus").send({ ...validPayload, date: undefined });
         expect(res.status).toBe(500);
      });

      it("erro: data inválida", async () => {
         const res = await request(app).post("/api/estrus").send({ ...validPayload, date: "not-a-date" });
         expect(res.status).toBe(500);
      });

      it("erro: data futura", async () => {
         const res = await request(app).post("/api/estrus").send({ ...validPayload, date: "2099-01-01" });
         expect(res.status).toBe(500);
      });

      it("erro: intensidade inválida", async () => {
         const res = await request(app).post("/api/estrus").send({ ...validPayload, intensity: "extreme" });
         expect(res.status).toBe(500);
      });

      it("erro: notas longas", async () => {
         const res = await request(app).post("/api/estrus").send({ ...validPayload, notes: "A".repeat(501) });
         expect(res.status).toBe(500);
      });
   });

   // ─── LIST ───
   describe("GET /api/estrus", () => {
      it("deve listar CIOs", async () => {
         prismaMock.estrus.findMany.mockResolvedValue([mockEstrus]);
         const res = await request(app).get("/api/estrus");
         expect(res.status).toBe(200);
      });

      it("deve listar com filtro intensity", async () => {
         prismaMock.estrus.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/estrus?intensity=normal");
         expect(res.status).toBe(200);
      });

      it("deve listar com filtro animalId", async () => {
         prismaMock.estrus.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/estrus?animalId=test-animal-id");
         expect(res.status).toBe(200);
      });

      it("deve listar com filtro de datas", async () => {
         prismaMock.estrus.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/estrus?dateFrom=2025-01-01&dateTo=2025-12-31");
         expect(res.status).toBe(200);
      });

      it("deve listar upcoming", async () => {
         prismaMock.estrus.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/estrus?upcoming=true");
         expect(res.status).toBe(200);
      });
   });

   // ─── GET BY ID ───
   describe("GET /api/estrus/:id", () => {
      it("deve retornar CIO por ID", async () => {
         prismaMock.estrus.findFirst.mockResolvedValue(mockEstrus);
         const res = await request(app).get("/api/estrus/test-estrus-id");
         expect(res.status).toBe(200);
      });

      it("deve 404", async () => {
         prismaMock.estrus.findFirst.mockResolvedValue(null);
         const res = await request(app).get("/api/estrus/bad-id");
         expect(res.status).toBe(404);
      });
   });

   // ─── LIST BY ANIMAL ───
   describe("GET /api/estrus/animal/:animalId", () => {
      it("deve retornar histórico", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.estrus.findMany.mockResolvedValue([mockEstrus]);
         const res = await request(app).get("/api/estrus/animal/test-animal-id");
         expect(res.status).toBe(200);
      });

      it("deve 404 para animal inexistente", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(null);
         const res = await request(app).get("/api/estrus/animal/bad-id");
         expect(res.status).toBe(404);
      });
   });

   // ─── UPDATE ───
   describe("PUT /api/estrus/:id", () => {
      it("deve atualizar data e recalcular nextEstrus", async () => {
         prismaMock.estrus.findFirst.mockResolvedValue(mockEstrus);
         prismaMock.estrus.update.mockResolvedValue({
            ...mockEstrus,
            date: new Date("2025-02-01"),
            nextEstrus: new Date("2025-02-22"),
         });
         const res = await request(app).put("/api/estrus/test-estrus-id").send({ date: "2025-02-01" });
         expect(res.status).toBe(200);
      });

      it("deve atualizar intensity", async () => {
         prismaMock.estrus.findFirst.mockResolvedValue(mockEstrus);
         prismaMock.estrus.update.mockResolvedValue({ ...mockEstrus, intensity: "strong" });
         const res = await request(app).put("/api/estrus/test-estrus-id").send({ intensity: "strong" });
         expect(res.status).toBe(200);
      });

      it("deve atualizar notas para null", async () => {
         prismaMock.estrus.findFirst.mockResolvedValue(mockEstrus);
         prismaMock.estrus.update.mockResolvedValue({ ...mockEstrus, notes: null });
         const res = await request(app).put("/api/estrus/test-estrus-id").send({ notes: null });
         expect(res.status).toBe(200);
      });

      // Validator update
      it("erro update: data inválida", async () => {
         prismaMock.estrus.findFirst.mockResolvedValue(mockEstrus);
         const res = await request(app).put("/api/estrus/test-estrus-id").send({ date: "abc" });
         expect(res.status).toBe(500);
      });

      it("erro update: data futura", async () => {
         prismaMock.estrus.findFirst.mockResolvedValue(mockEstrus);
         const res = await request(app).put("/api/estrus/test-estrus-id").send({ date: "2099-01-01" });
         expect(res.status).toBe(500);
      });

      it("erro update: intensidade inválida", async () => {
         prismaMock.estrus.findFirst.mockResolvedValue(mockEstrus);
         const res = await request(app).put("/api/estrus/test-estrus-id").send({ intensity: "xxx" });
         expect(res.status).toBe(500);
      });

      it("erro update: notas longas", async () => {
         prismaMock.estrus.findFirst.mockResolvedValue(mockEstrus);
         const res = await request(app).put("/api/estrus/test-estrus-id").send({ notes: "A".repeat(501) });
         expect(res.status).toBe(500);
      });
   });

   // ─── UPCOMING ───
   describe("GET /api/estrus/upcoming", () => {
      it("deve retornar CIOs próximos", async () => {
         prismaMock.estrus.findMany.mockResolvedValue([mockEstrus]);
         const res = await request(app).get("/api/estrus/upcoming");
         expect(res.status).toBe(200);
      });

      it("deve aceitar parâmetro dias", async () => {
         prismaMock.estrus.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/estrus/upcoming?dias=14");
         expect(res.status).toBe(200);
      });
   });
});
