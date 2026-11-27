import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;

export default defineConfig({
  dialect: "postgresql",
  schema: "./schema",
  out: "./migrations",
  ...(databaseUrl ? { dbCredentials: { url: databaseUrl } } : {}),
});
