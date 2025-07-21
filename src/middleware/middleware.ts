import { Request, Response } from "express";

export function middlewareLogResponses(
  req: Request, res: Response, 
  next: (req: Request, res: Response) => void) {
  res.on("finish", () => {
    const statusCode = res.statusCode;
    if (statusCode >= 400) {
      console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${statusCode}`)
    }
  });
  next(req, res);
}