import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstant } from 'src/constant';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthsService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const hashedPassword = bcrypt.hashSync(signUpDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: signUpDto.email,
        password: hashedPassword,
        roleId: signUpDto.roleId,
      },
      select: {
        email: true,
      },
    });
    return user;
  }

  async authorize({ email, password }: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        password: true,
      },
    });
    if (!user)
      throw new UnauthorizedException('Email or password is incorrect');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Email or password is incorrect');

    return { email: user.email };
  }

  createToken(user: any) {
    const token = this.jwtService.sign(user);
    return { access_token: token };
  }

  createRefreshToken(user: any) {
    const token = this.jwtService.sign(user, {
      secret: jwtConstant.JWT_REFRESH_SECRET,
      expiresIn: jwtConstant.JWT_REFRESH_EXPIRES_IN,
    });
    return { refresh_token: token };
  }

  validateUser(email: string) {
    return this.userService.findByEmail(email);
  }
}
