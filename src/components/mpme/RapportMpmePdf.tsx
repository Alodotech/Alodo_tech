"use client";

import { useEffect } from "react";
import { Application, DiagnosticReport, DiagnosticAnswer } from "@/lib/mpme/types";
import { MpmeStorage } from "@/lib/mpme/storage";

interface RapportMpmePdfProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
}

// ── Helpers pour traduire les réponses en langage humain de terrain ───────────

function getTerrainDiagnostique(application: Application, report: DiagnosticReport | null) {
  const comp = application.company;
  const answers: DiagnosticAnswer[] = application.diagnosticAnswers || [];

  const defis: { titre: string; constat: string; solution: string }[] = [];
  const atouts: string[] = [];

  // 1. Trésorerie & Compte bancaire
  if (!comp?.hasProBankAccount) {
    defis.push({
      titre: "Séparation argent personnel & argent du commerce",
      constat: "Vos recettes professionnelles et vos dépenses familiales se mélangent encore (comptes personnels ou Mobile Money privé).",
      solution: "Créer une poche ou un compte séparé dès le 1er mois pour savoir enfin exactement ce que votre commerce génère chaque soir.",
    });
  } else {
    atouts.push("Vous avez déjà pris le bon réflexe de séparer vos finances personnelles de celles de l'entreprise.");
  }

  // 2. Formalisation légale
  if (!comp?.isFormalized) {
    defis.push({
      titre: "Reconnaissance administrative (RCCM / IFU)",
      constat: "Votre activité n'est pas encore enregistrée officiellement auprès des institutions.",
      solution: "Pas de panique : ALODO vous aide à régulariser vos papiers pas à pas sans démarches compliquées, afin de vous protéger et d'accéder aux marchés officiels.",
    });
  } else {
    atouts.push("Votre entreprise est formellement enregistrée (IFU / RCCM), une base précieuse pour grandir.");
  }

  // 3. Suivi quotidien des chiffres
  const fin1 = answers.find((a) => a.questionId === "fin_1")?.value;
  if (fin1 === "none" || fin1 === "when_tight" || !fin1) {
    defis.push({
      titre: "Visibilité sur les entrées et sorties d'argent",
      constat: "Vous gérez la trésorerie 'à vue' ou seulement quand il y a une urgence, ce qui crée du stress à chaque fin de mois.",
      solution: "Mettre en place la règle des 5 minutes par jour : un cahier de caisse ou un outil simple pour noter chaque vente et chaque dépense.",
    });
  } else {
    atouts.push("Vous avez l'habitude de suivre vos mouvements d'argent régulièrement.");
  }

  // 4. Accords et contrats
  const form3 = answers.find((a) => a.questionId === "form_3")?.value;
  if (form3 === "mostly_verbal" || form3 === "some_verbal") {
    defis.push({
      titre: "Accords oraux avec les clients et fournisseurs",
      constat: "La majorité de vos ententes reposent sur la parole, ce qui vous expose à des impayés et des désaccords non protégés.",
      solution: "Sécuriser vos relations avec des bons de commande, reçus et accords simples écrits pour ne plus perdre d'argent.",
    });
  }

  // 5. Utilisation du numérique
  const digi1 = answers.find((a) => a.questionId === "digi_1")?.value;
  if (digi1 === "paper_only" || digi1 === "basic_whatsapp" || !digi1) {
    defis.push({
      titre: "Modernisation des outils de vente",
      constat: "Vos opérations reposent encore beaucoup sur le papier et la mémoire, sans archivage numérique sécurisé.",
      solution: "Adopter des outils simples sur votre téléphone (WhatsApp Business, catalogue numérique, facturation mobile) pour gagner du temps.",
    });
  }

  // 6. Problème déclaré par le dirigeant
  const mainProblem = comp?.singleBiggestProblem;

  // Atouts complémentaires tirés du rapport si disponibles
  if (report?.strengths && report.strengths.length > 0) {
    report.strengths.slice(0, 2).forEach((s) => {
      const clean = s.replace(/\s*\(Score:\s*[\d/]+\)/gi, "").replace(/\/100/g, "").replace(/\s*—\s*Base solide.*/gi, "").trim();
      if (clean && !atouts.includes(clean)) atouts.push(clean);
    });
  }

  return { defis, atouts, mainProblem };
}

export default function RapportMpmePdf({ application, isOpen, onClose }: RapportMpmePdfProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !application) return null;

  const comp = application.company;
  const report: DiagnosticReport | null =
    application.diagnosticReport ||
    (typeof window !== "undefined" ? MpmeStorage.getLatestReport() : null);

  const today = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePrint = () => {
    const prevTitle = document.title;
    const compName = comp?.name ? comp.name.replace(/[^a-zA-Z0-9_-]/g, "_") : "Entreprise";
    document.title = `Feuille_De_Route_MPME_${compName}`;
    window.print();
    setTimeout(() => {
      document.title = prevTitle;
    }, 1000);
  };

  const { defis, atouts, mainProblem } = getTerrainDiagnostique(application, report);

  return (
    <div
      className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md overflow-y-auto p-2 sm:p-6 print:static print:inset-auto print:bg-white print:p-0 print:m-0 print:overflow-visible print:w-full print:block"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-[#EBEBEB] overflow-hidden my-2 sm:my-6 print:my-0 print:border-none print:shadow-none print:rounded-none print:max-w-none print:w-full">
        
        {/* ── Barre d'action supérieure TOUJOURS VISIBLE (Sticky) ── */}
        <div className="sticky top-0 z-50 p-4 bg-[#0A0A0A] text-white flex items-center justify-between border-b border-white/10 shadow-lg print:hidden shrink-0">
          <div className="flex items-center gap-3">
            <img
              src="/logo/logo.png"
              alt="ALODO TECH"
              style={{ height: "28px", width: "auto", filter: "brightness(0) invert(1)" }}
            />
            <div>
              <span className="text-sm font-bold block">Feuille de Route Dirigeant — Version Terrain</span>
              <span className="text-xs text-emerald-400">100% pratique pour le chef d'entreprise • Format A4</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-[#00C2A8] hover:bg-[#009e8a] text-white font-bold text-xs rounded-full shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Télécharger en PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
              title="Fermer (Échap)"
            >
              <span>✕ Fermer</span>
            </button>
          </div>
        </div>

        {/* ── Corps du document imprimable (A4) ── */}
        <div
          id="printable-rapport-mpme"
          className="p-8 sm:p-12 text-[#111827] bg-white font-sans space-y-6 print:p-6 print:space-y-5"
          style={{ minHeight: "297mm" }}
        >
          {/* EN-TÊTE CHALEUREUX & INSTITUTIONNEL */}
          <div className="flex items-center justify-between border-b-2 border-[#EC663B] pb-5 avoid-break">
            <div className="flex items-center gap-3">
              <img src="/logo/logo.png" alt="ALODO TECH" style={{ height: "42px", width: "auto" }} />
              <div>
                <div className="text-xl font-bold tracking-tight text-[#0A0A0A]">
                  <span className="text-[#EC663B]">ALODO</span> TECH
                </div>
                <div className="text-xs font-semibold text-[#00C2A8] tracking-wider uppercase">
                  Programme National d'Accompagnement MPME
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#FFF5F2] text-[#EC663B] border border-[#EC663B]/20 inline-block mb-1">
                BILAN DE SITUATION & FEUILLE DE ROUTE
              </span>
              <div className="text-xs text-[#6B7280]">Émis le {today}</div>
            </div>
          </div>

          {/* FICHE DU DIRIGEANT & DE L'ENTREPRISE */}
          <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 avoid-break">
            <div>
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block mb-0.5">
                Entreprise accompagnée
              </span>
              <h1 className="text-2xl font-extrabold text-[#0A0A0A] leading-tight">
                {comp?.name || "Votre Entreprise"}
              </h1>
              <p className="text-xs text-[#4B5563] mt-1">
                Dirigeant(e) : <strong>{comp?.leaderName || "Chère Dirigeante / Cher Dirigeant"}</strong>
                {comp?.city ? ` · ${comp.city}` : ""}
                {comp?.sector ? ` · ${comp.sector}` : ""}
              </p>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 text-center shrink-0 shadow-xs">
              <span className="text-[10px] font-bold text-[#6B7280] uppercase block">Engagement ALODO</span>
              <span className="text-sm font-extrabold text-[#00C2A8] block mt-0.5">
                Accompagnement Sur Mesure
              </span>
            </div>
          </div>

          {/* MOT D'INTRODUCTION BIENVEILLANT ALODO */}
          <div className="p-4 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-xs text-[#1E3A8A] leading-relaxed avoid-break">
            <strong className="block text-sm font-bold text-[#1D4ED8] mb-1">
              👋 Le message de l'équipe ALODO : Vous n'êtes plus seul(e)
            </strong>
            <p>
              Merci d'avoir pris le temps de faire ce diagnostic en toute honnêteté. 
              Le Programme ALODO MPME a été créé spécialement pour <strong>les entrepreneurs du terrain qui font face à de vraies difficultés</strong> : 
              argent mélangé, imprévus de caisse, manque de temps, documents administratifs en retard. 
              Ce document n'est pas un examen ou une note d'école, mais un <strong>guide pratique</strong> pour régler vos blocages prioritaires, étape par étape.
            </p>
          </div>

          {/* LE PROBLÈME MAJEUR QUE LE DIRIGEANT A PARTAGÉ */}
          {mainProblem && (
            <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] avoid-break">
              <span className="text-[11px] font-bold text-[#B45309] uppercase tracking-wider block mb-1">
                🎯 Ce qui vous empêche de dormir la nuit (votre priorité n°1 déclarée) :
              </span>
              <p className="text-sm font-bold text-[#92400E] italic">
                "{mainProblem}"
              </p>
              <p className="text-[11px] text-[#B45309] mt-2">
                → C'est exactement sur ce point que nos experts vont concentrer leurs premiers efforts avec vous.
              </p>
            </div>
          )}

          {/* VOS VRAIS DÉFIS ACTUELS (EN LANGAGE PARLÉ SANS SCORE) */}
          <div className="space-y-3 avoid-break">
            <div className="border-b border-[#E5E7EB] pb-2">
              <h2 className="text-sm font-extrabold text-[#0A0A0A] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EC663B]" />
                Ce qui bloque aujourd'hui dans votre quotidien (et comment on le règle)
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Ces points sont tout à fait normaux pour une entreprise en croissance. Voici ce que nous allons corriger ensemble :
              </p>
            </div>

            <div className="space-y-2.5">
              {defis.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs text-xs space-y-1.5 avoid-break"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FEE2E2] text-[#991B1B] text-[10px] font-bold flex items-center justify-center shrink-0">
                      !
                    </span>
                    <h3 className="font-bold text-[#111827] text-xs">
                      {item.titre}
                    </h3>
                  </div>

                  <p className="text-[#4B5563] pl-7 leading-relaxed">
                    <strong className="text-[#374151]">Le constat :</strong> {item.constat}
                  </p>

                  <div className="pl-7 pt-1 text-[#065F46] bg-[#ECFDF5] p-2 rounded-lg mt-1 flex items-start gap-1.5">
                    <span className="font-bold shrink-0">💡 Solution ALODO :</span>
                    <span>{item.solution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VOS FORCES SUR LESQUELLES NOUS ALLONS NOUS APPUYER */}
          {atouts.length > 0 && (
            <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] avoid-break">
              <h3 className="text-xs font-bold text-[#166534] uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span> Vos forces & vos points d'appui déjà en place
              </h3>
              <ul className="space-y-1 text-xs text-[#14532D]">
                {atouts.map((atout, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{atout}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* PLAN D'ACTION SIMPLE PAS À PAS (SUR 90 JOURS) */}
          <div className="space-y-3 avoid-break">
            <div className="border-b border-[#E5E7EB] pb-2">
              <h2 className="text-sm font-extrabold text-[#0A0A0A] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00C2A8]" />
                Votre feuille de route concrète pour les 90 prochains jours
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Des étapes réalistes, simples à suivre même si vous avez peu de temps chaque semaine :
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* MOIS 1 */}
              <div className="p-3.5 rounded-xl bg-[#FFF5F2] border border-[#EC663B]/30 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold text-[#EC663B] uppercase tracking-wider mb-1">
                    Mois 1 (0 – 30 jours)
                  </div>
                  <h4 className="font-extrabold text-[#0A0A0A] mb-2 text-xs">
                    Stopper les fuites d'argent
                  </h4>
                  <ul className="space-y-1.5 text-[#374151]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#EC663B] font-bold">1.</span>
                      <span>Ouvrir une poche / compte dédié au commerce.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#EC663B] font-bold">2.</span>
                      <span>Noter les ventes et dépenses chaque soir.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#EC663B] font-bold">3.</span>
                      <span>Identifier les dépenses inutiles du mois.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* MOIS 2 */}
              <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#F59E0B]/30 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold text-[#B45309] uppercase tracking-wider mb-1">
                    Mois 2 (30 – 60 jours)
                  </div>
                  <h4 className="font-extrabold text-[#0A0A0A] mb-2 text-xs">
                    Sécuriser vos relations
                  </h4>
                  <ul className="space-y-1.5 text-[#374151]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#B45309] font-bold">1.</span>
                      <span>Mettre par écrit les accords avec les clients.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#B45309] font-bold">2.</span>
                      <span>Lancer les démarches simples de régularisation.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#B45309] font-bold">3.</span>
                      <span>Relancer poliment les anciens clients fidèles.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* MOIS 3 */}
              <div className="p-3.5 rounded-xl bg-[#ECFDF5] border border-[#10B981]/30 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold text-[#047857] uppercase tracking-wider mb-1">
                    Mois 3 (60 – 90 jours)
                  </div>
                  <h4 className="font-extrabold text-[#0A0A0A] mb-2 text-xs">
                    Préparer l'expansion & le crédit
                  </h4>
                  <ul className="space-y-1.5 text-[#374151]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#047857] font-bold">1.</span>
                      <span>Calculer votre vrai bénéfice net mensuel.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#047857] font-bold">2.</span>
                      <span>Constituer un historique propre de trésorerie.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#047857] font-bold">3.</span>
                      <span>Préparer une demande de financement crédible.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT & REJOINDRE LA COMMUNAUTÉ */}
          <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs avoid-break">
            <div>
              <strong className="text-sm font-bold text-[#0A0A0A] block mb-0.5">
                Besoin d'aide pour appliquer cette feuille de route ?
              </strong>
              <p className="text-[#4B5563]">
                Rejoignez le canal WhatsApp de la communauté ALODO MPME pour poser vos questions aux conseillers.
              </p>
            </div>

            <a
              href="https://whatsapp.com/channel/0029VbDTqIa0lwgh8GZWuS1k"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#25D366] text-white font-bold text-xs inline-flex items-center gap-2 shrink-0 hover:opacity-90 transition-all shadow-xs"
            >
              <span>Canal WhatsApp Officiel</span>
              <span>→</span>
            </a>
          </div>

          {/* PIED DE PAGE PROPRE */}
          <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-[10px] text-[#9CA3AF] avoid-break">
            <div>
              <strong>ALODO TECH SARL</strong> · République du Bénin · partnership@alodotech.com
              <div className="text-[9px] mt-0.5">Document confidentiel réservé au dirigeant de l'entreprise accompagnée.</div>
            </div>
            <div className="font-semibold text-[#00C2A8]">
              ALODO MPME — Bâtissons votre avenir pas à pas
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
