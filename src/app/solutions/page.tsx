"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./solutions.css";

export default function Solutions() {
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
      <Navbar activeKey="solutions" />

      <main data-screen-label="05 Solutions B2B">
        {/* Hero */}
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow reveal">Solutions B2B</span>
            <h1 className="display reveal" data-delay="1" style={{ marginTop: "18px", maxWidth: "18ch" }}>
              Le pont entre l'économie informelle et les institutions.
            </h1>
            <p className="lead reveal" data-delay="2">
              Trois manières de déployer nos infrastructures digitales :
              directement pour digitaliser vos réseaux, via API pour vos décisions de crédit,
              ou en programme national d'inclusion financière.
            </p>
            <div className="seg-nav reveal" data-delay="3">
              <a href="#mpme" className="on">Pour les MPME</a>
              <a href="#institutions">Pour les institutions</a>
              <a href="#gouvernements">Pour les gouvernements</a>
            </div>
          </div>
        </section>

        {/* MPME */}
        <section id="mpme" className="bg-grey">
          <div className="container">
            <div className="seg reveal">
              <div>
                <span className="tag blue">01 · MPME</span>
                <h2 className="h2" style={{ marginTop: "14px" }}>Digitalisez vos MPME, libérez leur crédit.</h2>
                <p className="lead" style={{ marginTop: "16px", maxWidth: "44ch" }}>
                  Pour les coopératives, fédérations professionnelles et programmes
                  d'accompagnement qui veulent équiper leurs membres.
                </p>
                <ul className="feat-list">
                  <li>
                    <svg className="ic" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 11l4 4 9-9" /></svg>
                    <div><b>Comptabilité automatique</b><p>Chaque vente est saisie, catégorisée, archivée — sans saisie manuelle.</p></div>
                  </li>
                  <li>
                    <svg className="ic" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 11l4 4 9-9" /></svg>
                    <div><b>Score financier portable</b><p>Le score s'enrichit dans le temps — la MPME le présente à toute IMF partenaire.</p></div>
                  </li>
                  <li>
                    <svg className="ic" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 11l4 4 9-9" /></svg>
                    <div><b>Passerelle crédit</b><p>Découvrir et activer des offres pré-approuvées depuis WhatsApp, sans aller en agence.</p></div>
                  </li>
                </ul>
              </div>
              <div className="seg-viz reveal" data-delay="1">
                <div className="mpme-card">
                  <div className="head">
                    <div>
                      <div className="name">Amara Boutique · Cotonou</div>
                      <p className="muted" style={{ margin: "4px 0 0", fontSize: "13px" }}>Tissu &amp; pagne · 6 mois d'historique</p>
                    </div>
                    <span className="tag blue">A−</span>
                  </div>
                  <div className="score">782<span style={{ fontSize: "14px", color: "var(--grey-500)", fontWeight: 500, marginLeft: "6px" }}>/ 850</span></div>
                  <div className="bar"><div className="bar-fill"></div></div>
                  <div className="row"><span>Régularité</span><b>96%</b></div>
                  <div className="row"><span>Croissance MoM</span><b>+11%</b></div>
                  <div className="row"><span>Panier moyen</span><b>3 850 F</b></div>
                </div>
                <div className="credit-chip">
                  <div className="l">Pré-approuvé</div>
                  <div className="v">150 000 F</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Institutions */}
        <section id="institutions">
          <div className="container">
            <div className="seg flip reveal">
              <div>
                <span className="tag teal">02 · Institutions financières</span>
                <h2 className="h2" style={{ marginTop: "14px" }}>API de scoring MPME basé sur les données terrain.</h2>
                <p className="lead" style={{ marginTop: "16px", maxWidth: "44ch" }}>
                  Pour les banques, IMF et fintechs qui veulent acquérir
                  le segment informel sans exploser leur taux de défaut.
                </p>
                <ul className="feat-list">
                  <li>
                    <svg className="ic" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 11l4 4 9-9" /></svg>
                    <div><b>Scoring temps réel</b><p>API REST. Réponse &lt; 300 ms. Score + facteurs explicatifs + niveau de confiance.</p></div>
                  </li>
                  <li>
                    <svg className="ic" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 11l4 4 9-9" /></svg>
                    <div><b>Réduction du risque crédit</b><p>Résultats constatés : une baisse significative des impayés sur les portefeuilles digitalisés via nos outils.</p></div>
                  </li>
                  <li>
                    <svg className="ic" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 11l4 4 9-9" /></svg>
                    <div><b>Acquisition client</b><p>Accès à des réseaux de MPME qualifiés : ciblage précis, opt-in transparent et conformité totale.</p></div>
                  </li>
                </ul>
              </div>
              <div className="seg-viz dark reveal" data-delay="1" style={{ padding: 0 }}>
                <div className="api-mock">
                  <span className="com"># 1 · Récupérer le score d'une MPME</span>{"\n"}
                  GET /v1/scoring/<span className="str">"alodo_8a2f"</span>{"\n"}
                  Authorization: Bearer sk_live_…{"\n\n"}
                  <span className="com"># 2 · Réponse</span>{"\n"}
                  {"{"}{"\n"}
                  {"  "}<span className="str">"score"</span>: <span className="num">782</span>,{"\n"}
                  {"  "}<span className="str">"grade"</span>: <span className="str">"A-"</span>,{"\n"}
                  {"  "}<span className="str">"confidence"</span>: <span className="num">0.91</span>,{"\n"}
                  {"  "}<span className="str">"factors"</span>: [{"\n"}
                  {"    "}{"{"} <span className="str">"name"</span>: <span className="str">"regularity"</span>,{"\n"}
                  {"      "}<span className="str">"weight"</span>: <span className="num">0.32</span> {"}"},{"\n"}
                  {"    "}{"{"} <span className="str">"name"</span>: <span className="str">"growth_mom"</span>,{"\n"}
                  {"      "}<span className="str">"weight"</span>: <span className="num">0.24</span> {"}"},{"\n"}
                  {"    "}{"{"} <span className="str">"name"</span>: <span className="str">"basket_avg"</span>,{"\n"}
                  {"      "}<span className="str">"weight"</span>: <span className="num">0.18</span> {"}"}{"\n"}
                  {"  "}],{"\n"}
                  {"  "}<span className="str">"recommended_limit"</span>: <span className="num">150000</span>,{"\n"}
                  {"  "}<span className="str">"updated_at"</span>: <span className="str">"2026-05-14T12:30Z"</span>{"\n"}
                  {"}"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Government */}
        <section id="gouvernements" className="bg-grey">
          <div className="container">
            <div className="seg reveal">
              <div>
                <span className="tag">03 · Gouvernements</span>
                <h2 className="h2" style={{ marginTop: "14px" }}>Pilotez votre politique d'inclusion financière.</h2>
                <p className="lead" style={{ marginTop: "16px", maxWidth: "44ch" }}>
                  Pour les ministères, banques centrales et agences de développement
                  qui ont besoin de données macro sur l'économie informelle.
                </p>
                <ul className="feat-list">
                  <li>
                    <svg className="ic" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 11l4 4 9-9" /></svg>
                    <div><b>Tableau de bord macro</b><p>Indicateurs en temps réel : taux de bancarisation, croissance MPME, géographie.</p></div>
                  </li>
                  <li>
                    <svg className="ic" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 11l4 4 9-9" /></svg>
                    <div><b>Programmes ciblés</b><p>Activer des subventions ou bons d'achat pour cohortes MPME identifiées.</p></div>
                  </li>
                  <li>
                    <svg className="ic" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 11l4 4 9-9" /></svg>
                    <div><b>Partenariat national</b><p>Programme conjoint de digitalisation déployable sur l'ensemble du territoire.</p></div>
                  </li>
                </ul>
              </div>
              <div className="seg-viz reveal" data-delay="1" style={{ padding: 0, background: "white", border: "1px solid var(--grey-100)" }}>
                <div className="gov-map">
                  <div className="h">
                    <div className="title">Tableau · Inclusion MPME</div>
                    <div className="stamp">UEMOA · S20 2026</div>
                  </div>
                  <div className="gov-stats">
                    <div><div className="v">324K</div><div className="l">MPME enregistrées</div></div>
                    <div><div className="v">+8.1%</div><div className="l">vs trimestre précédent</div></div>
                    <div><div className="v">61%</div><div className="l">digitalisées via nos solutions</div></div>
                  </div>
                  <div className="gov-bars">
                    <div className="bar"><span className="cn">Bénin</span><span className="fill"><div style={{ width: "82%" }}></div></span><span className="pc">82%</span></div>
                    <div className="bar"><span className="cn">Togo</span><span className="fill"><div style={{ width: "74%" }}></div></span><span className="pc">74%</span></div>
                    <div className="bar"><span className="cn">Côte d'Ivoire</span><span className="fill"><div style={{ width: "68%" }}></div></span><span className="pc">68%</span></div>
                    <div className="bar"><span className="cn">Sénégal</span><span className="fill"><div style={{ width: "61%" }}></div></span><span className="pc">61%</span></div>
                    <div className="bar"><span className="cn">Burkina Faso</span><span className="fill"><div style={{ width: "48%" }}></div></span><span className="pc">48%</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section>
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Ce que nos partenaires obtiennent</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Résultats mesurables.</h2>
              </div>
            </div>
            <div className="outcomes">
              <div className="card hover reveal">
                <div className="stat"><div className="value blue">−42%</div><div className="label">de réduction du risque de défaut sur les portefeuilles digitalisés.</div></div>
              </div>
              <div className="card hover reveal" data-delay="1">
                <div className="stat"><div className="value teal">×3.4</div><div className="label">d'acquisition MPME par mois pour les IMF partenaires</div></div>
              </div>
              <div className="card hover reveal" data-delay="2">
                <div className="stat"><div className="value">&lt; 48h</div><div className="label">délai moyen de décision crédit (vs 3 semaines en moyenne IMF)</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="tight">
          <div className="container">
            <div className="cta-banner reveal">
              <div>
                <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Pilote · Partenariat</span>
                <h2 className="h2" style={{ marginTop: "12px", maxWidth: "18ch" }}>Discutons d'un déploiement dans votre territoire.</h2>
              </div>
              <div className="actions">
                <Link href="/contact" className="btn primary">Demander un pilote</Link>
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
