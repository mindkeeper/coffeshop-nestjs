import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const authZ = extendApi(
  z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z
      .string()
      .min(6, 'min password length: 6')
      .max(20, 'max password length:20')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        'password must atleast have a number and a character',
      ),
    roleId: z.number().optional().default(3),
  }),
);

export class SignUpDto extends createZodDto(authZ) {}
export class SignUpResponse extends createZodDto(
  z.object({
    access_token: z.string(),
  }),
) {}
