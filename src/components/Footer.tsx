"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const lang = "fr";

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
              <img src="/logo/logo.png" alt="Alodo Tech Logo" style={{ height: "28px", width: "auto" }} />
              <span>
                <span style={{ color: "var(--primary)" }}>ALODO</span>{" "}
                <span style={{ color: "var(--black)" }}>TECH</span>
              </span>
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
              <a href="#" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
              </a>
              <a href="https://whatsapp.com/channel/0029VbDTqIa0lwgh8GZWuS1k" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h5>{T.company}</h5>
            <ul>
              <li><Link href="/about">{lang === "fr" ? "À propos" : "About"}</Link></li>
              {/* <li><Link href="/impact">Impact</Link></li> */}
              <li><Link href="/careers">{lang === "fr" ? "Carrières" : "Careers"}</Link></li>
              {/* <li><Link href="/partners">{lang === "fr" ? "Investir" : "Invest"}</Link></li> */}
            </ul>
          </div>
          <div>
            <h5>{T.resources}</h5>
            <ul>
              <li><Link href="/mpme">{lang === "fr" ? "Programme MPME" : "MSME Program"}</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><a href="#">{lang === "fr" ? "Sécurité" : "Security"}</a></li>
            </ul>
          </div>
          <div>
            <h5>{T.contact}</h5>
            <ul>
              <li><a href="mailto:partnership@alodotech.com">partnership@alodotech.com</a></li>
              <li><span>{T.based}</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 ALODO TECH — {T.rights}.</div>
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
