import {
  Controller,
  Post,
  Body,
  UsePipes,
  HttpCode,
  Res,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import {
  SignInDto,
  SignInExampleResponse,
  SignInResponse,
  SignUpDto,
  SignUpExampleResponse,
  SignUpResponse,
} from './dto';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Response } from 'express';
import { jwtConstant } from 'src/constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auths')
@ApiTags('auths')
@UsePipes(ZodValidationPipe)
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('sign-up')
  @ApiResponse({ status: 200, type: SignUpExampleResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignUpResponse> {
    const user = await this.authsService.signUp(signUpDto);
    const token = this.authsService.createToken(user);
    const refreshToken = this.authsService.createRefreshToken(user);
    res.cookie('refresh_token', refreshToken.refresh_token, {
      httpOnly: jwtConstant.JWT_COOKIE_HTTP_ONLY,
      secure: jwtConstant.JWT_COOKIE_SECURE,
      maxAge: jwtConstant.JWT_COOKIE_MAX_AGE,
      sameSite: 'none',
      signed: true,
    });
    return token;
  }

  @Post('sign-in')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: SignInExampleResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignInResponse> {
    const user = await this.authsService.authorize(signInDto);
    const token = this.authsService.createToken(user);
    const refreshToken = this.authsService.createRefreshToken(user);
    res.cookie('refresh_token', refreshToken.refresh_token, {
      httpOnly: jwtConstant.JWT_COOKIE_HTTP_ONLY,
      secure: jwtConstant.JWT_COOKIE_SECURE,
      maxAge: jwtConstant.JWT_COOKIE_MAX_AGE,
      sameSite: 'none',
      signed: true,
    });
    return token;
  }
}
