import { HttpException } from '@nestjs/common';
import { ErrorHttpStatus } from 'src/errors/error-handler';

export class CreationShippingAddressFailed extends HttpException {
  public constructor() {
    super(
      {
        title: 'CreationShippingAddressFailed',
        type: '/shipping-address-create',
        status: ErrorHttpStatus.BadRequest,
        response: `Shipping address instance create failed`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
export class ShippingAddressListNotFound extends HttpException {
  public constructor() {
    super(
      {
        title: 'ShippingAddressListNotFound',
        type: '/shipping-address-list',
        status: ErrorHttpStatus.BadRequest,
        response: `Shipping address list failed`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
export class ShippingAddressNotFound extends HttpException {
  public constructor(id: string) {
    super(
      {
        title: 'ShippingAddressNotFound',
        type: '/shipping-address-find-one',
        status: ErrorHttpStatus.BadRequest,
        response: `Get ${id} shipping adress failed`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
export class UpdateShippingAddressFailed extends HttpException {
  public constructor(id: string) {
    super(
      {
        title: 'ShippingAddressNotFound',
        type: '/shipping-address-update',
        status: ErrorHttpStatus.BadRequest,
        response: `Update ${id} shipping adress failed`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
