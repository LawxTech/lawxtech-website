import type { Metadata } from "next";
import Link from "next/link";
import PostForm from "@/components/admin/PostForm";
import { createPostAction } from "../actions";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "New Post" };

export default function NewPostPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-7">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-5"
        >
          <ArrowLeft className="size-3.5" />
          Back to posts
        </Link>
        <h1 className="text-xl font-semibold text-foreground">New Post</h1>
      </div>
      <div className="bg-white rounded-xl ring-1 ring-foreground/8 p-6 sm:p-8">
        <PostForm action={createPostAction} />
      </div>
    </div>
  );
}
