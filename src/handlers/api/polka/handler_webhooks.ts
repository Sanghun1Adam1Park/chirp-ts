import { Response, Request } from "express";
import { upgradeUserToRed } from "../../../db/queries/users.js";
import { NotFoundError } from "../../../error/not_found.js";
import { config } from "../../../config.js";
import { UnauthorizedError } from "../../../error/unauthorized.js";
import { getBearerToken } from "../../../lib/auth.js";

export async function handlerUpgradeUser(req: Request, res: Response) {
  const apiKey = getBearerToken(req);

  if (apiKey !== config.api.polkaKey) {
    throw new UnauthorizedError("Invalid API key");
  }

  type parameter = {
    event: string,
    data: {
      userId: string
    }
  }

  const body: parameter = req.body; 
  const event = body.event;
  const userId = body.data.userId;

  if (event !== "user.upgraded") {
    res.status(204).send();
    return;
  }

  const result = await upgradeUserToRed(userId);
  if (!result) {
    throw new NotFoundError("User not found");
  }

  res.status(204).send();
}