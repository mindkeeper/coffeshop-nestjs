import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';

type TResponse = {
  status: boolean;
  path: string;
  timestamp: string;
  message: string | { [key: string]: string }[] | ZodIssue[];
  statusCode: number;
  data: any;
  stackTrace?: string;
};

@Catch(HttpException, PrismaClientKnownRequestError, ZodError)
export class HttpExceptionFIlter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFIlter.name);
  constructor(private configService: ConfigService) {}
  catch(
    exception: HttpException | PrismaClientKnownRequestError | ZodError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: number;
    let message: string | { [key: string]: string }[] | ZodIssue[];
    const isProd = this.configService.get('NODE_ENV') === 'production';
    if (exception instanceof HttpException) {
      const responseError = exception.getResponse();
      if (typeof responseError === 'string') {
        message = responseError;
      } else {
        message = (responseError as { message: string }).message;
      }
      status = exception.getStatus();
    } else if (exception instanceof PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          status = 400;
          message = `${(exception?.meta?.target as string[])[0]} already exists`;
          break;

        default:
          status = 500; // Default status for unhandled Prisma errors
          message = 'An unexpected database error occurred';
          break;
      }
    } else if (exception instanceof ZodError) {
      status = 400;
      message = exception.issues;
    } else {
      // Default case for unhandled exceptions
      status = 500;
      message = 'An unexpected error occurred';
    }

    this.logger.error(
      `Exception: ${exception.message},Status:${status}, Stack: ${exception.stack}`,
    );

    const responseBody: TResponse = {
      status: false,
      timestamp: new Date().toISOString(),
      message,
      statusCode: status,
      data: null,
      path: request.url,
      stackTrace: exception.stack,
    };

    if (!isProd) {
      delete responseBody.stackTrace;
    }
    response.status(status).json(responseBody); // send response
  }
}
