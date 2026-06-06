"use client";

import { MoreHorizontal, ShieldCheck, ShieldMinus, Trash2 } from "lucide-react";
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

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserRowProps {
  user: User;
  isCurrentUser: boolean;
  setRoleAction: () => Promise<void>;
  deleteAction: () => Promise<void>;
}

export default function UserRow({
  user,
  isCurrentUser,
  setRoleAction,
  deleteAction,
}: UserRowProps) {
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

      {isCurrentUser ? (
        <span className="text-xs text-muted-foreground/50 italic shrink-0">logged in</span>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon-sm" aria-label="User actions" />
            }
          >
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <ConfirmDialog
              title={isAdmin ? "Demote to editor?" : "Promote to admin?"}
              description={
                isAdmin
                  ? `${user.name} will lose admin access and user management privileges.`
                  : `${user.name} will gain full admin access including user management.`
              }
              confirmLabel={isAdmin ? "Demote" : "Promote"}
              onConfirm={setRoleAction}
            >
              <DropdownMenuItem>
                {isAdmin ? (
                  <><ShieldMinus className="size-3.5" /> Demote</>
                ) : (
                  <><ShieldCheck className="size-3.5" /> Promote</>
                )}
              </DropdownMenuItem>
            </ConfirmDialog>
            <DropdownMenuSeparator />
            <ConfirmDialog
              title="Remove user?"
              description={`${user.name} will lose all access. This cannot be undone.`}
              confirmLabel="Remove"
              onConfirm={deleteAction}
            >
              <DropdownMenuItem variant="destructive">
                <Trash2 className="size-3.5" /> Remove
              </DropdownMenuItem>
            </ConfirmDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
