// src/__tests__/modules/user.test.ts

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

describe("User Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      prismaMock.$transaction.mockImplementation(async (cb: any) => cb(prismaMock));
   });

   it("GET /api/users — deve listar usuários", async () => {
      prismaMock.user.findMany.mockResolvedValue([mockUser]);
      const res = await request(app).get("/api/users");
      expect(res.status).toBe(200);
      expect(res.body[0].farmName).toBe("Fazenda Teste");
   });

   it("GET /api/users/me — deve retornar perfil do usuário autenticado", async () => {
      prismaMock.user.findFirst.mockResolvedValue(mockUser);
      const res = await request(app).get("/api/users/me");
      expect(res.status).toBe(200);
      expect(res.body.username).toBe("admin");
   });

   it("GET /api/users/:id — deve retornar 404 para usuário inexistente", async () => {
      prismaMock.user.findFirst.mockResolvedValue(null);
      const res = await request(app).get("/api/users/id-inexistente");
      expect(res.status).toBe(404);
   });

   it("PATCH /api/users/:id/activate — deve ativar usuário", async () => {
      prismaMock.user.findFirst.mockResolvedValue(mockUser);
      prismaMock.user.update.mockResolvedValue({ ...mockUser, active: true });
      const res = await request(app).patch(`/api/users/${TEST_USER_ID}/activate`);
      expect(res.status).toBe(200);
   });

   it("PATCH /api/users/me/change-password — deve rejeitar senha atual incorreta", async () => {
      prismaMock.user.findFirst.mockResolvedValue(mockUser);
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

      const res = await request(app).patch("/api/users/me/change-password").send({
         currentPassword: "senha_errada",
         newPassword: "Nova@1234",
      });

      expect(res.status).toBe(401);
   });
});
