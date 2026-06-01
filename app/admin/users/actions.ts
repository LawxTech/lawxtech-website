"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

async function requireAuth() {
  const session = await auth();
  if (!session) redirect("/admin/login");
}

export async function createUserAction(formData: FormData) {
  await requireAuth();
  const sql = neon(process.env.DATABASE_URL ?? process.env.POSTGRES_URL!);
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!name || !email || password.length < 8) return;
  const hash = await bcrypt.hash(password, 12);
  await sql`
    INSERT INTO users (id, name, email, password_hash)
    VALUES (gen_random_uuid()::text, ${name}, ${email}, ${hash})
    ON CONFLICT (email) DO NOTHING
  `;
  redirect("/admin/users");
}
