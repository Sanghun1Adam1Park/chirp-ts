export class WrongJSONFormatError extends Error {
  constructor(message: string) {
    super(message);
  }
}