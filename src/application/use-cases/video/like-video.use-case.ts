import { VideoRepository } from "@domain/video/repository/video-repository";
import { UseCase } from "@application/use-cases/use-case";
import { NotFoundException } from "@application/use-cases/exceptions/not-found.exception";
import { Video } from "@domain/video/entities/video.entity";

export type TLikeVideoUseCaseInputDto = {
  id: string;
};

export type TLikeVideoUseCaseOutputDto = Video;

export class LikeVideoUseCase extends UseCase<
  TLikeVideoUseCaseInputDto,
  TLikeVideoUseCaseOutputDto
> {
  constructor(private readonly repository: VideoRepository) {
    super();
  }

  async execute(
    input: TLikeVideoUseCaseInputDto,
  ): Promise<TLikeVideoUseCaseOutputDto> {
    const video = await this.repository.findById(input.id);
    if (!video) throw new NotFoundException("Video not found.");
    video.increaseLikeCount();
    await this.repository.save(video);
    return video;
  }
}
