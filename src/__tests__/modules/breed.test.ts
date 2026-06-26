import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock } = vi.hoisted(() => {
   const prismaMock = {
      breed: {
         findMany: vi.fn(),
         findUnique: vi.fn(),
         findFirst: vi.fn(),
         create: vi.fn(),
         update: vi.fn(),
         delete: vi.fn(),
      },
      animal: {
         count: vi.fn(),
      },
      $transaction: vi.fn(),
   };
   return { prismaMock };
});

vi.mock("@/config/database", () => ({ prisma: prismaMock }));

import app from "@/app";

const mockBreed = {
   id: "test-breed-id",
   name: "Nelore",
   active: true,
   createdAt: new Date("2025-01-01"),
   updatedAt: new Date("2025-01-01"),
};

describe("Breed Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      prismaMock.$transaction.mockImplementation(async (cb: any) => cb(prismaMock));
   });

   // ─── LIST ───
   describe("GET /api/breeds", () => {
      it("deve listar raças", async () => {
         prismaMock.breed.findMany.mockResolvedValue([mockBreed]);
         const res = await request(app).get("/api/breeds");
         expect(res.status).toBe(200);
         expect(res.body[0].name).toBe("Nelore");
      });

      it("deve filtrar por active=true", async () => {
         prismaMock.breed.findMany.mockResolvedValue([mockBreed]);
         const res = await request(app).get("/api/breeds?active=true");
         expect(res.status).toBe(200);
         const callArgs = prismaMock.breed.findMany.mock.calls[0][0];
         expect(callArgs.where.active).toBe(true);
      });

      it("deve filtrar por active=false", async () => {
         prismaMock.breed.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/breeds?active=false");
         expect(res.status).toBe(200);
         const callArgs = prismaMock.breed.findMany.mock.calls[0][0];
         expect(callArgs.where.active).toBe(false);
      });

      it("deve filtrar por search", async () => {
         prismaMock.breed.findMany.mockResolvedValue([mockBreed]);
         const res = await request(app).get("/api/breeds?search=Nel");
         expect(res.status).toBe(200);
         const callArgs = prismaMock.breed.findMany.mock.calls[0][0];
         expect(callArgs.where.name.contains).toBe("Nel");
      });
   });

   // ─── FIND BY ID ───
   describe("GET /api/breeds/:id", () => {
      it("deve retornar raça por id", async () => {
         prismaMock.breed.findUnique.mockResolvedValue(mockBreed);
         const res = await request(app).get("/api/breeds/test-breed-id");
         expect(res.status).toBe(200);
      });

      it("deve retornar 404 quando raça não existe", async () => {
         prismaMock.breed.findUnique.mockResolvedValue(null);
         const res = await request(app).get("/api/breeds/id-invalido");
         expect(res.status).toBe(404);
         expect(res.body.error).toContain("Raça não encontrada");
      });
   });

   // ─── CREATE ───
   describe("POST /api/breeds", () => {
      it("deve criar raça com sucesso", async () => {
         prismaMock.breed.findFirst.mockResolvedValue(null);
         prismaMock.breed.create.mockResolvedValue(mockBreed);
         const res = await request(app).post("/api/breeds").send({ name: "Nelore" });
         expect(res.status).toBe(201);
      });

      it("deve retornar 409 quando o nome já existe (case insensitive)", async () => {
         prismaMock.breed.findFirst.mockResolvedValue(mockBreed);
         const res = await request(app).post("/api/breeds").send({ name: "nelore" });
         expect(res.status).toBe(409);
         expect(res.body.error).toContain("Já existe uma raça com esse nome");
      });

      // ── Validator: create ──
      // Nota: breed.validator.ts lança `new Error(...)` sem statusCode,
      // então cai no fallback genérico do errorHandler (500). Comportamento
      // atual do código — não corrigido aqui (fora do escopo desta tarefa).
      it("erro: nome curto", async () => {
         const res = await request(app).post("/api/breeds").send({ name: "A" });
         expect(res.status).toBe(500);
      });

      it("erro: nome ausente", async () => {
         const res = await request(app).post("/api/breeds").send({});
         expect(res.status).toBe(500);
      });

      it("erro: nome longo", async () => {
         const res = await request(app)
            .post("/api/breeds")
            .send({ name: "A".repeat(51) });
         expect(res.status).toBe(500);
      });

      it("erro: nome com caracteres inválidos", async () => {
         const res = await request(app).post("/api/breeds").send({ name: "Nelore#@!" });
         expect(res.status).toBe(500);
      });

      it("deve aceitar nome com acentos e hífen", async () => {
         prismaMock.breed.findFirst.mockResolvedValue(null);
         prismaMock.breed.create.mockResolvedValue({ ...mockBreed, name: "Caracu-Holandês" });
         const res = await request(app).post("/api/breeds").send({ name: "Caracu-Holandês" });
         expect(res.status).toBe(201);
      });
   });

   // ─── UPDATE ───
   describe("PUT /api/breeds/:id", () => {
      it("deve atualizar nome da raça", async () => {
         prismaMock.breed.findUnique.mockResolvedValue(mockBreed);
         prismaMock.breed.findFirst.mockResolvedValue(null); // sem conflito
         prismaMock.breed.update.mockResolvedValue({ ...mockBreed, name: "Brahman" });
         const res = await request(app).put("/api/breeds/test-breed-id").send({ name: "Brahman" });
         expect(res.status).toBe(200);
         expect(res.body.name).toBe("Brahman");
      });

      it("deve atualizar apenas active, sem checar conflito de nome", async () => {
         prismaMock.breed.findUnique.mockResolvedValue(mockBreed);
         prismaMock.breed.update.mockResolvedValue({ ...mockBreed, active: false });
         const res = await request(app).put("/api/breeds/test-breed-id").send({ active: false });
         expect(res.status).toBe(200);
         // Sem campo "name" no payload, não deve nem consultar conflito
         expect(prismaMock.breed.findFirst).not.toHaveBeenCalled();
      });

      it("deve retornar 404 ao atualizar raça inexistente", async () => {
         prismaMock.breed.findUnique.mockResolvedValue(null);
         const res = await request(app).put("/api/breeds/id-invalido").send({ name: "Qualquer" });
         expect(res.status).toBe(404);
      });

      it("deve retornar 409 em conflito de nome na atualização", async () => {
         prismaMock.breed.findUnique.mockResolvedValue(mockBreed);
         prismaMock.breed.findFirst.mockResolvedValue({ ...mockBreed, id: "outro-id" });
         const res = await request(app).put("/api/breeds/test-breed-id").send({ name: "Brahman" });
         expect(res.status).toBe(409);
      });

      // ── Validator: update ──
      it("erro update: nome curto", async () => {
         prismaMock.breed.findUnique.mockResolvedValue(mockBreed);
         const res = await request(app).put("/api/breeds/test-breed-id").send({ name: "A" });
         expect(res.status).toBe(500);
      });

      it("erro update: nome longo", async () => {
         prismaMock.breed.findUnique.mockResolvedValue(mockBreed);
         const res = await request(app)
            .put("/api/breeds/test-breed-id")
            .send({ name: "A".repeat(51) });
         expect(res.status).toBe(500);
      });

      it("erro update: caracteres inválidos", async () => {
         prismaMock.breed.findUnique.mockResolvedValue(mockBreed);
         const res = await request(app).put("/api/breeds/test-breed-id").send({ name: "Nelore#" });
         expect(res.status).toBe(500);
      });
   });

   // ─── ACTIVATE / DEACTIVATE ───
   describe("PATCH /api/breeds/:id/activate", () => {
      it("deve ativar raça", async () => {
         prismaMock.breed.findUnique.mockResolvedValue({ ...mockBreed, active: false });
         prismaMock.breed.update.mockResolvedValue({ ...mockBreed, active: true });
         const res = await request(app).patch("/api/breeds/test-breed-id/activate");
         expect(res.status).toBe(200);
         expect(res.body.active).toBe(true);
      });

      it("deve retornar 404 ao ativar raça inexistente", async () => {
         prismaMock.breed.findUnique.mockResolvedValue(null);
         const res = await request(app).patch("/api/breeds/id-invalido/activate");
         expect(res.status).toBe(404);
      });
   });

   describe("PATCH /api/breeds/:id/deactivate", () => {
      it("deve desativar raça", async () => {
         prismaMock.breed.findUnique.mockResolvedValue(mockBreed);
         prismaMock.breed.update.mockResolvedValue({ ...mockBreed, active: false });
         const res = await request(app).patch("/api/breeds/test-breed-id/deactivate");
         expect(res.status).toBe(200);
         expect(res.body.active).toBe(false);
      });
   });

   // ─── DELETE ───
   describe("DELETE /api/breeds/:id", () => {
      it("deve excluir raça sem animais vinculados", async () => {
         prismaMock.breed.findUnique.mockResolvedValue(mockBreed);
         prismaMock.animal.count.mockResolvedValue(0);
         prismaMock.breed.delete.mockResolvedValue(mockBreed);
         const res = await request(app).delete("/api/breeds/test-breed-id");
         expect(res.status).toBe(204);
      });

      it("deve impedir exclusão quando há animais com essa raça", async () => {
         prismaMock.breed.findUnique.mockResolvedValue(mockBreed);
         prismaMock.animal.count.mockResolvedValue(3);
         const res = await request(app).delete("/api/breeds/test-breed-id");
         expect(res.status).toBe(409);
         expect(res.body.error).toContain("3 animal(is)");
         expect(prismaMock.breed.delete).not.toHaveBeenCalled();
      });

      it("deve retornar 404 ao excluir raça inexistente", async () => {
         prismaMock.breed.findUnique.mockResolvedValue(null);
         const res = await request(app).delete("/api/breeds/id-invalido");
         expect(res.status).toBe(404);
      });
   });
});
