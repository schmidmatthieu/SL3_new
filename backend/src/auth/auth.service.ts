import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateOAuthUser(profile: any) {
    let user = await this.usersService.findByEmail(profile.email);
    
    if (!user) {
      user = await this.usersService.create({
        email: profile.email,
        firstName: profile.given_name,
        lastName: profile.family_name,
        picture: profile.picture,
        provider: 'oauth2',
        providerId: profile.sub,
      });
    }

    return user;
  }

  async login(user: any) {
    const payload = { 
      sub: user.id, 
      email: user.email 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
      },
    };
  }

  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('auth.jwt.secret'),
      });
      return payload;
    } catch (error) {
      return null;
    }
  }
}
