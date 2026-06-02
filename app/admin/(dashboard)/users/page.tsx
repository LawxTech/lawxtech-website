import type { Metadata } from "next";
import { auth } from "@/auth";
import { getAllUsers } from "@/lib/db";
import {
  createUserAction,
  setUserRoleAction,
  deleteUserAction,
} from "./actions";
import UserRow from "@/components/admin/UserRow";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users } from "lucide-react";

export const metadata: Metadata = { title: "Users" };

export default async function UsersPage() {
  const [session, users] = await Promise.all([auth(), getAllUsers()]);
  const currentUserId = session?.user?.id ?? "";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">Users</h1>
        <p className="text-xs text-muted-foreground mt-1">
          {users.length} {users.length === 1 ? "member" : "members"}
        </p>
      </div>

      {/* User list */}
      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl ring-1 ring-foreground/8 text-center mb-8">
          <div className="flex items-center justify-center size-12 rounded-xl bg-muted mb-4">
            <Users className="size-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">No users yet</p>
        </div>
      ) : (
        <div className="space-y-2 mb-10">
          {users.map((u) => {
            const setRoleAction = setUserRoleAction.bind(
              null,
              u.id,
              u.role === "admin" ? "editor" : "admin"
            ) as () => Promise<void>;
            const deleteAction = deleteUserAction.bind(null, u.id) as unknown as () => Promise<void>;
            return (
              <UserRow
                key={u.id}
                user={u}
                isCurrentUser={u.id === currentUserId}
                setRoleAction={setRoleAction}
                deleteAction={deleteAction}
              />
            );
          })}
        </div>
      )}

      {/* Add user form */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-4">Add User</h2>
        <form
          action={createUserAction}
          className="bg-white rounded-xl ring-1 ring-foreground/8 p-5 sm:p-6 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Name
              </label>
              <Input
                name="name"
                type="text"
                required
                placeholder="Full name"
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Email
              </label>
              <Input
                name="email"
                type="email"
                required
                placeholder="email@example.com"
                className="h-9"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Password (min 8 chars)
              </label>
              <Input
                name="password"
                type="password"
                required
                minLength={8}
                placeholder="Password"
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Role
              </label>
              <Select name="role" defaultValue="editor">
                <SelectTrigger className="w-full h-9">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" size="sm">
            Add User
          </Button>
        </form>
      </div>
    </div>
  );
}
