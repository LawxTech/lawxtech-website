import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { getAllUsers } from "@/lib/db";
import { createUserAction, setUserRoleAction, deleteUserAction } from "./actions";

export const metadata: Metadata = { title: "Users" };

export default async function UsersPage() {
  const [session, users] = await Promise.all([auth(), getAllUsers()]);
  const currentUserId = session?.user?.id ?? "";

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy";

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <Link href="/admin/blog" className="text-sm text-gray-500 hover:text-gray-700">
          ← Posts
        </Link>
      </div>

      {/* User list */}
      <div className="space-y-3 mb-12">
        {users.map((u) => (
          <div
            key={u.id}
            className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4"
          >
            <div className="min-w-0 mr-4">
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-900 text-sm truncate">{u.name}</p>
                <span
                  className={`shrink-0 inline-flex text-xs font-semibold px-2 py-0.5 rounded-full ${
                    u.role === "admin"
                      ? "bg-navy/10 text-navy"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {u.role}
                </span>
                {u.id === currentUserId && (
                  <span className="shrink-0 text-xs text-gray-400">(you)</span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{u.email}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {u.id === currentUserId ? (
                <span className="text-xs text-gray-300 italic">
                  no actions on own account
                </span>
              ) : (
                <>
                  {/* Promote / Demote */}
                  <form
                    action={async () => {
                      "use server";
                      await setUserRoleAction(
                        u.id,
                        u.role === "admin" ? "editor" : "admin"
                      );
                    }}
                  >
                    <button
                      type="submit"
                      className="text-xs font-medium text-navy hover:underline"
                    >
                      {u.role === "admin" ? "Demote to editor" : "Promote to admin"}
                    </button>
                  </form>

                  {/* Remove */}
                  <form
                    action={async () => {
                      "use server";
                      await deleteUserAction(u.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="text-xs font-medium text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add user form */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Add User</h2>
        <form
          action={createUserAction}
          className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Name
              </label>
              <input name="name" type="text" required placeholder="Full name" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Email
              </label>
              <input name="email" type="email" required placeholder="email@example.com" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Password (min 8 chars)
              </label>
              <input
                name="password"
                type="password"
                required
                minLength={8}
                placeholder="Password"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Role
              </label>
              <select name="role" defaultValue="editor" className={inputClass}>
                <option value="editor">Editor — can write &amp; publish posts</option>
                <option value="admin">Admin — full access incl. user management</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="rounded-lg bg-navy text-white text-sm font-semibold px-6 py-2.5 hover:bg-navy/90 transition-colors"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}
