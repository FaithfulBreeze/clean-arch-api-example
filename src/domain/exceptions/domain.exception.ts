export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DomainException";
    Object.setPrototypeOf(this, DomainException.prototype);
  }
}
