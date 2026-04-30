-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('admin', 'owner', 'farmmanager', 'veterinarian');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "AnimalStatus" AS ENUM ('active', 'dead', 'sold', 'quarantine', 'treatment');

-- CreateEnum
CREATE TYPE "EstrusIntensity" AS ENUM ('weak', 'normal', 'strong');

-- CreateEnum
CREATE TYPE "PregnancyStatus" AS ENUM ('not_started', 'in_progress', 'pregnant', 'failed');

-- CreateEnum
CREATE TYPE "AttemptStatus" AS ENUM ('in_progress', 'success', 'failed');

-- CreateEnum
CREATE TYPE "MatingType" AS ENUM ('NATURAL', 'AI');

-- CreateEnum
CREATE TYPE "BirthType" AS ENUM ('normal', 'assisted', 'c_section');

-- CreateEnum
CREATE TYPE "CalfStatus" AS ENUM ('pending', 'complete');

-- CreateEnum
CREATE TYPE "BirthSituation" AS ENUM ('normal', 'dead');

-- CreateEnum
CREATE TYPE "MortalitySeverity" AS ENUM ('mild', 'moderate', 'severe');

-- CreateEnum
CREATE TYPE "UltrasoundResult" AS ENUM ('PREGNANT', 'EMPTY', 'ABSORPTION', 'VIABLE');

-- CreateTable
CREATE TABLE "farms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "cnpj" TEXT,
    "logoUrl" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "farms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "role" "Permission" NOT NULL DEFAULT 'veterinarian',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "crmv" TEXT,
    "graduationDate" TIMESTAMP(3),
    "specialties" TEXT[],
    "resetPasswordToken" TEXT,
    "resetPasswordExpires" TIMESTAMP(3),
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "farmId" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animals" (
    "id" TEXT NOT NULL,
    "chipId" TEXT NOT NULL,
    "currentEarTag" TEXT,
    "name" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "status" "AnimalStatus" NOT NULL DEFAULT 'active',
    "deathDate" TIMESTAMP(3),
    "origin" TEXT NOT NULL DEFAULT 'born',
    "sireId" TEXT,
    "damId" TEXT,
    "sireExternalName" TEXT,
    "sireExternalChip" TEXT,
    "damExternalName" TEXT,
    "damExternalChip" TEXT,
    "pastureId" TEXT,
    "pastureName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "farmId" TEXT NOT NULL,

    CONSTRAINT "animals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ear_tag_history" (
    "id" TEXT NOT NULL,
    "earTagNumber" TEXT NOT NULL,
    "placementDate" TIMESTAMP(3) NOT NULL,
    "removalDate" TIMESTAMP(3),
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "farmId" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,

    CONSTRAINT "ear_tag_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pastures" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hectares" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "animalCapacity" INTEGER NOT NULL,
    "currentAnimals" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "farmId" TEXT NOT NULL,

    CONSTRAINT "pastures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estrus" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "intensity" "EstrusIntensity" NOT NULL,
    "nextEstrus" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "farmId" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,
    "detectedById" TEXT,

    CONSTRAINT "estrus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pregnancies" (
    "id" TEXT NOT NULL,
    "currentStatus" "PregnancyStatus" NOT NULL DEFAULT 'not_started',
    "currentStatusDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "farmId" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,

    CONSTRAINT "pregnancies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attempts" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "matingDate" TIMESTAMP(3) NOT NULL,
    "matingType" "MatingType" NOT NULL,
    "semenName" TEXT,
    "technician" TEXT,
    "estimatedBirthDate" TIMESTAMP(3) NOT NULL,
    "attemptStatus" "AttemptStatus" NOT NULL DEFAULT 'in_progress',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bullId" TEXT,
    "pregnancyId" TEXT NOT NULL,

    CONSTRAINT "attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ultrasounds" (
    "id" TEXT NOT NULL,
    "days" INTEGER NOT NULL,
    "result" "UltrasoundResult" NOT NULL,
    "notes" TEXT,
    "ultrasoundDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attemptId" TEXT NOT NULL,
    "veterinarianId" TEXT,

    CONSTRAINT "ultrasounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "births" (
    "id" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "birthTime" TEXT,
    "birthType" "BirthType" NOT NULL,
    "calfGender" "Gender",
    "calfWeight" DOUBLE PRECISION,
    "calfEarTag" TEXT,
    "calfChip" TEXT,
    "calfStatus" "CalfStatus" NOT NULL DEFAULT 'pending',
    "situation" "BirthSituation" NOT NULL DEFAULT 'normal',
    "deathReason" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "farmId" TEXT NOT NULL,
    "damId" TEXT NOT NULL,
    "attemptId" TEXT,
    "veterinarianId" TEXT,

    CONSTRAINT "births_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vaccinations" (
    "id" TEXT NOT NULL,
    "vaccineType" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "batch" TEXT NOT NULL,
    "vaccinationDate" TIMESTAMP(3) NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "nextDoseDate" TIMESTAMP(3),
    "photoUrl" TEXT,
    "reaction" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "farmId" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,
    "veterinarianId" TEXT,

    CONSTRAINT "vaccinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "managements" (
    "id" TEXT NOT NULL,
    "originPasture" TEXT NOT NULL,
    "destinationPasture" TEXT NOT NULL,
    "movementDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "employee" TEXT NOT NULL,
    "batchId" TEXT,
    "batchTotal" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "farmId" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,

    CONSTRAINT "managements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mortalities" (
    "id" TEXT NOT NULL,
    "deathDate" TIMESTAMP(3) NOT NULL,
    "deathTime" TEXT,
    "deathLocation" TEXT NOT NULL,
    "causeOfDeath" TEXT NOT NULL,
    "severity" "MortalitySeverity",
    "necropsy" BOOLEAN NOT NULL DEFAULT false,
    "disposal" TEXT,
    "photos" TEXT[],
    "origin" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "farmId" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,
    "birthId" TEXT,
    "registeredById" TEXT,

    CONSTRAINT "mortalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_tokens" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "farmId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_farmId_username_key" ON "users"("farmId", "username");

-- CreateIndex
CREATE UNIQUE INDEX "animals_chipId_key" ON "animals"("chipId");

-- CreateIndex
CREATE UNIQUE INDEX "animals_farmId_chipId_key" ON "animals"("farmId", "chipId");

-- CreateIndex
CREATE UNIQUE INDEX "pastures_farmId_name_key" ON "pastures"("farmId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_code_key" ON "password_reset_tokens"("code");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animals" ADD CONSTRAINT "animals_sireId_fkey" FOREIGN KEY ("sireId") REFERENCES "animals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animals" ADD CONSTRAINT "animals_damId_fkey" FOREIGN KEY ("damId") REFERENCES "animals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animals" ADD CONSTRAINT "animals_pastureId_fkey" FOREIGN KEY ("pastureId") REFERENCES "pastures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animals" ADD CONSTRAINT "animals_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ear_tag_history" ADD CONSTRAINT "ear_tag_history_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ear_tag_history" ADD CONSTRAINT "ear_tag_history_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pastures" ADD CONSTRAINT "pastures_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estrus" ADD CONSTRAINT "estrus_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estrus" ADD CONSTRAINT "estrus_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estrus" ADD CONSTRAINT "estrus_detectedById_fkey" FOREIGN KEY ("detectedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pregnancies" ADD CONSTRAINT "pregnancies_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pregnancies" ADD CONSTRAINT "pregnancies_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_bullId_fkey" FOREIGN KEY ("bullId") REFERENCES "animals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_pregnancyId_fkey" FOREIGN KEY ("pregnancyId") REFERENCES "pregnancies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ultrasounds" ADD CONSTRAINT "ultrasounds_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ultrasounds" ADD CONSTRAINT "ultrasounds_veterinarianId_fkey" FOREIGN KEY ("veterinarianId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "births" ADD CONSTRAINT "births_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "births" ADD CONSTRAINT "births_damId_fkey" FOREIGN KEY ("damId") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "births" ADD CONSTRAINT "births_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "attempts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "births" ADD CONSTRAINT "births_veterinarianId_fkey" FOREIGN KEY ("veterinarianId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vaccinations" ADD CONSTRAINT "vaccinations_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vaccinations" ADD CONSTRAINT "vaccinations_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vaccinations" ADD CONSTRAINT "vaccinations_veterinarianId_fkey" FOREIGN KEY ("veterinarianId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "managements" ADD CONSTRAINT "managements_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "managements" ADD CONSTRAINT "managements_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mortalities" ADD CONSTRAINT "mortalities_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mortalities" ADD CONSTRAINT "mortalities_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mortalities" ADD CONSTRAINT "mortalities_birthId_fkey" FOREIGN KEY ("birthId") REFERENCES "births"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mortalities" ADD CONSTRAINT "mortalities_registeredById_fkey" FOREIGN KEY ("registeredById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
