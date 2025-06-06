/*
  Warnings:

  - You are about to drop the column `supplier` on the `Movement` table. All the data in the column will be lost.
  - Added the required column `supplier` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movement" DROP COLUMN "supplier";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "supplier" TEXT NOT NULL;
