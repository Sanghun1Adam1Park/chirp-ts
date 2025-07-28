import { Request, Response } from "express";
import { NewUser } from "../../db/schema/schema.js";
import { WrongJSONFormatError } from "../../error/wrong_json.js";
import { createUser } from "../../db/queries/users.js";

export async function handlerCreateUser(req: Request, res: Response): Promise<void> {
  const requestFormat = {
    password: String,
    email: String
  };

  const email = req.body.email;
  const password = req.body.password;
  if (!email) {
    throw new WrongJSONFormatError("Bad request: wrong JSON format");
  }
  
  const result = await createUser(email, password) as NewUser;
  res.status(201).json({
    id: result.id,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    email: result.email,
  });
}