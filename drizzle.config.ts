import { defineConfig } from "drizzle-kit";
import { config } from "./src/config";

export default defineConfig({
  schema: "src/db/schema/schema.ts",
  out: "src/db/schema/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: config.dbConfig.url,
  },
});