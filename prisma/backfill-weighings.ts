/**
 * BACKFILL — Pesagem inicial retroativa
 *
 * Contexto: até a correção do bug de sincronização Animal <-> Weighing,
 * o campo Animal.weightKg era gravado sem nenhum registro correspondente
 * em Weighing. Esse script varre os animais que têm peso mas nenhuma
 * pesagem no histórico, e cria a pesagem retroativa — sem isso, esses
 * animais continuam com "peso atual" preenchido mas zero histórico/GMD
 * na página de Pesagens.
 *
 * IDEMPOTENTE: só cria pesagem pra quem NÃO tem nenhuma ainda. Rodar de
 * novo não duplica nada — animais que já têm pesagem (seja da correção
 * anterior, seja lançada manualmente) são ignorados.
 *
 * Uso: yarn backfill:weighings
 */

import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
   console.log("🔍 Buscando animais com peso, sem nenhuma pesagem registrada...");

   // Busca todos os animais com peso preenchido
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
      // Idempotência: se já existe QUALQUER pesagem pra esse animal, pula.
      // (evita duplicar em quem já foi corrigido, ou em quem já tem
      // pesagens lançadas manualmente pela tela desde a correção)
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
            // Não temos como saber a data real em que esse peso foi
            // medido (a informação nunca foi guardada) — usamos a data de
            // criação do cadastro do animal como melhor aproximação
            // disponível, e deixamos isso explícito na nota.
            date: animal.createdAt,
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
