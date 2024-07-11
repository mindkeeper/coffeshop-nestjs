import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { ResponseBase } from 'src/utils/base.response';
import { z } from 'zod';

const LoginZ = extendApi(
  z.object({
    email: z
      .string()
      .email({ message: 'Invalid email format' })
      .default('user@superadmin.com'),
    password: z.string().min(6, 'min password length: 6').default('test123'),
  }),
);

export class SignInDto extends createZodDto(LoginZ) {}

export class SignInResponse extends createZodDto(
  z.object({
    access_token: z.string(),
  }),
) {}

export class SignInExampleResponse extends createZodDto(
  ResponseBase.extend({
    data: z.object({
      access_token: z.string(),
    }),
  }),
) {}
