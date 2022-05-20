import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Body,
  Req,
  Res,
  Header,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './app/users/dto/create-user.dto';
import { UserCreationFailed } from './app/users/users-error';
import { AuthService } from './auth/auth.service';
import { GoogleAuthGuard } from './auth/google-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import * as bcrypt from 'bcrypt';

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
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @Header('Access-Control-Allow-Origin', '*')
  public async login(@Request() req: any) {
    // * LocalAuthGuard will do the connection
    // * Now we juste have to get the token get send back all the intels
    console.log('⛔ Controller -> login ⛔', req.user);
    const user = req.user;
    const token: any = await this.authService.login(user);
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      ...token,
    };
  }
  //@Body() body: any
  // TODO Mettre l'appel pour la connection Google
  @Get('login/google')
  @UseGuards(GoogleAuthGuard)
  public async loginGoogle(@Req() req: any) {
    console.log('⛔ Controller -> login Google⛔', req.user);
  }

  @Get('redirect')
  @Header('Access-Control-Allow-Origin', '*')
  @UseGuards(GoogleAuthGuard)
  public googleSuccess(@Req() req: any, @Res() res: any) {
    console.log('⛔ Controller -> redirect ⛔', req.user);
    // * JwtAuthGuard will check the token
    // TODO do a redirect when the token expired

    // const token = body.token;
    // const infos: any = await this.authService.loginGoogle(token);
    // console.log(infos);
    // // ! Pas sur que ce soit le bon token
    // return {
    //   _id: infos._id,
    //   name: infos.family_name,
    //   email: infos.email,
    //   admin: infos.admin,
    //   token: infos.token,
    // };
    console.log('USER');
    console.log('req.user', req.user);
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public getProfile(@Request() req) {
    // * JwtAuthGuard will check the token
    // TODO do a redirect when the token expired
    return req.user;
  }

  @Get('register')
  public async register(@Body() userDatas: UserDto) {
    console.log('⛔ Controller -> register ⛔');
    // ! We must not stock the clear password, we have to hash it !
    const saltOrRounds = 8;
    const password = userDatas.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    userDatas.password = hash;
    const user = await this.authService.registerUser(userDatas);
    if (!user) {
      throw new UserCreationFailed();
    }
    const token: any = await this.authService.login(user);
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      ...token,
    };
  }
}
