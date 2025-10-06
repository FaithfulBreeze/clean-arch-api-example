import { ApplicationException } from "@application/use-cases/exceptions/application.exception";

export class NotFoundException extends ApplicationException {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundException";
  }
}
