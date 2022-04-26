import { HttpException } from '@nestjs/common';
import { ErrorHttpStatus } from 'src/errors/error-handler';

export class CreationItemFailed extends HttpException {
  public constructor() {
    super(
      {
        title: 'CreationItemFailed',
        type: '/item-create',
        status: ErrorHttpStatus.BadRequest,
        response: `item instance create failed`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
export class ItemListNotFound extends HttpException {
  public constructor() {
    super(
      {
        title: 'ItemListNotFound',
        type: '/item-list',
        status: ErrorHttpStatus.BadRequest,
        response: `item list fetch failed`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}

export class ItemNotFound extends HttpException {
  public constructor(id: string) {
    super(
      {
        title: 'ItemNotFound',
        type: '/item-find-one',
        status: ErrorHttpStatus.BadRequest,
        response: `Get ${id} item failed`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
export class UpdateItemFailed extends HttpException {
  public constructor(id: string) {
    super(
      {
        title: 'UpdateItemFailed',
        type: '/item-update-one',
        status: ErrorHttpStatus.BadRequest,
        response: `Update ${id} item failed`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
