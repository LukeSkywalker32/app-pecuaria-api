-- CreateTable
CREATE TABLE "weighings" (
    "id" TEXT NOT NULL,
    "weightKg" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "farmId" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,
    "registeredById" TEXT,

    CONSTRAINT "weighings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "weighings" ADD CONSTRAINT "weighings_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weighings" ADD CONSTRAINT "weighings_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weighings" ADD CONSTRAINT "weighings_registeredById_fkey" FOREIGN KEY ("registeredById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
