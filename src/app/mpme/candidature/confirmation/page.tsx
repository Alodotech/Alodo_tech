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

          <div className="text-left bg-[#FAFAFA] p-6 rounded-2xl border border-[#EBEBEB] space-y-3 mb-8 text-xs sm:text-sm text-[#3A3A3C]">
            <div className="flex gap-3">
              <span className="text-[#EC663B] font-bold">01.</span>
              <p>
                <strong>Dossier bien reçu :</strong> Vos informations et vos réponses au diagnostic ont été enregistrées avec succès.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-[#EC663B] font-bold">02.</span>
              <p>
                <strong>Retour par email :</strong> Nous vous ferons un retour par email dans un délai de 7 à 14 jours.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/mpme"
              className="w-full py-3.5 px-6 bg-[#EC663B] hover:bg-[#d4562e] text-white font-bold rounded-full text-sm transition-all text-center shadow-md shadow-[#EC663B]/20"
            >
              Retour à l'accueil du programme →
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
