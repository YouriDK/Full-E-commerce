import { HttpException } from '@nestjs/common';
import { ErrorHttpStatus } from 'src/errors/error-handler';

export class UserNotFound extends HttpException {
  public constructor(email: string) {
    super(
      {
        title: 'UserNotFound',
        type: '/login',
        status: ErrorHttpStatus.NotFound,
        response: `${email} does not exist !`,
      },
      ErrorHttpStatus.NotFound,
    );
  }
}
export class WrongPassword extends HttpException {
  public constructor() {
    super(
      {
        title: 'WrongPassword',
        type: '/login',
        status: ErrorHttpStatus.Forbidden,
        response: `The password is denied !`,
      },
      ErrorHttpStatus.Forbidden,
    );
  }
}
export class UserUpdateFailed extends HttpException {
  public constructor() {
    super(
      {
        title: 'UserUpdateFailed',
        type: '/user-update',
        status: ErrorHttpStatus.BadRequest,
        response: `The user wasn't updated`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
export class UserCreationFailed extends HttpException {
  public constructor() {
    super(
      {
        title: 'UserCreationFailed',
        type: '/user-save',
        status: ErrorHttpStatus.BadRequest,
        response: `The user wasn't created`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
export class NoUsersFound extends HttpException {
  public constructor() {
    super(
      {
        title: 'NoUsersFound',
        type: '/user-get-all',
        status: ErrorHttpStatus.BadRequest,
        response: `No users Found`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
export class UserAlreadyExist extends HttpException {
  public constructor(email: string) {
    super(
      {
        title: 'UserAlreadyExist',
        type: '/user-exist',
        status: ErrorHttpStatus.BadRequest,
        response: `${email} already exist !`,
      },
      ErrorHttpStatus.BadRequest,
    );
  }
}
