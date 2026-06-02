import type { Metadata } from "next";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm animate-in fade-in duration-300">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-navy mb-4">
            <span className="text-white font-bold text-xs tracking-tight">L×T</span>
          </div>
          <h1 className="text-xl font-semibold text-foreground">Admin Access</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to manage LawxTech
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg bg-destructive/8 border border-destructive/20 px-4 py-3 text-sm text-destructive">
            Invalid email or password. Please try again.
          </div>
        )}

        {/* Form */}
        <form
          action={async (formData) => {
            "use server";
            try {
              await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirectTo: "/admin/blog",
              });
            } catch (e) {
              if (e instanceof AuthError) {
                redirect("/admin/login?error=1");
              }
              throw e;
            }
          }}
          className="bg-white rounded-xl ring-1 ring-foreground/10 p-7 space-y-4"
        >
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium text-muted-foreground"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoFocus
              placeholder="you@example.com"
              className="h-9 focus-visible:ring-teal/50 focus-visible:border-teal"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-xs font-medium text-muted-foreground"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="h-9 focus-visible:ring-teal/50 focus-visible:border-teal"
            />
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
