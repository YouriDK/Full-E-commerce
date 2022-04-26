import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from 'src/app/users/users.service';
import { UserDto } from 'src/app/users/dto/create-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    // private authService: AuthService,
    private usersService: UsersService,
  ) {
    super({ usernameField: 'token' });
  }

  async validate(token: string): Promise<any> {
    console.log('👌 Authentification Via LocalStrategy google 👌');
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
    console.log('✅ Authentification Via LocalStrategy google  success ✅');
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
