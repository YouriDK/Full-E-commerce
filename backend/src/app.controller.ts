import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    console.log('Hello');
    return this.appService.getStart();
  }
  @Get('paypal')
  getIdPaypal(): string {
    console.log('💲Get Paypal Intel💲');
    return process.env.PAYPAL_CLIENT_ID || 'sb';
  }
  @Post('/login')
  public async login(@Request() req: any, @Body() Body: any) {
    console.log('⛔ Controller -> login ⛔');
    const token = Body.token;
    const userInfo: any = await this.authService.loginGoogle(token);

    return {
      _id: userInfo._id,
      name: userInfo.family_name,
      email: userInfo.email,
      admin: userInfo.admin,
      token: userInfo.token,
    };
  }
  @Get('profile')
  public getProfile(@Request() req) {
    // * JwtAuthGuard will check the token
    // TODO do a redirect when the token expired
    return req.user;
  }
}
