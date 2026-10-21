"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/client";
import { DIMENSIONS } from "@/lib/mpme/questions";
import { useLang } from "@/i18n/LanguageProvider";
import "./mpme.css";

const DIM_EN: Record<string, { title: string; description: string }> = {
  formalisation: { title: "Formalization", description: "Is the business properly structured from an administrative and legal standpoint?" },
  finance: { title: "Finance", description: "Do you control cash, costs, revenue and the main financial indicators?" },
  comptabilite: { title: "Accounting", description: "Do you have reliable, regularly kept accounting information to run the business?" },
  fiscalite: { title: "Tax & compliance", description: "Are filing and tax obligations under control, with supporting documents kept properly?" },
  commercial: { title: "Commercial", description: "Does your commercial setup let you win and keep customers?" },
  digitalisation: { title: "Digitalization", description: "How far do digital tools contribute to the efficiency of the business?" },
  operations: { title: "Operations", description: "Do your processes and organization let the business run effectively?" },
  rh: { title: "Human resources", description: "Is the organization set up to manage and develop the team?" },
  financabilite: { title: "Bankability", description: "Does the business have what it needs to present a solid file to a potential funder? Bankability does not guarantee funding." },
};

export default function MpmeLandingPage() {
  const router = useRouter();
  const { lang } = useLang();
  const en = lang === "en";
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
              <span className="badge">{en ? "Cohort 1" : "Cohorte 1"}</span>
              <span>{en ? "20 companies · Benin program 2026" : "20 Entreprises · Programme Bénin 2026"}</span>
            </div>

            {/* Display Headline */}
            <h1 style={{ textAlign: "center", margin: "0 auto", maxWidth: "920px" }}>
              {en ? <><span className="accent">Structure</span> your business. Strengthen your ability to grow.</> : <><span className="accent">Structurez</span> votre entreprise. Renforcez votre capacité à grandir.</>}
            </h1>

            {/* Breathable Lead Paragraph */}
            <p className="lead" style={{ textAlign: "center", margin: "24px auto 0 auto", maxWidth: "760px" }}>
              {en
                ? "ALODO's MSME Program assesses how mature your business is across the main dimensions of how it operates, so you can see strengths, watchpoints and the priority actions to take."
                : "Le Programme MPME d’ALODO évalue la maturité de votre entreprise sur les principales dimensions de son fonctionnement afin d’identifier ses forces, ses points de vigilance et les actions prioritaires à engager."}
            </p>
            
            <p style={{ textAlign: "center", marginTop: "16px", fontSize: "15px", color: "#6E6E73", fontWeight: 500 }}>
              {en ? "Free diagnostic • 9 dimensions • Personalized roadmap" : "Diagnostic gratuit • 9 dimensions d’analyse • Feuille de route personnalisée"}
            </p>

            {/* Action Buttons */}
            <div className="mpme-hero-actions" style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center", alignItems: "center", margin: "36px auto 0 auto" }}>
              <button
                onClick={handleHeroApply}
                className="btn primary"
                style={{ cursor: "pointer", fontSize: "16px", padding: "16px 36px" }}
              >
                {en ? "Start my diagnostic →" : "Démarrer mon diagnostic →"}
              </button>

              <a
                href="#presentation-video"
                style={{
                  cursor: "pointer",
                  fontSize: "15px",
                  padding: "15px 26px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  textDecoration: "none",
                  borderRadius: "12px",
                  border: "1px solid #E5E7EB",
                  background: "#FFFFFF",
                  color: "#1F2937",
                  fontWeight: 600,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                  transition: "all 0.2s ease"
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "rgba(236, 102, 59, 0.12)",
                    color: "#EC663B",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6 4 20 12 6 20 6 4" />
                  </svg>
                </span>
                {en ? "Watch the video (1 min)" : "Voir la vidéo (1 min)"}
              </a>
            </div>

            {/* Key Metrics / Stat Bar */}
            <div className="mpme-stats">
              <div className="mpme-stat-item">
                <div className="num accent">20</div>
                <div className="label">{en ? "Seats reserved for Cohort 1" : "Places réservées pour la Cohorte 1"}</div>
              </div>
              <div className="mpme-stat-item">
                <div className="num teal">9</div>
                <div className="label">{en ? "Key analysis dimensions" : "Dimensions d’analyse clés"}</div>
              </div>
              <div className="mpme-stat-item">
                <div className="num">100%</div>
                <div className="label">{en ? "Free diagnostic, fully covered" : "Diagnostic gratuit & pris en charge"}</div>
              </div>
              <div className="mpme-stat-item">
                <div className="num">90 Jours</div>
                <div className="label">{en ? "Personalized roadmap" : "Feuille de route personnalisée"}</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            1.5 PRÉSENTATION VIDÉO DU PROGRAMME
            ========================================================================= */}
        <section id="presentation-video" className="bg-white" style={{ padding: "72px 0 80px 0", borderBottom: "1px solid var(--grey-100)" }}>
          <div className="container" style={{ maxWidth: "1000px" }}>
            <div className="section-head" style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 36px auto" }}>
              <div>
                <span className="eyebrow teal">{en ? "Video presentation" : "Présentation Vidéo"}</span>
                <h2>{en ? "Understand the MSME Program in 1 minute" : "Comprendre le Programme MPME en 1 minute"}</h2>
              </div>
              <p className="lead" style={{ margin: "16px auto 0 auto" }}>
                {en
                  ? "Discover how the ALODO diagnostic evaluates your business maturity and guides your growth roadmap."
                  : "Découvrez en images comment le diagnostic ALODO évalue la maturité de votre entreprise et guide votre feuille de route."}
              </p>
            </div>

            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "920px",
                margin: "0 auto",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 20px 45px -15px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.06)",
                background: "#000000",
                aspectRatio: "16 / 9",
              }}
            >
              <video
                controls
                playsInline
                preload="metadata"
                poster="/assets/videos/poster-diagnostic.jpg"
                style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
              >
                <source src="/assets/videos/alodo-diagnostic-v11.mp4" type="video/mp4" />
                {en ? "Your browser does not support the video tag." : "Votre navigateur ne supporte pas la lecture de vidéos."}
              </video>
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
                <span className="eyebrow teal">{en ? "Concrete deliverables" : "Livrables Concrets"}</span>
                <h2>{en ? "What you get from the diagnostic" : "Ce que vous obtenez à l’issue du diagnostic"}</h2>
              </div>
              <p className="lead" style={{ margin: "16px auto 0 auto" }}>
                {en
                  ? "A clear reading of your business, with concrete recommendations for the next decisions."
                  : "Une analyse claire de la situation de votre entreprise, accompagnée de recommandations concrètes pour orienter vos prochaines décisions."}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#F0FDF4", color: "#16A34A" }}>
                    01
                  </div>
                  <h3>{en ? "A maturity assessment" : "Une évaluation de votre maturité"}</h3>
                  <p>
                    {en ? "Measure how structured your business is across 9 key dimensions of how it operates." : "Mesurez le niveau de structuration de votre entreprise à travers 9 dimensions clés de son fonctionnement."}
                  </p>
                </div>
              </div>

              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#EFF6FF", color: "#2563EB" }}>
                    02
                  </div>
                  <h3>{en ? "Your priorities, identified" : "Une identification de vos priorités"}</h3>
                  <p>
                    {en ? "See your main strengths, watchpoints and the areas that need attention." : "Repérez vos principaux points forts, vos points de vigilance et les domaines qui nécessitent une attention particulière."}
                  </p>
                </div>
              </div>

              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#FFF7ED", color: "#EA580C" }}>
                    03
                  </div>
                  <h3>{en ? "A personalized report" : "Un rapport personnalisé"}</h3>
                  <p>
                    {en ? "Receive a summary of your situation and recommendations fitted to your business." : "Recevez une synthèse de votre situation et des recommandations adaptées aux réalités de votre entreprise."}
                  </p>
                </div>
              </div>

              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#FAF5FF", color: "#9333EA" }}>
                    04
                  </div>
                  <h3>{en ? "A 90-day roadmap" : "Une feuille de route sur 90 jours"}</h3>
                  <p>
                    {en ? "Get concrete priority actions to strengthen the business step by step." : "Disposez d’actions prioritaires et concrètes pour commencer à renforcer votre entreprise étape par étape."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. VOTRE ENTREPRISE ANALYSÉE SOUS 9 DIMENSIONS CLÉS
            ========================================================================= */}
        <section id="dimensions" className="bg-grey">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow teal">{en ? "ALODO method" : "Méthodologie ALODO"}</span>
                <h2>{en ? "Your business, read across 9 key dimensions" : "Votre entreprise analysée sous 9 dimensions clés"}</h2>
              </div>
              <p className="lead" style={{ maxWidth: "560px" }}>
                {en
                  ? "Understanding a business takes more than revenue. The ALODO diagnostic looks at the dimensions that shape how it is structured, how it runs and how it can grow."
                  : "Pour comprendre réellement la situation d’une entreprise, il ne suffit pas de regarder son chiffre d’affaires. Le diagnostic ALODO examine les principales dimensions qui influencent sa structuration, son fonctionnement et sa capacité à se développer."}
              </p>
            </div>

            <div className="dimensions-grid">
              {DIMENSIONS.map((dim, idx) => (
                <div key={dim.id} className="dimension-card">
                  <div>
                    <div className="top-row">
                      <span className="idx">0{idx + 1}</span>
                      <span className="weight">{en ? "Weight" : "Poids"} {dim.weight}%</span>
                    </div>
                    <h3>{en ? (DIM_EN[dim.id]?.title ?? dim.title) : dim.title}</h3>
                    <p>{en ? (DIM_EN[dim.id]?.description ?? dim.description) : dim.description}</p>
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
                <span className="eyebrow">{en ? "Results & decisions" : "Restitution & Décision"}</span>
                <h2>{en ? "A clear view of your business maturity" : "Une vision claire de la maturité de votre entreprise"}</h2>
              </div>
              <p className="lead" style={{ margin: "16px auto 0 auto" }}>
                {en
                  ? "After the diagnostic, you get a concise reading of the business and of the areas that deserve attention."
                  : "À l’issue du diagnostic, vous obtenez une lecture synthétique de la situation de votre entreprise et des domaines qui méritent votre attention."}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#FFF7ED", color: "#EC663B" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4M12 16V8"/></svg>
                  </div>
                  <h3>{en ? "Your maturity score" : "Votre score de maturité"}</h3>
                  <p>{en ? "A global indicator of how structured the business is." : "Un indicateur global permettant de situer le niveau de structuration de votre entreprise."}</p>
                </div>
              </div>

              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#EFF6FF", color: "#2563EB" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                  </div>
                  <h3>{en ? "Your profile by dimension" : "Votre profil par dimension"}</h3>
                  <p>{en ? "A reading of your level on each of the 9 dimensions." : "Une lecture de votre niveau sur chacune des 9 dimensions."}</p>
                </div>
              </div>

              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#FEF3C7", color: "#D97706" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  </div>
                  <h3>{en ? "Your priorities" : "Vos priorités"}</h3>
                  <p>{en ? "The main watchpoints and the areas to address first." : "Les principaux points de vigilance et les domaines à traiter en priorité."}</p>
                </div>
              </div>

              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#ECFDF5", color: "#059669" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <h3>{en ? "Your roadmap" : "Votre feuille de route"}</h3>
                  <p>{en ? "Recommendations and priority actions for the next 90 days." : "Des recommandations et actions prioritaires à mettre en œuvre sur les 90 prochains jours."}</p>
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
                <span className="eyebrow">{en ? "The path" : "Le Parcours"}</span>
                <h2>{en ? "How does it work?" : "Comment ça fonctionne ?"}</h2>
              </div>
              <p className="lead" style={{ maxWidth: "520px" }}>
                {en
                  ? "A clear path in 5 steps to complete the diagnostic and move to action."
                  : "Un cheminement clair en 5 étapes pour faire votre diagnostic et passer à l'action."}
              </p>
            </div>

            <div className="steps-grid">
              {[
                {
                  step: "01",
                  title: en ? "Start the diagnostic" : "Démarrer mon diagnostic",
                  desc: en ? "You enter the main information about your business." : "Vous renseignez les principales informations sur votre entreprise.",
                },
                {
                  step: "02",
                  title: en ? "Assess the business" : "Évaluer votre entreprise",
                  desc: en ? "The business is analyzed across the 9 diagnostic dimensions." : "Votre entreprise est analysée à travers les 9 dimensions du diagnostic.",
                },
                {
                  step: "03",
                  title: en ? "Receive your results" : "Recevoir vos résultats",
                  desc: en ? "You get your maturity profile, priorities and recommendations." : "Vous obtenez votre profil de maturité, vos priorités et vos recommandations.",
                },
                {
                  step: "04",
                  title: en ? "Your roadmap" : "Votre feuille de route",
                  desc: en ? "You identify the priority actions for the next 90 days." : "Vous identifiez les actions prioritaires à engager sur les 90 prochains jours.",
                },
                {
                  step: "05",
                  title: en ? "Take action" : "Passer à l'action",
                  desc: en ? "If you want to go further, ALODO helps define the next steps." : "Si vous souhaitez aller plus loin, ALODO vous accompagne pour définir les prochaines étapes.",
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
                <span className="eyebrow teal">{en ? "Our approach" : "Notre Approche"}</span>
                <h2>{en ? "Why ALODO?" : "Pourquoi ALODO ?"}</h2>
              </div>
              <p className="lead" style={{ margin: "16px auto 0 auto" }}>
                {en
                  ? "Support designed to give you clarity and concrete levers for action."
                  : "Un accompagnement pensé pour vous apporter clarté et leviers d'action concrets."}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", maxWidth: "1000px", margin: "0 auto" }}>
              <div className="problem-card">
                <div className="num-badge" style={{ background: "#EFF6FF", color: "#2563EB" }}>
                  360°
                </div>
                <h3>{en ? "A 360° view" : "Une vision à 360°"}</h3>
                <p>{en ? "9 dimensions to understand the main issues of the business." : "9 dimensions pour comprendre les principaux enjeux de votre entreprise."}</p>
              </div>

              <div className="problem-card">
                <div className="num-badge" style={{ background: "#FFF7ED", color: "#EC663B" }}>
                  90j
                </div>
                <h3>{en ? "Concrete recommendations" : "Des recommandations concrètes"}</h3>
                <p>{en ? "Clearly identified priorities and a 90-day roadmap." : "Des priorités clairement identifiées et une feuille de route sur 90 jours."}</p>
              </div>

              <div className="problem-card">
                <div className="num-badge" style={{ background: "#ECFDF5", color: "#059669" }}>
                  Local
                </div>
                <h3>{en ? "An approach fitted to the local context" : "Une approche adaptée au contexte local"}</h3>
                <p>{en ? "An analysis built for the realities of Beninese businesses." : "Une analyse pensée pour les réalités des entreprises béninoises."}</p>
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
                {en ? "Free diagnostic • First cohort: 20 companies" : "Diagnostic gratuit • Première cohorte : 20 entreprises"}
              </span>
              <h2>{en ? "Ready to take stock of your business?" : "Prêt à faire le point sur votre entreprise ?"}</h2>
              <p>
                {en
                  ? "See your maturity level, identify your priorities and, if you want, take the next steps with ALODO."
                  : "Découvrez votre niveau de maturité, identifiez vos priorités et, si vous le souhaitez, engagez les prochaines étapes avec ALODO."}
              </p>
              <div style={{ marginTop: "32px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <button
                  onClick={handleHeroApply}
                  className="btn primary"
                  style={{ cursor: "pointer", fontSize: "16px", padding: "16px 36px" }}
                >
                  {en ? "Join the MSME Program →" : "Participer au Programme MPME →"}
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
              <span className="eyebrow" style={{ marginBottom: "12px" }}>{en ? "Frequently asked questions" : "Questions Fréquentes"}</span>
              <h2>{en ? "What you need to know" : "Tout ce que vous devez savoir"}</h2>
            </div>

            <div className="faq-grid">
              {[
                {
                  q: en ? "Is the diagnostic really free?" : "Le diagnostic est-il vraiment gratuit ?",
                  a: en ? "Yes. The diagnostic offered in this cohort is entirely free for selected companies." : "Oui. Le diagnostic proposé dans le cadre de cette cohorte est entièrement gratuit pour les entreprises retenues.",
                },
                {
                  q: en ? "Does the diagnostic guarantee funding?" : "Le diagnostic garantit-il l'obtention d'un financement ?",
                  a: en ? "No. It shows what to strengthen so the business can present a solid file to a potential funder. It does not guarantee funding." : "Non. Le diagnostic permet d’identifier les éléments à renforcer pour améliorer la structuration et la capacité de l’entreprise à présenter un dossier solide à un potentiel financeur. Il ne garantit pas l’obtention d’un financement.",
                },
                {
                  q: en ? "How long does the application form take?" : "Combien de temps prend le formulaire de candidature ?",
                  a: en ? "Less than 5 minutes. Only the essential information about your identity, activity and needs is requested." : "Moins de 5 minutes. Seules les informations essentielles sur votre identité, votre activité et vos besoins sont demandées.",
                },
                {
                  q: en ? "What if my business is not selected?" : "Que se passe-t-il si mon entreprise n'est pas retenue ?",
                  a: en ? "You join the ALODO MSME community and stay informed about resources, opportunities, workshops and upcoming initiatives." : "Votre participation vous permet de rejoindre directement la Communauté des MPME d’ALODO afin de rester informé des ressources, opportunités, ateliers et prochaines initiatives de notre écosystème.",
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
