import { Request, Response } from "express";
import { config } from "../../config.js";

export async function handlerMetric(req: Request, res: Response): Promise<void> {
  res.set("Content-Type", "text/html; charset=utf-8").send(`<html>
  <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${config.api.fileServerHits} times!</p>
  </body>
</html>`);
}

export async function handlerMetricReset(req: Request, res: Response) {
  config.api.fileServerHits = 0;
  res.send(); 
}