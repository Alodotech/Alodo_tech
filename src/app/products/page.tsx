"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./products.css";

export default function ProductsPage() {
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
            <span className="eyebrow reveal">Portfolio Technologique</span>
            <h1 className="display reveal" data-delay="1" style={{ marginTop: "16px" }}>
              Bâtir le futur de l'Afrique digitale.
            </h1>
            <p className="lead reveal" data-delay="2" style={{ maxWidth: "600px", marginTop: "24px" }}>
              ALODO TECH conçoit et déploie des infrastructures intégrées pour relever les défis
              des marchés émergents, de l'inclusion financière à l'intelligence artificielle.
            </p>
          </div>
        </section>

        <section className="products-grid">
          <div className="container">
            <div className="p-list">

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

            </div>
          </div>
        </section>

        <section className="cta-alt reveal">
          <div className="container">
            <div className="cta-content">
              <h2>Vous avez un besoin spécifique ?</h2>
              <p>Nos experts vous accompagnent dans la mise en œuvre de solutions sur mesure.</p>
              <Link href="/contact" className="btn outline">Parlons-en</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
