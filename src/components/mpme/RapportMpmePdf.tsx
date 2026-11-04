"use client";

import { useEffect } from "react";
import { Application } from "@/lib/mpme/types";
import { buildNarrative } from "@/lib/mpme/narrative";

interface RapportMpmePdfProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
}

// ── Composant Footer Officiel répété sur chaque page A4 ──
function PageFooter({ pageNum }: { pageNum: number }) {
  return (
    <div className="pt-2.5 border-t border-[#E5E7EB] flex items-center justify-between text-[9px] text-[#6B7280] mt-auto shrink-0 select-none">
      <div className="font-semibold text-[#0A0A0A] tracking-wider uppercase">
        ALODO TECH — ALODO MPME
      </div>
      <div className="text-center font-medium leading-tight">
        <span className="block text-[#4B5563]">Cotonou N° RCCM RB/ABC/26 B 12180</span>
        <span className="block text-[#00C2A8] font-bold text-[8.5px] mt-0.5 tracking-wide">www.alodotech.com</span>
      </div>
      <div className="text-right font-medium">
        Page {pageNum}
      </div>
    </div>
  );
}

// ── Composant Header Officiel répété sur les pages intérieures ──
function PageHeader() {
  return (
    <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-6 shrink-0 select-none">
      <div className="flex items-center gap-2.5">
        <img
          src="/logo/logo.png"
          alt="ALODO TECH"
          className="h-6 w-auto"
        />
        <span className="text-xs font-bold tracking-tight text-[#0A0A0A]">
          <span className="text-[#EC663B]">ALODO</span> TECH
        </span>
      </div>
      <div className="text-[10px] text-[#6B7280] font-semibold uppercase tracking-wider">
        Rapport de diagnostic — ALODO MPME
      </div>
    </div>
  );
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

  const today = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const refCode = `ALODO-MPME-${application.id ? application.id.slice(0, 3).toUpperCase() : "001"}`;

  const handlePrint = () => {
    const prevTitle = document.title;
    const compName = comp?.name ? comp.name.replace(/[^a-zA-Z0-9_-]/g, "_") : "Entreprise";
    document.title = `Rapport_Diagnostic_ALODO_MPME_${compName}`;
    document.body.classList.add("printing-mpme-pdf");
    window.print();
    setTimeout(() => {
      document.title = prevTitle;
      document.body.classList.remove("printing-mpme-pdf");
    }, 1000);
  };

  const narrative = buildNarrative(application.diagnosticAnswers || []);
  const dimensions = narrative.dimensions;
  const actionsPrioritaires = narrative.priorities.length > 0
    ? narrative.priorities
    : [{
        priorite: "Moyenne" as const,
        couleur: "#6B7280",
        action: "Information à approfondir lors de l'entretien.",
        objectif: "Les réponses renseignées ne dégagent aucune action prioritaire.",
        echeance: "Entretien",
      }];

  return (
    <div
      className="fixed inset-0 z-[110] bg-[#1E293B]/80 backdrop-blur-md overflow-y-auto p-2 sm:p-6 print:static print:inset-auto print:bg-white print:p-0 print:m-0 print:overflow-visible print:w-full print:block"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* ── BARRE FLOTTANTE D'ACTION (ÉCRAN SEULEMENT) ── */}
      <div className="max-w-4xl mx-auto sticky top-2 z-50 p-4 bg-[#0A0A0A] text-white rounded-2xl flex items-center justify-between border border-white/10 shadow-2xl mb-6 print:hidden">
        <div className="flex items-center gap-3">
          <img
            src="/logo/logo.png"
            alt="ALODO TECH"
            style={{ height: "26px", width: "auto", filter: "brightness(0) invert(1)" }}
          />
          <div>
            <span className="text-sm font-bold block text-white font-tech">ALODO MPME — Rapport Officiel</span>
            <span className="text-xs text-emerald-400 font-medium">6 Pages A4 • Zéro jargon, zéro pourcentage</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-[#EC663B] hover:bg-[#d4562e] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Télécharger / Imprimer en PDF</span>
          </button>
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
            title="Fermer"
          >
            <span>✕ Fermer</span>
          </button>
        </div>
      </div>

      {/* ── CONTENEUR MULTI-PAGES A4 ── */}
      <div className="max-w-4xl mx-auto space-y-8 print:space-y-0 print:m-0 print:p-0 print:max-w-none print:w-full">

        {/* =========================================================================
            PAGE 1 : PAGE DE GARDE / COUVERTURE
            ========================================================================= */}
        <div className="pdf-page bg-white p-8 sm:p-14 rounded-2xl shadow-xl print:rounded-none print:shadow-none print:p-0 print:border-none min-h-[297mm] flex flex-col justify-between border border-[#E5E7EB]">
          {/* Logo en haut */}
          <div className="text-center pt-8">
            <img
              src="/logo/logo.png"
              alt="ALODO TECH"
              className="h-14 w-auto mx-auto mb-3"
            />
            <div className="text-xs font-bold text-[#6B7280] tracking-widest uppercase">
              ALODO TECH
            </div>
          </div>

          {/* Titre & Sous-titre */}
          <div className="text-center my-auto py-12">
            <h1 className="text-4xl sm:text-5xl font-black text-[#0A0A0A] font-tech tracking-tight mb-3">
              <span className="text-[#EC663B]">ALODO</span> MPME
            </h1>
            <p className="text-base sm:text-lg text-[#4B5563] font-medium">
              Rapport de diagnostic de votre entreprise
            </p>

            {/* Tableau d'identification */}
            <div className="max-w-lg mx-auto mt-12 border border-[#E5E7EB] rounded-xl overflow-hidden shadow-2xs text-left">
              <div className="grid grid-cols-3 p-3.5 border-b border-[#F3F4F6] bg-[#FAFAFA]">
                <span className="font-bold text-xs text-[#0A0A0A]">Entreprise</span>
                <span className="col-span-2 text-xs font-bold text-[#111827] uppercase">
                  {comp?.name || "ENTREPRISE"}
                </span>
              </div>
              <div className="grid grid-cols-3 p-3.5 border-b border-[#F3F4F6] bg-white">
                <span className="font-bold text-xs text-[#0A0A0A]">Dirigeant</span>
                <span className="col-span-2 text-xs text-[#374151]">
                  {comp?.leaderName || "Nom du dirigeant"}
                </span>
              </div>
              <div className="grid grid-cols-3 p-3.5 border-b border-[#F3F4F6] bg-[#FAFAFA]">
                <span className="font-bold text-xs text-[#0A0A0A]">Date du diagnostic</span>
                <span className="col-span-2 text-xs text-[#374151]">
                  {today}
                </span>
              </div>
              <div className="grid grid-cols-3 p-3.5 bg-white">
                <span className="font-bold text-xs text-[#0A0A0A]">Référence</span>
                <span className="col-span-2 text-xs font-mono font-bold text-[#EC663B]">
                  {refCode}
                </span>
              </div>
            </div>

            {/* Slogan officiel */}
            <div className="mt-14 text-xs font-bold text-[#4B5563] tracking-widest uppercase">
              ÉVALUER • COMPRENDRE • PRIORISER • AGIR
            </div>
          </div>

          <PageFooter pageNum={1} />
        </div>

        {/* =========================================================================
            PAGE 2 : 1. VOTRE ENTREPRISE EN UN COUP D'ŒIL
            ========================================================================= */}
        <div className="pdf-page bg-white p-8 sm:p-14 rounded-2xl shadow-xl print:rounded-none print:shadow-none print:p-0 print:border-none min-h-[297mm] flex flex-col justify-between border border-[#E5E7EB]">
          <div>
            <PageHeader />

            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] font-tech mb-2">
              1. Votre entreprise en un coup d'œil
            </h2>
            <p className="text-xs text-[#4B5563] leading-relaxed mb-5">
              Le diagnostic ALODO MPME analyse l'entreprise à travers 9 dimensions afin d'identifier ses forces, ses points de vigilance et ses priorités d'action.
            </p>

            {/* Tableau des 9 dimensions */}
            <div className="border border-[#0F172A] rounded-xl overflow-hidden mb-6">
              <div className="grid grid-cols-12 bg-[#0F172A] text-white p-2.5 text-[10px] font-bold uppercase tracking-wider">
                <span className="col-span-2 text-center">Niveau</span>
                <span className="col-span-3">Dimension</span>
                <span className="col-span-7">Observation synthétique</span>
              </div>

              {dimensions.map((d) => (
                <div
                  key={d.dimensionId}
                  className="grid grid-cols-12 p-2.5 text-xs border-b border-[#E5E7EB] last:border-b-0 items-center bg-white hover:bg-slate-50/50"
                >
                  <div className="col-span-2 flex items-center justify-center">
                    <span
                      className={`w-3.5 h-3.5 rounded-xs shrink-0 ${
                        d.niveau === "solide"
                          ? "bg-emerald-600"
                          : d.niveau === "moyen"
                          ? "bg-[#EC663B]"
                          : d.niveau === "vigilance"
                          ? "bg-amber-600"
                          : "bg-slate-400"
                      }`}
                      title={d.niveau}
                    />
                  </div>
                  <span className="col-span-3 font-semibold text-[#0A0A0A] text-xs">
                    {d.title.charAt(0) + d.title.slice(1).toLowerCase()}
                  </span>
                  <span className="col-span-7 text-xs text-[#4B5563] leading-tight">
                    {d.observation}
                  </span>
                </div>
              ))}
            </div>

            {/* Lecture rapide */}
            <div className="space-y-2 text-xs pt-1">
              <h3 className="font-extrabold text-sm text-[#0A0A0A] mb-1">
                Lecture rapide
              </h3>
              <p className="text-[#374151] leading-relaxed">
                <strong>Points forts :</strong>{" "}
                {narrative.strengths.length > 0 ? narrative.strengths.join(" ") : "Information à approfondir."}
              </p>
              <p className="text-[#374151] leading-relaxed">
                <strong>Points de vigilance :</strong>{" "}
                {narrative.watchpoints.length > 0 ? narrative.watchpoints.join(" ") : "Information à approfondir."}
              </p>
              <p className="text-[#374151] leading-relaxed">
                <strong>Priorités :</strong>{" "}
                {narrative.priorities.length > 0
                  ? narrative.priorities.slice(0, 3).map((item) => item.action).join(" ")
                  : "Information à approfondir."}
              </p>
            </div>
          </div>

          <PageFooter pageNum={2} />
        </div>

        {/* =========================================================================
            PAGE 3 : 2. CE QUE NOUS RETENONS DE VOTRE DIAGNOSTIC
            ========================================================================= */}
        <div className="pdf-page bg-white p-8 sm:p-14 rounded-2xl shadow-xl print:rounded-none print:shadow-none print:p-0 print:border-none min-h-[297mm] flex flex-col justify-between border border-[#E5E7EB]">
          <div>
            <PageHeader />

            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] font-tech mb-5">
              2. Ce que nous retenons de votre diagnostic
            </h2>

            <div className="space-y-4">
              {/* VOS POINTS FORTS */}
              <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]">
                <div className="text-xs font-black text-[#15803D] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>✓</span> VOS POINTS FORTS
                </div>
                <ul className="space-y-1.5 text-xs text-[#166534]">
                  {(narrative.strengths.length > 0 ? narrative.strengths : ["Information à approfondir : aucune force ne se déduit des réponses renseignées."]).map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* VOS POINTS DE VIGILANCE */}
              <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]">
                <div className="text-xs font-black text-[#B45309] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>■</span> VOS POINTS DE VIGILANCE
                </div>
                <ul className="space-y-1.5 text-xs text-[#92400E]">
                  {(narrative.watchpoints.length > 0 ? narrative.watchpoints : ["Information à approfondir : aucun point faible ne se déduit des réponses renseignées."]).map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* VOS PRIORITÉS */}
              <div className="p-4 rounded-xl bg-[#FFF5F2] border border-[#FECACA]">
                <div className="text-xs font-black text-[#EC663B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>!</span> VOS PRIORITÉS
                </div>
                <ol className="space-y-1.5 text-xs text-[#991B1B]">
                  {(narrative.priorities.length > 0 ? narrative.priorities.slice(0, 3) : []).map((item, index) => (
                    <li key={item.action} className="flex items-start gap-2">
                      <span className="font-bold">{index + 1}.</span>
                      <span>{item.action}</span>
                    </li>
                  ))}
                  {narrative.priorities.length === 0 && (
                    <li className="flex items-start gap-2">
                      <span className="font-bold">1.</span>
                      <span>Information à approfondir : aucune priorité ne se déduit des réponses renseignées.</span>
                    </li>
                  )}
                </ol>
              </div>

              {/* CE QUE CELA SIGNIFIE */}
              <div className="pt-4">
                <h3 className="font-extrabold text-sm text-[#0A0A0A] mb-1.5">
                  Ce que cela signifie
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  {narrative.meaning}
                </p>
                {narrative.checks.length > 0 && (
                  <div className="mt-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="text-[11px] font-black text-[#0F172A] uppercase tracking-wider mb-1.5">
                      À vérifier en entretien
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#334155]">
                      {narrative.checks.map((check) => (
                        <li key={check}>{check}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <PageFooter pageNum={3} />
        </div>

        {/* =========================================================================
            PAGE 4 : 3. ANALYSE SYNTHÉTIQUE DES 9 DIMENSIONS (PARTIE 1)
            ========================================================================= */}
        <div className="pdf-page bg-white p-8 sm:p-14 rounded-2xl shadow-xl print:rounded-none print:shadow-none print:p-0 print:border-none min-h-[297mm] flex flex-col justify-between border border-[#E5E7EB]">
          <div>
            <PageHeader />

            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] font-tech mb-4">
              3. Analyse synthétique des 9 dimensions
            </h2>

            <div className="border border-[#E5E7EB] rounded-xl divide-y divide-[#E5E7EB] overflow-hidden text-xs">
              {dimensions.slice(0, 5).map((dim) => (
                <div key={dim.dimensionId} className="p-3 bg-white">
                  <div className="grid grid-cols-12 gap-2 mb-1.5">
                    <span className="col-span-3 font-bold text-[#0A0A0A] uppercase tracking-wider text-[11px]">
                      DIMENSION
                    </span>
                    <span className="col-span-9 font-bold text-[#EC663B] text-[11px]">
                      {dim.num} — {dim.title}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2 mb-1">
                    <span className="col-span-3 font-bold text-[#0A0A0A] text-[11px]">
                      CONSTAT
                    </span>
                    <p className="col-span-9 text-[#4B5563] leading-tight">
                      {dim.constat}
                    </p>
                  </div>

                  <div className="grid grid-cols-12 gap-2">
                    <span className="col-span-3 font-bold text-[#0A0A0A] text-[11px]">
                      ACTION
                    </span>
                    <p className="col-span-9 font-semibold text-[#065F46] leading-tight">
                      {dim.action}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <PageFooter pageNum={4} />
        </div>

        {/* =========================================================================
            PAGE 5 : 3. ANALYSE SYNTHÉTIQUE DES 9 DIMENSIONS (PARTIE 2)
            ========================================================================= */}
        <div className="pdf-page bg-white p-8 sm:p-14 rounded-2xl shadow-xl print:rounded-none print:shadow-none print:p-0 print:border-none min-h-[297mm] flex flex-col justify-between border border-[#E5E7EB]">
          <div>
            <PageHeader />

            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] font-tech mb-4">
              3. Analyse synthétique des 9 dimensions (suite)
            </h2>

            <div className="border border-[#E5E7EB] rounded-xl divide-y divide-[#E5E7EB] overflow-hidden text-xs mb-6">
              {dimensions.slice(5).map((dim) => (
                <div key={dim.dimensionId} className="p-3 bg-white">
                  <div className="grid grid-cols-12 gap-2 mb-1.5">
                    <span className="col-span-3 font-bold text-[#0A0A0A] uppercase tracking-wider text-[11px]">
                      DIMENSION
                    </span>
                    <span className="col-span-9 font-bold text-[#EC663B] text-[11px]">
                      {dim.num} — {dim.title}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2 mb-1">
                    <span className="col-span-3 font-bold text-[#0A0A0A] text-[11px]">
                      CONSTAT
                    </span>
                    <p className="col-span-9 text-[#4B5563] leading-tight">
                      {dim.constat}
                    </p>
                  </div>

                  <div className="grid grid-cols-12 gap-2">
                    <span className="col-span-3 font-bold text-[#0A0A0A] text-[11px]">
                      ACTION
                    </span>
                    <p className="col-span-9 font-semibold text-[#065F46] leading-tight">
                      {dim.action}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Encadré d'orientation méthodologique */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#334155] leading-relaxed">
              <strong className="block text-[#0F172A] font-bold mb-1">
                Approche méthodologique ALODO
              </strong>
              <p>
                Chaque action recommandée ci-dessus s'inscrit dans un ordre logique d'exécution. Les ajustements opérationnels et administratifs préparent la capacité de l'entreprise à absorber la croissance sans fragiliser sa trésorerie quotidienne.
              </p>
            </div>
          </div>

          <PageFooter pageNum={5} />
        </div>

        {/* =========================================================================
            PAGE 6 : 4. VOS PRIORITÉS D'ACTION
            ========================================================================= */}
        <div className="pdf-page bg-white p-8 sm:p-14 rounded-2xl shadow-xl print:rounded-none print:shadow-none print:p-0 print:border-none min-h-[297mm] flex flex-col justify-between border border-[#E5E7EB]">
          <div>
            <PageHeader />

            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] font-tech mb-2">
              4. Vos priorités d'action
            </h2>
            <p className="text-xs text-[#4B5563] leading-relaxed mb-5">
              Les actions ci-dessous sont classées selon leur niveau d'urgence et leur impact potentiel sur le fonctionnement de l'entreprise.
            </p>

            {/* Tableau des priorités d'action */}
            <div className="border border-[#0F172A] rounded-xl overflow-hidden mb-6 text-xs">
              <div className="grid grid-cols-12 bg-[#0F172A] text-white p-2.5 text-[10px] font-bold uppercase tracking-wider">
                <span className="col-span-2">Priorité</span>
                <span className="col-span-4">Action</span>
                <span className="col-span-4">Objectif</span>
                <span className="col-span-2 text-right">Échéance</span>
              </div>

              {actionsPrioritaires.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 p-2.5 border-b border-[#E5E7EB] last:border-b-0 items-center bg-white hover:bg-slate-50/50"
                >
                  <div className="col-span-2 flex items-center gap-1.5 font-bold text-[#0A0A0A]">
                    <span
                      className="w-2.5 h-2.5 rounded-xs shrink-0"
                      style={{ backgroundColor: item.couleur }}
                    />
                    <span>{item.priorite}</span>
                  </div>
                  <span className="col-span-4 font-semibold text-[#111827]">
                    {item.action}
                  </span>
                  <span className="col-span-4 text-[#4B5563]">
                    {item.objectif}
                  </span>
                  <span className="col-span-2 text-right font-medium text-[#0A0A0A]">
                    {item.echeance}
                  </span>
                </div>
              ))}
            </div>

            {/* Votre prochaine étape */}
            <div className="mb-5">
              <h3 className="font-extrabold text-sm text-[#0A0A0A] mb-2">
                Votre prochaine étape
              </h3>
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="font-extrabold text-xs text-[#0F172A] uppercase tracking-wider mb-1">
                  COMMENCER PAR L'ESSENTIEL
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Ne cherchez pas à tout corriger en même temps. Commencez par les priorités identifiées, mesurez les progrès et réévaluez régulièrement la situation de l'entreprise.
                </p>
              </div>
            </div>

            {/* Conclusion */}
            <div className="space-y-1.5 mb-4">
              <h3 className="font-extrabold text-sm text-[#0A0A0A]">
                Conclusion
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                {narrative.conclusion}
              </p>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Ce rapport constitue un point de départ pour vous permettre de mieux comprendre votre entreprise et de prendre des décisions plus éclairées.
              </p>
            </div>

            {/* Validation officielle, Cachet & Signature CEO */}
            <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between">
              <div>
                <div className="font-black text-base tracking-wider text-[#0A0A0A] font-tech mb-0.5">
                  <span className="text-[#EC663B]">ALODO</span> TECH
                </div>
                <div className="text-[10px] font-bold text-[#6B7280] tracking-widest uppercase mb-1">
                  Évaluer • Comprendre • Prioriser • Agir
                </div>
                <p className="text-[10px] text-[#9CA3AF] max-w-xs leading-tight">
                  Document officiel émis par la Direction Générale ALODO TECH dans le cadre du Programme National MPME.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B5563] mb-0.5">
                  Direction Générale
                </span>
                <img
                  src="/images/cachet-alodo.png"
                  alt="Cachet et Signature CEO ALODO TECH"
                  className="h-24 w-auto object-contain select-none"
                />
                <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider">
                  Chief Executive Officer
                </span>
              </div>
            </div>
          </div>

          <PageFooter pageNum={6} />
        </div>

      </div>
    </div>
  );
}
