import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { config } from 'dotenv';
import { Strategy } from 'passport-google-oauth20';
import { UsersService } from 'src/app/users/users.service';

config();
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    // private authService: AuthService,
    private usersService: UsersService,
  ) {
    super({
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/redirect',
      scope: ['email', 'profile'],
    });
    // super({ usernameField: 'token' });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    // done: VerifyCallback,
  ): Promise<any> {
    console.log('DONE');
    const prof = profile;
    console.log('profilte', prof);
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    // done(null, user);
    console.log('user', user);
    return user;
  }
  // async validate(token: string): Promise<any> {
  //   console.log('👌 Authentification Via LocalStrategy google 👌');
  //   const upsert = (array: Array<any>, item: any) => {
  //     const i = array.findIndex((_item) => _item.email === item.email);
  //     if (i > -1) array[i] = item;
  //     else array.push(item);
  //   };
  //   const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
  //   const users: any[] = [];
  //   const ticket = await client.verifyIdToken({
  //     idToken: token,
  //     audience: process.env.CLIENT_ID,
  //   });
  //   const { name, email, picture, given_name, family_name, sub } =
  //     ticket.getPayload() as any;
  //   let user: UserDto = await this.usersService.findOnebyEmail(email);
  //   if (!user) {
  //     await this.usersService.create(email);
  //     user = await this.usersService.findOnebyEmail(email);
  //   }
  //   upsert(users, { name, email, picture, given_name, family_name, sub });
  //   console.log('✅ Authentification Via LocalStrategy google  success ✅');
  //   return {
  //     name,
  //     email,
  //     picture,
  //     given_name,
  //     family_name,
  //     sub,
  //     token,
  //     _id: user._id,
  //   };
  // }
}
