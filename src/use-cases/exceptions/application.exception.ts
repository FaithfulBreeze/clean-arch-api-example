export class ApplicationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApplicationException";
    Object.setPrototypeOf(this, ApplicationException.prototype);
  }
}
