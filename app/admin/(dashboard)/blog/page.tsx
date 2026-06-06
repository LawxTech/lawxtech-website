import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { getAllPosts } from "@/lib/db";
import { publishPostAction, deletePostAction } from "./actions";
import PostRow from "@/components/admin/PostRow";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

export const metadata: Metadata = { title: "Blog Posts" };

export default async function AdminBlogPage() {
  const [session, posts] = await Promise.all([auth(), getAllPosts()]);
  const published = posts.filter((p) => p.published).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Blog Posts</h1>
          {posts.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {published} published · {posts.length - published} drafts
            </p>
          )}
        </div>
        <Button size="sm" render={<Link href="/admin/blog/new" />}>
          <Plus className="size-3.5" />
          New Post
        </Button>
      </div>

      {/* Empty state */}
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl ring-1 ring-foreground/8 text-center">
          <div className="flex items-center justify-center size-12 rounded-xl bg-muted mb-4">
            <FileText className="size-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">No posts yet</p>
          <p className="text-xs text-muted-foreground mb-5">
            Write your first article to get started
          </p>
          <Button size="sm" render={<Link href="/admin/blog/new" />}>
            <Plus className="size-3.5" />
            Write a post
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => {
            const publishAction = publishPostAction.bind(null, post.id, !post.published) as () => Promise<void>;
            const deleteAction = deletePostAction.bind(null, post.id) as () => Promise<void>;
            return (
              <PostRow
                key={post.id}
                post={post}
                publishAction={publishAction}
                deleteAction={deleteAction}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
