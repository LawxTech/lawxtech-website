import { neon } from "@neondatabase/serverless";

function db() {
  // The neon() HTTP driver must use the POOLED connection string (…-pooler…).
  // The unpooled/direct endpoint fails inside Vercel Functions, so prefer the
  // pooled URLs first and only fall back to the direct ones.
  const url =
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.DATABASE_URL_UNPOOLED ??
    process.env.POSTGRES_URL_NON_POOLING ??
    "";
  // Pass the connection string through untouched — neon() accepts the
  // channel_binding/sslmode params as-is (the /api/migrate route proves this).
  return neon(url);
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  image_key: string;
  read_time: string;
  published: boolean;
  author_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
    .replace(/-$/, "");
}

export async function getPublishedPosts(): Promise<Post[]> {
  const rows = await db()`
    SELECT * FROM posts WHERE published = true ORDER BY created_at DESC
  `;
  return rows as Post[];
}

export async function getAllPosts(): Promise<Post[]> {
  const rows = await db()`
    SELECT * FROM posts ORDER BY created_at DESC
  `;
  return rows as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const rows = await db()`
    SELECT * FROM posts WHERE slug = ${slug} LIMIT 1
  `;
  return (rows[0] as Post) ?? null;
}

export async function getPostById(id: number): Promise<Post | null> {
  const rows = await db()`
    SELECT * FROM posts WHERE id = ${id} LIMIT 1
  `;
  return (rows[0] as Post) ?? null;
}

export async function createPost(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  image_key: string;
  read_time: string;
  author_id: string | null;
}): Promise<Post> {
  const rows = await db()`
    INSERT INTO posts (slug, title, excerpt, content, image_url, image_key, read_time, author_id)
    VALUES (${data.slug}, ${data.title}, ${data.excerpt}, ${data.content},
            ${data.image_url}, ${data.image_key}, ${data.read_time}, ${data.author_id})
    RETURNING *
  `;
  return rows[0] as Post;
}

export async function updatePost(
  id: number,
  data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image_url: string;
    image_key: string;
    read_time: string;
  }
): Promise<Post> {
  const rows = await db()`
    UPDATE posts
    SET slug = ${data.slug}, title = ${data.title}, excerpt = ${data.excerpt},
        content = ${data.content}, image_url = ${data.image_url},
        image_key = ${data.image_key}, read_time = ${data.read_time},
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as Post;
}

export async function setPostPublished(
  id: number,
  published: boolean
): Promise<void> {
  await db()`
    UPDATE posts SET published = ${published}, updated_at = NOW() WHERE id = ${id}
  `;
}

export async function deletePost(id: number): Promise<void> {
  await db()`DELETE FROM posts WHERE id = ${id}`;
}

export async function getAllUsers(): Promise<AdminUser[]> {
  const rows = await db()`
    SELECT id, name, email, role, created_at FROM users ORDER BY created_at ASC
  `;
  return rows as AdminUser[];
}

export async function userExists(): Promise<boolean> {
  const rows = await db()`SELECT id FROM users LIMIT 1`;
  return rows.length > 0;
}

export async function getUserByEmail(
  email: string
): Promise<{ id: string; name: string; email: string; password_hash: string } | null> {
  const rows = await db()`
    SELECT id, name, email, password_hash FROM users
    WHERE email = ${email} LIMIT 1
  `;
  return (rows[0] as { id: string; name: string; email: string; password_hash: string }) ?? null;
}

export async function createUser(data: {
  name: string;
  email: string;
  passwordHash: string;
  role?: string;
}): Promise<void> {
  const role = data.role ?? "editor";
  await db()`
    INSERT INTO users (id, name, email, password_hash, role)
    VALUES (gen_random_uuid()::text, ${data.name}, ${data.email}, ${data.passwordHash}, ${role})
    ON CONFLICT (email) DO NOTHING
  `;
}

export async function updateUserProfile(
  userId: string,
  data: { name: string; passwordHash?: string }
): Promise<void> {
  if (data.passwordHash) {
    await db()`
      UPDATE users SET name = ${data.name}, password_hash = ${data.passwordHash}
      WHERE id = ${userId}
    `;
  } else {
    await db()`UPDATE users SET name = ${data.name} WHERE id = ${userId}`;
  }
}

export async function setUserRole(userId: string, role: string): Promise<void> {
  await db()`
    UPDATE users SET role = ${role} WHERE id = ${userId}
  `;
}

export async function deleteUser(userId: string): Promise<void> {
  await db()`DELETE FROM users WHERE id = ${userId}`;
}

export async function countAdmins(): Promise<number> {
  const rows = await db()`SELECT COUNT(*) AS n FROM users WHERE role = 'admin'`;
  return Number((rows[0] as { n: string }).n);
}
