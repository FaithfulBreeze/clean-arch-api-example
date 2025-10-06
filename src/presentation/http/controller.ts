import { UseCase } from "../../use-cases/use-case";

export interface ControllerProps<
  UseCaseInputDto = unknown,
  UseCaseOutputDto = unknown,
> {
  path: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  handler: UseCase<UseCaseInputDto, UseCaseOutputDto>;
}

export abstract class Controller<
  UseCaseInputDto = unknown,
  UseCaseOutputDto = unknown,
  HttpOutputDto = UseCaseOutputDto,
> {
  constructor(
    public readonly props: ControllerProps<UseCaseInputDto, UseCaseOutputDto>,
  ) {}
  abstract handle(
    inputDto: UseCaseInputDto,
    params?: unknown,
  ): Promise<{ response: HttpOutputDto; status: number }>;
}
