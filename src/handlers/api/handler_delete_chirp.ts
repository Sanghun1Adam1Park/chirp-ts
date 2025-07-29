import { Response, Request } from "express";
import { getBearerToken, validateJWT } from "../../lib/auth.js";
import { config } from "../../config.js"
import { UnauthorizedError } from "../../error/unauthorized.js";
import { ForbiddenError } from "../../error/forbidden.js";
import { deleteChirp, getChirpByID } from "../../db/queries/chirps.js";
import { NotFoundError } from "../../error/not_found.js";

export async function handlerDeleteChirp(req: Request, res: Response) {
  const token = getBearerToken(req);
  let validated;
  try {
    validated = validateJWT(token, config.api.secret);
  } catch (err) {
    throw new UnauthorizedError("User not authorized");
  }

  const chirp = await getChirpByID(req.params.chirpID);
  if (!chirp) {
    throw new NotFoundError("Chirp not found");
  }

  if (chirp.userId !== validated) {
    throw new ForbiddenError("User not authorized");
  }

  const result = await deleteChirp(req.params.chirpID);
  res.status(204).send();
}