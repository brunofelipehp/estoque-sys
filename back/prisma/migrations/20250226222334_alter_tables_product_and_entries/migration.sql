/*
  Warnings:

  - You are about to drop the column `category` on the `Entries` table. All the data in the column will be lost.
  - You are about to drop the column `supplier` on the `Product` table. All the data in the column will be lost.
  - Added the required column `supplier` to the `Entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entries" DROP COLUMN "category",
ADD COLUMN     "supplier" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "supplier";
