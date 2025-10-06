export abstract class Storage {
  abstract upload(file: { filename: string; buffer: Buffer }): Promise<string>;
}
