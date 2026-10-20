"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/i18n/LanguageProvider";
import "./about.css";

export default function About() {
  const { lang } = useLang();
  const en = lang === "en";
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
                <span className="eyebrow reveal">{en ? "Our story" : "Notre histoire"}</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px", fontSize: "clamp(24px, 4vw, 44px)" }}>{en ? "Digitizing MSMEs, building tomorrow's digital infrastructure." : "Digitaliser les MPME, bâtir l'infrastructure numérique de demain."}</h2>
              </div>
            </div>

            <div className="about-content reveal" data-delay="1" style={{ marginTop: "48px" }}>
              <p className="lead" style={{ maxWidth: "100%" }}>
                {en
                  ? "ALODO TECH supports micro, small and medium businesses through their digitalization: maturity diagnostics, structuring and follow-through. The company also builds infrastructure in finance and artificial intelligence, so MSMEs and the institutions that fund them have practical tools."
                  : "ALODO TECH accompagne les micro, petites et moyennes entreprises dans leur digitalisation : diagnostic de maturité, structuration et suivi. L'entreprise conçoit aussi des infrastructures en finance et en intelligence artificielle, pour que les MPME et les acteurs qui les financent disposent d'outils concrets."}
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section>
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">{en ? "Team" : "Équipe"}</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>{en ? "Our founders." : "Nos fondateurs."}</h2>
              </div>
            </div>

            <div className="team-grid">
              <div className="member reveal">
                <div className="avatar v2" style={{ padding: 0, overflow: 'hidden' }}>
                  <img src="/assets/equipe/evra.jpeg" alt="MAHUSSI EVRA DJIGBEGNONHOU" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="member-info">
                  <div className="name">MAHUSSI EVRA DJIGBEGNONHOU</div>
                  <div className="role">{en ? "Co-founder · CEO" : "Co-fondateur · CEO"}</div>
                  <div className="bio">{en ? "Carries ALODO TECH's long-term strategy and leads our ambition for digital transformation across the continent." : "Porte la vision stratégique à long terme d'ALODO TECH et pilote notre ambition de transformation digitale à l'échelle continentale."}</div>
                  <a href="https://www.linkedin.com/in/evra-djigbegnonhou/" target="_blank" rel="noopener noreferrer" className="li">LinkedIn →</a>
                </div>
              </div>
              <div className="member reveal" data-delay="1">
                <div className="avatar v1" style={{ padding: 0, overflow: 'hidden' }}>
                  <img src="/assets/equipe/carine.jpeg" alt="MAHUTON CARINE DJIGBEGNONHOU" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="member-info">
                  <div className="name">MAHUTON CARINE DJIGBEGNONHOU</div>
                  <div className="role">{en ? "Co-founder · COO" : "Co-fondatrice · COO"}</div>
                  <div className="bio">{en ? "Owns operational excellence. She orchestrates strategy execution and the rollout of our solutions in the field." : "Garante de l'excellence opérationnelle. Elle orchestre l'exécution de la stratégie et le déploiement de nos solutions sur le terrain."}</div>
                  <a href="https://www.linkedin.com/in/carine-djigbegnonhou-078082331/" target="_blank" rel="noopener noreferrer" className="li">LinkedIn →</a>
                </div>
              </div>
              <div className="member reveal" data-delay="2">
                <div className="avatar v4" style={{ padding: 0, overflow: 'hidden' }}>
                  <img src="/assets/equipe/germain.jpeg" alt="GERMAIN DANDJI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="member-info">
                  <div className="name">GERMAIN DANDJI</div>
                  <div className="role">{en ? "Co-founder · CTO" : "Co-fondateur · CTO"}</div>
                  <div className="bio">{en ? "Architect of innovation. Leads the technology strategy, from infrastructure design to advanced AI models." : "Architecte de l'innovation. Dirige la stratégie technologique, de la conception des infrastructures aux modèles d'IA avancés."}</div>
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
                <span className="eyebrow reveal">{en ? "Governance" : "Gouvernance"}</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>{en ? "A clear structure, from day one." : "Une structure claire, dès le jour un."}</h2>
              </div>
            </div>
            <div className="gov-grid">
              <div className="gov reveal">
                <div className="k">{en ? "Legal entity" : "Entité juridique"}</div>
                <div className="v">ALODO TECH SAS</div>
                <p className="muted" style={{ margin: "8px 0 0", fontSize: "14px" }}>{en ? "Simplified joint-stock company, OHADA law." : "Société par actions simplifiée, droit OHADA."}</p>
              </div>
              <div className="gov reveal" data-delay="1">
                <div className="k">{en ? "Country of registration" : "Pays d'enregistrement"}</div>
                <div className="v">{en ? "Republic of Benin" : "République du Bénin"}</div>
                <p className="muted" style={{ margin: "8px 0 0", fontSize: "14px" }}>{en ? "Head office: Cotonou, Cadjèhoun. Pan-African operations." : "Siège : Cotonou, quartier Cadjèhoun. Opérations panafricaines."}</p>
              </div>
              <div className="gov reveal" data-delay="2">
                <div className="k">Advisory board</div>
                <div className="v">{en ? "4 independent advisors" : "4 conseillers indépendants"}</div>
                <p className="muted" style={{ margin: "8px 0 0", fontSize: "14px" }}>{en ? "Finance, fintech regulation, AI, institutional B2B sales." : "Finance, régulation fintech, IA, ventes B2B institutionnelles."}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="tight">
          <div className="container">
            <div className="cta-banner reveal">
              <div>
                <span className="eyebrow" style={{ color: "rgba(255,255,255,.6)" }}>{en ? "Invest" : "Investir"}</span>
                <h2 className="h2" style={{ marginTop: "12px", maxWidth: "18ch" }}>{en ? "Want to know more about the team?" : "Vous voulez en savoir plus sur l'équipe ?"}</h2>
                <p className="muted" style={{ margin: "16px 0 0", maxWidth: "44ch" }}>
                  {en ? "Request a call with a co-founder. Reply within 48 hours." : "Demandez un appel avec un co-fondateur. Réponse sous 48h."}
                </p>
              </div>
              <div className="actions">
                <Link href="/partners" className="btn primary" style={{ borderRadius: "50px", padding: "15px 40px", fontSize: "1.2rem" }}>{en ? "See the deck" : "Voir le deck"}</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
