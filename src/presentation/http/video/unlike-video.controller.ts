import { VideoProps } from "../../../domain/video/entities/video.entity";
import {
  TUnlikeVideoUseCaseInputDto,
  TUnlikeVideoUseCaseOutputDto,
} from "../../../use-cases/video/unlike-video.use-case";
import { Controller, ControllerProps } from "../controller";

export class UnlikeVideoController extends Controller<
  TUnlikeVideoUseCaseInputDto,
  TUnlikeVideoUseCaseOutputDto,
  VideoProps
> {
  constructor(
    props: ControllerProps<
      TUnlikeVideoUseCaseInputDto,
      TUnlikeVideoUseCaseOutputDto
    >,
  ) {
    super(props);
  }

  async handle(
    inputDto: TUnlikeVideoUseCaseInputDto,
    params: { id: string },
  ): Promise<{ response: VideoProps; status: number }> {
    const video = await this.props.handler.execute({ id: params.id });
    return { response: video.props, status: 200 };
  }
}
