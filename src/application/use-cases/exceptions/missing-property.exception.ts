import { ApplicationException } from "@application/use-cases/exceptions/application.exception";

export class MissingPropertyException extends ApplicationException {
  constructor(message: string) {
    super(message);
    this.name = "MissingPropertyException";
  }
}
