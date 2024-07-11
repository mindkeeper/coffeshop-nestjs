import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from '../token/strategy';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [PrismaModule, TokenModule],
  controllers: [AuthsController],
  providers: [AuthsService, UsersService, JwtStrategy],
})
export class AuthsModule {}
