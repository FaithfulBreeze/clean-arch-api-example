import { HttpExceptionMapper } from "@presentation/http/exceptions/http-exception.mapper";
import { Controller } from "@presentation/http/controller";
import { Server } from "@infra/http/server/server";
import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import multipart from "@fastify/multipart";
import { DomainException } from "@domain/exceptions/domain.exception";
import { ApplicationException } from "@application/use-cases/exceptions/application.exception";

export class FastifyServer implements Server {
  private app: FastifyInstance;

  constructor() {
    this.app = Fastify({
      logger: false,
    });

    this.app.register(multipart);
  }

  start(port: number, callback?: () => Error | undefined | void): void {
    this.app.listen({ port }).then(() => callback && callback());
  }

  setControllers(controllers: Controller[]): void {
    for (const controller of controllers) {
      this.app.route({
        method: controller.props.method,
        url: controller.props.path,
        preHandler: this.buildMiddlewares(controller.props.middlewares),
        handler: this.buildHandler(controller),
      });
    }
  }

  private buildMiddlewares(middlewares?: Function[]) {
    if (!middlewares || !middlewares.length) return [];

    return middlewares.map((mw) => {
      if (mw.length === 3) {
        return async (req: FastifyRequest, reply: FastifyReply) => {
          return new Promise<void>((resolve, reject) => {
            try {
              mw(req, reply, (err?: any) => (err ? reject(err) : resolve()));
            } catch (err) {
              reject(err);
            }
          });
        };
      }

      return async (req: FastifyRequest, reply: FastifyReply) => {
        try {
          await mw(req, reply);
        } catch (err) {
          throw err;
        }
      };
    });
  }

  private buildHandler(controller: Controller) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { body, params } = request as any;
        let file: unknown = null;

        if (request.isMultipart()) {
          const parts = request.parts() as any;
          for await (const part of parts) {
            if (part.file) {
              const chunks: Buffer[] = [];
              for await (const chunk of part.file) chunks.push(chunk);
              file = {
                filename: part.filename,
                buffer: Buffer.concat(chunks),
              };
            }
          }
        }

        const inputDto = { ...body, file };
        const { response, status } = await controller.handle(inputDto, params);

        reply.status(status).send(response);
      } catch (error: any) {
        if (
          !(error instanceof DomainException) &&
          !(error instanceof ApplicationException)
        ) {
          console.error("Unexpected error:", error);
        }

        const httpError = HttpExceptionMapper.toHttpError(error);
        const status = httpError.props.status;
        const message = httpError.props.message;

        reply.status(status).send({ status, message });
      }
    };
  }
}
