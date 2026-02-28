"use client";

import { createClient } from "@/lib/supabase/client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "./components/AdminSidebar";

const PUBLIC_PATHS = ["/admin/login"];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(!!s?.user);
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(!!s?.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;
    const isPublic = PUBLIC_PATHS.some((p) => pathname?.startsWith(p));
    if (!session && !isPublic) {
      router.replace("/admin/login");
    } else if (session && pathname === "/admin/login") {
      router.replace("/admin/dashboard");
    }
  }, [loading, session, pathname, router]);

  const isLoginPage = pathname === "/admin/login";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-pulse text-slate-400">Cargando...</div>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-slate-700 bg-slate-800/90 sticky top-0 z-10 flex items-center justify-end px-4 gap-4">
          <span className="text-slate-400 text-sm mr-auto hidden sm:inline">
            Panel de administración
          </span>
          <LogoutButton />
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}


function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    const { createClient } = await import("@/lib/supabase/client");
    await createClient().auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };
  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-sm text-slate-400 hover:text-red-400 transition-colors"
    >
      Cerrar sesión
    </button>
  );
}
