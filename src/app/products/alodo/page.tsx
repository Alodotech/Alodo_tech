"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./alodo.css";

export default function AlodoProduct() {
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
      <Navbar activeKey="products" />

      <main data-screen-label="03 Products — ALODO">
        {/* Hero */}
        <section className="product-hero">
          <div className="container">
            <div className="grid">
              <div>
                <div className="label-row reveal">
                  <span className="tag blue">ALODO</span>
                  <span className="muted" style={{ fontSize: "13px" }}>Produit · Inclusion financière</span>
                </div>
                <h1 className="display reveal" data-delay="1">
                  Le boîtier qui rend les MPME <span style={{ color: "var(--primary)" }}>finançables</span>.
                </h1>
                <p className="lead reveal" data-delay="2" style={{ marginTop: "24px" }}>
                  Un boîtier intelligent au point de vente, un bot WhatsApp accessible
                  partout, et un score de crédit propriétaire. Une MPME peut enfin
                  prouver qu'elle existe — et accéder au crédit formel.
                </p>
                <div className="actions reveal" data-delay="3" style={{ marginTop: "36px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link href="/contact" className="btn primary">Demander un pilote</Link>
                  <Link href="/solutions" className="btn outline">Pour les institutions →</Link>
                </div>
              </div>
              <div className="visual-stage reveal" data-delay="2">
                <div className="box-3d">
                  <div className="top">
                    <span className="logo">ALODO</span>
                    <span>BOX·v1</span>
                  </div>
                  <div className="screen">
                    <span className="amt">+ 12 500 F</span>
                    <span className="dot"></span>
                  </div>
                  <div className="foot">
                    <span>15:42</span>
                    <span>4G · SYNC</span>
                    <span>87%</span>
                  </div>
                </div>
                <div className="phone-stack">
                  <div className="screen">
                    <div className="wabar">
                      <div className="av">A</div>
                      <div>
                        <div className="lbl">ALODO Bot</div>
                        <div className="sm">en ligne</div>
                      </div>
                    </div>
                    <div className="body">
                      <div className="bubble">Bonjour Amara 👋 Comment puis-je vous aider ?</div>
                      <div className="bubble me">Mon stock du jour</div>
                      <div className="bubble">Aujourd'hui : <b>47 ventes</b> · 38 500 F.<br />Score crédit : <b>A−</b></div>
                      <div className="bubble me">Crédit possible ?</div>
                      <div className="bubble">Oui — pré-approuvé pour <b>150 000 F</b> sur 90 jours. Je continue ?</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem / Solution */}
        <section className="bg-grey">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Problème · Solution</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Pourquoi 80% des MPME africaines n'ont pas accès au crédit.</h2>
              </div>
            </div>
            <div className="ps-grid">
              <div className="ps problem reveal">
                <span className="eyebrow">Problème</span>
                <h3>L'informel rend les MPME invisibles.</h3>
                <ul>
                  <li><span className="num">01</span><span><b>80% des MPME</b> n'ont aucun accès au crédit formel — pas d'historique, pas de relevés, pas de garanties.</span></li>
                  <li><span className="num">02</span><span>Les transactions cash <b>ne laissent aucune trace numérique</b>. Aux yeux des banques, l'activité n'existe pas.</span></li>
                  <li><span className="num">03</span><span>Les outils de comptabilité existants supposent un smartphone, une banque, du temps — choses rares au comptoir.</span></li>
                  <li><span className="num">04</span><span>Le risque crédit est mal évalué : les IMF refusent par défaut ou prêtent à des taux prohibitifs.</span></li>
                </ul>
              </div>
              <div className="ps solution reveal" data-delay="1">
                <span className="eyebrow teal">Solution</span>
                <h3>Un boîtier, un bot, un score.</h3>
                <ul>
                  <li><span className="num">01</span><span><b>Boîtier IoT</b> installé au point de vente. Connectivité GSM/WiFi, autonomie 24h, mise à jour OTA.</span></li>
                  <li><span className="num">02</span><span><b>WhatsApp Bot</b> multilingue — la vendeuse interagit depuis un téléphone de base, sans app à installer.</span></li>
                  <li><span className="num">03</span><span><b>Enregistrement auto</b> des ventes : chaque transaction devient une donnée structurée.</span></li>
                  <li><span className="num">04</span><span><b>Score de crédit propriétaire</b> basé sur le comportement réel — pas sur la paperasse.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Flow */}
        <section>
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Comment ça marche</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>De la vente cash<br />au crédit formel.</h2>
              </div>
              <p className="muted reveal" data-delay="2" style={{ maxWidth: "360px", margin: 0 }}>
                Quatre étapes, automatisées. La MPME ne change rien à sa façon de travailler.
              </p>
            </div>

            <div className="flow">
              <div className="flow-step reveal">
                <div className="num">01 · VENTE</div>
                <h4>La cliente paie en cash</h4>
                <p>La vendeuse encaisse normalement. Aucune friction, aucun nouveau geste à apprendre.</p>
              </div>
              <div className="flow-step reveal" data-delay="1">
                <div className="num">02 · CAPTURE</div>
                <h4>Le boîtier enregistre</h4>
                <p>Saisie au boîtier ou message WhatsApp. La transaction part dans la pipeline ALODO.</p>
              </div>
              <div className="flow-step reveal" data-delay="2">
                <div className="num">03 · SCORE</div>
                <h4>L'IA recalcule</h4>
                <p>Chaque vente alimente le score : régularité, panier moyen, saisonnalité, croissance.</p>
              </div>
              <div className="flow-step reveal" data-delay="3">
                <div className="num">04 · CRÉDIT</div>
                <h4>L'IMF débloque</h4>
                <p>Le partenaire financier reçoit le score, valide et débloque un crédit pré-approuvé en heures, pas en mois.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="bg-grey">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow teal reveal">Impact MPME</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Ce que ça change, concrètement.</h2>
              </div>
            </div>
            <div className="impact-list">
              <div className="card hover reveal">
                <div className="icon blue">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
                </div>
                <h3 className="h3">Premier crédit formel</h3>
                <p className="muted" style={{ marginTop: "12px" }}>Accès à un microcrédit traçable basé sur l'activité réelle — souvent le tout premier crédit de la MPME.</p>
              </div>
              <div className="card hover reveal" data-delay="1">
                <div className="icon teal">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 6-6" /></svg>
                </div>
                <h3 className="h3">Visibilité financière</h3>
                <p className="muted" style={{ marginTop: "12px" }}>Tableau de bord ventes, marges, trésorerie. La vendeuse prend ses décisions sur des données — pas sur l'intuition.</p>
              </div>
              <div className="card hover reveal" data-delay="2">
                <div className="icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                </div>
                <h3 className="h3">Croissance mesurée</h3>
                <p className="muted" style={{ marginTop: "12px" }}>Le chiffre d'affaires devient mesurable, comparable, projetable. La MPME peut négocier avec ses fournisseurs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Spec strip (dark) */}
        <section className="bg-dark">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Spécifications</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Boîtier ALODO BOX v1.</h2>
              </div>
              <p className="muted reveal" data-delay="2" style={{ maxWidth: "360px", margin: 0 }}>
                Edge computing, basse consommation, résistant à la chaleur et aux coupures réseau.
              </p>
            </div>
            <table className="spec-table">
              <tbody>
                <tr><th>Connectivité</th><td>GSM 2G/4G · WiFi · Bluetooth LE</td></tr>
                <tr><th>Autonomie batterie</th><td>24 h actif · 7 j veille</td></tr>
                <tr><th>Mises à jour</th><td>Firmware OTA · signé · rollback</td></tr>
                <tr><th>Sécurité</th><td>Secure Element · TLS 1.3 · chiffrement local</td></tr>
                <tr><th>Compute</th><td>Edge : pré-scoring local, sync différé</td></tr>
                <tr><th>Environnement</th><td>0 – 45 °C · IP44 · résistant chocs</td></tr>
                <tr><th>Coût cible</th><td>&lt; 25 USD / unité à l'échelle</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="tight">
          <div className="container">
            <div className="cta-banner reveal">
              <div>
                <span className="eyebrow" style={{ color: "rgba(255,255,255,.6)" }}>Partenariats &amp; pilotes</span>
                <h2 className="h2" style={{ marginTop: "12px", maxWidth: "18ch" }}>Déployez ALODO dans votre réseau MPME.</h2>
                <p className="muted" style={{ margin: "16px 0 0", maxWidth: "44ch" }}>
                  Banques, IMF, ONG, gouvernements — discutons d'un pilote dans votre territoire.
                </p>
              </div>
              <div className="actions">
                <Link href="/contact" className="btn primary">Lancer un pilote</Link>
                <Link href="/solutions" className="btn outline">Solutions B2B</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
