import { db } from "../index.js";
import { NewUser, users } from "../schema/schema.js";

export async function createUser(email: string) {
  const newUser = {
    email: email,
  } as NewUser;

  const [result] = await db
    .insert(users)
    .values(newUser)
    .returning();
  return result;
}

export async function resetUserTable() {
  await db.delete(users);
}