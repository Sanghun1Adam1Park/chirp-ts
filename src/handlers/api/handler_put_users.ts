import { Response, Request } from "express";
import { getBearerToken, validateJWT } from "../../lib/auth.js";
import { config } from "../../config.js"
import { WrongJSONFormatError } from "../../error/wrong_json.js";
import { updateUser } from "../../db/queries/users.js";

export async function handlerPutUsers(req: Request, res: Response) {
  const token = getBearerToken(req);
  const validated = validateJWT(token, config.api.secret);

  type parameters = {
    password: string,
    email: string 
  }

  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    throw new WrongJSONFormatError("Bad request: wrong JSON format");
  }
  
  const result = await updateUser(email, password, validated);
  res.status(200).json(result);
}