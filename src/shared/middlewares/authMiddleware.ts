import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/config/env";
import type { JwtPayload } from "../types/jwt.types";

declare global {
	namespace Express {
		interface Request {
			userId?: string;
			herdId?: string;
			role?: string;
			permissoes?: string[];
		}
	}
}

export function protectRoute(req: Request, res: Response, next: NextFunction) {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer")) {
			return res.status(401).json({
				erro: "Token não fornecido",
			});
		}

		const token = authHeader.substring(7);
		const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

		req.userId = decoded.userId;
		req.herdId = decoded.herdId;
		req.role = decoded.role;
		req.permissoes = decoded.permissoes;

		next();
	} catch (error) {
		return res.status(401).json({
			erro: "Token inválido ou expirado",
		});
	}
}

export function requirePermission(permissao: string) {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.permissoes?.includes(permissao)) {
			return res.status(403).json({
				erro: `Permissão insuficiente: ${permissao}`,
				seu_role: req.role,
			});
		}
		next();
	};
}
