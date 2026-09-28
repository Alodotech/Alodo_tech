"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/mpme/DashboardLayout";
import DossierPdfDocument from "@/components/mpme/DossierPdfDocument";
import { MpmeStorage } from "@/lib/mpme/storage";
import { Application, Cohort } from "@/lib/mpme/types";

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

  // Governor tabs: Light theme, harmonized with Dirigeant MPME Dashboard
  const [adminTab, setAdminTab] = useState<"registry" | "top20" | "diagnostics" | "settings">("registry");
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
  const [pdfModalApp, setPdfModalApp] = useState<Application | null>(null);

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

  const refreshData = () => {
    const c = MpmeStorage.getCohort();
    const apps = MpmeStorage.getApplications();
    setCohort(c);
    setApplications(apps);

    // Sync settings form
    setEditMaxCapacity(c.maxCapacity || 20);
    setEditStatus(c.status || "open");
    setEditMinScore(c.minScoreThreshold || 60);
    setEditCohortName(c.name || "Cohorte 1 — Bénin 2026");
    setEditOpeningDate(c.openedAt || "2026-09-01");
    setEditClosingDate(c.closingDate || "2026-10-31");
    setEditAnnouncementDate(c.announcementDate || "2026-11-15");
    setEditAnnouncement(c.announcementBanner || "Sélection officielle en cours : 20 MPME d'excellence seront retenues pour un accompagnement intensif.");
    setEditCriteriaNotes(c.selectionCriteriaNotes || "Critères prioritaires du comité : Formalisation RCCM/IFU, compte bancaire pro actif, score de maturité >= 60/100, potentiel de création d'emplois au Bénin.");

    if (selectedApp) {
      const refreshed = apps.find((a) => a.id === selectedApp.id) || null;
      setSelectedApp(refreshed);
    } else if (apps.length > 0) {
      setSelectedApp(apps[0]);
    }
  };

  useEffect(() => {
    setIsClient(true);
    refreshData();
  }, []);

  // Update Status Handler (Select in Top 20, Under Review, Reject)
  const handleUpdateStatus = (appId: string, status: Application["status"]) => {
    setStatusFeedback(null);
    const res = MpmeStorage.updateApplicationStatus(appId, status);
    if (!res.success) {
      setStatusFeedback({ msg: res.message || "Erreur lors de la mise à jour.", type: "error" });
    } else {
      const label =
        status === "selected"
          ? "Entreprise admise avec succès dans le Top 20 !"
          : status === "rejected"
          ? "Candidature classée sans suite (rejetée)."
          : status === "under_review"
          ? "Dossier placé en délibération."
          : "Statut mis à jour.";
      setStatusFeedback({ msg: label, type: "success" });
      refreshData();
    }
  };

  // Add Internal Jury Note
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !newNote.trim()) return;
    MpmeStorage.addInternalNote(selectedApp.id, newNote, "Germain DANDJI (CTO)");
    setNewNote("");
    refreshData();
  };

  // Save Governor Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    MpmeStorage.updateCohort({
      name: editCohortName,
      maxCapacity: Number(editMaxCapacity),
      status: editStatus,
      minScoreThreshold: Number(editMinScore),
      openedAt: editOpeningDate,
      closingDate: editClosingDate,
      announcementDate: editAnnouncementDate,
      announcementBanner: editAnnouncement,
      selectionCriteriaNotes: editCriteriaNotes,
    });
    setStatusFeedback({
      msg: "Tous les paramètres de gouvernance ont été appliqués en direct sur la plateforme !",
      type: "success",
    });
    refreshData();
  };

  // Reset Demo Data
  const handleResetDemo = () => {
    if (confirm("Réinitialiser l'ensemble des données de test du programme ALODO MPME ?")) {
      MpmeStorage.resetDemoData();
      refreshData();
      setStatusFeedback({ msg: "Données de démonstration réinitialisées avec succès.", type: "success" });
    }
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

    const rows = sortedForExport.map((a, index) => [
      a.id,
      index + 1,
      `"${a.company.name.replace(/"/g, '""')}"`,
      `"${a.company.leaderName.replace(/"/g, '""')}"`,
      a.company.email,
      a.company.phone,
      a.company.whatsapp || a.company.phone,
      `"${a.company.city.replace(/"/g, '""')}"`,
      `"${a.company.sector.replace(/"/g, '""')}"`,
      a.status === "selected" ? "RETENUE_TOP_20" : a.status,
      a.diagnosticScore || "N/A",
      a.diagnosticLevel || "N/A",
      a.company.isFormalized ? "OUI" : "NON",
      a.company.hasProBankAccount ? "OUI" : "NON",
      `"${a.company.employeesCount}"`,
      `"${a.company.monthlyRevenue}"`,
      new Date(a.submittedAt).toLocaleDateString("fr-FR"),
      `"${(a.company.singleBiggestProblem || "").replace(/"/g, '""')}"`,
    ]);

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

  if (!isClient) return null;

  return (
    <DashboardLayout activeTab="admin">
      <div className="space-y-6 animate-in fade-in duration-150">

        {/* =========================================================================
            1. EXECUTIVE COMMAND HEADER (LIGHT THEME IDENTICAL TO CANDIDATE DASHBOARD)
            Harmonized palette: Clean white card, subtle borders, orange & teal accents
            Strictly NO "+ Nouvelle Candidature" button (Admin is Governor, not applicant)
            ========================================================================= */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#F2F2F2]">
            <div>
              <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-[#EC663B]/10 text-[#EC663B] border border-[#EC663B]/20 text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <ShieldIcon className="w-3.5 h-3.5 text-[#EC663B]" />
                  Console Gouverneur ALODO TECH
                </span>
                <span className="text-xs text-[#8E8E93]">•</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Cohorte 1 Active (Quota : {maxCapacity} Places)
                </span>
                <span className="text-xs text-[#8E8E93]">•</span>
                <span className="text-xs text-[#6E6E73] font-medium">
                  Arbitrage : Germain DANDJI (CTO)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight font-tech">
                Pilotage National du Programme ALODO MPME
              </h1>
              <p className="text-xs sm:text-sm text-[#6E6E73] mt-1 max-w-2xl leading-relaxed">
                Supervision souveraine des candidatures, examen approfondi des diagnostics de maturité (8 dimensions stratégiques) et arbitrage des 20 entreprises retenues.
              </p>
            </div>

            {/* Governor Action Suite (Clean Light Buttons) */}
            <div className="flex items-center gap-3 flex-wrap">

              <button
                type="button"
                onClick={() => setAdminTab("settings")}
                className="px-4 py-2.5 bg-[#EC663B] hover:bg-[#d4562e] rounded-full text-xs font-bold text-white transition-all shadow-md shadow-[#EC663B]/20 flex items-center gap-2 cursor-pointer"
                title="Accéder aux paramètres complets du programme"
              >
                <SettingsIcon className="w-4 h-4" />
                <span>Paramètres Gouverneur</span>
              </button>
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
        <div className="flex items-center justify-between border-b border-[#EBEBEB] pb-1 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAdminTab("registry")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                adminTab === "registry"
                  ? "bg-[#EC663B]/10 text-[#EC663B] border border-[#EC663B]/20 shadow-xs"
                  : "bg-white text-[#6E6E73] hover:text-[#0A0A0A] border border-[#EBEBEB]"
              }`}
            >
              <LayersIcon className="w-4 h-4" />
              <span>Registre & Instruction ({totalCount})</span>
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

            <button
              type="button"
              onClick={() => setAdminTab("diagnostics")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                adminTab === "diagnostics"
                  ? "bg-[#EC663B]/10 text-[#EC663B] border border-[#EC663B]/20 shadow-xs"
                  : "bg-white text-[#6E6E73] hover:text-[#0A0A0A] border border-[#EBEBEB]"
              }`}
            >
              <BarChartIcon className="w-4 h-4" />
              <span>Matrice Diagnostics 8D</span>
            </button>

            <button
              type="button"
              onClick={() => setAdminTab("settings")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                adminTab === "settings"
                  ? "bg-[#EC663B] text-white shadow-md shadow-[#EC663B]/20"
                  : "bg-white text-[#6E6E73] hover:text-[#0A0A0A] border border-[#EBEBEB]"
              }`}
            >
              <SettingsIcon className="w-4 h-4" />
              <span>Paramètres Gouverneur</span>
            </button>
          </div>

          {/* Toggle View Mode for Registry (Split vs Table) */}
          {adminTab === "registry" && (
            <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#EBEBEB] text-xs shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode("split")}
                className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === "split" ? "bg-[#0A0A0A] text-white" : "text-[#6E6E73] hover:text-[#0A0A0A]"
                }`}
              >
                <LayersIcon className="w-3.5 h-3.5" />
                <span>Vue Fiches (Cockpit)</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === "table" ? "bg-[#0A0A0A] text-white" : "text-[#6E6E73] hover:text-[#0A0A0A]"
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Vue Grand Tableau</span>
              </button>
            </div>
          )}
        </div>

        {/* =========================================================================
            TAB 1: REGISTRE DES CANDIDATURES
            ========================================================================= */}
        {adminTab === "registry" && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="bg-white p-5 rounded-3xl border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
                  <input
                    type="text"
                    placeholder="Recherche par entreprise, dirigeant, ville, secteur, email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FAFAFA] border border-[#EBEBEB] text-xs text-[#0A0A0A] placeholder-[#8E8E93] focus:outline-none focus:border-[#EC663B] transition-colors"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8E8E93] hover:text-[#0A0A0A]"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#8E8E93] font-medium whitespace-nowrap">Trier par :</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-semibold text-[#0A0A0A] focus:outline-none focus:border-[#EC663B]"
                  >
                    <option value="score_desc">Score de Maturité (Décroissant)</option>
                    <option value="date_desc">Date de Dépôt (Récente)</option>
                    <option value="name_asc">Nom d'Entreprise (A-Z)</option>
                  </select>
                </div>
              </div>

              {/* Multi Filters Row */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-[#F2F2F2]">
                {/* Status Filter Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: "all", label: `Toutes (${totalCount})` },
                    { id: "selected", label: `Top 20 Retenues (${selectedCount})` },
                    { id: "diagnostic_completed", label: `Diags reçus (${diagnosticDoneCount})` },
                    { id: "under_review", label: `En délibération (${underReviewCount})` },
                    { id: "rejected", label: `Non retenues (${rejectedCount})` },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFilterStatus(f.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        filterStatus === f.id
                          ? "bg-[#0A0A0A] text-white shadow-xs"
                          : "bg-[#FAFAFA] hover:bg-[#F2F2F2] text-[#6E6E73] border border-[#EBEBEB]"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Secondary Filters */}
                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={filterFormalized}
                    onChange={(e) => setFilterFormalized(e.target.value)}
                    className="px-2.5 py-1.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-medium text-[#6E6E73]"
                  >
                    <option value="all">Formalisation : Toutes</option>
                    <option value="yes">RCCM/IFU Validé</option>
                    <option value="no">Non formalisé</option>
                  </select>

                  <select
                    value={filterCity}
                    onChange={(e) => setFilterCity(e.target.value)}
                    className="px-2.5 py-1.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-medium text-[#6E6E73]"
                  >
                    <option value="all">Villes : Tout le Bénin</option>
                    <option value="cotonou">Cotonou</option>
                    <option value="calavi">Abomey-Calavi</option>
                    <option value="porto-novo">Porto-Novo</option>
                    <option value="parakou">Parakou</option>
                  </select>
                </div>
              </div>
            </div>

            {/* MODE 1: SPLIT VIEW (LIST + INSPECTOR) */}
            {viewMode === "split" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Applications list (7 cols) */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EBEBEB] shadow-sm overflow-hidden flex flex-col">
                  <div className="p-4 sm:p-5 border-b border-[#EBEBEB] bg-[#FAFAFA] flex items-center justify-between">
                    <div>
                      <h2 className="font-bold text-sm text-[#0A0A0A]">
                        Dossiers de Candidature ({filteredApps.length})
                      </h2>
                      <span className="text-[11px] text-[#6E6E73]">
                        Cliquez sur un dossier pour ouvrir la fiche d'arbitrage
                      </span>
                    </div>
                    <span className="text-xs text-[#8E8E93] font-mono">
                      {filteredApps.length} résultat{filteredApps.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="divide-y divide-[#F2F2F2] overflow-y-auto max-h-[800px]">
                    {filteredApps.length === 0 ? (
                      <div className="p-12 text-center text-[#8E8E93] text-xs space-y-2">
                        <SearchIcon className="w-6 h-6 mx-auto text-slate-300" />
                        <p className="font-bold text-[#0A0A0A]">Aucun dossier correspondant</p>
                        <p className="text-[11px]">Modifiez votre recherche ou réinitialisez les filtres.</p>
                      </div>
                    ) : (
                      filteredApps.map((app) => {
                        const isSelected = selectedApp?.id === app.id;
                        const isTop20 = app.status === "selected";
                        const hasScore = typeof app.diagnosticScore === "number";

                        return (
                          <div
                            key={app.id}
                            onClick={() => setSelectedApp(app)}
                            className={`p-5 cursor-pointer transition-all hover:bg-[#FAFAFA] ${
                              isSelected
                                ? "bg-orange-50/50 border-l-4 border-l-[#EC663B]"
                                : "border-l-4 border-l-transparent"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-extrabold text-sm text-[#0A0A0A]">
                                    {app.company.name}
                                  </h3>
                                  {isTop20 && (
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                      Admise Top 20 ✓
                                    </span>
                                  )}
                                  {app.status === "under_review" && (
                                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold">
                                      En délibération
                                    </span>
                                  )}
                                  {app.status === "rejected" && (
                                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-semibold">
                                      Non retenue
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73] mt-1 flex-wrap">
                                  <span className="flex items-center gap-1">
                                    <UserIcon className="w-3 h-3 text-[#8E8E93]" />
                                    {app.company.leaderName}
                                  </span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <MapPinIcon className="w-3 h-3 text-[#8E8E93]" />
                                    {app.company.city}
                                  </span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <BriefcaseIcon className="w-3 h-3 text-[#8E8E93]" />
                                    {app.company.sector}
                                  </span>
                                </div>
                              </div>

                              {/* Maturity Score badge */}
                              {hasScore ? (
                                <div className="text-right shrink-0">
                                  <div
                                    className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold ${
                                      (app.diagnosticScore || 0) >= 70
                                        ? "bg-emerald-100 text-emerald-800"
                                        : (app.diagnosticScore || 0) >= 50
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-rose-100 text-rose-800"
                                    }`}
                                  >
                                    {app.diagnosticScore}/100
                                  </div>
                                  <span className="text-[10px] text-[#8E8E93] block mt-0.5 font-medium">
                                    {app.diagnosticLevel || "Maturité 8D"}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-[11px] text-[#8E8E93] font-medium bg-[#F2F2F2] px-2 py-1 rounded-lg shrink-0">
                                  Diag. en attente
                                </span>
                              )}
                            </div>

                            {/* Priority Problem Quote */}
                            {app.company.singleBiggestProblem && (
                              <p className="text-xs text-[#6E6E73] italic line-clamp-1 bg-[#FAFAFA] p-2 rounded-lg border border-[#F2F2F2] my-2">
                                "{app.company.singleBiggestProblem}"
                              </p>
                            )}

                            {/* Tags footer */}
                            <div className="flex items-center justify-between text-[11px] text-[#8E8E93] pt-2 border-t border-[#F7F7F7]">
                              <div className="flex items-center gap-2">
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                  app.company.isFormalized ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-500"
                                }`}>
                                  RCCM: {app.company.isFormalized ? "OUI" : "NON"}
                                </span>
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                  app.company.hasProBankAccount ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-500"
                                }`}>
                                  Banque: {app.company.hasProBankAccount ? "OUI" : "NON"}
                                </span>
                              </div>
                              <span>
                                Reçu le {new Date(app.submittedAt).toLocaleDateString("fr-FR")}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Inspector Panel (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  {selectedApp ? (
                    <div className="bg-white rounded-3xl border border-[#EBEBEB] p-6 shadow-sm space-y-6">
                      {/* Top Header of Candidate */}
                      <div className="pb-4 border-b border-[#F2F2F2] flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#EC663B] block">
                            Fiche d'Arbitrage Officielle
                          </span>
                          <h2 className="text-xl font-extrabold text-[#0A0A0A] mt-1 font-tech">
                            {selectedApp.company.name}
                          </h2>
                          <p className="text-xs text-[#6E6E73]">
                            Dirigée par <span className="font-semibold text-[#0A0A0A]">{selectedApp.company.leaderName}</span>
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setPdfModalApp(selectedApp)}
                          className="px-3 py-1.5 bg-white hover:bg-[#FAFAFA] border border-[#D1D1D6] rounded-full text-xs font-bold text-[#0A0A0A] flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
                          title="Télécharger le dossier officiel en PDF"
                        >
                          <DownloadIcon className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>
                      </div>

                      {/* ARBITRATION ACTION BAR */}
                      <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#0A0A0A] uppercase tracking-wider text-[10px]">
                            Décision d'Admission (Cohorte 1) :
                          </span>
                          <span className="text-[#8E8E93] text-[11px]">
                            Quota : {selectedCount} / {maxCapacity}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(selectedApp.id, "selected")}
                            disabled={selectedApp.status === "selected"}
                            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                              selectedApp.status === "selected"
                                ? "bg-emerald-600 text-white cursor-default shadow-xs"
                                : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
                            }`}
                          >
                            <CheckIcon className="w-3.5 h-3.5" />
                            <span>Retenir Top 20</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(selectedApp.id, "under_review")}
                            disabled={selectedApp.status === "under_review"}
                            className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                              selectedApp.status === "under_review"
                                ? "bg-blue-600 text-white cursor-default shadow-xs"
                                : "bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200"
                            }`}
                          >
                            <ClockIcon className="w-3.5 h-3.5" />
                            <span>En Délibération</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(selectedApp.id, "rejected")}
                            disabled={selectedApp.status === "rejected"}
                            className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                              selectedApp.status === "rejected"
                                ? "bg-rose-600 text-white cursor-default shadow-xs"
                                : "bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200"
                            }`}
                          >
                            <span>✕ Rejeter</span>
                          </button>
                        </div>
                      </div>

                      {/* Direct Candidate Contact via WhatsApp */}
                      <div className="p-3.5 rounded-2xl bg-white border border-[#EBEBEB] space-y-2">
                        <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">
                          Contact Direct Dirigeant
                        </span>
                        <div className="flex items-center justify-between gap-3 text-xs">
                          <div>
                            <span className="font-semibold text-[#0A0A0A] block">{selectedApp.company.phone}</span>
                            <span className="text-[#8E8E93] text-[11px]">{selectedApp.company.email}</span>
                          </div>

                          <a
                            href={`https://wa.me/${(selectedApp.company.whatsapp || selectedApp.company.phone).replace(/\D/g, "")}?text=${encodeURIComponent(
                              `Bonjour ${selectedApp.company.leaderName}, nous vous contactons depuis la Direction d'ALODO TECH au sujet de votre candidature au programme d'accompagnement MPME (${selectedApp.company.name}).`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                            title="Ouvrir WhatsApp directement avec le dirigeant"
                          >
                            <MessageCircleIcon className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>

                      {/* Diagnostic 8D Score Details */}
                      <div className="p-4 rounded-2xl bg-white border border-[#EBEBEB] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider text-[10px]">
                            Maturité Diagnostique (8 Dimensions)
                          </span>
                          <span className="text-xs font-mono font-bold text-[#EC663B]">
                            {selectedApp.diagnosticScore ? `${selectedApp.diagnosticScore}/100` : "Non réalisé"}
                          </span>
                        </div>

                        {selectedApp.diagnosticReport?.dimensionScores ? (
                          <div className="space-y-2 pt-1">
                            {selectedApp.diagnosticReport.dimensionScores.map((dim) => (
                              <div key={dim.dimensionId} className="space-y-1">
                                <div className="flex justify-between text-[11px]">
                                  <span className="text-[#6E6E73]">{dim.title}</span>
                                  <span className="font-mono font-bold text-[#0A0A0A]">{dim.score}/100</span>
                                </div>
                                <div className="w-full h-1.5 bg-[#F2F2F2] rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      dim.score >= 70 ? "bg-emerald-500" : dim.score >= 50 ? "bg-[#EC663B]" : "bg-amber-500"
                                    }`}
                                    style={{ width: `${dim.score}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-[#8E8E93] italic">
                            Le diagnostic complet n'a pas encore été finalisé par cette entreprise.
                          </p>
                        )}
                      </div>

                      {/* Economic & Legal Metrics */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-[#FAFAFA] rounded-2xl border border-[#F2F2F2]">
                          <span className="text-[10px] text-[#8E8E93] block">Formalisation RCCM</span>
                          <span className="font-bold text-[#0A0A0A]">
                            {selectedApp.company.isFormalized ? "Validé (RCCM/IFU)" : "Non formalisé"}
                          </span>
                        </div>
                        <div className="p-3 bg-[#FAFAFA] rounded-2xl border border-[#F2F2F2]">
                          <span className="text-[10px] text-[#8E8E93] block">Compte Bancaire Pro</span>
                          <span className="font-bold text-[#0A0A0A]">
                            {selectedApp.company.hasProBankAccount ? "Actif & Séparé" : "Non bancarisé"}
                          </span>
                        </div>
                        <div className="p-3 bg-[#FAFAFA] rounded-2xl border border-[#F2F2F2]">
                          <span className="text-[10px] text-[#8E8E93] block">Chiffre d'Affaires</span>
                          <span className="font-bold text-[#0A0A0A]">{selectedApp.company.monthlyRevenue}</span>
                        </div>
                        <div className="p-3 bg-[#FAFAFA] rounded-2xl border border-[#F2F2F2]">
                          <span className="text-[10px] text-[#8E8E93] block">Effectif Salarié</span>
                          <span className="font-bold text-[#0A0A0A]">{selectedApp.company.employeesCount}</span>
                        </div>
                      </div>

                      {/* Problem Statement */}
                      {selectedApp.company.singleBiggestProblem && (
                        <div className="p-3.5 rounded-2xl bg-orange-50/40 border border-orange-100">
                          <span className="text-[10px] font-bold text-[#EC663B] uppercase tracking-wider block mb-1">
                            Problématique n°1 Exprimée par le Dirigeant
                          </span>
                          <p className="text-xs text-[#0A0A0A] italic leading-relaxed">
                            "{selectedApp.company.singleBiggestProblem}"
                          </p>
                        </div>
                      )}

                      {/* Confidential Jury Notes */}
                      <div className="space-y-3 pt-2 border-t border-[#F2F2F2]">
                        <span className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider text-[10px] block">
                          Notes Confidentielles du Jury ({selectedApp.internalNotes?.length || 0})
                        </span>

                        <div className="space-y-2 max-h-36 overflow-y-auto">
                          {selectedApp.internalNotes && selectedApp.internalNotes.length > 0 ? (
                            selectedApp.internalNotes.map((note) => (
                              <div key={note.id} className="p-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs">
                                <div className="flex items-center justify-between text-[10px] text-[#8E8E93] mb-1">
                                  <span className="font-bold text-[#0A0A0A]">{note.author}</span>
                                  <span>{new Date(note.createdAt).toLocaleDateString("fr-FR")}</span>
                                </div>
                                <p className="text-[#3A3A3C]">{note.content}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-[#8E8E93] italic">Aucune note interne saisie pour le moment.</p>
                          )}
                        </div>

                        <form onSubmit={handleAddNote} className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Ajouter une observation d'évaluation..."
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            className="flex-1 px-3 py-2 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs text-[#0A0A0A] placeholder-[#8E8E93] focus:outline-none focus:border-[#EC663B]"
                          />
                          <button
                            type="submit"
                            disabled={!newNote.trim()}
                            className="px-3.5 py-2 rounded-xl bg-[#0A0A0A] hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold transition-colors cursor-pointer"
                          >
                            Ajouter
                          </button>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl border border-[#EBEBEB] p-12 text-center text-[#8E8E93] text-xs">
                      Sélectionnez un dossier à gauche pour afficher l'instruction complète.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* MODE 2: FULL MASTER TABLE */}
            {viewMode === "table" && (
              <div className="bg-white rounded-3xl border border-[#EBEBEB] shadow-sm overflow-hidden">
                <div className="p-5 border-b border-[#EBEBEB] bg-[#FAFAFA] flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-sm text-[#0A0A0A]">
                      Grand Registre des Candidatures ({filteredApps.length})
                    </h2>
                    <span className="text-[11px] text-[#6E6E73]">
                      Vue tabulaire complète pour l'examen de synthèse
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8F9FA] text-[#6E6E73] font-semibold uppercase text-[10px] tracking-wider border-b border-[#EBEBEB]">
                      <tr>
                        <th className="p-4">Entreprise & Dirigeant</th>
                        <th className="p-4">Localisation & Secteur</th>
                        <th className="p-4">RCCM / IFU</th>
                        <th className="p-4">Score 8D</th>
                        <th className="p-4">Statut Actuel</th>
                        <th className="p-4 text-right">Arbitrage Rapide</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F2F2]">
                      {filteredApps.map((app) => (
                        <tr key={app.id} className="hover:bg-[#FAFAFA] transition-colors">
                          <td className="p-4">
                            <div className="font-extrabold text-sm text-[#0A0A0A]">{app.company.name}</div>
                            <div className="text-xs text-[#6E6E73]">{app.company.leaderName}</div>
                            <div className="text-[11px] text-[#8E8E93] font-mono">{app.company.phone}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-[#0A0A0A]">{app.company.city}</div>
                            <div className="text-xs text-[#6E6E73]">{app.company.sector}</div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              app.company.isFormalized ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-600"
                            }`}>
                              {app.company.isFormalized ? "Formalisé" : "Non formalisé"}
                            </span>
                          </td>
                          <td className="p-4">
                            {typeof app.diagnosticScore === "number" ? (
                              <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-xl bg-[#0A0A0A] text-white">
                                {app.diagnosticScore}/100
                              </span>
                            ) : (
                              <span className="text-[#8E8E93] text-[11px]">En attente</span>
                            )}
                          </td>
                          <td className="p-4">
                            {app.status === "selected" && (
                              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                                Retenue Top 20
                              </span>
                            )}
                            {app.status === "under_review" && (
                              <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold text-[10px]">
                                En délibération
                              </span>
                            )}
                            {app.status === "rejected" && (
                              <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-semibold text-[10px]">
                                Rejetée
                              </span>
                            )}
                            {app.status !== "selected" && app.status !== "under_review" && app.status !== "rejected" && (
                              <span className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 font-semibold text-[10px]">
                                Dossier Reçu
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => handleUpdateStatus(app.id, "selected")}
                              disabled={app.status === "selected"}
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold cursor-pointer disabled:opacity-40"
                              title="Admettre dans le Top 20"
                            >
                              Top 20
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateStatus(app.id, "under_review")}
                              className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 text-xs font-semibold cursor-pointer"
                              title="Mettre en délibération"
                            >
                              Étude
                            </button>
                            <button
                              type="button"
                              onClick={() => setPdfModalApp(app)}
                              className="px-2 py-1 rounded-lg bg-white border border-[#D1D1D6] text-xs font-bold hover:bg-[#F2F2F2] cursor-pointer"
                              title="Voir PDF"
                            >
                              PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

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
                          onClick={() => setAdminTab("registry")}
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
            TAB 3: MATRICE DIAGNOSTICS & 8 DIMENSIONS
            ========================================================================= */}
        {adminTab === "diagnostics" && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm">
              <span className="text-xs uppercase tracking-widest font-bold text-[#EC663B] block mb-1">
                Audits de Maturité Opérationnelle & Financière
              </span>
              <h2 className="text-2xl font-extrabold text-[#0A0A0A] font-tech">
                Analyse Transversale des 8 Dimensions Stratégiques
              </h2>
              <p className="text-xs text-[#6E6E73] mt-1 max-w-2xl leading-relaxed">
                Cartographie des points forts et faiblesses structurelles des MPME candidates au Bénin pour orienter les programmes de renforcement des capacités.
              </p>
            </div>

            {/* 8 Dimensions Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "1. Formalisation & RCCM", weight: `${weights.formalisation}%`, score: 72, desc: "RCCM, IFU, conformité légale et statuts d'entreprise" },
                { title: "2. Structure Financière", weight: `${weights.finance}%`, score: 58, desc: "Bilan comptable, séparation patrimoine dirigeant et entreprise" },
                { title: "3. Comptabilité & Trésorerie", weight: `${weights.comptabilite}%`, score: 52, desc: "Prévisionnel de cash, suivi des créances et encaissements" },
                { title: "4. Efficacité Commerciale", weight: `${weights.commercial}%`, score: 68, desc: "Acquisition clients, structuration des prix et marges brutes" },
                { title: "5. Digitalisation & Outils", weight: `${weights.digitalisation}%`, score: 48, desc: "ERP, facturation électronique, CRM et présence digitale" },
                { title: "6. Process & Opérations", weight: `${weights.operations}%`, score: 64, desc: "Standardisation, gestion des stocks et délais de livraison" },
                { title: "7. Ressources Humaines", weight: `${weights.rh}%`, score: 60, desc: "Fiches de poste, contrats formels et politiques de primes" },
                { title: "8. Bancarisation & Finançabilité", weight: `${weights.financabilite}%`, score: 55, desc: "Compte pro actif, relations bancaires et éligibilité crédit" },
              ].map((dim, i) => (
                <div key={i} className="p-5 rounded-3xl bg-white border border-[#EBEBEB] shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#8E8E93]">Pondération {dim.weight}</span>
                    <span className="px-2 py-0.5 rounded-lg bg-[#0A0A0A] text-white font-mono font-bold text-xs">
                      {dim.score}/100
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-[#0A0A0A] font-tech">{dim.title}</h3>
                  <p className="text-[11px] text-[#6E6E73] leading-relaxed">{dim.desc}</p>

                  <div className="w-full h-2 bg-[#F2F2F2] rounded-full overflow-hidden mt-2">
                    <div
                      className={`h-full rounded-full ${
                        dim.score >= 70 ? "bg-emerald-500" : dim.score >= 55 ? "bg-[#EC663B]" : "bg-amber-500"
                      }`}
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Strategic Insights Box (Light theme with brand border) */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm space-y-4">
              <h3 className="text-base font-bold font-tech text-[#0A0A0A] flex items-center gap-2">
                <ShieldIcon className="w-4 h-4 text-[#EC663B]" />
                <span>Enseignements Clés du Comité pour la Cohorte 1</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#6E6E73]">
                <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] space-y-1">
                  <span className="text-emerald-700 font-bold block">Point Fort Majeur :</span>
                  <p>Forte dynamique commerciale et ancrage territorial solide au Bénin (Cotonou et Abomey-Calavi en tête).</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] space-y-1">
                  <span className="text-rose-600 font-bold block">Vulnérabilité Critique :</span>
                  <p>Faible digitalisation des processus comptables et confusion fréquente entre trésorerie personnelle et pro.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] space-y-1">
                  <span className="text-[#EC663B] font-bold block">Levier d'Accompagnement :</span>
                  <p>Mise en place en priorité de tableaux de bord financiers simples à 90 jours pour préparer l'accès au financement bancaire.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: PARAMÈTRES DU GOUVERNEUR (COMPRÉHENSIF AVEC BEAUCOUP DE PARAMÈTRES)
            "c'est eux le gouverneur de tout le site"
            ========================================================================= */}
        {adminTab === "settings" && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-[#EC663B] block mb-1">
                    Centre de Contrôle Souverain
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] font-tech">
                    Paramètres de Gouvernance du Programme ALODO MPME
                  </h2>
                  <p className="text-xs text-[#6E6E73] mt-1 max-w-2xl leading-relaxed">
                    Régulez l'ensemble du cycle de vie du programme : quotas d'admission, dates du calendrier national, pondérations des 8 dimensions, bannières du site et directives d'arbitrage.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    Mode Gouverneur Actif
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* Box 1: Quotas & Capacité de la Cohorte */}
              <div className="bg-white p-6 rounded-3xl border border-[#EBEBEB] shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-[#F2F2F2] pb-3">
                  <h3 className="font-extrabold text-sm text-[#0A0A0A] flex items-center gap-2">
                    <AwardIcon className="w-4 h-4 text-emerald-600" />
                    <span>1. Quotas d'Admission & Statut Opérationnel de la Cohorte</span>
                  </h3>
                  <span className="text-xs text-[#8E8E93]">Cohorte active : {cohort?.id || "cohort-1"}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#0A0A0A] block mb-1">
                      Nom Officiel de la Promotion
                    </label>
                    <input
                      type="text"
                      value={editCohortName}
                      onChange={(e) => setEditCohortName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-bold text-[#0A0A0A] focus:outline-none focus:border-[#EC663B]"
                    />
                    <span className="text-[11px] text-[#8E8E93] mt-1 block">
                      Affiché sur les certificats et les rapports
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0A0A0A] block mb-1">
                      Capacité Maximale de Sélection (Places)
                    </label>
                    <input
                      type="number"
                      min={5}
                      max={100}
                      value={editMaxCapacity}
                      onChange={(e) => setEditMaxCapacity(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-bold text-[#0A0A0A] focus:outline-none focus:border-[#EC663B]"
                    />
                    <span className="text-[11px] text-[#8E8E93] mt-1 block">
                      Défaut officiel : 20 places retenues
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0A0A0A] block mb-1">
                      Statut Opérationnel du Programme
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-bold text-[#0A0A0A] focus:outline-none focus:border-[#EC663B]"
                    >
                      <option value="open">Candidatures Ouvertes (Actif)</option>
                      <option value="deliberation">En Délibération du Jury</option>
                      <option value="closed">Clôturé / Sélection Finalisée</option>
                      <option value="archived">Archivé</option>
                    </select>
                    <span className="text-[11px] text-[#8E8E93] mt-1 block">
                      Pilote le comportement du formulaire candidat
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-bold text-[#0A0A0A] block mb-1">
                      Seuil Minimal de Maturité (Score /100)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={editMinScore}
                      onChange={(e) => setEditMinScore(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-bold text-[#0A0A0A] focus:outline-none focus:border-[#EC663B]"
                    />
                    <span className="text-[11px] text-[#8E8E93] mt-1 block">
                      Score minimum requis pour être admissible au Top 20
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0A0A0A] block mb-1">
                      Mode d'Arbitrage du Comité
                    </label>
                    <select
                      value={editArbitrationMode}
                      onChange={(e) => setEditArbitrationMode(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-bold text-[#0A0A0A] focus:outline-none focus:border-[#EC663B]"
                    >
                      <option value="collegial">Décision Collégiale (Comité ALODO)</option>
                      <option value="cto_validation">Validation Finale par le CTO</option>
                      <option value="auto_score">Pré-qualification par Score</option>
                    </select>
                    <span className="text-[11px] text-[#8E8E93] mt-1 block">
                      Processus décisionnel du jury
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0A0A0A] block mb-1">
                      Notification Automatique des Lauréats
                    </label>
                    <select
                      value={editAutoNotify ? "yes" : "no"}
                      onChange={(e) => setEditAutoNotify(e.target.value === "yes")}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-bold text-[#0A0A0A] focus:outline-none focus:border-[#EC663B]"
                    >
                      <option value="yes">Activée (Email & WhatsApp direct)</option>
                      <option value="no">Désactivée (Notification manuelle)</option>
                    </select>
                    <span className="text-[11px] text-[#8E8E93] mt-1 block">
                      Envoi d'un message lors du passage dans le Top 20
                    </span>
                  </div>
                </div>
              </div>

              {/* Box 2: Calendrier National & Échéances Clés */}
              <div className="bg-white p-6 rounded-3xl border border-[#EBEBEB] shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-[#F2F2F2] pb-3">
                  <h3 className="font-extrabold text-sm text-[#0A0A0A] flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-[#EC663B]" />
                    <span>2. Calendrier National & Jalons du Programme</span>
                  </h3>
                  <span className="text-xs text-[#8E8E93]">Calendrier officiel Bénin 2026</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#0A0A0A] block mb-1">
                      Date d'Ouverture des Dépôts
                    </label>
                    <input
                      type="date"
                      value={editOpeningDate}
                      onChange={(e) => setEditOpeningDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-medium text-[#0A0A0A] focus:outline-none focus:border-[#EC663B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0A0A0A] block mb-1">
                      Date Limite de Clôture
                    </label>
                    <input
                      type="date"
                      value={editClosingDate}
                      onChange={(e) => setEditClosingDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-medium text-[#0A0A0A] focus:outline-none focus:border-[#EC663B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0A0A0A] block mb-1">
                      Date Proclamation Top 20
                    </label>
                    <input
                      type="date"
                      value={editAnnouncementDate}
                      onChange={(e) => setEditAnnouncementDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-medium text-[#0A0A0A] focus:outline-none focus:border-[#EC663B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0A0A0A] block mb-1">
                      Démarrage Accompagnement
                    </label>
                    <input
                      type="date"
                      value={editBootcampDate}
                      onChange={(e) => setEditBootcampDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-medium text-[#0A0A0A] focus:outline-none focus:border-[#EC663B]"
                    />
                  </div>
                </div>
              </div>

              {/* Box 3: Pondération Stratégique des 8 Dimensions */}
              <div className="bg-white p-6 rounded-3xl border border-[#EBEBEB] shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-[#F2F2F2] pb-3">
                  <h3 className="font-extrabold text-sm text-[#0A0A0A] flex items-center gap-2">
                    <BarChartIcon className="w-4 h-4 text-indigo-600" />
                    <span>3. Pondérations Stratégiques des 8 Dimensions (Total = 100%)</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-emerald-600">
                    Total : {Object.values(weights).reduce((a, b) => a + b, 0)}%
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { key: "formalisation", label: "Formalisation & RCCM", value: weights.formalisation },
                    { key: "finance", label: "Structure Financière", value: weights.finance },
                    { key: "comptabilite", label: "Comptabilité & Trésorerie", value: weights.comptabilite },
                    { key: "commercial", label: "Efficacité Commerciale", value: weights.commercial },
                    { key: "digitalisation", label: "Digitalisation & Tech", value: weights.digitalisation },
                    { key: "operations", label: "Process & Opérations", value: weights.operations },
                    { key: "rh", label: "Ressources Humaines", value: weights.rh },
                    { key: "financabilite", label: "Bancarisation & Financement", value: weights.financabilite },
                  ].map((item) => (
                    <div key={item.key} className="p-3.5 bg-[#FAFAFA] rounded-2xl border border-[#EBEBEB] space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-[#0A0A0A] text-[11px] truncate">{item.label}</span>
                        <span className="font-mono font-bold text-[#EC663B]">{item.value}%</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={30}
                        step={1}
                        value={item.value}
                        onChange={(e) =>
                          setWeights({ ...weights, [item.key]: Number(e.target.value) })
                        }
                        className="w-full accent-[#EC663B] cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 4: Communication Officielle & Bannières du Portail */}
              <div className="bg-white p-6 rounded-3xl border border-[#EBEBEB] shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-[#F2F2F2] pb-3">
                  <h3 className="font-extrabold text-sm text-[#0A0A0A] flex items-center gap-2">
                    <ShieldIcon className="w-4 h-4 text-[#EC663B]" />
                    <span>4. Communication Officielle & Consignes du Jury</span>
                  </h3>
                  <span className="text-xs text-[#8E8E93]">Diffusion en direct</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0A0A0A] block mb-1">
                    Bannière d'Annonce Officielle (Diffusée aux candidats sur la plateforme)
                  </label>
                  <input
                    type="text"
                    value={editAnnouncement}
                    onChange={(e) => setEditAnnouncement(e.target.value)}
                    placeholder="Ex: Délibération en cours pour la Cohorte 1 : 20 MPME seront retenues..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-medium text-[#0A0A0A] focus:outline-none focus:border-[#EC663B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0A0A0A] block mb-1">
                    Consignes & Critères d'Arbitrage pour les Membres du Jury
                  </label>
                  <textarea
                    rows={3}
                    value={editCriteriaNotes}
                    onChange={(e) => setEditCriteriaNotes(e.target.value)}
                    placeholder="Instructions internes pour l'évaluation des dossiers..."
                    className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs text-[#0A0A0A] focus:outline-none focus:border-[#EC663B]"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full bg-[#EC663B] hover:bg-[#d4562e] text-white text-xs font-bold transition-all shadow-md shadow-[#EC663B]/20 flex items-center gap-2 cursor-pointer"
                >
                  <CheckIcon className="w-4 h-4 text-white" />
                  <span>Enregistrer Tous les Paramètres de Gouvernance</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetDemo}
                  className="px-4 py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <RefreshIcon className="w-3.5 h-3.5" />
                  <span>Réinitialiser les données de démo</span>
                </button>
              </div>
            </form>
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
