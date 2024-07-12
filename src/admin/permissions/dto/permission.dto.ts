import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { MetaBase, ResponseBase } from 'src/utils';
import { z } from 'zod';

export const PermissionZ = extendApi(
  z.object({
    id: z.number(),
    permissionName: z.string(),
    permissionKey: z.string(),
    permissionGroup: z.object({
      name: z.string(),
    }),
    permissionGroupName: z.string(),
    roles: z.array(
      z.object({ id: z.number(), roleKey: z.string(), roleName: z.string() }),
    ),
  }),
);

export const AllPermissions = z.object({
  items: z.array(PermissionZ.omit({ permissionGroup: true, roles: true })),
  meta: MetaBase,
});
export class PermissionResponse extends createZodDto(
  ResponseBase.extend({
    data: AllPermissions,
  }),
) {}

export class PermissionDetailResponse extends createZodDto(
  ResponseBase.extend({
    data: PermissionZ,
  }),
) {}

export class PermissionDto extends createZodDto(
  z.array(
    PermissionZ.pick({ permissionName: true, permissionKey: true })
      .extend({
        permissionGroupId: z.number(),
      })
      .required(),
  ),
) {}

export type TAllPermissions = z.infer<typeof AllPermissions>;
export type TPermissionDetail = Omit<
  z.infer<typeof PermissionZ>,
  'permissionGroup' | 'roles'
>;
const EPermissionDto = z
  .array(
    z.object({
      permissionName: z.string(),
      permissionKey: z.string(),
      permissionGroupId: z.number(),
    }),
  )
  .nonempty();

export type TPermissionDto = z.infer<typeof EPermissionDto>;

export type TPermissionQuery = {
  permissionName: string;
  permissionGroup: string;
  page: number;
  perPage: number;
  sortField: string;
  sortDirection: string;
};
