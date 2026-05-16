"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./about.css";

export default function About() {
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
      <Navbar activeKey="about" />

      <main data-screen-label="02 About">
        {/* Timeline */}
        <section className="bg-grey" style={{ paddingTop: "120px" }}>
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Notre histoire</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px", whiteSpace: "nowrap", fontSize: "clamp(24px, 4vw, 44px)" }}>D'un hackathon à une startup d'infrastructure.</h2>
              </div>
            </div>

            <div className="about-content reveal" data-delay="1" style={{ marginTop: "48px" }}>
              <p className="lead" style={{ maxWidth: "100%" }}>
                ALODO TECH est un bâtisseur d'infrastructures digitales qui connecte l'économie informelle 
                africaine au système financier mondial. Nous concevons les outils technologiques 
                nécessaires pour transformer chaque transaction en donnée exploitable, garantissant 
                une croissance inclusive et une visibilité financière totale sur tout le continent.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section>
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Équipe</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px", whiteSpace: "nowrap" }}>Une équipe pluridisciplinaire.</h2>
              </div>
            </div>

            <div className="team-grid">
              <div className="member reveal">
                <div className="avatar v2">AA</div>
                <div className="member-info">
                  <div className="name">Alodo Adékunlé</div>
                  <div className="role">Co-fondateur · CEO</div>
                  <div className="bio">Ex-stratégie BOAD. Obsédé par l'inclusion financière depuis ses années d'études à Dakar.</div>
                  <a href="https://www.linkedin.com/company/alodo-tech/" target="_blank" rel="noopener noreferrer" className="li">LinkedIn →</a>
                </div>
              </div>
              <div className="member reveal" data-delay="1">
                <div className="avatar v1">IK</div>
                <div className="member-info">
                  <div className="name">Inès Koffi</div>
                  <div className="role">Co-fondatrice · CTO</div>
                  <div className="bio">Ex-Spotify NYC. Architecture cloud, IA appliquée, IoT. Construit ce que d'autres pensent impossible.</div>
                  <a href="https://www.linkedin.com/company/alodo-tech/" target="_blank" rel="noopener noreferrer" className="li">LinkedIn →</a>
                </div>
              </div>
              <div className="member reveal" data-delay="2">
                <div className="avatar v4">MO</div>
                <div className="member-info">
                  <div className="name">Moussa Ouédraogo</div>
                  <div className="role">Co-fondateur · COO</div>
                  <div className="bio">Opérations terrain UEMOA. A monté 3 réseaux d'agents bancaires entre Ouaga et Bamako.</div>
                  <a href="https://www.linkedin.com/company/alodo-tech/" target="_blank" rel="noopener noreferrer" className="li">LinkedIn →</a>
                </div>
              </div>
              <div className="member reveal" data-delay="3">
                <div className="avatar v5">FN</div>
                <div className="member-info">
                  <div className="name">Fatou N'Diaye</div>
                  <div className="role">Co-fondatrice · Product</div>
                  <div className="bio">Design produit, recherche utilisateur. Forme l'équipe à parler 'marché', pas 'tech'.</div>
                  <a href="https://www.linkedin.com/company/alodo-tech/" target="_blank" rel="noopener noreferrer" className="li">LinkedIn →</a>
                </div>
              </div>
              <div className="member reveal">
                <div className="avatar v7">KB</div>
                <div className="member-info">
                  <div className="name">Kwame Bonsu</div>
                  <div className="role">Co-fondateur · AI</div>
                  <div className="bio">PhD ML, ex-fonds quantitatif. Spécialiste signaux marchés émergents et NLP multilingue.</div>
                  <a href="https://www.linkedin.com/company/alodo-tech/" target="_blank" rel="noopener noreferrer" className="li">LinkedIn →</a>
                </div>
              </div>
              <div className="member reveal" data-delay="1">
                <div className="avatar v6">SD</div>
                <div className="member-info">
                  <div className="name">Sira Diallo</div>
                  <div className="role">Co-fondatrice · Partners</div>
                  <div className="bio">Banques, IMF, régulateurs. Parle leur langue, débloque les portes des décideurs.</div>
                  <a href="https://www.linkedin.com/company/alodo-tech/" target="_blank" rel="noopener noreferrer" className="li">LinkedIn →</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Governance */}
        <section className="bg-grey">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Gouvernance</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Une structure claire, dès le jour un.</h2>
              </div>
            </div>
            <div className="gov-grid">
              <div className="gov reveal">
                <div className="k">Entité juridique</div>
                <div className="v">ALODO TECH SAS</div>
                <p className="muted" style={{ margin: "8px 0 0", fontSize: "14px" }}>Société par actions simplifiée, droit OHADA.</p>
              </div>
              <div className="gov reveal" data-delay="1">
                <div className="k">Pays d'enregistrement</div>
                <div className="v">République du Bénin</div>
                <p className="muted" style={{ margin: "8px 0 0", fontSize: "14px" }}>Siège : Cotonou, quartier Cadjèhoun. Opérations panafricaines.</p>
              </div>
              <div className="gov reveal" data-delay="2">
                <div className="k">Advisory board</div>
                <div className="v">4 conseillers indépendants</div>
                <p className="muted" style={{ margin: "8px 0 0", fontSize: "14px" }}>Finance, régulation fintech, IA, ventes B2B institutionnelles.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="tight">
          <div className="container">
            <div className="cta-banner reveal">
              <div>
                <span className="eyebrow" style={{ color: "rgba(255,255,255,.6)" }}>Investir</span>
                <h2 className="h2" style={{ marginTop: "12px", maxWidth: "18ch" }}>Vous voulez en savoir plus sur l'équipe ?</h2>
                <p className="muted" style={{ margin: "16px 0 0", maxWidth: "44ch" }}>
                  Demandez un appel avec un co-fondateur. Réponse sous 48h.
                </p>
              </div>
              <div className="actions">
                <Link href="/partners" className="btn primary" style={{ borderRadius: "50px", padding: "15px 40px", fontSize: "1.2rem" }}>Voir le deck</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
