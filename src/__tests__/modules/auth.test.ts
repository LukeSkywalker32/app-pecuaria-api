// ========================================
// TESTES: Auth Module
// Estratégia: mock bcrypt + prisma + jwt real (com segredo de teste)
// ========================================

import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

// ─── vi.hoisted: cria o mock ANTES do vi.mock ser processado ───
// Isso é necessário porque vi.mock é "hoisted" (elevado) para o topo do arquivo,
// mas a variável só existiria depois da declaração normal
const { prismaMock } = vi.hoisted(() => {
   const prismaMock = {
      user: {
         findFirst: vi.fn(),
         findUnique: vi.fn(),
         create: vi.fn(),
         update: vi.fn(),
      },
      farm: {
         findUnique: vi.fn(),
      },
      passwordResetToken: {
         findFirst: vi.fn(),
         create: vi.fn(),
         update: vi.fn(),
         updateMany: vi.fn(),
      },
      $transaction: vi.fn(),
      $queryRaw: vi.fn(),
   };
   return { prismaMock };
});

// ─── Mock: Prisma ───
vi.mock("@/config/database", () => ({ prisma: prismaMock }));

// ─── Mock: bcrypt ───
// bcrypt.compare e bcrypt.hash são operações pesadas (intencional para segurança)
// No teste, queremos controlar o resultado sem custo computacional
vi.mock("bcryptjs", () => ({
   default: {
      hash: vi.fn().mockResolvedValue("$2b$10$hashedpassword"),
      compare: vi.fn().mockResolvedValue(true),
   },
}));
vi.mock("jsonwebtoken", () => ({
   default: {
      sign: vi.fn().mockReturnValue("mocked-token"),
      verify: vi.fn().mockReturnValue({ userId: "test-user-id", role: "admin" }),
   },
}));

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import app from "@/app";

const loginPayload = {
   farmId: "test-farm-id",
   username: "admin",
   password: "Test@1234",
};

const mockUserFromDb = {
   id: "test-user-id",
   username: "admin",
   email: "admin@test.com",
   role: "admin",
   farmId: "test-farm-id",
   active: true,
   password: "$2b$10$hashedpassword",
};

describe("Auth Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      prismaMock.$transaction.mockImplementation(async (cb: any) => cb(prismaMock));
   });

   // ─── LOGIN ───
   describe("POST /api/auth/login", () => {
      it("deve fazer login com sucesso e retornar tokens", async () => {
         // Arrange: usuário encontrado + senha correta
         prismaMock.user.findFirst.mockResolvedValue(mockUserFromDb);
         prismaMock.user.update.mockResolvedValue(mockUserFromDb);
         vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

         // Act
         const res = await request(app).post("/api/auth/login").send(loginPayload);

         // Assert
         expect(res.status).toBe(200);
         expect(res.body).toHaveProperty("accessToken");
         expect(res.body).toHaveProperty("refreshToken");
         expect(res.body.role).toBe("admin");
      });

      it("deve retornar erro quando usuário não existe", async () => {
         // Arrange: banco não encontra o usuário
         prismaMock.user.findFirst.mockResolvedValue(null);

         const res = await request(app).post("/api/auth/login").send(loginPayload);

         expect(res.status).toBe(500); // errorHandler retorna 500 para erros sem statusCode
         expect(res.body.error).toContain("Usuario não encontrado");
      });

      it("deve retornar erro quando senha está errada", async () => {
         prismaMock.user.findFirst.mockResolvedValue(mockUserFromDb);
         // Senha errada: bcrypt.compare retorna false
         vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

         const res = await request(app).post("/api/auth/login").send(loginPayload);

         expect(res.status).toBe(500);
         expect(res.body.error).toContain("Senha incorreta");
      });

      it("deve retornar 500 quando farmId não informado", async () => {
         const res = await request(app).post("/api/auth/login").send({
            username: "admin",
            password: "Test@1234",
         });

         expect(res.status).toBe(500);
      });

      // Validator
      it("erro validator: username curto", async () => {
         const res = await request(app).post("/api/auth/login").send({ farmId: "test-farm-id", username: "ab", password: "Test@1234" });
         expect(res.status).toBe(500);
      });

      it("erro validator: password curto", async () => {
         const res = await request(app).post("/api/auth/login").send({ farmId: "test-farm-id", username: "admin", password: "abc" });
         expect(res.status).toBe(500);
      });
   });

   // ─── RENEW TOKEN ───
   describe("POST /api/auth/renew-token", () => {
      it("deve renovar token com sucesso", async () => {
         prismaMock.user.findUnique.mockResolvedValue(mockUserFromDb);
         const res = await request(app).post("/api/auth/renew-token").send({ refreshToken: "valid-token" });
         expect(res.status).toBe(200);
         expect(res.body).toHaveProperty("accessToken");
      });

      it("deve retornar 400 se refreshToken não for enviado", async () => {
         const res = await request(app).post("/api/auth/renew-token").send({});
         expect(res.status).toBe(400);
         expect(res.body.error).toContain("Refresh token is required");
      });

      it("deve falhar se refreshToken for inválido", async () => {
         vi.mocked(jwt.verify).mockImplementationOnce(() => { throw new Error("Invalid"); });
         const res = await request(app).post("/api/auth/renew-token").send({ refreshToken: "invalid-token" });
         expect(res.status).toBe(500); // errorHandler
      });

      it("deve falhar se usuário não existir", async () => {
         prismaMock.user.findUnique.mockResolvedValue(null);
         const res = await request(app).post("/api/auth/renew-token").send({ refreshToken: "valid-token" });
         expect(res.status).toBe(500);
      });

      it("deve falhar se usuário estiver inativo", async () => {
         prismaMock.user.findUnique.mockResolvedValue({ ...mockUserFromDb, active: false });
         const res = await request(app).post("/api/auth/renew-token").send({ refreshToken: "valid-token" });
         expect(res.status).toBe(500);
      });
   });

   // ─── FORGOT PASSWORD ───
   describe("POST /api/auth/forgot-password", () => {
      it("deve retornar 200 mesmo quando email não existe (evita enumeração)", async () => {
         // Regra: nunca revelar se email existe ou não
         prismaMock.user.findFirst.mockResolvedValue(null);

         const res = await request(app).post("/api/auth/forgot-password").send({
            farmId: "test-farm-id",
            email: "inexistente@test.com",
         });

         expect(res.status).toBe(200);
      });

      it("deve criar token quando email existe", async () => {
         prismaMock.user.findFirst.mockResolvedValue(mockUserFromDb);
         prismaMock.passwordResetToken.updateMany.mockResolvedValue({ count: 0 });
         prismaMock.passwordResetToken.create.mockResolvedValue({
            id: "token-id",
            code: "123456",
            expiresAt: new Date(),
            used: false,
         });

         const res = await request(app).post("/api/auth/forgot-password").send({
            farmId: "test-farm-id",
            email: "admin@test.com",
         });

         expect(res.status).toBe(200);
         expect(prismaMock.passwordResetToken.create).toHaveBeenCalledOnce();
      });

      // Validator
      it("erro validator: farm ausente", async () => {
         const res = await request(app).post("/api/auth/forgot-password").send({ email: "admin@test.com" });
         expect(res.status).toBe(500);
      });

      it("erro validator: email invalido", async () => {
         const res = await request(app).post("/api/auth/forgot-password").send({ farmId: "test-farm-id", email: "invalid-email" });
         expect(res.status).toBe(500);
      });
   });

   // ─── CONFIRM RESET ───
   describe("POST /api/auth/confirm-reset", () => {
      it("deve retornar erro para código inválido ou expirado", async () => {
         prismaMock.passwordResetToken.findFirst.mockResolvedValue(null);

         const res = await request(app).post("/api/auth/confirm-reset").send({
            farmId: "test-farm-id",
            email: "admin@test.com",
            code: "123456",
            newPassword: "Novo@1234",
         });

         expect(res.status).toBe(400);
         expect(res.body.error).toContain("Código invalido ou expirado");
      });

      it("deve retornar erro para email que nao corresponde ao token", async () => {
         prismaMock.passwordResetToken.findFirst.mockResolvedValue({ id: "token", userId: "test-user-id" });
         prismaMock.user.findUnique.mockResolvedValue({ ...mockUserFromDb, email: "other@test.com" });
         const res = await request(app).post("/api/auth/confirm-reset").send({
            farmId: "test-farm-id",
            email: "admin@test.com",
            code: "123456",
            newPassword: "Novo@1234",
         });
         expect(res.status).toBe(500);
         expect(res.body.error).toContain("Dados incorretos");
      });

      // Validator
      it("erro validator: farm ausente", async () => {
         const res = await request(app).post("/api/auth/confirm-reset").send({ email: "admin@test.com", code: "123456", newPassword: "Novo@1234" });
         expect(res.status).toBe(500);
      });

      it("erro validator: email invalido", async () => {
         const res = await request(app).post("/api/auth/confirm-reset").send({ farmId: "test-farm-id", email: "invalid", code: "123456", newPassword: "Novo@1234" });
         expect(res.status).toBe(500);
      });

      it("erro validator: code diferente de 6 digitos", async () => {
         const res = await request(app).post("/api/auth/confirm-reset").send({ farmId: "test-farm-id", email: "admin@test.com", code: "123", newPassword: "Novo@1234" });
         expect(res.status).toBe(500);
      });

      it("erro validator: password curto", async () => {
         const res = await request(app).post("/api/auth/confirm-reset").send({ farmId: "test-farm-id", email: "admin@test.com", code: "123456", newPassword: "Short1!" });
         expect(res.status).toBe(500);
      });

      it("erro validator: password fraco", async () => {
         const res = await request(app).post("/api/auth/confirm-reset").send({ farmId: "test-farm-id", email: "admin@test.com", code: "123456", newPassword: "weakpassword" });
         expect(res.status).toBe(500);
      });
   });
});
