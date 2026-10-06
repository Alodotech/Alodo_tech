"use client";

import { useEffect } from "react";
import { Application, DiagnosticReport, DiagnosticAnswer } from "@/lib/mpme/types";
import { MpmeStorage } from "@/lib/mpme/storage";
import { DIMENSIONS, QUESTIONS_V1 } from "@/lib/mpme/questions";

interface DossierPdfDocumentProps {
  application: Application | null;
  report?: DiagnosticReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DossierPdfDocument({
  application,
  report,
  isOpen,
  onClose,
}: DossierPdfDocumentProps) {
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

  if (!isOpen) return null;

  const comp = application?.company;
  const activeReport =
    report ||
    application?.diagnosticReport ||
    (typeof window !== "undefined" ? MpmeStorage.getLatestReport() : null);

  const answers: DiagnosticAnswer[] =
    application?.diagnosticAnswers ||
    (typeof window !== "undefined" ? (MpmeStorage.getDiagnosticProgress() || []) : []) ||
    [];

  const today = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePrint = () => {
    const prevTitle = document.title;
    const compName = comp?.name ? comp.name.replace(/[^a-zA-Z0-9_-]/g, "_") : "Entreprise";
    document.title = `Rapport_Officiel_ALODO_MPME_${compName}`;
    window.print();
    setTimeout(() => {
      document.title = prevTitle;
    }, 1000);
  };

  // Helper to retrieve the selected answer text and score
  const getAnswerDetail = (questionId: string) => {
    const q = QUESTIONS_V1.find((item) => item.id === questionId);
    if (!q) return null;

    const answered = answers.find((a) => a.questionId === questionId);
    if (!answered || answered.value === undefined || answered.value === null) {
      return {
        question: q,
        answeredText: "Non renseigné",
        score: null,
      };
    }

    const opt = q.options?.find((o) => o.value === String(answered.value));
    return {
      question: q,
      answeredText: opt ? opt.label : String(answered.value),
      score: opt ? opt.score : null,
    };
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md overflow-y-auto p-2 sm:p-6 print:static print:inset-auto print:bg-white print:p-0 print:m-0 print:overflow-visible print:w-full print:block"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-[#EBEBEB] overflow-hidden my-2 sm:my-6 print:my-0 print:border-none print:shadow-none print:rounded-none print:max-w-none print:w-full">
        
        {/* Floating Topbar (Screen only - Sticky at top) */}
        <div className="sticky top-0 z-50 p-4 bg-[#0A0A0A] text-white flex items-center justify-between border-b border-white/10 shadow-lg print:hidden shrink-0">
          <div className="flex items-center gap-3">
            <img
              src="/logo/logo.png"
              alt="ALODO TECH"
              style={{ height: "28px", width: "auto", filter: "brightness(0) invert(1)" }}
            />
            <div>
              <span className="text-sm font-bold block">Dossier Officiel ALODO MPME & Audit Détaillé</span>
              <span className="text-xs text-slate-300">Rapport complet avec les 20 réponses certifiées • Format A4</span>
            </div>
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
              className="px-3.5 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
              title="Fermer (Échap)"
            >
              <span>✕ Fermer</span>
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div
          id="printable-dossier"
          className="p-8 sm:p-12 text-[#0A0A0A] bg-white font-sans space-y-8 print:p-6 print:space-y-6"
        >
          {/* Header Document */}
          <div className="flex items-start justify-between border-b-2 border-[#0A0A0A] pb-6 avoid-break">
            <div className="flex items-center gap-3">
              <img
                src="/logo/logo.png"
                alt="ALODO TECH"
                style={{ height: "38px", width: "auto" }}
              />
              <div>
                <div className="font-tech font-extrabold text-xl tracking-wider text-[#0A0A0A]">
                  <span className="text-[#EC663B]">ALODO</span> TECH
                </div>
                <div className="text-[11px] font-bold text-[#6E6E73] uppercase tracking-widest">
                  Programme National MPME V1 · République du Bénin
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono bg-[#FAFAFA] border border-[#EBEBEB] px-3 py-1 rounded-full text-[#3A3A3C] font-bold inline-block mb-1">
                DOSSIER OFFICIEL D'AUDIT 2026
              </span>
              <div className="text-xs text-[#6E6E73]">Émis le {today}</div>
              <div className="text-[11px] font-mono text-[#8E8E93]">
                Réf : {application?.id || "APP-DEMO-2026"}
              </div>
            </div>
          </div>

          {/* Title banner */}
          <div className="p-6 rounded-2xl bg-[#FFF5F2] border border-[#EC663B]/30 flex items-center justify-between avoid-break">
            <div>
              <span className="text-xs font-bold text-[#EC663B] uppercase tracking-wider block mb-1">
                Dossier de Synthèse & Audit Exécutif
              </span>
              <h1 className="text-2xl font-extrabold text-[#0A0A0A]">
                {comp?.name || "BioAgro Bénin"}
              </h1>
              <p className="text-xs text-[#6E6E73] mt-1">
                Dirigeant : <strong>{comp?.leaderName || "Koffi Mensah"}</strong> ({comp?.email}) · {comp?.phone}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold text-[#8E8E93] block">Statut Candidature</span>
              <span className="text-sm font-extrabold text-[#EC663B] block">
                {application?.status === "selected"
                  ? "Retenu dans le Top 20"
                  : "Candidature Déposée"}
              </span>
            </div>
          </div>

          {/* SECTION 1 : CANDIDATURE COMPLETE */}
          <div className="avoid-break">
            <h2 className="text-sm font-extrabold text-[#0A0A0A] uppercase tracking-wider mb-3 pb-1 border-b border-[#EBEBEB] flex items-center gap-2">
              <span className="text-[#EC663B]">1.</span> Fiche d'Identité & Profil Opérationnel
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-3">
              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[10px] text-[#8E8E93] block">Ville d'implantation</span>
                <span className="font-bold text-[#0A0A0A] mt-0.5 block">{comp?.city || "Cotonou"}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[10px] text-[#8E8E93] block">Secteur d'activité</span>
                <span className="font-bold text-[#0A0A0A] mt-0.5 block truncate">
                  {comp?.sector || "Commerce / Agro"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[10px] text-[#8E8E93] block">Année de création</span>
                <span className="font-bold text-[#0A0A0A] mt-0.5 block">{comp?.yearCreated || 2022}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[10px] text-[#8E8E93] block">Effectif déclaré</span>
                <span className="font-bold text-[#0A0A0A] mt-0.5 block">{comp?.employeesCount || "3 à 5 personnes"}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-3">
              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[10px] text-[#8E8E93] block">Chiffre d'affaires mensuel</span>
                <span className="font-bold text-[#0A0A0A] mt-0.5 block">
                  {comp?.monthlyRevenue || "Non précisé"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[10px] text-[#8E8E93] block">Enregistrement RCCM / IFU</span>
                <span className={`font-bold mt-0.5 block ${comp?.isFormalized ? "text-emerald-700" : "text-amber-700"}`}>
                  {comp?.isFormalized ? "✓ Oui (Formel)" : "Non / En cours"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[10px] text-[#8E8E93] block">Compte bancaire pro dédié</span>
                <span className={`font-bold mt-0.5 block ${comp?.hasProBankAccount ? "text-emerald-700" : "text-amber-700"}`}>
                  {comp?.hasProBankAccount ? "✓ Oui" : "Non"}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[10px] font-bold text-[#EC663B] uppercase tracking-wider block mb-1">
                  Problème prioritaire n°1 à résoudre dans les 3 mois :
                </span>
                <p className="text-xs text-[#0A0A0A] font-medium italic">
                  "{comp?.singleBiggestProblem || "Développement commercial et accès aux facilités de crédit."}"
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[10px] font-bold text-[#3A3A3C] uppercase tracking-wider block mb-1">
                  Motivation pour rejoindre le Programme ALODO MPME :
                </span>
                <p className="text-xs text-[#6E6E73] leading-relaxed">
                  {comp?.motivation || "Structurer la gestion financière et opérationnelle pour accélérer la croissance."}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 2 : BILAN DU DIAGNOSTIC DE MATURITÉ */}
          {activeReport && (
            <div className="avoid-break">
              <h2 className="text-sm font-extrabold text-[#0A0A0A] uppercase tracking-wider mb-3 pb-1 border-b border-[#EBEBEB] flex items-center gap-2">
                <span className="text-[#EC663B]">2.</span> Synthèse Globale du Diagnostic & Finançabilité
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#FFF5F2] to-white border border-[#EC663B]/30 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#EC663B] block">
                    Score Global de Maturité
                  </span>
                  <div className="text-4xl font-extrabold text-[#0A0A0A] my-1">
                    {application?.diagnosticScore ?? activeReport.globalScore}
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
                    Orientation Stratégique ALODO
                  </span>
                  <p className="text-xs font-bold text-[#0A0A0A] leading-tight">
                    {activeReport.alodoRecommendation}
                  </p>
                </div>
              </div>

              {/* 9 Dimensions Table */}
              <div className="border border-[#EBEBEB] rounded-xl overflow-hidden mb-4">
                <div className="grid grid-cols-4 bg-[#FAFAFA] p-2.5 text-[10px] font-bold text-[#8E8E93] border-b border-[#EBEBEB]">
                  <span className="col-span-2">Dimension Stratégique (9 Piliers)</span>
                  <span>Pondération</span>
                  <span>Score Obtenu</span>
                </div>
                {activeReport.dimensionScores.map((ds) => (
                  <div
                    key={ds.dimensionId}
                    className="grid grid-cols-4 p-2.5 text-xs border-b border-[#F2F2F2] last:border-b-0 items-center"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
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
            <div className="avoid-break">
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

          {/* SECTION 4 : AUDIT DÉTAILLÉ DES 20 RÉPONSES INDIVIDUELLES */}
          <div className="page-break-before pt-2">
            <h2 className="text-sm font-extrabold text-[#0A0A0A] uppercase tracking-wider mb-3 pb-1 border-b border-[#EBEBEB] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[#EC663B]">4.</span> Audit Détaillé : Réponses aux 20 Questions Clés
              </div>
              <span className="text-[10px] font-bold text-[#6E6E73] bg-[#FAFAFA] px-2.5 py-0.5 rounded-full border border-[#EBEBEB]">
                20 questions auditées
              </span>
            </h2>
            <p className="text-xs text-[#6E6E73] mb-4">
              Relevé officiel des déclarations fournies par le dirigeant d'entreprise lors du passage du diagnostic en ligne.
            </p>

            <div className="space-y-4">
              {DIMENSIONS.map((dim, dimIdx) => {
                const dimQuestions = QUESTIONS_V1.filter((q) => q.dimensionId === dim.id);
                const dimScoreObj = activeReport?.dimensionScores.find((ds) => ds.dimensionId === dim.id);

                return (
                  <div
                    key={dim.id}
                    className="border border-[#EBEBEB] rounded-2xl p-4 bg-white avoid-break shadow-none"
                  >
                    {/* Dimension Header */}
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#F2F2F2]">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#EC663B]/10 text-[#EC663B] text-[11px] font-bold flex items-center justify-center font-mono">
                          {dimIdx + 1}
                        </span>
                        <h3 className="text-xs font-extrabold text-[#0A0A0A] uppercase tracking-wider">
                          {dim.title}
                        </h3>
                        <span className="text-[10px] text-[#8E8E93]">({dim.weight}% du score)</span>
                      </div>

                      {dimScoreObj && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#6E6E73]">{dimScoreObj.level}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              dimScoreObj.score >= 75
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : dimScoreObj.score >= 50
                                ? "bg-amber-50 text-amber-800 border border-amber-200"
                                : "bg-rose-50 text-rose-800 border border-rose-200"
                            }`}
                          >
                            {dimScoreObj.score}/100
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Questions in Dimension */}
                    <div className="space-y-2.5">
                      {dimQuestions.map((q, qIdx) => {
                        const answerInfo = getAnswerDetail(q.id);
                        const hasScore = typeof answerInfo?.score === "number";
                        const score = answerInfo?.score ?? 0;

                        return (
                          <div
                            key={q.id}
                            className="p-2.5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          >
                            <div className="flex-1 pr-2">
                              <div className="flex items-center gap-2 text-[10px] text-[#8E8E93] mb-0.5">
                                <span className="font-mono font-bold text-[#3A3A3C]">Q{dimIdx + 1}.{qIdx + 1}</span>
                                <span>•</span>
                                <span>{q.subDimension}</span>
                              </div>
                              <p className="font-semibold text-[#0A0A0A] leading-snug">
                                {q.text}
                              </p>
                              <div className="mt-1 flex items-center gap-1.5 text-xs text-[#3A3A3C]">
                                <span className="text-[#EC663B] font-bold">↳ Réponse :</span>
                                <span className="font-medium text-[#111827]">
                                  {answerInfo?.answeredText || "Non renseigné"}
                                </span>
                              </div>
                            </div>

                            {hasScore && (
                              <div className="shrink-0 self-start sm:self-center">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                                    score >= 75
                                      ? "bg-emerald-100/70 text-emerald-800"
                                      : score >= 50
                                      ? "bg-amber-100/70 text-amber-800"
                                      : "bg-rose-100/70 text-rose-800"
                                  }`}
                                >
                                  {score >= 75 ? "✓" : score >= 50 ? "•" : "!"} Note : {score}/100
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Official Seal */}
          <div className="pt-6 border-t-2 border-[#EBEBEB] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8E8E93] gap-4 avoid-break">
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
    </div>
  );
}
