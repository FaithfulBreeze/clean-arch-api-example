import { HttpExceptionMapper } from "../../../../presentation/http/exceptions/http-exception.mapper";
import { Controller } from "../../../../presentation/http/controller";
import { Server } from "../server";
import express, { Application } from "express";
import { DomainException } from "../../../../domain/exceptions/domain.exception";
import { ApplicationException } from "../../../../use-cases/exceptions/application.exception";

export class ExpressServer implements Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  start(port: number, callback?: () => Error | undefined | void): void {
    this.app.listen(port, callback);
  }

  setControllers(controllers: Controller[]): void {
    for (let controller of controllers) {
      this.app[controller.props.method.toLowerCase()](
        controller.props.path,
        async (req, res) => {
          try {
            const { body, params } = req;
            const { response, status } = await controller.handle(body, params);
            res.status(status).json(response);
          } catch (error) {
            if (
              !(error instanceof DomainException) &&
              !(error instanceof ApplicationException)
            ) {
              console.error("Unexpected error: ", error.message);
            }

            const httpError = HttpExceptionMapper.toHttpError(error);
            const status = httpError.props.status;
            const message = httpError.props.message;

            res.status(status).json({ status, message });
          }
        },
      );
    }
  }
}
