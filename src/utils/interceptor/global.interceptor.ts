import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { responseMessageKey } from '../decorator';
import { ZodIssue } from 'zod';

export interface IResponse<T> {
  status: boolean;
  statusCode: any;
  path: string;
  timestamp: string;
  message: string | { [key: string]: string }[] | ZodIssue[];
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    const message =
      this.reflector.get<string>(responseMessageKey, context.getHandler()) ||
      'Success';

    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        status: true,
        message,
        timestamp: new Date().toISOString(),
        path: context.switchToHttp().getRequest().url,
        data,
      })),
    );
  }
}
