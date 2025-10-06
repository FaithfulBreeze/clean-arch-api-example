import { Controller } from "../../../presentation/http/controller";

export abstract class Server {
  abstract start(port: number, callback?: () => Error | undefined | void): void;
  abstract setControllers(controllers: Controller[]): void;
}
