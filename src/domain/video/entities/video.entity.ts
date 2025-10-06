import { randomUUID } from "crypto";
import { BadInputException } from "@domain/exceptions/bad-input.exception";

export interface VideoProps {
  id: string;
  title: string;
  subtitle: string;
  likes: number;
}

export class Video {
  private constructor(public readonly props: VideoProps) {
    this.validate();
  }

  public static create(props: Omit<VideoProps, "id" | "likes">) {
    return new Video({ ...props, id: randomUUID(), likes: 0 });
  }

  public static with(props: VideoProps) {
    return new Video(props) as Video;
  }

  private validate() {
    if (!this.props.title)
      throw new BadInputException("Missing title property.");
    if (this.props.title.length > 15)
      throw new BadInputException(
        "Video title length should be less or equal 15.",
      );

    if (!this.props.subtitle)
      throw new BadInputException("Missing subtitle property.");
    if (this.props.subtitle.length > 15)
      throw new BadInputException(
        "Video subtitle length should be less or equal 45.",
      );
  }

  public get id() {
    return this.props.id;
  }

  public get title() {
    return this.props.title;
  }

  public get subtitle() {
    return this.props.subtitle;
  }

  public get likes() {
    return this.props.likes;
  }

  public increaseLikeCount() {
    this.props.likes++;
  }

  public decreaseLikeCount() {
    if (this.props.likes <= 0)
      throw new BadInputException(
        "Like count can not be set as a negative value.",
      );
    this.props.likes--;
  }
}
