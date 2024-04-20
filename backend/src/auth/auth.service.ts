import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { UserDto } from '../app/users/dto/create-user.dto';
import {
  UserAlreadyExist,
  UserNotFound,
  WrongPassword,
} from '../app/users/users.error';
import { UsersService } from '../app/users/users.service';
export interface Itoken {
  token: string;
}
@Injectable()
export class AuthService {
  private readonly loggerService = new Logger();
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  // ! Old authentification without Google
  async checkUser(email: string, password: string): Promise<UserDto> {
    this.loggerService.log('☢ Service -> checkUser ☢ ');
    const user: UserDto = await this.usersService.findOnebyEmail(email);
    if (user) {
      const isMatch: boolean = await bcrypt.compare(password, user.password);
      if (isMatch) {
        this.loggerService.log('✅ Service -> checkUser  success ✅');
        return user;
      } else {
        throw new WrongPassword();
      }
    } else {
      throw new UserNotFound(email);
    }
  }

  // ! Old authentification without Google
  async login(user: any): Promise<Itoken> {
    const payload = { email: user.email, _id: user._id, name: user.name };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async registerUser(userDatas: UserDto): Promise<UserDto> {
    this.loggerService.log('☢ Service -> registerUser ☢ ');
    const userCheck: UserDto = await this.usersService.findOnebyEmail(
      userDatas.email,
    );
    if (userCheck) {
      throw new UserAlreadyExist(userDatas.email);
    }
    const user: UserDto = await this.usersService.create({
      ...userDatas,
      admin: false,
    });
    this.loggerService.log('✅ Service -> registerUser  success ✅');
    return user;
  }

  async loginGoogle(token: string): Promise<any> {
    this.loggerService.log('👌 Authentification Via google 👌');
    const upsert = (array: Array<any>, item: any) => {
      const i = array.findIndex((_item) => _item.email === item.email);
      if (i > -1) array[i] = item;
      else array.push(item);
    };
    const client = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    });
    const users: any[] = [];
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, picture, given_name, family_name, sub } =
      ticket.getPayload() as any;

    let user: UserDto = await this.usersService.findOnebyEmail(email);

    if (!user) {
      this.loggerService.log('👌 Create the new user 👌');
      await this.usersService.create({
        name: given_name,
        email: email,
        password: sub,
        admin: false,
      });
      user = await this.usersService.findOnebyEmail(email);
    }
    upsert(users, { name, email, picture, given_name, family_name, sub });
    this.loggerService.log('✅ Authentification Via google  success ✅');
    return {
      name,
      admin: user.admin,
      email,
      picture,
      given_name,
      family_name,
      sub,
      token,
      _id: user._id,
    };
  }
}
