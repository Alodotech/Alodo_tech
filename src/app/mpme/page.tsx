"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAuthModal from "@/components/GoogleAuthModal";
import { MpmeStorage } from "@/lib/mpme/storage";
import { DIMENSIONS } from "@/lib/mpme/questions";
import "./mpme.css";

export default function MpmeLandingPage() {
  const router = useRouter();
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [authDestination, setAuthDestination] = useState<"candidature" | "dashboard">("candidature");

  const handleHeroApply = () => {
    setAuthDestination("candidature");
    const user = MpmeStorage.getCurrentUser();
    if (user) {
      const existingApp = MpmeStorage.getUserApplication(user.email || user.companyId);
      if (existingApp) {
        router.push("/mpme/dashboard");
      } else {
        router.push("/mpme/candidature");
      }
    } else {
      setShowGoogleModal(true);
    }
  };

  const handleHeroLogin = () => {
    setAuthDestination("dashboard");
    const user = MpmeStorage.getCurrentUser();
    if (user) {
      if (user.role === "Admin") {
        router.push("/admin/candidatures");
      } else {
        router.push("/mpme/dashboard");
      }
    } else {
      setShowGoogleModal(true);
    }
  };

  const handleGoogleSuccess = (email: string, name: string) => {
    const res = MpmeStorage.loginWithGoogle(email, name);
    if (authDestination === "dashboard" || res.user.role === "Admin") {
      if (res.user.role === "Admin") {
        router.push("/admin/candidatures");
      } else {
        router.push("/mpme/dashboard");
      }
    } else {
      const existingApp = MpmeStorage.getUserApplication(email);
      if (existingApp) {
        router.push("/mpme/dashboard");
      } else {
        router.push("/mpme/candidature");
      }
    }
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
              De l'activité informelle à une entreprise <span className="accent">structurée</span> et finançable.
            </h1>

            {/* Breathable Lead Paragraph */}
            <p className="lead" style={{ textAlign: "center", margin: "24px auto 0 auto", maxWidth: "760px" }}>
              Évaluez la maturité opérationnelle et financière de votre MPME sur 8 dimensions stratégiques.
              Obtenez un diagnostic gratuit, un plan d'action opérationnel à 90 jours et accédez à l'accompagnement d'excellence d'ALODO TECH.
            </p>

            {/* Action Buttons - Candidater + Se connecter */}
            <div className="mpme-hero-actions" style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center", alignItems: "center", margin: "36px auto 0 auto" }}>
              <button
                onClick={handleHeroApply}
                className="btn primary"
                style={{ cursor: "pointer", fontSize: "15px", padding: "16px 28px" }}
              >
                Candidater au programme MPME et diagnostic gratuit →
              </button>

              <button
                type="button"
                onClick={handleHeroLogin}
                className="btn"
                style={{
                  cursor: "pointer",
                  fontSize: "15px",
                  padding: "15px 26px",
                  background: "white",
                  color: "#0A0A0A",
                  border: "1px solid #D1D1D6",
                  borderRadius: "9999px",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                <span>Se connecter</span>
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
                <div className="label">Dimensions de gestion auditées</div>
              </div>
              <div className="mpme-stat-item">
                <div className="num">100%</div>
                <div className="label">Diagnostic pris en charge</div>
              </div>
              <div className="mpme-stat-item">
                <div className="num">90 Jours</div>
                <div className="label">Feuille de route concrète</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. LE CONSTAT DE TERRAIN (PROBLÉMATIQUE MPME)
            ========================================================================= */}
        <section className="bg-white">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">Constat de terrain</span>
                <h2>Votre entreprise fait du chiffre, mais pilotez-vous vraiment sa croissance ?</h2>
              </div>
              <p className="lead" style={{ maxWidth: "480px" }}>
                Au Bénin, de nombreuses MPME sont viables mais manquent d'une structure de gestion suffisante pour anticiper leurs crises et grandir.
              </p>
            </div>

            <div className="problem-grid">
              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#FEE2E2", color: "#DC2626" }}>
                    01
                  </div>
                  <h3>Trésorerie sous tension</h3>
                  <p>
                    Mélange entre finances personnelles et professionnelles, factures clients en retard et imprévisibilité permanente des flux de trésorerie disponibles.
                  </p>
                </div>
              </div>

              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#FEF3C7", color: "#D97706" }}>
                    02
                  </div>
                  <h3>Dépendance au dirigeant</h3>
                  <p>
                    Si le dirigeant s'absente 2 semaines, l'entreprise ralentit ou s'arrête. Manque de procédures écrites et délégations quasi impossibles.
                  </p>
                </div>
              </div>

              <div className="problem-card">
                <div>
                  <div className="num-badge" style={{ background: "#CCFBF1", color: "#0D9488" }}>
                    03
                  </div>
                  <h3>Accès au financement bloqué</h3>
                  <p>
                    Difficulté à fournir en 48 heures des états financiers certifiés, un plan de trésorerie crédible et un dossier bancaire aux normes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. LES 8 DIMENSIONS DU DIAGNOSTIC
            ========================================================================= */}
        <section id="dimensions" className="bg-grey">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow teal">Méthodologie ALODO</span>
                <h2>Le Diagnostic de Maturité en 8 Dimensions</h2>
              </div>
              <p className="lead" style={{ maxWidth: "480px" }}>
                Un audit complet et rigoureux pour évaluer la solidité de votre entreprise et identifier vos leviers prioritaires.
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
            4. LE PARCOURS DE SÉLECTION (5 ÉTAPES)
            ========================================================================= */}
        <section className="bg-white">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">Le Parcours</span>
                <h2>Comment se déroule le programme ?</h2>
              </div>
              <p className="lead" style={{ maxWidth: "480px" }}>
                Un cheminement clair en 5 étapes pour sélectionner et accompagner les 20 entreprises retenues.
              </p>
            </div>

            <div className="steps-grid">
              {[
                {
                  step: "01",
                  title: "Candidature",
                  desc: "Formulaire court en 5 minutes pour présenter votre profil et vos enjeux.",
                },
                {
                  step: "02",
                  title: "Sélection",
                  desc: "Revue par le comité ALODO TECH. 20 entreprises retenues par cohorte.",
                },
                {
                  step: "03",
                  title: "Diagnostic",
                  desc: "Évaluation adaptative en 20-30 min sur vos 8 dimensions de gestion.",
                },
                {
                  step: "04",
                  title: "Rapport d'Audit",
                  desc: "Score chiffré, points forts, points faibles et plan d'action à 90 jours.",
                },
                {
                  step: "05",
                  title: "Accompagnement",
                  desc: "Mise en œuvre concrète avec les experts et les outils d'ALODO TECH.",
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
            5. ENCADRÉ D'APPEL À CANDIDATURE
            ========================================================================= */}
        <section className="bg-grey">
          <div className="container">
            <div className="cta-box">
              <span className="eyebrow" style={{ marginBottom: "16px" }}>
                Cohorte 1 · 20 Places
              </span>
              <h2>Rejoignez les 20 premières entreprises accompagnées</h2>
              <p>
                Pour garantir un audit haute précision et un suivi de proximité, les admissions sont volontairement limitées. Postulez en moins de 5 minutes.
              </p>
              <div style={{ marginTop: "32px", display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                <button
                  onClick={handleHeroApply}
                  className="btn primary"
                  style={{ cursor: "pointer" }}
                >
                  Déposer ma candidature maintenant →
                </button>
                <button
                  type="button"
                  onClick={handleHeroLogin}
                  className="btn"
                  style={{
                    cursor: "pointer",
                    background: "white",
                    color: "#0A0A0A",
                    border: "1px solid #D1D1D6",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  <span>Se connecter</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. FAQ
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
                  q: "Le diagnostic est-il gratuit ?",
                  a: "Oui. Le dépôt de candidature et la réalisation du diagnostic de maturité avec le rapport d'audit sont 100 % pris en charge pour les 20 entreprises retenues dans la cohorte.",
                },
                {
                  q: "Ce programme garantit-il l'obtention d'un crédit bancaire ?",
                  a: "Non. ALODO TECH ne promet aucun financement automatique. En revanche, le programme vous prépare rigoureusement à monter un dossier d'entreprise conforme, crédible et finançable par les institutions partenaires.",
                },
                {
                  q: "Combien de temps prend le formulaire de candidature ?",
                  a: "Moins de 5 minutes. Seules les informations essentielles sur votre identité, votre activité et vos défis actuels sont demandées.",
                },
                {
                  q: "Que se passe-t-il si mon entreprise n'est pas retenue dans les 20 ?",
                  a: "Toutes les candidatures sérieuses intègrent la Communauté ALODO MPME. Vous recevrez nos guides pratiques de gestion et serez prioritaires pour les prochaines cohortes.",
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

      <GoogleAuthModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onSuccess={handleGoogleSuccess}
        title={authDestination === "dashboard" ? "Accéder à mon Dashboard" : "Continuer avec Google"}
        subtitle={
          authDestination === "dashboard"
            ? "Connectez-vous pour retrouver votre candidature et vos diagnostics"
            : "Connectez-vous pour candidater au programme ALODO MPME"
        }
      />

      {/* FOOTER OFFICIEL ALODO TECH */}
      <Footer />
    </>
  );
}
