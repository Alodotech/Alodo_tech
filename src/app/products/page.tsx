"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/i18n/LanguageProvider";
import "./products.css";

/** ALODO et COINAI restent dans le code, masqués tant que ce drapeau est faux. */
const SHOW_OTHER_PRODUCTS = false;

export default function ProductsPage() {
  const { lang } = useLang();
  const en = lang === "en";
  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    const revealIo = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealIo.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(e => revealIo.observe(e));
    return () => revealIo.disconnect();
  }, []);

  return (
    <>
      <Navbar activeKey="products" />

      <main className="products-listing">
        <section className="products-hero">
          <div className="container">
            <span className="eyebrow reveal">{en ? "Technology portfolio" : "Portfolio Technologique"}</span>
            <h1 className="display reveal" data-delay="1" style={{ marginTop: "16px" }}>
              {en ? "Building the future of digital Africa." : "Bâtir le futur de l'Afrique digitale."}
            </h1>
            <p className="lead reveal" data-delay="2" style={{ maxWidth: "600px", marginTop: "24px" }}>
              {en
                ? "ALODO TECH designs and deploys integrated infrastructure for the challenges of emerging markets, from financial inclusion to artificial intelligence."
                : "ALODO TECH conçoit et déploie des infrastructures intégrées pour relever les défis des marchés émergents, de l'inclusion financière à l'intelligence artificielle."}
            </p>
          </div>
        </section>

        <section className="products-grid">
          <div className="container">
            <div className="p-list">

              {SHOW_OTHER_PRODUCTS && (
              <>
              {/* ALODO */}
              <div className="p-card reveal">
                <div className="p-content">
                  <div className="p-tag">FINTECH · IOT</div>
                  <h2 className="h1">ALODO</h2>
                  <p className="lead">
                    L'infrastructure d'inclusion financière pour les MPME.
                    Un boîtier intelligent qui transforme chaque transaction cash en donnée numérique
                    et rend l'économie informelle finançable.
                  </p>
                  <ul className="p-features">
                    <li>IoT Hub de paiement</li>
                    <li>WhatsApp AI Bot pour la gestion</li>
                    <li>Scoring de crédit en temps réel</li>
                  </ul>
                  <div className="actions">
                    <Link href="/products/alodo" className="btn primary">Explorer ALODO</Link>
                  </div>
                </div>
                <div className="p-visual alodo">
                  {/* Mini visual mockup inside the card */}
                  <div className="mockup-box">
                    <div className="box-header">ALODO BOX</div>
                    <div className="box-screen">+ 12 500 F</div>
                  </div>
                </div>
              </div>

              {/* COINAI */}
              <div className="p-card reveal" data-delay="1">
                <div className="p-content">
                  <div className="p-tag">INVESTTECH · IA</div>
                  <h2 className="h1">COINAI</h2>
                  <p className="lead">
                    Intelligence Artificielle pour les marchés émergents.
                    Une plateforme de trading et d'analytics qui utilise des modèles de Machine Learning
                    pour optimiser l'investissement sur les bourses africaines.
                  </p>
                  <ul className="p-features">
                    <li>Analytics prédictifs BRVM/NGX</li>
                    <li>Trading algorithmique automatisé</li>
                    <li>Alertes IA personnalisées</li>
                  </ul>
                  <div className="actions">
                    <Link href="/products/coinai" className="btn primary">Explorer COINAI</Link>
                  </div>
                </div>
                <div className="p-visual coinai">
                  <div className="mockup-chart">
                    <div className="bar"></div>
                    <div className="bar" style={{ height: "60%" }}></div>
                    <div className="bar" style={{ height: "85%" }}></div>
                  </div>
                </div>
              </div>
              </>
              )}

              {/* ALODO MPME */}
              <div className="p-card reveal" data-delay="2">
                <div className="p-content">
                  <div className="p-tag">{en ? "PROGRAM · DIAGNOSTIC" : "PROGRAMME · DIAGNOSTIC"}</div>
                  <h2 className="h1">ALODO MPME</h2>
                  <p className="lead">
                    {en
                      ? "The maturity diagnostic for micro, small and medium enterprises. An assessment across 9 dimensions that identifies strengths, watchpoints and the priority actions needed to grow."
                      : "Le diagnostic de maturité pour les micro, petites et moyennes entreprises. Une évaluation sur 9 dimensions qui identifie les forces, les points de vigilance et les actions prioritaires pour grandir."}
                  </p>
                  <ul className="p-features">
                    <li>{en ? "Free diagnostic across 9 dimensions" : "Diagnostic gratuit sur 9 dimensions"}</li>
                    <li>{en ? "Maturity score and detailed profile" : "Score de maturité et profil détaillé"}</li>
                    <li>{en ? "Personalized roadmap" : "Feuille de route personnalisée"}</li>
                  </ul>
                  <div className="actions">
                    <Link href="/mpme" className="btn primary">{en ? "Explore ALODO MPME" : "Explorer ALODO MPME"}</Link>
                  </div>
                </div>
                <div className="p-visual mpme">
                  <div className="mockup-score">
                    <div className="score-kicker">{en ? "MATURITY" : "MATURITÉ"}</div>
                    <div className="score-val">78</div>
                    <div className="score-rows" aria-hidden="true">
                      <span style={{ width: "82%" }} />
                      <span style={{ width: "64%" }} />
                      <span style={{ width: "91%" }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className="cta-alt reveal">
          <div className="container">
            <div className="cta-content">
              <h2>{en ? "Have a specific need?" : "Vous avez un besoin spécifique ?"}</h2>
              <p>{en ? "Our experts help you implement tailored solutions." : "Nos experts vous accompagnent dans la mise en œuvre de solutions sur mesure."}</p>
              <Link href="/contact" className="btn outline">{en ? "Let's talk" : "Parlons-en"}</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
