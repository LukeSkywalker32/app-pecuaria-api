import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockUser, TEST_FARM_ID, TEST_USER_ID } from "../helpers/auth.helper";

const { prismaMock } = vi.hoisted(() => ({
   prismaMock: {
      user: {
         findFirst: vi.fn(),
         findUnique: vi.fn(),
         findMany: vi.fn(),
         create: vi.fn(),
         update: vi.fn(),
         delete: vi.fn(),
      },
      farm: { findFirst: vi.fn() },
      $transaction: vi.fn(),
      $queryRaw: vi.fn(),
   },
}));

vi.mock("@/config/database", () => ({ prisma: prismaMock }));

vi.mock("bcryptjs", () => ({
   default: {
      hash: vi.fn().mockResolvedValue("hashed"),
      compare: vi.fn().mockResolvedValue(true),
   },
}));

import bcrypt from "bcryptjs";
import app from "@/app";
import { protectRoute } from "@/shared/middlewares/authMiddleware";

const validCreate = {
   fullName: "João Silva",
   username: "joao.silva",
   email: "joao@teste.com",
   password: "Teste@1234",
   role: "veterinarian",
   farmId: TEST_FARM_ID,
};

describe("User Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      prismaMock.$transaction.mockImplementation(async (cb: any) => cb(prismaMock));
   });

   // ─── LIST ───
   describe("GET /api/users", () => {
      it("deve listar usuários", async () => {
         prismaMock.user.findMany.mockResolvedValue([mockUser]);
         const res = await request(app).get("/api/users");
         expect(res.status).toBe(200);
         expect(res.body[0].farmName).toBe("Fazenda Teste");
      });

      it("deve listar com filtros", async () => {
         prismaMock.user.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/users?role=veterinarian&active=true&search=João");
         expect(res.status).toBe(200);
      });

      it("deve listar com active=false", async () => {
         prismaMock.user.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/users?active=false");
         expect(res.status).toBe(200);
      });

      it("deve propagar erro de list", async () => {
         prismaMock.user.findMany.mockRejectedValue(new Error("DB error"));
         const res = await request(app).get("/api/users");
         expect(res.status).toBe(500);
      });
   });

   // ─── ME ───
   describe("GET /api/users/me", () => {
      it("deve retornar perfil autenticado", async () => {
         prismaMock.user.findFirst.mockResolvedValue(mockUser);
         const res = await request(app).get("/api/users/me");
         expect(res.status).toBe(200);
         expect(res.body.username).toBe("admin");
      });

      it("deve propagar erro de me", async () => {
         prismaMock.user.findFirst.mockRejectedValue(new Error("DB error"));
         const res = await request(app).get("/api/users/me");
         expect(res.status).toBe(500);
      });
   });

   // ─── FIND BY ID ───
   describe("GET /api/users/:id", () => {
      it("deve retornar usuário por ID", async () => {
         prismaMock.user.findFirst.mockResolvedValue(mockUser);
         const res = await request(app).get(`/api/users/${TEST_USER_ID}`);
         expect(res.status).toBe(200);
      });

      it("deve retornar 404", async () => {
         prismaMock.user.findFirst.mockResolvedValue(null);
         const res = await request(app).get("/api/users/bad-id");
         expect(res.status).toBe(404);
      });
   });

   // ─── CREATE ───
   describe("POST /api/users", () => {
      it("deve criar usuário como admin", async () => {
         prismaMock.user.findUnique.mockResolvedValue(null);
         prismaMock.user.findFirst.mockResolvedValue(null);
         prismaMock.user.create.mockResolvedValue(mockUser);
         const res = await request(app).post("/api/users").send(validCreate);
         expect(res.status).toBe(201);
      });

      it("admin sem farmId retorna 400", async () => {
         const res = await request(app)
            .post("/api/users")
            .send({ ...validCreate, farmId: undefined });
         expect(res.status).toBe(400);
      });

      it("owner pode criar veterinarian", async () => {
         vi.mocked(protectRoute).mockImplementationOnce((req: any, _res: any, next: any) => {
            req.userId = "owner-id";
            req.role = "owner";
            req.farmId = TEST_FARM_ID;
            req.permissions = ["create_user"];
            next();
         });
         prismaMock.user.findUnique.mockResolvedValue(null);
         prismaMock.user.findFirst.mockResolvedValue(null);
         prismaMock.user.create.mockResolvedValue(mockUser);
         const res = await request(app)
            .post("/api/users")
            .send({ ...validCreate, farmId: undefined, role: "veterinarian" });
         expect(res.status).toBe(201);
      });

      it("owner não pode criar admin", async () => {
         vi.mocked(protectRoute).mockImplementationOnce((req: any, _res: any, next: any) => {
            req.userId = "owner-id";
            req.role = "owner";
            req.farmId = TEST_FARM_ID;
            req.permissions = ["create_user"];
            next();
         });
         const res = await request(app)
            .post("/api/users")
            .send({ ...validCreate, role: "admin" });
         expect(res.status).toBe(403);
      });

      it("farmmanager pode criar veterinarian", async () => {
         vi.mocked(protectRoute).mockImplementationOnce((req: any, _res: any, next: any) => {
            req.userId = "mgr-id";
            req.role = "farmmanager";
            req.farmId = TEST_FARM_ID;
            req.permissions = ["create_user"];
            next();
         });
         prismaMock.user.findUnique.mockResolvedValue(null);
         prismaMock.user.findFirst.mockResolvedValue(null);
         prismaMock.user.create.mockResolvedValue(mockUser);
         const res = await request(app)
            .post("/api/users")
            .send({ ...validCreate, farmId: undefined, role: "veterinarian" });
         expect(res.status).toBe(201);
      });

      it("farmmanager não pode criar owner", async () => {
         vi.mocked(protectRoute).mockImplementationOnce((req: any, _res: any, next: any) => {
            req.userId = "mgr-id";
            req.role = "farmmanager";
            req.farmId = TEST_FARM_ID;
            req.permissions = ["create_user"];
            next();
         });
         const res = await request(app)
            .post("/api/users")
            .send({ ...validCreate, role: "owner" });
         expect(res.status).toBe(403);
      });

      it("veterinarian não pode criar usuários", async () => {
         vi.mocked(protectRoute).mockImplementationOnce((req: any, _res: any, next: any) => {
            req.userId = "vet-id";
            req.role = "veterinarian";
            req.farmId = TEST_FARM_ID;
            req.permissions = [];
            next();
         });
         const res = await request(app)
            .post("/api/users")
            .send({ ...validCreate, role: "veterinarian" });
         expect(res.status).toBe(403);
      });

      it("deve 409 para username duplicado", async () => {
         prismaMock.user.findUnique.mockResolvedValue(mockUser);
         const res = await request(app).post("/api/users").send(validCreate);
         expect(res.status).toBe(409);
      });

      it("deve 409 para email duplicado", async () => {
         prismaMock.user.findUnique.mockResolvedValue(null);
         prismaMock.user.findFirst.mockResolvedValue(mockUser);
         const res = await request(app).post("/api/users").send(validCreate);
         expect(res.status).toBe(409);
      });

      // Validator create
      it("erro: fullName curto", async () => {
         const res = await request(app).post("/api/users").send({ ...validCreate, fullName: "AB" });
         expect(res.status).toBe(500);
      });

      it("erro: username curto", async () => {
         const res = await request(app).post("/api/users").send({ ...validCreate, username: "AB" });
         expect(res.status).toBe(500);
      });

      it("erro: username caracteres inválidos", async () => {
         const res = await request(app).post("/api/users").send({ ...validCreate, username: "user @!" });
         expect(res.status).toBe(500);
      });

      it("erro: email inválido", async () => {
         const res = await request(app).post("/api/users").send({ ...validCreate, email: "invalid" });
         expect(res.status).toBe(500);
      });

      it("erro: senha curta", async () => {
         const res = await request(app).post("/api/users").send({ ...validCreate, password: "Ab@1" });
         expect(res.status).toBe(500);
      });

      it("erro: senha fraca", async () => {
         const res = await request(app).post("/api/users").send({ ...validCreate, password: "abcdefgh" });
         expect(res.status).toBe(500);
      });

      it("erro: role inválido", async () => {
         const res = await request(app).post("/api/users").send({ ...validCreate, role: "superadmin" });
         expect(res.status).toBe(500);
      });

      it("erro: telefone inválido", async () => {
         const res = await request(app).post("/api/users").send({ ...validCreate, phone: "abc" });
         expect(res.status).toBe(500);
      });
   });

   // ─── UPDATE ───
   describe("PUT /api/users/:id", () => {
      it("deve atualizar usuário", async () => {
         prismaMock.user.findFirst.mockResolvedValue(mockUser);
         prismaMock.user.update.mockResolvedValue({ ...mockUser, fullName: "Novo Nome" });
         const res = await request(app).put(`/api/users/${TEST_USER_ID}`).send({ fullName: "Novo Nome" });
         expect(res.status).toBe(200);
      });

      it("deve 409 para username conflitante", async () => {
         prismaMock.user.findFirst
            .mockResolvedValueOnce(mockUser) // findById
            .mockResolvedValueOnce({ ...mockUser, id: "other" }); // conflito username
         prismaMock.user.update.mockResolvedValue(mockUser);
         const res = await request(app).put(`/api/users/${TEST_USER_ID}`).send({ username: "outro.user" });
         expect(res.status).toBe(409);
      });

      it("deve 409 para email conflitante", async () => {
         prismaMock.user.findFirst
            .mockResolvedValueOnce(mockUser) // findById
            .mockResolvedValueOnce(null) // username ok
            .mockResolvedValueOnce({ ...mockUser, id: "other" }); // conflito email
         const res = await request(app).put(`/api/users/${TEST_USER_ID}`).send({ username: "novo", email: "outro@teste.com" });
         expect(res.status).toBe(409);
      });

      it("deve 403 para veterinário atualizando outro usuário", async () => {
         vi.mocked(protectRoute).mockImplementationOnce((req: any, _res: any, next: any) => {
            req.userId = "vet-id";
            req.role = "veterinarian";
            req.farmId = TEST_FARM_ID;
            next();
         });
         const res = await request(app).put(`/api/users/outro-id`).send({ fullName: "Novo" });
         expect(res.status).toBe(403);
      });

      it("deve 403 para role maior ou igual", async () => {
         vi.mocked(protectRoute).mockImplementationOnce((req: any, _res: any, next: any) => {
            req.userId = "manager-id";
            req.role = "farmmanager";
            req.farmId = TEST_FARM_ID;
            next();
         });
         const res = await request(app).put(`/api/users/${TEST_USER_ID}`).send({ role: "owner" });
         expect(res.status).toBe(403);
      });

      // Validator update
      it("erro update: fullName curto", async () => {
         const res = await request(app).put(`/api/users/${TEST_USER_ID}`).send({ fullName: "AB" });
         expect(res.status).toBe(500);
      });

      it("erro update: username curto", async () => {
         const res = await request(app).put(`/api/users/${TEST_USER_ID}`).send({ username: "AB" });
         expect(res.status).toBe(500);
      });

      it("erro update: username caracteres inválidos", async () => {
         const res = await request(app).put(`/api/users/${TEST_USER_ID}`).send({ username: "bad user!" });
         expect(res.status).toBe(500);
      });

      it("erro update: email inválido", async () => {
         const res = await request(app).put(`/api/users/${TEST_USER_ID}`).send({ email: "bad" });
         expect(res.status).toBe(500);
      });

      it("erro update: role inválido", async () => {
         const res = await request(app).put(`/api/users/${TEST_USER_ID}`).send({ role: "xxx" });
         expect(res.status).toBe(500);
      });

      it("erro update: phone inválido", async () => {
         const res = await request(app).put(`/api/users/${TEST_USER_ID}`).send({ phone: "abc" });
         expect(res.status).toBe(500);
      });

      it("deve propagar erro do update service", async () => {
         prismaMock.user.findFirst.mockRejectedValue(new Error("DB error"));
         const res = await request(app).put(`/api/users/${TEST_USER_ID}`).send({ fullName: "Nome Novo" });
         expect(res.status).toBe(500);
      });
   });

   // ─── ACTIVATE / DEACTIVATE ───
   describe("PATCH /api/users/:id/activate", () => {
      it("deve ativar usuário", async () => {
         prismaMock.user.findFirst.mockResolvedValue(mockUser);
         prismaMock.user.update.mockResolvedValue({ ...mockUser, active: true });
         const res = await request(app).patch(`/api/users/${TEST_USER_ID}/activate`);
         expect(res.status).toBe(200);
      });

      it("deve propagar erro de activate", async () => {
         prismaMock.user.findFirst.mockRejectedValue(new Error("DB error"));
         const res = await request(app).patch(`/api/users/${TEST_USER_ID}/activate`);
         expect(res.status).toBe(500);
      });
   });

   describe("PATCH /api/users/:id/deactivate", () => {
      it("deve desativar usuário", async () => {
         prismaMock.user.findFirst.mockResolvedValue(mockUser);
         prismaMock.user.update.mockResolvedValue({ ...mockUser, active: false });
         const res = await request(app).patch(`/api/users/${TEST_USER_ID}/deactivate`);
         expect(res.status).toBe(200);
      });

      it("deve propagar erro de deactivate", async () => {
         prismaMock.user.findFirst.mockRejectedValue(new Error("DB error"));
         const res = await request(app).patch(`/api/users/${TEST_USER_ID}/deactivate`);
         expect(res.status).toBe(500);
      });
   });

   // ─── CHANGE PASSWORD ───
   describe("PATCH /api/users/me/change-password", () => {
      it("deve alterar senha com sucesso", async () => {
         prismaMock.user.findFirst.mockResolvedValue({ ...mockUser, password: "hashed" });
         vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
         prismaMock.user.update.mockResolvedValue(mockUser);

         const res = await request(app).patch("/api/users/me/change-password").send({
            currentPassword: "Velha@1234",
            newPassword: "Nova@12345",
         });
         expect(res.status).toBe(200);
      });

      it("deve rejeitar senha atual incorreta", async () => {
         prismaMock.user.findFirst.mockResolvedValue({ ...mockUser, password: "hashed" });
         vi.mocked(bcrypt.compare).mockResolvedValue(false as never);
         const res = await request(app).patch("/api/users/me/change-password").send({
            currentPassword: "senha_errada",
            newPassword: "Nova@1234",
         });
         expect(res.status).toBe(401);
      });

      it("erro: senha atual ausente", async () => {
         const res = await request(app).patch("/api/users/me/change-password").send({ newPassword: "Nova@1234" });
         expect(res.status).toBe(500);
      });

      it("erro: nova senha curta", async () => {
         const res = await request(app).patch("/api/users/me/change-password").send({
            currentPassword: "Velha@1234",
            newPassword: "Ab@1",
         });
         expect(res.status).toBe(500);
      });

      it("erro: senhas iguais", async () => {
         const res = await request(app).patch("/api/users/me/change-password").send({
            currentPassword: "Teste@1234",
            newPassword: "Teste@1234",
         });
         expect(res.status).toBe(500);
      });

      it("erro: nova senha sem caracteres especiais", async () => {
         const res = await request(app).patch("/api/users/me/change-password").send({
            currentPassword: "Velha@1234",
            newPassword: "Abcdefgh1",
         });
         expect(res.status).toBe(500);
      });
   });

   // ─── ADMIN RESET PASSWORD ───
   describe("PATCH /api/users/:id/reset-password", () => {
      it("deve redefinir senha", async () => {
         prismaMock.user.findFirst.mockResolvedValue(mockUser);
         prismaMock.user.update.mockResolvedValue(mockUser);
         const res = await request(app).patch(`/api/users/${TEST_USER_ID}/reset-password`).send({
            newPassword: "Nova@12345",
         });
         expect(res.status).toBe(200);
      });

      it("erro: senha fraca", async () => {
         const res = await request(app).patch(`/api/users/${TEST_USER_ID}/reset-password`).send({
            newPassword: "fraca",
         });
         expect(res.status).toBe(500);
      });

      it("erro: senha sem caracteres especiais", async () => {
         const res = await request(app).patch(`/api/users/${TEST_USER_ID}/reset-password`).send({
            newPassword: "Abcdefg1",
         });
         expect(res.status).toBe(500);
      });
   });

   // ─── DELETE ───
   describe("DELETE /api/users/:id", () => {
      it("deve remover usuário", async () => {
         prismaMock.user.findFirst.mockResolvedValue({ ...mockUser, id: "other-user-id" });
         prismaMock.user.delete.mockResolvedValue(mockUser);
         const res = await request(app).delete("/api/users/other-user-id");
         expect(res.status).toBe(204);
      });

      it("deve impedir auto-exclusão", async () => {
         prismaMock.user.findFirst.mockResolvedValue(mockUser);
         const res = await request(app).delete(`/api/users/${TEST_USER_ID}`);
         expect(res.status).toBe(400);
      });

      it("deve 404 para user inexistente", async () => {
         prismaMock.user.findFirst.mockResolvedValue(null);
         const res = await request(app).delete("/api/users/bad-id");
         expect(res.status).toBe(404);
      });
   });
});
