import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { NewChirp, chirps } from "../schema/schema.js";

export async function createChirp(body: string, userId: string) {
  const newChirp = {
    body: body,
    userId: userId,
  } as NewChirp;

  const [result] = await db
    .insert(chirps)
    .values(newChirp)
    .returning();
  return result;
}

export async function getChirpsByOrder(order: string) {
  let result; 
  if (order === "asc") {
    result = await db.query.chirps.findMany({
      orderBy: (chirps, { asc }) => [asc(chirps.createdAt)],
    });
  } else {
    result = await db.query.chirps.findMany({
      orderBy: (chirps, { desc }) => [desc(chirps.createdAt)],
    });
  }
  return result;
}

export async function getChirpByID(id: string) {
  const result = await db.query.chirps.findFirst({
    where: (chirps, { eq }) => eq(chirps.id, id),
  });
  return result;
}

export async function deleteChirp(id: string) {
  const result = await db.delete(chirps).where(eq(chirps.id, id)).returning();
  return result;
}

export async function getChirpByAuthor(authorId: string) {
  const result = await db.query.chirps.findMany({
    where: (chirps, { eq }) => eq(chirps.userId, authorId),
  });
  return result;
}