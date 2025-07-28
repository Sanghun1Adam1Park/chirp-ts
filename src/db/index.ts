import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "../db/schema/schema.js";
import { config } from "../config.js";

const conn = postgres(config.dbConfig.url);
export const db = drizzle(conn, { schema });