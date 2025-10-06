import { VideoProps } from "@domain/video/entities/video.entity";
import {
  TFindVideoByIdUseCaseInputDto,
  TFindVideoByIdUseCaseOutputDto,
} from "@application/use-cases/video/find-video-by-id.use-case";
import { Controller, ControllerProps } from "@presentation/http/controller";

export class FindVideoByIdController extends Controller<
  TFindVideoByIdUseCaseInputDto,
  TFindVideoByIdUseCaseOutputDto,
  VideoProps
> {
  constructor(
    props: ControllerProps<
      TFindVideoByIdUseCaseInputDto,
      TFindVideoByIdUseCaseOutputDto
    >,
  ) {
    super(props);
  }

  async handle(
    inputDto: TFindVideoByIdUseCaseInputDto,
    params: { id: string },
  ): Promise<{ response: VideoProps; status: number }> {
    const video = await this.props.handler.execute({ id: params.id });
    return { response: video.props, status: 200 };
  }
}
