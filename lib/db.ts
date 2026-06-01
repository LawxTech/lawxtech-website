import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL ?? process.env.POSTGRES_URL!);

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
  const rows = await sql`
    SELECT * FROM posts WHERE published = true ORDER BY created_at DESC
  `;
  return rows as Post[];
}

export async function getAllPosts(): Promise<Post[]> {
  const rows = await sql`
    SELECT * FROM posts ORDER BY created_at DESC
  `;
  return rows as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const rows = await sql`
    SELECT * FROM posts WHERE slug = ${slug} LIMIT 1
  `;
  return (rows[0] as Post) ?? null;
}

export async function getPostById(id: number): Promise<Post | null> {
  const rows = await sql`
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
  const rows = await sql`
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
  const rows = await sql`
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
  await sql`
    UPDATE posts SET published = ${published}, updated_at = NOW() WHERE id = ${id}
  `;
}

export async function deletePost(id: number): Promise<void> {
  await sql`DELETE FROM posts WHERE id = ${id}`;
}
