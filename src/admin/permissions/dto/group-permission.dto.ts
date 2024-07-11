import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { MetaBase, ResponseBase } from 'src/utils';
import { z } from 'zod';

const PermissionGroupZ = extendApi(
  z.object({
    name: z.string(),
    id: z.string(),
  }),
);

export class PermissionGroupDto extends createZodDto(
  PermissionGroupZ.omit({ id: true }),
) {}

export class PermissionGroupResponse extends createZodDto(
  ResponseBase.extend({
    data: z.object({
      items: z.array(PermissionGroupDto.zodSchema),
      meta: MetaBase,
    }),
  }),
) {}
