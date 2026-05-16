/* ===========================================================
   ALODO TECH — Shared site script
   - Injects unified nav + footer
   - Handles scroll reveals, count-up, mobile menu, FR/EN toggle
   =========================================================== */

(function () {
  const NAV_LINKS = [
    { href: "index.html",            label: { fr: "Accueil",     en: "Home" },        key: "home" },
    { href: "about.html",            label: { fr: "À propos",    en: "About" },       key: "about" },
    { href: "products-alodo.html",   label: { fr: "ALODO",       en: "ALODO" },       key: "products" },
    { href: "products-coinai.html",  label: { fr: "COINAI",      en: "COINAI" },      key: "products" },
    { href: "solutions.html",        label: { fr: "Solutions",   en: "Solutions" },   key: "solutions" },
    { href: "technology.html",       label: { fr: "Technologie", en: "Technology" },  key: "technology" },
    { href: "impact.html",           label: { fr: "Impact",      en: "Impact" },      key: "impact" },
    { href: "blog.html",             label: { fr: "Blog",        en: "Blog" },        key: "blog" },
    { href: "careers.html",          label: { fr: "Carrières",   en: "Careers" },     key: "careers" },
    { href: "partners.html",         label: { fr: "Investir",    en: "Invest" },      key: "partners" },
  ];

  const lang = localStorage.getItem("alodo-lang") || "fr";

  function injectNav() {
    const slot = document.querySelector("[data-nav]");
    if (!slot) return;
    const active = slot.getAttribute("data-active") || "";
    const links = NAV_LINKS.map(l => `
      <a href="${l.href}" class="${l.key === active ? "active" : ""}">${l.label[lang]}</a>
    `).join("");
    slot.innerHTML = `
      <nav class="nav" id="siteNav">
        <div class="nav-inner">
          <a class="brand" href="index.html">
            <span class="mark">AT</span>
            <span>ALODO TECH</span>
          </a>
          <div class="nav-links">${links}</div>
          <div class="nav-right">
            <div class="lang" role="group" aria-label="Language">
              <button data-lang="fr" class="${lang === "fr" ? "on" : ""}">FR</button>
              <button data-lang="en" class="${lang === "en" ? "on" : ""}">EN</button>
            </div>
            <a href="contact.html" class="btn primary sm">${lang === "fr" ? "Nous contacter" : "Contact"}</a>
            <button class="nav-burger" aria-label="Menu">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round">
                <path d="M3 6h16M3 11h16M3 16h16"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    `;
    // Language toggle
    slot.querySelectorAll(".lang button").forEach(b => {
      b.addEventListener("click", () => {
        localStorage.setItem("alodo-lang", b.dataset.lang);
        location.reload();
      });
    });
    // Mobile burger
    const nav = slot.querySelector("#siteNav");
    slot.querySelector(".nav-burger").addEventListener("click", () => {
      nav.classList.toggle("nav-mobile-open");
    });
  }

  function injectFooter() {
    const slot = document.querySelector("[data-footer]");
    if (!slot) return;
    const T = lang === "fr" ? {
      tag: "Infrastructure financière & digitale pour les marchés émergents.",
      product: "Produits", company: "Entreprise", resources: "Ressources", contact: "Contact",
      legal: "Mentions légales", privacy: "Confidentialité", cookies: "Cookies",
      rights: "Tous droits réservés", based: "Basé à Cotonou · Opérations panafricaines",
      newsletter: "Restez informé",
    } : {
      tag: "Financial & digital infrastructure for emerging markets.",
      product: "Products", company: "Company", resources: "Resources", contact: "Contact",
      legal: "Legal", privacy: "Privacy", cookies: "Cookies",
      rights: "All rights reserved", based: "Based in Cotonou · Pan-African operations",
      newsletter: "Stay informed",
    };
    slot.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <a class="brand" href="index.html">
                <span class="mark">AT</span>
                <span>ALODO TECH</span>
              </a>
              <p class="footer-blurb">${T.tag}</p>
              <div class="socials">
                <a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21H18.6v-5.6c0-1.34-.02-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V21H10V9z"/></svg></a>
                <a href="#" aria-label="X / Twitter"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21l-6.51 7.44L22 22h-6.797l-4.808-6.05L4.8 22H2.04l6.98-7.97L2 2h6.91l4.34 5.5L18.244 2zm-1.193 18h1.66L7.05 4H5.29l11.76 16z"/></svg></a>
                <a href="#" aria-label="GitHub"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.54 2.34 1.1 2.91.84.09-.65.35-1.1.63-1.35-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 015 0c1.9-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0012 2z"/></svg></a>
              </div>
            </div>
            <div>
              <h5>${T.product}</h5>
              <ul>
                <li><a href="products-alodo.html">ALODO</a></li>
                <li><a href="products-coinai.html">COINAI</a></li>
                <li><a href="solutions.html">Solutions B2B</a></li>
                <li><a href="technology.html">${lang === "fr" ? "Technologie" : "Technology"}</a></li>
              </ul>
            </div>
            <div>
              <h5>${T.company}</h5>
              <ul>
                <li><a href="about.html">${lang === "fr" ? "À propos" : "About"}</a></li>
                <li><a href="impact.html">Impact</a></li>
                <li><a href="careers.html">${lang === "fr" ? "Carrières" : "Careers"}</a></li>
                <li><a href="partners.html">${lang === "fr" ? "Investir" : "Invest"}</a></li>
              </ul>
            </div>
            <div>
              <h5>${T.resources}</h5>
              <ul>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="#">${lang === "fr" ? "Documentation" : "Documentation"}</a></li>
                <li><a href="#">${lang === "fr" ? "Presse" : "Press"}</a></li>
                <li><a href="#">${lang === "fr" ? "Sécurité" : "Security"}</a></li>
              </ul>
            </div>
            <div>
              <h5>${T.contact}</h5>
              <ul>
                <li><a href="mailto:hello@alodo.tech">hello@alodo.tech</a></li>
                <li><a href="mailto:investors@alodo.tech">investors@alodo.tech</a></li>
                <li><span>${T.based}</span></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <div>© 2025 ALODO TECH — ${T.rights}.</div>
            <div style="display:flex; gap:24px;">
              <a href="#">${T.legal}</a>
              <a href="#">${T.privacy}</a>
              <a href="#">${T.cookies}</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  function setupReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(e => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(e => io.observe(e));
  }

  function setupCountUp() {
    const els = document.querySelectorAll("[data-count]");
    const fmt = (n, suffix) => {
      const round = Math.round(n);
      if (round >= 1_000_000) return (round / 1_000_000).toFixed(round >= 10_000_000 ? 0 : 1).replace(/\.0$/, "") + "M" + (suffix || "");
      if (round >= 1_000) return (round / 1_000).toFixed(round >= 10_000 ? 0 : 1).replace(/\.0$/, "") + "K" + (suffix || "");
      return round.toLocaleString() + (suffix || "");
    };
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const dur = 1400;
      const start = performance.now();
      function tick(now) {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(target * eased, suffix);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = el.dataset.final || fmt(target, suffix);
      }
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    els.forEach(e => io.observe(e));
  }

  function init() {
    injectNav();
    injectFooter();
    setupReveal();
    setupCountUp();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
