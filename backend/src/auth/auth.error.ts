import { HttpException } from '@nestjs/common';
import { ErrorHttpStatus } from '../errors/error-handler';

export class TokenInvalidError extends HttpException {
  public constructor() {
    super(
      {
        title: 'Invalid token',
        type: '/auth/error-admin',
        status: ErrorHttpStatus.AccessDenied,
        response: 'Invalid userinfo encoding.',
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}

export class AdminError extends HttpException {
  public constructor() {
    super(
      {
        title: 'Admin Failed',
        type: '/auth/error-admin',
        status: ErrorHttpStatus.AccessDenied,
        response: `Checking admin failed`,
      },
      ErrorHttpStatus.AccessDenied,
    );
  }
}
export class TokenMissing extends HttpException {
  public constructor() {
    super(
      {
        title: 'Token Missing',
        type: '/auth/token-missing',
        status: ErrorHttpStatus.AccessDenied,
        response: `The token is missing`,
      },
      ErrorHttpStatus.AccessDenied,
    );
  }
}
