import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

// Unmock as they are mocked in setup.ts
vi.unmock("@/shared/middlewares/rateLimiter");
vi.unmock("@/shared/middlewares/authMiddleware");

const { prismaMock } = vi.hoisted(() => ({
   prismaMock: {
      user: { findUnique: vi.fn() },
      farm: { findUnique: vi.fn() },
   },
}));
vi.mock("@/config/database", () => ({ prisma: prismaMock }));

vi.mock("jsonwebtoken", () => ({
   default: { verify: vi.fn() },
}));

import jwt from "jsonwebtoken";
import {
   protectRoute,
   requirePermission,
   requireAnyPermission,
} from "@/shared/middlewares/authMiddleware";
import { rateLimiter } from "@/shared/middlewares/rateLimiter";

describe("Middlewares", () => {
   beforeEach(() => {
      vi.clearAllMocks();
   });

   describe("authMiddleware - protectRoute", () => {
      const mockReq = (authHeader?: string) => ({
         headers: { authorization: authHeader },
      } as any);
      const mockRes = () => {
         const res: any = {};
         res.status = vi.fn().mockReturnValue(res);
         res.json = vi.fn().mockReturnValue(res);
         return res;
      };
      const mockNext = vi.fn();

      it("deve retornar 401 se token não for enviado", async () => {
         const req = mockReq();
         const res = mockRes();
         await protectRoute(req, res, mockNext);
         expect(res.status).toHaveBeenCalledWith(401);
      });

      it("deve retornar 401 se token for invalido", async () => {
         const req = mockReq("Bearer invalid");
         const res = mockRes();
         vi.mocked(jwt.verify).mockImplementation(() => { throw new Error("Invalid"); });
         await protectRoute(req, res, mockNext);
         expect(res.status).toHaveBeenCalledWith(401);
      });

      it("deve retornar 401 se usuário não encontrado", async () => {
         const req = mockReq("Bearer valid");
         const res = mockRes();
         vi.mocked(jwt.verify).mockReturnValue({ userId: "1", role: "admin" } as any);
         prismaMock.user.findUnique.mockResolvedValue(null);
         
         await protectRoute(req, res, mockNext);
         expect(res.status).toHaveBeenCalledWith(401);
         expect(res.json).toHaveBeenCalledWith({ error: "Usuário não encontrado" });
      });

      it("deve retornar 401 se usuário inativo", async () => {
         const req = mockReq("Bearer valid");
         const res = mockRes();
         vi.mocked(jwt.verify).mockReturnValue({ userId: "1", role: "admin" } as any);
         prismaMock.user.findUnique.mockResolvedValue({ id: "1", active: false });
         
         await protectRoute(req, res, mockNext);
         expect(res.status).toHaveBeenCalledWith(401);
         expect(res.json).toHaveBeenCalledWith({ error: "Usuário Inativo" });
      });

      it("deve retornar 401 se farm não encontrada ou inativa", async () => {
         const req = mockReq("Bearer valid");
         const res = mockRes();
         vi.mocked(jwt.verify).mockReturnValue({ userId: "1", role: "admin", farmId: "f1" } as any);
         prismaMock.user.findUnique.mockResolvedValue({ id: "1", active: true });
         prismaMock.farm.findUnique.mockResolvedValue(null);
         
         await protectRoute(req, res, mockNext);
         expect(res.status).toHaveBeenCalledWith(401);
         expect(res.json).toHaveBeenCalledWith({ error: "Farm não encontrada ou inativa" });
      });

      it("deve chamar next se tudo estiver correto e preencher req", async () => {
         const req = mockReq("Bearer valid");
         const res = mockRes();
         vi.mocked(jwt.verify).mockReturnValue({ userId: "1", role: "admin", farmId: "f1" } as any);
         prismaMock.user.findUnique.mockResolvedValue({ id: "1", active: true });
         prismaMock.farm.findUnique.mockResolvedValue({ id: "f1", active: true });
         
         await protectRoute(req, res, mockNext);
         expect(mockNext).toHaveBeenCalled();
         expect(req.userId).toBe("1");
         expect(req.farmId).toBe("f1");
         expect(req.role).toBe("admin");
         expect(req.permissions?.length).toBeGreaterThan(0);
      });
   });

   describe("authMiddleware - permissions", () => {
      const mockRes = () => {
         const res: any = {};
         res.status = vi.fn().mockReturnValue(res);
         res.json = vi.fn().mockReturnValue(res);
         return res;
      };
      const mockNext = vi.fn();

      it("requirePermission: sucesso se tiver permissão", () => {
         const req = { permissions: ["CREATE_USER"], role: "admin" } as any;
         const middleware = requirePermission("CREATE_USER");
         middleware(req, mockRes(), mockNext);
         expect(mockNext).toHaveBeenCalled();
      });

      it("requirePermission: 403 se não tiver permissão", () => {
         const req = { permissions: [], role: "veterinarian" } as any;
         const res = mockRes();
         const middleware = requirePermission("CREATE_USER");
         middleware(req, res, mockNext);
         expect(res.status).toHaveBeenCalledWith(403);
      });

      it("requireAnyPermission: sucesso se tiver uma das permissões", () => {
         const req = { permissions: ["P2"], role: "admin" } as any;
         const middleware = requireAnyPermission(["P1", "P2"]);
         middleware(req, mockRes(), mockNext);
         expect(mockNext).toHaveBeenCalled();
      });

      it("requireAnyPermission: 403 se não tiver nenhuma", () => {
         const req = { permissions: ["P3"], role: "admin" } as any;
         const res = mockRes();
         const middleware = requireAnyPermission(["P1", "P2"]);
         middleware(req, res, mockNext);
         expect(res.status).toHaveBeenCalledWith(403);
      });
   });

   describe("rateLimiter", () => {
      beforeEach(() => {
         vi.useFakeTimers();
      });

      afterEach(() => {
         vi.useRealTimers();
      });

      const mockRes = () => {
         const res: any = {};
         res.setHeader = vi.fn();
         res.status = vi.fn().mockReturnValue(res);
         res.json = vi.fn().mockReturnValue(res);
         return res;
      };

      it("deve permitir requisições dentro do limite", () => {
         const limiter = rateLimiter({ windowMs: 1000, maxRequests: 2 });
         const req = { ip: "127.0.0.1", path: "/test" };
         const next = vi.fn();
         const res = mockRes();

         limiter(req, res, next);
         expect(next).toHaveBeenCalledTimes(1);

         limiter(req, res, next);
         expect(next).toHaveBeenCalledTimes(2);

         limiter(req, res, next);
         expect(res.status).toHaveBeenCalledWith(429);
      });

      it("deve reiniciar o limite apos o windowMs", () => {
         const limiter = rateLimiter({ windowMs: 1000, maxRequests: 1 });
         const req = { ip: "127.0.0.2", path: "/test2" };
         const next = vi.fn();
         const res = mockRes();

         limiter(req, res, next);
         expect(next).toHaveBeenCalledTimes(1);

         limiter(req, res, next);
         expect(res.status).toHaveBeenCalledWith(429);

         vi.advanceTimersByTime(1001);

         limiter(req, res, next);
         expect(next).toHaveBeenCalledTimes(2);
      });
   });
});
