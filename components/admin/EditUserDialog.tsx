"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditUserDialogProps {
  user: { id: string; name: string; email: string };
  /** Bound server action: (formData) => Promise<{ error?: string } | void> */
  updateAction: (formData: FormData) => Promise<{ error?: string } | void>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditUserDialog({
  user,
  updateAction,
  open,
  onOpenChange,
}: EditUserDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await updateAction(formData);
      if (result?.error) {
        setError(result.error);
        return;
      }
      onOpenChange(false);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) setError(null);
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-w-sm">
        <form action={handleSubmit} className="contents">
          <DialogHeader>
            <DialogTitle>Edit user</DialogTitle>
            <DialogDescription>
              Update the name and password for {user.email}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor={`edit-name-${user.id}`}
                className="text-xs font-medium text-muted-foreground"
              >
                Name
              </label>
              <Input
                id={`edit-name-${user.id}`}
                name="name"
                type="text"
                required
                defaultValue={user.name}
                placeholder="Full name"
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor={`edit-password-${user.id}`}
                className="text-xs font-medium text-muted-foreground"
              >
                New password
              </label>
              <Input
                id={`edit-password-${user.id}`}
                name="password"
                type="password"
                minLength={8}
                placeholder="Leave blank to keep current"
                className="h-9"
                autoComplete="new-password"
              />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" disabled={isPending} />}>
              Cancel
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
