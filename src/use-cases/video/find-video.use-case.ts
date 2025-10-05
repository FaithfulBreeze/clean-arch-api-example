import { Video } from "../../domain/video/entities/video.entity";
import { VideoRepository } from "../../domain/video/repository/video-repository";
import { UseCase } from "../use-case";

export type TFindVideoUseCaseInputDto = unknown;

export type TFindVideoUseCaseOutputDto = Video[];

export class FindVideoUseCase extends UseCase<
  TFindVideoUseCaseInputDto,
  TFindVideoUseCaseOutputDto
> {
  constructor(private readonly videoRepository: VideoRepository) {
    super();
  }

  async execute(
    input: TFindVideoUseCaseInputDto,
  ): Promise<TFindVideoUseCaseOutputDto> {
    return await this.videoRepository.find();
  }
}
