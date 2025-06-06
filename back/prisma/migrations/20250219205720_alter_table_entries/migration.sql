/*
  Warnings:

  - You are about to drop the column `uniPrice` on the `Entries` table. All the data in the column will be lost.
  - Added the required column `price` to the `Entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entries" DROP COLUMN "uniPrice",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
