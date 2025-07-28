import { Request, Response } from "express";
import { config } from "../../config.js";
import { ForbiddenError } from "../../error/forbidden.js";
import { resetUserTable } from "../../db/queries/users.js";

export async function handlerReset(req: Request, res: Response): Promise<void> {
  if (config.api.platform === "dev") {
    const result = await resetUserTable();
    res.status(200).set("Content-Type", "text/plain").send("Users table has been reset.");
  } else {
    throw new ForbiddenError("403 Forbidden");
  }
}