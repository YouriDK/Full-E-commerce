import { HttpException } from '@nestjs/common';
import { ErrorHttpStatus } from 'src/errors/error-handler';

export class CreationPaymentResultFailed extends HttpException {
  public constructor() {
    super(
      {
        title: 'CreationPaymentResultFailed',
        type: '/payment-result-create',
        status: ErrorHttpStatus.BadRequest,
        response: `Payment Result instance create failed`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
export class PaymentResultListNotFound extends HttpException {
  public constructor() {
    super(
      {
        title: 'PaymentResultListNotFound',
        type: '/payment-result-list',
        status: ErrorHttpStatus.BadRequest,
        response: `Payment Result ist failed`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
export class PaymentResultNotFound extends HttpException {
  public constructor(id: string) {
    super(
      {
        title: 'PaymentResultNotFound',
        type: '/payment-result-find-one',
        status: ErrorHttpStatus.BadRequest,
        response: `Get ${id} payment-result failed`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
export class UpdatePaymentResultFailed extends HttpException {
  public constructor(id: string) {
    super(
      {
        title: 'UpdatePaymentResultFailed',
        type: '/payment-result-update-one',
        status: ErrorHttpStatus.BadRequest,
        response: `Update ${id} payment-result failed`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
