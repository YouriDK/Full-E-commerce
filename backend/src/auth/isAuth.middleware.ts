import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../app/users/users.service';
import { TokenInvalidError, TokenMissing } from './auth.error';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly loggerService = new Logger();
  constructor(private readonly userService: UsersService) {}
  async use(req: Request | any, res: Response, next: () => void) {
    this.loggerService.log("🥱 Who are you ? Let's see 🥱");
    const auth = req.headers.authorization;

    // * 2 Check : one for local one for Google and if one of them is good we keep going
    if (!auth) {
      this.loggerService.log("❌ Something ain't right my boy ❌");
      throw new TokenMissing();
    }
    const token = auth.slice(7, auth.length); // * Bearer XXXXX =>  on se débarasse de Bearer
    try {
      const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      });

      const user = await this.userService.findOnebyEmail(
        ticket.getPayload()?.email,
      );
      req.user = user;
    } catch (error: any) {
      console.log(error);
      const err = new TokenInvalidError();
      // res.redirect('/signin');
      this.loggerService.error("❌ Something ain't right my boy ❌");
      if (error.message.includes('Token used too late')) {
        throw new TokenInvalidError('Token used too late');
      }
      throw err;
    }
    this.loggerService.log('💯 You may pass -> 💯');
    next();
    return;
  }
}
