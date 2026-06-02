"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Users, Menu, LogOut, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminShellProps {
  user: { email: string; role: string };
  signOutAction: () => Promise<void>;
  children: React.ReactNode;
}

const navItems = [
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/users", label: "Users", icon: Users, adminOnly: true },
];

function getPageTitle(pathname: string): string {
  if (pathname === "/admin/users") return "Users";
  if (pathname === "/admin/blog/new") return "New Post";
  if (pathname.includes("/edit")) return "Edit Post";
  if (pathname.startsWith("/admin/blog")) return "Blog Posts";
  return "Admin";
}

function SidebarNav({
  user,
  pathname,
  signOutAction,
  onNavigate,
}: {
  user: { email: string; role: string };
  pathname: string;
  signOutAction: () => Promise<void>;
  onNavigate?: () => void;
}) {
  const initial = user.email?.[0]?.toUpperCase() ?? "A";

  return (
    <div className="flex flex-col h-full bg-navy">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-white/10 shrink-0">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal shrink-0">
          <span className="text-white font-bold text-xs tracking-tight">L×T</span>
        </div>
        <span className="text-white/80 text-sm font-semibold tracking-wide">Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems
          .filter((item) => !item.adminOnly || user.role === "admin")
          .map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 border-l-2",
                  isActive
                    ? "bg-teal/20 text-white border-teal pl-2.5"
                    : "text-white/55 hover:text-white hover:bg-white/8 border-transparent pl-2.5"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </Link>
            );
          })}
      </nav>

      {/* User menu */}
      <div className="px-3 py-4 border-t border-white/10 shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg hover:bg-white/8 transition-colors duration-150 outline-none" />
            }
          >
            <div className="flex items-center justify-center size-7 rounded-full bg-teal/30 text-teal text-xs font-bold shrink-0">
              {initial}
            </div>
            <span className="flex-1 text-left text-xs text-white/60 truncate min-w-0">
              {user.email}
            </span>
            <ChevronDown className="size-3.5 text-white/40 shrink-0" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-48">
            <form action={signOutAction}>
              <DropdownMenuItem
                render={<button type="submit" className="w-full" />}
              >
                <LogOut className="size-3.5" />
                Sign out
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default function AdminShell({ user, signOutAction, children }: AdminShellProps) {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  const pageTitle = getPageTitle(pathname);

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-60 z-30">
        <SidebarNav
          user={user}
          pathname={pathname}
          signOutAction={signOutAction}
        />
      </aside>

      {/* Mobile sidebar via Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="left" className="p-0 w-60 bg-navy border-none" showCloseButton={false}>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarNav
            user={user}
            pathname={pathname}
            signOutAction={signOutAction}
            onNavigate={() => setSheetOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-60">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center gap-3 px-4 h-14 bg-white border-b border-border sticky top-0 z-20">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setSheetOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
          <span className="text-sm font-semibold text-foreground">{pageTitle}</span>
        </header>

        {/* Page content */}
        <main className="flex-1 animate-in fade-in duration-200">
          {children}
        </main>
      </div>
    </div>
  );
}
