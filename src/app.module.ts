import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthsModule } from './auths/auths.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import * as cookieParser from 'cookie-parser';
import { jwtConstant } from './constant';
import { UsersModule } from './users/users.module';
import { TokenModule } from './token/token.module';
import { PermissionsModule } from './admin/permissions/permissions.module';
import { AdminModule } from './admin/admin.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    AuthsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    UsersModule,
    TokenModule,
    PermissionsModule,
    AdminModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser(jwtConstant.JWT_COOKIE_SECRET)).forRoutes('*');
  }
}
