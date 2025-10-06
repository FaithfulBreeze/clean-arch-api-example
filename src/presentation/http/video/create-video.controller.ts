import {
  TCreateVideoUseCaseInputDto,
  TCreateVideoUseCaseOutputDto,
} from "@application/use-cases/video/create-video.use-case";
import { Controller, ControllerProps } from "@presentation/http/controller";

export class CreateVideoController extends Controller<
  TCreateVideoUseCaseInputDto,
  TCreateVideoUseCaseOutputDto
> {
  constructor(
    props: ControllerProps<
      TCreateVideoUseCaseInputDto,
      TCreateVideoUseCaseOutputDto
    >,
  ) {
    super(props);
  }

  async handle(
    inputDto: TCreateVideoUseCaseInputDto,
  ): Promise<{ response: TCreateVideoUseCaseOutputDto; status: number }> {
    return {
      response: await this.props.handler.execute(inputDto),
      status: 201,
    };
  }
}
