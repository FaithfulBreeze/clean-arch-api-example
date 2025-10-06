export class HttpError {
  constructor(public readonly props: { status: number; message: string }) {}
}
