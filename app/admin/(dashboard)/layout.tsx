import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  async function signOutAction(): Promise<void> {
    "use server";
    await signOut({ redirectTo: "/admin/login" });
  }

  return (
    <AdminShell
      user={{
        email: session.user?.email ?? "",
        role: (session.user as { role?: string })?.role ?? "editor",
      }}
      signOutAction={signOutAction}
    >
      {children}
    </AdminShell>
  );
}
