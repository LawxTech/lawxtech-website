"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import TiptapEditor from "./TiptapEditor";
import type { Post } from "@/lib/db";

interface PostFormProps {
  post?: Post;
  action: (formData: FormData) => Promise<void>;
}

export default function PostForm({ post, action }: PostFormProps) {
  const [content, setContent] = useState(post?.content ?? "");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("content", content);
    startTransition(async () => {
      await action(formData);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="space-y-6"
    >
      <div>
        <label htmlFor="title" className={labelClass}>
          Title *
        </label>
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
        <label htmlFor="excerpt" className={labelClass}>
          Excerpt *
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={3}
          defaultValue={post?.excerpt}
          className={inputClass}
          placeholder="Short summary shown on the blog listing page"
        />
      </div>

      <div>
        <label htmlFor="image" className={labelClass}>
          Cover Image
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className={inputClass}
        />
        {post?.image_url && (
          <p className="text-xs text-gray-400 mt-1">
            Current image:{" "}
            <a
              href={post.image_url}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              view
            </a>{" "}
            — upload a new file to replace it
          </p>
        )}
      </div>

      <div>
        <label htmlFor="read_time" className={labelClass}>
          Read Time
        </label>
        <input
          id="read_time"
          name="read_time"
          type="text"
          defaultValue={post?.read_time ?? "3 minutes"}
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
          disabled={isPending}
          className="rounded-lg bg-navy text-white text-sm font-semibold px-6 py-2.5 hover:bg-navy/90 transition-colors disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Draft"}
        </button>
      </div>
    </form>
  );
}
