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
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px", fontSize: "clamp(24px, 4vw, 44px)" }}>D'un hackathon à une startup d'infrastructure.</h2>
              </div>
            </div>

            <div className="about-content reveal" data-delay="1" style={{ marginTop: "48px" }}>
              <p className="lead" style={{ maxWidth: "100%" }}>
                ALODO TECH est un pionnier de la transformation digitale globale, alliant expertise Fintech et Intelligence Artificielle. Née d'une volonté d'accélérer la modernisation des infrastructures africaines, notre entreprise se positionne comme le partenaire technologique incontournable pour bâtir l'avenir numérique du continent, avec une vision englobant tous les aspects de la donnée et de la finance.
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
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Nos fondateurs.</h2>
              </div>
            </div>

            <div className="team-grid">
              <div className="member reveal">
                <div className="avatar v2" style={{ padding: 0, overflow: 'hidden' }}>
                  <img src="/assets/equipe/evra.jpeg" alt="MAHUSSI EVRA DJIGBEGNONHOU" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="member-info">
                  <div className="name">MAHUSSI EVRA DJIGBEGNONHOU</div>
                  <div className="role">Co-fondateur · CEO</div>
                  <div className="bio">Porte la vision stratégique à long terme d'ALODO TECH et pilote notre ambition de transformation digitale à l'échelle continentale.</div>
                  <a href="https://www.linkedin.com/in/evra-djigbegnonhou/" target="_blank" rel="noopener noreferrer" className="li">LinkedIn →</a>
                </div>
              </div>
              <div className="member reveal" data-delay="1">
                <div className="avatar v1" style={{ padding: 0, overflow: 'hidden' }}>
                  <img src="/assets/equipe/carine.jpeg" alt="MAHUTON CARINE DJIGBEGNONHOU" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="member-info">
                  <div className="name">MAHUTON CARINE DJIGBEGNONHOU</div>
                  <div className="role">Co-fondatrice · COO</div>
                  <div className="bio">Garante de l'excellence opérationnelle. Elle orchestre l'exécution de la stratégie et le déploiement de nos solutions sur le terrain.</div>
                  <a href="https://www.linkedin.com/in/carine-djigbegnonhou-078082331/" target="_blank" rel="noopener noreferrer" className="li">LinkedIn →</a>
                </div>
              </div>
              <div className="member reveal" data-delay="2">
                <div className="avatar v4" style={{ padding: 0, overflow: 'hidden' }}>
                  <img src="/assets/equipe/germain.jpeg" alt="GERMAIN DANDJI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="member-info">
                  <div className="name">GERMAIN DANDJI</div>
                  <div className="role">Co-fondateur · CTO</div>
                  <div className="bio">Architecte de l'innovation. Dirige la stratégie technologique, de la conception des infrastructures aux modèles d'IA avancés.</div>
                  <a href="https://www.linkedin.com/in/germain-dandji-5279a331b/" target="_blank" rel="noopener noreferrer" className="li">LinkedIn →</a>
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
