import { HttpExceptionMapper } from "@presentation/http/exceptions/http-exception.mapper";
import { Controller } from "@presentation/http/controller";
import { Server } from "@infra/http/server/server";
import express, { Application } from "express";
import { DomainException } from "@domain/exceptions/domain.exception";
import { ApplicationException } from "@application/use-cases/exceptions/application.exception";

export class ExpressServer implements Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  start(port: number, callback?: () => Error | undefined | void): void {
    this.app.listen(port, callback);
  }

  setControllers(controllers: Controller[]): void {
    for (let controller of controllers) {
      this.app[controller.props.method.toLowerCase()](
        controller.props.path,
        ...this.buildMiddlewares(controller.props.middlewares),
        this.buildHandler(controller),
      );
    }
  }

  private buildMiddlewares(middlewares?: Function[]) {
    if (!middlewares || !middlewares.length) return [];
    return middlewares.map((mw) => {
      if (mw.length === 3) return mw;

      return async (req, res, next) => {
        try {
          await mw(req, res);
          next();
        } catch (error) {
          next(error);
        }
      };
    });
  }

  private buildHandler(controller: Controller) {
    return async (req, res) => {
      try {
        const { body, params, file } = req;
        const inputDto = {
          ...body,
          file: file
            ? { filename: file.originalname, buffer: file.buffer }
            : null,
        };
        const { response, status } = await controller.handle(inputDto, params);
        res.status(status).json(response);
      } catch (error) {
        if (
          !(error instanceof DomainException) &&
          !(error instanceof ApplicationException)
        ) {
          console.error("Unexpected error: ", error);
        }

        const httpError = HttpExceptionMapper.toHttpError(error);
        const status = httpError.props.status;
        const message = httpError.props.message;

        res.status(status).json({ status, message });
      }
    };
  }
}
