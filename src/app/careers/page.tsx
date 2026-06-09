"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./careers.css";

export default function Careers() {
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
            <span className="eyebrow reveal">Carrières</span>
            <h1 className="display reveal" data-delay="1" style={{ marginTop: "18px", whiteSpace: "nowrap", fontSize: "clamp(24px, 4vw, 56px)" }}>Bâtir l'infrastructure digitale.</h1>
            <p className="lead reveal" data-delay="2">
              Un collectif résolvant des défis technologiques complexes. Nous restons à l'écoute de talents exceptionnels.
            </p>
            <div className="actions reveal" data-delay="3" style={{ marginTop: "36px", display: "flex", gap: "12px" }}>
              <a href="#spontaneous" className="btn primary">Candidature spontanée</a>
              <a href="#culture" className="btn outline">Notre culture</a>
            </div>
          </div>
        </section>

        {/* Values */}
        <section id="culture" className="bg-grey">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Notre culture</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Nos 9 valeurs.</h2>
              </div>
            </div>
            <div className="values-grid">
              <div className="culture-value reveal">
                <div className="ix">01</div>
                <h3>Innovation Continue</h3>
                <p>Nous repoussons les limites technologiques en explorant constamment de nouvelles solutions (IA, Cloud, IoT) pour répondre aux défis de demain. L'innovation est le moteur qui nous permet de proposer des infrastructures toujours plus performantes.</p>
              </div>
              <div className="culture-value reveal" data-delay="1">
                <div className="ix">02</div>
                <h3>Excellence Technique</h3>
                <p>Architecture robuste, code maintenable et sécurité by design. Nous ne transigeons jamais avec la fiabilité de nos infrastructures. Nos processus rigoureux garantissent une haute disponibilité pour nos partenaires institutionnels.</p>
              </div>
              <div className="culture-value reveal" data-delay="2">
                <div className="ix">03</div>
                <h3>Pragmatisme Data</h3>
                <p>Chaque décision est guidée par l'analyse des données. Nous concevons nos produits pour générer des insights concrets et mesurables. La donnée qualifiée est la clé de l'inclusion financière et de nos modèles d'IA.</p>
              </div>
              <div className="culture-value reveal" data-delay="3">
                <div className="ix">04</div>
                <h3>Agilité & Résilience</h3>
                <p>Nous itérons rapidement pour nous adapter aux évolutions du marché, sans jamais sacrifier la qualité d'exécution globale. Nos équipes sont structurées pour pivoter efficacement et répondre aux imprévus du terrain.</p>
              </div>
              <div className="culture-value reveal" data-delay="4">
                <div className="ix">05</div>
                <h3>Impact Client</h3>
                <p>La technologie est un moyen, pas une fin. Notre priorité absolue est de créer une valeur tangible pour nos utilisateurs et partenaires B2B. Chaque fonctionnalité doit répondre à un besoin métier réel.</p>
              </div>
              <div className="culture-value reveal" data-delay="5">
                <div className="ix">06</div>
                <h3>Collaboration Transparente</h3>
                <p>L'information circule librement entre l'ingénierie, le produit et les opérations. La synergie d'équipe fait notre force. Nous favorisons une culture du feedback ouvert et de l'intelligence collective.</p>
              </div>
              <div className="culture-value reveal">
                <div className="ix">07</div>
                <h3>Responsabilité & Scalabilité</h3>
                <p>Nous construisons des systèmes pérennes et éthiques, conçus pour avoir un impact positif et grandir à l'échelle du continent. Nos solutions sont pensées dès le premier jour pour supporter la charge de millions de transactions.</p>
              </div>
              <div className="culture-value reveal" data-delay="1">
                <div className="ix">08</div>
                <h3>Sécurité & Confiance</h3>
                <p>Parce que nous manipulons des flux financiers, la protection des données est notre fondation. La sécurité dicte chaque ligne de code, garantissant une confiance absolue à nos utilisateurs institutionnels et finaux.</p>
              </div>
              <div className="culture-value reveal" data-delay="2">
                <div className="ix">09</div>
                <h3>Diversité & Inclusion</h3>
                <p>L'inclusion commence au sein de nos équipes. Nous valorisons la diversité des parcours, des expertises et des cultures pour construire des solutions qui parlent à tout le continent africain dans sa complexité.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Spontaneous */}
        <section id="spontaneous" className="bg-dark">
          <div className="container">
            <div className="cta-banner reveal" style={{ background: "transparent", padding: 0 }}>
              <div>
                <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Rejoignez l'équipe</span>
                <h2 className="h2" style={{ marginTop: "12px", maxWidth: "22ch" }}>Candidature spontanée</h2>
                <p className="muted" style={{ margin: "16px 0 0", maxWidth: "44ch" }}>
                  Nous sommes toujours à la recherche de talents (Ingénieurs, Data Scientists, Ops) pour construire l'infrastructure digitale de demain. Écrivez-nous pour nous parler de vous.
                </p>
              </div>
              <div className="actions">
                <a href="mailto:join@alodo.tech" className="btn primary">join@alodo.tech</a>
                <Link href="/contact" className="btn outline">Nous contacter</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
