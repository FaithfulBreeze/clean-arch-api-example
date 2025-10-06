import {
  TUploadVideoUseCaseInputDto,
  TUploadVideoUseCaseOutputDto,
} from "@application/use-cases/video/upload-video.use-case";
import { Controller, ControllerProps } from "@presentation/http/controller";

export class UploadVideoController extends Controller<
  TUploadVideoUseCaseInputDto,
  TUploadVideoUseCaseOutputDto,
  string
> {
  constructor(
    props: ControllerProps<
      TUploadVideoUseCaseInputDto,
      TUploadVideoUseCaseOutputDto
    >,
  ) {
    super(props);
  }

  async handle(
    inputDto: TUploadVideoUseCaseInputDto,
    params: { id: string },
  ): Promise<{ response: string; status: number }> {
    await this.props.handler.execute({ id: params.id, file: inputDto.file });
    return { response: "Video upload started.", status: 202 };
  }
}
