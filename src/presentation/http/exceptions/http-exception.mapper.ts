import { BadInputException } from "../../../domain/exceptions/bad-input.exception";
import { DomainException } from "../../../domain/exceptions/domain.exception";
import { ApplicationException } from "../../../use-cases/exceptions/application.exception";
import { HttpError } from "../http-error";
import { ConflictException } from "../../../use-cases/exceptions/conflict.exception";
import { NotFoundException } from "../../../use-cases/exceptions/not-found.exception";

export class HttpExceptionMapper {
  static toHttpError(
    exception: DomainException | ApplicationException,
  ): HttpError {
    if (exception.name === BadInputException.name)
      return new HttpError({ message: exception.message, status: 400 });
    if (exception.name === ConflictException.name)
      return new HttpError({ message: exception.message, status: 409 });
    if (exception.name === NotFoundException.name)
      return new HttpError({ message: exception.message, status: 404 });

    return new HttpError({ message: "Internal server error.", status: 500 });
  }
}
