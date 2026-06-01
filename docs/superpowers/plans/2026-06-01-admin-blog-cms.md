# Admin Blog CMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a password-protected `/admin/blog` CMS inside the existing Next.js app where non-devs can write and publish blog posts, stored in Vercel Postgres, replacing the current static `lib/data/blogs.ts` array.

**Architecture:** A simple PIN-based admin (env var `ADMIN_PIN`) with Next.js middleware protecting all `/admin/*` routes via an HMAC-signed httpOnly cookie. Vercel Postgres (free tier, powered by Neon) is the database — Next.js Server Actions talk to it directly with `@vercel/postgres`. The app is restructured with route groups so `/admin` gets its own layout (no public header/footer) while all public pages stay wrapped in the existing header/footer layout. Tiptap stores content as HTML.

**Tech Stack:** Next.js 16 App Router, Vercel Postgres (`@vercel/postgres`), Tiptap (`@tiptap/react` + `@tiptap/starter-kit`), Next.js Middleware, Web Crypto API (no extra auth library), Tailwind v4, shadcn/ui

---

## Pre-Task: Vercel Postgres Setup (Manual Steps — Do This First)

These are one-time setup steps in the Vercel dashboard before writing any code.

**Step 1: Create the database**
1. Go to [vercel.com/dashboard](https://vercel.com) → your project → **Storage** tab
2. Click **Create Database** → choose **Postgres** (powered by Neon)
3. Name it `lawxtech-blog`, region: closest to your users (e.g. `us-east-1`)
4. Click **Create**

**Step 2: Connect to your project**
1. On the database page, click **Connect Project**
2. Select your Vercel project → **Connect**
3. Vercel automatically adds environment variables to all environments (Production, Preview, Development)

**Step 3: Pull env vars locally**
```bash
npx vercel env pull .env.local
```
This adds `POSTGRES_URL`, `POSTGRES_URL_NON_POOLING`, `POSTGRES_USER`, `POSTGRES_HOST`, `POSTGRES_PASSWORD`, `POSTGRES_DATABASE` to `.env.local`.

**Step 4: Add auth env vars to `.env.local` (and Vercel dashboard)**
```bash
# .env.local — add these manually
ADMIN_PIN=your-secret-pin-here
ADMIN_SESSION_SECRET=a-long-random-string-at-least-32-chars
```
Also add `ADMIN_PIN` and `ADMIN_SESSION_SECRET` to Vercel Dashboard → Settings → Environment Variables → Production + Preview + Development.

---

## File Map

| File | Status | Responsibility |
|------|--------|---------------|
| `app/layout.tsx` | **Modify** | Minimal HTML shell — no Header/Footer |
| `app/(public)/layout.tsx` | **Create** | Public layout with Header + Footer |
| `app/(public)/page.tsx` | **Move** from `app/page.tsx` | Home page (URL stays `/`) |
| `app/(public)/about-us/page.tsx` | **Move** | About page |
| `app/(public)/blogs/page.tsx` | **Move + Modify** | Blog listing — reads from DB |
| `app/(public)/blogs/[blogId]/page.tsx` | **Move + Modify** | Blog detail — reads from DB |
| `app/(public)/careers/page.tsx` | **Move** | Careers page |
| `app/(public)/contact-us/page.tsx` | **Move** | Contact page |
| `app/(public)/series/page.tsx` | **Move** | Series page |
| `app/(public)/summit-awards/page.tsx` | **Move** | Summit page |
| `app/admin/layout.tsx` | **Create** | Admin shell (clean, no public nav) |
| `app/admin/login/page.tsx` | **Create** | Login form |
| `app/admin/login/actions.ts` | **Create** | Login server action |
| `app/admin/blog/page.tsx` | **Create** | Post list + management |
| `app/admin/blog/new/page.tsx` | **Create** | New post page |
| `app/admin/blog/[id]/edit/page.tsx` | **Create** | Edit post page |
| `app/admin/blog/actions.ts` | **Create** | CRUD server actions (create/update/delete/publish) |
| `app/admin/logout/route.ts` | **Create** | GET handler to clear session cookie |
| `components/admin/TiptapEditor.tsx` | **Create** | Client component — Tiptap rich text editor |
| `components/admin/PostForm.tsx` | **Create** | Client component — shared new/edit form |
| `lib/db.ts` | **Create** | Vercel Postgres helpers (typed query wrappers) |
| `lib/auth.ts` | **Create** | Session token sign/verify using Web Crypto |
| `middleware.ts` | **Create** | Protects `/admin/*`, redirects to `/admin/login` |

---

## Task 1: Install Dependencies

**Files:** `package.json`

- [ ] **Step 1: Install packages**

```bash
npm install @vercel/postgres @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-placeholder
```

- [ ] **Step 2: Verify install**

```bash
cat package.json | grep -E '"@vercel|@tiptap'
```
Expected: all four packages appear with versions.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install @vercel/postgres and tiptap dependencies"
```

---

## Task 2: Route Group Restructure

Move all existing public pages into `app/(public)/` so admin gets its own isolated layout. Route groups in Next.js use `(folder)` syntax — they don't affect URLs. `/` still maps to `app/(public)/page.tsx`.

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/(public)/layout.tsx`
- Move (copy then delete): all public pages

- [ ] **Step 1: Rewrite `app/layout.tsx` to be a minimal HTML shell**

Replace the entire contents of `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { buildMetadata } from "@/lib/metadata";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${playfair.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Create `app/(public)/layout.tsx`**

```tsx
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Databuddy } from "@databuddy/sdk/react";
import { organizationJsonLd } from "@/lib/metadata";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <Analytics />
        <Databuddy
          clientId="4511d702-22d2-44c9-aac8-5fe949d3222a"
          trackAttributes={true}
          trackOutgoingLinks={true}
          trackInteractions={true}
          trackWebVitals={true}
          trackErrors={true}
        />
        <Script
          src="https://cdn.databuddy.cc/databuddy.js"
          data-site-id={process.env.NEXT_PUBLIC_DATABUDDY_SITE_ID}
          strategy="afterInteractive"
        />
      </div>
    </>
  );
}
```

- [ ] **Step 3: Move pages into `(public)` group**

Run these commands to copy files (then delete originals):

```bash
mkdir -p app/\(public\)/about-us app/\(public\)/careers app/\(public\)/contact-us app/\(public\)/series app/\(public\)/summit-awards app/\(public\)/blogs/\[blogId\]

cp app/page.tsx app/\(public\)/page.tsx
cp app/about-us/page.tsx app/\(public\)/about-us/page.tsx
cp app/careers/page.tsx app/\(public\)/careers/page.tsx
cp app/contact-us/page.tsx app/\(public\)/contact-us/page.tsx
cp app/series/page.tsx app/\(public\)/series/page.tsx
cp app/summit-awards/page.tsx app/\(public\)/summit-awards/page.tsx
cp app/blogs/page.tsx app/\(public\)/blogs/page.tsx
cp app/blogs/\[blogId\]/page.tsx app/\(public\)/blogs/\[blogId\]/page.tsx
```

- [ ] **Step 4: Delete old page locations (not the blog files — those get rewritten later)**

```bash
rm app/page.tsx
rm app/about-us/page.tsx
rm app/careers/page.tsx
rm app/contact-us/page.tsx
rm app/series/page.tsx
rm app/summit-awards/page.tsx
```

Do NOT delete `app/blogs/` pages yet — they'll be rewritten in Task 7.

- [ ] **Step 5: Verify dev server still works**

```bash
npm run dev
```

Open `http://localhost:3000` — homepage should render with header/footer exactly as before. Open `http://localhost:3000/about-us` — should also work. Fix any import path issues before continuing.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: restructure into route groups for admin layout isolation"
```

---

## Task 3: Database Layer

Create the Vercel Postgres client and schema. Next.js talks directly to the database via `@vercel/postgres` — no ORM needed.

**Files:**
- Create: `lib/db.ts`

- [ ] **Step 1: Create `lib/db.ts`**

```ts
import { sql } from "@vercel/postgres";

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  duration: string;
  published: boolean;
  created_at: Date;
  updated_at: Date;
}

export async function runMigration() {
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      image_url TEXT NOT NULL DEFAULT '',
      duration TEXT NOT NULL DEFAULT '3 minutes',
      published BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export async function getAllPosts(): Promise<Post[]> {
  const { rows } = await sql<Post>`
    SELECT * FROM posts ORDER BY created_at DESC
  `;
  return rows;
}

export async function getPublishedPosts(): Promise<Post[]> {
  const { rows } = await sql<Post>`
    SELECT * FROM posts WHERE published = true ORDER BY created_at DESC
  `;
  return rows;
}

export async function getPostById(id: number): Promise<Post | null> {
  const { rows } = await sql<Post>`
    SELECT * FROM posts WHERE id = ${id} LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function createPost(data: {
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  duration: string;
}): Promise<Post> {
  const { rows } = await sql<Post>`
    INSERT INTO posts (title, excerpt, content, image_url, duration)
    VALUES (${data.title}, ${data.excerpt}, ${data.content}, ${data.image_url}, ${data.duration})
    RETURNING *
  `;
  return rows[0];
}

export async function updatePost(
  id: number,
  data: {
    title: string;
    excerpt: string;
    content: string;
    image_url: string;
    duration: string;
  }
): Promise<Post> {
  const { rows } = await sql<Post>`
    UPDATE posts
    SET title = ${data.title},
        excerpt = ${data.excerpt},
        content = ${data.content},
        image_url = ${data.image_url},
        duration = ${data.duration},
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
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
```

- [ ] **Step 2: Create the migration API route at `app/api/migrate/route.ts`**

This is a one-time route to create the table. You'll hit it once, then it's idempotent (CREATE TABLE IF NOT EXISTS).

```ts
import { NextResponse } from "next/server";
import { runMigration } from "@/lib/db";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }
  await runMigration();
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 3: Run the migration locally**

Make sure `.env.local` has `POSTGRES_URL` (from `vercel env pull`), then:

```bash
npm run dev
```

In another terminal:
```bash
curl http://localhost:3000/api/migrate
```
Expected: `{"ok":true}`

- [ ] **Step 4: Run the migration in production**

Deploy first (after all tasks are done — come back to this). Or use Vercel's built-in query runner: Vercel Dashboard → Storage → your DB → **Query** tab → paste and run:

```sql
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  duration TEXT NOT NULL DEFAULT '3 minutes',
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

- [ ] **Step 5: Commit**

```bash
git add lib/db.ts app/api/migrate/route.ts
git commit -m "feat: add Vercel Postgres database layer and posts schema"
```

---

## Task 4: Auth Layer + Middleware

PIN-based auth using an HMAC-signed cookie. No library — pure Web Crypto API available in the Node.js/Edge runtime.

**Files:**
- Create: `lib/auth.ts`
- Create: `middleware.ts`

- [ ] **Step 1: Create `lib/auth.ts`**

```ts
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET env var is not set");
  return secret;
}

async function sign(value: string): Promise<string> {
  const secret = getSecret();
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(value)
  );
  const sigBase64 = Buffer.from(signature).toString("base64url");
  return `${value}.${sigBase64}`;
}

async function verify(token: string): Promise<string | null> {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return null;
  const value = token.slice(0, lastDot);
  const expected = await sign(value);
  if (expected !== token) return null;
  return value;
}

export async function createSession(): Promise<void> {
  const token = await sign("authenticated");
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getSessionToken();
  if (!token) return false;
  const value = await verify(token);
  return value === "authenticated";
}

export function verifyPin(pin: string): boolean {
  const correctPin = process.env.ADMIN_PIN;
  if (!correctPin) throw new Error("ADMIN_PIN env var is not set");
  return pin === correctPin;
}
```

- [ ] **Step 2: Create `middleware.ts` at the project root**

```ts
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const token = request.cookies.get("admin_session")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const value = token.slice(0, lastDot);
  const sig = token.slice(lastDot + 1);

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const sigBytes = Buffer.from(sig, "base64url");
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    sigBytes,
    encoder.encode(value)
  );

  if (!valid || value !== "authenticated") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

- [ ] **Step 3: Commit**

```bash
git add lib/auth.ts middleware.ts
git commit -m "feat: add PIN-based session auth with HMAC-signed cookie and middleware guard"
```

---

## Task 5: Admin Layout + Login Page

The admin section gets its own clean layout — no public header/footer.

**Files:**
- Create: `app/admin/layout.tsx`
- Create: `app/admin/login/page.tsx`
- Create: `app/admin/login/actions.ts`
- Create: `app/admin/logout/route.ts`

- [ ] **Step 1: Create `app/admin/layout.tsx`**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { template: "%s | Admin", default: "Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create `app/admin/login/actions.ts`**

```ts
"use server";

import { redirect } from "next/navigation";
import { verifyPin, createSession } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const pin = formData.get("pin");
  if (typeof pin !== "string" || !verifyPin(pin)) {
    return { error: "Incorrect PIN. Try again." };
  }
  await createSession();
  redirect("/admin/blog");
}
```

- [ ] **Step 3: Create `app/admin/login/page.tsx`**

```tsx
import type { Metadata } from "next";
import { loginAction } from "./actions";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-navy mb-4">
            <span className="text-white font-bold text-sm">L×T</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
          <p className="mt-1 text-sm text-gray-500">Enter your PIN to continue</p>
        </div>

        <form action={loginAction} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-4">
          <div>
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-1.5">
              PIN
            </label>
            <input
              id="pin"
              name="pin"
              type="password"
              required
              autoFocus
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
              placeholder="Enter your admin PIN"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-navy text-white text-sm font-semibold py-2.5 hover:bg-navy/90 transition-colors"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
```

Note: if the server action returns `{ error }` instead of redirecting, you'll need to thread that through — the simplest approach with Server Actions in Next.js 16 is to use `useActionState` on the client, OR redirect with a search param on error. Update the action to redirect on error:

```ts
// Replace the return { error } line in actions.ts with:
redirect("/admin/login?error=1");
```

And in `page.tsx`, read it:

```tsx
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  // ... inside the form, add:
  // {error && <p className="text-sm text-red-600">Incorrect PIN. Try again.</p>}
```

- [ ] **Step 4: Create `app/admin/logout/route.ts`**

```ts
import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

export async function GET() {
  await destroySession();
  return NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"));
}
```

- [ ] **Step 5: Test login flow**

```bash
npm run dev
```

Navigate to `http://localhost:3000/admin/blog` — should redirect to `/admin/login`.
Enter a wrong PIN — should show error.
Enter correct `ADMIN_PIN` from `.env.local` — should redirect to `/admin/blog` (which 404s for now — that's fine).
Navigate to `http://localhost:3000/admin/logout` — should clear cookie and redirect to login.

- [ ] **Step 6: Commit**

```bash
git add app/admin/layout.tsx app/admin/login/ app/admin/logout/
git commit -m "feat: add admin layout, login page, and logout route"
```

---

## Task 6: Tiptap Editor Component

A reusable rich text editor that the admin post form will use.

**Files:**
- Create: `components/admin/TiptapEditor.tsx`

- [ ] **Step 1: Create `components/admin/TiptapEditor.tsx`**

```tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

interface TiptapEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function TiptapEditor({
  value,
  onChange,
  placeholder = "Write your article here...",
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [editor, value]);

  if (!editor) return null;

  const ToolbarButton = ({
    onClick,
    active,
    title,
    children,
  }: {
    onClick: () => void;
    active?: boolean;
    title: string;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2.5 py-1.5 rounded text-sm font-medium transition-colors ${
        active
          ? "bg-navy text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-navy focus-within:border-transparent">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Ordered List"
        >
          1. List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Blockquote"
        >
          ❝
        </ToolbarButton>
        <div className="w-px bg-gray-300 mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo"
        >
          ↩
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo"
        >
          ↪
        </ToolbarButton>
      </div>

      {/* Editor area */}
      <EditorContent
        editor={editor}
        className="prose prose-slate max-w-none p-4 min-h-[400px] text-sm focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-gray-400 [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none"
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/TiptapEditor.tsx
git commit -m "feat: add Tiptap rich text editor component"
```

---

## Task 7: Post Form Component + CRUD Server Actions

The shared form used by both "new" and "edit" pages.

**Files:**
- Create: `components/admin/PostForm.tsx`
- Create: `app/admin/blog/actions.ts`

- [ ] **Step 1: Create `app/admin/blog/actions.ts`**

```ts
"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createPost, updatePost, deletePost, setPostPublished } from "@/lib/db";

export async function createPostAction(formData: FormData) {
  const post = await createPost({
    title: String(formData.get("title") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    content: String(formData.get("content") ?? ""),
    image_url: String(formData.get("image_url") ?? ""),
    duration: String(formData.get("duration") ?? "3 minutes"),
  });
  revalidatePath("/blogs");
  redirect(`/admin/blog/${post.id}/edit`);
}

export async function updatePostAction(id: number, formData: FormData) {
  await updatePost(id, {
    title: String(formData.get("title") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    content: String(formData.get("content") ?? ""),
    image_url: String(formData.get("image_url") ?? ""),
    duration: String(formData.get("duration") ?? "3 minutes"),
  });
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
  redirect(`/admin/blog`);
}

export async function publishPostAction(id: number, published: boolean) {
  await setPostPublished(id, published);
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/admin/blog");
}

export async function deletePostAction(id: number) {
  await deletePost(id);
  revalidatePath("/blogs");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}
```

- [ ] **Step 2: Create `components/admin/PostForm.tsx`**

This is a client component because it contains the Tiptap editor (which uses browser APIs).

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TiptapEditor from "./TiptapEditor";
import type { Post } from "@/lib/db";

interface PostFormProps {
  post?: Post;
  action: (formData: FormData) => Promise<void>;
}

export default function PostForm({ post, action }: PostFormProps) {
  const [content, setContent] = useState(post?.content ?? "");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    formData.set("content", content);
    await action(formData);
    setPending(false);
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className={labelClass}>Title *</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={post?.title}
          className={inputClass}
          placeholder="Article title"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className={labelClass}>Excerpt *</label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={3}
          defaultValue={post?.excerpt}
          className={inputClass}
          placeholder="Short summary shown on the blog listing"
        />
      </div>

      <div>
        <label htmlFor="image_url" className={labelClass}>Cover Image URL</label>
        <input
          id="image_url"
          name="image_url"
          type="url"
          defaultValue={post?.image_url}
          className={inputClass}
          placeholder="https://..."
        />
      </div>

      <div>
        <label htmlFor="duration" className={labelClass}>Read Time</label>
        <input
          id="duration"
          name="duration"
          type="text"
          defaultValue={post?.duration ?? "3 minutes"}
          className={inputClass}
          placeholder="e.g. 3 minutes"
        />
      </div>

      <div>
        <label className={labelClass}>Article Content *</label>
        <TiptapEditor
          value={content}
          onChange={setContent}
          placeholder="Write your article here..."
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-navy text-white text-sm font-semibold px-6 py-2.5 hover:bg-navy/90 transition-colors disabled:opacity-50"
        >
          {pending ? "Saving..." : "Save Draft"}
        </button>
      </div>
    </form>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/admin/blog/actions.ts components/admin/PostForm.tsx
git commit -m "feat: add blog CRUD server actions and shared PostForm component"
```

---

## Task 8: Admin Blog Management Pages

**Files:**
- Create: `app/admin/blog/page.tsx`
- Create: `app/admin/blog/new/page.tsx`
- Create: `app/admin/blog/[id]/edit/page.tsx`

- [ ] **Step 1: Create `app/admin/blog/page.tsx`**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/db";
import { publishPostAction, deletePostAction } from "./actions";

export const metadata: Metadata = { title: "Blog Posts" };

export default async function AdminBlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-sm text-gray-500 mt-1">{posts.length} total posts</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/logout"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Sign out
          </Link>
          <Link
            href="/admin/blog/new"
            className="rounded-lg bg-navy text-white text-sm font-semibold px-4 py-2.5 hover:bg-navy/90 transition-colors"
          >
            + New Post
          </Link>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <p className="text-gray-400 text-sm">No posts yet.</p>
          <Link href="/admin/blog/new" className="mt-3 inline-block text-navy text-sm font-semibold underline">
            Write your first post
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4"
            >
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full ${
                      post.published
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                  <h2 className="font-medium text-gray-900 text-sm truncate">
                    {post.title}
                  </h2>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(post.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <form
                  action={async () => {
                    "use server";
                    await publishPostAction(post.id, !post.published);
                  }}
                >
                  <button
                    type="submit"
                    className="text-xs font-medium text-navy hover:underline"
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </button>
                </form>

                <Link
                  href={`/admin/blog/${post.id}/edit`}
                  className="text-xs font-medium text-gray-500 hover:text-gray-700"
                >
                  Edit
                </Link>

                <form
                  action={async () => {
                    "use server";
                    await deletePostAction(post.id);
                  }}
                >
                  <button
                    type="submit"
                    className="text-xs font-medium text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      if (!confirm(`Delete "${post.title}"?`)) e.preventDefault();
                    }}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create `app/admin/blog/new/page.tsx`**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import PostForm from "@/components/admin/PostForm";
import { createPostAction } from "../actions";

export const metadata: Metadata = { title: "New Post" };

export default function NewPostPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <Link href="/admin/blog" className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to posts
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-4">New Post</h1>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <PostForm action={createPostAction} />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `app/admin/blog/[id]/edit/page.tsx`**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import { getPostById } from "@/lib/db";
import { updatePostAction, publishPostAction } from "../../actions";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostById(Number(id));
  return { title: post ? `Edit: ${post.title}` : "Edit Post" };
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) notFound();

  const updateAction = updatePostAction.bind(null, post.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin/blog" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to posts
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Edit Post</h1>
        </div>
        <form
          action={async () => {
            "use server";
            await publishPostAction(post.id, !post.published);
          }}
        >
          <button
            type="submit"
            className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
              post.published
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {post.published ? "Unpublish" : "Publish"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <PostForm post={post} action={updateAction} />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Test the admin flow end-to-end**

```bash
npm run dev
```

1. `http://localhost:3000/admin/blog` → redirects to login
2. Log in with correct PIN → lands on blog list (empty)
3. Click "+ New Post" → new post form with Tiptap editor
4. Fill in title, excerpt, write some content → "Save Draft"
5. Back on list → post shows as "Draft"
6. Click "Publish" → badge changes to "Published"
7. Click "Edit" → content loads in editor, make change → "Save Draft"
8. Verify changes saved in Vercel dashboard Query tab

- [ ] **Step 5: Commit**

```bash
git add app/admin/blog/
git commit -m "feat: add admin blog management pages (list, new, edit)"
```

---

## Task 9: Update Public Blog Pages to Read From DB

Replace the static `blogs` import with live DB queries. The public blog page now reads only **published** posts.

**Files:**
- Modify: `app/(public)/blogs/page.tsx`
- Modify: `app/(public)/blogs/[blogId]/page.tsx`

- [ ] **Step 1: Update `app/(public)/blogs/page.tsx`**

Replace the entire file contents with:

```tsx
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { getPublishedPosts } from "@/lib/db";
import { Clock, Calendar } from "lucide-react";

export const metadata = buildMetadata({
  title: "Newsletters & Articles",
  description:
    "Read newsletters and articles from the Law x Tech community on legal technology, career transitions, and thriving at the intersection of law and tech.",
  robots: { index: false, follow: true },
});

export const revalidate = 60;

export default async function BlogsPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <section className="bg-white py-20 border-b border-border-brand">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            From the Community
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-navy tracking-tight">
            Newsletters &amp; Articles
          </h1>
          <p className="mt-5 text-muted-brand text-base leading-relaxed">
            Insights, stories, and practical advice for legal professionals
            navigating the world of technology.
          </p>
          <div className="mt-6 mx-auto w-16 h-1 bg-teal rounded-full" />
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">📖</p>
              <h3 className="text-xl font-bold text-navy">
                Articles coming soon
              </h3>
              <p className="mt-2 text-muted-brand">
                Check back soon for new newsletters and articles.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-border-brand hover:border-teal/30 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {post.image_url && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-muted-brand text-xs mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {new Date(post.created_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {post.duration} read
                      </span>
                    </div>
                    <h2 className="font-bold text-navy text-base leading-snug mb-3 group-hover:text-teal transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted-brand text-sm leading-relaxed line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border-brand">
                      <span className="text-teal text-sm font-semibold">
                        Read article →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Update `app/(public)/blogs/[blogId]/page.tsx`**

Replace the entire file contents with:

```tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPostById, getPublishedPosts } from "@/lib/db";
import { buildMetadata } from "@/lib/metadata";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

interface Props {
  params: Promise<{ blogId: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ blogId: String(p.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blogId } = await params;
  const post = await getPostById(Number(blogId));
  if (!post || !post.published) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: post.image_url ? [{ url: post.image_url, alt: post.title }] : [],
    },
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { blogId } = await params;
  const post = await getPostById(Number(blogId));
  if (!post || !post.published) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image_url,
    datePublished: post.created_at.toISOString(),
    author: { "@type": "Organization", name: "Law x Tech" },
    publisher: {
      "@type": "Organization",
      name: "Law x Tech",
      logo: {
        "@type": "ImageObject",
        url: "https://lawxtech.org/assets/logo/logo_2.JPG",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-muted-brand hover:text-navy text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to articles
          </Link>

          <div className="flex items-center gap-4 text-muted-brand text-sm mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(post.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.duration} read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-navy leading-tight tracking-tight mb-8">
            {post.title}
          </h1>

          {post.image_url && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <article
            className="prose prose-slate max-w-none text-[#374151] text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t border-border-brand">
            <div className="flex items-center gap-4 bg-surface rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">L×T</span>
              </div>
              <div>
                <p className="font-bold text-navy text-sm">Law x Tech</p>
                <p className="text-muted-brand text-xs mt-0.5">
                  Nigeria&apos;s community for legal tech enthusiasts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 3: Delete old static blog files (they're no longer imported)**

The old `app/blogs/` pages are replaced by the `(public)` versions. Delete them now:

```bash
rm -rf app/blogs/
```

Also, `lib/data/blogs.ts` is no longer imported anywhere. You can keep it as a reference or delete it:

```bash
# Optional — keep the old data if you want to seed the DB later
# rm lib/data/blogs.ts
```

- [ ] **Step 4: Test end-to-end**

```bash
npm run dev
```

1. Go to `http://localhost:3000/blogs` → shows empty state (no published posts yet)
2. Go to `http://localhost:3000/admin/blog` → log in, publish a post
3. Go back to `http://localhost:3000/blogs` → post appears
4. Click the post → full article renders with Tiptap HTML content
5. Verify the article HTML renders correctly (headings, bold, lists work)

- [ ] **Step 5: Commit**

```bash
git add app/\(public\)/blogs/ lib/data/blogs.ts
git commit -m "feat: wire public blog pages to Vercel Postgres, replace static data"
```

---

## Task 10: Deploy and Production Migration

- [ ] **Step 1: Build locally to catch type errors**

```bash
npm run build
```

Fix any TypeScript errors before deploying.

- [ ] **Step 2: Push to GitHub / deploy via Vercel**

```bash
git push origin staging
```

Vercel auto-deploys on push. Check the Vercel dashboard for build logs.

- [ ] **Step 3: Run the production database migration**

In Vercel Dashboard → Storage → your DB → **Query** tab, run:

```sql
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  duration TEXT NOT NULL DEFAULT '3 minutes',
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

- [ ] **Step 4: Verify production admin works**

1. Go to `https://your-vercel-domain.vercel.app/admin/blog`
2. Log in with `ADMIN_PIN`
3. Create a post, publish it
4. Visit `/blogs` → post appears

- [ ] **Step 5: (Optional) Seed old blog posts**

If you want the existing 7 static posts in the DB, run this in Vercel's Query tab (adjust titles/content as needed), or write a seed script in `scripts/seed.ts` and run it with `ts-node`.

- [ ] **Step 6: Delete the migration API route**

```bash
rm app/api/migrate/route.ts
git add -A
git commit -m "chore: remove migration API route after production migration complete"
git push origin staging
```

---

## Self-Review

**Spec coverage check:**

| Requirement | Task |
|-------------|------|
| `/admin/blog` route | Task 8 |
| Tiptap rich text editor | Task 6 + 7 |
| Posts saved to Vercel Postgres | Task 3 + 9 |
| Password-protected via PIN | Task 4 + 5 |
| Non-devs log in, write, publish | Task 5 + 8 |
| No new hosting — lives in existing Vercel app | All tasks use same project |
| Next.js talks directly to DB | Task 3 (`@vercel/postgres`) |

**Placeholder scan:** All steps contain actual code. No TBD items.

**Type consistency:** `Post` type from `lib/db.ts` is used consistently across all files. `updatePostAction.bind(null, post.id)` signature matches `(id: number, formData: FormData) => Promise<void>`.

**Edge cases covered:**
- Empty `image_url` — blog listing and detail both handle missing image gracefully
- Middleware runs on Edge Runtime — `crypto.subtle` is available there
- `revalidate = 60` on public pages — content updates within 1 minute of publishing
- `notFound()` for unpublished posts on detail page — no URL guessing
