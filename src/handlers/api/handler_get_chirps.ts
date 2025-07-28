import { Response, Request } from "express";
import { getChirpsByASC } from "../../db/queries/chirps.js";

export async function handlerGetChirps(req: Request, res: Response) {
  const result = await getChirpsByASC();
  res.set("Content-Type", "application/json").status(200).send(result);
}