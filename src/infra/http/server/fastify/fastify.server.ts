import { Controller } from "../../../../presentation/http/controller";
import { Server } from "../server";
import Fastify from "fastify";

export class FastifyServer implements Server {
  private app;

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
            return response;
          } catch (error) {
            const status = error.status || 500;
            const message = error.message || "Internal server error";
            return { status, message };
          }
        },
      );
    }
  }
}
