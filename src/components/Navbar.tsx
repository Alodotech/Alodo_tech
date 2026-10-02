"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: { fr: "Accueil", en: "Home" }, key: "home" },
  { href: "/mpme", label: { fr: "Programme MPME", en: "MSME Program" }, key: "mpme" },
  { href: "/about", label: { fr: "À propos", en: "About" }, key: "about" },
  { href: "/products", label: { fr: "Nos produits", en: "Our products" }, key: "products" },
  { href: "/blog", label: { fr: "Blog", en: "Blog" }, key: "blog" },
  { href: "/careers", label: { fr: "Carrières", en: "Careers" }, key: "careers" },
  // { href: "/partners", label: { fr: "Investir", en: "Invest" }, key: "partners" },
  // { href: "/solutions", label: { fr: "Solutions", en: "Solutions" }, key: "solutions" },
  // { href: "/technology", label: { fr: "Technologie", en: "Technology" }, key: "technology" },
  // { href: "/impact", label: { fr: "Impact", en: "Impact" }, key: "impact" },
];

export default function Navbar({ activeKey }: { activeKey?: string }) {
  const [lang, setLang] = useState("fr");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("alodo_mpme_user");
      if (user) {
        try { setCurrentUser(JSON.parse(user)); } catch {}
      }
    }
  }, [pathname]);

  return (
    <nav className={`nav ${isMobileOpen ? "nav-mobile-open" : ""}`} id="siteNav">
      <div className="nav-inner">
        <Link className="brand" href="/">
          <img src="/logo/logo.png" alt="Alodo Tech Logo" style={{ height: "28px", width: "auto" }} />
          <span>
            <span style={{ color: "var(--primary)" }}>ALODO</span>{" "}
            <span style={{ color: "var(--black)" }}>TECH</span>
          </span>
        </Link>
        <div className="nav-links">
          {NAV_LINKS.map((l) => {
            const isActive =
              l.key === activeKey ||
              (l.href === "/mpme" && pathname?.startsWith("/mpme"));
            return (
              <Link
                key={l.href}
                href={l.href as string}
                className={isActive ? "active" : ""}
              >
                {l.label[lang as keyof typeof l.label]}
              </Link>
            );
          })}
          
          <div className="mobile-only" style={{ marginTop: "auto", paddingTop: "32px" }}>
            <Link href="/contact" className="btn primary" style={{ width: "100%", justifyContent: "center" }}>
              Nous contacter
            </Link>
          </div>
        </div>

        <div className="nav-right">
          <Link href="/contact" className="btn primary sm desktop-only">
            Nous contacter
          </Link>
          
          <button
            className="nav-burger"
            aria-label="Menu"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d={isMobileOpen ? "M18 6L6 18M6 6l12 12" : "M3 6h16M3 11h16M3 16h16"} />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
