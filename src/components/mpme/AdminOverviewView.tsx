"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/mpme/DashboardLayout";
import DossierPdfDocument from "@/components/mpme/DossierPdfDocument";
import RapportMpmePdf from "@/components/mpme/RapportMpmePdf";
import { MpmeStorage } from "@/lib/mpme/storage";
import { Application, Cohort, DiagnosticAnswer, DiagnosticReport } from "@/lib/mpme/types";
import { calculateDiagnosticScore } from "@/lib/mpme/scoring";
import { createClient } from "@/utils/supabase/client";

// Clean Professional SVG Icons
function LayersIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function AwardIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}

function DownloadIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function MapPinIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function BriefcaseIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function MessageCircleIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function AlertTriangleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export default function AdminOverviewView() {
  const [cohort, setCohort] = useState<Cohort | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [adminEmail, setAdminEmail] = useState<string>("Console Gouverneur ALODO TECH");
  const [statusFeedback, setStatusFeedback] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pdfModalApp, setPdfModalApp] = useState<Application | null>(null);
  const [rapportMpmeApp, setRapportMpmeApp] = useState<Application | null>(null);

  // Confirmation modal before releasing a seat in Top 20
  const [confirmReleaseApp, setConfirmReleaseApp] = useState<Application | null>(null);

  useEffect(() => {
    setIsClient(true);
    const supabase = createClient();

    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        window.location.href = "/admin/login";
        return;
      }

      const { data: adminRecord } = await supabase
        .from("admins")
        .select("id")
        .eq("email", user.email)
        .single();

      if (!adminRecord && !user.email?.endsWith("@alodotech.com") && user.email !== "germaindandji03@gmail.com") {
        await supabase.auth.signOut();
        window.location.href = "/admin/login?error=unauthorized";
        return;
      }

      setAdminEmail(user.email || "Console Gouverneur ALODO TECH");
      setIsAuthorized(true);
    }).catch(() => {
      setIsAuthorized(true);
    });

    refreshData();
  }, []);

  const refreshData = async () => {
    try {
      const supabase = createClient();

      // 1. Fetch cohort
      const { data: cohortData } = await supabase
        .from("cohorts")
        .select("*")
        .eq("status", "open")
        .single();

      // 2. Fetch applications with companies and diagnostics relations
      const { data: appsData, error } = await supabase
        .from("applications")
        .select(`
          id,
          status,
          submitted_at,
          companies (
            id,
            name,
            leader_name,
            email,
            phone,
            whatsapp,
            city,
            sector,
            year_created,
            employees_count,
            monthly_revenue,
            is_formalized,
            has_pro_bank_account,
            main_difficulties,
            single_biggest_problem,
            motivation,
            leader_availability
          ),
          diagnostics (
            global_score,
            diagnostic_level,
            report_data,
            answers
          )
        `)
        .order("submitted_at", { ascending: false });

      if (error || !appsData) {
        fallbackToLocalStorage();
        return;
      }

      const mappedApps: Application[] = appsData.map((row: any) => {
        const diag = Array.isArray(row.diagnostics) ? row.diagnostics[0] : row.diagnostics;
        const comp = Array.isArray(row.companies) ? row.companies[0] : row.companies;

        const rawAnswers: DiagnosticAnswer[] = diag?.answers || [];
        let calculatedReport: DiagnosticReport | undefined = diag?.report_data;

        if (!calculatedReport && rawAnswers.length > 0) {
          calculatedReport = calculateDiagnosticScore(comp?.name || "Entreprise", rawAnswers);
        }

        return {
          id: row.id,
          companyId: comp?.id || row.id,
          cohortId: cohortData?.id || "cohort-1",
          status: row.status || "submitted",
          submittedAt: row.submitted_at || new Date().toISOString(),
          diagnosticScore: diag?.global_score ?? calculatedReport?.globalScore ?? 0,
          diagnosticLevel: diag?.diagnostic_level ?? calculatedReport?.level ?? "En cours d'évaluation",
          diagnosticReport: calculatedReport,
          diagnosticAnswers: rawAnswers,
          company: {
            id: comp?.id || row.id,
            name: comp?.name || "Entreprise",
            leaderName: comp?.leader_name || "Dirigeant",
            email: comp?.email || "",
            phone: comp?.phone || "",
            whatsapp: comp?.whatsapp || comp?.phone || "",
            city: comp?.city || "Cotonou",
            sector: comp?.sector || "Général",
            yearCreated: comp?.year_created || 2024,
            employeesCount: comp?.employees_count || "1-5",
            monthlyRevenue: comp?.monthly_revenue || "< 1M FCFA",
            isFormalized: comp?.is_formalized ?? true,
            hasProBankAccount: comp?.has_pro_bank_account ?? false,
            mainDifficulties: comp?.main_difficulties || [],
            singleBiggestProblem: comp?.single_biggest_problem || "",
            motivation: comp?.motivation || "",
            leaderAvailability: comp?.leader_availability || "100%",
          },
          internalNotes: row.internal_notes || [],
        };
      });

      setApplications(mappedApps);

      const selectedCnt = mappedApps.filter((a) => a.status === "selected").length;
      if (cohortData) {
        setCohort({
          id: cohortData.id,
          name: cohortData.name || "Cohorte 1 — Bénin 2026",
          maxCapacity: cohortData.max_capacity || 20,
          selectedCount: selectedCnt,
          openedAt: cohortData.opened_at,
          closingDate: cohortData.closing_date,
          status: cohortData.status,
        });
      } else {
        const currentCohort = MpmeStorage.getCohort();
        setCohort({ ...currentCohort, selectedCount: selectedCnt });
      }
    } catch {
      fallbackToLocalStorage();
    }
  };

  const fallbackToLocalStorage = () => {
    const apps = MpmeStorage.getApplications();
    const c = MpmeStorage.getCohort();
    setApplications(apps);
    setCohort(c);
  };

  const handleUpdateStatus = async (appId: string, status: Application["status"]) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", appId);

    if (error) {
      MpmeStorage.updateApplicationStatus(appId, status);
    }

    const target = applications.find((a) => a.id === appId);
    if (target?.company?.email && status === "selected") {
      fetch("/api/send-dashboard-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: target.company.email,
          companyName: target.company.name,
          leaderName: target.company.leaderName,
          action: "accept",
        }),
      }).catch((err) => console.error("Erreur envoi notification candidat :", err));
    }

    setStatusFeedback({
      msg: status === "selected" ? "Entreprise admise dans le Top 20." : "Place libérée avec succès. Le dossier a été replacé en délibération.",
      type: "success",
    });

    setTimeout(() => setStatusFeedback(null), 3500);
    await refreshData();
  };

  const exportTop20Csv = () => {
    const headers = [
      "Rang",
      "Nom Entreprise",
      "Dirigeant",
      "Score Diagnostic",
      "Niveau",
      "Email",
      "Téléphone",
      "Ville",
      "Secteur",
    ];

    const rows = top20Apps.map((a, i) => [
      `#${i + 1}`,
      `"${a.company.name.replace(/"/g, '""')}"`,
      `"${a.company.leaderName.replace(/"/g, '""')}"`,
      a.diagnosticScore || 0,
      `"${(a.diagnosticLevel || "-").replace(/"/g, '""')}"`,
      `"${a.company.email}"`,
      `"${a.company.phone}"`,
      `"${a.company.city}"`,
      `"${a.company.sector}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(";"), ...rows.map((e) => e.join(";"))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Top_20_Retenus_Cohorte_1_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics
  const totalCount = applications.length;
  const selectedCount = applications.filter((a) => a.status === "selected").length;
  const maxCapacity = cohort?.maxCapacity || 20;
  const remainingSpots = Math.max(0, maxCapacity - selectedCount);
  const formalizedCount = applications.filter((a) => a.company?.isFormalized).length;

  const top20Apps = applications
    .filter((a) => a.status === "selected")
    .sort((a, b) => (b.diagnosticScore || 0) - (a.diagnosticScore || 0))
    .slice(0, maxCapacity);

  if (!isClient || !isAuthorized) {
    return (
      <DashboardLayout activeTab="admin">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-10 h-10 border-4 border-[#EC663B] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm font-bold text-[#0A0A0A]">Vérification des accréditations ALODO TECH...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeTab="admin">
      <div className="space-y-8 animate-in fade-in duration-150 print:hidden">
        {/* TOAST FEEDBACK */}
        {statusFeedback && (
          <div
            className={`p-4 rounded-2xl text-xs font-bold flex items-center justify-between border shadow-lg animate-in slide-in-from-top-2 ${
              statusFeedback.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-rose-50 text-rose-800 border-rose-200"
            }`}
          >
            <span>{statusFeedback.msg}</span>
            <button
              type="button"
              onClick={() => setStatusFeedback(null)}
              className="text-xs hover:opacity-75 cursor-pointer ml-4 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* 1. EXECUTIVE COMMAND HEADER */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-bold text-emerald-600">
                Gouvernance Active · Cohorte 1
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] font-tech tracking-tight">
              Console Gouverneur ALODO TECH
            </h1>
            <p className="text-xs sm:text-sm text-[#6E6E73] mt-1 max-w-2xl">
              Supervision stratégique des admissions et sélection officielle des 20 entreprises pour le bootcamp.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs text-[#6E6E73]">
              Session : <strong className="text-[#0A0A0A]">{adminEmail}</strong>
            </div>
          </div>
        </div>

        {/* 2. EXECUTIVE KPI CARDS (PLEINE LARGEUR, 2 CARTES SANS DIAGNOSTICS 8D) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#EBEBEB] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[#8E8E93] mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Candidatures Soumises</span>
                <LayersIcon className="w-4 h-4 text-[#8E8E93]" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0A] font-tech">{totalCount}</div>
            </div>
            <div className="text-xs text-[#6E6E73] mt-3 flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>{formalizedCount} entreprises formalisées (RCCM/IFU)</span>
            </div>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#EBEBEB] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[#8E8E93] mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Admissions Top 20 · Cohorte 1</span>
                <AwardIcon className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-tech">
                {selectedCount} <span className="text-base sm:text-lg text-[#8E8E93] font-normal">/ {maxCapacity}</span>
              </div>
            </div>
            <div className="text-xs text-[#6E6E73] mt-3 flex items-center gap-2 font-medium">
              <span className={`w-2 h-2 rounded-full shrink-0 ${remainingSpots > 0 ? "bg-amber-500" : "bg-emerald-500"}`} />
              <span>{remainingSpots} places encore ouvertes</span>
            </div>
          </div>
        </div>

        {/* 3. TABLEAU D'HONNEUR DE LA COHORTE 1 (LES 20 RETENUS) */}
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-emerald-600 block mb-1">
                Cohorte 1 — Sélection Finale
              </span>
              <h2 className="text-2xl font-extrabold text-[#0A0A0A] font-tech">
                Tableau des 20 Entreprises Retenues
              </h2>
              <p className="text-xs sm:text-sm text-[#6E6E73] mt-1">
                Entreprises formellement retenues pour l'accompagnement intensif ALODO MPME.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                {selectedCount} / {maxCapacity} Places attribuées
              </span>
              <button
                type="button"
                onClick={exportTop20Csv}
                className="px-4 py-2 rounded-full bg-[#0A0A0A] text-white hover:bg-slate-800 text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <DownloadIcon className="w-3.5 h-3.5 text-[#EC663B]" />
                <span>Exporter Liste Top 20</span>
              </button>
            </div>
          </div>

          {/* Grid of the 20 seats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: maxCapacity }).map((_, index) => {
              const app = top20Apps[index];
              const isAssigned = Boolean(app);

              return (
                <div
                  key={index}
                  className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                    isAssigned
                      ? "bg-white border-emerald-200 shadow-sm hover:border-emerald-400"
                      : "bg-[#FAFAFA] border-dashed border-[#D1D1D6] text-center"
                  }`}
                >
                  {isAssigned ? (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                          #{index + 1}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-mono font-bold text-xs border border-emerald-200">
                          {app.diagnosticScore || 0}/100
                        </span>
                      </div>

                      <h3 className="font-extrabold text-base text-[#0A0A0A] font-tech line-clamp-1">
                        {app.company.name}
                      </h3>
                      <p className="text-xs text-[#6E6E73] mt-0.5 line-clamp-1">
                        Dirigeant : <span className="font-medium text-[#0A0A0A]">{app.company.leaderName}</span>
                      </p>

                      <div className="mt-3 pt-3 border-t border-[#F2F2F2] text-xs text-[#6E6E73] space-y-1">
                        <div className="flex items-center gap-1.5">
                          <MapPinIcon className="w-3.5 h-3.5 text-[#8E8E93]" />
                          <span>{app.company.city}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <BriefcaseIcon className="w-3.5 h-3.5 text-[#8E8E93]" />
                          <span className="truncate">{app.company.sector}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#F2F2F2] flex items-center justify-between gap-2">
                        {(app.company.whatsapp || app.company.phone) ? (
                          <a
                            href={`https://wa.me/${(app.company.whatsapp || app.company.phone).replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                          >
                            <MessageCircleIcon className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        ) : (
                          <span className="text-xs text-[#8E8E93]">-</span>
                        )}

                        <button
                          type="button"
                          onClick={() => setConfirmReleaseApp(app)}
                          className="text-[11px] font-semibold text-rose-600 hover:underline cursor-pointer"
                          title="Retirer du Top 20 et replacer en délibération"
                        >
                          Libérer place
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 space-y-2">
                      <div className="w-8 h-8 rounded-full bg-[#EBEBEB] text-[#8E8E93] flex items-center justify-center font-mono font-bold text-xs mx-auto">
                        #{index + 1}
                      </div>
                      <p className="text-xs font-bold text-[#6E6E73]">Place Disponible</p>
                      <p className="text-[10px] text-[#8E8E93]">En attente de délibération du jury</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODAL DE CONFIRMATION AVANT LIBÉRATION DE PLACE TOP 20
          ========================================================================= */}
      {confirmReleaseApp && (
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 print:hidden">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-rose-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-4">
              <AlertTriangleIcon className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-extrabold text-[#0A0A0A] font-tech mb-2">
              Confirmer la libération de la place Top 20
            </h3>

            <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed mb-6">
              Êtes-vous certain de vouloir libérer la place attribuée à <strong className="text-[#0A0A0A] font-bold">{confirmReleaseApp.company.name}</strong> (Dirigeant : {confirmReleaseApp.company.leaderName}) ? 
              <br className="my-2 block" />
              Le dossier sera retiré du Top 20 et replacé sous le statut <strong className="text-amber-800 font-bold">« Déjà analysé »</strong>, libérant immédiatement une place vacante dans la <strong className="text-emerald-700 font-bold">Cohorte 1</strong>.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmReleaseApp(null)}
                className="px-4 py-2.5 rounded-xl border border-[#D1D1D6] hover:bg-[#FAFAFA] text-[#0A0A0A] text-xs font-bold transition-all cursor-pointer"
              >
                Annuler
              </button>

              <button
                type="button"
                onClick={async () => {
                  const targetId = confirmReleaseApp.id;
                  setConfirmReleaseApp(null);
                  await handleUpdateStatus(targetId, "under_review");
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm shadow-rose-600/20 active:scale-95"
              >
                <span>Confirmer la libération</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALS PDF */}
      <DossierPdfDocument
        application={pdfModalApp}
        isOpen={Boolean(pdfModalApp)}
        onClose={() => setPdfModalApp(null)}
      />

      <RapportMpmePdf
        application={rapportMpmeApp}
        isOpen={Boolean(rapportMpmeApp)}
        onClose={() => setRapportMpmeApp(null)}
      />
    </DashboardLayout>
  );
}
