import { SetMetadata } from '@nestjs/common';

export const responseMessageKey = 'responseMessage';
export const responseMessage = (message: string) =>
  SetMetadata(responseMessageKey, message);
