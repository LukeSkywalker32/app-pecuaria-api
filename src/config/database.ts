import { PrismaClient } from "@prisma/client";
import { DATABASE_URL } from "./env";

const globalForPrisma = globalThis as unknown as {
   prisma: PrismaClient | undefined;
};

export const prisma =
   globalForPrisma.prisma ??
   new PrismaClient({
      datasourceUrl: DATABASE_URL, // ← Prisma 7: URL vai aqui
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
