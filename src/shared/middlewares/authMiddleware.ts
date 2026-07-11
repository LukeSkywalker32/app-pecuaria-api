import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "@/config/database";
import { JWT_SECRET } from "@/config/env";
import { ROLES_PERMISSIONS } from "@/shared/constants/permissions";
import type { JwtPayload } from "@/shared/types/jwt.types";

declare global {
   namespace Express {
      interface Request {
         userId?: string;
         farmId?: string;
         role?: string;
         permissions?: string[];
      }
   }
}

export async function protectRoute(req: Request, res: Response, next: NextFunction) {
   try {
      const authHeader = req.headers.authorization;

      if (!authHeader?.startsWith("Bearer ")) {
         return res.status(401).json({ error: "token ausente" });
      }

      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      // Valida se o usuário ainda existe e está ativo
      const user = await prisma.user.findUnique({
         where: { id: decoded.userId },
         select: { id: true, active: true, farmId: true, role: true },
      });

      if (!user) {
         return res.status(401).json({ error: "Usuário não encontrado" });
      }
      if (!user.active) {
         return res.status(401).json({ error: "Usuário Inativo" });
      }

      // Valida farm — admin bypassa (farm-sistema está inativa intencionalmente)
      if (decoded.farmId && decoded.role !== "admin") {
         const farm = await prisma.farm.findUnique({
            where: { id: decoded.farmId },
            select: { id: true, active: true },
         });
         if (!farm || !farm.active) {
            return res.status(401).json({ error: "Farm não encontrada ou inativa" });
         }
      }

      // Preenche req com dados do token
      req.userId = decoded.userId;
      req.role = user.role;
      req.farmId = user.farmId;

      // ── Override de farmId para admin ──────────────────────────────────
      // Quando o admin seleciona uma fazenda no dropdown da sidebar,
      // o frontend envia X-Farm-Id em todas as requisições.
      // O middleware substitui req.farmId para que todos os services
      // retornem dados daquela fazenda transparentemente.
      if (decoded.role === "admin") {
         const overrideFarmId = req.headers["x-farm-id"] as string | undefined;
         if (overrideFarmId && overrideFarmId.trim() !== "") {
            req.farmId = overrideFarmId.trim();
         }
      }

      // Carrega permissões dinamicamente do servidor (ignora o que está no token)
      const roleKey = decoded.role as keyof typeof ROLES_PERMISSIONS;
      req.permissions = ROLES_PERMISSIONS[roleKey] || [];

      next();
   } catch (error) {
      return res.status(401).json({ error: "Token invalido ou expirado" });
   }
}

export function requirePermission(permission: string) {
   return (req: Request, res: Response, next: NextFunction) => {
      if (!req.permissions?.includes(permission)) {
         return res.status(403).json({
            error: `Permissão ${permission} não autorizada`,
            your_role: req.role,
         });
      }
      next();
   };
}

export function requireAnyPermission(permissions: string[]) {
   return (req: Request, res: Response, next: NextFunction) => {
      const hasAny = permissions.some(p => req.permissions?.includes(p));
      if (!hasAny) {
         return res.status(403).json({
            error: `Nenhuma das permissões necessárias: ${permissions.join(", ")}`,
            your_role: req.role,
         });
      }
      next();
   };
}
