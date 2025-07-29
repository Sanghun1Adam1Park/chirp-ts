import { hashPassword } from "../../lib/auth.js";
import { db } from "../index.js";
import { NewUser, users } from "../schema/schema.js";
import { eq, is } from "drizzle-orm";

export async function createUser(email: string, password: string) {
  const newUser = {
    email: email,
    password: await hashPassword(password),
  } as NewUser;

  const [result] = await db
    .insert(users)
    .values(newUser)
    .returning();
  return {
    id: result.id,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    email: result.email,
    isChirpyRed: result.isChirpyRed,
  };
}

export async function resetUserTable() {
  await db.delete(users);
}

export async function getUserByEmail(email: string) {
  const result = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  return result;
}

export async function updateUser(email: string, password: string, userId: string) {
  const userInfo = {
    email: email,
    password: await hashPassword(password),
    updatedAt: new Date(), 
  } as NewUser;

  const [result] = await db
    .update(users)
    .set(userInfo)
    .where(eq(users.id, userId))
    .returning();

  return {
    id: result.id,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    email: result.email,
    isChirpyRed: result.isChirpyRed,
  };
}

export async function upgradeUserToRed(userId: string) {
  const result = await db.update(users).set({
    isChirpyRed: true,
    updatedAt: new Date(),
  }).where(eq(users.id, userId)).returning();
  return result; 
}