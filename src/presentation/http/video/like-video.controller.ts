import { VideoProps } from "../../../domain/video/entities/video.entity";
import {
  TLikeVideoUseCaseInputDto,
  TLikeVideoUseCaseOutputDto,
} from "../../../use-cases/video/like-video.use-case";
import { Controller, ControllerProps } from "../controller";

export class LikeVideoController extends Controller<
  TLikeVideoUseCaseInputDto,
  TLikeVideoUseCaseOutputDto,
  VideoProps
> {
  constructor(
    props: ControllerProps<
      TLikeVideoUseCaseInputDto,
      TLikeVideoUseCaseOutputDto
    >,
  ) {
    super(props);
  }

  async handle(
    inputDto: TLikeVideoUseCaseInputDto,
    params: { id: string },
  ): Promise<{ response: VideoProps; status: number }> {
    const video = await this.props.handler.execute({ id: params.id });
    return { response: video.props, status: 200 };
  }
}
