import { Body, Controller, Get, Post, Request, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import path from 'path';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
@ApiTags('Application')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(@Res() res: any): string {
    console.log('PATH', __dirname, '../../frontend/build/index.html');
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
    return this.appService.getStart();
  }
  @Get('paypal')
  @ApiResponse({ status: 200, description: 'Get Access to pay with paypal' })
  getIdPaypal(): string {
    console.log('💲Get Paypal Intel💲');
    return process.env.PAYPAL_CLIENT_ID || 'sb';
  }
  @Post('/login')
  @ApiResponse({
    status: 200,

    description: 'Check token to connect with google',
  })
  public async login(@Request() req: any, @Body() Body: any) {
    console.log('⛔ Controller -> login ⛔');
    const token = Body.token;
    const userInfo: any = await this.authService.loginGoogle(token);

    return {
      _id: userInfo._id,
      name: userInfo.family_name,
      given_name: userInfo.given_name,
      family_name: userInfo.family_name,
      email: userInfo.email,
      admin: userInfo.admin,
      token: userInfo.token,
    };
  }
  @Get('profile')
  @ApiResponse({ description: 'Deprecated' })
  public getProfile(@Request() req) {
    // * JwtAuthGuard will check the token
    // TODO do a redirect when the token expired
    return req.user;
  }
}
