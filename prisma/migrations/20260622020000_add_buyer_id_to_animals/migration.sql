-- AlterTable
ALTER TABLE "animals" ADD COLUMN "buyerId" TEXT;

-- AddForeignKey
ALTER TABLE "animals" ADD CONSTRAINT "animals_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "buyers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
