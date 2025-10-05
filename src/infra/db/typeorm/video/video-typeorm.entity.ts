import { Column, Entity, PrimaryColumn } from "typeorm";
import { VideoProps } from "../../../../domain/video/entities/video.entity";

@Entity()
export class VideoTypeormEntity implements VideoProps {
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "varchar" })
  subtitle: string;

  @Column({ type: "int" })
  likes: number;
}
