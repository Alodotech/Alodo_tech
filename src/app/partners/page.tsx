"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./partners.css";

export default function Partners() {
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
      <Navbar activeKey="partners" />

      <main data-screen-label="10 Partners & Investors">
        {/* Hero */}
        <section className="partners-hero">
          <div className="container">
            <span className="eyebrow reveal">Investir · Partenariats</span>
            <h1 className="display reveal" data-delay="1" style={{ marginTop: "18px" }}>
              Rejoignez la <span className="acc">révolution financière</span> africaine.
            </h1>
            <p className="lead reveal" data-delay="2" style={{ maxWidth: "720px" }}>
              ALODO TECH ouvre son tour pré-amorçage. Une opportunité de prendre position
              sur l'infrastructure financière du continent — avant tout le monde.
            </p>
            <div className="actions reveal" data-delay="3" style={{ marginTop: "36px", display: "flex", gap: "12px" }}>
              <a href="#deck" className="btn primary">Recevoir le deck</a>
              <a href="mailto:investors@alodo.tech" className="btn outline">investors@alodo.tech</a>
            </div>

            <div className="opener-meta reveal" data-delay="4">
              <div><div className="k">Tour</div><div className="v">Pré-amorçage</div></div>
              <div><div className="k">Cible</div><div className="v">1,2 M USD</div></div>
              <div><div className="k">Valorisation</div><div className="v">Sur demande</div></div>
              <div><div className="k">Closing visé</div><div className="v">Q4 2026</div></div>
            </div>
          </div>
        </section>

        {/* Opportunity */}
        <section className="bg-grey">
          <div className="container">
            <div className="opp-grid">
              <div>
                <span className="eyebrow reveal">Opportunité de marché</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "14px" }}>44 millions de MPME en attente d'infrastructure.</h2>
                <p className="lead reveal" data-delay="2" style={{ marginTop: "18px", maxWidth: "44ch" }}>
                  Le marché des MPME africaines sous-équipées est l'un des plus grands segments
                  d'inclusion financière non adressés au monde. Et il s'ouvre maintenant.
                </p>
                <p className="muted reveal" data-delay="3" style={{ marginTop: "18px", fontSize: "14px", maxWidth: "44ch" }}>
                  Sources : Banque Mondiale, IFC, BCEAO. Données 2024–2025.
                </p>
              </div>
              <div className="funnel reveal" data-delay="2">
                <div className="funnel-row"><div className="v">44M</div><div className="l"><b>TAM</b><br />MPME en Afrique subsaharienne</div></div>
                <div className="funnel-row"><div className="v blue">12M</div><div className="l"><b>SAM</b><br />MPME en zone UEMOA + CEMAC + EAC phase 1</div></div>
                <div className="funnel-row"><div className="v teal">500K</div><div className="l"><b>SOM</b><br />Cible 36 mois — pilote + scale UEMOA</div></div>
                <div className="funnel-row"><div className="v">€2.4 Md</div><div className="l"><b>Volume crédit annuel</b><br />activable sur la cible SAM</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* Why now */}
        <section>
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Pourquoi maintenant</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Quatre fenêtres qui s'ouvrent en même temps.</h2>
              </div>
            </div>
            <div className="why">
              <div className="why-card reveal"><div className="ix">01 · TECH</div><h3>WhatsApp natif</h3><p>L'API Business est mature, accessible, et adoptée massivement en Afrique. Plus besoin d'app.</p></div>
              <div className="why-card reveal" data-delay="1"><div className="ix">02 · HARDWARE</div><h3>IoT à 25 USD</h3><p>Le coût d'un edge device industriel a été divisé par 4 en 5 ans. Le boîtier devient rentable.</p></div>
              <div className="why-card reveal" data-delay="2"><div className="ix">03 · DATA</div><h3>LLM accessibles</h3><p>Gemini et OpenAI rendent abordables des analyses qui demandaient une équipe ML il y a 2 ans.</p></div>
              <div className="why-card reveal" data-delay="3"><div className="ix">04 · POLITIQUE</div><h3>Signal régulateur</h3><p>BCEAO, BEAC et la plupart des banques centrales africaines poussent l'inclusion. Régulation favorable.</p></div>
            </div>
          </div>
        </section>

        {/* Types of partnership */}
        <section className="bg-grey">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Trois façons de nous rejoindre</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Investir, distribuer, ou co-construire.</h2>
              </div>
            </div>
            <div className="partner-types">
              <div className="pt feat reveal">
                <span className="label">Capital</span>
                <h3>Investissement equity</h3>
                <p>Rejoindre le tour pré-amorçage. Ticket minimum 25 000 USD. Représentation au comité d'investisseurs.</p>
                <ul>
                  <li>SAFE ou equity direct (Y Combinator standard)</li>
                  <li>Reporting trimestriel détaillé</li>
                  <li>Accès au pipeline produit et roadmap</li>
                  <li>Connexion à l'écosystème ALODO</li>
                </ul>
                <a href="#deck" className="btn primary cta" style={{ background: "var(--teal)", color: "#00261f" }}>Demander un appel</a>
              </div>
              <div className="pt reveal" data-delay="1">
                <span className="label">Commercial</span>
                <h3>Partenariat distribution</h3>
                <p>Banques, IMF, opérateurs télécoms qui veulent déployer ALODO dans leur réseau MPME.</p>
                <ul>
                  <li>Modèle revenue share</li>
                  <li>Co-branding possible</li>
                  <li>Pilote 6 mois, scale 18 mois</li>
                  <li>Formation des équipes commerciales</li>
                </ul>
                <Link href="/solutions" className="btn dark cta">Voir solutions B2B</Link>
              </div>
              <div className="pt reveal" data-delay="2">
                <span className="label">Tech</span>
                <h3>Partenariat technique</h3>
                <p>Fournisseurs de paiement, brokers, banques avec API ouvertes — co-construction.</p>
                <ul>
                  <li>Intégration API bidirectionnelle</li>
                  <li>Roadmap technique partagée</li>
                  <li>NDA et SLA personnalisés</li>
                  <li>Mention partenariat publique</li>
                </ul>
                <Link href="/contact" className="btn outline cta">Nous écrire</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Témoignages</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Ce que disent nos premiers partenaires.</h2>
              </div>
              <p className="muted reveal" data-delay="2" style={{ maxWidth: "360px", margin: 0, fontSize: "13px" }}>
                Témoignages anonymisés à la demande des partenaires sous NDA — noms complets fournis sur demande.
              </p>
            </div>
            <div className="testi-grid">
              <div className="testi reveal">
                <blockquote className="quote">"ALODO nous a permis de prêter à un segment que nous évitions par défaut depuis 15 ans. Le scoring tient ses promesses — nos NPL sur les cohortes équipées sont à un tiers de notre moyenne historique."</blockquote>
                <div className="from">
                  <div className="av">DR</div>
                  <div><div className="name">D. R.</div><div className="role">Directeur Risque · IMF partenaire (Bénin)</div></div>
                </div>
              </div>
              <div className="testi reveal" data-delay="1">
                <blockquote className="quote">"L'API est propre, la doc est sérieuse, l'équipe répond en heures, pas en jours. C'est un standard rare dans la fintech africaine."</blockquote>
                <div className="from">
                  <div className="av">KO</div>
                  <div><div className="name">K. O.</div><div className="role">CTO · Plateforme paiement régionale</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deck request */}
        <section id="deck">
          <div className="container">
            <div className="deck-box reveal">
              <div className="deck-side">
                <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Deck investisseur</span>
                <h2 className="h1" style={{ marginTop: "14px", maxWidth: "16ch" }}>Recevez le deck<br />en moins de 24h.</h2>
                <ul>
                  <li><span className="num">1</span><div><b>Vous remplissez le formulaire</b><p>Quelques informations qualifiantes — pas plus.</p></div></li>
                  <li><span className="num">2</span><div><b>Nous validons</b><p>Notre équipe revoit la demande pour garantir un échange utile des deux côtés.</p></div></li>
                  <li><span className="num">3</span><div><b>Deck + calendrier</b><p>Vous recevez le deck par email et un lien Calendly pour un appel co-fondateur.</p></div></li>
                </ul>
              </div>
              <form className="deck-form" onSubmit={(e) => {
                e.preventDefault();
                const btn = e.currentTarget.querySelector('button');
                if (btn) btn.textContent = '✓ Demande reçue · réponse sous 24h';
              }}>
                <div className="field">
                  <label>Nom complet</label>
                  <input type="text" placeholder="Jean Kouassi" required />
                </div>
                <div className="field">
                  <label>Email professionnel</label>
                  <input type="email" placeholder="jean@fund.com" required />
                </div>
                <div className="field">
                  <label>Structure</label>
                  <input type="text" placeholder="VC, family office, business angel…" required />
                </div>
                <div className="field">
                  <label>Type d'intérêt</label>
                  <select required>
                    <option value="">Sélectionner…</option>
                    <option>Investissement equity</option>
                    <option>Partenariat distribution</option>
                    <option>Partenariat technique</option>
                    <option>Sourcing / mise en relation</option>
                  </select>
                </div>
                <div className="field">
                  <label>Message</label>
                  <textarea placeholder="Ticket envisagé, thèse d'investissement, contexte…"></textarea>
                </div>
                <button type="submit">Demander le deck</button>
              </form>
            </div>
          </div>
        </section>

        {/* Direct */}
        <section className="tight">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Contact direct</span>
                <h2 className="h1 reveal" data-delay="1" style={{ marginTop: "16px" }}>Vous préférez parler tout de suite ?</h2>
              </div>
            </div>
            <div className="direct">
              <div className="direct-card reveal">
                <div className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 6h16v12H4z" /><path d="M4 6l8 7 8-7" /></svg></div>
                <h4>Email dédié</h4>
                <p>Réponse co-fondateur sous 48h.<br /><a href="mailto:investors@alodo.tech">investors@alodo.tech</a></p>
              </div>
              <div className="direct-card reveal" data-delay="1">
                <div className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg></div>
                <h4>Calendrier direct</h4>
                <p>Bookez un créneau 30 min avec un co-fondateur.<br /><a href="#">cal.com/alodo-tech</a></p>
              </div>
              <div className="direct-card reveal" data-delay="2">
                <div className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 12a8 8 0 1116 0 8 8 0 01-16 0z" /><path d="M16 12h-4V8" /></svg></div>
                <h4>Sous 48h</h4>
                <p>Tour ouvert jusqu'à Q4 2026. Décisions accélérées pour les leads.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
