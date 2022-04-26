import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/app/users/dto/create-user.dto';
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
}
