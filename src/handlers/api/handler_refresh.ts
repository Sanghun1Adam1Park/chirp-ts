import { Request, Response } from "express";
import { UnauthorizedError } from "../../error/unauthorized.js";
import { getBearerToken, makeJWT } from "../../lib/auth.js";
import { getRefreshToken } from "../../db/queries/refresh_token.js";
import { NewRefreshToken } from "../../db/schema/schema.js";
import { config } from "../../config.js"

export async function handlerRefresh(req: Request, res:Response) {
  const token = getBearerToken(req); 

  if (!token) {
    throw new UnauthorizedError("Invalid token");
  }

  const tokenFromDB: NewRefreshToken = await getRefreshToken(token);

  if (!tokenFromDB || Date.now() > tokenFromDB.expiredAt.getTime() 
        || tokenFromDB.revokedAt || !tokenFromDB.userId) {
    throw new UnauthorizedError("Invalid token");
  }

  const newToken = makeJWT(tokenFromDB.userId, 3600, config.api.secret); 

  res.status(200).set("Content-Type", "application/json").send({
    token: newToken
  }); 
}