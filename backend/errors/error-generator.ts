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
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnknownError = any;

/** RFC 7807 */
export class ErrorDetails extends Error {
  /** HTTP status code */
  public status: number;
  /** A short, human-readable summary of the problem type */
  public title: string;
  /** A human-readable explanation of the problem */
  public detail: string;
  /** A URI reference. Also used for front translated error message. */
  public type: string;
  /** Additional member : additional debug information */
  public debug?: string;

  public constructor(
    error: {
      status?: number;
      title?: string;
      detail?: string;
      debug?: string;
      type?: string;
    } = {}
  ) {
    super();
    this.status = error.status ?? ErrorHttpStatus.UnexpectedServerError;
    this.title = error.title ?? 'Unknow error';
    this.detail = error.detail ?? 'Unknow detail';
    this.debug = error.debug;
    this.type = error.type ?? 'about:blank';
  }
}
