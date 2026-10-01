"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/mpme/DashboardLayout";
import DossierPdfDocument from "@/components/mpme/DossierPdfDocument";
import { MpmeStorage } from "@/lib/mpme/storage";
import { Application, Cohort } from "@/lib/mpme/types";
import { createClient } from "@/utils/supabase/client";

// ============================================================================
// CLEAN PROFESSIONAL VECTOR SVG ICONS (STRICTLY ZERO EMOJIS)
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

function AwardIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}

function SettingsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function BarChartIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
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

function LayersIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function TableIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  );
}

function RefreshIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

export default function AdminCandidaturesPage() {
  const [cohort, setCohort] = useState<Cohort | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [adminEmail, setAdminEmail] = useState<string>("Console Gouverneur ALODO TECH");

  // Governor tabs: Leaders (Candidats) is primary, Top 20 is secondary
  const [adminTab, setAdminTab] = useState<"top20" | "leaders">("leaders");
  const [viewMode, setViewMode] = useState<"split" | "table">("split");

  // Filters & Search
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterFormalized, setFilterFormalized] = useState<string>("all");
  const [filterCity, setFilterCity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"score_desc" | "date_desc" | "name_asc">("score_desc");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Notes & Modals
  const [newNote, setNewNote] = useState("");
  const [statusFeedback, setStatusFeedback] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pdfModalApp, setPdfModalApp] = useState<Application | null>(null);

  // Candidats Tab: Status Filters, Search & Pagination (20 per page)
  const [leaderFilterStatus, setLeaderFilterStatus] = useState<"all" | "pending" | "under_review" | "selected" | "rejected">("all");
  const [leaderSearch, setLeaderSearch] = useState<string>("");
  const [leaderPage, setLeaderPage] = useState<number>(1);
  const [inspectingApp, setInspectingApp] = useState<Application | null>(null);

  // EXTENSIVE GOVERNOR PARAMETERS
  const [editMaxCapacity, setEditMaxCapacity] = useState<number>(20);
  const [editStatus, setEditStatus] = useState<Cohort["status"]>("open");
  const [editMinScore, setEditMinScore] = useState<number>(60);
  const [editCohortName, setEditCohortName] = useState<string>("Cohorte 1 — Bénin 2026");
  const [editOpeningDate, setEditOpeningDate] = useState<string>("2026-09-01");
  const [editClosingDate, setEditClosingDate] = useState<string>("2026-10-31");
  const [editAnnouncementDate, setEditAnnouncementDate] = useState<string>("2026-11-15");
  const [editBootcampDate, setEditBootcampDate] = useState<string>("2026-12-01");
  const [editAnnouncement, setEditAnnouncement] = useState<string>("");
  const [editCriteriaNotes, setEditCriteriaNotes] = useState<string>("");
  const [editAutoNotify, setEditAutoNotify] = useState<boolean>(true);
  const [editArbitrationMode, setEditArbitrationMode] = useState<string>("collegial");

  // 8 Dimensions Weightings
  const [weights, setWeights] = useState({
    formalisation: 10,
    finance: 15,
    comptabilite: 15,
    commercial: 15,
    digitalisation: 10,
    operations: 15,
    rh: 10,
    financabilite: 10,
  });

  const refreshData = async () => {
    const supabase = createClient();
    
    // 0. Verify Admin Access
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = "/admin/login";
      return;
    }

    const { data: adminRecord } = await supabase
      .from('admins')
      .select('id')
      .eq('email', user.email)
      .single();

    if (!adminRecord) {
      await supabase.auth.signOut();
      window.location.href = "/admin/login?error=unauthorized";
      return;
    }

    setIsAuthorized(true);

    if (user?.email) {
      setAdminEmail(user.email);
    }

    // 1. Fetch cohort
    const { data: cohortData } = await supabase.from('cohorts').select('*').eq('status', 'open').single();
    if (cohortData) {
      setCohort({
        id: cohortData.id,
        name: cohortData.name,
        maxCapacity: cohortData.max_capacity,
        openedAt: cohortData.opened_at,
        closingDate: cohortData.closing_date,
        status: cohortData.status,
      } as any);

      setEditMaxCapacity(cohortData.max_capacity || 20);
      setEditStatus(cohortData.status || "open");
      setEditCohortName(cohortData.name || "Cohorte 1 — Bénin 2026");
    }

    // 2. Fetch applications
    const { data: appsData, error } = await supabase
      .from('applications')
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
          report_data
        )
      `);

    if (appsData) {
      const apps = appsData.map((row: any) => {
        const diag = row.diagnostics?.[0] || row.diagnostics;
        const company = Array.isArray(row.companies) ? row.companies[0] : row.companies;

        return {
          id: row.id,
          companyId: company?.id,
          cohortId: cohortData?.id || "cohort-1",
          status: row.status,
          submittedAt: row.submitted_at,
          diagnosticScore: diag?.global_score,
          diagnosticLevel: diag?.diagnostic_level,
          diagnosticReport: diag?.report_data,
          company: {
            id: company?.id,
            name: company?.name,
            leaderName: company?.leader_name,
            phone: company?.phone,
            whatsapp: company?.whatsapp,
            email: company?.email,
            city: company?.city,
            sector: company?.sector,
            yearCreated: company?.year_created,
            employeesCount: company?.employees_count,
            monthlyRevenue: company?.monthly_revenue,
            isFormalized: company?.is_formalized,
            hasProBankAccount: company?.has_pro_bank_account,
            mainDifficulties: company?.main_difficulties,
            singleBiggestProblem: company?.single_biggest_problem,
            motivation: company?.motivation
          }
        } as Application;
      });
      setApplications(apps);

      if (selectedApp) {
        const refreshed = apps.find((a: any) => a.id === selectedApp.id) || null;
        setSelectedApp(refreshed);
      } else if (apps.length > 0) {
        setSelectedApp(apps[0]);
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "top20" || tabParam === "leaders") {
        setAdminTab(tabParam as any);
      }
    }
    refreshData();
  }, []);

  const handleUpdateStatus = async (appId: string, status: Application["status"]) => {
    setStatusFeedback(null);
    const supabase = createClient();
    const { error } = await supabase.from('applications').update({ status }).eq('id', appId);
    
    if (error) {
      setStatusFeedback({ msg: "Erreur lors de la mise à jour.", type: "error" });
    } else {
      const target = applications.find((a) => a.id === appId);

      // Envoi automatique d'emails commenté pour ne pas bloquer les déploiements
      /*
      if (target?.company?.email) {
        if (status === "selected") {
          fetch('/api/send-dashboard-link', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              toEmail: target.company.email,
              companyName: target.company.name,
              action: 'accept',
            }),
          }).catch(console.error);
        } else if (status === "rejected") {
          fetch('/api/send-dashboard-link', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              toEmail: target.company.email,
              companyName: target.company.name,
              action: 'reject',
            }),
          }).catch(console.error);
        }
      }
      */

      const label =
        status === "selected"
          ? "Entreprise admise dans la cohorte Top 20."
          : status === "rejected"
          ? "Dossier non retenu."
          : status === "under_review"
          ? "Dossier placé en cours d'analyse."
          : "Statut mis à jour.";
      setStatusFeedback({ msg: label, type: "success" });
      refreshData();
    }
  };

  // Add Internal Jury Note (Disabled for DB migration)
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !newNote.trim()) return;
    // For V1, notes are disabled unless added to DB schema
    setStatusFeedback({ msg: "Les notes internes seront disponibles dans la prochaine mise à jour.", type: "error" });
    setNewNote("");
  };

  // Save Governor Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cohort) return;
    
    const supabase = createClient();
    const { error } = await supabase.from('cohorts').update({
      name: editCohortName,
      max_capacity: Number(editMaxCapacity),
      status: editStatus,
      opened_at: editOpeningDate,
      closing_date: editClosingDate,
    }).eq('id', cohort.id);

    if (error) {
      setStatusFeedback({
        msg: "Erreur lors de la sauvegarde des paramètres.",
        type: "error",
      });
    } else {
      setStatusFeedback({
        msg: "Tous les paramètres de gouvernance ont été appliqués en direct !",
        type: "success",
      });
      refreshData();
    }
  };

  // Reset Demo Data (Disabled for DB)
  const handleResetDemo = () => {
    setStatusFeedback({ msg: "La réinitialisation est désactivée en mode base de données.", type: "error" });
  };

  // CSV Export for Evaluation Committee
  const exportCandidatesCsv = () => {
    if (applications.length === 0) return;
    const headers = [
      "ID",
      "Rang_Maturite",
      "Entreprise",
      "Dirigeant",
      "Email",
      "Telephone",
      "WhatsApp",
      "Ville",
      "Secteur",
      "Statut",
      "Score_Diagnostic_100",
      "Niveau_Maturite",
      "RCCM_IFU",
      "Compte_Bancaire_Pro",
      "Effectif",
      "CA_Mensuel",
      "Date_Soumission",
      "Problematique_Prioritaire",
    ];

    const sortedForExport = [...applications].sort(
      (a, b) => (b.diagnosticScore || 0) - (a.diagnosticScore || 0)
    );

    const rows = sortedForExport.map((a, index) => {
      const escapeCsv = (str: string | undefined) => `"${(str || '').replace(new RegExp('"', 'g'), '""')}"`;
      return [
        a.id,
        index + 1,
        escapeCsv(a.company.name),
        escapeCsv(a.company.leaderName),
        a.company.email,
        a.company.phone,
        a.company.whatsapp || a.company.phone,
        escapeCsv(a.company.city),
        escapeCsv(a.company.sector),
        a.status === "selected" ? "RETENUE_TOP_20" : a.status,
      a.diagnosticScore || "N/A",
      a.diagnosticLevel || "N/A",
      a.company.isFormalized ? "OUI" : "NON",
      a.company.hasProBankAccount ? "OUI" : "NON",
      escapeCsv(String(a.company.employeesCount)),
      escapeCsv(String(a.company.monthlyRevenue)),
      new Date(a.submittedAt).toLocaleDateString("fr-FR"),
      escapeCsv(a.company.singleBiggestProblem),
    ];
  });

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `ALODO_MPME_Registre_Officiel_Cohorte1_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics
  const totalCount = applications.length;
  const selectedCount = applications.filter((a) => a.status === "selected").length;
  const maxCapacity = cohort?.maxCapacity || 20;
  const remainingSpots = Math.max(0, maxCapacity - selectedCount);
  const quotaPercent = Math.min(100, Math.round((selectedCount / maxCapacity) * 100));

  const diagnosticDoneCount = applications.filter(
    (a) => a.diagnosticScore || a.status === "diagnostic_completed" || a.diagnosticReport
  ).length;
  const diagnosticRate = totalCount > 0 ? Math.round((diagnosticDoneCount / totalCount) * 100) : 0;

  const scoredApps = applications.filter((a) => typeof a.diagnosticScore === "number");
  const averageMaturityScore =
    scoredApps.length > 0
      ? Math.round(scoredApps.reduce((acc, curr) => acc + (curr.diagnosticScore || 0), 0) / scoredApps.length)
      : 0;

  const underReviewCount = applications.filter((a) => a.status === "under_review").length;
  const rejectedCount = applications.filter((a) => a.status === "rejected").length;
  const formalizedCount = applications.filter((a) => a.company.isFormalized).length;

  // Selected applications for Top 20 view
  const top20Apps = [...applications]
    .filter((a) => a.status === "selected")
    .sort((a, b) => (b.diagnosticScore || 0) - (a.diagnosticScore || 0));

  // Filtered & Sorted applications for Registry
  const filteredApps = applications
    .filter((app) => {
      // Status Filter
      if (filterStatus !== "all") {
        if (filterStatus === "selected" && app.status !== "selected") return false;
        if (filterStatus === "diagnostic_completed" && !app.diagnosticScore && app.status !== "diagnostic_completed") return false;
        if (filterStatus === "under_review" && app.status !== "under_review") return false;
        if (filterStatus === "rejected" && app.status !== "rejected") return false;
      }

      // Formalized Filter
      if (filterFormalized === "yes" && !app.company.isFormalized) return false;
      if (filterFormalized === "no" && app.company.isFormalized) return false;

      // City Filter
      if (filterCity !== "all" && !app.company.city.toLowerCase().includes(filterCity.toLowerCase())) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = app.company.name.toLowerCase().includes(q);
        const matchLeader = app.company.leaderName.toLowerCase().includes(q);
        const matchCity = app.company.city.toLowerCase().includes(q);
        const matchSector = app.company.sector.toLowerCase().includes(q);
        const matchEmail = app.company.email.toLowerCase().includes(q);
        return matchName || matchLeader || matchCity || matchSector || matchEmail;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "score_desc") {
        return (b.diagnosticScore || 0) - (a.diagnosticScore || 0);
      }
      if (sortBy === "date_desc") {
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      }
      if (sortBy === "name_asc") {
        return a.company.name.localeCompare(b.company.name);
      }
      return 0;
    });

  const pendingCount = applications.filter(
    (a) => a.status !== "selected" && a.status !== "under_review" && a.status !== "rejected"
  ).length;

  const filteredLeaders = applications.filter((app) => {
    // Status Filter: en attente, rejeter, retenir, deja analyser
    if (leaderFilterStatus === "selected" && app.status !== "selected") return false;
    if (leaderFilterStatus === "under_review" && app.status !== "under_review") return false;
    if (leaderFilterStatus === "rejected" && app.status !== "rejected") return false;
    if (
      leaderFilterStatus === "pending" &&
      (app.status === "selected" || app.status === "under_review" || app.status === "rejected")
    )
      return false;

    // Search Query
    if (leaderSearch.trim()) {
      const q = leaderSearch.toLowerCase().trim();
      const matchName = app.company?.name?.toLowerCase().includes(q) || false;
      const matchLeader = app.company?.leaderName?.toLowerCase().includes(q) || false;
      const matchCity = app.company?.city?.toLowerCase().includes(q) || false;
      const matchSector = app.company?.sector?.toLowerCase().includes(q) || false;
      const matchEmail = app.company?.email?.toLowerCase().includes(q) || false;
      const matchPhone = app.company?.phone?.toLowerCase().includes(q) || false;
      const matchWhatsApp = app.company?.whatsapp?.toLowerCase().includes(q) || false;
      return matchName || matchLeader || matchCity || matchSector || matchEmail || matchPhone || matchWhatsApp;
    }

    return true;
  });

  const LEADER_PAGE_SIZE = 20;
  const totalLeaderPages = Math.ceil(filteredLeaders.length / LEADER_PAGE_SIZE) || 1;
  const paginatedLeaders = filteredLeaders.slice(
    (leaderPage - 1) * LEADER_PAGE_SIZE,
    leaderPage * LEADER_PAGE_SIZE
  );

  if (!isClient || !isAuthorized) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#EC663B] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[#8E8E93] font-medium tracking-wide">
            Vérification des autorisations...
          </span>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout 
      activeTab="admin" 
      adminSubTab={adminTab} 
      onSelectAdminTab={(tab) => setAdminTab(tab === "top20" ? "top20" : "leaders")}
    >
      <div className="space-y-6 animate-in fade-in duration-150">

        {/* =========================================================================
            1. EXECUTIVE COMMAND HEADER (LIGHT THEME IDENTICAL TO CANDIDATE DASHBOARD)
            ========================================================================= */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#F2F2F2]">
            <div>
              <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-[#EC663B]/10 text-[#EC663B] border border-[#EC663B]/20 text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <ShieldIcon className="w-3.5 h-3.5 text-[#EC663B]" />
                  {adminEmail}
                </span>
                <span className="text-xs text-[#8E8E93]">•</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Cohorte 1 Active (Quota : {maxCapacity} Places)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight font-tech">
                Pilotage National du Programme ALODO MPME
              </h1>
              <p className="text-xs sm:text-sm text-[#6E6E73] mt-1 max-w-2xl leading-relaxed">
                Supervision souveraine des candidatures, examen approfondi des diagnostics de maturité (8 dimensions stratégiques) et arbitrage des 20 entreprises retenues.
              </p>
            </div>

            {/* Governor Action Suite */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Empty for now */}
            </div>
          </div>

          {/* Quota Gauge & Interactive 20-slot visualization */}
          <div className="pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs mb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#0A0A0A]">
                  Attribution des Places :
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono font-bold text-xs border border-emerald-200">
                  {selectedCount} / {maxCapacity} Retenues
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-bold text-xs ${remainingSpots > 0 ? "text-[#EC663B]" : "text-rose-600"}`}>
                  {remainingSpots > 0 ? `${remainingSpots} places disponibles pour admission` : "Quota maximum atteint (20/20)"}
                </span>
                <span className="text-[#8E8E93] font-mono text-[11px]">
                  ({quotaPercent}%)
                </span>
              </div>
            </div>

            {/* 20-slot segments in clean light theme */}
            <div className="grid grid-cols-10 sm:grid-cols-20 gap-1 sm:gap-1.5 p-2 bg-[#F8F9FA] rounded-2xl border border-[#EBEBEB]">
              {Array.from({ length: maxCapacity }).map((_, i) => {
                const isOccupied = i < selectedCount;
                const candidate = top20Apps[i];
                return (
                  <div
                    key={i}
                    title={
                      isOccupied && candidate
                        ? `Place #${i + 1} : ${candidate.company.name} (${candidate.diagnosticScore || 0}/100)`
                        : `Place #${i + 1} disponible`
                    }
                    className={`h-5 rounded-lg transition-all flex items-center justify-center text-[10px] font-mono font-bold cursor-help ${
                      isOccupied
                        ? "bg-[#00C2A8] text-white shadow-xs"
                        : "bg-white text-[#8E8E93] border border-[#EBEBEB]"
                    }`}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* FEEDBACK TOAST */}
        {statusFeedback && (
          <div
            className={`p-4 rounded-2xl text-xs font-semibold border flex items-center justify-between animate-in fade-in duration-150 ${
              statusFeedback.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            <div className="flex items-center gap-2">
              {statusFeedback.type === "success" ? (
                <CheckCircleIcon className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">✕</span>
              )}
              <span>{statusFeedback.msg}</span>
            </div>
            <button
              onClick={() => setStatusFeedback(null)}
              className="text-xs opacity-60 hover:opacity-100 p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* =========================================================================
            2. EXECUTIVE KPI CARDS (LIGHT THEME)
            ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-white border border-[#EBEBEB] shadow-sm">
            <div className="flex items-center justify-between text-[#8E8E93] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Candidatures</span>
              <LayersIcon className="w-4 h-4 text-[#8E8E93]" />
            </div>
            <div className="text-3xl font-extrabold text-[#0A0A0A] font-tech">{totalCount}</div>
            <div className="text-[11px] text-[#6E6E73] mt-2 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{formalizedCount} formalisées (RCCM/IFU)</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#EBEBEB] shadow-sm">
            <div className="flex items-center justify-between text-[#8E8E93] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Admissions Top 20</span>
              <AwardIcon className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-600 font-tech">
              {selectedCount} <span className="text-base text-[#8E8E93] font-normal">/ {maxCapacity}</span>
            </div>
            <div className="text-[11px] text-[#6E6E73] mt-2 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{remainingSpots} places encore ouvertes</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#EBEBEB] shadow-sm">
            <div className="flex items-center justify-between text-[#8E8E93] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Diagnostics 8D</span>
              <BarChartIcon className="w-4 h-4 text-[#EC663B]" />
            </div>
            <div className="text-3xl font-extrabold text-[#0A0A0A] font-tech">
              {diagnosticDoneCount} <span className="text-base text-[#8E8E93] font-normal">({diagnosticRate}%)</span>
            </div>
            <div className="text-[11px] text-[#6E6E73] mt-2 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>{totalCount - diagnosticDoneCount} en cours de passage</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#EBEBEB] shadow-sm">
            <div className="flex items-center justify-between text-[#8E8E93] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Moyenne Maturité</span>
              <ShieldIcon className="w-4 h-4 text-[#EC663B]" />
            </div>
            <div className="text-3xl font-extrabold text-[#EC663B] font-tech">
              {averageMaturityScore > 0 ? `${averageMaturityScore}/100` : "N/A"}
            </div>
            <div className="text-[11px] text-[#6E6E73] mt-2 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EC663B]" />
              <span>Seuil de sélection : {cohort?.minScoreThreshold || 60}/100</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. GOVERNOR COMMAND TABS (LIGHT PALETTE, HARMONIZED WITH MPME)
            ========================================================================= */}
        <div className="flex items-center justify-between border-b border-[#EBEBEB] pb-2 flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setAdminTab("leaders")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                adminTab === "leaders"
                  ? "bg-[#0A0A0A] text-white shadow-xs"
                  : "bg-white text-[#6E6E73] hover:text-[#0A0A0A] border border-[#EBEBEB]"
              }`}
            >
              <UsersIcon className={`w-4 h-4 ${adminTab === "leaders" ? "text-[#EC663B]" : "text-[#8E8E93]"}`} />
              <span>Candidats & Entreprises ({applications.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setAdminTab("top20")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                adminTab === "top20"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs"
                  : "bg-white text-[#6E6E73] hover:text-[#0A0A0A] border border-[#EBEBEB]"
              }`}
            >
              <AwardIcon className="w-4 h-4" />
              <span>Les 20 Retenus ({selectedCount}/{maxCapacity})</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 2: LES 20 RETENUS (TABLEAU D'HONNEUR DE LA COHORTE 1)
            ========================================================================= */}
        {adminTab === "top20" && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-emerald-600 block mb-1">
                  Cohorte 1 — Sélection Finale
                </span>
                <h2 className="text-2xl font-extrabold text-[#0A0A0A] font-tech">
                  Le Top {maxCapacity} des Entreprises Retenues
                </h2>
                <p className="text-xs text-[#6E6E73] mt-1 max-w-xl">
                  Voici les entreprises officiellement sélectionnées pour intégrer le programme d'excellence ALODO MPME.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono font-bold text-sm">
                  {selectedCount} / {maxCapacity} Places attribuées
                </span>
                <button
                  type="button"
                  onClick={exportCandidatesCsv}
                  className="px-4 py-2 rounded-full bg-[#0A0A0A] text-white hover:bg-slate-800 text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <DownloadIcon className="w-3.5 h-3.5" />
                  <span>Exporter Liste Top 20</span>
                </button>
              </div>
            </div>

            {/* Grid of the 20 seats in light theme */}
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
                          <a
                            href={`https://wa.me/${(app.company.whatsapp || app.company.phone).replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                          >
                            <MessageCircleIcon className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(app.id, "under_review")}
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
                        <button
                          type="button"
                          onClick={() => setAdminTab("leaders")}
                          className="mt-2 text-xs font-bold text-[#EC663B] hover:underline cursor-pointer"
                        >
                          Attribuer un dossier →
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}



        {/* =========================================================================
            5. CANDIDATS (LEADERS) TAB — AVEC FILTRES, PAGINATION (20/PAGE) & INSPECTION
            ========================================================================= */}
        {adminTab === "leaders" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm animate-in fade-in duration-150 space-y-6">
            {/* Header + Export */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F2F2F2] pb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] font-tech flex items-center gap-3">
                  <UsersIcon className="w-6 h-6 text-[#EC663B]" />
                  Annuaire des Candidats & Entreprises
                </h2>
                <p className="text-xs sm:text-sm text-[#6E6E73] mt-1">
                  Gestion centralisée, filtrage par statut et arbitrage des {applications.length} dossiers soumis.
                </p>
              </div>

              <button
                type="button"
                onClick={exportCandidatesCsv}
                className="px-4 py-2.5 rounded-full border border-[#D1D1D6] hover:border-[#0A0A0A] bg-white hover:bg-[#FAFAFA] text-[#0A0A0A] text-xs font-bold flex items-center gap-2 transition-all shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <DownloadIcon className="w-3.5 h-3.5 text-[#EC663B]" />
                <span>Exporter CSV ({applications.length})</span>
              </button>
            </div>

            {/* Filter Tabs requested by user: en attente, rejeter, retenir, deja analyser */}
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
                <span>Déjà analysé</span>
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
                <span>Retenus (Top 20)</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  leaderFilterStatus === "selected" ? "bg-white/20 text-white" : "bg-emerald-200/60 text-emerald-800"
                }`}>
                  {selectedCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => { setLeaderFilterStatus("rejected"); setLeaderPage(1); }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  leaderFilterStatus === "rejected"
                    ? "bg-rose-600 text-white shadow-sm"
                    : "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                }`}
              >
                <span>Rejetés</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  leaderFilterStatus === "rejected" ? "bg-white/20 text-white" : "bg-rose-200/60 text-rose-800"
                }`}>
                  {rejectedCount}
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
                  onClick={() => { setLeaderSearch(""); setLeaderPage(1); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8E8E93] hover:text-[#0A0A0A]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Status Feedback Alert */}
            {statusFeedback && (
              <div className={`p-4 rounded-2xl text-xs font-bold flex items-center justify-between ${
                statusFeedback.type === "success"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-rose-50 text-rose-700 border border-rose-200"
              }`}>
                <span>{statusFeedback.msg}</span>
                <button
                  type="button"
                  onClick={() => setStatusFeedback(null)}
                  className="text-xs hover:opacity-70 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Candidates Table (20 items per page) */}
            <div className="overflow-x-auto rounded-2xl border border-[#EBEBEB]">
              <table className="w-full text-left text-sm text-[#6E6E73]">
                <thead className="bg-[#FAFAFA] border-b border-[#EBEBEB] text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 whitespace-nowrap">NOM & PRÉNOM</th>
                    <th className="px-6 py-4 whitespace-nowrap">EMAIL</th>
                    <th className="px-6 py-4 whitespace-nowrap">TÉLÉPHONE</th>
                    <th className="px-6 py-4 min-w-[240px]">ENTREPRISE</th>
                    <th className="px-6 py-4 text-center whitespace-nowrap">STATUT</th>
                    <th className="px-6 py-4 text-right whitespace-nowrap">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBEBEB] bg-white">
                  {paginatedLeaders.map((app) => {
                    const isSelected = app.status === "selected";
                    const isRejected = app.status === "rejected";
                    const isUnderReview = app.status === "under_review";
                    const isPending = !isSelected && !isRejected && !isUnderReview;

                    return (
                      <tr key={app.id} className="hover:bg-[#FAFAFA] transition-colors group">
                        {/* 1. Candidat & Entreprise */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-extrabold text-[#0A0A0A]">
                            {app.company?.leaderName || "Dirigeant inconnu"}
                          </span>
                        </td>

                        {/* 2. Contact */}
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-[#6E6E73] font-mono">
                          {app.company?.email || "-"}
                        </td>

                        {/* 3. Téléphone */}
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-[#6E6E73] font-mono">
                          {app.company?.phone || "-"}
                        </td>

                        {/* 4. Entreprise (Espace généreux pour les noms longs) */}
                        <td className="px-6 py-4 min-w-[240px] text-xs font-extrabold text-[#EC663B] leading-relaxed">
                          {app.company?.name || "-"}
                        </td>

                        {/* 5. Statut */}
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider inline-block ${
                              isSelected
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : isUnderReview
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : isRejected
                                ? "bg-rose-100 text-rose-800 border border-rose-300"
                                : "bg-gray-100 text-gray-700 border border-gray-300"
                            }`}
                          >
                            {isSelected
                              ? "ADMIS TOP 20"
                              : isUnderReview
                              ? "DÉJÀ ANALYSÉ"
                              : isRejected
                              ? "REJETÉ"
                              : "EN ATTENTE"}
                          </span>
                        </td>

                        {/* 6. Action */}
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => setInspectingApp(app)}
                            className="px-5 py-2 rounded-xl bg-[#0A0A0A] hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                          >
                            EXAMINER
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredLeaders.length === 0 && (
                <div className="text-center py-16 bg-white">
                  <UsersIcon className="w-10 h-10 text-[#D1D1D6] mx-auto mb-3" />
                  <p className="text-sm font-bold text-[#0A0A0A]">Aucun candidat trouvé</p>
                  <p className="text-xs text-[#8E8E93] mt-1">
                    Essayez de modifier votre filtre de statut ou votre terme de recherche.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination Controls (20 per page) */}
            {filteredLeaders.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#F2F2F2]">
                <div className="text-xs text-[#6E6E73]">
                  Affichage de <strong className="text-[#0A0A0A]">{(leaderPage - 1) * LEADER_PAGE_SIZE + 1}</strong> à{" "}
                  <strong className="text-[#0A0A0A]">
                    {Math.min(leaderPage * LEADER_PAGE_SIZE, filteredLeaders.length)}
                  </strong>{" "}
                  sur <strong className="text-[#0A0A0A]">{filteredLeaders.length}</strong> candidats (20 par page)
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setLeaderPage((prev) => Math.max(1, prev - 1))}
                    disabled={leaderPage <= 1}
                    className="px-3.5 py-2 rounded-xl border border-[#D1D1D6] bg-white hover:bg-[#FAFAFA] disabled:opacity-40 text-xs font-bold text-[#0A0A0A] transition-all cursor-pointer"
                  >
                    ← Précédent
                  </button>

                  {/* Page numbers chips */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalLeaderPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setLeaderPage(p)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          leaderPage === p
                            ? "bg-[#0A0A0A] text-white"
                            : "bg-[#FAFAFA] hover:bg-[#EBEBEB] text-[#6E6E73]"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setLeaderPage((prev) => Math.min(totalLeaderPages, prev + 1))}
                    disabled={leaderPage >= totalLeaderPages}
                    className="px-3.5 py-2 rounded-xl border border-[#D1D1D6] bg-white hover:bg-[#FAFAFA] disabled:opacity-40 text-xs font-bold text-[#0A0A0A] transition-all cursor-pointer"
                  >
                    Suivant →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            6. MODAL D'EXAMEN APPROFONDI, DIAGNOSTIC & ARBITRAGE
            ========================================================================= */}
        {inspectingApp && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setInspectingApp(null)}
          >
            <div
              className="bg-white rounded-3xl border border-[#EBEBEB] shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* MODAL HEADER */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#F2F2F2] bg-[#FAFAFA]/80 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                    <span className="text-[#EC663B] font-extrabold text-lg uppercase font-tech">
                      {inspectingApp.company?.name?.charAt(0) || inspectingApp.company?.leaderName?.charAt(0) || "D"}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] font-tech">
                        {inspectingApp.company?.name || "Entreprise"}
                      </h3>
                      <span
                        className={`px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          inspectingApp.status === "selected"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : inspectingApp.status === "under_review"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : inspectingApp.status === "rejected"
                            ? "bg-rose-100 text-rose-800 border border-rose-300"
                            : "bg-gray-100 text-gray-700 border border-gray-300"
                        }`}
                      >
                        {inspectingApp.status === "selected"
                          ? "ADMIS TOP 20"
                          : inspectingApp.status === "under_review"
                          ? "DÉJÀ ANALYSÉ"
                          : inspectingApp.status === "rejected"
                          ? "REJETÉ"
                          : "EN ATTENTE"}
                      </span>
                    </div>
                    <p className="text-xs text-[#6E6E73] mt-0.5">
                      Dirigeant : <strong className="text-[#0A0A0A]">{inspectingApp.company?.leaderName}</strong> • {inspectingApp.company?.city || "Bénin"} ({inspectingApp.company?.sector || "Activité"})
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setInspectingApp(null)}
                  className="w-9 h-9 rounded-full bg-white hover:bg-[#EBEBEB] border border-[#EBEBEB] text-[#6E6E73] hover:text-[#0A0A0A] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* ARBITRAGE STATUS BAR (CHANGEMENT RAPIDE DU STATUT) */}
              <div className="px-6 py-4 bg-[#FAFAFA] border-b border-[#F2F2F2] shrink-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#EC663B] block">
                      Arbitrage du Comité · Changer le Statut
                    </span>
                    <span className="text-xs text-[#6E6E73]">
                      Sélectionnez une décision pour actualiser le dossier et notifier le candidat.
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* EN ATTENTE */}
                    <button
                      type="button"
                      onClick={async () => {
                        await handleUpdateStatus(inspectingApp.id, "submitted");
                        setInspectingApp({ ...inspectingApp, status: "submitted" });
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        inspectingApp.status !== "selected" && inspectingApp.status !== "under_review" && inspectingApp.status !== "rejected"
                          ? "bg-[#0A0A0A] text-white shadow-sm ring-2 ring-[#0A0A0A]/20"
                          : "bg-white text-[#6E6E73] hover:bg-[#F2F2F2] border border-[#D1D1D6]"
                      }`}
                    >
                      <ClockIcon className="w-3.5 h-3.5" />
                      <span>En attente</span>
                    </button>

                    {/* DÉJÀ ANALYSÉ */}
                    <button
                      type="button"
                      onClick={async () => {
                        await handleUpdateStatus(inspectingApp.id, "under_review");
                        setInspectingApp({ ...inspectingApp, status: "under_review" });
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        inspectingApp.status === "under_review"
                          ? "bg-amber-600 text-white shadow-sm ring-2 ring-amber-500/20"
                          : "bg-white text-amber-700 hover:bg-amber-50 border border-amber-200"
                      }`}
                    >
                      <span>🔍 Déjà analysé</span>
                    </button>

                    {/* RETENIR DANS LE TOP 20 */}
                    <button
                      type="button"
                      onClick={async () => {
                        await handleUpdateStatus(inspectingApp.id, "selected");
                        setInspectingApp({ ...inspectingApp, status: "selected" });
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        inspectingApp.status === "selected"
                          ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/20"
                          : "bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200"
                      }`}
                    >
                      <CheckIcon className="w-3.5 h-3.5" />
                      <span>Retenir (Top 20)</span>
                    </button>

                    {/* REJETER */}
                    <button
                      type="button"
                      onClick={async () => {
                        await handleUpdateStatus(inspectingApp.id, "rejected");
                        setInspectingApp({ ...inspectingApp, status: "rejected" });
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        inspectingApp.status === "rejected"
                          ? "bg-rose-600 text-white shadow-sm ring-2 ring-rose-500/20"
                          : "bg-white text-rose-700 hover:bg-rose-50 border border-rose-200"
                      }`}
                    >
                      <span>✕ Rejeter</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* MODAL BODY (SCROLLABLE) */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
                {/* 1. FICHE COMPLETE ENTREPRISE */}
                <div className="bg-white rounded-2xl border border-[#EBEBEB] p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#F2F2F2] pb-3">
                    <h4 className="text-sm font-extrabold text-[#0A0A0A] font-tech uppercase tracking-wider flex items-center gap-2">
                      <UsersIcon className="w-4 h-4 text-[#EC663B]" />
                      <span>Détails & Informations de l'Entreprise</span>
                    </h4>
                    <span className="text-xs text-[#8E8E93] font-mono">
                      ID: {inspectingApp.id.slice(0, 8)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                      <span className="text-[#8E8E93] block text-[11px]">Dirigeant(e) :</span>
                      <strong className="text-sm text-[#0A0A0A] block mt-0.5">{inspectingApp.company?.leaderName || "-"}</strong>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                      <span className="text-[#8E8E93] block text-[11px]">Email de contact :</span>
                      <a href={`mailto:${inspectingApp.company?.email}`} className="text-sm font-bold text-[#0A0A0A] hover:text-[#EC663B] block mt-0.5 truncate">
                        {inspectingApp.company?.email || "-"}
                      </a>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                      <span className="text-[#8E8E93] block text-[11px]">Téléphone & WhatsApp :</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-mono font-bold text-[#0A0A0A]">{inspectingApp.company?.phone || "-"}</span>
                        {inspectingApp.company?.whatsapp && (
                          <a
                            href={`https://wa.me/${inspectingApp.company.whatsapp.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px] hover:bg-emerald-200 transition-colors"
                          >
                            WhatsApp ↗
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                      <span className="text-[#8E8E93] block text-[11px]">Ville principale d'activité :</span>
                      <strong className="text-sm text-[#0A0A0A] block mt-0.5">{inspectingApp.company?.city || "Non spécifiée"}</strong>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                      <span className="text-[#8E8E93] block text-[11px]">Secteur d'activité :</span>
                      <strong className="text-sm text-[#0A0A0A] block mt-0.5">{inspectingApp.company?.sector || "Général"}</strong>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                      <span className="text-[#8E8E93] block text-[11px]">Chiffre d'affaires mensuel moyen :</span>
                      <strong className="text-sm text-[#EC663B] block mt-0.5 font-mono">{inspectingApp.company?.monthlyRevenue || "Non précisé"}</strong>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                      <span className="text-[#8E8E93] block text-[11px]">Effectif & Année de création :</span>
                      <strong className="text-sm text-[#0A0A0A] block mt-0.5">
                        {inspectingApp.company?.employeesCount || "-"} • Créée en {inspectingApp.company?.yearCreated || "-"}
                      </strong>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                      <span className="text-[#8E8E93] block text-[11px]">Formalisation (RCCM / IFU) :</span>
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold mt-1 ${
                        inspectingApp.company?.isFormalized
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {inspectingApp.company?.isFormalized ? "✓ Formalisée (RCCM/IFU)" : "En cours de formalisation"}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                      <span className="text-[#8E8E93] block text-[11px]">Compte bancaire professionnel :</span>
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold mt-1 ${
                        inspectingApp.company?.hasProBankAccount
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {inspectingApp.company?.hasProBankAccount ? "✓ Compte pro actif" : "Non bancarisée"}
                      </span>
                    </div>
                  </div>

                  {/* Motivations & Obstacles if present */}
                  {(inspectingApp.company?.singleBiggestProblem || inspectingApp.company?.motivation) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#F2F2F2] text-xs">
                      {inspectingApp.company?.singleBiggestProblem && (
                        <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/60">
                          <span className="text-amber-800 font-bold block mb-1">Obstacle majeur déclaré :</span>
                          <p className="text-[#0A0A0A] italic">{inspectingApp.company.singleBiggestProblem}</p>
                        </div>
                      )}
                      {inspectingApp.company?.motivation && (
                        <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/60">
                          <span className="text-blue-800 font-bold block mb-1">Motivation pour le programme :</span>
                          <p className="text-[#0A0A0A] italic">{inspectingApp.company.motivation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 2. DIAGNOSTIC DE MATURITÉ (8 DIMENSIONS) */}
                <div className="bg-white rounded-2xl border border-[#EBEBEB] p-5 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2F2F2] pb-4">
                    <div>
                      <h4 className="text-sm font-extrabold text-[#0A0A0A] font-tech uppercase tracking-wider flex items-center gap-2">
                        <ShieldIcon className="w-4 h-4 text-[#EC663B]" />
                        <span>Diagnostic de Maturité & Audit 8 Dimensions</span>
                      </h4>
                      <p className="text-xs text-[#6E6E73] mt-0.5">
                        Évaluation multidimensionnelle calculée d'après les réponses du dirigeant.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPdfModalApp(inspectingApp)}
                      className="px-4 py-2 rounded-xl bg-[#0A0A0A] hover:bg-[#EC663B] text-white text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-sm"
                    >
                      <DownloadIcon className="w-3.5 h-3.5" />
                      <span>Rapport PDF Officiel</span>
                    </button>
                  </div>

                  {/* SCORE GLOBAL CARD */}
                  <div className="p-5 rounded-2xl bg-[#0A0A0A] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] text-[#9CA3AF] uppercase tracking-wider block font-bold">
                        Score Global de Maturité ALODO
                      </span>
                      <div className="flex items-baseline gap-3 mt-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#EC663B] font-tech">
                          {inspectingApp.diagnosticScore ?? "Non évalué"}
                        </span>
                        <span className="text-sm text-[#9CA3AF]">/ 100</span>
                        {typeof inspectingApp.diagnosticScore === "number" && (
                          <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            inspectingApp.diagnosticScore >= 60 ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          }`}>
                            {inspectingApp.diagnosticScore >= 60 ? "✓ Éligible au Top 20" : "Sous le seuil d'arbitrage"}
                          </span>
                        )}
                      </div>
                    </div>

                    {inspectingApp.diagnosticLevel && (
                      <div className="sm:text-right">
                        <span className="text-[10px] text-[#9CA3AF] uppercase tracking-wider block font-bold">Niveau Diagnostiqué</span>
                        <span className="px-3 py-1 rounded-xl bg-white/10 text-white font-extrabold text-xs mt-1 inline-block border border-white/20">
                          {inspectingApp.diagnosticLevel}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 8 DIMENSIONS GRID */}
                  <div>
                    <span className="text-xs font-bold text-[#0A0A0A] block mb-3">
                      Détail des 8 Dimensions Stratégiques :
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        { id: "formalisation", title: "1. Formalisation & RCCM", weight: `${weights.formalisation}%` },
                        { id: "finance", title: "2. Structure Financière", weight: `${weights.finance}%` },
                        { id: "comptabilite", title: "3. Comptabilité & Trésorerie", weight: `${weights.comptabilite}%` },
                        { id: "commercial", title: "4. Efficacité Commerciale", weight: `${weights.commercial}%` },
                        { id: "digitalisation", title: "5. Digitalisation & Outils", weight: `${weights.digitalisation}%` },
                        { id: "operations", title: "6. Process & Opérations", weight: `${weights.operations}%` },
                        { id: "rh", title: "7. Ressources Humaines", weight: `${weights.rh}%` },
                        { id: "financabilite", title: "8. Bancarisation & Crédit", weight: `${weights.financabilite}%` },
                      ].map((dimMeta) => {
                        const dimScoreObj = inspectingApp.diagnosticReport?.dimensionScores?.find(
                          (d: any) => d.dimensionId === dimMeta.id
                        );
                        const score = dimScoreObj ? dimScoreObj.score : (inspectingApp.diagnosticScore || 50);

                        return (
                          <div key={dimMeta.id} className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-[#8E8E93] font-bold">{dimMeta.weight}</span>
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
                            <span className="text-xs font-bold text-[#0A0A0A] block truncate">{dimMeta.title}</span>
                            <div className="w-full h-1.5 bg-[#EBEBEB] rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  score >= 70 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-rose-500"
                                }`}
                                style={{ width: `${score}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* STRENGTHS & WEAKNESSES IF REPORT AVAILABLE */}
                  {inspectingApp.diagnosticReport && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {inspectingApp.diagnosticReport.strengths?.length > 0 && (
                        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                          <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                            <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Forces Majeures Détectées</span>
                          </span>
                          <ul className="text-xs text-[#0A0A0A] space-y-1 list-disc list-inside">
                            {inspectingApp.diagnosticReport.strengths.slice(0, 3).map((s: string, idx: number) => (
                              <li key={idx}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {inspectingApp.diagnosticReport.weaknesses?.length > 0 && (
                        <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-2">
                          <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                            <span className="text-rose-600 font-bold">⚠</span>
                            <span>Points de Vulnérabilité Critique</span>
                          </span>
                          <ul className="text-xs text-[#0A0A0A] space-y-1 list-disc list-inside">
                            {inspectingApp.diagnosticReport.weaknesses.slice(0, 3).map((w: string, idx: number) => (
                              <li key={idx}>{w}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* MODAL FOOTER */}
              <div className="px-6 py-4 bg-[#FAFAFA] border-t border-[#F2F2F2] flex items-center justify-between shrink-0">
                <span className="text-xs text-[#6E6E73]">
                  Date de dépôt :{" "}
                  <strong className="text-[#0A0A0A]">
                    {inspectingApp.submittedAt ? new Date(inspectingApp.submittedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : "Date inconnue"}
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

      </div>

      {/* MODAL PDF CANDIDATURE (FOR ARBITRATION COMMITTEE) */}
      <DossierPdfDocument
        application={pdfModalApp}
        report={pdfModalApp?.diagnosticReport || null}
        isOpen={Boolean(pdfModalApp)}
        onClose={() => setPdfModalApp(null)}
      />
    </DashboardLayout>
  );
}
