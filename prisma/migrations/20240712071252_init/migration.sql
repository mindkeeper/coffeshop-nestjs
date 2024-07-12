/*
  Warnings:

  - You are about to drop the column `perimissionKey` on the `permissions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[permissionKey]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `permissionKey` to the `permissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "permissions_perimissionKey_key";

-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "perimissionKey",
ADD COLUMN     "permissionKey" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "permissions_permissionKey_key" ON "permissions"("permissionKey");
