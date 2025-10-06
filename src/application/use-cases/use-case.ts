export abstract class UseCase<InputDto = unknown, OutputDto = unknown> {
  abstract execute(input: InputDto): Promise<OutputDto>;
}
