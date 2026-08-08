export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.ahmed =
      "This is a custom error class for handling application-specific errors.";
  }
}
