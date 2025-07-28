import { hash, compare } from "bcrypt";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
}

export async function checkPasswordHash(password: string, hash: string) {
  const isMatch = await compare(password, hash);
  return isMatch;
}