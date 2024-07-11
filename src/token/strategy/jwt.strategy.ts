import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthsService } from '../../auths/auths.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private authsService: AuthsService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      issuer: configService.get('JWT_ISSUER'),
    });
  }

  async validate(payload: any) {
    const user = await this.authsService.validateUser(payload.email);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    return {
      email: user.email,
      permissions: user.role.permissions.map(
        (p) => p.permission.perimissionKey,
      ),
    };
  }
}
