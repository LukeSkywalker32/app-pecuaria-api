import bcrypt from "bcryptjs";
import { prisma } from "../src/config/database";

async function seed() {
   const systemFarm = await prisma.farm.create({
      data: {
         name: "Sistema",
         location: "Sistema",
      },
   });

   console.log("Farm criada com sucesso!", systemFarm.id);

   // Admin do Sistema
   const admin = await prisma.user.create({
      data: {
         farmId: systemFarm.id,
         fullName: "Admin do Sistema",
         username: "admin",
         email: "admin@pecuaria.com",
         password: await bcrypt.hash("Admin@123", 10),
         role: "admin",
      },
   });
   console.log("Admin do Sistema criado com sucesso!", admin.id);
   console.log("Login: admin | Senha: Admin@123");
}
seed()
   .catch(console.error)
   .finally(() => prisma.$disconnect());
