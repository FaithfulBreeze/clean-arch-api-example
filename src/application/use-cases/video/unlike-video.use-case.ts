import { VideoRepository } from "@domain/video/repository/video-repository";
import { UseCase } from "@application/use-cases/use-case";
import { NotFoundException } from "@application/use-cases/exceptions/not-found.exception";
import { Video } from "@domain/video/entities/video.entity";

export type TUnlikeVideoUseCaseInputDto = {
  id: string;
};

export type TUnlikeVideoUseCaseOutputDto = Video;

export class UnlikeVideoUseCase extends UseCase<
  TUnlikeVideoUseCaseInputDto,
  TUnlikeVideoUseCaseOutputDto
> {
  constructor(private readonly repository: VideoRepository) {
    super();
  }

  async execute(
    input: TUnlikeVideoUseCaseInputDto,
  ): Promise<TUnlikeVideoUseCaseOutputDto> {
    const video = await this.repository.findById(input.id);
    if (!video) throw new NotFoundException("Video not found.");
    video.decreaseLikeCount();
    await this.repository.save(video);
    return video;
  }
}
