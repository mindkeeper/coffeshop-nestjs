/*
  Warnings:

  - You are about to drop the `permissionGroups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_permissionGroupId_fkey";

-- DropTable
DROP TABLE "permissionGroups";

-- CreateTable
CREATE TABLE "permission_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "permission_groups_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_permissionGroupId_fkey" FOREIGN KEY ("permissionGroupId") REFERENCES "permission_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
