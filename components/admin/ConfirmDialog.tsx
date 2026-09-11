"use client";

import { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => Promise<void> | void;
  /**
   * Controlled open state. When provided (together with `onOpenChange`) the
   * dialog is opened imperatively and no internal trigger is rendered.
   *
   * Base UI unmounts a menu's contents when an item is activated, so a dialog
   * nested inside a menu never mounts. Per Base UI guidance, open it from the
   * menu item's `onClick` and render the dialog as a sibling of the menu.
   */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactElement;
}

export default function ConfirmDialog({
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  open,
  onOpenChange,
  children,
}: ConfirmDialogProps) {
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      await onConfirm();
      onOpenChange?.(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children ? <DialogTrigger render={children} /> : null}
      <DialogContent showCloseButton={false} className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" disabled={isPending} />}>
            {cancelLabel}
          </DialogClose>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleConfirm}
          >
            {isPending ? "Working..." : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
