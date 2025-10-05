import { Video } from "../../../../domain/video/entities/video.entity";
import { VideoRepository } from "../../../../domain/video/repository/video-repository";
import { Repository } from "typeorm";
import { VideoTypeormMapper } from "./video-typeorm.mapper";
import { VideoTypeormEntity } from "./video-typeorm.entity";

export class VideoTypeormRepository extends VideoRepository {
  constructor(private readonly repository: Repository<VideoTypeormEntity>) {
    super();
  }

  async save(video: Video): Promise<void> {
    const ormEntity = VideoTypeormMapper.toTypeorm(video);
    await this.repository.save(ormEntity);
  }

  async find(): Promise<Video[]> {
    const ormVideos = await this.repository.find();
    return ormVideos ? ormVideos.map(VideoTypeormMapper.toDomain) : [];
  }

  async findById(id: string): Promise<Video | null> {
    const ormEntity = await this.repository.findOneBy({ id });
    if (!ormEntity) return null;
    return VideoTypeormMapper.toDomain(ormEntity);
  }

  async findByTitle(title: string): Promise<Video | null> {
    const ormEntity = await this.repository.findOneBy({ title });
    if (!ormEntity) return null;
    return VideoTypeormMapper.toDomain(ormEntity);
  }
}
