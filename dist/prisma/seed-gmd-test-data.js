/**
 * SEED DE TESTE — Pesagens históricas pra validar o cálculo de GMD
 *
 * Pega até N animais que já têm pelo menos 1 pesagem (normalmente vindos
 * do backfill) e adiciona uma segunda pesagem datada ~90 dias ANTES da
 * mais antiga que o animal já tem, com um peso menor (simulando ganho ao
 * longo do tempo) — assim o GMD entre as duas pesagens fica visível na
 * tela de Pesagens sem precisar cadastrar nada na mão.
 *
 * NÃO É PRA RODAR EM PRODUÇÃO. É só dado de teste (fica marcado com
 * "[TESTE]" na nota, pra ficar fácil de identificar e apagar depois).
 *
 * Idempotente o suficiente pra uso de teste: pula qualquer animal que já
 * tenha uma pesagem com mais de 60 dias de idade (ou seja, rodar de novo
 * não empilha pesagens de teste indefinidamente).
 *
 * Uso: yarn seed:gmd-test [quantidade]
 * Exemplo: yarn seed:gmd-test 5
 */
import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const DAYS_BACK = 90;
const DEFAULT_COUNT = 5;
function daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    d.setHours(0, 0, 0, 0);
    return d;
}
async function main() {
    const count = Number(process.argv[2]) || DEFAULT_COUNT;
    const sixtyDaysAgo = daysAgo(60);
    console.log(`🔍 Buscando até ${count} animal(is) com pesagem, sem histórico antigo (>60 dias)...`);
    // Animais que têm alguma pesagem, mas nenhuma pesagem já "antiga" o
    // suficiente pra servir de baseline de GMD — esses são os candidatos.
    const candidates = await prisma.animal.findMany({
        where: {
            weighings: {
                some: {},
                none: { date: { lte: sixtyDaysAgo } },
            },
        },
        select: {
            id: true,
            farmId: true,
            name: true,
            currentEarTag: true,
            weighings: {
                orderBy: { date: "asc" },
                take: 1,
                select: { date: true, weightKg: true },
            },
        },
        take: count,
    });
    if (candidates.length === 0) {
        console.log("   Nenhum candidato encontrado — todo animal já tem pesagem antiga o suficiente.");
        return;
    }
    console.log(`   ${candidates.length} candidato(s) encontrado(s).\n`);
    for (const animal of candidates) {
        const earliest = animal.weighings[0];
        const historicalDate = new Date(earliest.date);
        historicalDate.setDate(historicalDate.getDate() - DAYS_BACK);
        // Peso histórico = peso atual menos um ganho plausível ao longo dos
        // 90 dias (GMD de ~0.6 kg/dia é uma referência realista de recria a pasto)
        const simulatedGmd = 0.6;
        const historicalWeight = Number((earliest.weightKg - simulatedGmd * DAYS_BACK).toFixed(1));
        if (historicalWeight <= 0) {
            console.log(`   ⚠️  Pulando ${animal.name} — peso histórico calculado ficaria <= 0.`);
            continue;
        }
        await prisma.weighing.create({
            data: {
                farmId: animal.farmId,
                animalId: animal.id,
                weightKg: historicalWeight,
                date: historicalDate,
                notes: `[TESTE] Pesagem histórica gerada pra validar cálculo de GMD (${DAYS_BACK} dias antes da pesagem existente)`,
            },
        });
        console.log(`   ✅ ${animal.name}${animal.currentEarTag ? ` (${animal.currentEarTag})` : ""} — ` +
            `${historicalWeight}kg em ${historicalDate.toLocaleDateString("pt-BR")} ` +
            `(atual: ${earliest.weightKg}kg em ${new Date(earliest.date).toLocaleDateString("pt-BR")})`);
    }
    console.log("\n🏁 Concluído. Confira a página de Pesagens — o GMD deve aparecer nesses animais.");
    console.log('   Pra remover depois: apague pelo Prisma Studio os registros com nota começando em "[TESTE]".');
}
main()
    .catch(error => {
    console.error("❌ Erro ao gerar dados de teste:", error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-gmd-test-data.js.map