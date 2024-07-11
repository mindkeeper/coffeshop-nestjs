import { Permission } from '@prisma/client';

export const permissionSeed: Permission[] = [
  {
    id: 1,
    perimissionKey: 'create-user',
    permissionName: 'Create User',
    permissionGroupId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    perimissionKey: 'update-user',
    permissionName: 'Update User',
    permissionGroupId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    perimissionKey: 'delete-user',
    permissionName: 'Delete User',
    permissionGroupId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    perimissionKey: 'get-users',
    permissionName: 'Get Users',
    permissionGroupId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    perimissionKey: 'get-user-details',
    permissionName: 'Get User Details',
    permissionGroupId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    perimissionKey: 'create-role',
    permissionName: 'Create Role',
    permissionGroupId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    perimissionKey: 'update-role',
    permissionName: 'Update Role',
    permissionGroupId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    perimissionKey: 'delete-role',
    permissionName: 'Delete Role',
    permissionGroupId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    perimissionKey: 'get-roles',
    permissionName: 'Get Roles',
    permissionGroupId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    perimissionKey: 'get-role-details',
    permissionName: 'Get Role Details',
    permissionGroupId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 11,
    perimissionKey: 'create-permission',
    permissionName: 'Create Permission',
    permissionGroupId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 12,
    perimissionKey: 'update-permission',
    permissionName: 'Update Permission',
    permissionGroupId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 13,
    perimissionKey: 'delete-permission',
    permissionName: 'Delete Permission',
    permissionGroupId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 14,
    perimissionKey: 'get-permissions',
    permissionName: 'Get Permissions',
    permissionGroupId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 15,
    perimissionKey: 'get-permission-details',
    permissionName: 'Get Permission Details',
    permissionGroupId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 16,
    perimissionKey: 'create-permission-group',
    permissionName: 'Create Permission Group',
    permissionGroupId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 17,
    perimissionKey: 'update-permission-group',
    permissionName: 'Update Permission Group',
    permissionGroupId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 18,
    perimissionKey: 'delete-permission-group',
    permissionName: 'Delete Permission Group',
    permissionGroupId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 19,
    perimissionKey: 'get-permission-groups',
    permissionName: 'Get Permission Groups',
    permissionGroupId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 20,
    perimissionKey: 'get-permission-group-details',
    permissionName: 'Get Permission Group Details',
    permissionGroupId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
