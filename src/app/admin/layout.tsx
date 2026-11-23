"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import {
  Menu,
  X,
  LayoutDashboard,
  FolderKanban,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import { auth } from "@/lib/firebase";
import { authService } from "@/service/authService";

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  isActive: (pathname: string) => boolean;
}

const ADMIN_NAV: NavItem[] = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    isActive: (pathname) => pathname === "/admin",
  },
  {
    label: "Project",
    href: "/admin/projects",
    icon: FolderKanban,
    isActive: (pathname) => pathname.startsWith("/admin/projects"),
  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);

    try {
      const res = await authService.logout();
      toast.success(res.message || "Signed out.");
      router.replace("/auth/login");
      router.refresh();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to sign out."
      );
      setSigningOut(false);
    }
  }

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between p-3.5">
      <div className="space-y-6">
        <div>
          <div className="px-2.5 pb-2">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-paper-dim/70">
              Menu
            </span>
          </div>

          <nav aria-label="Admin navigation" className="space-y-0.5">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const active = item.isActive(pathname);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors ${
                    active
                      ? "bg-white/[0.08] font-medium text-paper"
                      : "text-paper-dim hover:bg-white/[0.04] hover:text-paper"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      active ? "text-signal" : "text-paper-dim/75"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-white/[0.08] pt-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between rounded-md px-2.5 py-2 text-[13px] text-paper-dim transition-colors hover:bg-white/[0.04] hover:text-paper"
          >
            <span>View Portfolio</span>
            <ExternalLink className="h-3.5 w-3.5 text-paper-dim/70" />
          </Link>
        </div>
      </div>

      <div className="border-t border-white/[0.08] pt-3">
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] text-paper-dim transition-colors hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>{signingOut ? "Signing out..." : "Sign Out"}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-ink text-paper">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/[0.08] bg-ink/90 px-4 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="admin-mobile-sidebar"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-xs text-paper transition-colors hover:border-white/20 hover:bg-white/[0.06] lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-3.5 w-3.5 text-paper-dim" />
            ) : (
              <Menu className="h-3.5 w-3.5 text-paper-dim" />
            )}
            <span>Menu</span>
          </button>

          <span className="font-mono text-xs tracking-wide text-paper">
            Admin Console
          </span>
        </div>

        <span className="truncate font-mono text-xs text-paper-dim">
          {user?.email ?? "Admin Session"}
        </span>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside
            id="admin-mobile-sidebar"
            aria-label="Admin navigation"
            className="relative z-10 h-full w-60 max-w-[80vw] border-r border-white/[0.08] bg-ink-raised"
          >
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop Split Shell (Sidebar always open on desktop) */}
      <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-[1440px]">
        <aside
          aria-label="Admin navigation"
          className="hidden w-60 shrink-0 border-r border-white/[0.08] bg-ink-raised/50 lg:block"
        >
          <div className="sticky top-14 h-[calc(100vh-3.5rem)]">
            {sidebarContent}
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}