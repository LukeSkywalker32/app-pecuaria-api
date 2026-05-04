import { AnimalStatus, Gender, Permission } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../src/config/database";

function yearsAgo(years: number) {
   const d = new Date();
   d.setFullYear(d.getFullYear() - years);
   return d;
}

function daysAgo(days: number) {
   const d = new Date();
   d.setDate(d.getDate() - days);
   return d;
}

function addDays(date: Date, days: number) {
   const d = new Date(date);
   d.setDate(d.getDate() + days);
   return d;
}

function randomInt(min: number, max: number) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pad3(n: number) {
   return String(n).padStart(3, "0");
}

async function main() {
   // =====================
   // CLEANUP (children -> parents)
   // =====================
   await prisma.mortality.deleteMany();
   await prisma.management.deleteMany();
   await prisma.vaccination.deleteMany();
   await prisma.birth.deleteMany();
   await prisma.ultrasound.deleteMany();
   await prisma.attempt.deleteMany();
   await prisma.pregnancy.deleteMany();
   await prisma.estrus.deleteMany();
   await prisma.earTagHistory.deleteMany();
   await prisma.animal.deleteMany();
   await prisma.pasture.deleteMany();
   await prisma.passwordResetToken.deleteMany();
   await prisma.user.deleteMany();
   await prisma.farm.deleteMany();

   // =====================
   // FARM
   // =====================
   const farm = await prisma.farm.create({
      data: {
         name: "Fazenda Boa Esperança",
         location: "Guararapes - SP",
         cnpj: "12.345.678/0001-90",
         logoUrl: null,
         active: true,
      },
   });

   // =====================
   // USERS (roles)
   // Permission enum: admin | owner | farmmanager | veterinarian
   // =====================
   const defaultPassword = await bcrypt.hash("123456", 10);

   const admin = await prisma.user.create({
      data: {
         fullName: "Administrador do Sistema",
         username: "admin",
         email: "admin@pecuaria.local",
         phone: "(18) 99999-0000",
         password: defaultPassword,
         role: Permission.admin,
         active: true,
         specialties: [],
         farmId: farm.id,
      },
   });

   const owner = await prisma.user.create({
      data: {
         fullName: "Proprietário da Fazenda",
         username: "owner",
         email: "owner@pecuaria.local",
         phone: "(18) 99999-0001",
         password: defaultPassword,
         role: Permission.owner,
         active: true,
         specialties: [],
         farmId: farm.id,
      },
   });

   const manager = await prisma.user.create({
      data: {
         fullName: "Gerente da Fazenda",
         username: "manager",
         email: "manager@pecuaria.local",
         phone: "(18) 99999-0002",
         password: defaultPassword,
         role: Permission.farmmanager,
         active: true,
         specialties: [],
         farmId: farm.id,
      },
   });

   const vet = await prisma.user.create({
      data: {
         fullName: "Dra. Veterinária",
         username: "vet",
         email: "vet@pecuaria.local",
         phone: "(18) 99999-0003",
         password: defaultPassword,
         role: Permission.veterinarian,
         active: true,
         crmv: "CRMV-SP 12345",
         graduationDate: yearsAgo(8),
         specialties: ["Reprodução", "Clínica"],
         farmId: farm.id,
      },
   });

   // =====================
   // PASTURES
   // =====================
   const pastureA = await prisma.pasture.create({
      data: {
         name: "Pasto A",
         hectares: 12.5,
         type: "Braquiária",
         animalCapacity: 30,
         currentAnimals: 0,
         active: true,
         farmId: farm.id,
      },
   });

   const pastureB = await prisma.pasture.create({
      data: {
         name: "Pasto B",
         hectares: 8.0,
         type: "Mombaça",
         animalCapacity: 20,
         currentAnimals: 0,
         active: true,
         farmId: farm.id,
      },
   });

   // =====================
   // ANIMALS (20 total)
   // 5 bulls (M), 10 cows (F), 5 calves (mix)
   // All born in the farm (origin = "born")
   // =====================
   const breed = "Nelore";

   // Bulls: ~4-6 years old
   const bulls = await Promise.all(
      Array.from({ length: 5 }).map((_, i) =>
         prisma.animal.create({
            data: {
               chipId: `CHIP-BULL-${pad3(i + 1)}`,
               currentEarTag: `BR-T${pad3(i + 1)}`,
               name: `Touro ${pad3(i + 1)}`,
               breed,
               gender: Gender.M,
               birthDate: yearsAgo(randomInt(4, 6)),
               status: AnimalStatus.active,
               origin: "born",
               pastureId: pastureA.id,
               pastureName: pastureA.name,
               farmId: farm.id,
            },
         }),
      ),
   );

   // Cows: ~3-8 years old
   const cows = await Promise.all(
      Array.from({ length: 10 }).map((_, i) =>
         prisma.animal.create({
            data: {
               chipId: `CHIP-COW-${pad3(i + 1)}`,
               currentEarTag: `BR-V${pad3(i + 1)}`,
               name: `Vaca ${pad3(i + 1)}`,
               breed,
               gender: Gender.F,
               birthDate: yearsAgo(randomInt(3, 8)),
               status: AnimalStatus.active,
               origin: "born",
               pastureId: pastureB.id,
               pastureName: pastureB.name,
               farmId: farm.id,
            },
         }),
      ),
   );

   // Calves: 2-10 months old; set sire/dam from created animals
   const calfGenders: Gender[] = [Gender.M, Gender.F, Gender.M, Gender.F, Gender.M];

   const calves = await Promise.all(
      Array.from({ length: 5 }).map((_, i) => {
         const dam = cows[i % cows.length];
         const sire = bulls[i % bulls.length];
         const birthDate = daysAgo(randomInt(60, 300));

         return prisma.animal.create({
            data: {
               chipId: `CHIP-CALF-${pad3(i + 1)}`,
               currentEarTag: `BR-B${pad3(i + 1)}`,
               name: `Bezerro ${pad3(i + 1)}`,
               breed,
               gender: calfGenders[i],
               birthDate,
               status: AnimalStatus.active,
               origin: "born",
               sireId: sire.id,
               damId: dam.id,
               pastureId: pastureB.id,
               pastureName: pastureB.name,
               farmId: farm.id,
            },
         });
      }),
   );

   // =====================
   // EarTagHistory for all animals
   // =====================
   const allAnimals = [...bulls, ...cows, ...calves];

   await prisma.earTagHistory.createMany({
      data: allAnimals
         .filter(a => a.currentEarTag)
         .map(a => ({
            earTagNumber: a.currentEarTag!,
            placementDate: a.birthDate,
            removalDate: null,
            reason: "Identificação inicial",
            farmId: farm.id,
            animalId: a.id,
         })),
   });

   // =====================
   // (Opcional) Alguns cios pra ter dado pra testar tela/listagem
   // =====================
   const cowsForEstrus = cows.slice(0, 5);
   for (const [idx, cow] of cowsForEstrus.entries()) {
      const date = daysAgo(7 + idx * 3);
      await prisma.estrus.create({
         data: {
            date,
            intensity: idx % 3 === 0 ? "strong" : idx % 3 === 1 ? "normal" : "weak",
            nextEstrus: addDays(date, 21),
            farmId: farm.id,
            animalId: cow.id,
            detectedById: manager.id,
         },
      });
   }

   console.log("\n🌱 Seed criado com sucesso!");
   console.log("\nCredenciais de teste (senha: 123456)");
   console.log(`- admin: admin@pecuaria.local (role: ${admin.role})`);
   console.log(`- owner: owner@pecuaria.local (role: ${owner.role})`);
   console.log(`- manager: manager@pecuaria.local (role: ${manager.role})`);
   console.log(`- vet: vet@pecuaria.local (role: ${vet.role})`);
   console.log(`\nFarmId: ${farm.id}`);
}

main()
   .catch(e => {
      console.error("Erro no seed:", e);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
