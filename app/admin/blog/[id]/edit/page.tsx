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
          <Link
            href="/admin/blog"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
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
