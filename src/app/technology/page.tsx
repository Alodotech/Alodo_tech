"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./technology.css";

export default function Technology() {
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
      <Navbar activeKey="technology" />

      <main data-screen-label="06 Technology">
        {/* Hero */}
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow reveal">Technologie</span>
            <h1 className="display reveal" data-delay="1" style={{ marginTop: "18px", maxWidth: "16ch" }}>
              Une stack pensée pour l'Afrique connectée et déconnectée.
            </h1>
            <p className="lead reveal" data-delay="2">
              IA, data pipelines temps réel, infrastructure cloud-native, edge computing sur boîtier,
              et WhatsApp comme couche d'accès universelle. Conçue pour fonctionner en zone 2G
              comme dans un data center.
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section>
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Cinq piliers technologiques</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Ce qui rend ALODO possible.</h2>
              </div>
            </div>

            <div className="pillars">
              <div className="pillar reveal">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><circle cx="5" cy="5" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M7 6l3 4M17 6l-3 4M7 18l3-4M17 18l-3-4" /></svg>
                </div>
                <div>
                  <h3>Intelligence artificielle</h3>
                  <p>LLM intégrés (Gemini, OpenAI) pour analyse contextuelle et scoring explicable. Modèles de classification propriétaires pour la détection d'anomalies. NLP multilingue (FR, EN, langues locales) pour le bot WhatsApp.</p>
                  <div className="chips"><span className="tag">Gemini</span><span className="tag">OpenAI API</span><span className="tag blue">Scoring ML</span><span className="tag">NLP multilingue</span></div>
                </div>
              </div>

              <div className="pillar reveal" data-delay="1">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0018 0V5M3 12a9 3 0 0018 0" /></svg>
                </div>
                <div>
                  <h3>Data &amp; analytics</h3>
                  <p>Pipeline temps réel pour ingérer les transactions terrain. Data lake structuré pour entraîner les modèles. Tableaux de bord analytiques pour partenaires B2B.</p>
                  <div className="chips"><span className="tag">Kafka</span><span className="tag">dbt</span><span className="tag teal">BigQuery</span><span className="tag">Streamlit</span></div>
                </div>
              </div>

              <div className="pillar reveal" data-delay="2">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 17l6-6 4 4 6-6M14 7h6v6" /></svg>
                </div>
                <div>
                  <h3>Infrastructure</h3>
                  <p>Architecture cloud-native multi-région. API RESTful versionnée, webhooks signés pour partenaires. Haute disponibilité — SLA 99.9% sur la couche scoring.</p>
                  <div className="chips"><span className="tag">AWS</span><span className="tag">GCP</span><span className="tag">Kubernetes</span><span className="tag blue">Terraform</span></div>
                </div>
              </div>

              <div className="pillar reveal" data-delay="3">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" /></svg>
                </div>
                <div>
                  <h3>Mobile &amp; WhatsApp</h3>
                  <p>WhatsApp Business API (Meta Cloud API). Bot conversationnel multilingue. Accessible depuis tout téléphone avec internet basique — pas de smartphone requis.</p>
                  <div className="chips"><span className="tag">Meta Cloud API</span><span className="tag">Twilio</span><span className="tag teal">Bot multilingue</span></div>
                </div>
              </div>

              <div className="pillar reveal" data-delay="4">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h4M6 14h6" /><circle cx="17" cy="12" r="1.5" fill="currentColor" /></svg>
                </div>
                <div>
                  <h3>IoT — Boîtier ALODO</h3>
                  <p>Hardware edge computing pour traitement local et sync différé. Connectivité GSM/WiFi. Mise à jour firmware OTA signée. Autonomie 24h+ sur batterie, résistant à la chaleur.</p>
                  <div className="chips"><span className="tag">Edge compute</span><span className="tag">GSM / WiFi</span><span className="tag">OTA signé</span><span className="tag blue">24h batterie</span></div>
                </div>
              </div>

              <div className="pillar reveal" data-delay="5">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" /><path d="M9 12l2 2 4-4" /></svg>
                </div>
                <div>
                  <h3>Sécurité &amp; conformité</h3>
                  <p>Chiffrement TLS 1.3 partout, secure element sur boîtier, audit trail signé. Conformité RGPD et loi UEMOA sur les données personnelles dès le jour un.</p>
                  <div className="chips"><span className="tag">TLS 1.3</span><span className="tag">RGPD</span><span className="tag">SOC 2 cible</span><span className="tag teal">Audit signé</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="bg-grey">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Architecture</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Du marché au data center,<br />en une seule pipeline.</h2>
              </div>
              <p className="muted reveal" data-delay="2" style={{ maxWidth: "360px", margin: 0 }}>Schéma simplifié — la stack complète est documentée pour nos partenaires techniques.</p>
            </div>

            <div className="arch reveal">
              <div className="head">
                <h3>Pipeline ALODO · vue d'ensemble</h3>
                <span className="ver">v1.3 · build 2026.05</span>
              </div>

              <div className="arch-grid">
                <div className="arch-col">
                  <div className="lbl">EDGE · TERRAIN</div>
                  <h4>Boîtier &amp; téléphone</h4>
                  <div className="arch-row"><span className="d"></span>ALODO Box · firmware</div>
                  <div className="arch-row"><span className="d"></span>Capture transaction</div>
                  <div className="arch-row"><span className="d"></span>Pré-score local</div>
                  <div className="arch-row"><span className="d blue"></span>WhatsApp Bot (NLP)</div>
                </div>

                <div className="arch-col">
                  <div className="lbl">CORE · CLOUD</div>
                  <h4>Backend &amp; data</h4>
                  <div className="arch-row"><span className="d"></span>API gateway (Node / Express)</div>
                  <div className="arch-row"><span className="d"></span>Event bus (Kafka)</div>
                  <div className="arch-row"><span className="d blue"></span>Postgres + Data lake</div>
                  <div className="arch-row"><span className="d blue"></span>Modèles ML — scoring</div>
                  <div className="arch-row"><span className="d"></span>LLM orchestration (Gemini)</div>
                </div>

                <div className="arch-col">
                  <div className="lbl">B2B · PARTENAIRES</div>
                  <h4>API &amp; dashboards</h4>
                  <div className="arch-row"><span className="d"></span>API scoring REST</div>
                  <div className="arch-row"><span className="d"></span>Webhooks signés</div>
                  <div className="arch-row"><span className="d blue"></span>Dashboard IMF / banque</div>
                  <div className="arch-row"><span className="d"></span>Dashboard gouvernement</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stack */}
        <section>
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Stack technologique</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Ce que nous construisons avec.</h2>
              </div>
              <p className="muted reveal" data-delay="2" style={{ maxWidth: "360px", margin: 0 }}>Stack validée, sans dérive. Cohérence = vélocité long terme.</p>
            </div>

            <div className="stack">
              <div className="layer reveal">
                <div className="ix">01 · FRONT</div>
                <h3>Web &amp; mobile</h3>
                <ul><li>Next.js 14 (App Router)</li><li>React Native</li><li>Tailwind CSS</li><li>Framer Motion</li><li>shadcn/ui</li></ul>
              </div>
              <div className="layer reveal" data-delay="1">
                <div className="ix">02 · BACK</div>
                <h3>API &amp; services</h3>
                <ul><li>Node.js · Express</li><li>Next.js API Routes</li><li>PostgreSQL (Supabase)</li><li>Redis</li><li>Kafka</li></ul>
              </div>
              <div className="layer reveal" data-delay="2">
                <div className="ix">03 · IA</div>
                <h3>ML &amp; LLM</h3>
                <ul><li>Python · scikit-learn</li><li>PyTorch · transformers</li><li>Gemini · OpenAI API</li><li>LangGraph</li><li>Vector store</li></ul>
              </div>
              <div className="layer reveal" data-delay="3">
                <div className="ix">04 · INFRA</div>
                <h3>Cloud &amp; DevOps</h3>
                <ul><li>AWS · GCP</li><li>Vercel · Cloudflare</li><li>Terraform · GitHub Actions</li><li>Sentry · Grafana</li></ul>
              </div>
              <div className="layer reveal" data-delay="4">
                <div className="ix">05 · EDGE</div>
                <h3>Boîtier</h3>
                <ul><li>ESP32 · RP2040</li><li>FreeRTOS</li><li>OTA signé Ed25519</li><li>Secure Element</li><li>MQTT over TLS</li></ul>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="bg-dark">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Performance cible</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Production-ready, jour un.</h2>
              </div>
            </div>
            <div className="metrics">
              <div className="stat reveal"><div className="value teal">99.9%</div><div className="label">SLA disponibilité scoring</div></div>
              <div className="stat reveal" data-delay="1"><div className="value">&lt; 300<span style={{ fontSize: "0.5em" }}> ms</span></div><div className="label">latence API scoring p95</div></div>
              <div className="stat reveal" data-delay="2"><div className="value teal">24<span style={{ fontSize: "0.5em" }}> h</span></div><div className="label">autonomie boîtier en usage actif</div></div>
              <div className="stat reveal" data-delay="3"><div className="value">2G</div><div className="label">connectivité minimale supportée</div></div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="tight">
          <div className="container">
            <div className="cta-banner reveal">
              <div>
                <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Tech partnership</span>
                <h2 className="h2" style={{ marginTop: "12px", maxWidth: "22ch" }}>Vous voulez creuser l'architecture ou contribuer ?</h2>
                <p className="muted" style={{ margin: "16px 0 0", maxWidth: "44ch" }}>
                  Documentation technique sur demande. NDA possible pour les sujets sensibles.
                </p>
              </div>
              <div className="actions">
                <Link href="/contact" className="btn primary">Parler tech</Link>
                <Link href="/careers" className="btn outline">Rejoindre l'équipe</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
