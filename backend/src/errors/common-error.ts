import { HttpException } from '@nestjs/common';
import { ErrorHttpStatus } from './error-handler';

export class TokenExpired extends HttpException {
  public constructor() {
    super(
      {
        title: 'TokenExpired',
        type: '/check-token',
        status: ErrorHttpStatus.BadRequest,
        response: `Your token has expired !`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
