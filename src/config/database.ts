import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function connectDataBase() {
   try {
      await prisma.$connect();
      console.log("🚀 Connected to Database");
   } catch (error) {
      console.error("Error connecting to Database", error);
      throw error;
   }
}

export async function disconnectDataBase() {
   return prisma.$disconnect();
}
