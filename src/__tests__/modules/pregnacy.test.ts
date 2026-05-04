import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockAnimal, mockBull } from "../helpers/auth.helper";

const { prismaMock } = vi.hoisted(() => {
   const prismaMock = {
      animal: { findFirst: vi.fn() },
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

   describe("POST /api/pregnancies", () => {
      it("deve iniciar prenhez em fêmea ativa", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal); // fêmea ativa
         prismaMock.pregnancy.findFirst.mockResolvedValue(null); // sem prenhez em andamento
         prismaMock.pregnancy.create.mockResolvedValue(mockPregnancy);

         const res = await request(app)
            .post("/api/pregnancies")
            .send({ animalId: "test-animal-id" });

         expect(res.status).toBe(201);
         expect(res.body.currentStatus).toBe("not_started");
      });

      it("deve recusar prenhez em macho", async () => {
         prismaMock.animal.findFirst.mockResolvedValue({ ...mockAnimal, gender: "M" });

         const res = await request(app)
            .post("/api/pregnancies")
            .send({ animalId: "test-animal-id" });

         expect(res.status).toBe(400);
         expect(res.body.error).toContain("fêmeas");
      });

      it("deve recusar se já houver prenhez em andamento", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.pregnancy.findFirst.mockResolvedValue({
            ...mockPregnancy,
            currentStatus: "pregnant",
         });

         const res = await request(app)
            .post("/api/pregnancies")
            .send({ animalId: "test-animal-id" });

         expect(res.status).toBe(409);
      });
   });

   describe("POST /api/pregnancies/:id/attempts", () => {
      it("deve registrar cobertura natural", async () => {
         // getById retorna a prenhez
         prismaMock.pregnancy.findFirst.mockResolvedValue(mockPregnancy);
         // Não há tentativa em andamento
         prismaMock.attempt.findFirst.mockResolvedValue(null);
         // Touro existe na fazenda
         prismaMock.animal.findFirst.mockResolvedValue(mockBull);
         prismaMock.attempt.count.mockResolvedValue(0);
         prismaMock.attempt.create.mockResolvedValue(mockAttempt);
         prismaMock.pregnancy.update.mockResolvedValue({
            ...mockPregnancy,
            currentStatus: "in_progress",
         });
         prismaMock.animal.update.mockResolvedValue(mockAnimal); // mock update animal findFirst inside transaction

         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/attempts").send({
            matingDate: "2025-01-01",
            matingType: "NATURAL",
            bullId: "test-bull-id",
         });

         expect(res.status).toBe(201);
      });

      it("deve recusar nova cobertura se animal já está prenha", async () => {
         prismaMock.pregnancy.findFirst.mockResolvedValue({
            ...mockPregnancy,
            currentStatus: "pregnant",
         });

         const res = await request(app).post("/api/pregnancies/test-pregnancy-id/attempts").send({
            matingDate: "2025-01-01",
            matingType: "NATURAL",
            bullId: "test-bull-id",
         });

         expect(res.status).toBe(400);
         expect(res.body.error).toContain("já está prenha");
      });
   });

   describe("POST /api/pregnancies/:id/ultrasounds", () => {
      it("deve registrar ultrassom PREGNANT e atualizar status", async () => {
         prismaMock.pregnancy.findFirst.mockResolvedValue({
            ...mockPregnancy,
            currentStatus: "in_progress",
         });
         prismaMock.attempt.findFirst.mockResolvedValue({
            ...mockAttempt,
            ultrasounds: [],
         });
         prismaMock.ultrasound.create.mockResolvedValue({
            id: "us-id",
            days: 30,
            result: "PREGNANT",
         });
         prismaMock.pregnancy.update.mockResolvedValue({
            ...mockPregnancy,
            currentStatus: "pregnant",
         });

         const res = await request(app)
            .post("/api/pregnancies/test-pregnancy-id/ultrasounds")
            .send({
               days: 30,
               result: "PREGNANT",
               ultrasoundDate: "2025-02-01",
            });

         expect(res.status).toBe(201);
         // Verifica que a prenhez foi atualizada para pregnant
         expect(prismaMock.pregnancy.update).toHaveBeenCalledWith(
            expect.objectContaining({
               data: expect.objectContaining({ currentStatus: "pregnant" }),
            }),
         );
      });

      it("deve recusar ultrassom duplicado", async () => {
         prismaMock.pregnancy.findFirst.mockResolvedValue(mockPregnancy);
         prismaMock.attempt.findFirst.mockResolvedValue({
            ...mockAttempt,
            // já existe ultrassom de 30 dias
            ultrasounds: [{ id: "us-1", days: 30, result: "PREGNANT" }],
         });

         const res = await request(app)
            .post("/api/pregnancies/test-pregnancy-id/ultrasounds")
            .send({ days: 30, result: "PREGNANT", ultrasoundDate: "2025-02-01" });

         expect(res.status).toBe(409);
         expect(res.body.error).toContain("30 dias já registrado");
      });
   });
});
