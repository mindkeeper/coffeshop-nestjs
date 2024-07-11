/*
  Warnings:

  - The primary key for the `role_permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `role_permissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("permissionId", "roleId");
