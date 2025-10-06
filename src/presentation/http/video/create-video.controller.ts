import {
  TCreateVideoUseCaseInputDto,
  TCreateVideoUseCaseOutputDto,
} from "../../../use-cases/video/create-video.use-case";
import { Controller, ControllerProps } from "../controller";

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
