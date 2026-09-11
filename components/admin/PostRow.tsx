"use client";

import { useTransition } from "react";
import Link from "next/link";
import { MoreHorizontal, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmDialog from "./ConfirmDialog";
import type { Post } from "@/lib/db";

interface PostRowProps {
  post: Post;
  publishAction: () => Promise<void>;
  deleteAction: () => Promise<void>;
}

export default function PostRow({ post, publishAction, deleteAction }: PostRowProps) {
  const [isPending, startTransition] = useTransition();

  function handlePublish() {
    startTransition(() => publishAction());
  }

  return (
    <div className="flex items-center justify-between bg-white rounded-xl ring-1 ring-foreground/8 px-4 py-3.5 transition-shadow duration-150 hover:shadow-sm">
      <div className="flex-1 min-w-0 mr-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            className={
              post.published
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-muted text-muted-foreground border border-border"
            }
          >
            {post.published ? "Published" : "Draft"}
          </Badge>
          <h2 className="font-medium text-sm text-foreground truncate max-w-65 sm:max-w-md">
            {post.title}
          </h2>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date(post.created_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label="Post actions" />
          }
        >
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={handlePublish} disabled={isPending}>
            {post.published ? (
              <><EyeOff className="size-3.5" /> Unpublish</>
            ) : (
              <><Eye className="size-3.5" /> Publish</>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={`/admin/blog/${post.id}/edit`} />}>
            <Pencil className="size-3.5" /> Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <ConfirmDialog
            title="Delete post?"
            description={`"${post.title}" will be permanently deleted and cannot be recovered.`}
            confirmLabel="Delete"
            onConfirm={deleteAction}
          >
            <DropdownMenuItem variant="destructive">
              <Trash2 className="size-3.5" /> Delete
            </DropdownMenuItem>
          </ConfirmDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
