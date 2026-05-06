import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockPasture, TEST_FARM_ID } from "../helpers/auth.helper";

const { prismaMock } = vi.hoisted(() => {
   const prismaMock = {
      pasture: {
         findFirst: vi.fn(),
         findMany: vi.fn(),
         create: vi.fn(),
         update: vi.fn(),
         delete: vi.fn(),
      },
      $transaction: vi.fn(),
      $queryRaw: vi.fn(),
   };
   return { prismaMock };
});

vi.mock("@/config/database", () => ({ prisma: prismaMock }));

import app from "@/app";

const validPayload = { name: "Pasto A", hectares: 10.5, type: "native", animalCapacity: 30 };

describe("Pasture Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      prismaMock.$transaction.mockImplementation(async (cb: any) => cb(prismaMock));
   });

   // ─── LIST ───
   describe("GET /api/pastures", () => {
      it("deve listar pastos", async () => {
         prismaMock.pasture.findMany.mockResolvedValue([mockPasture]);
         const res = await request(app).get("/api/pastures");
         expect(res.status).toBe(200);
         expect(res.body[0]).toHaveProperty("occupancyRate");
      });

      it("deve listar com filtro active", async () => {
         prismaMock.pasture.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/pastures?active=true");
         expect(res.status).toBe(200);
      });

      it("deve listar com filtro type", async () => {
         prismaMock.pasture.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/pastures?type=native");
         expect(res.status).toBe(200);
      });

      it("deve listar com filtro search", async () => {
         prismaMock.pasture.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/pastures?search=Pasto");
         expect(res.status).toBe(200);
      });
   });

   // ─── CREATE ───
   describe("POST /api/pastures", () => {
      it("deve criar pasto com sucesso", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(null);
         prismaMock.pasture.create.mockResolvedValue(mockPasture);
         const res = await request(app).post("/api/pastures").send(validPayload);
         expect(res.status).toBe(201);
         expect(res.body.occupancyRate).toBe(0);
      });

      it("deve retornar 409 quando nome já existe", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(mockPasture);
         const res = await request(app).post("/api/pastures").send(validPayload);
         expect(res.status).toBe(409);
      });

      // Validator create
      it("erro: nome curto", async () => {
         const res = await request(app).post("/api/pastures").send({ ...validPayload, name: "AB" });
         expect(res.status).toBe(500);
      });

      it("erro: nome longo", async () => {
         const res = await request(app).post("/api/pastures").send({ ...validPayload, name: "A".repeat(101) });
         expect(res.status).toBe(500);
      });

      it("erro: hectares ausente", async () => {
         const res = await request(app).post("/api/pastures").send({ ...validPayload, hectares: undefined });
         expect(res.status).toBe(500);
      });

      it("erro: hectares zero", async () => {
         const res = await request(app).post("/api/pastures").send({ ...validPayload, hectares: 0 });
         expect(res.status).toBe(500);
      });

      it("erro: tipo inválido", async () => {
         const res = await request(app).post("/api/pastures").send({ ...validPayload, type: "jungle" });
         expect(res.status).toBe(500);
      });

      it("erro: capacidade ausente", async () => {
         const res = await request(app).post("/api/pastures").send({ ...validPayload, animalCapacity: undefined });
         expect(res.status).toBe(500);
      });

      it("erro: capacidade zero", async () => {
         const res = await request(app).post("/api/pastures").send({ ...validPayload, animalCapacity: 0 });
         expect(res.status).toBe(500);
      });
   });

   // ─── FIND BY ID ───
   describe("GET /api/pastures/:id", () => {
      it("deve retornar pasto por ID", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(mockPasture);
         const res = await request(app).get("/api/pastures/test-pasture-id");
         expect(res.status).toBe(200);
      });

      it("deve retornar 404", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(null);
         const res = await request(app).get("/api/pastures/bad-id");
         expect(res.status).toBe(404);
      });
   });

   // ─── UPDATE ───
   describe("PUT /api/pastures/:id", () => {
      it("deve atualizar pasto", async () => {
         prismaMock.pasture.findFirst
            .mockResolvedValueOnce(mockPasture)
            .mockResolvedValueOnce(null);
         prismaMock.pasture.update.mockResolvedValue({ ...mockPasture, name: "Pasto B" });
         const res = await request(app).put("/api/pastures/test-pasture-id").send({ name: "Pasto B" });
         expect(res.status).toBe(200);
      });

      it("deve 409 conflito de nome", async () => {
         prismaMock.pasture.findFirst
            .mockResolvedValueOnce(mockPasture) // findById
            .mockResolvedValueOnce({ ...mockPasture, id: "other" }); // conflito
         const res = await request(app).put("/api/pastures/test-pasture-id").send({ name: "Outro" });
         expect(res.status).toBe(409);
      });

      it("deve atualizar hectares e type", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(mockPasture);
         prismaMock.pasture.update.mockResolvedValue({ ...mockPasture, hectares: 20, type: "irrigated" });
         const res = await request(app).put("/api/pastures/test-pasture-id").send({ hectares: 20, type: "irrigated", animalCapacity: 50 });
         expect(res.status).toBe(200);
      });

      // Validator update
      it("erro update: nome curto", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(mockPasture);
         const res = await request(app).put("/api/pastures/test-pasture-id").send({ name: "A" });
         expect(res.status).toBe(500);
      });

      it("erro update: hectares zero", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(mockPasture);
         const res = await request(app).put("/api/pastures/test-pasture-id").send({ hectares: -1 });
         expect(res.status).toBe(500);
      });

      it("erro update: tipo inválido", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(mockPasture);
         const res = await request(app).put("/api/pastures/test-pasture-id").send({ type: "xxx" });
         expect(res.status).toBe(500);
      });

      it("erro update: capacidade zero", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(mockPasture);
         const res = await request(app).put("/api/pastures/test-pasture-id").send({ animalCapacity: 0 });
         expect(res.status).toBe(500);
      });
   });

   // ─── ACTIVATE / DEACTIVATE ───
   describe("PATCH /api/pastures/:id/activate", () => {
      it("deve ativar pasto", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue({ ...mockPasture, active: false });
         prismaMock.pasture.update.mockResolvedValue({ ...mockPasture, active: true });
         const res = await request(app).patch("/api/pastures/test-pasture-id/activate");
         expect(res.status).toBe(200);
      });
   });

   describe("PATCH /api/pastures/:id/deactivate", () => {
      it("deve impedir desativação com animais", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue({ ...mockPasture, currentAnimals: 5 });
         const res = await request(app).patch("/api/pastures/test-pasture-id/deactivate");
         expect(res.status).toBe(400);
      });

      it("deve desativar pasto sem animais", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(mockPasture);
         prismaMock.pasture.update.mockResolvedValue({ ...mockPasture, active: false });
         const res = await request(app).patch("/api/pastures/test-pasture-id/deactivate");
         expect(res.status).toBe(200);
      });
   });

   // ─── DELETE ───
   describe("DELETE /api/pastures/:id", () => {
      it("deve impedir exclusão com animais", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue({ ...mockPasture, currentAnimals: 3 });
         const res = await request(app).delete("/api/pastures/test-pasture-id");
         expect(res.status).toBe(400);
      });

      it("deve excluir pasto vazio", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(mockPasture);
         prismaMock.pasture.delete.mockResolvedValue(mockPasture);
         const res = await request(app).delete("/api/pastures/test-pasture-id");
         expect(res.status).toBe(204);
      });
   });
});
