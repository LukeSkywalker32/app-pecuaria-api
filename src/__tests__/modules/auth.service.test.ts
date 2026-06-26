import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock } = vi.hoisted(() => ({
   prismaMock: {
      user: {
         findFirst: vi.fn(),
         findUnique: vi.fn(),
         update: vi.fn(),
      },
      passwordResetToken: {
         findFirst: vi.fn(),
         updateMany: vi.fn(),
         create: vi.fn(),
         update: vi.fn(),
      },
   },
}));

vi.mock("@/config/database", () => ({ prisma: prismaMock }));
vi.mock("bcryptjs", () => ({
   default: {
      compare: vi.fn().mockResolvedValue(true),
      hash: vi.fn().mockResolvedValue("hashed"),
   },
}));
vi.mock("jsonwebtoken", () => ({
   default: {
      sign: vi.fn().mockReturnValue("signed-token"),
      verify: vi.fn().mockReturnValue({ userId: "user-1", role: "admin" }),
   },
}));

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authService from "@/modules/auth/services/auth.service";

describe("AuthService", () => {
   beforeEach(() => {
      vi.clearAllMocks();
   });

   it("deve validar entrada de adminLogin e falhar para username curto", async () => {
      await expect(authService.adminLogin({ username: "ab", password: "123456" })).rejects.toThrow(
         "Username deve ter no mínimo 3 caracteres",
      );
   });

   it("deve validar entrada de adminLogin e falhar para senha curta", async () => {
      await expect(authService.adminLogin({ username: "admin", password: "123" })).rejects.toThrow(
         "Senha deve ter no mínimo 6 caracteres",
      );
   });

   it("deve falhar adminLogin quando usuário não existe", async () => {
      prismaMock.user.findFirst.mockResolvedValue(null);
      await expect(
         authService.adminLogin({ username: "admin", password: "123456" }),
      ).rejects.toThrow("Credenciais inválidas");
   });

   it("deve falhar adminLogin quando senha estiver incorreta", async () => {
      prismaMock.user.findFirst.mockResolvedValue({
         id: "user-1",
         password: "hash",
         username: "admin",
         role: "admin",
         farmId: "farm-sistema",
         active: true,
      });
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);
      await expect(
         authService.adminLogin({ username: "admin", password: "123456" }),
      ).rejects.toThrow("Credenciais inválidas");
   });

   it("deve realizar adminLogin com sucesso", async () => {
      prismaMock.user.findFirst.mockResolvedValue({
         id: "user-1",
         password: "hash",
         username: "admin",
         role: "admin",
         farmId: "farm-sistema",
         active: true,
      });
      prismaMock.user.update.mockResolvedValue({});
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
      const response = await authService.adminLogin({ username: "admin", password: "123456" });
      expect(response.accessToken).toBeDefined();
      expect(response.refreshToken).toBeDefined();
      expect(prismaMock.user.update).toHaveBeenCalled();
   });

   it("deve falhar login quando usuário não existe na fazenda", async () => {
      prismaMock.user.findFirst.mockResolvedValue(null);
      await expect(
         authService.login({ farmId: "farm-a", username: "admin", password: "123456" } as any),
      ).rejects.toThrow("Usuario não encontrado nesta fazenda");
   });

   it("deve falhar login quando senha estiver incorreta", async () => {
      prismaMock.user.findFirst.mockResolvedValue({
         id: "user-1",
         password: "hash",
         username: "admin",
         role: "admin",
         farmId: "farm-a",
         active: true,
      });
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);
      await expect(
         authService.login({ farmId: "farm-a", username: "admin", password: "123456" } as any),
      ).rejects.toThrow("Senha incorreta");
   });

   it("deve completar login com sucesso", async () => {
      prismaMock.user.findFirst.mockResolvedValue({
         id: "user-1",
         password: "hash",
         username: "admin",
         role: "admin",
         farmId: "farm-a",
         active: true,
         email: "a@b.com",
      });
      prismaMock.user.update.mockResolvedValue({});
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
      const response = await authService.login({
         farmId: "farm-a",
         username: "admin",
         password: "123456",
      } as any);
      expect(response.role).toBe("admin");
      expect(prismaMock.user.update).toHaveBeenCalled();
   });

   it("deve preservar erro de usuário inativo no renewToken", async () => {
      vi.mocked(jwt.verify).mockReturnValue({ userId: "user-1" } as any);
      prismaMock.user.findUnique.mockResolvedValue({
         id: "user-1",
         active: false,
         farmId: "farm-a",
         username: "admin",
         role: "admin",
         email: "a@b.com",
      });
      await expect(authService.renewToken("refresh-token")).rejects.toMatchObject({
         statusCode: 400,
         message: "Usuario inativo",
      });
   });

   it("deve preservar erro de usuário não encontrado no renewToken", async () => {
      vi.mocked(jwt.verify).mockReturnValue({ userId: "user-1" } as any);
      prismaMock.user.findUnique.mockResolvedValue(null);
      await expect(authService.renewToken("refresh-token")).rejects.toMatchObject({
         statusCode: 400,
         message: "Usuário não encontrado",
      });
   });

   it("deve renovar token com sucesso", async () => {
      vi.mocked(jwt.verify).mockReturnValue({ userId: "user-1" } as any);
      prismaMock.user.findUnique.mockResolvedValue({
         id: "user-1",
         active: true,
         farmId: "farm-a",
         username: "admin",
         role: "admin",
         email: "a@b.com",
      });
      const response = await authService.renewToken("refresh-token");
      expect(response.accessToken).toBeDefined();
      expect(response.refreshToken).toBeDefined();
   });

   it("deve ignorar forgotPassword quando usuário não existir", async () => {
      prismaMock.user.findFirst.mockResolvedValue(null);
      await expect(
         authService.forgotPassword({ farmId: "farm-a", email: "x@y.com" }),
      ).resolves.toBeUndefined();
   });

   it("deve criar token de reset e atualizar tokens antigos", async () => {
      prismaMock.user.findFirst.mockResolvedValue({ id: "user-1", email: "x@y.com" });
      prismaMock.passwordResetToken.updateMany.mockResolvedValue({ count: 1 });
      prismaMock.passwordResetToken.create.mockResolvedValue({} as any);
      await authService.forgotPassword({ farmId: "farm-a", email: "x@y.com" });
      expect(prismaMock.passwordResetToken.create).toHaveBeenCalled();
   });

   it("deve confirmar reset com sucesso", async () => {
      prismaMock.passwordResetToken.findFirst.mockResolvedValue({
         id: "token-1",
         userId: "user-1",
      } as any);
      prismaMock.user.findUnique.mockResolvedValue({ id: "user-1", email: "x@y.com" } as any);
      prismaMock.user.update.mockResolvedValue({});
      prismaMock.passwordResetToken.update.mockResolvedValue({});
      vi.mocked(bcrypt.hash).mockResolvedValue("hashed-new" as never);
      await authService.confirmReset({
         farmId: "farm-a",
         email: "x@y.com",
         code: "123456",
         newPassword: "New@1234",
      });
      expect(prismaMock.user.update).toHaveBeenCalled();
   });
});
