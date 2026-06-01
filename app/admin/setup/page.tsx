import { redirect } from "next/navigation";
import { userExists } from "@/lib/db";
import { setupAction } from "./actions";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Setup",
  robots: { index: false, follow: false },
};

export default async function SetupPage() {
  if (await userExists()) redirect("/admin/login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-navy mb-4">
            <span className="text-white font-bold text-sm">L×T</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Create Admin Account
          </h1>
          <p className="mt-1 text-sm text-gray-500">First-time setup</p>
        </div>

        <form
          action={setupAction}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-4"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoFocus
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Password (min 8 chars)
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-navy text-white text-sm font-semibold py-2.5 hover:bg-navy/90 transition-colors"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
