import { HttpExceptionMapper } from "@presentation/http/exceptions/http-exception.mapper";
import { Controller } from "@presentation/http/controller";
import { Server } from "@infra/http/server/server";
import Fastify, { FastifyInstance } from "fastify";
import { DomainException } from "@domain/exceptions/domain.exception";
import { ApplicationException } from "@application/use-cases/exceptions/application.exception";

export class FastifyServer implements Server {
  private app: FastifyInstance;

  constructor() {
    this.app = Fastify();
  }

  start(port: number, callback?: () => Error | undefined | void): void {
    this.app.listen({ port }).then(callback);
  }

  setControllers(controllers: Controller[]): void {
    for (let controller of controllers) {
      this.app[controller.props.method.toLowerCase()](
        controller.props.path,
        async (request, reply) => {
          try {
            const { body, params } = request;
            const { response, status } = await controller.handle(body, params);
            return reply.status(status).send(response);
          } catch (error: any) {
            if (
              !(error instanceof DomainException) &&
              !(error instanceof ApplicationException)
            ) {
              console.error("Unexpected error:", error?.message);
            }

            const httpError = HttpExceptionMapper.toHttpError(error);
            const status = httpError.props.status;
            const message = httpError.props.message;

            return reply.status(status).send({ status, message });
          }
        },
      );
    }
  }
}
