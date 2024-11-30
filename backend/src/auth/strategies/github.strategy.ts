import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('auth.github.clientID'),
      clientSecret: configService.get<string>('auth.github.clientSecret'),
      callbackURL: configService.get<string>('auth.github.callbackURL'),
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ): Promise<any> {
    const user = {
      email: profile.emails[0].value,
      firstName: profile.displayName?.split(' ')[0] || '',
      lastName: profile.displayName?.split(' ')[1] || '',
      picture: profile.photos[0].value,
      provider: 'github',
      providerId: profile.id,
    };

    const validatedUser = await this.authService.validateOAuthUser(user);
    done(null, validatedUser);
  }
}
