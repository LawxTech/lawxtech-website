"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, ShieldCheck, ShieldMinus, Trash2 } from "lucide-react";
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
import EditUserDialog from "./EditUserDialog";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserRowProps {
  user: User;
  isCurrentUser: boolean;
  updateAction: (formData: FormData) => Promise<{ error?: string } | void>;
  setRoleAction: () => Promise<void>;
  deleteAction: () => Promise<void>;
}

export default function UserRow({
  user,
  isCurrentUser,
  updateAction,
  setRoleAction,
  deleteAction,
}: UserRowProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const initial = user.name?.[0]?.toUpperCase() ?? "U";
  const isAdmin = user.role === "admin";

  return (
    <div className="flex items-center justify-between bg-white rounded-xl ring-1 ring-foreground/8 px-4 py-3.5 transition-shadow duration-150 hover:shadow-sm">
      <div className="flex items-center gap-3 min-w-0 flex-1 mr-4">
        <div className="flex items-center justify-center size-8 rounded-full bg-navy/8 text-navy text-xs font-bold shrink-0">
          {initial}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm text-foreground">{user.name}</span>
            <Badge
              className={
                isAdmin
                  ? "border border-navy/20 bg-navy/8 text-navy text-[10px]"
                  : "border border-border bg-muted text-muted-foreground text-[10px]"
              }
            >
              {user.role}
            </Badge>
            {isCurrentUser && (
              <span className="text-[10px] text-muted-foreground/60 italic">you</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{user.email}</p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label="User actions" />
          }
        >
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Pencil className="size-3.5" /> Edit
          </DropdownMenuItem>
          {!isCurrentUser && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setRoleOpen(true)}>
                {isAdmin ? (
                  <><ShieldMinus className="size-3.5" /> Demote</>
                ) : (
                  <><ShieldCheck className="size-3.5" /> Promote</>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2 className="size-3.5" /> Remove
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialogs are rendered as siblings of the menu and opened
          imperatively — Base UI unmounts menu contents on item click,
          so a dialog nested inside the menu never mounts. */}
      <EditUserDialog
        user={user}
        updateAction={updateAction}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      {!isCurrentUser && (
        <>
          <ConfirmDialog
            open={roleOpen}
            onOpenChange={setRoleOpen}
            title={isAdmin ? "Demote to editor?" : "Promote to admin?"}
            description={
              isAdmin
                ? `${user.name} will lose admin access and user management privileges.`
                : `${user.name} will gain full admin access including user management.`
            }
            confirmLabel={isAdmin ? "Demote" : "Promote"}
            onConfirm={setRoleAction}
          />
          <ConfirmDialog
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            title="Remove user?"
            description={`${user.name} will lose all access. This cannot be undone.`}
            confirmLabel="Remove"
            onConfirm={deleteAction}
          />
        </>
      )}
    </div>
  );
}
