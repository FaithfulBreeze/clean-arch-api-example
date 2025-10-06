import { Storage } from "@application/storage/storage";
import { put } from "@vercel/blob";

export class VercelStorage extends Storage {
  private readonly token: string;
  constructor() {
    super();
    if (!process.env.VERCEL_TOKEN)
      throw new Error("Missing token: VERCEL_TOKEN");
    this.token = process.env.VERCEL_TOKEN;
  }
  async upload(file: { filename: string; buffer: Buffer }): Promise<string> {
    const { url } = await put(file.filename, file.buffer, {
      access: "public",
      token: this.token,
      multipart: true,
      addRandomSuffix: true
    });

    return url;
  }
}
