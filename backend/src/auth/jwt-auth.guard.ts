import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpired } from 'src/errors/common-error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: { message: string }) {
    console.log('err', err);
    console.log('user', user);
    console.log('info', info);
    if (info && info.message && info.message === 'invalid token') {
      console.log(new TokenExpired());
      throw new TokenExpired();
    }
    // TODO Ajouter le code pour vérifier le token sous forme Google
    // Info Pas forcément nécéssaire car on créer un compte user et c'estc e qu'il vérifie
    // Info Check si quand on est connecté google il sait récup les infos ( todo when front's connected) !
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
