import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockFarm, TEST_FARM_ID } from "../helpers/auth.helper";

const { prismaMock } = vi.hoisted(() => {
   const prismaMock = {
      farm: {
         findFirst: vi.fn(),
         findUnique: vi.fn(),
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

describe("Farm Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      prismaMock.$transaction.mockImplementation(async (cb: any) => cb(prismaMock));
   });

   describe("GET /api/farms", () => {
      it("deve listar fazendas para admin", async () => {
         prismaMock.farm.findMany.mockResolvedValue([mockFarm]);

         const res = await request(app).get("/api/farms");

         expect(res.status).toBe(200);
         expect(res.body).toHaveLength(1);
         expect(res.body[0].name).toBe("Fazenda Teste");
      });
   });

   describe("POST /api/farms", () => {
      it("deve criar fazenda com sucesso", async () => {
         prismaMock.farm.findFirst.mockResolvedValue(null); // sem conflito de nome
         prismaMock.farm.create.mockResolvedValue(mockFarm);

         const res = await request(app).post("/api/farms").send({
            name: "Fazenda Teste",
            location: "Guararapes - SP",
            //cnpj: "12.345.678/0001-90",
         });

         expect(res.status).toBe(201);
         expect(res.body.name).toBe("Fazenda Teste");
         // Verifica que o service chamou create com os dados corretos
         expect(prismaMock.farm.create).toHaveBeenCalledOnce();
      });

      it("deve retornar 409 quando nome já está em uso", async () => {
         // Arrange: banco encontra fazenda com mesmo nome
         prismaMock.farm.findFirst.mockResolvedValue(mockFarm);

         const res = await request(app).post("/api/farms").send({
            name: "Fazenda Teste",
            location: "SP",
            //cnpj: "12.345.678/0001-90",
         });

         expect(res.status).toBe(409);
         expect(res.body.error).toContain("Nome da fazenda já em uso");
         // Verifica que create NUNCA foi chamado
         expect(prismaMock.farm.create).not.toHaveBeenCalled();
      });

      it("deve retornar 500 quando nome tem menos de 2 caracteres (validação)", async () => {
         const res = await request(app).post("/api/farms").send({
            name: "A",
            location: "SP",
         });

         expect(res.status).toBe(500);
      });
   });

   describe("GET /api/farms/:id", () => {
      it("deve retornar fazenda por ID", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(mockFarm);

         const res = await request(app).get(`/api/farms/${TEST_FARM_ID}`);

         expect(res.status).toBe(200);
         expect(res.body.id).toBe(TEST_FARM_ID);
      });

      it("deve retornar 404 quando fazenda não existe", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(null);

         const res = await request(app).get("/api/farms/id-inexistente");

         expect(res.status).toBe(404);
      });
   });

   describe("PUT /api/farms/:id", () => {
      it("deve atualizar fazenda com sucesso", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(mockFarm);
         prismaMock.farm.findFirst.mockResolvedValue(null); // sem conflito de nome
         prismaMock.farm.update.mockResolvedValue({ ...mockFarm, name: "Fazenda Atualizada" });

         const res = await request(app)
            .put(`/api/farms/${TEST_FARM_ID}`)
            .send({ name: "Fazenda Atualizada" });

         expect(res.status).toBe(200);
         expect(res.body.name).toBe("Fazenda Atualizada");
      });
   });

   describe("PATCH /api/farms/:id/activate", () => {
      it("deve ativar fazenda", async () => {
         prismaMock.farm.findUnique.mockResolvedValue({ ...mockFarm, active: false });
         prismaMock.farm.update.mockResolvedValue({ ...mockFarm, active: true });

         const res = await request(app).patch(`/api/farms/${TEST_FARM_ID}/activate`);

         expect(res.status).toBe(200);
         expect(res.body.active).toBe(true);
      });
   });

   describe("DELETE /api/farms/:id", () => {
      it("deve remover fazenda", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(mockFarm);
         prismaMock.farm.delete.mockResolvedValue(mockFarm);

         const res = await request(app).delete(`/api/farms/${TEST_FARM_ID}`);

         expect(res.status).toBe(204);
         expect(prismaMock.farm.delete).toHaveBeenCalledWith({ where: { id: TEST_FARM_ID } });
      });
   });
});
