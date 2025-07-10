import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CommonJwtService {
  constructor(private readonly jwtService: JwtService) {}

  signAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
  }

  signRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '24h',
    });
  }

  verifyRefreshToken(token: string) {
    return this.jwtService.verify(token, { secret: process.env.JWT_REFRESH_SECRET });
  }
}
