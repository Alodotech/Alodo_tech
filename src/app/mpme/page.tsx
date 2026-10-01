"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/client";
import { DIMENSIONS } from "@/lib/mpme/questions";
import "./mpme.css";

export default function MpmeLandingPage() {
  const router = useRouter();
  const handleHeroApply = () => {
    router.push("/mpme/diagnostic");
  };

  return (
    <>
      <Navbar activeKey="mpme" />

      <main>
        {/* =========================================================================
            1. HERO SECTION (SPACIOUS, TYPOGRAPHIC, NO IMAGE)
            ========================================================================= */}
        <section className="mpme-hero">
          <div className="container" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Pill Badge */}
            <div className="mpme-pill" style={{ margin: "0 auto 24px auto" }}>
              <span className="badge">Cohorte 1</span>
              <span>20 Entreprises · Programme Bénin 2026</span>
            </div>

            {/* Display Headline */}
            <h1 style={{ textAlign: "center", margin: "0 auto", maxWidth: "920px" }}>
              <span className="accent">Structurez</span> votre entreprise. Renforcez votre capacité à grandir.
            </h1>

            {/* Breathable Lead Paragraph */}
            <p className="lead" style={{ textAlign: "center", margin: "24px auto 0 auto", maxWidth: "760px" }}>
              Le Programme MPME d’ALODO évalue la maturité de votre entreprise sur les principales dimensions de son fonctionnement afin d’identifier ses forces, ses points de vigilance et les actions prioritaires à engager.
            </p>
            
            <p style={{ textAlign: "center", marginTop: "16px", fontSize: "15px", color: "#6E6E73", fontWeight: 500 }}>
              Diagnostic gratuit • 8 dimensions d’analyse • Feuille de route personnalisée
            </p>

            {/* Action Buttons */}
            <div className="mpme-hero-actions" style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center", alignItems: "center", margin: "36px auto 0 auto" }}>
              <button
                onClick={handleHeroApply}
                className="btn primary"
                style={{ cursor: "pointer", fontSize: "16px", padding: "16px 36px" }}
              >
                Démarrer mon diagnostic →
              </button>
            </div>

            {/* Key Metrics / Stat Bar */}
            <div className="mpme-stats">
              <div className="mpme-stat-item">
                <div className="num accent">20</div>
                <div className="label">Places réservées pour la Cohorte 1</div>
              </div>
              <div className="mpme-stat-item">
                <div className="num teal">8</div>
                <div className="label">Dimensions d’analyse clés</div>
              </div>
              <div className="mpme-stat-item">
                <div className="num">100%</div>
                <div className="label">Diagnostic gratuit & pris en charge</div>
              </div>
              <div className="mpme-stat-item">
                <div className="num">90 Jours</div>
                <div className="label">Feuille de route personnalisée</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. CE QUE VOUS OBTENEZ À L'ISSUE DU DIAGNOSTIC
            ========================================================================= */}
        <section className="bg-white">
          <div className="container">
            <div className="section-head" style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 48px auto" }}>
              <div>
                <span className="eyebrow teal">Livrables Concrets</span>
                <h2>Ce que vous obtenez à l’issue du diagnostic</h2>
              </div>
              <p className="lead" style={{ margin: "16px auto 0 auto" }}>
                Une analyse claire de la situation de votre entreprise, accompagnée de recommandations concrètes pour orienter vos prochaines décisions.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#F0FDF4", color: "#16A34A" }}>
                    01
                  </div>
                  <h3>Une évaluation de votre maturité</h3>
                  <p>
                    Mesurez le niveau de structuration de votre entreprise à travers 8 dimensions clés de son fonctionnement.
                  </p>
                </div>
              </div>

              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#EFF6FF", color: "#2563EB" }}>
                    02
                  </div>
                  <h3>Une identification de vos priorités</h3>
                  <p>
                    Repérez vos principaux points forts, vos points de vigilance et les domaines qui nécessitent une attention particulière.
                  </p>
                </div>
              </div>

              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#FFF7ED", color: "#EA580C" }}>
                    03
                  </div>
                  <h3>Un rapport personnalisé</h3>
                  <p>
                    Recevez une synthèse de votre situation et des recommandations adaptées aux réalités de votre entreprise.
                  </p>
                </div>
              </div>

              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#FAF5FF", color: "#9333EA" }}>
                    04
                  </div>
                  <h3>Une feuille de route sur 90 jours</h3>
                  <p>
                    Disposez d’actions prioritaires et concrètes pour commencer à renforcer votre entreprise étape par étape.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. VOTRE ENTREPRISE ANALYSÉE SOUS 8 DIMENSIONS CLÉS
            ========================================================================= */}
        <section id="dimensions" className="bg-grey">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow teal">Méthodologie ALODO</span>
                <h2>Votre entreprise analysée sous 8 dimensions clés</h2>
              </div>
              <p className="lead" style={{ maxWidth: "560px" }}>
                Pour comprendre réellement la situation d’une entreprise, il ne suffit pas de regarder son chiffre d’affaires. Le diagnostic ALODO examine les principales dimensions qui influencent sa structuration, son fonctionnement et sa capacité à se développer.
              </p>
            </div>

            <div className="dimensions-grid">
              {DIMENSIONS.map((dim, idx) => (
                <div key={dim.id} className="dimension-card">
                  <div>
                    <div className="top-row">
                      <span className="idx">0{idx + 1}</span>
                      <span className="weight">Poids {dim.weight}%</span>
                    </div>
                    <h3>{dim.title}</h3>
                    <p>{dim.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. UNE VISION CLAIRE DE LA MATURITÉ DE VOTRE ENTREPRISE
            ========================================================================= */}
        <section className="bg-white">
          <div className="container">
            <div className="section-head" style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 48px auto" }}>
              <div>
                <span className="eyebrow">Restitution & Décision</span>
                <h2>Une vision claire de la maturité de votre entreprise</h2>
              </div>
              <p className="lead" style={{ margin: "16px auto 0 auto" }}>
                À l’issue du diagnostic, vous obtenez une lecture synthétique de la situation de votre entreprise et des domaines qui méritent votre attention.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#FFF7ED", color: "#EC663B" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4M12 16V8"/></svg>
                  </div>
                  <h3>Votre score de maturité</h3>
                  <p>Un indicateur global permettant de situer le niveau de structuration de votre entreprise.</p>
                </div>
              </div>

              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#EFF6FF", color: "#2563EB" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                  </div>
                  <h3>Votre profil par dimension</h3>
                  <p>Une lecture de votre niveau sur chacune des 8 dimensions.</p>
                </div>
              </div>

              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#FEF3C7", color: "#D97706" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  </div>
                  <h3>Vos priorités</h3>
                  <p>Les principaux points de vigilance et les domaines à traiter en priorité.</p>
                </div>
              </div>

              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#ECFDF5", color: "#059669" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <h3>Votre feuille de route</h3>
                  <p>Des recommandations et actions prioritaires à mettre en œuvre sur les 90 prochains jours.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. COMMENT ÇA FONCTIONNE ? (LE PARCOURS EN 5 ÉTAPES)
            ========================================================================= */}
        <section className="bg-grey">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">Le Parcours</span>
                <h2>Comment ça fonctionne ?</h2>
              </div>
              <p className="lead" style={{ maxWidth: "520px" }}>
                Un cheminement clair en 5 étapes pour faire votre diagnostic et passer à l'action.
              </p>
            </div>

            <div className="steps-grid">
              {[
                {
                  step: "01",
                  title: "Démarrer mon diagnostic",
                  desc: "Vous renseignez les principales informations sur votre entreprise.",
                },
                {
                  step: "02",
                  title: "Évaluer votre entreprise",
                  desc: "Votre entreprise est analysée à travers les 8 dimensions du diagnostic.",
                },
                {
                  step: "03",
                  title: "Recevoir vos résultats",
                  desc: "Vous obtenez votre profil de maturité, vos priorités et vos recommandations.",
                },
                {
                  step: "04",
                  title: "Votre feuille de route",
                  desc: "Vous identifiez les actions prioritaires à engager sur les 90 prochains jours.",
                },
                {
                  step: "05",
                  title: "Passer à l'action",
                  desc: "Si vous souhaitez aller plus loin, ALODO vous accompagne pour définir les prochaines étapes.",
                },
              ].map((st) => (
                <div key={st.step} className="step-card">
                  <div className="step-num">{st.step}</div>
                  <h3>{st.title}</h3>
                  <p>{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. POURQUOI ALODO ?
            ========================================================================= */}
        <section className="bg-white">
          <div className="container">
            <div className="section-head" style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px auto" }}>
              <div>
                <span className="eyebrow teal">Notre Approche</span>
                <h2>Pourquoi ALODO ?</h2>
              </div>
              <p className="lead" style={{ margin: "16px auto 0 auto" }}>
                Un accompagnement pensé pour vous apporter clarté et leviers d'action concrets.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", maxWidth: "1000px", margin: "0 auto" }}>
              <div className="problem-card">
                <div className="num-badge" style={{ background: "#EFF6FF", color: "#2563EB" }}>
                  360°
                </div>
                <h3>Une vision à 360°</h3>
                <p>8 dimensions pour comprendre les principaux enjeux de votre entreprise.</p>
              </div>

              <div className="problem-card">
                <div className="num-badge" style={{ background: "#FFF7ED", color: "#EC663B" }}>
                  90j
                </div>
                <h3>Des recommandations concrètes</h3>
                <p>Des priorités clairement identifiées et une feuille de route sur 90 jours.</p>
              </div>

              <div className="problem-card">
                <div className="num-badge" style={{ background: "#ECFDF5", color: "#059669" }}>
                  Local
                </div>
                <h3>Une approche adaptée au contexte local</h3>
                <p>Une analyse pensée pour les réalités des entreprises béninoises.</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. ENCADRÉ D'APPEL À L'ACTION
            ========================================================================= */}
        <section className="bg-grey">
          <div className="container">
            <div className="cta-box">
              <span className="eyebrow" style={{ marginBottom: "16px" }}>
                Diagnostic gratuit • Première cohorte : 20 entreprises
              </span>
              <h2>Prêt à faire le point sur votre entreprise ?</h2>
              <p>
                Découvrez votre niveau de maturité, identifiez vos priorités et, si vous le souhaitez, engagez les prochaines étapes avec ALODO.
              </p>
              <div style={{ marginTop: "32px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <button
                  onClick={handleHeroApply}
                  className="btn primary"
                  style={{ cursor: "pointer", fontSize: "16px", padding: "16px 36px" }}
                >
                  Participer au Programme MPME →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. FAQ
            ========================================================================= */}
        <section className="bg-white">
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 40px" }}>
              <span className="eyebrow" style={{ marginBottom: "12px" }}>Questions Fréquentes</span>
              <h2>Tout ce que vous devez savoir</h2>
            </div>

            <div className="faq-grid">
              {[
                {
                  q: "Le diagnostic est-il vraiment gratuit ?",
                  a: "Oui. Le diagnostic proposé dans le cadre de cette cohorte est entièrement gratuit pour les entreprises retenues.",
                },
                {
                  q: "Le diagnostic garantit-il l'obtention d'un financement ?",
                  a: "Non. Le diagnostic permet d’identifier les éléments à renforcer pour améliorer la structuration et la capacité de l’entreprise à présenter un dossier solide à un potentiel financeur. Il ne garantit pas l’obtention d’un financement.",
                },
                {
                  q: "Combien de temps prend le formulaire de candidature ?",
                  a: "Moins de 5 minutes. Seules les informations essentielles sur votre identité, votre activité et vos besoins sont demandées.",
                },
                {
                  q: "Que se passe-t-il si mon entreprise n'est pas retenue ?",
                  a: "Votre candidature peut vous permettre de rejoindre la Communauté des MPME d’ALODO, si vous choisissez d’y adhérer. Vous pourrez ainsi rester informé des ressources, opportunités et prochaines initiatives proposées par ALODO.",
                },
              ].map((faq, i) => (
                <div key={i} className="faq-card">
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER OFFICIEL ALODO TECH */}
      <Footer />
    </>
  );
}
