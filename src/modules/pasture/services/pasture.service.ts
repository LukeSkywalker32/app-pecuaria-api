// ========================================
// PASTURE SERVICE
// ========================================

import { prisma } from "@config/database";
import type { Prisma } from "@prisma-client";
import type {
   CreatePastureRequest,
   ListPasturesQuery,
   PastureResponse,
   PastureType,
   UpdatePastureRequest,
} from "../types/pasture.types";
import pastureValidator from "../validators/pasture.validator";

// Campos retornados em todas as queries
const PASTURE_SELECT = {
   id: true,
   name: true,
   hectares: true,
   type: true,
   animalCapacity: true,
   currentAnimals: true,
   active: true,
   farmId: true,
   createdAt: true,
   updatedAt: true,
} satisfies Prisma.PastureSelect;

// Calcula taxa de ocupação do pasto em %
function calcOccupancyRate(currentAnimals: number, animalCapacity: number): number {
   if (animalCapacity === 0) return 0;
   return Math.round((currentAnimals / animalCapacity) * 100);
}

// Adiciona occupancyRate ao resultado do banco
function formatPasture(pasture: Omit<PastureResponse, "occupancyRate">): PastureResponse {
   return {
      ...pasture,
      occupancyRate: calcOccupancyRate(pasture.currentAnimals, pasture.animalCapacity),
   };
}

class PastureService {
   /**
    * Cria um novo pasto na fazenda
    * Permissão: create_pasture (owner, farmmanager, admin)
    */
   async create(farmId: string, data: CreatePastureRequest): Promise<PastureResponse> {
      // 1. Validar campos
      pastureValidator.validateCreate(data);

      // 2. Verificar nome único dentro da fazenda
      const nameInUse = await prisma.pasture.findFirst({
         where: {
            farmId,
            name: { equals: data.name.trim(), mode: "insensitive" },
         },
      });

      if (nameInUse) {
         throw Object.assign(new Error("Já existe um pasto com esse nome nesta fazenda"), {
            statusCode: 409,
         });
      }

      // 3. Criar pasto
      const pasture = await prisma.pasture.create({
         data: {
            farmId,
            name: data.name.trim(),
            hectares: data.hectares,
            type: data.type,
            animalCapacity: data.animalCapacity,
         },
         select: PASTURE_SELECT,
      });

      return formatPasture(pasture);
   }

   /**
    * Lista todos os pastos da fazenda
    * Suporta filtro por tipo, status e busca por nome
    */
   async list(farmId: string, query: ListPasturesQuery): Promise<PastureResponse[]> {
      const where: Prisma.PastureWhereInput = { farmId };

      // Filtro por status ativo/inativo
      if (query.active !== undefined) {
         where.active = query.active;
      }

      // Filtro por tipo de pasto
      if (query.type) {
         where.type = query.type;
      }

      // Busca por nome
      if (query.search) {
         where.name = { contains: query.search.trim(), mode: "insensitive" };
      }

      const pastures = await prisma.pasture.findMany({
         where,
         select: PASTURE_SELECT,
         orderBy: { name: "asc" },
      });

      return pastures.map(formatPasture);
   }

   /**
    * Busca um pasto pelo ID dentro da fazenda
    */
   async findById(farmId: string, pastureId: string): Promise<PastureResponse> {
      const pasture = await prisma.pasture.findFirst({
         where: { id: pastureId, farmId },
         select: PASTURE_SELECT,
      });

      if (!pasture) {
         throw Object.assign(new Error("Pasto não encontrado"), { statusCode: 404 });
      }

      return formatPasture(pasture);
   }

   /**
    * Atualiza dados de um pasto
    * Permissão: edit_pasture (owner, farmmanager, admin)
    */
   async update(
      farmId: string,
      pastureId: string,
      data: UpdatePastureRequest,
   ): Promise<PastureResponse> {
      // 1. Verificar existência
      await this.findById(farmId, pastureId);

      // 2. Validar campos
      pastureValidator.validateUpdate(data);

      // 3. Verificar conflito de nome
      if (data.name) {
         const conflict = await prisma.pasture.findFirst({
            where: {
               farmId,
               name: { equals: data.name.trim(), mode: "insensitive" },
               NOT: { id: pastureId },
            },
         });

         if (conflict) {
            throw Object.assign(new Error("Já existe um pasto com esse nome nesta fazenda"), {
               statusCode: 409,
            });
         }
      }

      // 4. Montar payload de atualização
      const updateData: Prisma.PastureUpdateInput = {};

      if (data.name) updateData.name = data.name.trim();
      if (data.hectares !== undefined) updateData.hectares = data.hectares;
      if (data.type) updateData.type = data.type;
      if (data.animalCapacity !== undefined) updateData.animalCapacity = data.animalCapacity;

      const pasture = await prisma.pasture.update({
         where: { id: pastureId },
         data: updateData,
         select: PASTURE_SELECT,
      });

      return formatPasture(pasture);
   }

   /**
    * Ativa ou desativa um pasto
    * Permissão: edit_pasture
    */
   async toggleActive(
      farmId: string,
      pastureId: string,
      active: boolean,
   ): Promise<PastureResponse> {
      // Verifica se existe e pertence à fazenda
      const pasture = await this.findById(farmId, pastureId);

      // Impede desativar pasto com animais
      if (!active && pasture.currentAnimals > 0) {
         throw Object.assign(
            new Error(
               `Não é possível desativar um pasto com animais. Mova os ${pasture.currentAnimals} animal(is) antes.`,
            ),
            { statusCode: 400 },
         );
      }

      const updated = await prisma.pasture.update({
         where: { id: pastureId },
         data: { active },
         select: PASTURE_SELECT,
      });

      return formatPasture(updated);
   }

   /**
    * Remove permanentemente um pasto
    * Permissão: delete_pasture (owner, farmmanager, admin)
    */
   async remove(farmId: string, pastureId: string): Promise<void> {
      const pasture = await this.findById(farmId, pastureId);

      // Impede deletar pasto com animais
      if (pasture.currentAnimals > 0) {
         throw Object.assign(
            new Error(
               `Não é possível excluir um pasto com animais. Mova os ${pasture.currentAnimals} animal(is) antes.`,
            ),
            { statusCode: 400 },
         );
      }

      await prisma.pasture.delete({ where: { id: pastureId } });
   }
}

export default new PastureService();
