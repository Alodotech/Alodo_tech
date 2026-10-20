"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/i18n/LanguageProvider";
import "./careers.css";

const VALUES = {
  fr: [
    ["Innovation Continue", "Nous repoussons les limites technologiques en explorant constamment de nouvelles solutions (IA, Cloud, IoT) pour répondre aux défis de demain. L'innovation est le moteur qui nous permet de proposer des infrastructures toujours plus performantes."],
    ["Excellence Technique", "Architecture robuste, code maintenable et sécurité by design. Nous ne transigeons jamais avec la fiabilité de nos infrastructures. Nos processus rigoureux garantissent une haute disponibilité pour nos partenaires institutionnels."],
    ["Pragmatisme Data", "Chaque décision est guidée par l'analyse des données. Nous concevons nos produits pour générer des insights concrets et mesurables. La donnée qualifiée est la clé de l'inclusion financière et de nos modèles d'IA."],
    ["Agilité & Résilience", "Nous itérons rapidement pour nous adapter aux évolutions du marché, sans jamais sacrifier la qualité d'exécution globale. Nos équipes sont structurées pour pivoter efficacement et répondre aux imprévus du terrain."],
    ["Impact Client", "La technologie est un moyen, pas une fin. Notre priorité absolue est de créer une valeur tangible pour nos utilisateurs et partenaires B2B. Chaque fonctionnalité doit répondre à un besoin métier réel."],
    ["Collaboration Transparente", "L'information circule librement entre l'ingénierie, le produit et les opérations. La synergie d'équipe fait notre force. Nous favorisons une culture du feedback ouvert et de l'intelligence collective."],
    ["Responsabilité & Scalabilité", "Nous construisons des systèmes pérennes et éthiques, conçus pour avoir un impact positif et grandir à l'échelle du continent. Nos solutions sont pensées dès le premier jour pour supporter la charge de millions de transactions."],
    ["Sécurité & Confiance", "Parce que nous manipulons des flux financiers, la protection des données est notre fondation. La sécurité dicte chaque ligne de code, garantissant une confiance absolue à nos utilisateurs institutionnels et finaux."],
    ["Diversité & Inclusion", "L'inclusion commence au sein de nos équipes. Nous valorisons la diversité des parcours, des expertises et des cultures pour construire des solutions qui parlent à tout le continent africain dans sa complexité."],
  ],
  en: [
    ["Continuous innovation", "We push technical limits by exploring new solutions (AI, cloud, IoT) for tomorrow's challenges. Innovation is what lets us deliver ever stronger infrastructure."],
    ["Technical excellence", "Robust architecture, maintainable code and security by design. We never compromise on reliability. Rigorous processes keep institutional partners online."],
    ["Data pragmatism", "Every decision is guided by data. We design products that produce concrete, measurable insight. Qualified data is the key to financial inclusion and our AI models."],
    ["Agility and resilience", "We iterate quickly to follow the market without sacrificing execution quality. Teams are built to pivot and handle what the field throws at them."],
    ["Customer impact", "Technology is a means, not an end. The priority is tangible value for users and B2B partners. Every feature must answer a real business need."],
    ["Transparent collaboration", "Information moves freely between engineering, product and operations. Team synergy is our strength. We favor open feedback and collective intelligence."],
    ["Responsibility and scale", "We build lasting, ethical systems meant to grow across the continent. Solutions are designed from day one to carry millions of transactions."],
    ["Security and trust", "Because we handle financial flows, data protection is the foundation. Security shapes every line of code, for institutional and end users alike."],
    ["Diversity and inclusion", "Inclusion starts inside the team. We value different paths, skills and cultures so our solutions speak to the African continent in its complexity."],
  ],
} as const;

export default function Careers() {
  const { lang } = useLang();
  const en = lang === "en";
  const values = VALUES[lang];
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
      <Navbar activeKey="careers" />

      <main data-screen-label="09 Careers">
        {/* Hero */}
        <section className="page-hero careers-hero">
          <div className="container">
            <span className="eyebrow reveal">{en ? "Careers" : "Carrières"}</span>
            <h1 className="display reveal" data-delay="1" style={{ marginTop: "18px", fontSize: "clamp(24px, 4vw, 56px)" }}>{en ? "Build the digital infrastructure." : "Bâtir l'infrastructure digitale."}</h1>
            <p className="lead reveal" data-delay="2">
              {en
                ? "A collective solving complex technology challenges. We are always listening for exceptional talent."
                : "Un collectif résolvant des défis technologiques complexes. Nous restons à l'écoute de talents exceptionnels."}
            </p>
            <div className="actions reveal" data-delay="3" style={{ marginTop: "36px", display: "flex", gap: "12px" }}>
              <a href="#spontaneous" className="btn primary">{en ? "Open application" : "Candidature spontanée"}</a>
              <a href="#culture" className="btn outline">{en ? "Our culture" : "Notre culture"}</a>
            </div>
          </div>
        </section>

        {/* Values */}
        <section id="culture" className="bg-grey">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">{en ? "Our culture" : "Notre culture"}</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>{en ? "Our 9 values." : "Nos 9 valeurs."}</h2>
              </div>
            </div>
            <div className="values-grid">
              {values.map(([title, body], i) => (
                <div key={title} className="culture-value reveal" data-delay={i % 6}>
                  <div className="ix">{String(i + 1).padStart(2, "0")}</div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spontaneous */}
        <section id="spontaneous" className="bg-dark">
          <div className="container">
            <div className="cta-banner reveal" style={{ background: "transparent", padding: 10 }}>
              <div>
                <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>{en ? "Join the team" : "Rejoignez l'équipe"}</span>
                <h2 className="h2" style={{ marginTop: "12px", maxWidth: "22ch" }}>{en ? "Open application" : "Candidature spontanée"}</h2>
                <p className="muted" style={{ margin: "16px 0 0", maxWidth: "44ch" }}>
                  {en
                    ? "We are always looking for talent (engineers, data scientists, ops) to build tomorrow's digital infrastructure. Write to us."
                    : "Nous sommes toujours à la recherche de talents (Ingénieurs, Data Scientists, Ops) pour construire l'infrastructure digitale de demain. Écrivez-nous pour nous parler de vous."}
                </p>
              </div>
              <div className="actions">
                <a href="mailto:partnership@alodotech.com" className="btn primary">partnership@alodotech.com</a>
                <Link href="/contact" className="btn outline">{en ? "Contact us" : "Nous contacter"}</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
