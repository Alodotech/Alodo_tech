"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./coinai.css";

export default function CoinaiProduct() {
  useEffect(() => {
    // Reveal logic
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

    return () => revealIo.disconnect();
  }, []);

  return (
    <div className="coinai-page">
      <Navbar activeKey="products" />

      <main data-screen-label="04 Products — COINAI">
        {/* HERO */}
        <section className="coinai-hero">
          <div className="bg-fx"></div>
          <div className="container">
            <div className="label-row" style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "24px" }}>
              <span className="tag" style={{ background: "rgba(0,194,168,0.16)", color: "var(--teal)" }}>COINAI</span>
              <span className="muted" style={{ fontSize: "13px" }}>Produit · IA &amp; investissement</span>
            </div>
            <h1 className="display reveal">
              Investir sur les marchés africains, <span className="glow">propulsé par l'IA</span>.
            </h1>
            <p className="lead reveal" data-delay="2" style={{ marginTop: "24px", maxWidth: "720px" }}>
              Plateforme de trading automatisé et d'analytics temps réel pour BRVM,
              JSE, NGX et marchés émergents. Modèles ML propriétaires, signaux
              actionnables, API brokers.
            </p>
            <div className="actions reveal" data-delay="3">
              <Link href="/contact" className="btn primary">Demander un accès bêta</Link>
              <a href="#" className="btn outline">Voir la documentation API</a>
            </div>

            {/* Dashboard mockup */}
            <div className="dash reveal" data-delay="4">
              <div className="dash-head">
                <div className="title">
                  <span className="dots"><span></span><span></span><span></span></span>
                  <span className="ticker">COINAI · Dashboard / Live</span>
                </div>
                <div className="now">14:21:08 GMT · BRVM open</div>
              </div>
              <div className="dash-grid">
                <div className="chart-wrap">
                  <div className="head">
                    <div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-mono)" }}>BRVM · SONATEL</div>
                      <div className="price">17 850 <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>XOF</span></div>
                    </div>
                    <div className="delta">+2.4%  ↑  90j</div>
                  </div>
                  <svg viewBox="0 0 600 220" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#00C2A8" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#00C2A8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <g stroke="rgba(255,255,255,0.05)">
                      <line x1="0" y1="40" x2="600" y2="40" />
                      <line x1="0" y1="80" x2="600" y2="80" />
                      <line x1="0" y1="120" x2="600" y2="120" />
                      <line x1="0" y1="160" x2="600" y2="160" />
                      <line x1="0" y1="200" x2="600" y2="200" />
                    </g>
                    <path d="M0,160 L30,158 L60,150 L90,155 L120,140 L150,144 L180,128 L210,135 L240,118 L270,124 L300,100 L330,108 L360,92 L390,82 L420,90 L450,68 L480,74 L510,52 L540,60 L570,38 L600,44 L600,220 L0,220 Z" fill="url(#grad)" />
                    <path d="M0,160 L30,158 L60,150 L90,155 L120,140 L150,144 L180,128 L210,135 L240,118 L270,124 L300,100 L330,108 L360,92 L390,82 L420,90 L450,68 L480,74 L510,52 L540,60 L570,38 L600,44" fill="none" stroke="#00C2A8" strokeWidth="2" />
                    <circle cx="300" cy="100" r="6" fill="#00C2A8" />
                    <circle cx="300" cy="100" r="14" fill="none" stroke="#00C2A8" strokeOpacity="0.4" />
                    <text x="310" y="92" fill="#00C2A8" fontFamily="JetBrains Mono" fontSize="10">BUY · 16 800</text>
                    <path d="M0,90 L600,30" stroke="#0057FF" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
                    <text x="540" y="22" fill="#0057FF" fontFamily="JetBrains Mono" fontSize="10" textAnchor="end">AI target</text>
                  </svg>
                </div>
                <div className="signals">
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-mono)" }}>SIGNAUX · live</div>
                  <div className="signal">
                    <span className="badge buy">BUY</span>
                    <div className="body">
                      <div className="row"><span>SONATEL · BRVM</span><b>17 850</b></div>
                      <div className="reason">Breakout volume +180% vs MA20 · sentiment positif sur LLM news.</div>
                    </div>
                  </div>
                  <div className="signal">
                    <span className="badge buy">BUY</span>
                    <div className="body">
                      <div className="row"><span>NPN · JSE</span><b>3 421</b></div>
                      <div className="reason">Mean-reversion court terme · support technique confirmé.</div>
                    </div>
                  </div>
                  <div className="signal">
                    <span className="badge sell">SELL</span>
                    <div className="body">
                      <div className="row"><span>MTN · NGX</span><b>218.5</b></div>
                      <div className="reason">Divergence RSI · pression vendeuse macro NGN.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Positioning */}
        <section>
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Positionnement</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Un Bloomberg Terminal<br />pensé pour l'Afrique émergente.</h2>
              </div>
              <p className="muted reveal" data-delay="2" style={{ maxWidth: "360px", margin: 0 }}>
                Les plateformes globales ignorent la BRVM, JSE, NGX, EGX. COINAI les met au centre.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="tight">
          <div className="container">
            <div className="feat-grid">
              <div className="feat reveal">
                <div className="icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 19h16M4 15l4-4 4 4 8-8" /></svg></div>
                <h3>Signaux automatisés</h3>
                <p>Modèles ML propriétaires : breakout, mean-reversion, sentiment news. Signaux temps réel, transparence sur les facteurs.</p>
              </div>
              <div className="feat reveal" data-delay="1">
                <div className="icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M7 14h4M7 17h7" /></svg></div>
                <h3>Portfolio multi-actifs</h3>
                <p>Suivi unifié actions, ETF, crypto, FX, matières premières. Reporting PnL, exposition par secteur et géographie.</p>
              </div>
              <div className="feat reveal" data-delay="2">
                <div className="icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 3a14 14 0 010 18M3 12h18" /></svg></div>
                <h3>Couverture marchés frontières</h3>
                <p>BRVM, BVMAC, JSE, NGX, EGX, NSE Kenya. Data normalisée, latence sub-seconde sur tickers actifs.</p>
              </div>
              <div className="feat reveal" data-delay="3">
                <div className="icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 7h16M4 12h10M4 17h6" /><path d="M16 14l4 4-4 4" /></svg></div>
                <h3>Rapports IA hebdo</h3>
                <p>Synthèse marchés, opportunités identifiées, risques émergents. Généré automatiquement, vérifié par analyste senior.</p>
              </div>
              <div className="feat reveal" data-delay="4">
                <div className="icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg></div>
                <h3>API brokers</h3>
                <p>Intégration directe avec brokers partenaires. Exécution programmable, gestion d'ordres, hooks d'audit.</p>
              </div>
              <div className="feat reveal" data-delay="5">
                <div className="icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 1l3 6 6 1-4.5 4.5L18 19l-6-3-6 3 1.5-6.5L3 8l6-1z" /></svg></div>
                <h3>Backtesting</h3>
                <p>Testez vos stratégies sur 10 ans de données africaines. Métriques Sharpe, drawdown, exposition par cycle.</p>
              </div>
            </div>
          </div>
        </section>

        {/* API snippet */}
        <section>
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Developer-first</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Une API pensée pour les quants.</h2>
              </div>
              <p className="muted reveal" data-delay="2" style={{ maxWidth: "340px", margin: 0 }}>REST + WebSocket. Auth OAuth2. Idempotent, versionné, monitoré.</p>
            </div>
            <pre className="code reveal" data-delay="3">
              <span className="com"># Récupérer les signaux live pour la BRVM</span>{"\n"}
              <span className="kw">import</span> coinai{"\n\n"}
              client = coinai.<span className="fn">Client</span>(api_key=<span className="str">"sk_live_…"</span>){"\n\n"}
              signals = client.signals.<span className="fn">stream</span>({"\n"}
              {"  "}market=<span className="str">"BRVM"</span>,{"\n"}
              {"  "}confidence_min=<span className="num">0.78</span>,{"\n"}
              {"  "}horizon=<span className="str">"intraday"</span>,{"\n"}
              ){"\n\n"}
              <span className="kw">for</span> s <span className="kw">in</span> signals:{"\n"}
              {"  "}<span className="kw">if</span> s.direction == <span className="str">"BUY"</span> <span className="kw">and</span> s.score &gt; <span className="num">0.85</span>:{"\n"}
              {"    "}client.orders.<span className="fn">place</span>(s.ticker, <span className="str">"BUY"</span>, qty=<span className="num">100</span>)
            </pre>
          </div>
        </section>

        {/* CTA */}
        <section className="tight">
          <div className="container">
            <div className="cta-banner reveal" style={{ background: "linear-gradient(120deg, #0e0e10, #16161a)", border: "1px solid rgba(0,194,168,0.25)" }}>
              <div>
                <span className="eyebrow teal" style={{ color: "var(--teal)" }}>Bêta privée</span>
                <h2 className="h2" style={{ marginTop: "12px", maxWidth: "18ch" }}>Accès anticipé COINAI.</h2>
                <p className="muted" style={{ margin: "16px 0 0", maxWidth: "44ch" }}>
                  Family offices, fonds émergents, brokers — rejoignez la bêta privée et façonnez le produit.
                </p>
              </div>
              <div className="actions">
                <Link href="/contact" className="btn primary" style={{ background: "var(--teal)", color: "#00261f" }}>Demander un accès</Link>
                <a href="#" className="btn outline">Télécharger la doc</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
