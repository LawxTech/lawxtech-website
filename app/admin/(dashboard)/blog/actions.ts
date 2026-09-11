"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";
import {
  createPost,
  updatePost,
  deletePost,
  setPostPublished,
  getPostById,
  generateSlug,
} from "@/lib/db";

async function requireAuth() {
  const session = await auth();
  if (!session) redirect("/admin/login");
  return session;
}

async function uploadImage(
  file: File | null,
  oldKey?: string
): Promise<{ url: string; key: string }> {
  if (!file || file.size === 0) return { url: "", key: "" };
  if (oldKey) await del(oldKey).catch(() => {});
  const blob = await put(`blog/${Date.now()}-${file.name}`, file, {
    access: "public",
  });
  return { url: blob.url, key: blob.pathname };
}

export async function createPostAction(formData: FormData) {
  const session = await requireAuth();
  const title = String(formData.get("title") ?? "");
  const imageFile = formData.get("image") as File | null;
  const { url: image_url, key: image_key } = await uploadImage(imageFile);
  const post = await createPost({
    title,
    slug: generateSlug(title),
    excerpt: String(formData.get("excerpt") ?? ""),
    content: String(formData.get("content") ?? ""),
    read_time: String(formData.get("read_time") ?? "3 minutes"),
    image_url,
    image_key,
    author_id: (session.user as { id?: string })?.id ?? null,
  });
  revalidatePath("/blogs");
  redirect(`/admin/blog/${post.id}/edit`);
}

export async function updatePostAction(id: number, formData: FormData) {
  await requireAuth();
  const existing = await getPostById(id);
  if (!existing) redirect("/admin/blog");
  const title = String(formData.get("title") ?? "");
  const imageFile = formData.get("image") as File | null;
  const hasNewImage = imageFile && imageFile.size > 0;
  const { url: image_url, key: image_key } = hasNewImage
    ? await uploadImage(imageFile, existing.image_key || undefined)
    : { url: existing.image_url, key: existing.image_key };
  await updatePost(id, {
    title,
    slug: generateSlug(title),
    excerpt: String(formData.get("excerpt") ?? ""),
    content: String(formData.get("content") ?? ""),
    read_time: String(formData.get("read_time") ?? "3 minutes"),
    image_url,
    image_key,
  });
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${existing.slug}`);
  redirect("/admin/blog");
}

export async function publishPostAction(id: number, published: boolean) {
  await requireAuth();
  await setPostPublished(id, published);
  revalidatePath("/blogs");
  revalidatePath("/admin/blog");
}

export async function deletePostAction(id: number) {
  await requireAuth();
  const post = await getPostById(id);
  if (post?.image_key) await del(post.image_key).catch(() => {});
  await deletePost(id);
  revalidatePath("/blogs");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}
