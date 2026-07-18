import jwt from "jsonwebtoken";
import { prisma } from "@/config/database";
import { JWT_SECRET } from "@/config/env";
import { ROLES_PERMISSIONS } from "@/shared/constants/permissions";
export async function protectRoute(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({ error: "token ausente" });
        }
        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, JWT_SECRET);
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
        // Usa user.farmId (fresco do banco) e não decoded.farmId (do token),
        // pra não validar contra uma fazenda que o usuário já não pertence mais.
        if (user.farmId && user.role !== "admin") {
            const farm = await prisma.farm.findUnique({
                where: { id: user.farmId },
                select: { id: true, active: true },
            });
            if (!farm || !farm.active) {
                return res.status(401).json({ error: "Farm não encontrada ou inativa" });
            }
        }
        // Preenche req com dados FRESCOS do banco — não do token.
        // Se o role ou a farm do usuário mudarem depois do login (rebaixamento,
        // troca de fazenda, desativação), o efeito é imediato na próxima
        // requisição, em vez de só valer quando o token expirar.
        req.userId = decoded.userId;
        req.role = user.role;
        req.farmId = user.farmId;
        // ── Override de farmId para admin ──────────────────────────────────
        // Quando o admin seleciona uma fazenda no dropdown da sidebar,
        // o frontend envia X-Farm-Id em todas as requisições.
        // O middleware substitui req.farmId para que todos os services
        // retornem dados daquela fazenda transparentemente.
        if (user.role === "admin") {
            const overrideFarmId = req.headers["x-farm-id"];
            if (overrideFarmId && overrideFarmId.trim() !== "") {
                req.farmId = overrideFarmId.trim();
            }
        }
        // Carrega permissões dinamicamente do servidor, a partir do role fresco do banco
        const roleKey = user.role;
        req.permissions = ROLES_PERMISSIONS[roleKey] || [];
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Token invalido ou expirado" });
    }
}
export function requirePermission(permission) {
    return (req, res, next) => {
        if (!req.permissions?.includes(permission)) {
            return res.status(403).json({
                error: `Permissão ${permission} não autorizada`,
                your_role: req.role,
            });
        }
        next();
    };
}
export function requireAnyPermission(permissions) {
    return (req, res, next) => {
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
//# sourceMappingURL=authMiddleware.js.map