/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { PrismaClient } from "@prisma/client";

// Instância única — usada em TODO o projeto para evitar múltiplas conexões em dev
const globalForPrisma = globalThis as unknown as {
   prisma: PrismaClient | undefined;
};

export const prisma =
   globalForPrisma.prisma ??
   new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
   });

if (process.env.NODE_ENV !== "production") {
   globalForPrisma.prisma = prisma;
}

export async function connectDataBase() {
   try {
      await prisma.$connect();
      console.log("🚀 Database connected successfully");
   } catch (error) {
      console.error("Error connecting to Database:", error);
      throw error;
   }
}

export async function disconnectDataBase() {
   return prisma.$disconnect();
}
