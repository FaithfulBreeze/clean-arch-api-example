import { VideoRepository } from "@domain/video/repository/video-repository";
import { Video } from "@domain/video/entities/video.entity";
import { UseCase } from "@application/use-cases/use-case";
import { NotFoundException } from "@application/use-cases/exceptions/not-found.exception";

export type TFindVideoByIdUseCaseInputDto = {
  id: string;
};

export type TFindVideoByIdUseCaseOutputDto = Video;

export class FindVideoByIdUseCase extends UseCase<
  TFindVideoByIdUseCaseInputDto,
  TFindVideoByIdUseCaseOutputDto
> {
  constructor(private readonly repository: VideoRepository) {
    super();
  }

  async execute(
    input: TFindVideoByIdUseCaseInputDto,
  ): Promise<TFindVideoByIdUseCaseOutputDto> {
    const video = await this.repository.findById(input.id);
    if (!video) throw new NotFoundException("Video not found.");
    return video;
  }
}
