import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
          issuer: configService.get<string>('JWT_ISSUER'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule],
})
export class TokenModule {}
