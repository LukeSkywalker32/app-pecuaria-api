// FARM SERVICE

import { prisma } from "@config/database";
import type { Farm, Prisma } from "@prisma/client";
import type {
   CreateFarmRequest,
   FarmResponse,
   ListFarmsQuery,
   UpdateFarmRequest,
} from "../types/farm.types";
import farmValidator from "../validators/farm.validators";

const PUBLIC_FARM_SELECT = {
   id: true,
   name: true,
   location: true,
   cnpj: true,
   logoUrl: true,
   active: true,
   createdAt: true,
   updatedAt: true,
} satisfies Prisma.FarmSelect;

class FarmService {
   // 1 - Criar uma fazenda
   async create(data: CreateFarmRequest): Promise<FarmResponse> {
      farmValidator.validateCreate(data);
      // 1.1 Validar campos
      const nameInUse = await prisma.farm.findFirst({
         where: {
            name: { equals: data.name.trim(), mode: "insensitive" },
         },
      });
      if (nameInUse) {
         throw Object.assign(new Error("Nome da fazenda já em uso"), { statusCode: 409 });
      }
      const farm = await prisma.farm.create({
         data: {
            name: data.name.trim(),
            location: data.location.trim(),
            cnpj: data.cnpj.trim() ?? null,
         },
         select: PUBLIC_FARM_SELECT,
      });
      return farm;
   }

   // 2 - Listar todas as fazendas
   //admin = todos
   //owner/outros  = somente as suas fazendas
   async list(
      callerRole: string,
      callerFarmId: string,
      query: ListFarmsQuery,
   ): Promise<FarmResponse[]> {
      // Não-Admin só ve a propria fazenda
      if (callerRole !== "admin") {
         const farm = await this.findById(callerFarmId, callerRole, callerFarmId);
         return [farm];
      }
      const where: Prisma.FarmWhereInput = {};
      if (query.active !== undefined) {
         where.active = query.active;
      }
      if (query.search) {
         const term = query.search.trim();
         where.OR = [
            { name: { contains: term, mode: "insensitive" } },
            { location: { contains: term, mode: "insensitive" } },
            { cnpj: { contains: term, mode: "insensitive" } },
         ];
      }
      return prisma.farm.findMany({
         where,
         select: PUBLIC_FARM_SELECT,
         orderBy: { name: "asc" },
      });
   }

   // 3 - Buscar uma fazenda pelo ID
   // Admin = todos
   // Owner/outros = somente a propria fazenda
   async findById(farmId: string, callerRole: string, callerFarmId: string): Promise<FarmResponse> {
      // Não-Admin só ve a propria fazenda
      if (callerRole !== "admin" && farmId !== callerFarmId) {
         throw Object.assign(new Error("Você não tem permissão para acessar essa fazenda"), {
            statusCode: 403,
         });
      }
      const farm = await prisma.farm.findUnique({
         where: { id: farmId },
         select: PUBLIC_FARM_SELECT,
      });
      if (!farm) {
         throw Object.assign(new Error("Fazenda não encontrada, entre contato com o suporte"), {
            statusCode: 404,
         });
      }
      return farm;
   }
   /**
    * Atualiza dados da fazenda
    * Admin: qualquer fazenda
    * Owner: apenas a própria
    */
   async update(
      farmId: string,
      callerRole: string,
      callerFarmId: string,
      data: UpdateFarmRequest,
   ): Promise<FarmResponse> {
      // Verifica acesso e existência
      await this.findById(farmId, callerRole, callerFarmId);

      farmValidator.validateUpdate(data);

      // Verifica conflito de nome (exceto a própria fazenda)
      if (data.name) {
         const conflict = await prisma.farm.findFirst({
            where: {
               name: { equals: data.name.trim(), mode: "insensitive" },
               NOT: { id: farmId },
            },
         });

         if (conflict) {
            throw Object.assign(new Error("A farm with this name already exists"), {
               statusCode: 409,
            });
         }
      }

      const updateData: Prisma.FarmUpdateInput = {};

      if (data.name) updateData.name = data.name.trim();
      if (data.location) updateData.location = data.location.trim();
      if (data.cnpj !== undefined) updateData.cnpj = data.cnpj?.trim() ?? null;

      return prisma.farm.update({
         where: { id: farmId },
         data: updateData,
         select: PUBLIC_FARM_SELECT,
      });
   }

   /**
    * Ativa ou desativa uma fazenda — apenas admin
    */
   async toggleActive(farmId: string, active: boolean): Promise<FarmResponse> {
      const farm = await prisma.farm.findUnique({ where: { id: farmId } });

      if (!farm) {
         throw Object.assign(new Error("Farm not found"), { statusCode: 404 });
      }

      return prisma.farm.update({
         where: { id: farmId },
         data: { active },
         select: PUBLIC_FARM_SELECT,
      });
   }

   //Faz upload da logo para o Cloudinary e salva a URL
   // Admin: qualquer fazenda | Owner: apenas a própria
   async uploadLogo(
      farmId: string,
      callerRole: string,
      callerFarmId: string,
      fileBuffer: Buffer,
      mimeType: string,
   ): Promise<FarmResponse> {
      // Verifica acesso e existência
      await this.findById(farmId, callerRole, callerFarmId);

      const logoUrl = await this.uploadToCloudinary(farmId, fileBuffer, mimeType);

      return prisma.farm.update({
         where: { id: farmId },
         data: { logoUrl },
         select: PUBLIC_FARM_SELECT,
      });
   }

   /**
    * Remove permanentemente uma fazenda — apenas admin
    * Cuidado: cascade deleta todos os registros relacionados (users, animals, etc.)
    */
   async remove(farmId: string): Promise<void> {
      const farm = await prisma.farm.findUnique({ where: { id: farmId } });

      if (!farm) {
         throw Object.assign(new Error("Farm not found"), { statusCode: 404 });
      }

      await prisma.farm.delete({ where: { id: farmId } });
   }

   // ==================== PRIVATE ====================

   /**
    * Envia o arquivo para o Cloudinary via API REST (sem SDK)
    * Usa upload autenticado com assinatura para garantir segurança
    */
   private async uploadToCloudinary(
      farmId: string,
      fileBuffer: Buffer,
      mimeType: string,
   ): Promise<string> {
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.CLOUDINARY_API_KEY;
      const apiSecret = process.env.CLOUDINARY_API_SECRET;

      if (!cloudName || !apiKey || !apiSecret) {
         throw Object.assign(
            new Error(
               "Cloudinary não está configurado. Defina a variável CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY e CLOUDINARY_API_SECRET",
            ),
            { statusCode: 500 },
         );
      }

      // Gera assinatura para upload autenticado
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const publicId = `farms/${farmId}/logo`;
      const paramsToSign = `overwrite=true&public_id=${publicId}&timestamp=${timestamp}`;
      const signature = await this.sign(paramsToSign, apiSecret);

      // Monta o FormData manualmente
      const base64 = fileBuffer.toString("base64");
      const dataUri = `data:${mimeType};base64,${base64}`;

      const formData = new FormData();
      formData.append("file", dataUri);
      formData.append("public_id", publicId);
      formData.append("overwrite", "true");
      formData.append("timestamp", timestamp);
      formData.append("api_key", apiKey);
      formData.append("signature", signature);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
         method: "POST",
         body: formData,
      });

      if (!response.ok) {
         const error = (await response.json()) as { error?: { message?: string } };
         throw Object.assign(
            new Error(`Cloudinary upload falhou: ${error?.error?.message ?? response.statusText}`),
            { statusCode: 502 },
         );
      }

      const result = (await response.json()) as { secure_url: string };

      return result.secure_url;
   }

   /**
    * Gera SHA-1 da string de parâmetros com o API secret
    * Usa a Web Crypto API nativa do Node 18+ (sem dependências extras)
    */
   private async sign(params: string, secret: string): Promise<string> {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secret);
      const msgData = encoder.encode(params);

      // Importa chave de assinatura
      const cryptoKey = await crypto.subtle.importKey(
         "raw",
         keyData,
         { name: "HMAC", hash: "SHA-1" },
         false,
         ["sign"],
      );

      // Gera assinatura
      const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, msgData);

      return Array.from(new Uint8Array(signatureBuffer))
         .map(b => b.toString(16).padStart(2, "0"))
         .join("");
   }
}

export default new FarmService();
