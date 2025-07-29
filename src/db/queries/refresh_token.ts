import { db } from "../../db/index.js";
import { refreshTokens, NewRefreshToken } from "../schema/schema.js";
import { eq } from "drizzle-orm";

export async function createNewRToken(token: string, userId: string) {
  const newToken = {
    token: token,
    userId: userId,
    expiredAt: new Date(Date.now() + 60 * 60 * 24 * 60 * 1000), 
  } as NewRefreshToken;

  const [result] = await db
    .insert(refreshTokens)
    .values(newToken)
    .returning();
  return result;
}

export async function getRefreshToken(token: string) {
  const result = await db.query.refreshTokens.findFirst({
    where: (refreshTokens, { eq }) => eq(refreshTokens.token, token),
  });
  return result as NewRefreshToken;
}

export async function revokeRefreshToken(token: string) {
  const result = await db.update(refreshTokens).set({
    revokedAt: new Date(),
    updatedAt: new Date(), 
  }).where(eq(refreshTokens.token, token)).returning();
  return result;
} 