/**
 * SEED — Fazenda Santa Rosa
 * Popula o banco com dados de teste representativos.
 *
 * Usuários: owner, farmmanager, veterinarian
 * Rebanho: ~27 animais em diversas categorias, status e situações
 */
import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
// ─── Helpers de data ───
function daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d;
}
function monthsAgo(n) {
    const d = new Date();
    d.setMonth(d.getMonth() - n);
    return d;
}
function yearsAgo(n) {
    const d = new Date();
    d.setFullYear(d.getFullYear() - n);
    return d;
}
async function main() {
    console.log("🌱 Iniciando seed...\n");
    // ─── Limpeza prévia (ordem inversa das FKs) ───
    await prisma.passwordResetToken.deleteMany();
    await prisma.ultrasound.deleteMany();
    await prisma.attempt.deleteMany();
    await prisma.pregnancy.deleteMany();
    await prisma.mortality.deleteMany();
    await prisma.birth.deleteMany();
    await prisma.vaccination.deleteMany();
    await prisma.estrus.deleteMany();
    await prisma.management.deleteMany();
    await prisma.earTagHistory.deleteMany();
    await prisma.animal.deleteMany();
    await prisma.pasture.deleteMany();
    await prisma.user.deleteMany();
    await prisma.farm.deleteMany({
        where: {
            id: { not: "farm-sistema" },
        },
    });
    await prisma.breed.deleteMany();
    console.log("🗑️  Dados anteriores removidos.\n");
    // =========================================================
    // FAZENDAS
    // =========================================================
    const farmSistema = await prisma.farm.upsert({
        where: { id: "farm-sistema" },
        update: {},
        create: {
            id: "farm-sistema", // Id fixo pq a regra exige que um usuario tenha um farmId
            name: "__sistema__",
            location: "Sistema",
            active: false, // inativa = nao aparece no dropdown
        },
    });
    // =========================================================
    // FAZENDA
    // =========================================================
    const farm = await prisma.farm.create({
        data: {
            name: "Fazenda Santa Rosa",
            location: "Araçatuba - SP",
            cnpj: "11.222.333/0001-81",
            active: true,
        },
    });
    console.log(`🏡 Fazenda criada: ${farm.name} (${farm.id})`);
    console.log(`   Fazenda sistema: ${farmSistema.id}\n`);
    // =========================================================
    // USUÁRIOS
    // =========================================================
    const senhaHash = await bcrypt.hash("Senha@1234", 10);
    await prisma.user.upsert({
        where: { email: "admin@sistema.com" },
        update: {},
        create: {
            farmId: farmSistema.id,
            fullName: "Administrador do sistema",
            username: "admin",
            email: "admin@sistema.com",
            password: await bcrypt.hash("Admin@1234", 10),
            role: "admin",
            active: true,
        },
    });
    const owner = await prisma.user.create({
        data: {
            farmId: farm.id,
            fullName: "João Carlos Oliveira",
            username: "joao.oliveira",
            email: "joao.oliveira@santarosa.com.br",
            phone: "(18) 99999-0001",
            password: senhaHash,
            role: "owner",
        },
    });
    const farmmanager = await prisma.user.create({
        data: {
            farmId: farm.id,
            fullName: "Maria Fernanda Costa",
            username: "maria.costa",
            email: "maria.costa@santarosa.com.br",
            phone: "(18) 99999-0002",
            password: senhaHash,
            role: "farmmanager",
        },
    });
    const veterinarian = await prisma.user.create({
        data: {
            farmId: farm.id,
            fullName: "Dr. Carlos Eduardo Mendes",
            username: "dr.carlos",
            email: "carlos.mendes@santarosa.com.br",
            phone: "(18) 99999-0003",
            password: senhaHash,
            role: "veterinarian",
            crmv: "CRMV-SP 12345",
            graduationDate: yearsAgo(10),
            specialties: ["Reprodução Bovina", "Clínica de Ruminantes"],
        },
    });
    console.log("👤 Usuários criados: owner, farmmanager, veterinarian");
    console.log("   Senha padrão: Senha@1234\n");
    console.log("🔑 Admin criado: admin@sistema.com / Admin@1234\n");
    // =========================================================
    // RAÇAS
    // =========================================================
    const RACAS = [
        "Nelore",
        "Angus",
        "Gir",
        "Girolando",
        "Brahman",
        "Simental",
        "Hereford",
        "Senepol",
        "Tabapuã",
        "Guzerá",
        "Limousin",
        "Charolês",
        "Brangus",
        "Canchim",
        "Bonsmara",
    ];
    for (const name of RACAS) {
        await prisma.breed.upsert({
            where: { name },
            update: {},
            create: { name, active: true },
        });
    }
    console.log(`🐄 ${RACAS.length} Raças cadastradas\n`);
    // =========================================================
    // PASTOS
    // =========================================================
    const pastoVacas = await prisma.pasture.create({
        data: {
            farmId: farm.id,
            name: "Pasto das Vacas",
            hectares: 45.5,
            type: "native",
            animalCapacity: 30,
            currentAnimals: 0,
        },
    });
    const pastoBois = await prisma.pasture.create({
        data: {
            farmId: farm.id,
            name: "Pasto dos Reprodutores",
            hectares: 18.0,
            type: "native",
            animalCapacity: 5,
            currentAnimals: 0,
        },
    });
    const pastoRecria = await prisma.pasture.create({
        data: {
            farmId: farm.id,
            name: "Pasto de Recria",
            hectares: 32.0,
            type: "planted",
            animalCapacity: 25,
            currentAnimals: 0,
        },
    });
    const pastoMaternidade = await prisma.pasture.create({
        data: {
            farmId: farm.id,
            name: "Piquete Maternidade",
            hectares: 8.0,
            type: "irrigated",
            animalCapacity: 10,
            currentAnimals: 0,
        },
    });
    const pastoQuarentena = await prisma.pasture.create({
        data: {
            farmId: farm.id,
            name: "Piquete Quarentena",
            hectares: 4.5,
            type: "quarantine",
            animalCapacity: 8,
            currentAnimals: 0,
        },
    });
    console.log("🌿 5 Pastos criados\n");
    // =========================================================
    // ANIMAIS — Touros (M, > 24 meses)
    // Referência de peso: Nelore adulto 550-750 kg, Angus 700-900 kg, Brahman 600-800 kg
    // =========================================================
    const herculesNelore = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-T001",
            currentEarTag: "BR-T001",
            name: "Hércules",
            breed: "Nelore",
            gender: "M",
            birthDate: yearsAgo(6),
            status: "active",
            origin: "purchased",
            weightKg: 680,
            pastureId: pastoBois.id,
            pastureName: pastoBois.name,
        },
    });
    const zeusAngus = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-T002",
            currentEarTag: "BR-T002",
            name: "Zeus",
            breed: "Angus",
            gender: "M",
            birthDate: yearsAgo(4),
            status: "active",
            origin: "purchased",
            weightKg: 820,
            pastureId: pastoBois.id,
            pastureName: pastoBois.name,
            sireExternalName: "Angus Importado",
            sireExternalChip: "EXT-ANG-001",
        },
    });
    const titanBrahman = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-T003",
            currentEarTag: "BR-T003",
            name: "Titã",
            breed: "Brahman",
            gender: "M",
            birthDate: yearsAgo(5),
            status: "active",
            origin: "born",
            weightKg: 730,
            pastureId: pastoBois.id,
            pastureName: pastoBois.name,
        },
    });
    console.log("🐂 3 Touros criados");
    await prisma.pasture.update({
        where: { id: pastoBois.id },
        data: { currentAnimals: { increment: 3 } },
    });
    // =========================================================
    // ANIMAIS — Vacas adultas (F, > 24 meses)
    // Referência de peso: Nelore 380-480 kg, Gir 400-500 kg, Girolando 450-550 kg, Angus 500-650 kg
    // =========================================================
    const estrelaNelore = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-V001",
            currentEarTag: "BR-V001",
            name: "Estrela",
            breed: "Nelore",
            gender: "F",
            birthDate: yearsAgo(5),
            status: "active",
            origin: "born",
            weightKg: 420,
            pastureId: pastoVacas.id,
            pastureName: pastoVacas.name,
            sireId: herculesNelore.id,
        },
    });
    const mimosaGir = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-V002",
            currentEarTag: "BR-V002",
            name: "Mimosa",
            breed: "Gir",
            gender: "F",
            birthDate: yearsAgo(6),
            status: "active",
            origin: "purchased",
            weightKg: 455,
            pastureId: pastoVacas.id,
            pastureName: pastoVacas.name,
            sireExternalName: "Gir Selecionado",
            sireExternalChip: "EXT-GIR-001",
        },
    });
    const belaGirolando = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-V003",
            currentEarTag: "BR-V003",
            name: "Bela",
            breed: "Girolando",
            gender: "F",
            birthDate: yearsAgo(3),
            status: "active",
            origin: "born",
            weightKg: 490,
            pastureId: pastoVacas.id,
            pastureName: pastoVacas.name,
        },
    });
    const rosaNelore = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-V004",
            currentEarTag: "BR-V004",
            name: "Rosa",
            breed: "Nelore",
            gender: "F",
            birthDate: yearsAgo(7),
            status: "active",
            origin: "born",
            weightKg: 440,
            pastureId: pastoVacas.id,
            pastureName: pastoVacas.name,
        },
    });
    const luaAngus = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-V005",
            currentEarTag: "BR-V005",
            name: "Lua",
            breed: "Angus",
            gender: "F",
            birthDate: yearsAgo(4),
            status: "active",
            origin: "purchased",
            weightKg: 540,
            pastureId: pastoVacas.id,
            pastureName: pastoVacas.name,
        },
    });
    // Vaca no piquete maternidade (prenhe, próxima do parto)
    const dianaSimental = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-V006",
            currentEarTag: "BR-V006",
            name: "Diana",
            breed: "Simental",
            gender: "F",
            birthDate: yearsAgo(4),
            status: "active",
            origin: "purchased",
            weightKg: 580,
            pastureId: pastoMaternidade.id,
            pastureName: pastoMaternidade.name,
        },
    });
    console.log("🐄 6 Vacas adultas criadas");
    await prisma.pasture.update({
        where: { id: pastoVacas.id },
        data: { currentAnimals: { increment: 5 } },
    });
    await prisma.pasture.update({
        where: { id: pastoMaternidade.id },
        data: { currentAnimals: { increment: 1 } },
    });
    // =========================================================
    // ANIMAIS — Novilhas (F, 12-24 meses) e Garrotes (M, 12-24 meses)
    // Referência de peso: 200-320 kg dependendo da raça e idade
    // =========================================================
    const florNelore = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-N001",
            currentEarTag: "BR-N001",
            name: "Flor",
            breed: "Nelore",
            gender: "F",
            birthDate: monthsAgo(20),
            status: "active",
            origin: "born",
            weightKg: 285,
            pastureId: pastoRecria.id,
            pastureName: pastoRecria.name,
            damId: estrelaNelore.id,
            sireId: herculesNelore.id,
        },
    });
    const margaridaGir = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-N002",
            currentEarTag: "BR-N002",
            name: "Margarida",
            breed: "Gir",
            gender: "F",
            birthDate: monthsAgo(16),
            status: "active",
            origin: "born",
            weightKg: 240,
            pastureId: pastoRecria.id,
            pastureName: pastoRecria.name,
            damId: mimosaGir.id,
        },
    });
    const perola = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-N003",
            currentEarTag: "BR-N003",
            name: "Pérola",
            breed: "Girolando",
            gender: "F",
            birthDate: monthsAgo(22),
            status: "active",
            origin: "born",
            weightKg: 310,
            pastureId: pastoRecria.id,
            pastureName: pastoRecria.name,
            damId: belaGirolando.id,
        },
    });
    const trovao = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-G001",
            currentEarTag: "BR-G001",
            name: "Trovão",
            breed: "Nelore",
            gender: "M",
            birthDate: monthsAgo(18),
            status: "active",
            origin: "born",
            weightKg: 300,
            pastureId: pastoRecria.id,
            pastureName: pastoRecria.name,
            sireId: herculesNelore.id,
        },
    });
    const corisco = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-G002",
            currentEarTag: "BR-G002",
            name: "Corisco",
            breed: "Angus",
            gender: "M",
            birthDate: monthsAgo(14),
            status: "active",
            origin: "born",
            weightKg: 265,
            pastureId: pastoRecria.id,
            pastureName: pastoRecria.name,
            sireId: zeusAngus.id,
            damId: luaAngus.id,
        },
    });
    console.log("🐄 3 Novilhas + 2 Garrotes criados");
    await prisma.pasture.update({
        where: { id: pastoRecria.id },
        data: { currentAnimals: { increment: 5 } },
    });
    // =========================================================
    // ANIMAIS — Bezerras e Bezerros (< 12 meses)
    // Referência de peso: 80-180 kg dependendo da raça e idade
    // =========================================================
    const pintada = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-B001",
            currentEarTag: "BR-B001",
            name: "Pintada",
            breed: "Nelore",
            gender: "F",
            birthDate: monthsAgo(8),
            status: "active",
            origin: "born",
            weightKg: 145,
            pastureId: pastoMaternidade.id,
            pastureName: pastoMaternidade.name,
            damId: rosaNelore.id,
            sireId: herculesNelore.id,
        },
    });
    const malhada = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-B002",
            currentEarTag: "BR-B002",
            name: "Malhada",
            breed: "Gir",
            gender: "F",
            birthDate: monthsAgo(5),
            status: "active",
            origin: "born",
            weightKg: 98,
            pastureId: pastoMaternidade.id,
            pastureName: pastoMaternidade.name,
            damId: mimosaGir.id,
        },
    });
    const valente = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-B003",
            currentEarTag: "BR-B003",
            name: "Valente",
            breed: "Angus",
            gender: "M",
            birthDate: monthsAgo(7),
            status: "active",
            origin: "born",
            weightKg: 160,
            pastureId: pastoMaternidade.id,
            pastureName: pastoMaternidade.name,
            damId: luaAngus.id,
            sireId: zeusAngus.id,
        },
    });
    const pipoca = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-B004",
            currentEarTag: "BR-B004",
            name: "Pipoca",
            breed: "Brahman",
            gender: "M",
            birthDate: monthsAgo(3),
            status: "active",
            origin: "born",
            weightKg: 72,
            pastureId: pastoMaternidade.id,
            pastureName: pastoMaternidade.name,
            sireId: titanBrahman.id,
        },
    });
    console.log("🐮 2 Bezerras + 2 Bezerros criados");
    await prisma.pasture.update({
        where: { id: pastoMaternidade.id },
        data: { currentAnimals: { increment: 4 } },
    });
    // =========================================================
    // ANIMAIS — Quarentena (comprados recentemente)
    // =========================================================
    const comprada01 = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-Q001",
            currentEarTag: "BR-Q001",
            name: "Comprada 01",
            breed: "Nelore",
            gender: "F",
            birthDate: yearsAgo(3),
            status: "quarantine",
            origin: "purchased",
            weightKg: 395,
            pastureId: pastoQuarentena.id,
            pastureName: pastoQuarentena.name,
            sireExternalName: "Nelore PO",
            sireExternalChip: "EXT-NEL-055",
            damExternalName: "Vaca Leiteira",
            damExternalChip: "EXT-NEL-030",
        },
    });
    const comprado02 = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-Q002",
            name: "Comprado 02",
            breed: "Simental",
            gender: "M",
            birthDate: yearsAgo(2),
            status: "quarantine",
            origin: "purchased",
            weightKg: 480,
            pastureId: pastoQuarentena.id,
            pastureName: pastoQuarentena.name,
        },
    });
    console.log("🔒 2 Animais em Quarentena");
    await prisma.pasture.update({
        where: { id: pastoQuarentena.id },
        data: { currentAnimals: { increment: 2 } },
    });
    // =========================================================
    // ANIMAIS — Morto e Vendido (histórico)
    // =========================================================
    const perdida = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-D001",
            currentEarTag: null,
            name: "Perdida",
            breed: "Nelore",
            gender: "F",
            birthDate: yearsAgo(4),
            status: "dead",
            deathDate: daysAgo(45),
            origin: "born",
            weightKg: null, // peso não relevante para animal morto
        },
    });
    const vendida = await prisma.animal.create({
        data: {
            farmId: farm.id,
            chipId: "CHIP-S001",
            currentEarTag: "BR-OLD-01",
            name: "Vendida",
            breed: "Gir",
            gender: "F",
            birthDate: yearsAgo(5),
            status: "sold",
            origin: "born",
            weightKg: null, // peso não relevante para animal vendido
        },
    });
    console.log("💀 1 Animal morto + 1 Vendido (histórico)\n");
    // =========================================================
    // HISTÓRICO DE BRINCOS
    // =========================================================
    await prisma.earTagHistory.create({
        data: {
            farmId: farm.id,
            animalId: estrelaNelore.id,
            earTagNumber: "BR-OLD-V001",
            placementDate: yearsAgo(5),
            removalDate: yearsAgo(3),
            reason: "Brinco danificado — substituído",
        },
    });
    await prisma.earTagHistory.create({
        data: {
            farmId: farm.id,
            animalId: estrelaNelore.id,
            earTagNumber: "BR-V001",
            placementDate: yearsAgo(3),
            removalDate: null,
            reason: "Substituição — brinco atual",
        },
    });
    await prisma.earTagHistory.create({
        data: {
            farmId: farm.id,
            animalId: mimosaGir.id,
            earTagNumber: "BR-V002",
            placementDate: monthsAgo(36),
            removalDate: null,
            reason: "Brinco inicial — compra",
        },
    });
    await prisma.earTagHistory.create({
        data: {
            farmId: farm.id,
            animalId: herculesNelore.id,
            earTagNumber: "LEILAO-001",
            placementDate: yearsAgo(3),
            removalDate: yearsAgo(3),
            reason: "Brinco de leilão — removido na entrada da fazenda",
        },
    });
    await prisma.earTagHistory.create({
        data: {
            farmId: farm.id,
            animalId: herculesNelore.id,
            earTagNumber: "BR-T001",
            placementDate: yearsAgo(3),
            removalDate: null,
            reason: "Brinco padrão da fazenda",
        },
    });
    await prisma.earTagHistory.create({
        data: {
            farmId: farm.id,
            animalId: perdida.id,
            earTagNumber: "BR-D001",
            placementDate: yearsAgo(4),
            removalDate: daysAgo(45),
            reason: "Removido no registro de óbito",
        },
    });
    const animaisComBrinco = [
        { animal: zeusAngus, tag: "BR-T002" },
        { animal: titanBrahman, tag: "BR-T003" },
        { animal: belaGirolando, tag: "BR-V003" },
        { animal: rosaNelore, tag: "BR-V004" },
        { animal: luaAngus, tag: "BR-V005" },
        { animal: dianaSimental, tag: "BR-V006" },
        { animal: florNelore, tag: "BR-N001" },
        { animal: margaridaGir, tag: "BR-N002" },
        { animal: perola, tag: "BR-N003" },
        { animal: trovao, tag: "BR-G001" },
        { animal: corisco, tag: "BR-G002" },
        { animal: pintada, tag: "BR-B001" },
        { animal: malhada, tag: "BR-B002" },
        { animal: valente, tag: "BR-B003" },
        { animal: pipoca, tag: "BR-B004" },
        { animal: comprada01, tag: "BR-Q001" },
    ];
    for (const { animal, tag } of animaisComBrinco) {
        await prisma.earTagHistory.create({
            data: {
                farmId: farm.id,
                animalId: animal.id,
                earTagNumber: tag,
                placementDate: animal.birthDate,
                removalDate: null,
                reason: "Brinco inicial",
            },
        });
    }
    console.log("🏷️  Histórico de brincos criado\n");
    // =========================================================
    // REGISTROS DE CIO (Estrus)
    // =========================================================
    await prisma.estrus.create({
        data: {
            farmId: farm.id,
            animalId: estrelaNelore.id,
            date: daysAgo(14),
            intensity: "strong",
            nextEstrus: daysAgo(14),
            notes: "CIO muito visível, animal agitada",
            detectedById: veterinarian.id,
        },
    });
    await prisma.estrus.create({
        data: {
            farmId: farm.id,
            animalId: rosaNelore.id,
            date: daysAgo(60),
            intensity: "normal",
            nextEstrus: daysAgo(39),
            detectedById: farmmanager.id,
        },
    });
    await prisma.estrus.create({
        data: {
            farmId: farm.id,
            animalId: rosaNelore.id,
            date: daysAgo(39),
            intensity: "weak",
            nextEstrus: daysAgo(18),
            notes: "CIO fraco — monitorar",
            detectedById: farmmanager.id,
        },
    });
    await prisma.estrus.create({
        data: {
            farmId: farm.id,
            animalId: luaAngus.id,
            date: daysAgo(5),
            intensity: "strong",
            nextEstrus: daysAgo(5),
            detectedById: veterinarian.id,
        },
    });
    console.log("🔴 Registros de CIO criados\n");
    // =========================================================
    // PRENHEZES E TENTATIVAS
    // =========================================================
    const prenhez_diana = await prisma.pregnancy.create({
        data: {
            farmId: farm.id,
            animalId: dianaSimental.id,
            currentStatus: "pregnant",
            currentStatusDate: monthsAgo(8),
        },
    });
    const tentativa_diana = await prisma.attempt.create({
        data: {
            pregnancyId: prenhez_diana.id,
            number: 1,
            matingDate: monthsAgo(9),
            matingType: "NATURAL",
            bullId: titanBrahman.id,
            estimatedBirthDate: daysAgo(10),
            attemptStatus: "in_progress",
            notes: "Cobertura confirmada por observação",
        },
    });
    await prisma.ultrasound.create({
        data: {
            attemptId: tentativa_diana.id,
            days: 30,
            result: "PREGNANT",
            ultrasoundDate: monthsAgo(8),
            notes: "Vesícula embrionária visível",
            veterinarianId: veterinarian.id,
        },
    });
    await prisma.ultrasound.create({
        data: {
            attemptId: tentativa_diana.id,
            days: 60,
            result: "PREGNANT",
            ultrasoundDate: monthsAgo(7),
            notes: "Feto com batimentos detectados",
            veterinarianId: veterinarian.id,
        },
    });
    const prenhez_bela = await prisma.pregnancy.create({
        data: {
            farmId: farm.id,
            animalId: belaGirolando.id,
            currentStatus: "failed",
            currentStatusDate: monthsAgo(8),
        },
    });
    const tentativa_bela = await prisma.attempt.create({
        data: {
            pregnancyId: prenhez_bela.id,
            number: 1,
            matingDate: monthsAgo(18),
            matingType: "AI",
            semenName: "Touro Girolando Elite",
            technician: "Dr. Carlos Eduardo Mendes",
            estimatedBirthDate: monthsAgo(9),
            attemptStatus: "success",
            notes: "IA realizada com sêmen importado",
        },
    });
    const prenhez_mimosa = await prisma.pregnancy.create({
        data: {
            farmId: farm.id,
            animalId: mimosaGir.id,
            currentStatus: "failed",
            currentStatusDate: daysAgo(90),
        },
    });
    const tentativa_mimosa = await prisma.attempt.create({
        data: {
            pregnancyId: prenhez_mimosa.id,
            number: 1,
            matingDate: daysAgo(120),
            matingType: "NATURAL",
            bullId: herculesNelore.id,
            estimatedBirthDate: daysAgo(120),
            attemptStatus: "failed",
        },
    });
    await prisma.ultrasound.create({
        data: {
            attemptId: tentativa_mimosa.id,
            days: 30,
            result: "EMPTY",
            ultrasoundDate: daysAgo(90),
            notes: "Ausência de embrião — ciclo encerrado",
            veterinarianId: veterinarian.id,
        },
    });
    await prisma.pregnancy.create({
        data: {
            farmId: farm.id,
            animalId: rosaNelore.id,
            currentStatus: "not_started",
            currentStatusDate: daysAgo(10),
        },
    });
    console.log("🤰 4 Prenhezes criadas (1 ativa, 1 histórica, 1 falhou, 1 aguardando)\n");
    // =========================================================
    // REGISTRO DE PARTO — Pérola (filha de Bela)
    // =========================================================
    const parto_bela = await prisma.birth.create({
        data: {
            farmId: farm.id,
            damId: belaGirolando.id,
            attemptId: tentativa_bela.id,
            birthDate: monthsAgo(8),
            birthTime: "06:30",
            birthType: "normal",
            situation: "normal",
            calfGender: "F",
            calfWeight: 32.5,
            calfEarTag: "BR-N003",
            calfChip: "CHIP-N003",
            calfStatus: "complete",
            notes: "Parto tranquilo ao amanhecer",
            veterinarianId: veterinarian.id,
        },
    });
    console.log("🐣 1 Parto registrado (Pérola, filha de Bela)\n");
    // =========================================================
    // VACINAÇÕES
    // =========================================================
    const animaisVacas = [
        estrelaNelore,
        mimosaGir,
        belaGirolando,
        rosaNelore,
        luaAngus,
        dianaSimental,
    ];
    for (const animal of animaisVacas) {
        await prisma.vaccination.create({
            data: {
                farmId: farm.id,
                animalId: animal.id,
                vaccineType: "Febre Aftosa",
                brand: "Boehringer Ingelheim",
                batch: `FA-2025-${Math.floor(Math.random() * 900) + 100}`,
                vaccinationDate: monthsAgo(6),
                expirationDate: monthsAgo(-6),
                nextDoseDate: monthsAgo(-6),
                veterinarianId: veterinarian.id,
            },
        });
    }
    for (const animal of [florNelore, margaridaGir, perola]) {
        await prisma.vaccination.create({
            data: {
                farmId: farm.id,
                animalId: animal.id,
                vaccineType: "Brucelose",
                brand: "Pfizer Animal Health",
                batch: `BRC-2025-${Math.floor(Math.random() * 900) + 100}`,
                vaccinationDate: monthsAgo(4),
                expirationDate: yearsAgo(-2),
                veterinarianId: veterinarian.id,
                notes: "Dose única obrigatória — fêmeas entre 3-8 meses",
            },
        });
    }
    for (const animal of [herculesNelore, zeusAngus, titanBrahman]) {
        await prisma.vaccination.create({
            data: {
                farmId: farm.id,
                animalId: animal.id,
                vaccineType: "Clostridiose",
                brand: "Ourofino",
                batch: `CLO-2025-${Math.floor(Math.random() * 900) + 100}`,
                vaccinationDate: monthsAgo(3),
                expirationDate: monthsAgo(-9),
                nextDoseDate: monthsAgo(-9),
                veterinarianId: veterinarian.id,
            },
        });
    }
    for (const animal of [florNelore, margaridaGir, perola, trovao, corisco]) {
        await prisma.vaccination.create({
            data: {
                farmId: farm.id,
                animalId: animal.id,
                vaccineType: "Raiva Bovina",
                brand: "Zoetis",
                batch: `RAI-2025-${Math.floor(Math.random() * 900) + 100}`,
                vaccinationDate: monthsAgo(2),
                expirationDate: yearsAgo(-1),
                nextDoseDate: monthsAgo(-10),
                veterinarianId: veterinarian.id,
            },
        });
    }
    console.log("💉 Campanhas de vacinação criadas (Aftosa, Brucelose, Clostridiose, Raiva)\n");
    // =========================================================
    // MOVIMENTAÇÃO
    // =========================================================
    await prisma.management.create({
        data: {
            farmId: farm.id,
            animalId: dianaSimental.id,
            originPasture: pastoVacas.name,
            destinationPasture: pastoMaternidade.name,
            movementDate: daysAgo(30),
            reason: "Transferência para piquete maternidade — parto previsto",
            employee: "Maria Fernanda Costa",
        },
    });
    await prisma.management.create({
        data: {
            farmId: farm.id,
            animalId: comprada01.id,
            originPasture: "Sem Pasto",
            destinationPasture: pastoQuarentena.name,
            movementDate: daysAgo(20),
            reason: "Quarentena obrigatória — animal comprado",
            employee: "João Carlos Oliveira",
        },
    });
    console.log("🚚 Registros de movimentação criados\n");
    // =========================================================
    // MORTALIDADE
    // =========================================================
    await prisma.mortality.create({
        data: {
            farmId: farm.id,
            animalId: perdida.id,
            deathDate: daysAgo(45),
            deathTime: "14:30",
            deathLocation: pastoVacas.name,
            causeOfDeath: "Timpanismo agudo",
            severity: "severe",
            necropsy: true,
            disposal: "Enterrada na propriedade",
            notes: "Animal encontrada caída. Timpanismo não reverteu ao tratamento.",
            registeredById: veterinarian.id,
        },
    });
    console.log("💀 Mortalidade registrada (Perdida — Timpanismo)\n");
    // =========================================================
    // RESUMO FINAL
    // =========================================================
    const totalAnimais = await prisma.animal.count({ where: { farmId: farm.id } });
    const totalBrincos = await prisma.earTagHistory.count({ where: { farmId: farm.id } });
    const totalVacinacoes = await prisma.vaccination.count({ where: { farmId: farm.id } });
    const totalPrenhezes = await prisma.pregnancy.count({ where: { farmId: farm.id } });
    console.log("─".repeat(50));
    console.log("✅ SEED CONCLUÍDO COM SUCESSO!\n");
    console.log(`🏡 Fazenda:       ${farm.name}`);
    console.log(`👤 Usuários:      3 (owner, farmmanager, veterinarian)`);
    console.log(`🌿 Pastos:        5`);
    console.log(`🐄 Animais:       ${totalAnimais}`);
    console.log(`🏷️  Brincos:       ${totalBrincos} registros`);
    console.log(`💉 Vacinações:    ${totalVacinacoes}`);
    console.log(`🤰 Prenhezes:     ${totalPrenhezes}`);
    console.log("");
    console.log("🔑 Login de teste:");
    console.log(`   Fazenda ID:  ${farm.id}`);
    console.log("   Owner:       joao.oliveira / Senha@1234");
    console.log("   Gerente:     maria.costa / Senha@1234");
    console.log("   Veterinário: dr.carlos / Senha@1234");
    console.log("─".repeat(50));
}
main()
    .catch(e => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map