"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createUser, setUserRole, deleteUser, countAdmins } from "@/lib/db";
import bcrypt from "bcryptjs";

async function requireAdmin() {
  const session = await auth();
  if (!session) redirect("/admin/login");
  if (session.user.role !== "admin") redirect("/admin/blog");
  return session;
}

export async function createUserAction(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "editor");
  if (!name || !email || password.length < 8) return;
  const passwordHash = await bcrypt.hash(password, 12);
  await createUser({ name, email, passwordHash, role });
  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function setUserRoleAction(userId: string, role: string) {
  const session = await requireAdmin();

  // Prevent demoting yourself
  if (userId === session.user.id && role !== "admin") {
    return { error: "You cannot demote yourself." };
  }

  // Prevent removing the last admin
  if (role !== "admin") {
    const adminCount = await countAdmins();
    if (adminCount <= 1) {
      return { error: "Cannot demote the last admin." };
    }
  }

  await setUserRole(userId, role);
  revalidatePath("/admin/users");
}

export async function deleteUserAction(userId: string) {
  const session = await requireAdmin();

  // Prevent deleting yourself
  if (userId === session.user.id) {
    return { error: "You cannot delete your own account." };
  }

  await deleteUser(userId);
  revalidatePath("/admin/users");
  redirect("/admin/users");
}
