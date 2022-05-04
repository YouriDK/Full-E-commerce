import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/app/users/dto/create-user.dto';
import { OAuth2Client } from 'google-auth-library';
import {
  UserAlreadyExist,
  UserNotFound,
  WrongPassword,
} from 'src/app/users/users-error';
import { UsersService } from 'src/app/users/users.service';
export interface Itoken {
  token: string;
}
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async checkUser(email: string, password: string): Promise<UserDto> {
    console.log('☢ Service -> checkUser ☢ ');
    const user: UserDto = await this.usersService.findOnebyEmail(email);
    if (user) {
      const isMatch: boolean = await bcrypt.compare(password, user.password);
      if (isMatch) {
        console.log('✅ Service -> checkUser  success ✅');
        return user;
      } else {
        const err = new WrongPassword();
        console.log(err);
        throw err;
      }
    } else {
      const err = new UserNotFound(email);
      console.log(err);
      throw err;
    }
  }

  async login(user: any): Promise<Itoken> {
    const payload = { email: user.email, _id: user._id, name: user.name };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async registerUser(userDatas: UserDto): Promise<UserDto> {
    console.log('☢ Service -> registerUser ☢ ');
    const userCheck: UserDto = await this.usersService.findOnebyEmail(
      userDatas.email,
    );
    if (userCheck) {
      const err = new UserAlreadyExist(userDatas.email);
      console.log(err);
      throw err;
    }
    const user: UserDto = await this.usersService.create({
      ...userDatas,
      admin: false,
    });
    console.log('✅ Service -> registerUser  success ✅');
    return user;
  }

  async loginGoogle(token: string): Promise<any> {
    console.log('👌 Authentification Via google 👌');
    const upsert = (array: Array<any>, item: any) => {
      const i = array.findIndex((_item) => _item.email === item.email);
      if (i > -1) array[i] = item;
      else array.push(item);
    };
    const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    const users: any[] = [];
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const { name, email, picture, given_name, family_name, sub } =
      ticket.getPayload() as any;
    let user: UserDto = await this.usersService.findOnebyEmail(email);
    if (!user) {
      await this.usersService.create(email);
      user = await this.usersService.findOnebyEmail(email);
    }
    upsert(users, { name, email, picture, given_name, family_name, sub });
    console.log('✅ Authentification Via google  success ✅');
    return {
      name,
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
