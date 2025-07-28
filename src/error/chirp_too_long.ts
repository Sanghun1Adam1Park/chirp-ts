export class ChirpTooLongError extends Error {
  constructor() {
    super("Chirp is too long. Max length is 140");
  }
}