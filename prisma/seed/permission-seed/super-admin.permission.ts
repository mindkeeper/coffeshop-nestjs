import { RolePermission } from '@prisma/client';
import { permissionSeed } from './list.permission';

export const superAdminPermissions: RolePermission[] = permissionSeed.map(
  (permission, index) => ({
    id: index + 1,
    permissionId: permission.id,
    roleId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
);
