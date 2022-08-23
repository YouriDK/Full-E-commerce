import { HttpException } from '@nestjs/common';
import { ErrorHttpStatus } from '../../errors/error-handler';

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
export class OrderListFailed extends HttpException {
  public constructor() {
    super(
      {
        title: 'OrderListFailed',
        type: '/order-list',
        status: ErrorHttpStatus.BadRequest,
        response: `Cannot get list !`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
export class OrderNotFound extends HttpException {
  public constructor(id: string) {
    super(
      {
        title: 'OrderNotFound',
        type: '/order-get-one',
        status: ErrorHttpStatus.BadRequest,
        response: `Cannot get this ${id} order !`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
export class UpdateOrderFailed extends HttpException {
  public constructor(id: string) {
    super(
      {
        title: 'UpdateOrderFailed',
        type: '/order-update-one',
        status: ErrorHttpStatus.BadRequest,
        response: `Cannot update this ${id} order !`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
