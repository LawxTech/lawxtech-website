import type { Metadata } from "next";
import Link from "next/link";
import { getAllUsers } from "@/lib/db";
import { createUserAction } from "./actions";

export const metadata: Metadata = { title: "Users" };

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <Link
          href="/admin/blog"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Posts
        </Link>
      </div>

      <div className="space-y-2 mb-10">
        {users.map((u) => (
          <div
            key={u.id}
            className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4"
          >
            <div>
              <p className="font-medium text-gray-900 text-sm">{u.name}</p>
              <p className="text-xs text-gray-400">{u.email}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold text-gray-900 mb-4">Add User</h2>
      <form
        action={createUserAction}
        className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4"
      >
        <input
          name="name"
          type="text"
          required
          placeholder="Name"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
        />
        <input
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="Password (min 8 chars)"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
        />
        <button
          type="submit"
          className="rounded-lg bg-navy text-white text-sm font-semibold px-6 py-2.5 hover:bg-navy/90 transition-colors"
        >
          Add User
        </button>
      </form>
    </div>
  );
}
