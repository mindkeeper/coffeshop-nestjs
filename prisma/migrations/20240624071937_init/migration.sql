/*
  Warnings:

  - You are about to alter the column `name` on the `permission_groups` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `perimissionKey` on the `permissions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `permissionName` on the `permissions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `firstName` on the `profiles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `lastName` on the `profiles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `roleKey` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `roleName` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `username` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `phoneNumer` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.

*/
-- AlterTable
ALTER TABLE "permission_groups" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "permissions" ALTER COLUMN "perimissionKey" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "permissionName" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "roleKey" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "roleName" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "username" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "phoneNumer" SET DATA TYPE VARCHAR(25);
