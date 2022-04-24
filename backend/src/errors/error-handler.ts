/**
 * Don't hesitate to add http error status if not present in the following enum
 * https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
 */
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
