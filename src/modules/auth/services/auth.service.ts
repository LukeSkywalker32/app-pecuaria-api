/** biome-ignore-all lint/suspicious/noConsole: <explanation> */

import { randomInt } from "node:crypto";
import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/config/database";
import { jwtConfig } from "@/config/jwt";
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
         throw new Error("Usuario não encontrado nesta fazenda");
      }

      // 4. Validate password
      const isPasswordCorrect = await bcrypt.compare(request.password, user.password);

      if (!isPasswordCorrect) {
         throw new Error("Senha incorreta");
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
         if (!user) {
            throw new Error("Usuário não encontrado");
         }

         if (!user?.active) {
            throw new Error("Usuario inativo");
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

      //Nao importa se email existe - evita enumeração de usuarios
      if (!user) return;
      // Valida tokens anteriores antes de criar novo
      await prisma.passwordResetToken.updateMany({
         where: {
            userId: user.id,
            used: false,
         },
         data: { used: true },
      });

      // 4. Save token in DB (valid for 15 minutes)
      const code = randomInt(100000, 999999).toString();
      const expiration = new Date(Date.now() + 15 * 60 * 1000);

      await prisma.passwordResetToken.create({
         data: {
            userId: user.id,
            farmId: request.farmId,
            code,
            expiresAt: expiration,
         },
      });
      // TODO: implementar envio real por email
      // await emailService.sendResetCode(user.email, code);

      // Log apenas em desenvolvimento — nunca em produção
      if (process.env.NODE_ENV === "development") {
         console.log(`[DEV] Código de reset para ${user.email}: ${code}`);
      }
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
               gt: new Date(), // O token ainda é válido?
            },
         },
      });

      if (!resetToken) {
         throw Object.assign(new Error("Código invalido ou expirado"), {
            statusCode: 400,
         });
      }

      // 3. Search user
      const user = await prisma.user.findUnique({
         where: { id: resetToken.userId },
      });

      if (!user || user.email !== request.email) {
         throw new Error("Dados incorretos");
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
   }

   // ==================== PRIVATE METHODS ====================

   private getTokenData(user: User): UserTokenData {
      return {
         userId: user.id,
         farmId: user.farmId,
         username: user.username,
         email: user.email,
         role: user.role,
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
      };

      const accessToken = jwt.sign(payload, jwtConfig.secret, {
         expiresIn: jwtConfig.expiresIn as jwt.SignOptions["expiresIn"],
      });

      const refreshToken = jwt.sign(payload, jwtConfig.refreshSecret, {
         expiresIn: jwtConfig.refreshExpiresIn as jwt.SignOptions["expiresIn"],
      });

      return { accessToken, refreshToken };
   }
}

export default new AuthService();
