import { Video } from "@domain/video/entities/video.entity";
import { VideoTypeormEntity } from "@infra/db/typeorm/video/video-typeorm.entity";

export class VideoTypeormMapper {
  static toTypeorm(video: Video): VideoTypeormEntity {
    const ormEntity = new VideoTypeormEntity();
    ormEntity.id = video.id;
    ormEntity.title = video.title;
    ormEntity.subtitle = video.subtitle;
    ormEntity.likes = video.likes;
    ormEntity.url = video.url;
    return ormEntity;
  }

  static toDomain(ormVideo: VideoTypeormEntity): Video {
    return Video.with({
      id: ormVideo.id,
      title: ormVideo.title,
      subtitle: ormVideo.subtitle,
      likes: ormVideo.likes,
      url: ormVideo.url,
    });
  }
}
