"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createUser,
  setUserRole,
  deleteUser,
  countAdmins,
  updateUserProfile,
} from "@/lib/db";
import bcrypt from "bcryptjs";

async function requireAdmin() {
  const session = await auth();
  if (!session) redirect("/admin/login");
  if (session.user.role !== "admin") redirect("/admin/blog");
  return session;
}

async function requireSession() {
  const session = await auth();
  if (!session) redirect("/admin/login");
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

export async function updateUserAction(userId: string, formData: FormData) {
  const session = await requireSession();

  // Allow admins to edit anyone; everyone else may only edit their own account.
  const isSelf = session.user.id === userId;
  if (session.user.role !== "admin" && !isSelf) {
    return { error: "You do not have permission to edit this user." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name) return { error: "Name is required." };
  if (password && password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const passwordHash = password ? await bcrypt.hash(password, 12) : undefined;
  await updateUserProfile(userId, { name, passwordHash });
  revalidatePath("/admin/users");
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
