"use server";

import { redirect } from "next/navigation";
import { userExists, createUser } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function setupAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!name || !email || password.length < 8) return;

  if (await userExists()) redirect("/admin/login");

  const passwordHash = await bcrypt.hash(password, 12);
  await createUser({ name, email, passwordHash });
  redirect("/admin/login");
}
