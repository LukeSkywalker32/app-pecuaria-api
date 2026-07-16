/**
 * BACKFILL — Pesagem inicial retroativa
 *
 * ✅ CORRIGIDO: usa toWeighingDate() para normalizar a data,
 * garantindo consistência com pesagens manuais.
 */
import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { toWeighingDate } from "../src/shared/utils/dateUtils";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
   console.log("🔍 Buscando animais com peso, sem nenhuma pesagem registrada...");
   const animalsWithWeight = await prisma.animal.findMany({
      where: { weightKg: { not: null } },
      select: {
         id: true,
         farmId: true,
         name: true,
         currentEarTag: true,
         weightKg: true,
         birthDate: true,
         createdAt: true,
      },
   });
   console.log(`   ${animalsWithWeight.length} animal(is) com peso preenchido.`);
   let created = 0;
   let skipped = 0;
   for (const animal of animalsWithWeight) {
      const existing = await prisma.weighing.findFirst({
         where: { animalId: animal.id },
         select: { id: true },
      });
      if (existing) {
         skipped++;
         continue;
      }
      await prisma.weighing.create({
         data: {
            farmId: animal.farmId,
            animalId: animal.id,
            weightKg: animal.weightKg!,
            date: toWeighingDate(animal.createdAt),
            notes: "Pesagem retroativa (backfill) — peso do cadastro original do animal",
         },
      });
      created++;
      console.log(
         `   ✅ ${animal.name}${animal.currentEarTag ? ` (${animal.currentEarTag})` : ""} — ${animal.weightKg}kg`,
      );
   }
   console.log(
      `\n🏁 Concluído: ${created} pesagem(ns) criada(s), ${skipped} animal(is) já tinha(m) histórico.`,
   );
}

main()
   .catch(error => {
      console.error("❌ Erro no backfill:", error);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
