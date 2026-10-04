"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CandidatureConfirmationPage() {
  const [companyName, setCompanyName] = useState<string>("votre entreprise");
  const [appId, setAppId] = useState<string>("");

  useEffect(() => {
    const savedName = sessionStorage.getItem("alodo_last_company_name");
    const savedId = sessionStorage.getItem("alodo_last_app_id");
    if (savedName) setCompanyName(savedName);
    if (savedId) setAppId(savedId);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] flex flex-col font-sans">
      <Navbar activeKey="mpme" />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full bg-white p-8 sm:p-12 rounded-3xl border border-[#EBEBEB] text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 text-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-200">
            ✓
          </div>

          <span className="text-xs uppercase tracking-widest text-[#00C2A8] font-bold">
            Diagnostic & Profil Enregistrés
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-4 text-[#0A0A0A]">
            Félicitations, {companyName} !
          </h1>

          <p className="text-sm text-[#6E6E73] mb-6">
            Votre diagnostic de maturité a été enregistré avec succès. Vous pouvez dès maintenant consulter vos résultats par dimension et votre feuille de route personnalisée.
          </p>

          {/* INVITATION À REJOINDRE LA COMMUNAUTÉ / CHAÎNE WHATSAPP */}
          <div className="bg-gradient-to-br from-[#F0FDF4] to-[#FAFAFA] border border-[#25D366]/30 rounded-2xl p-6 sm:p-7 mb-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto">
              <img
                src="https://img.icons8.com/color/48/whatsapp--v1.png"
                alt="WhatsApp"
                className="w-7 h-7"
              />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-[#0A0A0A]">
                Rejoignez la Communauté des MPME d'ALODO
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4A4F] mt-1.5 max-w-md mx-auto leading-relaxed">
                Pour suivre la suite du programme, les annonces officielles, les opportunités d'accompagnement et les prochains ateliers, rejoignez notre chaîne WhatsApp officielle.
              </p>
            </div>

            <div className="pt-1">
              <a
                href="https://whatsapp.com/channel/0029VbDTqIa0lwgh8GZWuS1k"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-full text-sm shadow-lg shadow-[#25D366]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <img
                  src="https://img.icons8.com/color/48/whatsapp--v1.png"
                  alt=""
                  className="w-5 h-5"
                />
                <span>Rejoindre la Chaîne WhatsApp →</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/mpme"
              className="py-3 px-6 bg-white hover:bg-[#F5F5F7] text-[#0A0A0A] font-semibold border border-[#D1D1D6] rounded-full text-xs sm:text-sm transition-all text-center"
            >
              Retour à l'accueil du programme
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-[#EBEBEB] text-xs text-[#6E6E73]">
            Besoin d'aide ? Contactez notre équipe sur <strong>partnership@alodotech.com</strong>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
