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

describe("Pasture Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      prismaMock.$transaction.mockImplementation(async (cb: any) => cb(prismaMock));
   });

   describe("GET /api/pastures", () => {
      it("deve listar pastos da fazenda", async () => {
         prismaMock.pasture.findMany.mockResolvedValue([mockPasture]);
         const res = await request(app).get("/api/pastures");
         expect(res.status).toBe(200);
         expect(res.body[0].name).toBe("Pasto A");
      });
   });

   describe("POST /api/pastures", () => {
      it("deve criar pasto com sucesso", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(null);
         prismaMock.pasture.create.mockResolvedValue(mockPasture);

         const res = await request(app).post("/api/pastures").send({
            name: "Pasto A",
            hectares: 10.5,
            type: "Braquiária",
            animalCapacity: 30,
         });

         expect(res.status).toBe(201);
         expect(res.body.occupancyRate).toBe(0); // calculado: 0/30 = 0%
      });

      it("deve retornar 409 quando nome já existe na fazenda", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(mockPasture);

         const res = await request(app).post("/api/pastures").send({
            name: "Pasto A",
            hectares: 5,
            type: "Mombaça",
            animalCapacity: 20,
         });

         expect(res.status).toBe(409);
      });
   });

   describe("GET /api/pastures/:id", () => {
      it("deve retornar pasto por ID", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(mockPasture);
         const res = await request(app).get("/api/pastures/test-pasture-id");
         expect(res.status).toBe(200);
         // occupancyRate é calculado no service, não vem do banco
         expect(res.body).toHaveProperty("occupancyRate");
      });

      it("deve retornar 404 quando pasto não existe", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(null);
         const res = await request(app).get("/api/pastures/id-inexistente");
         expect(res.status).toBe(404);
      });
   });

   describe("PATCH /api/pastures/:id/deactivate", () => {
      it("deve impedir desativação com animais no pasto", async () => {
         // Pasto com 5 animais não pode ser desativado
         prismaMock.pasture.findFirst.mockResolvedValue({
            ...mockPasture,
            currentAnimals: 5,
         });

         const res = await request(app).patch("/api/pastures/test-pasture-id/deactivate");

         expect(res.status).toBe(400);
         expect(res.body.error).toContain("5 animal(is)");
      });

      it("deve desativar pasto sem animais", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue(mockPasture); // currentAnimals: 0
         prismaMock.pasture.update.mockResolvedValue({ ...mockPasture, active: false });

         const res = await request(app).patch("/api/pastures/test-pasture-id/deactivate");
         expect(res.status).toBe(200);
      });
   });

   describe("DELETE /api/pastures/:id", () => {
      it("deve impedir exclusão com animais", async () => {
         prismaMock.pasture.findFirst.mockResolvedValue({
            ...mockPasture,
            currentAnimals: 3,
         });

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
