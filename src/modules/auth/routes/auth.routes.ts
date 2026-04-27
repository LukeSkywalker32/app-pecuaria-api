// ========================================
// AUTHENTICATION ROUTES
// ========================================

import { Router } from "express";
import authController from "../controllers/auth.controller";
import {
   validateConfirmReset,
   validateForgotPassword,
   validateLogin,
} from "../validators/auth.validator";

const authRoutes = Router();

/**
 * POST /api/auth/login
 * User login
 * Body: { farmId, fullName, password }
 */
authRoutes.post("/login", validateLogin, authController.login.bind(authController));

/**
 * POST /api/auth/renew-token
 * Renews access token using refresh token
 * Body: { refreshToken }
 */
authRoutes.post("/renew-token", authController.renewToken.bind(authController));

/**
 * POST /api/auth/forgot-password
 * Initiates password reset process
 * Body: { farmId, email }
 */
authRoutes.post(
   "/forgot-password",
   validateForgotPassword,
   authController.forgotPassword.bind(authController),
);

/**
 * POST /api/auth/confirm-reset
 * Confirms reset with code
 * Body: { farmId, email, code, newPassword }
 */
authRoutes.post(
   "/confirm-reset",
   validateConfirmReset,
   authController.confirmReset.bind(authController),
);

export default authRoutes;
