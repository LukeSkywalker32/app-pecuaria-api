// ========================================
// AUTHENTICATION ROUTES
// ========================================

import { Router } from "express";
import { authRateLimiter, forgotPasswordRateLimiter } from "@/shared/middlewares/rateLimiter";
import authController from "../controllers/auth.controller";

const authRoutes = Router();

/**
 * POST /api/auth/login
 * User login
 * Body: { farmId, username, password }
 */
authRoutes.post("/login", authRateLimiter, authController.login.bind(authController));

/**
 * POST /api/auth/renew-token
 * Renews access token using refresh token
 * Body: { refreshToken }
 */
authRoutes.post("/renew-token", authRateLimiter, authController.renewToken.bind(authController));

/**
 * POST /api/auth/forgot-password
 * Initiates password reset process
 * Body: { farmId, email }
 */
authRoutes.post(
   "/forgot-password",
   forgotPasswordRateLimiter,
   authController.forgotPassword.bind(authController),
);

/**
 * POST /api/auth/confirm-reset
 * Confirms reset with code
 * Body: { farmId, email, code, newPassword }
 */
authRoutes.post(
   "/confirm-reset",
   forgotPasswordRateLimiter,
   authController.confirmReset.bind(authController),
);

export default authRoutes;
