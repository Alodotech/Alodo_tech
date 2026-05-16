"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: { fr: "Accueil", en: "Home" }, key: "home" },
  { href: "/about", label: { fr: "À propos", en: "About" }, key: "about" },
  { href: "/products", label: { fr: "Nos produits", en: "Our products" }, key: "products" },
  { href: "/blog", label: { fr: "Blog", en: "Blog" }, key: "blog" },
  { href: "/careers", label: { fr: "Carrières", en: "Careers" }, key: "careers" },
  { href: "/partners", label: { fr: "Investir", en: "Invest" }, key: "partners" },
  // { href: "/solutions", label: { fr: "Solutions", en: "Solutions" }, key: "solutions" },
  // { href: "/technology", label: { fr: "Technologie", en: "Technology" }, key: "technology" },
  // { href: "/impact", label: { fr: "Impact", en: "Impact" }, key: "impact" },
];

export default function Navbar({ activeKey }: { activeKey: string }) {
  const [lang, setLang] = useState("fr");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const savedLang = localStorage.getItem("alodo-lang") || "fr";
    setLang(savedLang);
  }, []);

  const toggleLang = (newLang: string) => {
    localStorage.setItem("alodo-lang", newLang);
    setLang(newLang);
    window.location.reload(); // Refresh to apply changes if using server components or local translations
  };

  return (
    <nav className={`nav ${isMobileOpen ? "nav-mobile-open" : ""}`} id="siteNav">
      <div className="nav-inner">
        <Link className="brand" href="/">
          <span className="mark">AT</span>
          <span>ALODO TECH</span>
        </Link>
        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href as string}
              className={l.key === activeKey ? "active" : ""}
            >
              {l.label[lang as keyof typeof l.label]}
            </Link>
          ))}
          
          <div className="mobile-only" style={{ marginTop: "auto", paddingTop: "32px" }}>
            <div className="lang" style={{ marginBottom: "16px", display: "flex", width: "fit-content" }}>
              <button className={lang === "fr" ? "on" : ""} onClick={() => toggleLang("fr")}>FR</button>
              <button className={lang === "en" ? "on" : ""} onClick={() => toggleLang("en")}>EN</button>
            </div>
            <Link href="/contact" className="btn primary" style={{ width: "100%", justifyContent: "center" }}>
              {lang === "fr" ? "Nous contacter" : "Contact"}
            </Link>
          </div>
        </div>

        <div className="nav-right">
          <div className="lang">
            <button className={lang === "fr" ? "on" : ""} onClick={() => toggleLang("fr")}>FR</button>
            <button className={lang === "en" ? "on" : ""} onClick={() => toggleLang("en")}>EN</button>
          </div>
          <Link href="/contact" className="btn primary sm desktop-only">
            {lang === "fr" ? "Nous contacter" : "Contact"}
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
