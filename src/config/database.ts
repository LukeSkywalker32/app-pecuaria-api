/** biome-ignore-all lint/suspicious/noConsole: <explanation> */

import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma-client";
import { DATABASE_URL } from "./env";

const globalForPrisma = globalThis as unknown as {
   prisma: PrismaClient | undefined;
};

function createPrismaClient() {
   const adapter = new PrismaNeon({
      connectionString: DATABASE_URL,
   });

   return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
   });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();
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
