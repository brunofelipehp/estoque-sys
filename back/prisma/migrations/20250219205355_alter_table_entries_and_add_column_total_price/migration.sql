/*
  Warnings:

  - You are about to drop the column `price` on the `Entries` table. All the data in the column will be lost.
  - Added the required column `totalPrice` to the `Entries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniPrice` to the `Entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entries" DROP COLUMN "price",
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "uniPrice" DOUBLE PRECISION NOT NULL;
