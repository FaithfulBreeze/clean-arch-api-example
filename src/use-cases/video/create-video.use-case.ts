import { Video } from "../../domain/video/entities/video.entity";
import { VideoRepository } from "../../domain/video/repository/video-repository";
import { ConflictException } from "../exceptions/conflict.exception";
import { UseCase } from "../use-case";

export type TCreateVideoUseCaseInputDto = {
  title: string;
  subtitle: string;
};

export type TCreateVideoUseCaseOutputDto = {
  id: string;
};

export class CreateVideoUseCase extends UseCase<
  TCreateVideoUseCaseInputDto,
  TCreateVideoUseCaseOutputDto
> {
  constructor(private readonly videoRepository: VideoRepository) {
    super();
  }

  async execute(
    input: TCreateVideoUseCaseInputDto,
  ): Promise<TCreateVideoUseCaseOutputDto> {
    const foundVideo = await this.videoRepository.findByTitle(input.title);

    if (foundVideo)
      throw new ConflictException(
        `The title '${input.title}' is already in use.`,
      );

    const video = Video.create({ ...input });
    await this.videoRepository.save(video);

    return { id: video.id };
  }
}
