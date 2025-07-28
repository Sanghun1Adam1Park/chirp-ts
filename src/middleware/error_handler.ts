import { Request, Response, NextFunction } from "express";
import { ChirpTooLongError } from "../error/chirp_too_long.js";
import { NotFoundError } from "../error/not_found.js";
import { ForbiddenError } from "../error/forbidden.js";
import { UnauthorizedError } from "../error/unauthorized.js";
import { WrongJSONFormatError } from "../error/wrong_json.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(`${err.message}`);
  if (err instanceof ChirpTooLongError) {
    res.status(400).json({
      error: err.message,
    }).send();
    return;
  } else if (err instanceof WrongJSONFormatError) {
    res.status(400).json({
      error: err.message,
    }).send();
    return;
  } else if (err instanceof NotFoundError) {
    res.status(404).json({
      error: err.message,
    }).send();
    return;
  } else if (err instanceof UnauthorizedError) {
    res.status(401).json({
      error: err.message,
    }).send();
    return;
  } else if (err instanceof ForbiddenError) {
    res.status(403).json({
      error: err.message,
    }).send();
    return;
  } else {
    res.status(500).send();
    return; 
  }
}