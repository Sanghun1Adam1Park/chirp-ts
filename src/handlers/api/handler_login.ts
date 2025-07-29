import { Response, Request } from "express";
import { getUserByEmail } from "../../db/queries/users.js";
import { WrongJSONFormatError } from "../../error/wrong_json.js";
import { NotFoundError } from "../../error/not_found.js";
import { checkPasswordHash, makeJWT, makeRefreshToken } from "../../lib/auth.js";
import { UnauthorizedError } from "../../error/unauthorized.js";
import { config } from "../../config.js";
import { createNewRToken } from "../../db/queries/refresh_token.js";

export async function handlerLogin(req: Request, res: Response): Promise<void> {
  const parameter = {
    password: String,
    email: String,
  }

  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    throw new WrongJSONFormatError("Bad request: wrong JSON format");
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
    const token = makeJWT(thisUser.id, 3600, config.api.secret);
    const tokenForRefreshToken = makeRefreshToken();
    const rerfreshToken = await createNewRToken(tokenForRefreshToken, thisUser.id);

    res.status(200).json({
      id: credentials.id,
      createdAt: credentials.createdAt,
      updatedAt: credentials.updatedAt,
      email: credentials.email,
      isChirpyRed: credentials.isChirpyRed,
      token: token,
      refreshToken: rerfreshToken.token,
    });
  } else {
    throw new UnauthorizedError("Invalid credentials");
  }
}