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
            <h1 className="display reveal" data-delay="1" style={{ marginTop: "18px" }}>
              Construisez l'infrastructure financière d'un continent.
            </h1>
            <p className="lead reveal" data-delay="2">
              Nous recrutons des gens qui veulent travailler sur des problèmes
              techniques et humains complexes — et qui ne se satisferont pas
              d'un produit moyen pour un marché qui mérite mieux.
            </p>
            <div className="actions reveal" data-delay="3" style={{ marginTop: "36px", display: "flex", gap: "12px" }}>
              <a href="#openings" className="btn primary">Voir les postes ouverts</a>
              <a href="#culture" className="btn outline">Notre culture</a>
            </div>
          </div>
        </section>

        {/* Vision 5 ans */}
        <section className="bg-grey">
          <div className="container">
            <div className="grid-2" style={{ alignItems: "center", gap: "56px" }}>
              <div>
                <span className="eyebrow reveal">Vision · horizon 2030</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "14px" }}>D'ici cinq ans, équiper 5 millions de MPME.</h2>
                <p className="lead reveal" data-delay="2" style={{ marginTop: "18px", maxWidth: "44ch" }}>
                  Présence dans 15 pays africains. 5M de MPME équipées d'ALODO.
                  Une plateforme COINAI utilisée par les principaux fonds émergents.
                  Et une équipe panafricaine de 150+ personnes.
                </p>
              </div>
              <div className="reveal" data-delay="2">
                <div className="grid-2" style={{ gap: "16px" }}>
                  <div className="card" style={{ borderColor: "var(--grey-100)" }}><div className="stat"><div className="value blue">15</div><div className="label">pays couverts</div></div></div>
                  <div className="card" style={{ borderColor: "var(--grey-100)" }}><div className="stat"><div className="value teal">5M</div><div className="label">MPME équipées</div></div></div>
                  <div className="card" style={{ borderColor: "var(--grey-100)" }}><div className="stat"><div className="value">150+</div><div className="label">collaborateurs</div></div></div>
                  <div className="card" style={{ borderColor: "var(--grey-100)" }}><div className="stat"><div className="value">€100M+</div><div className="label">crédits débloqués</div></div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section id="culture">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Notre culture</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Sept principes que nous tenons.</h2>
              </div>
            </div>
            <div className="values-grid">
              <div className="value reveal"><div className="ix">01</div><h3>Terrain d'abord</h3><p>On va au marché avant d'ouvrir Figma. Le produit naît de la conversation avec la vendeuse — pas du brainstorm.</p></div>
              <div className="value reveal" data-delay="1"><div className="ix">02</div><h3>Rigueur tech</h3><p>Code revu, tests sérieux, observabilité. Une startup qui veut durer écrit du code qui dure.</p></div>
              <div className="value reveal" data-delay="2"><div className="ix">03</div><h3>Ambition panafricaine</h3><p>On ne pense pas un pays. On pense un continent. Chaque feature doit scaler de Dakar à Nairobi.</p></div>
              <div className="value reveal" data-delay="3"><div className="ix">04</div><h3>Transparence interne</h3><p>Salaires lisibles, roadmap publique, métriques partagées. Tout le monde sait où on va et pourquoi.</p></div>
              <div className="value reveal" data-delay="4"><div className="ix">05</div><h3>Le client a un visage</h3><p>Chaque produit est rattaché à une vendeuse réelle, nommée. On la consulte, on la rappelle, on la cite.</p></div>
              <div className="value reveal" data-delay="5"><div className="ix">06</div><h3>Profondeur &gt; vitesse</h3><p>Mieux vaut un bon trimestre qu'une mauvaise semaine. On défend la qualité contre l'urgence factice.</p></div>
              <div className="value reveal"><div className="ix">07</div><h3>Joie au travail</h3><p>Pas de bullshit, pas de jeu politique. On vient ici parce qu'on aime ce qu'on fait — et on rentre dîner à l'heure.</p></div>
            </div>
          </div>
        </section>

        {/* Perks */}
        <section id="openings" className="bg-grey">
          <div className="container">
            <div className="spon">
              <div>
                <span className="eyebrow reveal">Ce qu'on offre</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Une aventure, et un cadre qui tient.</h2>
                <p className="lead reveal" data-delay="2" style={{ marginTop: "16px", maxWidth: "44ch" }}>
                  Nous ne pouvons pas (encore) matcher les salaires Big Tech.
                  Nous offrons autre chose : impact réel, vraies responsabilités,
                  equity, et un environnement où vous apprendrez plus en six mois
                  qu'en deux ans ailleurs.
                </p>
              </div>
              <ul className="perks reveal" data-delay="3">
                <li><svg className="ic" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 11l4 4 9-9" /></svg><div><b>Equity early-stage</b><p>Tout poste full-time vient avec stock options. Vesting 4 ans, cliff 1 an.</p></div></li>
                <li><svg className="ic" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 11l4 4 9-9" /></svg><div><b>Remote / hybride</b><p>Bureau à Cotonou, hubs régionaux à Dakar et Abidjan. Travail à distance accepté en Afrique &amp; Europe.</p></div></li>
                <li><svg className="ic" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 11l4 4 9-9" /></svg><div><b>Apprentissage budgété</b><p>500 USD / an par personne pour livres, conférences, formations. À utiliser, pas à empiler.</p></div></li>
                <li><svg className="ic" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 11l4 4 9-9" /></svg><div><b>Congé parental étendu</b><p>16 semaines pour tout parent, quel que soit le pays d'embauche.</p></div></li>
                <li><svg className="ic" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 11l4 4 9-9" /></svg><div><b>Off-site annuel</b><p>Une semaine d'équipe, hors du bureau, hors de la tech. Cohésion réelle.</p></div></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Open roles */}
        <section>
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Postes ouverts</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>12 postes ouverts.<br />Trouvez le vôtre.</h2>
              </div>
              <div className="reveal" data-delay="2" style={{ color: "var(--grey-500)", fontSize: "14px", maxWidth: "320px" }}>
                Vous ne voyez pas votre poste idéal ? <a href="#spontaneous" style={{ color: "var(--primary)" }}>Candidature spontanée</a>.
              </div>
            </div>

            <div className="filters-row reveal">
              <a className="on">Tous</a>
              <a>Engineering</a>
              <a>Product &amp; Design</a>
              <a>Data &amp; IA</a>
              <a>Business</a>
              <a>Operations</a>
            </div>

            <div className="role-list reveal" data-delay="1">
              <a href="#" className="role">
                <div>
                  <div className="title">Senior Backend Engineer · Scoring</div>
                  <div className="desc">Concevoir et scaler les pipelines temps réel et l'API scoring.</div>
                </div>
                <div className="team">Engineering</div>
                <div className="loc">Cotonou · Remote</div>
                <span className="apply">Postuler <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7h8M7 3l4 4-4 4" /></svg></span>
              </a>
              <a href="#" className="role">
                <div>
                  <div className="title">ML Engineer · Crédit comportemental</div>
                  <div className="desc">Améliorer le modèle de scoring : features, calibration, explainability.</div>
                </div>
                <div className="team">Data &amp; IA</div>
                <div className="loc">Remote · Afrique</div>
                <span className="apply">Postuler <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7h8M7 3l4 4-4 4" /></svg></span>
              </a>
              <a href="#" className="role">
                <div>
                  <div className="title">Embedded Engineer · ALODO Box</div>
                  <div className="desc">Firmware ESP32/RP2040, basse conso, sync robuste sur 2G.</div>
                </div>
                <div className="team">Engineering</div>
                <div className="loc">Cotonou · Hybride</div>
                <span className="apply">Postuler <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7h8M7 3l4 4-4 4" /></svg></span>
              </a>
              <a href="#" className="role">
                <div>
                  <div className="title">Senior Product Designer</div>
                  <div className="desc">Designer pour les MPME et les dashboards B2B. Recherche terrain incluse.</div>
                </div>
                <div className="team">Product &amp; Design</div>
                <div className="loc">Dakar · Remote</div>
                <span className="apply">Postuler <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7h8M7 3l4 4-4 4" /></svg></span>
              </a>
              <a href="#" className="role">
                <div>
                  <div className="title">Partnerships Lead · UEMOA</div>
                  <div className="desc">Ouvrir et closer les deals banques, IMF, fédérations professionnelles.</div>
                </div>
                <div className="team">Business</div>
                <div className="loc">Abidjan</div>
                <span className="apply">Postuler <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7h8M7 3l4 4-4 4" /></svg></span>
              </a>
              <a href="#" className="role">
                <div>
                  <div className="title">Field Operations Manager</div>
                  <div className="desc">Coordonner les déploiements ALODO Box sur les pilotes UEMOA.</div>
                </div>
                <div className="team">Operations</div>
                <div className="loc">Cotonou · Terrain</div>
                <span className="apply">Postuler <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7h8M7 3l4 4-4 4" /></svg></span>
              </a>
            </div>
          </div>
        </section>

        {/* Spontaneous */}
        <section id="spontaneous" className="bg-dark">
          <div className="container">
            <div className="cta-banner reveal" style={{ background: "transparent", padding: 0 }}>
              <div>
                <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Candidature spontanée</span>
                <h2 className="h2" style={{ marginTop: "12px", maxWidth: "22ch" }}>Vous ne voyez pas le poste qui vous correspond ?</h2>
                <p className="muted" style={{ margin: "16px 0 0", maxWidth: "44ch" }}>
                  Écrivez-nous. Si vous nous décrivez en deux paragraphes ce que vous voulez construire chez ALODO,
                  nous lisons. Promis.
                </p>
              </div>
              <div className="actions">
                <a href="mailto:join@alodo.tech" className="btn primary">join@alodo.tech</a>
                <Link href="/contact" className="btn outline">Formulaire</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
