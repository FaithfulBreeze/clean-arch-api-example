import { Video } from "../entities/video.entity";

export abstract class VideoRepository {
  abstract save(video: Video): Promise<void>;
  abstract find(): Promise<Video[]>;
  abstract findById(id: string): Promise<Video | null>;
  abstract findByTitle(title: string): Promise<Video | null>;
}
