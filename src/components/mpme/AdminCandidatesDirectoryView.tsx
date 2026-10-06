"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/mpme/DashboardLayout";
import DossierPdfDocument from "@/components/mpme/DossierPdfDocument";
import RapportMpmePdf from "@/components/mpme/RapportMpmePdf";
import { MpmeStorage } from "@/lib/mpme/storage";
import { Application, Cohort, DiagnosticAnswer, DiagnosticReport } from "@/lib/mpme/types";
import { DIMENSIONS, QUESTIONS_V1 } from "@/lib/mpme/questions";
import { calculateDiagnosticScore } from "@/lib/mpme/scoring";
import { createClient } from "@/utils/supabase/client";

// ============================================================================
// ICONS
// ============================================================================
function SearchIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
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

function CheckIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CheckCircleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ClockIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FileSpreadsheetIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
      <line x1="12" y1="9" x2="12" y2="21" />
    </svg>
  );
}

function UserIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
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

function EyeIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
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

function ShieldIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function UsersIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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

function BarChartIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}

export default function AdminCandidatesDirectoryView() {
  const [cohort, setCohort] = useState<Cohort | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [adminEmail, setAdminEmail] = useState<string>("Console Gouverneur ALODO TECH");
  const [newNote, setNewNote] = useState("");
  const [statusFeedback, setStatusFeedback] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pdfModalApp, setPdfModalApp] = useState<Application | null>(null);
  const [rapportMpmeApp, setRapportMpmeApp] = useState<Application | null>(null);

  // Filters & Search (SANS REJET)
  const [leaderFilterStatus, setLeaderFilterStatus] = useState<"all" | "pending" | "under_review" | "selected">("all");
  const [leaderSearch, setLeaderSearch] = useState<string>("");
  const [leaderPage, setLeaderPage] = useState<number>(1);
  const [inspectingApp, setInspectingApp] = useState<Application | null>(null);

  // Modal Inspection Sub-tabs: "synthese" | "reponses" | "profil" | "notes"
  const [modalTab, setModalTab] = useState<"synthese" | "reponses" | "profil" | "notes">("synthese");

  // Confirmation Modal before releasing a retained enterprise from Top 20
  const [confirmReleaseModal, setConfirmReleaseModal] = useState<{
    app: Application;
    targetStatus: Application["status"];
  } | null>(null);

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

      // If an inspection modal is currently open, keep it in sync
      if (inspectingApp) {
        const updated = mappedApps.find((a) => a.id === inspectingApp.id);
        if (updated) setInspectingApp(updated);
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
      // Local fallback
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
      msg: `Statut actualisé : ${
        status === "selected"
          ? "Admis au Top 20 (Cohorte 1)"
          : status === "under_review"
          ? "Dossier déjà analysé"
          : "Placé en attente"
      }`,
      type: "success",
    });

    setTimeout(() => setStatusFeedback(null), 3500);
    await refreshData();
  };

  // Safe handler that prompts for confirmation before releasing a retained Top 20 company
  const requestStatusChange = (app: Application, targetStatus: Application["status"]) => {
    if (app.status === "selected" && targetStatus !== "selected") {
      setConfirmReleaseModal({ app, targetStatus });
    } else {
      handleUpdateStatus(app.id, targetStatus);
      if (inspectingApp && inspectingApp.id === app.id) {
        setInspectingApp({ ...inspectingApp, status: targetStatus });
      }
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectingApp || !newNote.trim()) return;

    MpmeStorage.addInternalNote(
      inspectingApp.id,
      newNote.trim(),
      adminEmail.split("@")[0] || "Comité ALODO"
    );

    setNewNote("");
    refreshData();
    const updated = MpmeStorage.getApplications().find((a) => a.id === inspectingApp.id);
    if (updated) setInspectingApp(updated);
  };

  const handleDeleteNote = (noteId: string) => {
    if (!inspectingApp) return;
    MpmeStorage.deleteInternalNote(inspectingApp.id, noteId);
    refreshData();
    const updated = MpmeStorage.getApplications().find((a) => a.id === inspectingApp.id);
    if (updated) setInspectingApp(updated);
  };

  // CSV EXPORT
  const exportCandidatesCsv = () => {
    const headers = [
      "ID",
      "Statut",
      "Entreprise",
      "Dirigeant",
      "Email",
      "Telephone",
      "Ville",
      "Secteur",
      "Score Global",
      "Niveau",
      "Formalise (RCCM)",
      "Compte Bancaire Pro",
      "Chiffre Affaires",
      "Date Depot",
    ];

    const rows = applications.map((app) => [
      app.id,
      app.status === "selected" ? "ADMIS TOP 20" : app.status === "under_review" ? "DEJA ANALYSE" : "EN ATTENTE",
      `"${app.company.name.replace(/"/g, '""')}"`,
      `"${app.company.leaderName.replace(/"/g, '""')}"`,
      app.company.email,
      app.company.phone,
      `"${app.company.city}"`,
      `"${app.company.sector}"`,
      app.diagnosticScore || 0,
      `"${app.diagnosticLevel || "Non renseigne"}"`,
      app.company.isFormalized ? "OUI" : "NON",
      app.company.hasProBankAccount ? "OUI" : "NON",
      `"${app.company.monthlyRevenue}"`,
      new Date(app.submittedAt).toLocaleDateString("fr-FR"),
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `annuaire_candidats_alodo_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // FILTERED CANDIDATES (SANS REJET)
  const filteredLeaders = applications.filter((app) => {
    const matchesStatus =
      leaderFilterStatus === "all"
        ? true
        : leaderFilterStatus === "pending"
        ? app.status !== "selected" && app.status !== "under_review"
        : app.status === leaderFilterStatus;

    const matchesSearch =
      !leaderSearch.trim() ||
      app.company?.leaderName?.toLowerCase().includes(leaderSearch.toLowerCase()) ||
      app.company?.name?.toLowerCase().includes(leaderSearch.toLowerCase()) ||
      app.company?.email?.toLowerCase().includes(leaderSearch.toLowerCase()) ||
      app.company?.phone?.toLowerCase().includes(leaderSearch.toLowerCase()) ||
      app.company?.city?.toLowerCase().includes(leaderSearch.toLowerCase()) ||
      app.company?.sector?.toLowerCase().includes(leaderSearch.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const totalCount = applications.length;
  const pendingCount = applications.filter((a) => a.status !== "selected" && a.status !== "under_review").length;
  const underReviewCount = applications.filter((a) => a.status === "under_review").length;
  const selectedCount = applications.filter((a) => a.status === "selected").length;

  const pageSize = 20;
  const totalPages = Math.ceil(filteredLeaders.length / pageSize) || 1;
  const paginatedLeaders = filteredLeaders.slice((leaderPage - 1) * pageSize, leaderPage * pageSize);

  // Helper for 20 audit answers
  const getAuditAnswerDetail = (app: Application, questionId: string) => {
    const q = QUESTIONS_V1.find((item) => item.id === questionId);
    if (!q) return null;

    const ans = app.diagnosticAnswers?.find((a) => a.questionId === questionId);
    if (!ans || ans.value === undefined || ans.value === null) {
      return {
        question: q,
        answeredText: "Déclaration en cours d'audit",
        score: null,
      };
    }

    const opt = q.options?.find((o) => o.value === String(ans.value));
    return {
      question: q,
      answeredText: opt ? opt.label : String(ans.value),
      score: opt ? opt.score : null,
    };
  };

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

  // Active report for inspection modal
  const activeInspectionReport = inspectingApp?.diagnosticReport || (
    inspectingApp ? calculateDiagnosticScore(inspectingApp.company?.name || "Entreprise", inspectingApp.diagnosticAnswers || []) : null
  );

  return (
    <DashboardLayout activeTab="admin">
      <div className="space-y-6 animate-in fade-in duration-150 print:hidden">
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

        {/* 1. EXECUTIVE HEADER */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-bold text-blue-600">
                Annuaire Centralisé · Programme MPME
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] font-tech tracking-tight">
              Annuaire des Candidats & Entreprises
            </h1>
            <p className="text-xs sm:text-sm text-[#6E6E73] mt-1 max-w-2xl">
              Gestion complète des dossiers, filtrage par maturité, arbitrage du jury et consultation intégrale des audits.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={exportCandidatesCsv}
              className="px-5 py-2.5 rounded-full bg-[#0A0A0A] hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md active:scale-95"
            >
              <DownloadIcon className="w-3.5 h-3.5 text-[#EC663B]" />
              <span>Exporter CSV ({applications.length})</span>
            </button>
          </div>
        </div>

        {/* 2. FILTERS & SEARCH BAR */}
        <div className="bg-white p-5 rounded-3xl border border-[#EBEBEB] shadow-sm space-y-4">
          {/* Filter Tabs (SANS REJET) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => { setLeaderFilterStatus("all"); setLeaderPage(1); }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                leaderFilterStatus === "all"
                  ? "bg-[#0A0A0A] text-white shadow-sm"
                  : "bg-[#FAFAFA] text-[#6E6E73] hover:text-[#0A0A0A] border border-[#EBEBEB]"
              }`}
            >
              <span>Tous</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                leaderFilterStatus === "all" ? "bg-white/20 text-white" : "bg-[#EBEBEB] text-[#6E6E73]"
              }`}>
                {totalCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => { setLeaderFilterStatus("pending"); setLeaderPage(1); }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                leaderFilterStatus === "pending"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
              }`}
            >
              <ClockIcon className="w-3 h-3" />
              <span>En attente</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                leaderFilterStatus === "pending" ? "bg-white/20 text-white" : "bg-blue-200/60 text-blue-800"
              }`}>
                {pendingCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => { setLeaderFilterStatus("under_review"); setLeaderPage(1); }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                leaderFilterStatus === "under_review"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
              }`}
            >
              <span>🔍 Déjà analysé</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                leaderFilterStatus === "under_review" ? "bg-white/20 text-white" : "bg-amber-200/60 text-amber-800"
              }`}>
                {underReviewCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => { setLeaderFilterStatus("selected"); setLeaderPage(1); }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                leaderFilterStatus === "selected"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
              }`}
            >
              <CheckIcon className="w-3 h-3" />
              <span>Retenus (Top 20)</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                leaderFilterStatus === "selected" ? "bg-white/20 text-white" : "bg-emerald-200/60 text-emerald-800"
              }`}>
                {selectedCount}
              </span>
            </button>
          </div>

          {/* Search input */}
          <div className="relative">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
            <input
              type="text"
              placeholder="Rechercher par nom de dirigeant, nom d'entreprise, email, téléphone, ville..."
              value={leaderSearch}
              onChange={(e) => {
                setLeaderSearch(e.target.value);
                setLeaderPage(1);
              }}
              className="w-full pl-10 pr-10 py-2.5 bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl text-sm text-[#0A0A0A] placeholder-[#8E8E93] focus:outline-none focus:border-[#EC663B] focus:bg-white"
            />
            {leaderSearch && (
              <button
                type="button"
                onClick={() => setLeaderSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8E8E93] hover:text-[#0A0A0A] cursor-pointer"
              >
                Effacer
              </button>
            )}
          </div>
        </div>

        {/* 3. CANDIDATES TABLE (FIXE, NON GLISSANT, ESPACES LATÉRAUX OPTIMISÉS) */}
        <div className="bg-white rounded-3xl border border-[#EBEBEB] shadow-sm overflow-hidden w-full">
          <div className="w-full">
            <table className="w-full text-left text-xs sm:text-sm text-[#6E6E73] table-auto">
              <thead className="bg-[#FAFAFA] border-b border-[#EBEBEB] text-[11px] font-bold text-[#0A0A0A] uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">Nom & Prénom</th>
                  <th className="px-3 py-3.5">Email</th>
                  <th className="px-3 py-3.5 whitespace-nowrap">Téléphone</th>
                  <th className="px-4 py-3.5">Entreprise</th>
                  <th className="px-2.5 py-3.5 text-center whitespace-nowrap">Score Audit</th>
                  <th className="px-2.5 py-3.5 text-center whitespace-nowrap">Statut</th>
                  <th className="px-4 py-3.5 text-right whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBEBEB] bg-white">
                {paginatedLeaders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-sm text-[#8E8E93]">
                      Aucun dossier ne correspond aux critères de recherche.
                    </td>
                  </tr>
                ) : (
                  paginatedLeaders.map((app) => {
                    const isSelected = app.status === "selected";
                    const isUnderReview = app.status === "under_review";

                    return (
                      <tr key={app.id} className="hover:bg-[#FAFAFA] transition-colors group">
                        {/* 1. Nom Dirigeant */}
                        <td className="px-4 py-3.5">
                          <span
                            className="text-xs sm:text-sm font-extrabold text-[#0A0A0A] block truncate max-w-[160px]"
                            title={app.company?.leaderName || "Dirigeant"}
                          >
                            {app.company?.leaderName || "Dirigeant inconnu"}
                          </span>
                        </td>

                        {/* 2. Contact Email */}
                        <td className="px-3 py-3.5 text-xs text-[#6E6E73] font-mono">
                          <span className="block truncate max-w-[180px]" title={app.company?.email}>
                            {app.company?.email || "-"}
                          </span>
                        </td>

                        {/* 3. Téléphone */}
                        <td className="px-3 py-3.5 text-xs text-[#6E6E73] font-mono whitespace-nowrap">
                          {app.company?.phone || "-"}
                        </td>

                        {/* 4. Entreprise & Ville */}
                        <td className="px-4 py-3.5">
                          <div
                            className="font-extrabold text-xs text-[#EC663B] leading-tight truncate max-w-[200px]"
                            title={app.company?.name}
                          >
                            {app.company?.name || "Entreprise"}
                          </div>
                          <span
                            className="text-[11px] text-[#8E8E93] block mt-0.5 truncate max-w-[200px]"
                            title={`${app.company?.city || "Bénin"} • ${app.company?.sector || "Général"}`}
                          >
                            {app.company?.city || "Bénin"} • {app.company?.sector || "Général"}
                          </span>
                        </td>

                        {/* 5. Score Audit */}
                        <td className="px-2.5 py-3.5 text-center whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-extrabold inline-block ${
                            (app.diagnosticScore || 0) >= 60
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-slate-100 text-[#0A0A0A] border border-slate-200"
                          }`}>
                            {app.diagnosticScore || 0}/100
                          </span>
                        </td>

                        {/* 6. Statut */}
                        <td className="px-2.5 py-3.5 text-center whitespace-nowrap">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider inline-block ${
                              isSelected
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : isUnderReview
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : "bg-blue-50 text-blue-700 border border-blue-200"
                            }`}
                          >
                            {isSelected ? "ADMIS TOP 20" : isUnderReview ? "DÉJÀ ANALYSÉ" : "EN ATTENTE"}
                          </span>
                        </td>

                        {/* 7. Action Button */}
                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => {
                              setInspectingApp(app);
                              setModalTab("synthese");
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-[#0A0A0A] hover:bg-[#EC663B] text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                          >
                            <EyeIcon className="w-3.5 h-3.5" />
                            <span>Examiner</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-[#FAFAFA] border-t border-[#EBEBEB] flex items-center justify-between">
              <span className="text-xs text-[#6E6E73]">
                Affichage de {(leaderPage - 1) * pageSize + 1} à{" "}
                {Math.min(leaderPage * pageSize, filteredLeaders.length)} sur {filteredLeaders.length} candidats
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setLeaderPage((p) => Math.max(1, p - 1))}
                  disabled={leaderPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-[#D1D1D6] text-xs font-bold text-[#0A0A0A] disabled:opacity-40 hover:bg-white cursor-pointer"
                >
                  Précédent
                </button>
                <span className="px-3 py-1.5 text-xs font-bold text-[#0A0A0A]">
                  Page {leaderPage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setLeaderPage((p) => Math.min(totalPages, p + 1))}
                  disabled={leaderPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-[#D1D1D6] text-xs font-bold text-[#0A0A0A] disabled:opacity-40 hover:bg-white cursor-pointer"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          MODAL DE CONFIRMATION AVANT LIBÉRATION DE PLACE TOP 20
          ========================================================================= */}
      {confirmReleaseModal && (
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 print:hidden">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-rose-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-4">
              <AlertTriangleIcon className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-extrabold text-[#0A0A0A] font-tech mb-2">
              Confirmer la libération de la place Top 20
            </h3>

            <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed mb-6">
              Attention : L'entreprise <strong className="text-[#0A0A0A] font-bold">{confirmReleaseModal.app.company?.name}</strong> (Dirigeant : {confirmReleaseModal.app.company?.leaderName}) est actuellement retenue parmi les 20 lauréats de la sélection officielle.
              <br className="my-2 block" />
              Êtes-vous certain de vouloir libérer cette place pour la replacer sous le statut{" "}
              <strong className="text-amber-800 font-bold">
                {confirmReleaseModal.targetStatus === "under_review" ? "« Déjà analysé »" : "« En attente »"}
              </strong>{" "}
              ? Cette place dans la Cohorte 1 redeviendra immédiatement disponible.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmReleaseModal(null)}
                className="px-4 py-2.5 rounded-xl border border-[#D1D1D6] hover:bg-[#FAFAFA] text-[#0A0A0A] text-xs font-bold transition-all cursor-pointer"
              >
                Annuler
              </button>

              <button
                type="button"
                onClick={async () => {
                  const { app, targetStatus } = confirmReleaseModal;
                  await handleUpdateStatus(app.id, targetStatus);
                  if (inspectingApp && inspectingApp.id === app.id) {
                    setInspectingApp({ ...inspectingApp, status: targetStatus });
                  }
                  setConfirmReleaseModal(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm shadow-rose-600/20 active:scale-95"
              >
                <span>Confirmer la libération</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL D'INSPECTION APPROFONDIE (DESIGN PROFESSIONNEL HAUTE FIDÉLITÉ)
          ========================================================================= */}
      {inspectingApp && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto print:hidden">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
            
            {/* 1. EXECUTIVE HEADER */}
            <div className="px-6 py-5 border-b border-slate-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EC663B] to-[#d4562e] text-white flex items-center justify-center font-extrabold text-xl font-tech shadow-sm shrink-0">
                  {inspectingApp.company?.name?.charAt(0) || inspectingApp.company?.leaderName?.charAt(0) || "E"}
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0A] font-tech tracking-tight">
                      {inspectingApp.company?.name || "Entreprise"}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider inline-flex items-center gap-1 ${
                        inspectingApp.status === "selected"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : inspectingApp.status === "under_review"
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        inspectingApp.status === "selected" ? "bg-emerald-500" : inspectingApp.status === "under_review" ? "bg-amber-500" : "bg-blue-500"
                      }`} />
                      <span>
                        {inspectingApp.status === "selected"
                          ? "Admis Top 20"
                          : inspectingApp.status === "under_review"
                          ? "Déjà analysé"
                          : "En attente"}
                      </span>
                    </span>
                  </div>
                  <p className="text-xs text-[#6E6E73] mt-0.5">
                    Dirigeant : <strong className="text-[#0A0A0A]">{inspectingApp.company?.leaderName}</strong> • {inspectingApp.company?.city || "Bénin"} ({inspectingApp.company?.sector || "Activité"})
                  </p>
                </div>
              </div>

              {/* Header Right Actions: Quick PDF Exports & Close */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setRapportMpmeApp(inspectingApp)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#00C2A8] hover:bg-[#009e8a] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  title="Télécharger le PDF pour l'entreprise (zéro jargon, zéro score, zéro pourcentage)"
                >
                  <DownloadIcon className="w-3.5 h-3.5 text-white" />
                  <span className="hidden sm:inline">PDF MPME (Entreprise)</span>
                  <span className="sm:hidden">PDF MPME</span>
                  <span className="text-[10px] text-white/90 font-mono">PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPdfModalApp(inspectingApp)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-[#0A0A0A] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                  title="Télécharger l'audit technique d'évaluation interne au format PDF A4"
                >
                  <DownloadIcon className="w-3.5 h-3.5 text-[#EC663B]" />
                  <span className="hidden sm:inline">Audit Admin (Interne)</span>
                  <span className="sm:hidden">Audit Admin</span>
                  <span className="text-[10px] text-[#8E8E93] font-mono">PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInspectingApp(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-[#0A0A0A] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer ml-1"
                  title="Fermer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* 2. REFINED STATUS ARBITRAGE TOOLBAR */}
            <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
              <span className="text-xs font-medium text-slate-500">
                Statut d'arbitrage :
              </span>

              {/* Segmented control */}
              <div className="inline-flex p-1 bg-slate-200/70 rounded-xl gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => requestStatusChange(inspectingApp, "submitted")}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    inspectingApp.status !== "selected" && inspectingApp.status !== "under_review"
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <ClockIcon className="w-3 h-3" />
                  <span>En attente</span>
                </button>

                <button
                  type="button"
                  onClick={() => requestStatusChange(inspectingApp, "under_review")}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    inspectingApp.status === "under_review"
                      ? "bg-amber-600 text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span>🔍 Déjà analysé</span>
                </button>

                <button
                  type="button"
                  onClick={() => requestStatusChange(inspectingApp, "selected")}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    inspectingApp.status === "selected"
                      ? "bg-emerald-600 text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <CheckIcon className="w-3 h-3" />
                  <span>Retenir (Top 20)</span>
                </button>
              </div>
            </div>

            {/* 3. MODERN UNIFIED TAB BAR (FIT 100% SANS SCROLLBAR) */}
            <div className="grid grid-cols-4 bg-white border-b border-slate-100 text-center shrink-0">
              <button
                type="button"
                onClick={() => setModalTab("synthese")}
                className={`py-3 px-2 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  modalTab === "synthese"
                    ? "border-[#EC663B] text-[#EC663B]"
                    : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50/50"
                }`}
              >
                <BarChartIcon className="w-3.5 h-3.5" />
                <span className="truncate">1. Diagnostic & Synthèse</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab("reponses")}
                className={`py-3 px-2 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  modalTab === "reponses"
                    ? "border-[#EC663B] text-[#EC663B]"
                    : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50/50"
                }`}
              >
                <FileSpreadsheetIcon className="w-3.5 h-3.5" />
                <span className="truncate">2. Réponses d'Audit (20)</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab("profil")}
                className={`py-3 px-2 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  modalTab === "profil"
                    ? "border-[#EC663B] text-[#EC663B]"
                    : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50/50"
                }`}
              >
                <UsersIcon className="w-3.5 h-3.5" />
                <span className="truncate">3. Fiche Entreprise</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab("notes")}
                className={`py-3 px-2 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  modalTab === "notes"
                    ? "border-[#EC663B] text-[#EC663B]"
                    : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50/50"
                }`}
              >
                <ShieldIcon className="w-3.5 h-3.5" />
                <span className="truncate">4. Notes du Jury ({inspectingApp.internalNotes?.length || 0})</span>
              </button>
            </div>

            {/* 4. MODAL CONTENT BODY */}
            <div className="p-6 sm:p-7 space-y-6 overflow-y-auto flex-1">
              {/* =============================================================
                  TAB 1 : SYNTHÈSE DIAGNOSTIC & LES 9 DIMENSIONS
                  ============================================================= */}
              {modalTab === "synthese" && (
                <div className="space-y-6">
                  {/* Top 3 KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Score Global */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Score Global de Maturité
                      </span>
                      <div className="my-2">
                        <div className="text-3xl sm:text-4xl font-black text-[#0A0A0A] font-tech leading-none">
                          {inspectingApp.diagnosticScore ?? activeInspectionReport?.globalScore ?? 0}
                          <span className="text-sm font-normal text-slate-400"> / 100</span>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-[#EC663B] block">
                        {inspectingApp.diagnosticLevel || activeInspectionReport?.level || "Évaluation en cours"}
                      </span>
                    </div>

                    {/* Finançabilité */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">
                        Indicateur de Finançabilité
                      </span>
                      <div className="my-2">
                        <div className="text-3xl sm:text-4xl font-black text-[#0A0A0A] font-tech leading-none">
                          {activeInspectionReport?.fundingReadiness.score ?? 50}
                          <span className="text-sm font-normal text-slate-400"> / 100</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {activeInspectionReport?.fundingReadiness.analysis || "Dossier en cours d'examen bancaire."}
                      </p>
                    </div>

                    {/* Admissibilité */}
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Seuil d'Éligibilité Top 20
                      </span>
                      <div className="my-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          (inspectingApp.diagnosticScore ?? 0) >= 60
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}>
                          {(inspectingApp.diagnosticScore ?? 0) >= 60 ? "✓ Éligible au Top 20" : "Dossier à consolider"}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Seuil d'admission fixé à 60/100 par le gouverneur.
                      </p>
                    </div>
                  </div>

                  {/* Recommandation Stratégique ALODO (Design raffiné sans aplat noir agressif) */}
                  {activeInspectionReport?.alodoRecommendation && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50/70 to-slate-50 border border-orange-200/80 flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-xl bg-[#EC663B] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                        ★
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#EC663B] block">
                          Orientation Stratégique du Programme ALODO
                        </span>
                        <p className="text-xs sm:text-sm text-slate-800 mt-0.5 font-medium leading-relaxed">
                          {activeInspectionReport.alodoRecommendation}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bouton d'accès direct au PDF MPME Dirigeant (Zéro jargon) */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/80 to-teal-50/50 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                        <span className="text-xs font-black text-emerald-950 uppercase tracking-wide">
                          Feuille de Route MPME (Format remis à l'entreprise)
                        </span>
                      </div>
                      <p className="text-xs text-emerald-900/80 mt-0.5 font-medium">
                        Guide pratique de terrain : sans formule technique, sans score ni pourcentage. 100% accessible au dirigeant.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setRapportMpmeApp(inspectingApp)}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 shrink-0 cursor-pointer self-start sm:self-auto active:scale-95"
                    >
                      <DownloadIcon className="w-3.5 h-3.5" />
                      <span>Ouvrir le PDF MPME</span>
                    </button>
                  </div>

                  {/* Les 9 Dimensions Stratégiques */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-2xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="text-xs font-extrabold text-[#0A0A0A] uppercase tracking-wider flex items-center gap-2">
                        <BarChartIcon className="w-4 h-4 text-[#EC663B]" />
                        <span>Audit des 9 Dimensions Stratégiques</span>
                      </h4>
                      <span className="text-[11px] text-slate-400 font-medium">Pondération totale sur 100 points</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {(activeInspectionReport?.dimensionScores || DIMENSIONS.map(d => ({
                        dimensionId: d.id,
                        title: d.title,
                        weight: d.weight,
                        score: inspectingApp.diagnosticScore || 50,
                        level: "Intermédiaire"
                      }))).map((dim) => {
                        const score = dim.score;
                        return (
                          <div key={dim.dimensionId} className="p-3.5 rounded-xl bg-slate-50/60 border border-slate-200/80 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-slate-500 font-bold uppercase">Pondération {dim.weight}%</span>
                              <span className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold ${
                                score >= 70
                                  ? "bg-emerald-100 text-emerald-800"
                                  : score >= 50
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}>
                                {score}/100
                              </span>
                            </div>
                            <span className="text-xs font-bold text-[#0A0A0A] block truncate">{dim.title}</span>
                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  score >= 70 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-rose-500"
                                }`}
                                style={{ width: `${score}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-slate-500 font-medium block">
                              Niveau : {dim.level || (score >= 70 ? "Avancé" : score >= 50 ? "Intermédiaire" : "Initial")}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Forces Majeures & Points de Vigilance (2 Colonnes Équilibrées) */}
                  {activeInspectionReport && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Forces */}
                      <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2.5">
                        <span className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                          <span>Points Forts Identifiés</span>
                        </span>
                        <ul className="text-xs text-slate-800 space-y-1.5 list-disc list-inside">
                          {activeInspectionReport.strengths?.length > 0 ? (
                            activeInspectionReport.strengths.map((s, idx) => (
                              <li key={idx} className="leading-relaxed">{s}</li>
                            ))
                          ) : (
                            <li className="italic text-slate-400">Dossier équilibré sans force prédominante déclarée.</li>
                          )}
                        </ul>
                      </div>

                      {/* Risques / Faiblesses */}
                      <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-2.5">
                        <span className="text-xs font-extrabold text-rose-900 flex items-center gap-1.5">
                          <AlertTriangleIcon className="w-4 h-4 text-rose-600" />
                          <span>Points de Vigilance & Risques</span>
                        </span>
                        <ul className="text-xs text-slate-800 space-y-1.5 list-disc list-inside">
                          {activeInspectionReport.topRisks?.length > 0 ? (
                            activeInspectionReport.topRisks.map((r, idx) => (
                              <li key={idx} className="leading-relaxed">{r}</li>
                            ))
                          ) : (
                            <li className="italic text-slate-400">Aucun risque critique immédiat repéré.</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Feuille de Route 90 Jours */}
                  {activeInspectionReport?.actionPlan && (
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3.5 shadow-2xs">
                      <h4 className="text-xs font-extrabold text-[#0A0A0A] uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                        <ClockIcon className="w-4 h-4 text-[#EC663B]" />
                        <span>Feuille de Route Opérationnelle 90 Jours</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                          <span className="text-[10px] font-bold text-[#EC663B] uppercase tracking-wider block mb-2">
                            Jalon 0 – 30 Jours
                          </span>
                          <ul className="space-y-1.5 text-slate-700">
                            {activeInspectionReport.actionPlan.days30.map((a, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-[#EC663B] font-bold">→</span>
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block mb-2">
                            Jalon 30 – 60 Jours
                          </span>
                          <ul className="space-y-1.5 text-slate-700">
                            {activeInspectionReport.actionPlan.days60.map((a, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-amber-600 font-bold">→</span>
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                          <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block mb-2">
                            Jalon 60 – 90 Jours
                          </span>
                          <ul className="space-y-1.5 text-slate-700">
                            {activeInspectionReport.actionPlan.days90.map((a, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-teal-600 font-bold">→</span>
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* =============================================================
                  TAB 2 : AUDIT DÉTAILLÉ DES 20 RÉPONSES CERTIFIÉES
                  ============================================================= */}
              {modalTab === "reponses" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold text-[#0A0A0A] uppercase tracking-wider">
                        Relevé Certifié des 20 Réponses Déclarées
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Déclarations authentiques enregistrées lors de la soumission du formulaire par le dirigeant.
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white text-xs font-mono font-bold text-[#0A0A0A] border border-slate-200 shadow-2xs">
                      20 Questions Auditées
                    </span>
                  </div>

                  <div className="space-y-4">
                    {DIMENSIONS.map((dim, dimIdx) => {
                      const questions = QUESTIONS_V1.filter((q) => q.dimensionId === dim.id);
                      const dimScore = activeInspectionReport?.dimensionScores.find((d) => d.dimensionId === dim.id);

                      return (
                        <div key={dim.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-[#EC663B]/10 text-[#EC663B] text-[11px] font-bold flex items-center justify-center font-mono">
                                {dimIdx + 1}
                              </span>
                              <span className="text-xs font-extrabold text-[#0A0A0A] uppercase tracking-wider">
                                {dim.title}
                              </span>
                            </div>
                            {dimScore && (
                              <span className="px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-mono font-bold text-slate-800">
                                Score : {dimScore.score}/100
                              </span>
                            )}
                          </div>

                          <div className="space-y-2.5">
                            {questions.map((q, qIdx) => {
                              const ansDetail = getAuditAnswerDetail(inspectingApp, q.id);
                              return (
                                <div key={q.id} className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/60 text-xs space-y-1.5">
                                  <div className="flex items-start justify-between gap-3">
                                    <span className="font-semibold text-[#0A0A0A] leading-snug">
                                      {qIdx + 1}. {q.text}
                                    </span>
                                    {ansDetail?.score !== null && ansDetail?.score !== undefined && (
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                                        ansDetail.score >= 70
                                          ? "bg-emerald-100 text-emerald-800"
                                          : ansDetail.score >= 50
                                          ? "bg-amber-100 text-amber-800"
                                          : "bg-rose-100 text-rose-800"
                                      }`}>
                                        +{ansDetail.score} pts
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-slate-600 font-medium flex items-center gap-1.5 pt-0.5">
                                    <span className="text-slate-400">↳ Déclaration :</span>
                                    <strong className="text-[#0A0A0A] font-bold bg-white px-2 py-0.5 rounded border border-slate-200/80">
                                      {ansDetail?.answeredText || "Non renseigné"}
                                    </strong>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* =============================================================
                  TAB 3 : FICHE ENTREPRISE & DÉCLARATIONS DIRIGEANT
                  ============================================================= */}
              {modalTab === "profil" && (
                <div className="space-y-5">
                  {/* Coordonnées & Identité */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-2xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="text-xs font-extrabold text-[#0A0A0A] uppercase tracking-wider flex items-center gap-2">
                        <UsersIcon className="w-4 h-4 text-[#EC663B]" />
                        <span>Identité & Données Administratives</span>
                      </h4>
                      <span className="text-xs text-slate-400 font-mono">
                        Dossier #{inspectingApp.id.slice(0, 8)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block">Nom de l'Entreprise</span>
                        <span className="font-extrabold text-[#0A0A0A] text-sm">{inspectingApp.company?.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Nom du Dirigeant</span>
                        <span className="font-extrabold text-[#0A0A0A] text-sm">{inspectingApp.company?.leaderName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Ville d'Implantation</span>
                        <span className="font-bold text-[#0A0A0A]">{inspectingApp.company?.city}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Secteur d'Activité</span>
                        <span className="font-bold text-[#0A0A0A]">{inspectingApp.company?.sector}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Année de Création</span>
                        <span className="font-bold text-[#0A0A0A]">{inspectingApp.company?.yearCreated || 2024}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Effectif (Salariés)</span>
                        <span className="font-bold text-[#0A0A0A]">{inspectingApp.company?.employeesCount}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Chiffre d'Affaires Mensuel</span>
                        <span className="font-bold text-[#0A0A0A]">{inspectingApp.company?.monthlyRevenue}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Formalisation (RCCM / IFU)</span>
                        <span className={`font-bold ${inspectingApp.company?.isFormalized ? "text-emerald-600" : "text-amber-600"}`}>
                          {inspectingApp.company?.isFormalized ? "OUI (Formalisé)" : "NON (Informel)"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Compte Bancaire Pro Dédié</span>
                        <span className={`font-bold ${inspectingApp.company?.hasProBankAccount ? "text-emerald-600" : "text-amber-600"}`}>
                          {inspectingApp.company?.hasProBankAccount ? "OUI (Actif)" : "NON"}
                        </span>
                      </div>
                    </div>

                    {/* Contacts directs */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5 text-[#0A0A0A]">
                        <span className="text-slate-400">Email :</span>
                        <a href={`mailto:${inspectingApp.company?.email}`} className="font-mono text-[#EC663B] hover:underline">
                          {inspectingApp.company?.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#0A0A0A]">
                        <span className="text-slate-400">Téléphone :</span>
                        <a href={`tel:${inspectingApp.company?.phone}`} className="font-mono hover:underline">
                          {inspectingApp.company?.phone}
                        </a>
                      </div>
                      {(inspectingApp.company?.whatsapp || inspectingApp.company?.phone) && (
                        <a
                          href={`https://wa.me/${(inspectingApp.company?.whatsapp || inspectingApp.company?.phone).replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                        >
                          <MessageCircleIcon className="w-3 h-3" />
                          <span>Contacter sur WhatsApp</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Problème majeur n°1 & Motivation */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 text-xs shadow-2xs">
                    <h4 className="text-xs font-extrabold text-[#0A0A0A] uppercase tracking-wider border-b border-slate-100 pb-3">
                      Déclarations & Attentes du Dirigeant
                    </h4>

                    {inspectingApp.company?.singleBiggestProblem && (
                      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
                        <strong className="text-amber-900 block mb-1 font-bold">
                          Problème prioritaire n°1 à résoudre dans les 3 mois :
                        </strong>
                        <p className="text-amber-950 italic font-medium leading-relaxed">
                          "{inspectingApp.company.singleBiggestProblem}"
                        </p>
                      </div>
                    )}

                    {inspectingApp.company?.motivation && (
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                        <strong className="text-[#0A0A0A] block mb-1 font-bold">
                          Motivation pour rejoindre le Programme ALODO MPME :
                        </strong>
                        <p className="text-slate-700 leading-relaxed">
                          {inspectingApp.company.motivation}
                        </p>
                      </div>
                    )}

                    {inspectingApp.company?.leaderAvailability && (
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                        <span className="text-slate-500">Disponibilité déclarée du dirigeant pour l'accompagnement :</span>
                        <strong className="text-[#0A0A0A] font-bold">{inspectingApp.company.leaderAvailability}</strong>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* =============================================================
                  TAB 4 : NOTES INTERNES DU JURY
                  ============================================================= */}
              {modalTab === "notes" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-2xs">
                  <h4 className="text-xs font-extrabold text-[#0A0A0A] uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                    <ShieldIcon className="w-4 h-4 text-[#EC663B]" />
                    <span>Observations Confidentielles du Comité ALODO</span>
                  </h4>

                  <form onSubmit={handleAddNote} className="space-y-2">
                    <textarea
                      rows={3}
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Ajouter une observation confidentielle (ex: potentiel de croissance, vérification bilan, délibération collégiale)..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-[#0A0A0A] placeholder-slate-400 focus:outline-none focus:border-[#EC663B]"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!newNote.trim()}
                        className="px-4 py-2 rounded-xl bg-[#0A0A0A] text-white text-xs font-bold disabled:opacity-40 cursor-pointer shadow-xs hover:bg-black transition-all"
                      >
                        Enregistrer l'observation
                      </button>
                    </div>
                  </form>

                  {inspectingApp.internalNotes && inspectingApp.internalNotes.length > 0 ? (
                    <div className="space-y-2.5 pt-2">
                      {inspectingApp.internalNotes.map((note) => (
                        <div key={note.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-[#0A0A0A]">{note.author}</span>
                              <span className="text-[10px] text-slate-400">
                                {new Date(note.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                              </span>
                            </div>
                            <p className="text-slate-700 leading-relaxed">{note.content}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteNote(note.id)}
                            className="text-[10px] text-rose-600 hover:underline cursor-pointer shrink-0"
                          >
                            Supprimer
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic py-3 text-center">
                      Aucune note interne enregistrée pour ce dossier pour le moment.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* 5. MODAL FOOTER */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500">
                Dossier soumis le :{" "}
                <strong className="text-[#0A0A0A]">
                  {inspectingApp.submittedAt ? new Date(inspectingApp.submittedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}
                </strong>
              </span>

              <button
                type="button"
                onClick={() => setInspectingApp(null)}
                className="px-5 py-2 rounded-xl bg-[#0A0A0A] hover:bg-black text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          RAPPORT AUDIT OFFICIEL ADMIN (PDF A4 POUR ARCHIVE LOCALE)
          ========================================================================= */}
      <DossierPdfDocument
        application={pdfModalApp}
        report={pdfModalApp?.diagnosticReport || null}
        isOpen={Boolean(pdfModalApp)}
        onClose={() => setPdfModalApp(null)}
      />

      {/* =========================================================================
          RAPPORT MPME DIRIGEANT (PDF TERRAIN BIENVEILLANT SANS JARGON)
          ========================================================================= */}
      <RapportMpmePdf
        application={rapportMpmeApp}
        isOpen={Boolean(rapportMpmeApp)}
        onClose={() => setRapportMpmeApp(null)}
      />
    </DashboardLayout>
  );
}
