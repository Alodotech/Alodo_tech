"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./blog.css";

export default function Blog() {
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
    <>
      <Navbar activeKey="blog" />

      <main data-screen-label="08 Blog">
        {/* Hero */}
        <section className="page-hero">
          <div className="container">
            <div className="blog-head">
              <div>
                <span className="eyebrow reveal">Blog · Insights</span>
                <h1 className="display reveal" data-delay="1" style={{ marginTop: "18px" }}>
                  Notes de terrain sur la fintech africaine.
                </h1>
                <p className="lead reveal" data-delay="2" style={{ marginTop: "18px" }}>
                  Analyses, données, retours pilotes. Nous écrivons sur ce que nous voyons —
                  au marché, dans les agences, dans les feuilles de calcul.
                </p>
              </div>
            </div>
            <div className="filters reveal" data-delay="3">
              <a className="on">Tous les articles</a>
              <a>Fintech</a>
              <a>Inclusion financière</a>
              <a>IA &amp; data</a>
              <a>MPME</a>
              <a>Behind the scenes</a>
              <a>Politique &amp; régulation</a>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="tight">
          <div className="container">
            <div className="feature reveal">
              <div className="feature-cover">
                <span className="corner-tag">Article phare · 12 min de lecture</span>
                <svg viewBox="0 0 400 320" fill="none">
                  <defs>
                    <linearGradient id="fc" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor="#00C2A8" stopOpacity=".8" />
                      <stop offset="100%" stopColor="#0057FF" stopOpacity=".8" />
                    </linearGradient>
                  </defs>
                  <g stroke="rgba(255,255,255,0.1)">
                    <line x1="40" y1="60" x2="360" y2="60" />
                    <line x1="40" y1="120" x2="360" y2="120" />
                    <line x1="40" y1="180" x2="360" y2="180" />
                    <line x1="40" y1="240" x2="360" y2="240" />
                  </g>
                  <path d="M40,220 L80,200 L120,210 L160,180 L200,190 L240,150 L280,160 L320,110 L360,90" fill="none" stroke="url(#fc)" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="320" cy="110" r="6" fill="#00C2A8" />
                  <circle cx="320" cy="110" r="14" fill="none" stroke="#00C2A8" strokeOpacity="0.4" strokeWidth="1" />
                  <text x="40" y="290" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(255,255,255,0.5)">2020</text>
                  <text x="200" y="290" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(255,255,255,0.5)">2024</text>
                  <text x="340" y="290" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(255,255,255,0.5)">2026</text>
                  <text x="40" y="44" fontFamily="Inter" fontSize="13" fontWeight="600" fill="white">Volume fintech UEMOA · USD M</text>
                </svg>
              </div>
              <div>
                <span className="kicker">Analyse · 14 mai 2026</span>
                <h2>Pourquoi les MPME africaines vont basculer dans le crédit formel d'ici 2030.</h2>
                <p>Cinq facteurs convergent : pénétration smartphone, WhatsApp Business API, baisse du coût IoT, ouverture des API banques, et signal politique fort de l'UEMOA sur la digitalisation. Notre lecture, données à l'appui.</p>
                <div className="byline">
                  <div className="avatar">AA</div>
                  <div><b>Alodo Adékunlé</b><br />CEO · ALODO TECH</div>
                </div>
                <a className="link-arrow" style={{ marginTop: "24px", display: "inline-flex" }} href="#">
                  Lire l'article
                  <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7h8M7 3l4 4-4 4" /></svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Article grid */}
        <section>
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Derniers articles</span>
              </div>
              <a className="link-arrow reveal" data-delay="1" href="#">Voir les archives <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7h8M7 3l4 4-4 4" /></svg></a>
            </div>

            <div className="article-grid">
              <a href="#" className="article reveal">
                <div className="cover cover-v1">
                  <span className="label-corner">Inclusion financière</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 1v22" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
                </div>
                <div className="meta"><b>Sira Diallo</b><span>·</span><span>8 mai 2026</span><span>·</span><span>7 min</span></div>
                <h3>Pourquoi 80% des MPME n'ont jamais eu de crédit (et ce qu'on peut y faire)</h3>
                <p>Trois obstacles structurels — historique, garanties, paperasse. Comment un scoring comportemental les contourne.</p>
              </a>

              <a href="#" className="article reveal" data-delay="1">
                <div className="cover cover-v2">
                  <span className="label-corner">IA &amp; data</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><circle cx="5" cy="5" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M7 6l3 4M17 6l-3 4M7 18l3-4M17 18l-3-4" /></svg>
                </div>
                <div className="meta"><b>Kwame Bonsu</b><span>·</span><span>2 mai 2026</span><span>·</span><span>9 min</span></div>
                <h3>Anatomie d'un scoring de crédit comportemental</h3>
                <p>Quatre familles de signaux, douze features, un modèle explicable. Pourquoi nous refusons les boîtes noires.</p>
              </a>

              <a href="#" className="article reveal" data-delay="2">
                <div className="cover cover-v3">
                  <span className="label-corner" style={{ background: "rgba(0,0,0,0.6)", color: "white" }}>Behind the scenes</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" /></svg>
                </div>
                <div className="meta"><b>Tomi Yusuf</b><span>·</span><span>28 avril 2026</span><span>·</span><span>6 min</span></div>
                <h3>Comment on a réduit la conso du boîtier de 60% en 3 sprints</h3>
                <p>Le journal d'une obsession : faire tenir un edge device 24h sur batterie en plein soleil de Cotonou.</p>
              </a>

              <a href="#" className="article reveal" data-delay="3">
                <div className="cover cover-v4">
                  <span className="label-corner">Fintech</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></svg>
                </div>
                <div className="meta"><b>Alodo Adékunlé</b><span>·</span><span>22 avril 2026</span><span>·</span><span>11 min</span></div>
                <h3>Le marché fintech UEMOA en 2026 : ce que les chiffres disent vraiment</h3>
                <p>50 graphiques, 5 conclusions. Un tour d'horizon honnête — y compris ce qui ne marche pas.</p>
              </a>

              <a href="#" className="article reveal" data-delay="4">
                <div className="cover cover-v5">
                  <span className="label-corner">MPME</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><path d="M9 22V12h6v10" /></svg>
                </div>
                <div className="meta"><b>Fatou N'Diaye</b><span>·</span><span>15 avril 2026</span><span>·</span><span>5 min</span></div>
                <h3>Trois mois sur le terrain à Dantokpa — ce qu'on a appris</h3>
                <p>Recherche utilisateur grandeur nature : 47 vendeuses, 12 hypothèses cassées, un produit reforgé.</p>
              </a>

              <a href="#" className="article reveal" data-delay="5">
                <div className="cover cover-v6">
                  <span className="label-corner">Politique &amp; régulation</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" /><path d="M9 12l2 2 4-4" /></svg>
                </div>
                <div className="meta"><b>Moussa Ouédraogo</b><span>·</span><span>8 avril 2026</span><span>·</span><span>8 min</span></div>
                <h3>BCEAO, données et innovation : un cadre qui mûrit</h3>
                <p>Analyse de la dernière instruction BCEAO et de ses implications pour les fintechs régionales.</p>
              </a>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="tight">
          <div className="container">
            <div className="nl-box reveal">
              <div>
                <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Newsletter</span>
                <h2 className="h2" style={{ marginTop: "12px" }}>Une analyse fintech africaine. Une fois par mois.</h2>
                <p className="muted" style={{ marginTop: "12px", color: "rgba(255,255,255,0.65)", maxWidth: "44ch" }}>
                  Pas de spam, pas de pop-up. Juste un essai signé par l'équipe, livré le premier lundi du mois.
                </p>
              </div>
              <div>
                <form className="nl-form" onSubmit={(e) => {
                  e.preventDefault();
                  const btn = e.currentTarget.querySelector('button');
                  if (btn) btn.textContent = '✓ Inscrit';
                }}>
                  <input type="email" placeholder="votre@email.com" required />
                  <button type="submit">S'abonner</button>
                </form>
                <p className="nl-note">En vous inscrivant, vous acceptez de recevoir nos analyses. Désinscription en un clic.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
