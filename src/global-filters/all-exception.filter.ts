import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

type TResponse = {
  status: boolean;
  timestamp: string;
  path: string;
  statusCode: number;
  message: string;
  data: any;
};

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  constructor(private httpAdapterHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(
      `Exception: ${exception.message},Status:${status}, Stack: ${exception.stack}`,
    );

    const responseBody: TResponse = {
      status: false,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      message: 'Internal server error',
      statusCode: status,
      data: null,
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}
