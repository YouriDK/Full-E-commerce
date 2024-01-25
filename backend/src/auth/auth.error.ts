import { HttpException } from '@nestjs/common';
import { ErrorHttpStatus } from '../errors/error-handler';

export class TokenInvalidError extends HttpException {
  public constructor(data?: string) {
    super(
      {
        title: `${data ?? 'Invalid token'}`,
        type: '/auth/error-admin',
        status: ErrorHttpStatus.AccessDenied,
        response: 'Invalid userinfo encoding.',
        redirection: true,
      },
      ErrorHttpStatus.AccessDenied,
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
        redirection: true,
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
        redirection: true,
      },
      ErrorHttpStatus.AccessDenied,
    );
  }
}
