import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class OAuth2Strategy extends PassportStrategy(Strategy, 'oauth2') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      authorizationURL: configService.get<string>('auth.oauth.authorizationURL'),
      tokenURL: configService.get<string>('auth.oauth.tokenURL'),
      clientID: configService.get<string>('auth.oauth.clientID'),
      clientSecret: configService.get<string>('auth.oauth.clientSecret'),
      callbackURL: configService.get<string>('auth.oauth.callbackURL'),
      scope: configService.get<string[]>('auth.oauth.scope'),
    });
  }

  async validate(accessToken: string): Promise<any> {
    // Fetch user profile from OAuth provider
    const profile = await this.getUserProfile(accessToken);
    
    // Validate and get user from our database
    return this.authService.validateOAuthUser(profile);
  }

  private async getUserProfile(accessToken: string): Promise<any> {
    // Implementation depends on your OAuth provider
    // Example for Google OAuth2:
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    
    return response.json();
  }
}
