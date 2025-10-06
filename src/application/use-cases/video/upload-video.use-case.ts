import { Video } from "@domain/video/entities/video.entity";
import { VideoRepository } from "@domain/video/repository/video-repository";
import { UseCase } from "@application/use-cases/use-case";
import { NotFoundException } from "@application/use-cases/exceptions/not-found.exception";
import { Storage } from "@application/storage/storage";
import { MissingPropertyException } from "@application/use-cases/exceptions/missing-property.exception";

export type TUploadVideoUseCaseInputDto = {
  id: string;
  file: { filename: string; buffer: Buffer };
};

export type TUploadVideoUseCaseOutputDto = Video;

export class UploadVideoUseCase extends UseCase<
  TUploadVideoUseCaseInputDto,
  TUploadVideoUseCaseOutputDto
> {
  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly storage: Storage,
  ) {
    super();
  }

  async execute(
    input: TUploadVideoUseCaseInputDto,
  ): Promise<TUploadVideoUseCaseOutputDto> {
    if (!input.file)
      throw new MissingPropertyException("Missing property: file");

    const video = await this.videoRepository.findById(input.id);

    if (!video) throw new NotFoundException("Video not found.");

    const url = await this.storage.upload(input.file);

    video.url = url;

    await this.videoRepository.save(video);

    return video;
  }
}
