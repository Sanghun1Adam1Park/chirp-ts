import { Response, Request } from "express";
import { getUserByEmail } from "../../db/queries/users.js";
import { WrongJSONFormatError } from "../../error/wrong_json.js";
import { NotFoundError } from "../../error/not_found.js";
import { checkPasswordHash, makeJWT } from "../../lib/auth.js";
import { UnauthorizedError } from "../../error/unauthorized.js";
import { config } from "../../config.js";

export async function handlerLogin(req: Request, res: Response): Promise<void> {
  const parameter = {
    password: String,
    email: String,
    expiresInSeconds: Number
  }

  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    throw new WrongJSONFormatError("Bad request: wrong JSON format");
  }

  const reqExpiresIn = req.body.expiresInSeconds; 
  let expiresIn; 
  if (!reqExpiresIn) {
    expiresIn = 60 * 60;
  } else {
    expiresIn = reqExpiresIn > 3600 ? 3600 : reqExpiresIn
  }

  const credentials = await getUserByEmail(email);
  if (!credentials) {
    throw new NotFoundError("User not found");
  }

  if (await checkPasswordHash(password, credentials.password)) {
    let thisUser = await getUserByEmail(email);
    if (!thisUser) {
      throw new NotFoundError("User not found."); 
    }
    const token = makeJWT(thisUser.id, expiresIn, config.api.secret);

    res.status(200).json({
      id: credentials.id,
      createdAt: credentials.createdAt,
      updatedAt: credentials.updatedAt,
      email: credentials.email,
      token: token 
    });
  } else {
    throw new UnauthorizedError("Invalid credentials");
  }
}