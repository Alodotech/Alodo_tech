"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./home.css";

export default function Home() {
  useEffect(() => {
    // 1. Africa constellation logic
    const g = document.getElementById("dots");
    if (g) {
      const inAfrica = (x: number, y: number) => {
        const ellipses = [
          { cx: 320, cy: 220, rx: 130, ry: 100 },
          { cx: 310, cy: 350, rx: 150, ry: 120 },
          { cx: 330, cy: 480, rx: 110, ry: 110 },
          { cx: 410, cy: 250, rx: 80, ry: 70 },
        ];
        for (const e of ellipses) {
          const dx = (x - e.cx) / e.rx;
          const dy = (y - e.cy) / e.ry;
          if (dx * dx + dy * dy <= 1) return true;
        }
        return false;
      };

      const dots = [];
      for (let y = 100; y < 620; y += 14) {
        for (let x = 150; x < 520; x += 14) {
          if (inAfrica(x, y)) {
            const jx = (Math.random() - 0.5) * 3;
            const jy = (Math.random() - 0.5) * 3;
            dots.push(`<circle cx="${x + jx}" cy="${y + jy}" r="1.4" opacity="${0.15 + Math.random() * 0.25}"/>`);
          }
        }
      }
      g.innerHTML = dots.join("");
    }

    // 2. Reveal logic
    const revealEls = document.querySelectorAll(".reveal");
    const revealIo = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealIo.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(e => revealIo.observe(e));

    // 3. CountUp logic
    const countEls = document.querySelectorAll("[data-count]");
    const fmt = (n: number, suffix: string) => {
      const round = Math.round(n);
      if (round >= 1000000) return (round / 1000000).toFixed(round >= 10000000 ? 0 : 1).replace(/\.0$/, "") + "M" + (suffix || "");
      if (round >= 1000) return (round / 1000).toFixed(round >= 10000 ? 0 : 1).replace(/\.0$/, "") + "K" + (suffix || "");
      return round.toLocaleString() + (suffix || "");
    };
    const animateCount = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count || "0");
      const suffix = el.dataset.suffix || "";
      const dur = 1400;
      const start = performance.now();
      function tick(now: number) {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(target * eased, suffix);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = el.dataset.final || fmt(target, suffix);
      }
      requestAnimationFrame(tick);
    };
    const countIo = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(e.target as HTMLElement);
          countIo.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    countEls.forEach(e => countIo.observe(e));

    return () => {
      revealIo.disconnect();
      countIo.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar activeKey="home" />

      <main data-screen-label="01 Home">
        {/* ============ HERO ============ */}
        <section className="hero">
          <div className="hero-art" aria-hidden="true">
            <svg viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="hg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0057FF" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#0057FF" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="320" cy="340" r="260" fill="url(#hg)" />
              <g id="dots" fill="#0A0A0A"></g>
              <g id="nodes">
                <circle cx="290" cy="200" r="5" fill="#0057FF">
                  <animate attributeName="opacity" values="1;.3;1" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <circle cx="330" cy="290" r="5" fill="#00C2A8">
                  <animate attributeName="opacity" values="1;.3;1" dur="3.1s" repeatCount="indefinite" begin="0.3s" />
                </circle>
                <circle cx="270" cy="380" r="5" fill="#0057FF">
                  <animate attributeName="opacity" values="1;.3;1" dur="2.7s" repeatCount="indefinite" begin="0.6s" />
                </circle>
                <circle cx="370" cy="430" r="5" fill="#00C2A8">
                  <animate attributeName="opacity" values="1;.3;1" dur="2.9s" repeatCount="indefinite" begin="0.9s" />
                </circle>
                <circle cx="320" cy="540" r="5" fill="#0057FF">
                  <animate attributeName="opacity" values="1;.3;1" dur="3.3s" repeatCount="indefinite" begin="1.2s" />
                </circle>
                <circle cx="240" cy="250" r="5" fill="#00C2A8">
                  <animate attributeName="opacity" values="1;.3;1" dur="2.5s" repeatCount="indefinite" begin="1.5s" />
                </circle>
              </g>
              <g stroke="#0A0A0A" strokeOpacity="0.08" strokeWidth="1">
                <line x1="290" y1="200" x2="330" y2="290" />
                <line x1="330" y1="290" x2="270" y2="380" />
                <line x1="270" y1="380" x2="370" y2="430" />
                <line x1="370" y1="430" x2="320" y2="540" />
                <line x1="240" y1="250" x2="330" y2="290" />
              </g>
            </svg>
          </div>
          <div className="container">
            <div className="reveal">
            </div>
            <h1 className="display reveal" data-delay="1">
              L'infrastructure <span className="accent">digitale</span> de l'économie réelle.
            </h1>
            <p className="lead reveal" data-delay="2" style={{ maxWidth: "720px", marginTop: "24px" }}>
              ALODO TECH conçoit les socles technologiques qui connectent l'économie informelle
              au système financier mondial. Nous transformons chaque transaction terrain en donnée
              de confiance pour une inclusion financière radicale.
            </p>
            <div className="actions reveal" data-delay="3" style={{ marginTop: "36px" }}>
              <Link href="/products" className="btn primary">Découvrir Nos produits <span className="arrow">→</span></Link>
              <Link href="/partners" className="btn outline">Devenir partenaire</Link>
            </div>

            {/* Statistiques Dynamiques */}
            <div className="hero-meta reveal" data-delay="4" style={{ marginTop: "56px", display: "flex", gap: "40px", flexWrap: "wrap", color: "var(--grey-700)", fontSize: "14px", fontWeight: "500" }}>
              <div className="meta-item">
                Plus de <span style={{ color: "var(--primary)", fontFamily: "var(--font-tech)", fontWeight: "700", fontSize: "16px" }}>5</span> pays cibles
              </div>
              <div className="meta-item">
                <span style={{ color: "var(--primary)", fontFamily: "var(--font-tech)", fontWeight: "700", fontSize: "16px" }}>500k</span> MPME ciblée
              </div>
              <div className="meta-item">
                <span style={{ color: "var(--primary)", fontFamily: "var(--font-tech)", fontWeight: "700", fontSize: "16px" }}>2</span> produits
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ============ PRODUCTS ============ */}
        <section>
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Expertises</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Nos Domaines<br />d'Intervention.</h2>
              </div>
              <Link href="/products" className="link-arrow reveal" data-delay="2">
                Voir tous les produits
                <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 7h8M7 3l4 4-4 4" />
                </svg>
              </Link>
            </div>

            <div className="product-cards">
              {/* ALODO card */}
              <Link href="/products/alodo" className="product-card reveal">
                <div className="label">Inclusion & Paiements</div>
                <h3>Digitalisation des flux<br />financiers hybrides</h3>
                <p className="muted" style={{ margin: 0, maxWidth: "36ch" }}>
                  Déploiement d'écosystèmes IoT et mobiles pour capter, sécuriser et
                  fluidifier les échanges économiques en zone émergente.
                </p>
                <div className="alodo-visual">
                  <div className="alodo-box">
                    <div className="ledge">
                      <span>ALODO · BOX</span>
                      <span className="dot blue" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--primary)" }}></span>
                    </div>
                    <div className="screen">
                      <span>+ 12 500 F</span>
                      <span className="dot"></span>
                    </div>
                    <div className="ledge"><span>15:42</span><span>4G</span></div>
                  </div>
                  <div className="alodo-flow"></div>
                  <div className="alodo-chat">
                    <div className="small">WHATSAPP · ALODO BOT</div>
                    <div>Vente enregistrée. Score crédit : <b style={{ color: "var(--primary)" }}>+8 pts</b>. Tap pour détails.</div>
                  </div>
                </div>
                <div className="tag-row">
                  <span className="tag">IoT</span>
                  <span className="tag">WhatsApp API</span>
                  <span className="tag blue">Crédit MPME</span>
                </div>
                <span className="read">En savoir plus <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7h8M7 3l4 4-4 4" /></svg></span>
              </Link>

              {/* COINAI card */}
              <Link href="/products/coinai" className="product-card dark reveal" data-delay="1">
                <div className="label">IA & Analytics</div>
                <h3>Ingénierie de la donnée<br />& Scoring propriétaire</h3>
                <p className="muted" style={{ margin: 0, maxWidth: "36ch" }}>
                  Conception de moteurs d'analyse prédictive pour offrir une visibilité
                  financière totale aux acteurs non bancarisés du continent.
                </p>
                <div className="coinai-visual">
                  <div className="coinai-row"><span className="ticker">BRVM · SONATEL</span><span><span className="price">17 850</span> <span className="delta">+2.4%</span></span></div>
                  <div className="coinai-row"><span className="ticker">JSE · NPN</span><span><span className="price">3 421</span> <span className="delta">+0.8%</span></span></div>
                  <div className="coinai-row"><span className="ticker">NGX · MTN</span><span><span className="price">218.5</span> <span className="delta neg">−1.1%</span></span></div>
                  <div className="coinai-chart">
                    <svg viewBox="0 0 200 80" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="cg" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#00C2A8" stopOpacity=".5" />
                          <stop offset="100%" stopColor="#00C2A8" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,55 L20,48 L40,52 L60,38 L80,42 L100,28 L120,32 L140,18 L160,22 L180,12 L200,16 L200,80 L0,80 Z" fill="url(#cg)" />
                      <path d="M0,55 L20,48 L40,52 L60,38 L80,42 L100,28 L120,32 L140,18 L160,22 L180,12 L200,16" fill="none" stroke="#00C2A8" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
                <div className="tag-row">
                  <span className="tag dark">LLM</span>
                  <span className="tag dark">Trading API</span>
                  <span className="tag dark" style={{ background: "rgba(0,194,168,.18)", color: "var(--teal)" }}>Marchés africains</span>
                </div>
                <span className="read">En savoir plus <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7h8M7 3l4 4-4 4" /></svg></span>
              </Link>
            </div>
          </div>
        </section>

        {/* ============ VISION ============ */}
        <section className="bg-grey">
          <div className="container">
            <div className="vision-block">
              <div>
                <span className="eyebrow teal reveal">Notre vision</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Donner une identité<br />financière à l'informel.</h2>
                <p className="lead reveal" data-delay="2" style={{ marginTop: "24px", maxWidth: "480px" }}>
                  44 millions de MPME en Afrique subsaharienne sont aujourd'hui invisibles.
                  Nous construisons le pont numérique qui leur permet d'être comprises,
                  accompagnées et financées par les institutions.
                </p>
                <div className="actions reveal" data-delay="3" style={{ marginTop: "32px" }}>
                  <Link href="/about" className="btn dark">Notre mission</Link>
                  <Link href="/about" className="btn outline">Notre équipe</Link>
                </div>
              </div>
              <div className="vision-img reveal" data-delay="2">
                <svg viewBox="0 0 400 320" fill="none">
                  <rect x="40" y="40" width="120" height="80" rx="14" fill="white" stroke="#D1D1D6" />
                  <text x="100" y="72" textAnchor="middle" fontFamily="Inter" fontSize="11" fontWeight="600" fill="#6E6E73">VENTE CASH</text>
                  <text x="100" y="98" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="16" fontWeight="600" fill="#0A0A0A">+12 500 F</text>

                  <rect x="240" y="40" width="120" height="80" rx="14" fill="#0A0A0A" />
                  <text x="300" y="72" textAnchor="middle" fontFamily="Inter" fontSize="11" fontWeight="600" fill="rgba(255,255,255,.6)">ALODO BOX</text>
                  <circle cx="300" cy="96" r="6" fill="#00C2A8" />
                  <text x="316" y="100" fontFamily="JetBrains Mono" fontSize="11" fill="white">SYNC</text>

                  <rect x="40" y="200" width="120" height="80" rx="14" fill="white" stroke="#D1D1D6" />
                  <text x="100" y="232" textAnchor="middle" fontFamily="Inter" fontSize="11" fontWeight="600" fill="#6E6E73">SCORE IA</text>
                  <text x="100" y="258" textAnchor="middle" fontFamily="Inter" fontSize="22" fontWeight="700" fill="#0057FF">A−</text>

                  <rect x="240" y="200" width="120" height="80" rx="14" fill="#EAF0FF" stroke="#0057FF" strokeOpacity=".3" />
                  <text x="300" y="232" textAnchor="middle" fontFamily="Inter" fontSize="11" fontWeight="600" fill="#0057FF">CRÉDIT</text>
                  <text x="300" y="258" textAnchor="middle" fontFamily="Inter" fontSize="16" fontWeight="700" fill="#0057FF">150 000 F</text>

                  <path d="M160 80 L240 80" stroke="#0A0A0A" strokeWidth="1.2" strokeDasharray="3 3" />
                  <path d="M300 120 L300 200" stroke="#0A0A0A" strokeWidth="1.2" strokeDasharray="3 3" />
                  <path d="M160 240 L240 240" stroke="#0A0A0A" strokeWidth="1.2" strokeDasharray="3 3" />
                  <path d="M100 120 L100 200" stroke="#0A0A0A" strokeWidth="1.2" strokeDasharray="3 3" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ============ STATS ============ */}
        <section className="bg-dark">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Chiffres clés</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px", maxWidth: "16ch" }}>L'opportunité, en chiffres.</h2>
              </div>
              <p className="muted reveal" data-delay="2" style={{ maxWidth: "320px", margin: 0, fontSize: "13px" }}>
                Projections sur cibles validées. À mettre à jour avec les données terrain.
              </p>
            </div>
            <div className="stats-row">
              <div className="stat reveal">
                <div className="value blue" data-count="500000" data-suffix="+" data-final="500K+">0</div>
                <div className="label">MPME ciblées</div>
              </div>
              <div className="stat reveal" data-delay="1">
                <div className="value" data-count="1000000" data-suffix="+" data-final="1M+">0</div>
                <div className="label">Transactions / mois</div>
              </div>
              <div className="stat reveal" data-delay="2">
                <div className="value teal" data-count="5" data-final="5">0</div>
                <div className="label">Pays cibles</div>
              </div>
              <div className="stat reveal" data-delay="3">
                <div className="value" data-count="44" data-suffix="M" data-final="44M">0</div>
                <div className="label">MPME en Afrique (TAM)</div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PARTNERS ============ */}
        <section className="section-partners">
          <div className="container">
            <div className="partner-showcase">
              <p className="partners-text reveal" style={{ fontSize: '12px', opacity: 0.6, marginBottom: '8px' }}>Partenaire Stratégique</p>
              <div className="partner-logo-box reveal" data-delay="1">
                <img
                  src="/partenaires/image.png"
                  alt="TechnoServe"
                  className="partner-logo-img"
                />
                <div className="partner-divider"></div>
                <div className="partner-tagline">
                  TechnoServe · L’Entreprise, Solution à la Pauvreté™
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="tight">
          <div className="container">
            <div className="cta-banner reveal">
              <div>
                <span className="eyebrow" style={{ color: "rgba(255,255,255,.6)" }}>Investir · Partenariat</span>
                <h2 className="h2" style={{ marginTop: "12px", maxWidth: "18ch" }}>Bâtissons ensemble les fondations de l'avenir.</h2>
                <p className="muted" style={{ margin: "16px 0 0", maxWidth: "44ch" }}>
                  Accélérez la transformation numérique du continent. Discutons opportunité de marché,
                  traction et déploiement stratégique.
                </p>
              </div>
              <div className="actions">
                <Link href="/partners" className="btn primary">Voir le deck</Link>
                <a href="mailto:investors@alodo.tech" className="btn outline">investors@alodo.tech</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
