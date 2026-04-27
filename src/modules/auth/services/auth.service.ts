// ========================================
/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
// AUTHENTICATION SERVICE
// ========================================

import { prisma } from "@config/database";
import { jwtConfig } from "@config/jwt";
import type { User } from "@prisma/client";
import { ROLES_PERMISSIONS } from "@shared/constants/permissions";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type {
   AuthenticationResponse,
   ConfirmResetRequest,
   ForgotPasswordRequest,
   LoginRequest,
   UserTokenData,
} from "../types/auth.types";
import {
   validateConfirmReset,
   validateForgotPassword,
   validateLogin,
} from "../validators/auth.validator";

class AuthService {
   async login(request: LoginRequest): Promise<AuthenticationResponse> {
      // 1. Validate input
      validateLogin(request);

      // 2. Search user in DB
      const user = await prisma.user.findFirst({
         where: {
            farmId: request.farmId,
            username: request.username,
            active: true,
         },
      });

      // 3. Validate if user exists
      if (!user) {
         throw new Error("User not found in this farm");
      }

      // 4. Validate password
      const isPasswordCorrect = await bcrypt.compare(request.password, user.password);

      if (!isPasswordCorrect) {
         throw new Error("Incorrect password");
      }

      // 5. Generate tokens
      const data = this.getTokenData(user);
      const { accessToken, refreshToken } = this.generateTokens(data);

      // 6. Update last login
      await prisma.user.update({
         where: { id: user.id },
         data: { lastLogin: new Date() },
      });

      // 7. Return response
      return {
         accessToken,
         refreshToken,
         userId: user.id,
         username: user.username,
         role: user.role,
         expiresIn: jwtConfig.expiresIn,
      };
   }

   /**
    * Renews access token using refresh token
    */
   async renewToken(refreshToken: string): Promise<AuthenticationResponse> {
      try {
         // 1. Validate refresh token
         const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecret) as UserTokenData;

         // 2. Search user
         const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
         });

         if (!user?.active) {
            throw new Error("User not found or inactive");
         }

         // 3. Generate new access token
         const data = this.getTokenData(user);
         const { accessToken, refreshToken: newRefreshToken } = this.generateTokens(data);

         return {
            accessToken,
            refreshToken: newRefreshToken,
            userId: user.id,
            username: user.username,
            role: user.role,
            expiresIn: jwtConfig.expiresIn,
         };
      } catch (error) {
         throw new Error("Invalid or expired refresh token");
      }
   }

   /**
    * Starts password reset process
    * Sends email with 6 digit code
    */
   async forgotPassword(request: ForgotPasswordRequest): Promise<void> {
      // 1. Validate input
      validateForgotPassword(request);

      // 2. Search user
      const user = await prisma.user.findFirst({
         where: {
            farmId: request.farmId,
            email: request.email,
         },
      });

      if (!user) {
         // ❌ DO NOT inform if email exists or not (security)
         console.log(`Email not found: ${request.email}`);
         return;
      }

      // 3. Generate 6 digit code
      const code = this.generateResetCode();

      // 4. Save token in DB (valid for 15 minutes)
      const expiration = new Date(Date.now() + 15 * 60 * 1000);

      await prisma.passwordResetToken.create({
         data: {
            userId: user.id,
            farmId: request.farmId,
            code,
            expiresAt: expiration,
         },
      });

      // 5. Send email (implement later)
      // await emailService.sendResetCode(user.email, code);

      console.log(`[DEV] Reset code for ${user.email}: ${code}`);
   }

   /**
    * Confirms password reset with code
    */
   async confirmReset(request: ConfirmResetRequest): Promise<void> {
      // 1. Validate input
      validateConfirmReset(request);

      // 2. Search token
      const resetToken = await prisma.passwordResetToken.findFirst({
         where: {
            code: request.code,
            farmId: request.farmId,
            used: false,
            expiresAt: {
               gt: new Date(), // Is token still valid?
            },
         },
      });

      if (!resetToken) {
         throw new Error("Invalid or expired code");
      }

      // 3. Search user
      const user = await prisma.user.findUnique({
         where: { id: resetToken.userId },
      });

      if (!user || user.email !== request.email) {
         throw new Error("Data mismatch");
      }

      // 4. Hash new password
      const passwordHash = await bcrypt.hash(request.newPassword, 10);

      // 5. Update password and mark token as used
      await Promise.all([
         prisma.user.update({
            where: { id: user.id },
            data: { password: passwordHash },
         }),
         prisma.passwordResetToken.update({
            where: { id: resetToken.id },
            data: { used: true },
         }),
      ]);

      console.log(`Password reset for user: ${user.fullName}`);
   }

   // ==================== PRIVATE METHODS ====================

   /**
    * Extracts user data to place in JWT
    */
   private getTokenData(user: User): UserTokenData {
      const roleKey = user.role as keyof typeof ROLES_PERMISSIONS;
      const permissions = ROLES_PERMISSIONS[roleKey] || [];

      return {
         userId: user.id,
         farmId: user.farmId,
         username: user.username,
         email: user.email,
         role: user.role,
         permissions,
      };
   }

   /**
    * Generates access token + refresh token
    */
   private generateTokens(data: UserTokenData): {
      accessToken: string;
      refreshToken: string;
   } {
      const payload = {
         userId: data.userId,
         farmId: data.farmId,
         username: data.username,
         email: data.email,
         role: data.role,
         permissions: data.permissions,
      };

      const accessToken = jwt.sign(payload, jwtConfig.secret, {
         expiresIn: jwtConfig.expiresIn as jwt.SignOptions["expiresIn"],
      });

      const refreshToken = jwt.sign(payload, jwtConfig.refreshSecret, {
         expiresIn: jwtConfig.refreshExpiresIn as jwt.SignOptions["expiresIn"],
      });

      return { accessToken, refreshToken };
   }

   /**
    * Generates 6 digit code for reset
    */
   private generateResetCode(): string {
      return Math.floor(100000 + Math.random() * 900000).toString();
   }
}

export default new AuthService();
