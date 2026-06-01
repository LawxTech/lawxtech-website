"use server";

import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function setupAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!name || !email || password.length < 8) return;

  // Guard: refuse if any user already exists
  const existing = await sql`SELECT id FROM users LIMIT 1`;
  if (existing.length > 0) redirect("/admin/login");

  const hash = await bcrypt.hash(password, 12);
  await sql`
    INSERT INTO users (id, name, email, password_hash)
    VALUES (gen_random_uuid()::text, ${name}, ${email}, ${hash})
  `;
  redirect("/admin/login");
}
