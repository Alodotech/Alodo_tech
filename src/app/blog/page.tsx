"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/i18n/LanguageProvider";
import "./blog.css";

export default function Blog() {
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
      <Navbar activeKey="blog" />

      <main data-screen-label="08 Blog">
        {/* Hero */}
        <section className="page-hero">
          <div className="container">
            <div className="blog-head">
              <div>
                <span className="eyebrow reveal">{en ? "Blog · Insights" : "Blog · Insights"}</span>
                <h1 className="display reveal" data-delay="1" style={{ marginTop: "18px", fontSize: "clamp(24px, 4vw, 56px)" }}>
                  {en ? "Field notes on African innovation." : "Notes de terrain sur l'innovation africaine."}
                </h1>
                <p className="lead reveal" data-delay="2" style={{ marginTop: "18px" }}>
                  {en
                    ? "Analysis, data, pilot feedback. We share what we learn while building tomorrow's digital infrastructure."
                    : "Analyses, données, retours pilotes. Nous partageons ce que nous apprenons en construisant l'infrastructure digitale de demain."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section style={{ padding: "80px 0 160px", textAlign: "center" }}>
          <div className="container">
            <h2 className="h2 reveal" style={{ color: "var(--grey-800)" }}>{en ? "Our first articles are on the way." : "Nos premiers articles arrivent bientôt."}</h2>
            <p className="lead reveal" data-delay="1" style={{ marginTop: "16px", color: "var(--grey-500)", maxWidth: "44ch", margin: "16px auto 0" }}>
              {en
                ? "Join the newsletter below to be notified when we publish on digital transformation and artificial intelligence."
                : "Inscrivez-vous à notre newsletter ci-dessous pour être notifié de nos publications sur la transformation digitale et l'intelligence artificielle."}
            </p>
          </div>
        </section>

        {/* Newsletter */}
        <section className="tight">
          <div className="container">
            <div className="nl-box reveal">
              <div>
                <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Newsletter</span>
                <h2 className="h2" style={{ marginTop: "12px" }}>{en ? "One African fintech essay. Once a month." : "Une analyse fintech africaine. Une fois par mois."}</h2>
                <p className="muted" style={{ marginTop: "12px", color: "rgba(255,255,255,0.65)", maxWidth: "44ch" }}>
                  {en
                    ? "No spam, no pop-ups. Just an essay signed by the team, delivered on the first Monday of the month."
                    : "Pas de spam, pas de pop-up. Juste un essai signé par l'équipe, livré le premier lundi du mois."}
                </p>
              </div>
              <div>
                <form className="nl-form" onSubmit={(e) => {
                  e.preventDefault();
                  const btn = e.currentTarget.querySelector('button');
                  if (btn) btn.textContent = en ? "✓ Subscribed" : "✓ Inscrit";
                }}>
                  <input type="email" placeholder={en ? "you@email.com" : "votre@email.com"} required />
                  <button type="submit">{en ? "Subscribe" : "S'abonner"}</button>
                </form>
                <p className="nl-note">{en ? "By subscribing, you agree to receive our analysis. Unsubscribe in one click." : "En vous inscrivant, vous acceptez de recevoir nos analyses. Désinscription en un clic."}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
