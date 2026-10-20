"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useLang } from "@/i18n/LanguageProvider";

export default function MpmeHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, setLang } = useLang();
  const en = lang === "en";
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
    { href: "/mpme", label: en ? "The program" : "Le Programme" },
    { href: "/mpme/diagnostic", label: en ? "Diagnostic" : "Diagnostic" },
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

        {/* Action Button & Lang toggle */}
        <div className="flex items-center gap-3">
          <div className="lang">
            <button className={lang === "fr" ? "on" : ""} onClick={() => setLang("fr")}>FR</button>
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
          </div>
          <Link
            href="/mpme/diagnostic"
            className="text-xs font-bold text-white bg-[#EC663B] hover:bg-[#d4562e] transition-all px-5 py-2 rounded-full shadow-sm"
          >
            {en ? "Take the diagnostic" : "Faire le Diagnostic"}
          </Link>
        </div>
      </div>
    </header>
  );
}
