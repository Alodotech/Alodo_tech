"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function MpmeHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string; name?: string; provider?: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser({
          email: user.email,
          name: user.user_metadata?.full_name || user.email?.split("@")[0],
          provider: "google",
        });
      } else {
        setUser(null);
      }
    };
    fetchUser();
  }, [pathname]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/mpme");
  };

  const links = [
    { href: "/mpme", label: "Le Programme" },
    { href: "/mpme/candidature", label: "Candidater" },
    { href: "/mpme/dashboard", label: "Espace MPME" },
    { href: "/admin/candidatures", label: "Console Admin" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-black/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img src="/logo/logo.png" alt="Alodo Tech Logo" style={{ height: "26px", width: "auto" }} />
            <span className="font-tech font-bold text-base tracking-wider text-[#0A0A0A]">
              <span className="text-[#EC663B]">ALODO</span> TECH
            </span>
          </Link>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/mpme" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 ${
                  isActive
                    ? "text-[#EC663B] font-semibold border-b-2 border-[#EC663B]"
                    : "text-[#6E6E73] hover:text-[#0A0A0A]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons & Auth */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2.5">
              <Link
                href="/mpme/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAFAFA] border border-[#EBEBEB] hover:border-[#D1D1D6] transition-all text-xs font-semibold text-[#0A0A0A]"
              >
                {user.provider === "google" ? (
                  <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                    <svg width="12" height="12" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full bg-[#EC663B]/15 text-[#EC663B] flex items-center justify-center text-[10px] font-bold">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                )}
                <span className="max-w-[120px] truncate hidden sm:inline">{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                title="Se déconnecter"
                className="text-xs text-[#8E8E93] hover:text-rose-600 transition-colors px-2 py-1 font-medium cursor-pointer"
              >
                Se déconnecter
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/mpme/login"
                className="text-xs font-semibold text-[#0A0A0A] hover:text-[#EC663B] transition-colors px-3 py-1.5"
              >
                Connexion
              </Link>
              <Link
                href="/mpme/candidature"
                className="text-xs font-bold text-white bg-[#EC663B] hover:bg-[#d4562e] transition-all px-4 py-1.5 rounded-full shadow-sm"
              >
                Candidater
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
