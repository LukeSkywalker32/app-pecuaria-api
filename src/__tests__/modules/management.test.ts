// src/__tests__/modules/management.test.ts

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

const mockManagement = {
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

describe("Management Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      prismaMock.$transaction.mockImplementation(async (cb: any) => cb(prismaMock));
   });

   it("POST /api/management/move — deve mover animal entre pastos", async () => {
      prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
      prismaMock.pasture.findFirst.mockResolvedValue({
         ...mockPasture,
         id: "pasto-b-id",
         name: "Pasto B",
      });
      prismaMock.management.create.mockResolvedValue(mockManagement);
      prismaMock.animal.update.mockResolvedValue(mockAnimal);
      prismaMock.pasture.update.mockResolvedValue({});

      const res = await request(app).post("/api/management/move").send({
         animalId: "test-animal-id",
         destinationPastureId: "pasto-b-id",
         reason: "Superlotação",
         employee: "João",
      });

      expect(res.status).toBe(201);
      expect(prismaMock.pasture.update).toHaveBeenCalledTimes(2); // decrement origem + increment destino
   });

   it("POST /api/management/move — 404 para animal inexistente", async () => {
      prismaMock.animal.findFirst.mockResolvedValue(null);
      const res = await request(app).post("/api/management/move").send({
         animalId: "id-inexistente",
         destinationPastureId: "pasto-b-id",
         reason: "Teste",
         employee: "João",
      });
      expect(res.status).toBe(404);
   });

   it("GET /api/management/animal/:animalId — histórico de movimentações", async () => {
      prismaMock.management.findMany.mockResolvedValue([mockManagement]);
      const res = await request(app).get("/api/management/animal/test-animal-id");
      expect(res.status).toBe(200);
      expect(res.body[0].originPasture).toBe("Pasto A");
   });
});
