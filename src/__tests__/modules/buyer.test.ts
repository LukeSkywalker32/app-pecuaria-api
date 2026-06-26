import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockBuyer } from "../helpers/auth.helper";

const { prismaMock } = vi.hoisted(() => {
   const prismaMock = {
      buyer: {
         findFirst: vi.fn(),
         findMany: vi.fn(),
         create: vi.fn(),
         update: vi.fn(),
         delete: vi.fn(),
      },
      $transaction: vi.fn(),
   };
   return { prismaMock };
});

vi.mock("@/config/database", () => ({ prisma: prismaMock }));

import app from "@/app";

const validPayload = {
   name: "João da Silva",
   document: "12345678901",
   phone: "18999999999",
   email: "joao@teste.com",
   city: "Araçatuba",
   notes: "Comprador frequente",
};

describe("Buyer Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      prismaMock.$transaction.mockImplementation(async (cb: any) => cb(prismaMock));
   });

   // ─── LIST ───
   describe("GET /api/buyers", () => {
      it("deve listar compradores da fazenda", async () => {
         prismaMock.buyer.findMany.mockResolvedValue([mockBuyer]);
         const res = await request(app).get("/api/buyers");
         expect(res.status).toBe(200);
         expect(res.body).toHaveLength(1);
         expect(res.body[0].name).toBe(mockBuyer.name);
      });

      it("deve listar vazio quando não há compradores", async () => {
         prismaMock.buyer.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/buyers");
         expect(res.status).toBe(200);
         expect(res.body).toEqual([]);
      });

      it("deve filtrar por search (nome/documento/cidade)", async () => {
         prismaMock.buyer.findMany.mockResolvedValue([mockBuyer]);
         const res = await request(app).get("/api/buyers?search=João");
         expect(res.status).toBe(200);
         // Confirma que o filtro OR (nome/documento/cidade) foi montado
         const callArgs = prismaMock.buyer.findMany.mock.calls[0][0];
         expect(callArgs.where.OR).toHaveLength(3);
      });

      it("deve aceitar search como array de query string (usa o primeiro valor)", async () => {
         prismaMock.buyer.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/buyers?search=a&search=b");
         expect(res.status).toBe(200);
      });
   });

   // ─── CREATE ───
   describe("POST /api/buyers", () => {
      it("deve criar comprador com sucesso", async () => {
         prismaMock.buyer.create.mockResolvedValue(mockBuyer);
         const res = await request(app).post("/api/buyers").send(validPayload);
         expect(res.status).toBe(201);
         expect(res.body.name).toBe(mockBuyer.name);
      });

      it("deve criar comprador sem campos opcionais (phone/email/city/notes)", async () => {
         prismaMock.buyer.create.mockResolvedValue({
            ...mockBuyer,
            phone: null,
            email: null,
            city: null,
            notes: null,
         });
         const res = await request(app)
            .post("/api/buyers")
            .send({ name: "Maria Souza", document: "98765432100" });
         expect(res.status).toBe(201);
      });

      // ── Validator: create ──
      it("erro: nome curto", async () => {
         const res = await request(app)
            .post("/api/buyers")
            .send({ ...validPayload, name: "Jo" });
         expect(res.status).toBe(400);
         expect(res.body.error).toContain("Nome deve ter pelo menos 3 caracteres");
      });

      it("erro: nome longo", async () => {
         const res = await request(app)
            .post("/api/buyers")
            .send({ ...validPayload, name: "A".repeat(51) });
         expect(res.status).toBe(400);
      });

      it("erro: documento ausente", async () => {
         const res = await request(app)
            .post("/api/buyers")
            .send({ ...validPayload, document: undefined });
         expect(res.status).toBe(400);
         expect(res.body.error).toContain("Documento deve ter pelo menos 11 caracteres");
      });

      it("erro: documento curto", async () => {
         const res = await request(app)
            .post("/api/buyers")
            .send({ ...validPayload, document: "123" });
         expect(res.status).toBe(400);
      });

      it("erro: documento longo", async () => {
         const res = await request(app)
            .post("/api/buyers")
            .send({ ...validPayload, document: "1".repeat(15) });
         expect(res.status).toBe(400);
      });

      it("erro: email inválido", async () => {
         const res = await request(app)
            .post("/api/buyers")
            .send({ ...validPayload, email: "email-invalido" });
         expect(res.status).toBe(400);
         expect(res.body.error).toContain("Email inválido");
      });

      it("deve aceitar email vazio (campo opcional)", async () => {
         prismaMock.buyer.create.mockResolvedValue(mockBuyer);
         const res = await request(app)
            .post("/api/buyers")
            .send({ ...validPayload, email: "" });
         expect(res.status).toBe(201);
      });

      it("erro: observações muito longas", async () => {
         const res = await request(app)
            .post("/api/buyers")
            .send({ ...validPayload, notes: "A".repeat(501) });
         expect(res.status).toBe(400);
         expect(res.body.error).toContain("Observações não pode ter mais de 500 caracteres");
      });
   });

   // ─── FIND BY ID ───
   describe("GET /api/buyers/:id", () => {
      it("deve retornar comprador por ID", async () => {
         prismaMock.buyer.findFirst.mockResolvedValue(mockBuyer);
         const res = await request(app).get("/api/buyers/test-buyer-id");
         expect(res.status).toBe(200);
         expect(res.body.id).toBe(mockBuyer.id);
      });

      it("deve retornar 404 quando comprador não existe", async () => {
         prismaMock.buyer.findFirst.mockResolvedValue(null);
         const res = await request(app).get("/api/buyers/id-invalido");
         expect(res.status).toBe(404);
         expect(res.body.error).toContain("Comprador não encontrado");
      });
   });

   // ─── UPDATE ───
   describe("PUT /api/buyers/:id", () => {
      it("deve atualizar comprador", async () => {
         prismaMock.buyer.findFirst.mockResolvedValue(mockBuyer);
         prismaMock.buyer.update.mockResolvedValue({ ...mockBuyer, name: "João Atualizado" });
         const res = await request(app)
            .put("/api/buyers/test-buyer-id")
            .send({ name: "João Atualizado" });
         expect(res.status).toBe(200);
         expect(res.body.name).toBe("João Atualizado");
      });

      it("deve atualizar limpando campos opcionais (null)", async () => {
         prismaMock.buyer.findFirst.mockResolvedValue(mockBuyer);
         prismaMock.buyer.update.mockResolvedValue({ ...mockBuyer, phone: null, city: null });
         const res = await request(app)
            .put("/api/buyers/test-buyer-id")
            .send({ phone: null, city: null });
         expect(res.status).toBe(200);
      });

      it("deve atualizar email, cidade e observações com valores reais", async () => {
         prismaMock.buyer.findFirst.mockResolvedValue(mockBuyer);
         prismaMock.buyer.update.mockResolvedValue({
            ...mockBuyer,
            email: "novo@teste.com",
            city: "Birigui",
            notes: "Nova observação",
         });
         const res = await request(app).put("/api/buyers/test-buyer-id").send({
            email: "novo@teste.com",
            city: "Birigui",
            notes: "Nova observação",
         });
         expect(res.status).toBe(200);
         expect(res.body.email).toBe("novo@teste.com");
      });

      it("deve retornar 404 ao atualizar comprador inexistente", async () => {
         prismaMock.buyer.findFirst.mockResolvedValue(null);
         const res = await request(app).put("/api/buyers/id-invalido").send({ name: "Qualquer" });
         expect(res.status).toBe(404);
      });

      // ── Validator: update ──
      it("erro update: nome curto", async () => {
         prismaMock.buyer.findFirst.mockResolvedValue(mockBuyer);
         const res = await request(app).put("/api/buyers/test-buyer-id").send({ name: "Jo" });
         expect(res.status).toBe(400);
      });

      it("erro update: nome longo", async () => {
         prismaMock.buyer.findFirst.mockResolvedValue(mockBuyer);
         const res = await request(app)
            .put("/api/buyers/test-buyer-id")
            .send({ name: "A".repeat(51) });
         expect(res.status).toBe(400);
      });

      it("erro update: documento curto", async () => {
         prismaMock.buyer.findFirst.mockResolvedValue(mockBuyer);
         const res = await request(app).put("/api/buyers/test-buyer-id").send({ document: "123" });
         expect(res.status).toBe(400);
      });

      it("erro update: documento longo", async () => {
         prismaMock.buyer.findFirst.mockResolvedValue(mockBuyer);
         const res = await request(app)
            .put("/api/buyers/test-buyer-id")
            .send({ document: "1".repeat(15) });
         expect(res.status).toBe(400);
      });

      it("erro update: email inválido", async () => {
         prismaMock.buyer.findFirst.mockResolvedValue(mockBuyer);
         const res = await request(app)
            .put("/api/buyers/test-buyer-id")
            .send({ email: "invalido" });
         expect(res.status).toBe(400);
      });

      it("erro update: observações muito longas", async () => {
         prismaMock.buyer.findFirst.mockResolvedValue(mockBuyer);
         const res = await request(app)
            .put("/api/buyers/test-buyer-id")
            .send({ notes: "A".repeat(501) });
         expect(res.status).toBe(400);
      });
   });

   // ─── DELETE ───
   describe("DELETE /api/buyers/:id", () => {
      it("deve excluir comprador", async () => {
         prismaMock.buyer.findFirst.mockResolvedValue(mockBuyer);
         prismaMock.buyer.delete.mockResolvedValue(mockBuyer);
         const res = await request(app).delete("/api/buyers/test-buyer-id");
         expect(res.status).toBe(204);
      });

      it("deve retornar 404 ao excluir comprador inexistente", async () => {
         prismaMock.buyer.findFirst.mockResolvedValue(null);
         const res = await request(app).delete("/api/buyers/id-invalido");
         expect(res.status).toBe(404);
      });
   });
});
