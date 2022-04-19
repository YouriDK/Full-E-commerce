export enum ErrorHttpStatus {
  /** A generic error message when unexpected conditions encountered and no more specific message is suitable */
  UnexpectedServerError = 500,
  /** The server cannot or will not process the request due to an apparent client error */
  BadRequest = 400,
  /** Insufficient permissions or prohibited action (e.g. creating a duplicate record where only one is allowed) */
  Forbidden = 403,
  /** Resource not found */
  NotFound = 404,
  /** Conflict in the current state of the resource */
  Conflict = 409,
  /** Header range is not satisfiable (e.g. header format not respected) */
  HeaderRangeNotSatisfiable = 416,
  /** Do not recognize the request method or lack the ability to fulfil it (Usually this implies future availability) */
  NotImplemented = 501,
  /** Cannot respond according the header accept not */
  WrongHeaderAccept = 406,
  AccessDenied = 401,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnknownError = any;

export type ErrorDetails = {
  status: number;
  title: string;
  detail: string;
  type: string;
  debug?: string;
};

export const BuildError: any = (BuildError: any): ErrorDetails => {
  return {
    status: BuildError.status ?? ErrorHttpStatus.UnexpectedServerError,
    title: BuildError.title ?? 'Unknow error',
    detail: BuildError.detail ?? 'Unknow detail',
    debug: BuildError.debug,
    type: BuildError.type ?? 'about:blank',
  };
};

export const TokenInvalidError = (): ErrorDetails => {
  return {
    detail: 'Invalid userinfo encoding.',
    type: '/auth/error-token',
    status: ErrorHttpStatus.AccessDenied,
    title: 'Invalid token',
  };
};
export const AdminError = (): ErrorDetails => {
  return {
    detail: 'Checking admin failed',
    type: '/auth/error-admin',
    status: ErrorHttpStatus.AccessDenied,
    title: 'Admin Failed',
  };
};
export const ProductNotFoundError = (): ErrorDetails => {
  return {
    detail: 'Cannot find the product',
    type: '/product/fetch-one',
    status: ErrorHttpStatus.NotFound,
    title: 'Product not found',
  };
};
export const OrderNotFoundError = (): ErrorDetails => {
  return {
    detail: 'Cannot find the order',
    type: '/orders/fetch-one',
    status: ErrorHttpStatus.NotFound,
    title: 'Order not found',
  };
};
export const CreateOrderError = (): ErrorDetails => {
  return {
    detail: 'Cannot create the order',
    type: '/orders/create',
    status: ErrorHttpStatus.NotFound,
    title: 'Order not create',
  };
};
export const CreateProductdError = (): ErrorDetails => {
  return {
    detail: 'Cannot create the product',
    type: '/product/create',
    status: ErrorHttpStatus.UnexpectedServerError,
    title: 'Creating failed',
  };
};
export const UpdateProductdError = (): ErrorDetails => {
  return {
    detail: 'Cannot update the product',
    type: '/product/update',
    status: ErrorHttpStatus.UnexpectedServerError,
    title: 'Updating failed',
  };
};
export const DeleteProductdError = (): ErrorDetails => {
  return {
    detail: 'Cannot delete the product',
    type: '/product/delete',
    status: ErrorHttpStatus.UnexpectedServerError,
    title: 'Deleting failed',
  };
};
export const ProducstNotFoundError = (): ErrorDetails => {
  return {
    detail: 'Cannot find the products',
    type: '/product/fetch-all',
    status: ErrorHttpStatus.NotFound,
    title: 'Products not found',
  };
};
export const SingInFoundError = (): ErrorDetails => {
  return {
    detail: 'Error password or id',
    type: '/signin',
    status: ErrorHttpStatus.Forbidden,
    title: 'Cannot Login',
  };
};

export const UserNotFoundError = (): ErrorDetails => {
  return {
    detail: 'Cannot find the user',
    type: '/user/fetch-one',
    status: ErrorHttpStatus.NotFound,
    title: 'User not found',
  };
};
export const RegisterError = (): ErrorDetails => {
  return {
    detail: 'Wrond data to register',
    type: '/register',
    status: ErrorHttpStatus.Forbidden,
    title: 'Register failed',
  };
};
export const UpdateUserError = (): ErrorDetails => {
  return {
    detail: 'Failed Updating Profile',
    type: '/profile',
    status: ErrorHttpStatus.Forbidden,
    title: 'Update user failed',
  };
};
