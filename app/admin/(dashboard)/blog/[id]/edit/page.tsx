import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import { getPostById } from "@/lib/db";
import { updatePostAction, publishPostAction } from "../../actions";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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

  async function togglePublish() {
    "use server";
    await publishPostAction(post!.id, !post!.published);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-start justify-between mb-7">
        <div>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-5"
          >
            <ArrowLeft className="size-3.5" />
            Back to posts
          </Link>
          <h1 className="text-xl font-semibold text-foreground">Edit Post</h1>
        </div>
        <form action={togglePublish} className="mt-1">
          <Button
            type="submit"
            size="sm"
            variant={post.published ? "outline" : "default"}
            className={
              post.published
                ? ""
                : "bg-green-600 hover:bg-green-700 text-white border-transparent"
            }
          >
            {post.published ? "Unpublish" : "Publish"}
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-xl ring-1 ring-foreground/8 p-6 sm:p-8">
        <PostForm post={post} action={updateAction} />
      </div>
    </div>
  );
}
