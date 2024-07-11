import {
  PermissionGroup,
  PrismaClient,
  Role,
  RolePermission,
} from '@prisma/client';
import { superAdminPermissions } from './permission-seed/super-admin.permission';
import { permissionSeed } from './permission-seed/list.permission';

const prisma = new PrismaClient();

async function main() {
  const roleSeed: Role[] = [
    {
      roleKey: 'super-admin',
      roleName: 'Super Admin',
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      roleKey: 'owner',
      roleName: 'owner',
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      roleKey: 'cashier',
      roleName: 'Cashier',
      id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      roleKey: 'bartender',
      roleName: 'Bartender',
      id: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      roleKey: 'waiter',
      roleName: 'Waiter',
      id: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      roleKey: 'user',
      roleName: 'User',
      id: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      roleKey: 'admin',
      roleName: 'Admin',
      id: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  const permissionGroupSeed: PermissionGroup[] = [
    { id: 1, name: 'User', createdAt: new Date(), updatedAt: new Date() },
    { id: 2, name: 'Role', createdAt: new Date(), updatedAt: new Date() },
    { id: 3, name: 'Permission', createdAt: new Date(), updatedAt: new Date() },
    {
      id: 4,
      name: 'PermissionGroup',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const rolePermissionSeed: RolePermission[] = [...superAdminPermissions];

  await prisma.role.createMany({ data: roleSeed });
  await prisma.permissionGroup.createMany({ data: permissionGroupSeed });
  await prisma.permission.createMany({ data: permissionSeed });
  await prisma.rolePermission.createMany({ data: rolePermissionSeed });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
