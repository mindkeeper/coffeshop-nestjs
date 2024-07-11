import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';

@Catch(NotFoundException)
export class RouteExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response.status(404).json({
      status: false,
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: `Cannot find ${request.method} ${request.url}`,
      data: null,
    });
  }
}
