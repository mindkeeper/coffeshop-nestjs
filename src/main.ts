import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { ConfigService } from '@nestjs/config';
import {
  AllExceptionFilter,
  HttpExceptionFIlter,
  RouteExceptionFilter,
} from './global-filters';
import { TransformInterceptor } from './utils/interceptor/global.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  // app.useGlobalPipes(new ZodValidationPipe());
  // global interceptor
  const configservice = app.get(ConfigService);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const reflector = app.get(Reflector);

  app.useGlobalFilters(
    new AllExceptionFilter(httpAdapterHost),
    new RouteExceptionFilter(),
    new HttpExceptionFIlter(configservice),
  );

  // interceptor
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  // swagger

  const config = new DocumentBuilder()
    .setTitle('coffeshop')
    .setDescription('coffeshop API documentation')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  patchNestjsSwagger();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    useGlobalPrefix: false,
    swaggerOptions: { persistAuthorization: true },
  });
  await app.listen(8080);
}
bootstrap();
