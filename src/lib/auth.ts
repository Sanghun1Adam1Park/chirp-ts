import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken"; 
import { UnauthorizedError } from "../error/unauthorized.js";
import { Request } from "express";
import { WrongJSONFormatError } from "../error/wrong_json.js";
import { randomBytes } from "crypto";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
}

export async function checkPasswordHash(password: string, hash: string) {
  const isMatch = await compare(password, hash);
  return isMatch;
}

export type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

export function makeJWT(userID: string, expiresIn: number, secret: string) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + expiresIn;
  const token = jwt.sign({
      iss: "chirp",
      sub: userID,
      iat: issuedAt,
      exp: expiresAt,
    } satisfies payload,
    secret,
    { algorithm: "HS256" },
  );

  return token;
}

export function validateJWT(tokenString: string, secret: string) {
  let decoded: payload;
  try {
    decoded = jwt.verify(tokenString, secret) as JwtPayload;
  } catch (e) {
    throw new UnauthorizedError("Invalid token");
  }

  if (decoded.iss !== "chirp") {
    throw new UnauthorizedError("Invalid issuer");
  }

  if (!decoded.sub) {
    throw new UnauthorizedError("No user ID in token");
  }

  return decoded.sub;
}

export function getBearerToken(req: Request): string {
  const tokenString = req.get("Authorization"); 
  if (!tokenString) {
    throw new UnauthorizedError("Wrong json format"); 
  }
  try {
    const credentails = tokenString.trim().split(" ")[1]
    return credentails; 
  } catch (err) {
    throw new WrongJSONFormatError("Type or Crendentail missing");
  }
}

export function makeRefreshToken() {
  const token = randomBytes(32).toString("hex"); 
  return token; 
}