"use client";

import { Application, DiagnosticReport } from "@/lib/mpme/types";
import { MpmeStorage } from "@/lib/mpme/storage";

interface DossierPdfDocumentProps {
  application: Application | null;
  report: DiagnosticReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DossierPdfDocument({
  application,
  report,
  isOpen,
  onClose,
}: DossierPdfDocumentProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const comp = application?.company;
  const activeReport =
    report ||
    application?.diagnosticReport ||
    (typeof window !== "undefined" ? MpmeStorage.getLatestReport() : null);

  const today = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-8 overflow-hidden flex flex-col border border-[#EBEBEB]">
        {/* Floating Topbar (Screen only) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">Dossier Officiel ALODO MPME & Diagnostic</span>
            <span className="text-xs text-slate-400">• Format A4 certifié</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-[#EC663B] hover:bg-[#d4562e] text-white font-bold text-xs rounded-full shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Télécharger en PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center text-xs"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div
          id="printable-dossier"
          className="p-8 sm:p-12 text-[#0A0A0A] bg-white font-sans space-y-8"
          style={{ minHeight: "297mm" }}
        >
          {/* Header Document */}
          <div className="flex items-start justify-between border-b-2 border-[#0A0A0A] pb-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo/logo.png"
                alt="ALODO TECH"
                style={{ height: "36px", width: "auto" }}
              />
              <div>
                <div className="font-tech font-extrabold text-lg tracking-wider text-[#0A0A0A]">
                  <span className="text-[#EC663B]">ALODO</span> TECH
                </div>
                <div className="text-[11px] font-bold text-[#6E6E73] uppercase tracking-widest">
                  Programme National MPME V1 · Bénin
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono bg-[#FAFAFA] border border-[#EBEBEB] px-3 py-1 rounded-full text-[#3A3A3C] font-bold block mb-1">
                DOSSIER OFFICIEL COHORTE 1
              </span>
              <div className="text-xs text-[#6E6E73]">Émis le {today}</div>
              <div className="text-[11px] font-mono text-[#8E8E93]">
                Réf : {application?.id || "APP-DEMO-2026"}
              </div>
            </div>
          </div>

          {/* Title banner */}
          <div className="p-6 rounded-2xl bg-[#FFF5F2] border border-[#EC663B]/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#EC663B] uppercase tracking-wider block mb-1">
                Dossier de Synthèse Dirigeant
              </span>
              <h1 className="text-2xl font-extrabold text-[#0A0A0A]">
                {comp?.name || "BioAgro Bénin"}
              </h1>
              <p className="text-xs text-[#6E6E73] mt-1">
                Dirigeant : <strong>{comp?.leaderName || "Koffi Mensah"}</strong> ({comp?.email}) · {comp?.phone}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold text-[#8E8E93] block">Statut Cohorte</span>
              <span className="text-sm font-extrabold text-[#EC663B] block">
                {application?.status === "selected"
                  ? "Retenu dans le Top 20"
                  : "Candidature Déposée"}
              </span>
            </div>
          </div>

          {/* SECTION 1 : CANDIDATURE COMPLETE */}
          <div>
            <h2 className="text-sm font-extrabold text-[#0A0A0A] uppercase tracking-wider mb-3 pb-1 border-b border-[#EBEBEB] flex items-center gap-2">
              <span className="text-[#EC663B]">1.</span> Fiche d'Identité & Profil Opérationnel
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[10px] text-[#8E8E93] block">Ville d'implantation</span>
                <span className="font-bold text-[#0A0A0A] mt-0.5 block">{comp?.city || "Cotonou"}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[10px] text-[#8E8E93] block">Secteur d'activité</span>
                <span className="font-bold text-[#0A0A0A] mt-0.5 block truncate">
                  {comp?.sector || "Agriculture & Agroalimentaire"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[10px] text-[#8E8E93] block">Année de création</span>
                <span className="font-bold text-[#0A0A0A] mt-0.5 block">{comp?.yearCreated || 2022}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[10px] text-[#8E8E93] block">Effectif déclaré</span>
                <span className="font-bold text-[#0A0A0A] mt-0.5 block">{comp?.employeesCount || "6 à 10"}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-4">
              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[10px] text-[#8E8E93] block">Chiffre d'affaires mensuel</span>
                <span className="font-bold text-[#0A0A0A] mt-0.5 block">
                  {comp?.monthlyRevenue || "5M - 15M FCFA"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[10px] text-[#8E8E93] block">Enregistrement RCCM / IFU</span>
                <span className="font-bold text-emerald-700 mt-0.5 block">
                  {comp?.isFormalized ? "✓ Oui (Formel)" : "Non / En cours"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[10px] text-[#8E8E93] block">Compte bancaire pro dédié</span>
                <span className="font-bold text-emerald-700 mt-0.5 block">
                  {comp?.hasProBankAccount ? "✓ Oui" : "Non"}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[10px] font-bold text-[#EC663B] uppercase tracking-wider block mb-1">
                  Problème prioritaire n°1 à résoudre dans les 3 mois :
                </span>
                <p className="text-xs text-[#0A0A0A] font-medium italic">
                  "{comp?.singleBiggestProblem || "Structurer notre trésorerie pour faire face aux pics d'activité."}"
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[10px] font-bold text-[#3A3A3C] uppercase tracking-wider block mb-1">
                  Motivation pour rejoindre le Programme ALODO MPME :
                </span>
                <p className="text-xs text-[#6E6E73] leading-relaxed">
                  {comp?.motivation || "Structurer nos opérations et préparer un dossier bancaire conforme pour accéder au crédit."}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 2 : BILAN DU DIAGNOSTIC DE MATURITÉ */}
          {activeReport && (
            <div>
              <h2 className="text-sm font-extrabold text-[#0A0A0A] uppercase tracking-wider mb-3 pb-1 border-b border-[#EBEBEB] flex items-center gap-2">
                <span className="text-[#EC663B]">2.</span> Bilan du Diagnostic de Maturité (Dimensions Clés)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#FFF5F2] to-white border border-[#EC663B]/30 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#EC663B] block">
                    Score Global de Maturité
                  </span>
                  <div className="text-4xl font-extrabold text-[#0A0A0A] my-1">
                    {application?.diagnosticScore || activeReport.globalScore}
                    <span className="text-base font-normal text-[#8E8E93]">/100</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#EC663B] block">
                    Niveau : {application?.diagnosticLevel || activeReport.level}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#EBEBEB] text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00C2A8] block">
                    Indicateur de Finançabilité
                  </span>
                  <div className="text-4xl font-extrabold text-[#0A0A0A] my-1">
                    {activeReport.fundingReadiness.score}
                    <span className="text-base font-normal text-[#8E8E93]">/100</span>
                  </div>
                  <span className="text-[10px] text-[#6E6E73] block truncate">
                    {activeReport.fundingReadiness.analysis}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#EBEBEB]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#3A3A3C] block mb-1">
                    Orientation Stratégique
                  </span>
                  <p className="text-xs font-bold text-[#0A0A0A] leading-tight">
                    {activeReport.alodoRecommendation}
                  </p>
                </div>
              </div>

              {/* 8 Dimensions Table */}
              <div className="border border-[#EBEBEB] rounded-xl overflow-hidden mb-4">
                <div className="grid grid-cols-4 bg-[#FAFAFA] p-2 text-[10px] font-bold text-[#8E8E93] border-b border-[#EBEBEB]">
                  <span className="col-span-2">Dimension Stratégique</span>
                  <span>Pondération</span>
                  <span>Score Obtenu</span>
                </div>
                {activeReport.dimensionScores.map((ds) => (
                  <div
                    key={ds.dimensionId}
                    className="grid grid-cols-4 p-2 text-xs border-b border-[#F2F2F2] last:border-b-0 items-center"
                  >
                    <span className="col-span-2 font-medium text-[#0A0A0A]">{ds.title}</span>
                    <span className="text-[#6E6E73]">{ds.weight}%</span>
                    <span className="font-bold text-[#0A0A0A]">
                      {ds.score}/100 <span className="text-[10px] text-[#8E8E93] font-normal">({ds.level})</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Forces & Risques */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                    Points Forts Identifiés
                  </span>
                  <ul className="space-y-1">
                    {activeReport.strengths.map((s, i) => (
                      <li key={i} className="text-[#0A0A0A] flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block mb-2">
                    Risques Critiques à Adresser
                  </span>
                  <ul className="space-y-1">
                    {activeReport.topRisks.map((r, i) => (
                      <li key={i} className="text-[#0A0A0A] flex items-start gap-1.5">
                        <span className="text-rose-600 font-bold">•</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3 : FEUILLE DE ROUTE RECOMMANDÉE */}
          {activeReport && (
            <div>
              <h2 className="text-sm font-extrabold text-[#0A0A0A] uppercase tracking-wider mb-3 pb-1 border-b border-[#EBEBEB] flex items-center gap-2">
                <span className="text-[#EC663B]">3.</span> Feuille de Route Opérationnelle 90 Jours
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                  <span className="text-[10px] font-bold text-[#EC663B] block uppercase tracking-wider mb-2">
                    Jalon 0 – 30 Jours
                  </span>
                  <ul className="space-y-1 text-[#3A3A3C]">
                    {activeReport.actionPlan.days30.map((a, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-[#EC663B] font-bold">→</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                  <span className="text-[10px] font-bold text-amber-700 block uppercase tracking-wider mb-2">
                    Jalon 30 – 60 Jours
                  </span>
                  <ul className="space-y-1 text-[#3A3A3C]">
                    {activeReport.actionPlan.days60.map((a, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-amber-600 font-bold">→</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                  <span className="text-[10px] font-bold text-teal-700 block uppercase tracking-wider mb-2">
                    Jalon 60 – 90 Jours
                  </span>
                  <ul className="space-y-1 text-[#3A3A3C]">
                    {activeReport.actionPlan.days90.map((a, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-teal-600 font-bold">→</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Footer Official Seal */}
          <div className="pt-6 border-t-2 border-[#EBEBEB] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8E8E93] gap-4">
            <div>
              <strong>ALODO TECH SARL</strong> · Cotonou, République du Bénin · contact@alodo.tech
              <div className="text-[10px] mt-0.5">
                Document strictement confidentiel généré via la Plateforme ALODO MPME.
              </div>
            </div>

            <div className="text-right">
              <span className="font-mono text-[10px] px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                ✓ CERTIFIÉ ALODO MPME 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PRINT CSS STYLES FOR FLAWLESS A4 PDF EXPORT */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          #printable-dossier {
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}
