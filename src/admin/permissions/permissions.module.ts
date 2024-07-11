import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
  imports: [PrismaModule, JwtModule, PassportModule, CommonModule],
})
export class PermissionsModule {}
