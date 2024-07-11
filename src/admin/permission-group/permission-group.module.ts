import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CommonModule } from 'src/common/common.module';
import { PermissionGroupController } from './permission-group.controller';
import { PermissionGroupsService } from './permission-group.service';

@Module({
  controllers: [PermissionGroupController],
  providers: [PermissionGroupsService],
  imports: [PrismaModule, JwtModule, PassportModule, CommonModule],
})
export class PermissiongGroupModule {}
