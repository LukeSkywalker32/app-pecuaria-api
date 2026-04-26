import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/config/database";

export class UserService {
   async create(data) {
      const userExists = await prisma.user.findUnique({
         where: {
            farmId_email: {
               farmId: data.farmId,
               email: data.email,
            },
         },
      });
      if (userExists) {
         throw new Error("Usuário já cadastrado");
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      return prisma.user.create({
         data: {
            ...data,
            password: hashedPassword,
         },
      });
   }

   async login({ email, password }) {
      const user = await prisma.user.findFirst({
         where: { email },
      });
      if (!user) {
         throw new Error("Credenciais inválidas");
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
         throw new Error("Credenciais inválidas");
      }
      const token = jwt.sign(
         {
            sub: user.id,
            farmId: user.farmId,
         },
         process.env.JWT_SECRET,
         {
            expiresIn: "7d",
         },
      );
      return { token };
   }
   async me(userId: string) {
      return prisma.user.findUnique({
         where: {
            id: userId,
         },
      });
   }
}
