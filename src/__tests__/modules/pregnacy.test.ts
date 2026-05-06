import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockAnimal, mockBull } from "../helpers/auth.helper";

const { prismaMock } = vi.hoisted(() => {
   const prismaMock = {
      animal: {
         findFirst: vi.fn(),
         update: vi.fn(),
      },
      pregnancy: {
         findFirst: vi.fn(),
         findMany: vi.fn(),
         create: vi.fn(),
         update: vi.fn(),
         updateMany: vi.fn(),
      },
      attempt: { findFirst: vi.fn(), create: vi.fn(), update: vi.fn(), count: vi.fn() },
      ultrasound: { create: vi.fn() },
      $transaction: vi.fn(),
      $queryRaw: vi.fn(),
   };
   return { prismaMock };
});

vi.mock("@/config/database", () => ({ prisma: prismaMock }));

import app from "@/app";

const mockPregnancy = {
   id: "test-pregnancy-id",
   farmId: "test-farm-id",
   animalId: "test-animal-id",
   currentStatus: "not_started",
   currentStatusDate: new Date(),
   createdAt: new Date(),
   updatedAt: new Date(),
   animal: { currentEarTag: "BR-001", name: "Vaca 001" },
   attempts: [],
};

const mockAttempt = {
   id: "test-attempt-id",
   pregnancyId: "test-pregnancy-id",
   number: 1,
   matingDate: new Date("2025-01-01"),
   matingType: "NATURAL",
   bullId: "test-bull-id",
   semenName: null,
   technician: null,
   estimatedBirthDate: new Date("2025-10-11"), // +283 dias
   attemptStatus: "in_progress",
   notes: null,
   createdAt: new Date(),
   bull: { currentEarTag: "BR-T001" },
   ultrasounds: [],
};

describe("Pregnancy Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      prismaMock.$transaction.mockImplementation(async (cb: any) => cb(prismaMock));
   });

   // ─── CREATE PREGNANCY ───
   describe("POST /api/pregnancies", () => {
      it("deve iniciar prenhez em fêmea ativa", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.pregnancy.findFirst.mockResolvedValue(null);
         prismaMock.pregnancy.create.mockResolvedValue(mockPregnancy);

         const res = await request(app).post("/api/pregnancies").send({ animalId: "test-animal-id" });
         expect(res.status).toBe(201);
         expect(res.body.currentStatus).toBe("not_started");
      });

      it("deve 404 para animal inexistente", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(null);
         const res = await request(app).post("/api/pregnancies").send({ animalId: "bad-id" });
         expect(res.status).toBe(404);
      });

      it("deve recusar prenhez em macho", async () => {
         prismaMock.animal.findFirst.mockResolvedValue({ ...mockAnimal, gender: "M" });
         const res = await request(app).post("/api/pregnancies").send({ animalId: "test-animal-id" });
         expect(res.status).toBe(400);
      });

      it("deve recusar prenhez em animal inativo", async () => {
         prismaMock.animal.findFirst.mockResolvedValue({ ...mockAnimal, status: "dead" });
         const res = await request(app).post("/api/pregnancies").send({ animalId: "test-animal-id" });
         expect(res.status).toBe(400);
      });

      it("deve recusar se já houver prenhez em andamento", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.pregnancy.findFirst.mockResolvedValue({ ...mockPregnancy, currentStatus: "pregnant" });
         const res = await request(app).post("/api/pregnancies").send({ animalId: "test-animal-id" });
         expect(res.status).toBe(409);
      });

      it("erro validator: animalId vazio", async () => {
         const res = await request(app).post("/api/pregnancies").send({ animalId: "" });
         expect(res.status).toBe(500);
      });
   });

   // ─── REGISTER ATTEMPT ───
   describe("POST /api/pregnancies/:id/attempts", () => {
      const validAttempt = {
         matingDate: "2025-01-01",
         matingType: "NATURAL",
         bullId: "test-bull-id",
      };

      it("deve registrar cobertura natural", async () => {
         prismaMock.pregnancy.findFirst.mockResolvedValue(mockPregnancy);
         prismaMock.attempt.findFirst.mockResolvedValue(null);
         prismaMock.animal.findFirst.mockResolvedValue(mockBull);
         prismaMock.attempt.count.mockResolvedValue(0);
         prismaMock.attempt.create.mockResolvedValue(mockAttempt);
         prismaMock.pregnancy.update.mockResolvedValue({ ...mockPregnancy, currentStatus: "in_progress" });
         prismaMock.animal.update.mockResolvedValue(mockAnimal);

         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/attempts").send(validAttempt);
         expect(res.status).toBe(201);
      });

      it("deve registrar IA", async () => {
         prismaMock.pregnancy.findFirst.mockResolvedValue(mockPregnancy);
         prismaMock.attempt.findFirst.mockResolvedValue(null);
         prismaMock.attempt.count.mockResolvedValue(0);
         prismaMock.attempt.create.mockResolvedValue({ ...mockAttempt, matingType: "AI", semenName: "Touro X" });
         prismaMock.pregnancy.update.mockResolvedValue({ ...mockPregnancy, currentStatus: "in_progress" });
         prismaMock.animal.update.mockResolvedValue(mockAnimal);

         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/attempts").send({
            matingDate: "2025-01-01",
            matingType: "AI",
            semenName: "Touro X",
         });
         expect(res.status).toBe(201);
      });

      it("deve recusar se já está prenha", async () => {
         prismaMock.pregnancy.findFirst.mockResolvedValue({ ...mockPregnancy, currentStatus: "pregnant" });
         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/attempts").send(validAttempt);
         expect(res.status).toBe(400);
      });

      it("deve recusar se já existe tentativa em andamento", async () => {
         prismaMock.pregnancy.findFirst.mockResolvedValue(mockPregnancy);
         prismaMock.attempt.findFirst.mockResolvedValue(mockAttempt);
         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/attempts").send(validAttempt);
         expect(res.status).toBe(400);
      });

      it("deve 404 para touro inexistente na MONTA", async () => {
         prismaMock.pregnancy.findFirst.mockResolvedValue(mockPregnancy);
         prismaMock.attempt.findFirst.mockResolvedValue(null);
         prismaMock.animal.findFirst.mockResolvedValue(null);
         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/attempts").send(validAttempt);
         expect(res.status).toBe(404);
      });

      // Validator attempt
      it("erro: matingDate ausente", async () => {
         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/attempts").send({ ...validAttempt, matingDate: undefined });
         expect(res.status).toBe(500);
      });

      it("erro: matingDate futura", async () => {
         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/attempts").send({ ...validAttempt, matingDate: "2099-01-01" });
         expect(res.status).toBe(500);
      });

      it("erro: matingType inválido", async () => {
         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/attempts").send({ ...validAttempt, matingType: "xxx" });
         expect(res.status).toBe(500);
      });

      it("erro: falta bullId para NATURAL", async () => {
         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/attempts").send({ ...validAttempt, bullId: undefined });
         expect(res.status).toBe(500);
      });

      it("erro: falta semenName para AI", async () => {
         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/attempts").send({ matingDate: "2025-01-01", matingType: "AI" });
         expect(res.status).toBe(500);
      });

      it("erro: notes longo", async () => {
         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/attempts").send({ ...validAttempt, notes: "A".repeat(501) });
         expect(res.status).toBe(500);
      });
   });

   // ─── REGISTER ULTRASOUND ───
   describe("POST /api/pregnancies/:id/ultrasounds", () => {
      const validUs = { days: 30, result: "PREGNANT", ultrasoundDate: "2025-02-01" };

      it("deve registrar PREGNANT e atualizar status", async () => {
         prismaMock.pregnancy.findFirst.mockResolvedValue({ ...mockPregnancy, currentStatus: "in_progress" });
         prismaMock.attempt.findFirst.mockResolvedValue({ ...mockAttempt, ultrasounds: [] });
         prismaMock.ultrasound.create.mockResolvedValue({ id: "us-id" });
         prismaMock.pregnancy.update.mockResolvedValue({ ...mockPregnancy, currentStatus: "pregnant" });

         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/ultrasounds").send(validUs);
         expect(res.status).toBe(201);
         expect(prismaMock.pregnancy.update).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ currentStatus: "pregnant" }) }));
      });

      it("deve registrar VIABLE e atualizar attempt para success", async () => {
         prismaMock.pregnancy.findFirst.mockResolvedValue({ ...mockPregnancy, currentStatus: "pregnant" });
         prismaMock.attempt.findFirst.mockResolvedValue({ ...mockAttempt, ultrasounds: [] });
         prismaMock.ultrasound.create.mockResolvedValue({ id: "us-id" });
         prismaMock.attempt.update.mockResolvedValue({});
         prismaMock.pregnancy.update.mockResolvedValue({});

         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/ultrasounds").send({ ...validUs, result: "VIABLE", days: 260 });
         expect(res.status).toBe(201);
         expect(prismaMock.attempt.update).toHaveBeenCalledWith(expect.objectContaining({ data: { attemptStatus: "success" } }));
      });

      it("deve registrar EMPTY e encerrar tentativa/prenhez dependendo do período", async () => {
         prismaMock.pregnancy.findFirst.mockResolvedValue({ ...mockPregnancy, currentStatus: "in_progress" });
         // Data de cobertura antiga (fora do período fértil)
         prismaMock.attempt.findFirst.mockResolvedValue({ ...mockAttempt, matingDate: new Date("2024-01-01"), ultrasounds: [] });
         prismaMock.ultrasound.create.mockResolvedValue({ id: "us-id" });
         prismaMock.attempt.update.mockResolvedValue({});
         prismaMock.pregnancy.update.mockResolvedValue({});

         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/ultrasounds").send({ ...validUs, result: "EMPTY" });
         expect(res.status).toBe(201);
         expect(prismaMock.pregnancy.update).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ currentStatus: "failed" }) }));
      });

      it("deve 400 sem cobertura em andamento", async () => {
         prismaMock.pregnancy.findFirst.mockResolvedValue(mockPregnancy);
         prismaMock.attempt.findFirst.mockResolvedValue(null);
         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/ultrasounds").send(validUs);
         expect(res.status).toBe(400);
      });

      it("deve recusar ultrassom duplicado de dias", async () => {
         prismaMock.pregnancy.findFirst.mockResolvedValue(mockPregnancy);
         prismaMock.attempt.findFirst.mockResolvedValue({ ...mockAttempt, ultrasounds: [{ days: 30 }] });
         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/ultrasounds").send(validUs);
         expect(res.status).toBe(409);
      });

      // Validator ultrasound
      it("erro: days inválido", async () => {
         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/ultrasounds").send({ ...validUs, days: 99 });
         expect(res.status).toBe(500);
      });

      it("erro: result inválido", async () => {
         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/ultrasounds").send({ ...validUs, result: "xxx" });
         expect(res.status).toBe(500);
      });

      it("erro: ultrasoundDate ausente", async () => {
         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/ultrasounds").send({ ...validUs, ultrasoundDate: undefined });
         expect(res.status).toBe(500);
      });

      it("erro: ultrasoundDate futura", async () => {
         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/ultrasounds").send({ ...validUs, ultrasoundDate: "2099-01-01" });
         expect(res.status).toBe(500);
      });

      it("erro: notes longo", async () => {
         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/ultrasounds").send({ ...validUs, notes: "A".repeat(501) });
         expect(res.status).toBe(500);
      });
   });

   // ─── LIST AND GET ───
   describe("GET /api/pregnancies", () => {
      it("deve listar prenhezes", async () => {
         prismaMock.pregnancy.findMany.mockResolvedValue([mockPregnancy]);
         const res = await request(app).get("/api/pregnancies");
         expect(res.status).toBe(200);
      });

      it("deve filtrar por animalId", async () => {
         prismaMock.pregnancy.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/pregnancies?animalId=test-animal-id");
         expect(res.status).toBe(200);
      });

      it("deve filtrar por status", async () => {
         prismaMock.pregnancy.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/pregnancies?status=pregnant");
         expect(res.status).toBe(200);
      });
   });

   describe("GET /api/pregnancies/:id", () => {
      it("deve retornar prenhez por ID", async () => {
         prismaMock.pregnancy.findFirst.mockResolvedValue(mockPregnancy);
         const res = await request(app).get("/api/pregnancies/test-pregnancy-id");
         expect(res.status).toBe(200);
      });

      it("deve 404", async () => {
         prismaMock.pregnancy.findFirst.mockResolvedValue(null);
         const res = await request(app).get("/api/pregnancies/bad-id");
         expect(res.status).toBe(404);
      });
   });

   describe("GET /api/pregnancies/animal/:animalId", () => {
      it("deve listar histórico do animal", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.pregnancy.findMany.mockResolvedValue([mockPregnancy]);
         const res = await request(app).get("/api/pregnancies/animal/test-animal-id");
         expect(res.status).toBe(200);
      });

      it("deve 404 para animal inexistente", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(null);
         const res = await request(app).get("/api/pregnancies/animal/bad-id");
         expect(res.status).toBe(404);
      });
   });
});
