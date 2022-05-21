import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

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

  // // ! Old authentification without Google
  // @Get('register')
  // public async register(@Body() userDatas: UserDto) {
  //   console.log('⛔ Controller -> register ⛔');
  //   // ! We must not stock the clear password, we have to hash it !
  //   const saltOrRounds = 8;
  //   const password = userDatas.password;
  //   const hash = await bcrypt.hash(password, saltOrRounds);
  //   userDatas.password = hash;
  //   const user = await this.authService.registerUser(userDatas);
  //   if (!user) {
  //     throw new UserCreationFailed();
  //   }
  //   const token: any = await this.authService.login(user);
  //   return {
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     admin: user.admin,
  //     ...token,
  //   };
  // }
}
