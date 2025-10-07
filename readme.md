# 🎬 Video Management API

A **Clean Architecture** backend example for managing videos with **CRUD operations, likes/unlikes, and file uploads**, built with **Node.js, TypeScript, Express/Fastify, TypeORM, and Vercel Storage**.  
Designed to be **framework-agnostic, testable, and maintainable**, following strict separation of concerns.

---

## 🏗 Architecture Overview

This project follows **Clean Architecture** principles, dividing the code into clear layers:

```
src
├─ domain         # Core business rules (entities, repositories, exceptions)
├─ application    # Use cases and abstractions (storage, use-case execution)
├─ presentation   # HTTP controllers, request/response mapping, exception mapping
├─ infra          # Framework and technology-specific implementations
│   ├─ http       # Express/Fastify server adapters
│   ├─ db         # TypeORM repository implementations
│   └─ storage    # Vercel storage adapter
└─ app            # Composition root (wiring dependencies, starting the server)
```

### **Layer Responsibilities**

| Layer            | Responsibility                                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Domain**       | Encapsulates business rules (e.g., `Video` entity, likes, validation).                                                |
| **Application**  | Implements **use cases** (`CreateVideoUseCase`, `UploadVideoUseCase`) and defines **abstractions** (e.g., `Storage`). |
| **Presentation** | Maps HTTP requests to use cases via **controllers**, translates exceptions to HTTP responses.                         |
| **Infra**        | Concrete framework implementations (Express/Fastify), database repositories, storage adapters.                        |
| **App**          | Bootstraps the system, wires dependencies, starts the HTTP server.                                                    |

## ⚡ Key Features

- **Video CRUD**: Create, list, and retrieve videos by ID.
- **File uploads**: Upload video files to **Vercel Storage**.
- **Like/Unlike**: Increment or decrement video like counts safely.
- **Exception mapping**: All domain/application exceptions are converted to proper HTTP responses.
- **Multi-server support**: Works with **Express** or **Fastify** with minimal changes.
- **In-memory SQLite**: Easy for testing and local development.
- **Clean Architecture**: Fully decoupled layers, framework-agnostic, and easily testable.

## 🧩 Example Flow

1. **Create a Video**

   ```ts
   POST /videos/create
   Body: { "title": "My Video", "subtitle": "A short description" }
   ```

   - Use case: `CreateVideoUseCase`
   - Validates title uniqueness and input constraints.

2. **Upload a Video File**

   ```ts
   POST /videos/:id/upload
   Form-Data: file=<video.mp4>
   ```

   - Controller: `UploadVideoController`
   - Use case: `UploadVideoUseCase`
   - Stores video in **Vercel Storage**.

3. **Like a Video**

   ```ts
   PATCH /videos/:id/like
   ```

   - Use case: `LikeVideoUseCase`
   - Increments likes safely.

4. **List Videos**

   ```ts
   GET / videos;
   ```

   - Use case: `FindVideoUseCase`
   - Returns all videos.

5. **Find Video by ID**
   ```ts
   GET /videos/:id
   ```

   - Use case: `FindVideoByIdUseCase`
   - Returns video details or 404 if not found.

## 🛠 Technology Stack

- **Node.js + TypeScript**
- **Express & Fastify** (HTTP adapters, interchangeable)
- **TypeORM** (SQLite for local/dev)
- **Vercel Blob Storage** (for video uploads)
- **Clean Architecture** (Domain, Application, Presentation, Infra layers)
- **Exception handling** (domain + application exceptions mapped to HTTP)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/FaithfulBreeze/clean-arch-api-example.git
   cd clean-arch-api-example
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set environment variables**

   ```bash
   VERCEL_TOKEN=<your-vercel-token>
   ```

4. **build application**

   ```bash
   npm run build
   ```

5. **Run the server**

   ```bash
   npm run start
   ```

   - By default, starts **Express** on port 3000.
   - Switch to Fastify: uncomment `FastifyServer` in `main.ts` and comment out `ExpressServer`.

6. **Test the API**
   - Use Postman, curl, or any HTTP client to test endpoints (`/videos`, `/videos/create`, `/videos/:id/upload`).

## 📦 Extensibility

- **Swap storage**: Implement a new `Storage` adapter (e.g., AWS S3) without touching use cases or controllers.
- **Swap DB**: Replace `TypeORM` repositories with any persistence layer implementing `VideoRepository`.
- **Add servers**: Integrate any HTTP framework by implementing the `Server` interface.

## 📝 Highlights

- Framework-agnostic **Clean Architecture** backend.
- Fully typed, testable, and modular.
- Demonstrates **real-world patterns** for handling entities, use cases, repositories, storage, and controllers.

Created using **TypeScript**, **Node.js**, and **Clean Architecture** principles.
