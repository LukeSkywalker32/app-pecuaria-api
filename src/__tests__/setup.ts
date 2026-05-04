// ========================================
// SETUP GLOBAL DE TESTES
// Executado antes de cada arquivo de teste
// ========================================

import { vi } from "vitest";
import { ROLES_PERMISSIONS } from "../shared/constants/permissions";

// ─── Mock: Rate Limiter ───
// Sem esse mock, o rate limiter bloquearia requisições repetidas nos testes
// e os testes de auth dariam 429 Too Many Requests após 10 chamadas
vi.mock("@/shared/middlewares/rateLimiter", () => ({
   rateLimiter: vi.fn(() => (_req: any, _res: any, next: any) => next()),
   authRateLimiter: (_req: any, _res: any, next: any) => next(),
   forgotPasswordRateLimiter: (_req: any, _res: any, next: any) => next(),
}));

// ─── Mock: Auth Middleware ───
// Simula usuário admin autenticado em TODOS os testes
// Isso evita que cada teste precise gerar token JWT e mockar queries do middleware
// Para testar comportamentos de role específico, override no próprio teste
vi.mock("@/shared/middlewares/authMiddleware", () => ({
   protectRoute: vi.fn((req: any, _res: any, next: any) => {
      req.userId = "test-user-id";
      req.farmId = "test-farm-id";
      req.role = "admin";
      req.permissions = ROLES_PERMISSIONS.admin; // admin tem todas as permissões
      next();
   }),
   requirePermission: vi.fn((_permission: string) => (_req: any, _res: any, next: any) => next()),
   requireAnyPermission: vi.fn(
      (_permissions: string[]) => (_req: any, _res: any, next: any) => next(),
   ),
}));
