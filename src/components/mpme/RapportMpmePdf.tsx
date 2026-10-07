"use client";

import { useEffect } from "react";
import { Application, DiagnosticReport, DiagnosticAnswer } from "@/lib/mpme/types";
import { MpmeStorage } from "@/lib/mpme/storage";

interface RapportMpmePdfProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
}

interface DimensionData {
  id: string;
  num: string;
  title: string;
  niveau: "solide" | "moyen" | "vigilance";
  observation: string;
  constat: string;
  action: string;
}

function computeReportContent(application: Application, _report: DiagnosticReport | null) {
  const comp = application.company;
  const answers: DiagnosticAnswer[] = application.diagnosticAnswers || [];

  const getAns = (qId: string) => answers.find((a) => a.questionId === qId)?.value;

  // 1. FORMALISATION
  const isForm = comp?.isFormalized || getAns("form_1") === "fully_registered";
  const dim1: DimensionData = {
    id: "formalisation",
    num: "01",
    title: "FORMALISATION",
    niveau: isForm ? "solide" : "vigilance",
    observation: isForm
      ? "Cadre juridique et administratif globalement en place."
      : "Formalisation en cours, statut juridique à finaliser.",
    constat: isForm
      ? "L'activité dispose d'un cadre juridique établi. Les documents administratifs essentiels sont à maintenir à jour."
      : "L'activité n'est pas encore totalement enregistrée. Les formalités d'immatriculation sont à engager.",
    action: isForm
      ? "Maintenir un suivi régulier des obligations et documents de l'entreprise."
      : "Finaliser l'enregistrement officiel (RCCM, IFU) avec l'accompagnement ALODO.",
  };

  // 2. FISCALITÉ & CONFORMITÉ
  const dim2: DimensionData = {
    id: "fiscalite",
    num: "02",
    title: "FISCALITÉ & CONFORMITÉ",
    niveau: "moyen",
    observation: "Suivi existant, mais certaines échéances doivent être mieux anticipées.",
    constat: "Le suivi fiscal existe, mais certaines échéances nécessitent davantage d'anticipation.",
    action: "Mettre en place un calendrier des obligations et échéances.",
  };

  // 3. FINANCE
  const fin1 = getAns("fin_1");
  const hasCashTrack = fin1 === "daily_weekly";
  const dim3: DimensionData = {
    id: "finance",
    num: "03",
    title: "FINANCE",
    niveau: hasCashTrack ? "solide" : "vigilance",
    observation: hasCashTrack
      ? "Suivi régulier de trésorerie en place, marges à consolider."
      : "Le suivi de trésorerie et des marges doit être renforcé.",
    constat: hasCashTrack
      ? "Les flux financiers sont documentés, mais le calcul des marges par produit peut être affiné."
      : "Les flux financiers sont connus, mais la trésorerie n'est pas suivie selon un rythme régulier.",
    action: "Mettre en place un tableau mensuel de trésorerie et de calcul des marges.",
  };

  // 4. COMPTABILITÉ
  const dim4: DimensionData = {
    id: "comptabilite",
    num: "04",
    title: "COMPTABILITÉ",
    niveau: "moyen",
    observation: "Informations disponibles mais encore peu exploitées pour décider.",
    constat: "Les informations comptables existent, mais elles sont encore peu utilisées pour orienter les décisions.",
    action: "Suivre régulièrement les indicateurs clés de l'activité.",
  };

  // 5. COMMERCIAL
  const dim5: DimensionData = {
    id: "commercial",
    num: "05",
    title: "COMMERCIAL",
    niveau: "solide",
    observation: "Activité commerciale régulière et clientèle existante.",
    constat: "L'entreprise dispose d'une activité commerciale régulière et d'une clientèle existante.",
    action: "Renforcer le suivi des ventes, clients et marges.",
  };

  // 6. DIGITALISATION
  const dim6: DimensionData = {
    id: "digitalisation",
    num: "06",
    title: "DIGITALISATION",
    niveau: "moyen",
    observation: "Quelques outils utilisés, mais plusieurs tâches restent manuelles.",
    constat: "Plusieurs tâches restent manuelles malgré la disponibilité d'outils numériques.",
    action: "Identifier les tâches pouvant être simplifiées ou automatisées.",
  };

  // 7. OPÉRATIONS
  const dim7: DimensionData = {
    id: "operations",
    num: "07",
    title: "OPÉRATIONS",
    niveau: "moyen",
    observation: "Organisation fonctionnelle, avec des procédures encore peu formalisées.",
    constat: "L'activité fonctionne, mais certaines pratiques reposent encore sur les habitudes de l'équipe.",
    action: "Formaliser les principales procédures de production et de livraison.",
  };

  // 8. RESSOURCES HUMAINES
  const dim8: DimensionData = {
    id: "rh",
    num: "08",
    title: "RESSOURCES HUMAINES",
    niveau: "solide",
    observation: "Équipe adaptée à la taille actuelle de l'activité.",
    constat: "L'équipe correspond aux besoins actuels de l'entreprise.",
    action: "Clarifier les rôles, responsabilités et objectifs de chaque membre.",
  };

  // 9. FINANÇABILITÉ
  const dim9: DimensionData = {
    id: "financabilite",
    num: "09",
    title: "FINANÇABILITÉ",
    niveau: "vigilance",
    observation: "Préparation insuffisante pour présenter rapidement un dossier solide.",
    constat: "La préparation actuelle ne permet pas encore de présenter rapidement un dossier complet.",
    action: "Structurer progressivement les pièces et informations nécessaires.",
  };

  const dimensions = [dim1, dim2, dim3, dim4, dim5, dim6, dim7, dim8, dim9];

  // Actions prioritaires
  const actionsPrioritaires = [
    {
      priorite: "Haute",
      couleur: "#DC2626",
      action: "Mettre en place un suivi mensuel de trésorerie",
      objectif: "Anticiper les besoins et tensions de trésorerie.",
      echeance: "0–30 jours",
    },
    {
      priorite: "Haute",
      couleur: "#DC2626",
      action: "Structurer les données financières et comptables clés",
      objectif: "Décider à partir d'informations fiables.",
      echeance: "0–30 jours",
    },
    {
      priorite: "Moyenne",
      couleur: "#EC663B",
      action: "Formaliser les principales procédures",
      objectif: "Réduire les erreurs et les dépendances.",
      echeance: "30–60 jours",
    },
    {
      priorite: "Moyenne",
      couleur: "#EC663B",
      action: "Préparer un dossier de financement de base",
      objectif: "Être prêt à saisir une opportunité de financement.",
      echeance: "60–90 jours",
    },
  ];

  return { dimensions, actionsPrioritaires };
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
  const report: DiagnosticReport | null =
    application.diagnosticReport ||
    (typeof window !== "undefined" ? MpmeStorage.getLatestReport() : null);

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

  const { dimensions, actionsPrioritaires } = computeReportContent(application, report);

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
                  key={d.id}
                  className="grid grid-cols-12 p-2.5 text-xs border-b border-[#E5E7EB] last:border-b-0 items-center bg-white hover:bg-slate-50/50"
                >
                  <div className="col-span-2 flex items-center justify-center">
                    <span
                      className={`w-3.5 h-3.5 rounded-xs shrink-0 ${
                        d.niveau === "solide"
                          ? "bg-emerald-600"
                          : d.niveau === "moyen"
                          ? "bg-[#EC663B]"
                          : "bg-amber-600"
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
                <strong>Points forts :</strong> formalisation, activité commerciale et équipe.
              </p>
              <p className="text-[#374151] leading-relaxed">
                <strong>Points de vigilance :</strong> trésorerie, exploitation des données comptables, organisation et digitalisation.
              </p>
              <p className="text-[#374151] leading-relaxed">
                <strong>Priorités :</strong> renforcer le pilotage financier, structurer les processus et préparer la capacité de financement.
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
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Activité commerciale déjà installée avec clientèle active.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Cadre juridique globalement structuré.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Équipe adaptée au fonctionnement actuel de l'entreprise.</span>
                  </li>
                </ul>
              </div>

              {/* VOS POINTS DE VIGILANCE */}
              <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]">
                <div className="text-xs font-black text-[#B45309] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>■</span> VOS POINTS DE VIGILANCE
                </div>
                <ul className="space-y-1.5 text-xs text-[#92400E]">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Trésorerie suivie de manière irrégulière.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Données comptables encore peu utilisées pour piloter l'activité.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Plusieurs opérations reposent encore sur des pratiques non formalisées.</span>
                  </li>
                </ul>
              </div>

              {/* VOS PRIORITÉS */}
              <div className="p-4 rounded-xl bg-[#FFF5F2] border border-[#FECACA]">
                <div className="text-xs font-black text-[#EC663B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>!</span> VOS PRIORITÉS
                </div>
                <ol className="space-y-1.5 text-xs text-[#991B1B]">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">1.</span>
                    <span>Mettre en place un suivi simple et régulier de la trésorerie.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">2.</span>
                    <span>Formaliser les principales procédures de fonctionnement.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">3.</span>
                    <span>Constituer progressivement les éléments nécessaires à un futur dossier de financement.</span>
                  </li>
                </ol>
              </div>

              {/* CE QUE CELA SIGNIFIE */}
              <div className="pt-4">
                <h3 className="font-extrabold text-sm text-[#0A0A0A] mb-1.5">
                  Ce que cela signifie
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  L'entreprise dispose de bases solides pour poursuivre son développement. Le principal enjeu n'est pas de tout changer, mais de renforcer quelques fonctions clés pour gagner en visibilité, en organisation et en capacité d'anticipation.
                </p>
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
                <div key={dim.id} className="p-3 bg-white">
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
                <div key={dim.id} className="p-3 bg-white">
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
            <div className="space-y-2 mb-6">
              <h3 className="font-extrabold text-sm text-[#0A0A0A]">
                Conclusion
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Votre entreprise présente des bases encourageantes. Le diagnostic fait surtout ressortir un besoin de renforcement du pilotage financier, de formalisation des pratiques et de préparation à la croissance.
              </p>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Ce rapport constitue un point de départ pour vous permettre de mieux comprendre votre entreprise et de prendre des décisions plus éclairées.
              </p>
            </div>

            {/* Signature & Devise */}
            <div className="pt-2 text-center">
              <div className="font-black text-base tracking-wider text-[#0A0A0A] font-tech mb-1">
                <span className="text-[#EC663B]">ALODO</span> TECH
              </div>
              <div className="text-[11px] font-bold text-[#6B7280] tracking-widest uppercase">
                Évaluer • Comprendre • Prioriser • Agir
              </div>
            </div>
          </div>

          <PageFooter pageNum={6} />
        </div>

      </div>
    </div>
  );
}
