import { ApplicationException } from "./application.exception";

export class ConflictException extends ApplicationException {
  constructor(message: string) {
    super(message);
    this.name = "ConflictException";
  }
}
