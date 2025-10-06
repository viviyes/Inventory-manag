/*
  Warnings:

  - The primary key for the `Purchases` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `purchasedId` on the `Purchases` table. All the data in the column will be lost.
  - You are about to drop the column `timeStamp` on the `Purchases` table. All the data in the column will be lost.
  - You are about to drop the column `uniCoast` on the `Purchases` table. All the data in the column will be lost.
  - You are about to drop the column `uniPrice` on the `Sales` table. All the data in the column will be lost.
  - Added the required column `purchaseId` to the `Purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitCost` to the `Purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Purchases" DROP CONSTRAINT "Purchases_pkey",
DROP COLUMN "purchasedId",
DROP COLUMN "timeStamp",
DROP COLUMN "uniCoast",
ADD COLUMN     "purchaseId" TEXT NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "unitCost" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "Purchases_pkey" PRIMARY KEY ("purchaseId");

-- AlterTable
ALTER TABLE "public"."Sales" DROP COLUMN "uniPrice",
ADD COLUMN     "unitPrice" DOUBLE PRECISION NOT NULL;
