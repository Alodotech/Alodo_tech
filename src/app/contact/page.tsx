"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./contact.css";

export default function Contact() {
  const [formStatus, setFormStatus] = useState("Envoyer le message");
  const [formStyle, setFormStyle] = useState({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("✓ Message envoyé · réponse sous 48h");
    setFormStyle({ background: "var(--teal)" });
  };

  return (
    <>
      <Navbar activeKey="contact" />

      <main data-screen-label="11 Contact">
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow reveal">Contact</span>
            <h1 className="display reveal" data-delay="1" style={{ marginTop: "18px", maxWidth: "16ch" }}>
              Parlons.
            </h1>
            <p className="lead reveal" data-delay="2">
              Que vous soyez investisseur, partenaire potentiel, candidat ou journaliste —
              nous lisons toutes les demandes et répondons en moins de 48 heures.
            </p>
          </div>
        </section>

        <section className="tight">
          <div className="container">
            <div className="contact-grid">
              {/* Info column */}
              <div>
                <div className="info-block reveal">
                  <h4>Emails dédiés</h4>
                  <div className="email-list">
                    <div className="email-item">
                      <div className="ic blue"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></div>
                      <div>
                        <div className="l">Investisseurs</div>
                        <a href="mailto:investors@alodo.tech">investors@alodo.tech</a>
                      </div>
                    </div>
                    <div className="email-item">
                      <div className="ic teal"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M9 11a4 4 0 100-8 4 4 0 000 8z" /><path d="M2 21v-2a5 5 0 015-5h4a5 5 0 015-5v2" /></svg></div>
                      <div>
                        <div className="l">Partenariats &amp; B2B</div>
                        <a href="mailto:partners@alodo.tech">partners@alodo.tech</a>
                      </div>
                    </div>
                    <div className="email-item">
                      <div className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg></div>
                      <div>
                        <div className="l">Carrières</div>
                        <a href="mailto:join@alodo.tech">join@alodo.tech</a>
                      </div>
                    </div>
                    <div className="email-item">
                      <div className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16v16H4z" /><path d="M4 8h16M8 4v16" /></svg></div>
                      <div>
                        <div className="l">Presse &amp; général</div>
                        <a href="mailto:hello@alodo.tech">hello@alodo.tech</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="info-block reveal" data-delay="1">
                  <h4>Localisation</h4>
                  <div className="loc-card">
                    <div>
                      <h5>Siège · Cotonou, Bénin</h5>
                      <p>Cadjèhoun · Quartier des affaires<br />Opérations panafricaines · UEMOA &amp; CEMAC</p>
                    </div>
                    <div className="loc-mini-map">
                      <svg viewBox="0 0 80 80" fill="none">
                        <circle cx="40" cy="40" r="20" fill="rgba(0,194,168,.2)" stroke="#00C2A8" strokeWidth="1" />
                        <circle cx="40" cy="40" r="4" fill="#00C2A8" />
                        <circle cx="40" cy="40" r="10" fill="none" stroke="#00C2A8" strokeOpacity=".5">
                          <animate attributeName="r" values="4;14;4" dur="2.4s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values=".6;0;.6" dur="2.4s" repeatCount="indefinite" />
                        </circle>
                        <text x="40" y="68" textAnchor="middle" fontFamily="Inter" fontSize="7" fill="rgba(255,255,255,.6)">COTONOU</text>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="info-block reveal" data-delay="2">
                  <h4>Réseaux sociaux</h4>
                  <div className="socials-row">
                    <a href="#">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21H18.6v-5.6c0-1.34-.02-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V21H10V9z" /></svg>
                      LinkedIn
                    </a>
                    <a href="#">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21l-6.51 7.44L22 22h-6.797l-4.808-6.05L4.8 22H2.04l6.98-7.97L2 2h6.91l4.34 5.5L18.244 2zm-1.193 18h1.66L7.05 4H5.29l11.76 16z" /></svg>
                      Twitter / X
                    </a>
                    <a href="#">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.54 2.34 1.1 2.91.84.09-.65.35-1.1.63-1.35-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 015 0c1.9-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0012 2z" /></svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div>
                <form className="form-card reveal" onSubmit={handleSubmit}>
                  <span className="eyebrow">Formulaire</span>
                  <h3 className="h2" style={{ margin: "12px 0 28px" }}>Envoyez-nous un message.</h3>

                  <div className="form-row">
                    <div className="field">
                      <label>Nom complet</label>
                      <input type="text" placeholder="Jean Kouassi" required />
                    </div>
                    <div className="field">
                      <label>Email professionnel</label>
                      <input type="email" placeholder="jean@entreprise.com" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="field">
                      <label>Société · structure</label>
                      <input type="text" placeholder="Banque, IMF, fund…" />
                    </div>
                    <div className="field">
                      <label>Objet</label>
                      <select required>
                        <option value="">Sélectionner…</option>
                        <option>Investissement</option>
                        <option>Partenariat B2B</option>
                        <option>Pilote MPME</option>
                        <option>Presse / médias</option>
                        <option>Candidature</option>
                        <option>Autre</option>
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label>Message</label>
                    <textarea placeholder="Dites-nous en quoi nous pouvons être utiles…" required></textarea>
                  </div>

                  <button type="submit" style={formStyle}>{formStatus}</button>
                  <p className="form-note">Vos données restent confidentielles. RGPD compliant — pas de revente, pas de spam.</p>
                </form>
              </div>
            </div>

            {/* Response promise */}
            <div className="promise">
              <div className="promise-card reveal">
                <div className="v">&lt; 48 h</div>
                <div className="l">Temps de réponse moyen, sept jours sur sept.</div>
              </div>
              <div className="promise-card reveal" data-delay="1">
                <div className="v">3 langues</div>
                <div className="l">Français · English · Português — répondez dans votre langue.</div>
              </div>
              <div className="promise-card reveal" data-delay="2">
                <div className="v">Sans bullshit</div>
                <div className="l">Une vraie personne. Pas de chatbot, pas de FAQ recyclée.</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="tight">
          <div className="container">
            <div className="cta-banner reveal">
              <div>
                <span className="eyebrow" style={{ color: "rgba(255,255,255,.6)" }}>Pour aller plus vite</span>
                <h2 className="h2" style={{ marginTop: "12px", maxWidth: "18ch" }}>Bookez un créneau direct avec l'équipe.</h2>
                <p className="muted" style={{ margin: "16px 0 0", maxWidth: "44ch" }}>
                  30 minutes en visio. Co-fondateur en ligne, prêt à parler produit, marché ou deal.
                </p>
              </div>
              <div className="actions">
                <a href="#" className="btn primary">Ouvrir le calendrier</a>
                <Link href="/partners" className="btn outline">Voir le deck</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
