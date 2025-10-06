import { VideoProps } from "../../../domain/video/entities/video.entity";
import {
  TFindVideoUseCaseInputDto,
  TFindVideoUseCaseOutputDto,
} from "../../../use-cases/video/find-video.use-case";
import { Controller, ControllerProps } from "../controller";

export class FindVideoController extends Controller<
  TFindVideoUseCaseInputDto,
  TFindVideoUseCaseOutputDto,
  VideoProps[]
> {
  constructor(
    props: ControllerProps<
      TFindVideoUseCaseInputDto,
      TFindVideoUseCaseOutputDto
    >,
  ) {
    super(props);
  }

  async handle(
    inputDto: TFindVideoUseCaseInputDto,
  ): Promise<{ response: VideoProps[]; status: number }> {
    const videos = await this.props.handler.execute(inputDto);
    return {
      response: videos.map((video) => video.props),
      status: 200,
    };
  }
}
