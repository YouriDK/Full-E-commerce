import { HttpException } from '@nestjs/common';
import { ErrorHttpStatus } from '../../errors/error-handler';

export class CreationProductFailed extends HttpException {
  public constructor() {
    super(
      {
        title: 'CreationProductFailed',
        type: '/product-create',
        status: ErrorHttpStatus.BadRequest,
        response: `Creation of product failed`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
export class ProductListNotFound extends HttpException {
  public constructor() {
    super(
      {
        title: 'ProductListNotFound',
        type: '/product-get-all',
        status: ErrorHttpStatus.NotFound,
        response: `Get list products failed`,
      },
      ErrorHttpStatus.NotFound,
    );
  }
}
export class ProductNotFound extends HttpException {
  public constructor(id: string) {
    super(
      {
        title: 'ProductNotFound',
        type: '/product-get-one',
        status: ErrorHttpStatus.NotFound,
        response: `Get product ${id} failed`,
      },
      ErrorHttpStatus.NotFound,
    );
  }
}
export class UpdateProductFailed extends HttpException {
  public constructor(id: string) {
    super(
      {
        title: 'UpdateProductFailed',
        type: '/product-update',
        status: ErrorHttpStatus.BadRequest,
        response: `Update product ${id} failed`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
