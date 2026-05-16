"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./impact.css";

export default function Impact() {
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
      <Navbar activeKey="impact" />

      <main data-screen-label="07 Impact">
        {/* Hero */}
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow teal reveal">Impact</span>
            <h1 className="display reveal" data-delay="1" style={{ marginTop: "18px", maxWidth: "18ch" }}>
              L'inclusion n'est pas un slogan. C'est un produit.
            </h1>
            <p className="lead reveal" data-delay="2">
              Chaque MPME équipée d'ALODO devient visible, mesurable, finançable.
              Chaque visiteure du marché bascule, en quelques mois, de l'informel au formel —
              sans changer de métier.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="bg-grey">
          <div className="container">
            <div className="story">
              <div className="story-card reveal">
                <div className="story-photo">
                  <svg viewBox="0 0 200 200" fill="none">
                    <defs>
                      <linearGradient id="ag" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#7a3915" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#7a3915" stopOpacity="0.15" />
                      </linearGradient>
                    </defs>
                    <circle cx="100" cy="75" r="34" fill="url(#ag)" />
                    <path d="M40 200 C40 145 65 120 100 120 C135 120 160 145 160 200 Z" fill="url(#ag)" />
                    <path d="M70 60 C70 35 90 28 100 28 C115 28 130 35 130 60 C130 70 125 80 120 85 L80 85 C75 80 70 70 70 60 Z" fill="#7a3915" opacity="0.4" />
                  </svg>
                </div>
                <div className="story-meta">
                  <div>
                    <div className="name">Amara A.</div>
                    <div className="place">Marché Dantokpa · Cotonou, Bénin</div>
                  </div>
                  <span className="verified">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7l3 3 5-6" /></svg>
                    Pilote ALODO
                  </span>
                </div>
              </div>
              <div className="reveal" data-delay="1">
                <span className="eyebrow">Une histoire vraie · Pilote 2025</span>
                <blockquote className="quote">
                  Je vends du tissu depuis 18 ans. Je n'avais jamais eu de
                  compte en banque. Avec ALODO, mes ventes sont enregistrées
                  depuis 6 mois — j'ai obtenu mon premier crédit de
                  150 000 F CFA pour agrandir mon stock.
                </blockquote>
                <p className="quote-meta">Amara, vendeuse de tissus — première bénéficiaire d'un microcrédit
                  pré-approuvé par ALODO en partenariat avec une IMF locale.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Axes */}
        <section>
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Quatre axes d'impact</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Inclusion. Digitalisation.<br />Financement. Emploi.</h2>
              </div>
            </div>

            <div className="axes-grid">
              <div className="axis reveal">
                <div className="ic">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 1v22" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
                </div>
                <div>
                  <h3>Inclusion financière</h3>
                  <p>Accès au crédit pour des MPME que les institutions traditionnelles ne pouvaient pas évaluer — premier compte, premier crédit, première relation bancaire.</p>
                  <div className="stat-line">→ 80%+ des bénéficiaires non-bancarisés avant ALODO</div>
                </div>
              </div>

              <div className="axis teal reveal" data-delay="1">
                <div className="ic">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18" /><path d="M8 12h8" /></svg>
                </div>
                <div>
                  <h3>Digitalisation de l'informel</h3>
                  <p>Chaque transaction cash devient une donnée structurée. La MPME passe d'une réalité invisible à une présence numérique mesurable.</p>
                  <div className="stat-line">→ &gt; 1M transactions digitalisées (cible mensuelle phase 1)</div>
                </div>
              </div>

              <div className="axis reveal" data-delay="2">
                <div className="ic">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></svg>
                </div>
                <div>
                  <h3>Accès au financement</h3>
                  <p>Scoring alternatif basé sur le comportement réel — pas sur les garanties ou la paperasse. Les IMF et banques prêtent avec confiance.</p>
                  <div className="stat-line">→ −42% NPL projeté sur cohortes équipées</div>
                </div>
              </div>

              <div className="axis teal reveal" data-delay="3">
                <div className="ic">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M9 11a4 4 0 100-8 4 4 0 000 8z" /><path d="M2 21v-2a5 5 0 015-5h4a5 5 0 015 5v2" /><path d="M17 11l2 2 4-4" /></svg>
                </div>
                <div>
                  <h3>Emploi &amp; croissance</h3>
                  <p>Les MPME équipées recrutent davantage — un crédit débloqué, c'est un apprenti embauché, un stand agrandi, un revenu de famille consolidé.</p>
                  <div className="stat-line">→ +1.6 emploi moyen créé par MPME 12 mois post-crédit (étude pilote)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section>
          <div className="container">
            <div className="impact-map reveal">
              <div>
                <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Phase 1 · UEMOA</span>
                <h2 className="h1" style={{ marginTop: "16px", maxWidth: "14ch" }}>5 pays. 500 000 MPME ciblées.</h2>
                <p className="muted" style={{ marginTop: "18px", maxWidth: "44ch", color: "rgba(255,255,255,0.65)" }}>
                  Déploiement priorisé sur l'UEMOA pour bénéficier d'un cadre réglementaire et monétaire unifié. Phase 2 : CEMAC, EAC et Afrique anglophone.
                </p>
              </div>
              <div className="map-svg">
                <svg viewBox="0 0 400 400" fill="none">
                  <g fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1">
                    <path d="M180 60 L250 60 L290 90 L300 140 L310 180 L300 230 L290 280 L260 320 L230 350 L200 360 L170 350 L150 320 L130 290 L120 250 L115 210 L120 170 L130 130 L150 90 Z" />
                  </g>
                  <g fill="rgba(0,194,168,0.15)" stroke="#00C2A8" strokeWidth="1.4">
                    <path d="M125 130 L195 125 L220 155 L210 200 L180 220 L150 215 L130 195 L115 165 Z" />
                  </g>
                  <g>
                    <circle cx="135" cy="170" r="6" fill="#00C2A8" />
                    <text x="146" y="174" fill="white" fontFamily="Inter" fontSize="11" fontWeight="500">Bamako</text>
                    <circle cx="175" cy="190" r="6" fill="#00C2A8" />
                    <text x="186" y="194" fill="white" fontFamily="Inter" fontSize="11" fontWeight="500">Ouagadougou</text>
                    <circle cx="160" cy="200" r="6" fill="#0057FF" />
                    <text x="100" y="225" fill="white" fontFamily="Inter" fontSize="11" fontWeight="500">Abidjan</text>
                    <circle cx="200" cy="210" r="7" fill="#0057FF" />
                    <text x="210" y="214" fill="white" fontFamily="Inter" fontSize="11" fontWeight="600">Cotonou · HQ</text>
                    <circle cx="125" cy="155" r="6" fill="#00C2A8" />
                    <text x="40" y="158" fill="white" fontFamily="Inter" fontSize="11" fontWeight="500">Dakar</text>
                    <circle cx="190" cy="220" r="6" fill="#00C2A8" />
                    <text x="200" y="240" fill="white" fontFamily="Inter" fontSize="11" fontWeight="500">Lomé</text>
                  </g>
                  <g stroke="rgba(0,194,168,0.4)" strokeWidth="1" strokeDasharray="3 3" fill="none">
                    <line x1="200" y1="210" x2="135" y2="170" />
                    <line x1="200" y1="210" x2="175" y2="190" />
                    <line x1="200" y1="210" x2="160" y2="200" />
                    <line x1="200" y1="210" x2="125" y2="155" />
                    <line x1="200" y1="210" x2="190" y2="220" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SDG */}
        <section className="bg-grey">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Objectifs de développement durable</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Aligné sur les ODD 8 &amp; 10.</h2>
              </div>
              <p className="muted reveal" data-delay="2" style={{ maxWidth: "360px", margin: 0 }}>
                Nous mesurons notre impact selon les indicateurs des Nations Unies. Reporting annuel public.
              </p>
            </div>
            <div className="sdgs">
              <div className="sdg sdg8 reveal">
                <div className="num">08</div>
                <div>
                  <span className="tag">ODD 8</span>
                  <h3>Travail décent et croissance économique</h3>
                  <p>Soutenir la productivité des micro-entreprises, formaliser les emplois informels, encourager l'entrepreneuriat féminin.</p>
                </div>
              </div>
              <div className="sdg sdg10 reveal" data-delay="1">
                <div className="num">10</div>
                <div>
                  <span className="tag">ODD 10</span>
                  <h3>Réduction des inégalités</h3>
                  <p>Donner accès aux services financiers aux populations exclues et aux MPME des zones rurales et péri-urbaines.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="tight">
          <div className="container">
            <div className="cta-banner reveal">
              <div>
                <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Impact partners</span>
                <h2 className="h2" style={{ marginTop: "12px", maxWidth: "22ch" }}>Mesurons l'impact ensemble.</h2>
                <p className="muted" style={{ margin: "16px 0 0", maxWidth: "44ch" }}>
                  Bailleurs, fondations, agences de développement — discutons d'un programme conjoint.
                </p>
              </div>
              <div className="actions">
                <Link href="/contact" className="btn primary">Devenir partenaire impact</Link>
                <Link href="/partners" className="btn outline">Investir</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
