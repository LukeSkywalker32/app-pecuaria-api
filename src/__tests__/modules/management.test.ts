import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockAnimal, mockPasture } from "../helpers/auth.helper";

const { prismaMock } = vi.hoisted(() => ({
   prismaMock: {
      animal: { findFirst: vi.fn(), findMany: vi.fn(), update: vi.fn() },
      pasture: { findFirst: vi.fn(), update: vi.fn() },
      management: { create: vi.fn(), findMany: vi.fn() },
      $transaction: vi.fn(),
      $queryRaw: vi.fn(),
   },
}));

vi.mock("@/config/database", () => ({ prisma: prismaMock }));

import app from "@/app";

const mockMgmt = {
   id: "mgmt-id",
   farmId: "test-farm-id",
   animalId: "test-animal-id",
   originPasture: "Pasto A",
   destinationPasture: "Pasto B",
   movementDate: new Date(),
   reason: "Superlotação",
   employee: "João",
   batchId: null,
   batchTotal: null,
   createdAt: new Date(),
};

const destPasture = { ...mockPasture, id: "pasto-b-id", name: "Pasto B" };

describe("Management Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      prismaMock.$transaction.mockImplementation(async (cb: any) => cb(prismaMock));
   });

   // ─── MOVE ───
   describe("POST /api/management/move", () => {
      const validMove = {
         animalId: "test-animal-id",
         destinationPastureId: "pasto-b-id",
         reason: "Superlotação",
         employee: "João",
      };

      it("deve mover animal entre pastos", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.pasture.findFirst.mockResolvedValue(destPasture);
         prismaMock.management.create.mockResolvedValue(mockMgmt);
         prismaMock.animal.update.mockResolvedValue(mockAnimal);
         prismaMock.pasture.update.mockResolvedValue({});

         const res = await request(app).post("/api/management/move").send(validMove);
         expect(res.status).toBe(201);
         expect(prismaMock.pasture.update).toHaveBeenCalledTimes(2);
      });

      it("deve mover animal sem pasto (sem decrement)", async () => {
         const noPasture = { ...mockAnimal, pastureId: null, pastureName: null };
         prismaMock.animal.findFirst.mockResolvedValue(noPasture);
         prismaMock.pasture.findFirst.mockResolvedValue(destPasture);
         prismaMock.management.create.mockResolvedValue(mockMgmt);
         prismaMock.animal.update.mockResolvedValue(noPasture);
         prismaMock.pasture.update.mockResolvedValue({});

         const res = await request(app).post("/api/management/move").send(validMove);
         expect(res.status).toBe(201);
         expect(prismaMock.pasture.update).toHaveBeenCalledTimes(1); // só increment
      });

      it("404 para animal inexistente", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(null);
         const res = await request(app).post("/api/management/move").send(validMove);
         expect(res.status).toBe(404);
      });

      it("404 para pasto destino inexistente", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.pasture.findFirst.mockResolvedValue(null);
         const res = await request(app).post("/api/management/move").send(validMove);
         expect(res.status).toBe(404);
      });

      // Validator
      it("erro: animalId vazio", async () => {
         const res = await request(app).post("/api/management/move").send({ ...validMove, animalId: "" });
         expect(res.status).toBe(500);
      });

      it("erro: destinationPastureId vazio", async () => {
         const res = await request(app).post("/api/management/move").send({ ...validMove, destinationPastureId: "" });
         expect(res.status).toBe(500);
      });

      it("erro: reason curto", async () => {
         const res = await request(app).post("/api/management/move").send({ ...validMove, reason: "AB" });
         expect(res.status).toBe(500);
      });

      it("erro: reason longo", async () => {
         const res = await request(app).post("/api/management/move").send({ ...validMove, reason: "A".repeat(201) });
         expect(res.status).toBe(500);
      });

      it("erro: employee curto", async () => {
         const res = await request(app).post("/api/management/move").send({ ...validMove, employee: "A" });
         expect(res.status).toBe(500);
      });

      it("erro: employee longo", async () => {
         const res = await request(app).post("/api/management/move").send({ ...validMove, employee: "A".repeat(101) });
         expect(res.status).toBe(500);
      });

      it("erro: movementDate futura ou invalida", async () => {
         let res = await request(app).post("/api/management/move").send({ ...validMove, movementDate: "2099-01-01" });
         expect(res.status).toBe(500);
         res = await request(app).post("/api/management/move").send({ ...validMove, movementDate: "invalid" });
         expect(res.status).toBe(500);
      });
   });

   // ─── MOVE BATCH ───
   describe("POST /api/management/move-batch", () => {
      const validBatch = {
         animalIds: ["id-1", "id-2"],
         destinationPastureId: "pasto-b-id",
         reason: "Rotação de pasto",
         employee: "João",
      };

      it("deve mover lote de animais", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(destPasture);
         prismaMock.animal.findMany.mockResolvedValue([
            { ...mockAnimal, id: "id-1" },
            { ...mockAnimal, id: "id-2" },
         ]);
         prismaMock.management.create.mockResolvedValue(mockMgmt);
         prismaMock.animal.update.mockResolvedValue(mockAnimal);
         prismaMock.pasture.update.mockResolvedValue({});

         const res = await request(app).post("/api/management/move-batch").send(validBatch);
         expect(res.status).toBe(201);
      });

      it("404 para pasto destino inexistente", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(null);
         const res = await request(app).post("/api/management/move-batch").send(validBatch);
         expect(res.status).toBe(404);
      });

      it("404 para animais não encontrados", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(destPasture);
         prismaMock.animal.findMany.mockResolvedValue([]);
         const res = await request(app).post("/api/management/move-batch").send(validBatch);
         expect(res.status).toBe(404);
      });

      // Validator batch
      it("erro: animalIds vazio", async () => {
         const res = await request(app).post("/api/management/move-batch").send({ ...validBatch, animalIds: [] });
         expect(res.status).toBe(500);
      });

      it("erro: animalIds duplicados", async () => {
         const res = await request(app).post("/api/management/move-batch").send({ ...validBatch, animalIds: ["id-1", "id-1"] });
         expect(res.status).toBe(500);
      });

      it("erro: ID vazio na lista", async () => {
         const res = await request(app).post("/api/management/move-batch").send({ ...validBatch, animalIds: ["id-1", ""] });
         expect(res.status).toBe(500);
      });

      it("erro batch: reason curto", async () => {
         const res = await request(app).post("/api/management/move-batch").send({ ...validBatch, reason: "AB" });
         expect(res.status).toBe(500);
      });

      it("erro batch: employee curto", async () => {
         const res = await request(app).post("/api/management/move-batch").send({ ...validBatch, employee: "A" });
         expect(res.status).toBe(500);
      });

      it("erro batch: excesso de animais", async () => {
         const ids = Array(501).fill(0).map((_, i) => `id-${i}`);
         const res = await request(app).post("/api/management/move-batch").send({ ...validBatch, animalIds: ids });
         expect(res.status).toBe(500);
      });

      it("erro batch: destinationPastureId vazio", async () => {
         const res = await request(app).post("/api/management/move-batch").send({ ...validBatch, destinationPastureId: "" });
         expect(res.status).toBe(500);
      });

      it("erro batch: reason longo", async () => {
         const res = await request(app).post("/api/management/move-batch").send({ ...validBatch, reason: "A".repeat(201) });
         expect(res.status).toBe(500);
      });

      it("erro batch: employee longo", async () => {
         const res = await request(app).post("/api/management/move-batch").send({ ...validBatch, employee: "A".repeat(101) });
         expect(res.status).toBe(500);
      });

      it("erro batch: movementDate invalida ou futura", async () => {
         let res = await request(app).post("/api/management/move-batch").send({ ...validBatch, movementDate: "invalid" });
         expect(res.status).toBe(500);
         res = await request(app).post("/api/management/move-batch").send({ ...validBatch, movementDate: "2099-01-01" });
         expect(res.status).toBe(500);
      });
   });

   // ─── LIST BY ANIMAL ───
   describe("GET /api/management/animal/:animalId", () => {
      it("deve retornar histórico", async () => {
         prismaMock.management.findMany.mockResolvedValue([mockMgmt]);
         const res = await request(app).get("/api/management/animal/test-animal-id");
         expect(res.status).toBe(200);
         expect(res.body[0].originPasture).toBe("Pasto A");
      });
   });
});
