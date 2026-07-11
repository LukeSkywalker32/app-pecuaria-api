/*
  Warnings:

  - You are about to drop the column `photoUrl` on the `vaccinations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vaccinations" DROP COLUMN "photoUrl",
ADD COLUMN     "photos" TEXT[];
