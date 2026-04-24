import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/config/env";
import type { JwtPayload } from "../types/jwt.types";

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

export function protectRoute(req: Request, res: Response, next: NextFunction) {
   try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer")) {
         return res.status(401).json({
            error: "Token not provided",
         });
      }

      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      req.userId = decoded.userId;
      req.farmId = decoded.farmId;
      req.role = decoded.role;
      req.permissions = decoded.permissions;

      next();
   } catch (error) {
      return res.status(401).json({
         error: "Invalid or expired token",
      });
   }
}

export function requirePermission(permission: string) {
   return (req: Request, res: Response, next: NextFunction) => {
      if (!req.permissions?.includes(permission)) {
         return res.status(403).json({
            error: `Insufficient permission: ${permission}`,
            your_role: req.role,
         });
      }
      next();
   };
}
