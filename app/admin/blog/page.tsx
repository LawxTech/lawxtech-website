import type { Metadata } from "next";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { getAllPosts } from "@/lib/db";
import { publishPostAction, deletePostAction } from "./actions";

export const metadata: Metadata = { title: "Blog Posts" };

export default async function AdminBlogPage() {
  const [session, posts] = await Promise.all([auth(), getAllPosts()]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-sm text-gray-500 mt-1">
            {session?.user?.email} ·{" "}
            <Link
              href="/admin/users"
              className="hover:text-gray-700 underline"
            >
              Users
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Sign out
            </button>
          </form>
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
          <Link
            href="/admin/blog/new"
            className="mt-3 inline-block text-navy text-sm font-semibold underline"
          >
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

              <div className="flex items-center gap-3 shrink-0">
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
