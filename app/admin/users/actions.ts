"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createUser } from "@/lib/db";
import bcrypt from "bcryptjs";

async function requireAuth() {
  const session = await auth();
  if (!session) redirect("/admin/login");
}

export async function createUserAction(formData: FormData) {
  await requireAuth();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!name || !email || password.length < 8) return;
  const passwordHash = await bcrypt.hash(password, 12);
  await createUser({ name, email, passwordHash });
  redirect("/admin/users");
}
