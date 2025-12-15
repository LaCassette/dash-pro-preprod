import { defineConfig, env } from "prisma/config";
import dotenv from "dotenv";

// Load environment variables from .env.local (local dev)
// Cloudflare Pages provides env vars via process.env directly
dotenv.config({ path: ".env.local", override: false });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
