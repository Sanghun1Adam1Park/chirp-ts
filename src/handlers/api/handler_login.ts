import { Response, Request } from "express";
import { getUserByEmail } from "../../db/queries/users.js";
import { WrongJSONFormatError } from "../../error/wrong_json.js";
import { NotFoundError } from "../../error/not_found.js";
import { checkPasswordHash } from "../../lib/auth.js";
import { UnauthorizedError } from "../../error/unauthorized.js";

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
    res.status(200).json({
      id: credentials.id,
      createdAt: credentials.createdAt,
      updatedAt: credentials.updatedAt,
      email: credentials.email,
    });
  } else {
    throw new UnauthorizedError("Invalid credentials");
  }
}