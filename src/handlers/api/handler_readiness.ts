import { Request, Response } from "express";

export async function handlerReadiness(req: Request, res: Response): Promise<void> {
  res.status(200).set("Content-Type", "text/plain").send("OK");
}