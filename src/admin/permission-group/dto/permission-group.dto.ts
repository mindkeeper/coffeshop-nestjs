import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { MetaBase, ResponseBase } from 'src/utils';
import { z } from 'zod';

export const PermissionGroupZ = extendApi(
  z.object({
    id: z.number(),
    name: z.string(),
    permissions: z.array(
      z.object({
        id: z.number(),
        permissionName: z.string(),
        permissionKey: z.string(),
      }),
    ),
  }),
);

const BasePermissionGroups = z.object({
  items: z.array(PermissionGroupZ.omit({ permissions: true })),
  meta: MetaBase,
});
export class PermissionGroupDto extends createZodDto(
  PermissionGroupZ.omit({ id: true, permissions: true }),
) {}

export class PermissionGroupResponse extends createZodDto(
  ResponseBase.extend({
    data: BasePermissionGroups,
  }),
) {}

export const CreateGroupResponse = createZodDto(
  ResponseBase.extend({
    data: PermissionGroupZ.omit({ permissions: true }),
  }),
);

export type TCreateGroupResponse = Omit<
  z.infer<typeof PermissionGroupZ>,
  'permissions'
>;
export type TBasePermissionGroups = z.infer<typeof BasePermissionGroups>;
export type TPermissionDetail = z.infer<typeof PermissionGroupZ>;
