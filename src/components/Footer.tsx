"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const [lang, setLang] = useState("fr");

  useEffect(() => {
    const savedLang = localStorage.getItem("alodo-lang") || "fr";
    setLang(savedLang);
  }, []);

  const T = lang === "fr" ? {
    tag: "Infrastructure financière & digitale pour les marchés émergents.",
    product: "Produits", company: "Entreprise", resources: "Ressources", contact: "Contact",
    legal: "Mentions légales", privacy: "Confidentialité", cookies: "Cookies",
    rights: "Tous droits réservés", based: "Basé à Cotonou · Opérations panafricaines",
  } : {
    tag: "Financial & digital infrastructure for emerging markets.",
    product: "Products", company: "Company", resources: "Resources", contact: "Contact",
    legal: "Legal", privacy: "Privacy", cookies: "Cookies",
    rights: "All rights reserved", based: "Based in Cotonou · Pan-African operations",
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link className="brand" href="/">
              <span className="mark">AT</span>
              <span>ALODO TECH</span>
            </Link>
            <p className="footer-blurb">{T.tag}</p>
            <div className="socials">
              <a href="https://www.linkedin.com/company/alodo-tech/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21H18.6v-5.6c0-1.34-.02-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V21H10V9z" />
                </svg>
              </a>
              <a href="#" aria-label="X / Twitter">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2H21l-6.51 7.44L22 22h-6.797l-4.808-6.05L4.8 22H2.04l6.98-7.97L2 2h6.91l4.34 5.5L18.244 2zm-1.193 18h1.66L7.05 4H5.29l11.76 16z" />
                </svg>
              </a>
              <a href="#" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.54 2.34 1.1 2.91.84.09-.65.35-1.1.63-1.35-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 015 0c1.9-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0012 2z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h5>{T.product}</h5>
            <ul>
              <li><Link href="/products/alodo">ALODO</Link></li>
              <li><Link href="/products/coinai">COINAI</Link></li>
              {/* <li><Link href="/solutions">Solutions B2B</Link></li>
              <li><Link href="/technology">{lang === "fr" ? "Technologie" : "Technology"}</Link></li> */}
            </ul>
          </div>
          <div>
            <h5>{T.company}</h5>
            <ul>
              <li><Link href="/about">{lang === "fr" ? "À propos" : "About"}</Link></li>
              {/* <li><Link href="/impact">Impact</Link></li> */}
              <li><Link href="/careers">{lang === "fr" ? "Carrières" : "Careers"}</Link></li>
              <li><Link href="/partners">{lang === "fr" ? "Investir" : "Invest"}</Link></li>
            </ul>
          </div>
          <div>
            <h5>{T.resources}</h5>
            <ul>
              <li><Link href="/blog">Blog</Link></li>
              <li><a href="#">{lang === "fr" ? "Documentation" : "Documentation"}</a></li>
              <li><a href="#">{lang === "fr" ? "Presse" : "Press"}</a></li>
              <li><a href="#">{lang === "fr" ? "Sécurité" : "Security"}</a></li>
            </ul>
          </div>
          <div>
            <h5>{T.contact}</h5>
            <ul>
              <li><a href="mailto:hello@alodo.tech">hello@alodo.tech</a></li>
              <li><a href="mailto:investors@alodo.tech">investors@alodo.tech</a></li>
              <li><span>{T.based}</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2025 ALODO TECH — {T.rights}.</div>
          <div style={{ display: "flex", gap: "24px" }}>
            <a href="#">{T.legal}</a>
            <a href="#">{T.privacy}</a>
            <a href="#">{T.cookies}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
