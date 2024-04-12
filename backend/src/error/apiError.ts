export class ApiError extends Error {
  /**
   * Bad Request: The server couldn’t resolve the request because of invalid syntax.
   *
   * Example:  throw new ApiError("UserNotFount",400,"user not found");
   * @param name
   * @param statusCode
   * @param message
   * @summary A concise summary.
   */
  statusCode: number;
  constructor(name: string, statusCode: number, message?: string) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}
