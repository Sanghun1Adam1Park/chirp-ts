import { Request, Response } from "express";
import { revokeRefreshToken } from "../../db/queries/refresh_token.js";
import { UnauthorizedError } from "../../error/unauthorized.js";
import { getBearerToken } from "../../lib/auth.js";

export async function handlerRevoke(req: Request, res: Response): Promise<void> {
  const token = getBearerToken(req); 

  if (!token) {
    throw new UnauthorizedError("User not authoried");
  }

  const result = await revokeRefreshToken(token);
  res.status(204).send(); 
}