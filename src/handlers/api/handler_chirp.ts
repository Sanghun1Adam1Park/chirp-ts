import { Request, Response } from "express";
import { ChirpTooLongError } from "../../error/chirp_too_long.js";
import { WrongJSONFormatError } from "../../error/wrong_json.js";
import { createChirp } from "../../db/queries/chirps.js";
import { getBearerToken, payload, validateJWT } from "../../lib/auth.js";
import { config } from "../../config.js"; 
import { UnauthorizedError } from "../../error/unauthorized.js";

export async function handlerChirp(req: Request, res: Response): Promise<void> {
  type parameters = {
    body: string;
  };

  const token = getBearerToken(req);
  const validated = validateJWT(token, config.api.secret);

  if (!validated) {
    throw new UnauthorizedError("user not authorized."); 
  }

  const body = req.body.body;
  if (!body) {
    throw new WrongJSONFormatError("Bad request: wrong JSON format");
  };

  const maxChirpLength = 140;
  if (body.length > maxChirpLength) {
    throw new ChirpTooLongError();
  }

  const words = body.split(" ");
  const badWords = ["kerfuffle", "sharbert", "fornax"];
  for (let i = 0; i < words.length; i++) {
    let currentWord = words[i];
    if (badWords.includes(currentWord.toLowerCase())) {
      words[i] = "****";
    }
  }

  const result = await createChirp(body, validated);

  res.set("Content-Type", "application/json").status(201).send({
    id: result.id,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    body: result.body,
    userId: result.userId,
  });
}