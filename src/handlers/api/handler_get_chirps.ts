import { Request, Response } from "express";
import { getChirpByAuthor, getChirpsByOrder } from "../../db/queries/chirps.js"; // Adjust the path as needed

export async function handlerGetChirps(req: Request, res: Response) {
  let result;

  const authorId = req.query.authorId;
  const sort = req.query.sort; 
  if (typeof authorId === "string" && authorId.trim()) {
    result = await getChirpByAuthor(authorId);
  } else {
    if (typeof sort === "string") { 
      result = await getChirpsByOrder(sort);
    } else {
      result = await getChirpsByOrder("asc"); 
    }
  }

  res.status(200).json(result);
}
