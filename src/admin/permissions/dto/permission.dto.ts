import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { MetaBase, ResponseBase } from 'src/utils';
import { z } from 'zod';

export const PermissionZ = extendApi(
  z.object({
    id: z.number().default(1),
    permissionName: z.string(),
    perimissionKey: z.string(),
    permissionGroup: z.object({
      name: z.string(),
    }),
    permissionGroupName: z.string(),
  }),
);

export class PermissionDto extends createZodDto(PermissionZ) {}
export class PermissionResponse extends createZodDto(
  ResponseBase.extend({
    data: z.object({
      items: z.array(PermissionDto.zodSchema.omit({ permissionGroup: true })),
      meta: MetaBase,
    }),
  }),
) {}