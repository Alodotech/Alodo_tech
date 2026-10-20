"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/i18n/LanguageProvider";
import "./contact.css";

export default function Contact() {
  const { lang } = useLang();
  const en = lang === "en";
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || (en ? "We couldn't send your message right now." : "Impossible d'envoyer votre message pour le moment."));
      }

      setStatus("success");
      setFormData({
        fullName: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || (en ? "Connection error. Please try again." : "Erreur de connexion. Veuillez réessayer."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar activeKey="contact" />

      <main data-screen-label="11 Contact">
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow reveal">Contact</span>
            <h1 className="display reveal" data-delay="1" style={{ marginTop: "18px", maxWidth: "16ch" }}>
              {en ? "Let's talk." : "Parlons."}
            </h1>
            <p className="lead reveal" data-delay="2">
              {en
                ? "Investor, potential partner, candidate or journalist — we read every request and reply in under 48 hours."
                : "Que vous soyez investisseur, partenaire potentiel, candidat ou journaliste — nous lisons toutes les demandes et répondons en moins de 48 heures."}
            </p>
          </div>
        </section>

        <section className="tight">
          <div className="container">
            <div className="contact-grid">
              {/* Info column */}
              <div>
                <div className="info-block reveal">
                  <h4>{en ? "Direct contact" : "Contact Direct"}</h4>
                  <div className="contact-card">
                    <div className="ic">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                      </svg>
                    </div>
                    <div>
                      <h5>{en ? "General contact" : "Contact Général"}</h5>
                      <a href="mailto:partnership@alodotech.com">partnership@alodotech.com</a>
                    </div>
                  </div>
                </div>

                <div className="info-block reveal" data-delay="1">
                  <h4>{en ? "Location" : "Localisation"}</h4>
                  <div className="loc-card">
                    <div>
                      <h5>{en ? "Head office · Cotonou, Benin" : "Siège · Cotonou, Bénin"}</h5>
                      <p>{en ? <>Cadjèhoun · Business district<br />Pan-African operations · WAEMU &amp; CEMAC</> : <>Cadjèhoun · Quartier des affaires<br />Opérations panafricaines · UEMOA &amp; CEMAC</>}</p>
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


              </div>

              {/* Form */}
              <div>
                <form className="form-card reveal" onSubmit={handleSubmit}>
                  <span className="eyebrow">{en ? "Form" : "Formulaire"}</span>
                  <h3 className="h2" style={{ margin: "12px 0 28px" }}>{en ? "Send us a message." : "Envoyez-nous un message."}</h3>

                  {status === "error" && (
                    <div style={{ padding: "12px 16px", marginBottom: "18px", borderRadius: "12px", background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#991B1B", fontSize: "13px" }}>
                      {errorMessage}
                    </div>
                  )}

                  {status === "success" && (
                    <div style={{ padding: "14px 18px", marginBottom: "20px", borderRadius: "12px", background: "#ECFDF5", border: "1px solid #A7F3D0", color: "#065F46", fontSize: "13px", lineHeight: "1.5" }}>
                      ✓ <strong>{en ? "Thank you!" : "Merci !"}</strong> {en ? "Your message has been sent to the ALODO TECH team (" : "Votre message a bien été transmis à l'équipe ALODO TECH ("}<span style={{ textDecoration: "underline" }}>partnership@alodotech.co</span>{en ? "). We will reply within 48 business hours." : "). Nous vous répondrons sous 48 heures ouvrées."}
                    </div>
                  )}

                  <div className="form-row">
                    <div className="field">
                      <label>{en ? "Full name" : "Nom complet"}</label>
                      <input
                        type="text"
                        placeholder="Jean Kouassi"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                    <div className="field">
                      <label>{en ? "Work email" : "Email professionnel"}</label>
                      <input
                        type="email"
                        placeholder="jean@entreprise.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="field">
                      <label>{en ? "Company" : "Société · structure"}</label>
                      <input
                        type="text"
                        placeholder={en ? "Bank, MFI, fund…" : "Banque, IMF, fund…"}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                    <div className="field">
                      <label>{en ? "Subject" : "Objet"}</label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      >
                        <option value="">{en ? "Select…" : "Sélectionner…"}</option>
                        <option value="Investissement">{en ? "Investment" : "Investissement"}</option>
                        <option value="Partenariat B2B">{en ? "B2B partnership" : "Partenariat B2B"}</option>
                        <option value="Pilote MPME">{en ? "MSME pilot" : "Pilote MPME"}</option>
                        <option value="Presse / médias">{en ? "Press / media" : "Presse / médias"}</option>
                        <option value="Candidature">{en ? "Application" : "Candidature"}</option>
                        <option value="Autre">{en ? "Other" : "Autre"}</option>
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label>{en ? "Message" : "Message"}</label>
                    <textarea
                      placeholder={en ? "Tell us how we can help…" : "Dites-nous en quoi nous pouvons être utiles…"}
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={status === "success" ? { background: "var(--teal)", cursor: "default" } : {}}
                  >
                    {loading ? (en ? "Sending..." : "Envoi en cours...") : status === "success" ? (en ? "✓ Message sent · Reply within 48h" : "✓ Message envoyé · Réponse sous 48h") : (en ? "Send message" : "Envoyer le message")}
                  </button>
                  <p className="form-note">{en ? "Your data stays confidential. No resale, no spam." : "Vos données restent confidentielles. RGPD compliant — pas de revente, pas de spam."}</p>
                </form>
              </div>
            </div>

            {/* Response promise */}
            <div className="promise">
              <div className="promise-card reveal">
                <div className="v">&lt; 48 h</div>
                <div className="l">{en ? "Average response time, seven days a week." : "Temps de réponse moyen, sept jours sur sept."}</div>
              </div>
              <div className="promise-card reveal" data-delay="1">
                <div className="v">{en ? "2 languages" : "2 langues"}</div>
                <div className="l">{en ? "French · English — we reply in your language." : "Français · Anglais — répondez dans votre langue."}</div>
              </div>
              <div className="promise-card reveal" data-delay="2">
                <div className="v">{en ? "No fluff" : "Sans bullshit"}</div>
                <div className="l">{en ? "A real person. No chatbot, no recycled FAQ." : "Une vraie personne. Pas de chatbot, pas de FAQ recyclée."}</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="tight">
          <div className="container">
            <div className="cta-banner reveal">
              <div>
                <span className="eyebrow" style={{ color: "rgba(255,255,255,.6)" }}>{en ? "To go faster" : "Pour aller plus vite"}</span>
                <h2 className="h2" style={{ marginTop: "12px", maxWidth: "18ch" }}>{en ? "Book a slot directly with the team." : "Bookez un créneau direct avec l'équipe."}</h2>
                <p className="muted" style={{ margin: "16px 0 0", maxWidth: "44ch" }}>
                  {en ? "30 minutes on video. A co-founder online, ready to talk product, market or deal." : "30 minutes en visio. Co-fondateur en ligne, prêt à parler produit, marché ou deal."}
                </p>
              </div>
              <div className="actions">
                <a href="#" className="btn primary">{en ? "Open the calendar" : "Ouvrir le calendrier"}</a>
                {/* <Link href="/partners" className="btn outline">Voir le deck</Link> */}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
