import { ApplicationException } from "./application.exception";

export class NotFoundException extends ApplicationException {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundException";
  }
}
