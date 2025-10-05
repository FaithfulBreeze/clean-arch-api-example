import { DomainException } from "./domain.exception";

export class BadInputException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = "BadInputException";
  }
}
