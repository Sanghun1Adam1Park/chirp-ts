import type { MigrationConfig } from "drizzle-orm/migrator";

process.loadEnvFile();

function envOrThrow(key: string) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}
const migrationConfig: MigrationConfig = {
  migrationsFolder: "./src/db/schema/migrations",
};

type Config = {
  api: {
    fileServerHits: number;
    port: number;
    platform: string;
  }
  dbConfig: {
    url: string;
    migrationConfig: MigrationConfig
  }
};

export const config: Config = {
  api: {
    fileServerHits: 0,
    port: Number(envOrThrow("PORT")),
    platform: envOrThrow("PLATFORM"),
  },
  dbConfig: {
    url: envOrThrow("DB_URL"),
    migrationConfig: migrationConfig,
  },
};