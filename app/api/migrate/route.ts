import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET() {
  const sql = neon(process.env.DATABASE_URL ?? process.env.POSTGRES_URL!);

  // Auth.js tables
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      name TEXT,
      email TEXT UNIQUE NOT NULL,
      "emailVerified" TIMESTAMPTZ,
      image TEXT,
      password_hash TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS accounts (
      "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      type TEXT NOT NULL,
      provider TEXT NOT NULL,
      "providerAccountId" TEXT NOT NULL,
      refresh_token TEXT,
      access_token TEXT,
      expires_at INTEGER,
      token_type TEXT,
      scope TEXT,
      id_token TEXT,
      session_state TEXT,
      PRIMARY KEY (provider, "providerAccountId")
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS sessions (
      "sessionToken" TEXT PRIMARY KEY,
      "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires TIMESTAMPTZ NOT NULL
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS verification_tokens (
      identifier TEXT NOT NULL,
      token TEXT NOT NULL,
      expires TIMESTAMPTZ NOT NULL,
      PRIMARY KEY (identifier, token)
    )
  `;

  // Posts table
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id          SERIAL PRIMARY KEY,
      slug        TEXT UNIQUE NOT NULL,
      title       TEXT NOT NULL,
      excerpt     TEXT NOT NULL DEFAULT '',
      content     TEXT NOT NULL DEFAULT '',
      image_url   TEXT NOT NULL DEFAULT '',
      image_key   TEXT NOT NULL DEFAULT '',
      read_time   TEXT NOT NULL DEFAULT '3 minutes',
      published   BOOLEAN NOT NULL DEFAULT false,
      author_id   TEXT REFERENCES users(id) ON DELETE SET NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS posts_published_created ON posts (published, created_at DESC)
  `;

  // Add role column to users (idempotent)
  await sql`
    ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'admin'
  `;

  return NextResponse.json({ ok: true, message: "Migration complete" });
}
