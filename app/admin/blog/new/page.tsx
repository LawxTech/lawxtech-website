import type { Metadata } from "next";
import Link from "next/link";
import PostForm from "@/components/admin/PostForm";
import { createPostAction } from "../actions";

export const metadata: Metadata = { title: "New Post" };

export default function NewPostPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <Link
          href="/admin/blog"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
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
