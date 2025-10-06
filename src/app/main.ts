import { DataSource } from "typeorm";
import { ExpressServer } from "@infra/http/server/express/express.server";
import { VideoTypeormEntity } from "@infra/db/typeorm/video/video-typeorm.entity";
import { VideoTypeormRepository } from "@infra/db/typeorm/video/video-typeorm.repository";
import { CreateVideoUseCase } from "@application/use-cases/video/create-video.use-case";
import { CreateVideoController } from "@presentation/http/video/create-video.controller";
import { FindVideoController } from "@presentation/http/video/find-video.controller";
import { FindVideoUseCase } from "@application/use-cases/video/find-video.use-case";
import { FindVideoByIdController } from "@presentation/http/video/find-video-by-id.controller";
import { FindVideoByIdUseCase } from "@application/use-cases/video/find-video-by-id.use-case";
import { LikeVideoUseCase } from "@application/use-cases/video/like-video.use-case";
import { LikeVideoController } from "@presentation/http/video/like-video.controller";
import { UnlikeVideoController } from "@presentation/http/video/unlike-video.controller";
import { UnlikeVideoUseCase } from "@application/use-cases/video/unlike-video.use-case";
import { VercelStorage } from "@infra/storage/vercel/vercel.storage";
import { UploadVideoUseCase } from "@application/use-cases/video/upload-video.use-case";
import { UploadVideoController } from "@presentation/http/video/upload-video.controller";
// import { FastifyServer } from "@infra/http/server/fastify/fastify.server";
import multer from "multer";
import { loadEnvFile } from "process";
import { join } from "path";

const bootstrap = async () => {
  loadEnvFile(join(process.cwd(), ".env"));

  const datasource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    entities: [VideoTypeormEntity],
    synchronize: true,
  });

  const vercelStorage = new VercelStorage();

  const upload = multer({ storage: multer.memoryStorage() });

  await datasource.initialize();

  const videoRepository = new VideoTypeormRepository(
    datasource.getRepository(VideoTypeormEntity)
  );

  const createVideoUseCase = new CreateVideoUseCase(videoRepository);
  const findVideoUseCase = new FindVideoUseCase(videoRepository);
  const findVideoByIdUseCase = new FindVideoByIdUseCase(videoRepository);
  const likeVideoUseCase = new LikeVideoUseCase(videoRepository);
  const unlikeVideoUseCase = new UnlikeVideoUseCase(videoRepository);
  const uploadVideoUseCase = new UploadVideoUseCase(
    videoRepository,
    vercelStorage
  );

  const createVideoController = new CreateVideoController({
    path: "/videos/create",
    method: "POST",
    handler: createVideoUseCase,
  });

  const findVideoController = new FindVideoController({
    path: "/videos",
    method: "GET",
    handler: findVideoUseCase,
  });

  const findVideoByIdController = new FindVideoByIdController({
    path: "/videos/:id",
    method: "GET",
    handler: findVideoByIdUseCase,
  });

  const likeVideoController = new LikeVideoController({
    path: "/videos/:id/like",
    method: "PATCH",
    handler: likeVideoUseCase,
  });

  const unlikeVideoController = new UnlikeVideoController({
    path: "/videos/:id/unlike",
    method: "PATCH",
    handler: unlikeVideoUseCase,
  });

  const uploadVideoController = new UploadVideoController({
    path: "/videos/:id/upload",
    method: "POST",
    handler: uploadVideoUseCase,
    middlewares: [upload.single("file")],
  });

  const controllers = [
    createVideoController,
    findVideoController,
    findVideoByIdController,
    likeVideoController,
    unlikeVideoController,
    uploadVideoController,
  ];

  const api = new ExpressServer();
  // const api = new FastifyServer();

  api.setControllers(controllers);

  api.start(3000, () => console.log("Application started at port 3000"));
};

bootstrap();
