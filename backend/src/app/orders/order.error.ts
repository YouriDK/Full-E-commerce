import { HttpException } from '@nestjs/common';
import { ErrorHttpStatus } from 'src/errors/error-handler';

export class CreationOrderFailed extends HttpException {
  public constructor() {
    super(
      {
        title: 'CreationOrderFailed',
        type: '/order-create',
        status: ErrorHttpStatus.BadRequest,
        response: `Creation of an order failed`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
