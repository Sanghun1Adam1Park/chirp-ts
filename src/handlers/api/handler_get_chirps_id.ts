import { Response, Request } from "express";
import { getChirpByID } from "../../db/queries/chirps.js";
import { NotFoundError } from "../../error/not_found.js";

export async function handlerGetChirpsByID(req: Request, res: Response) {
  const result = await getChirpByID(req.params.chirpID);
  if (!result) {
    throw new NotFoundError("Chirp not found");
  }

  res.set("Content-Type", "application/json").status(200).send(result);
}