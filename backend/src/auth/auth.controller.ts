import { Controller, Get, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  async googleAuth() {
    // Redirect to Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth callback handler' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  async googleCallback(@Req() req: any, @Res() res: Response) {
    return this.handleOAuthCallback(req, res);
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({ summary: 'Initiate GitHub OAuth login' })
  async githubAuth() {
    // Redirect to GitHub
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({ summary: 'GitHub OAuth callback handler' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  async githubCallback(@Req() req: any, @Res() res: Response) {
    return this.handleOAuthCallback(req, res);
  }

  private async handleOAuthCallback(@Req() req: any, @Res() res: Response) {
    const { access_token, user } = await this.authService.login(req.user);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/auth/callback?token=${access_token}`);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Req() req: any) {
    return req.user;
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logout user' })
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.status(HttpStatus.OK).json({ message: 'Logged out successfully' });
  }
}
