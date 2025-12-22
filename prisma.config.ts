import { defineConfig } from "prisma/config";
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
    // Use process.env with fallback for prisma generate (doesn't need actual DB connection)
    url: process.env.DATABASE_URL || "mysql://placeholder:placeholder@localhost:3306/placeholder",
  },
});
