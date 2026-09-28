"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/mpme/DashboardLayout";
import DossierPdfDocument from "@/components/mpme/DossierPdfDocument";
import GoogleAuthModal from "@/components/GoogleAuthModal";
import { MpmeStorage } from "@/lib/mpme/storage";
import { Application, Cohort, DiagnosticReport, User } from "@/lib/mpme/types";

// ============================================================================
// CLEAN PROFESSIONAL VECTOR SVG ICONS (NO EMOJIS)
// ============================================================================
function LockIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function RocketIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2 5-2" />
      <path d="M12 15v5s3.03-.55 4.5-2c1.63-1.62 2-5 2-5" />
    </svg>
  );
}

function ClockIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function AlertTriangleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function InfoIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function TrophyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function FileTextIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function DownloadIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function MpmeDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [application, setApplication] = useState<Application | null>(null);
  const [cohort, setCohort] = useState<Cohort | null>(null);
  const [report, setReport] = useState<DiagnosticReport | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [currentView, setCurrentView] = useState<"dashboard" | "candidature">("dashboard");

  const refreshData = () => {
    const currentUser = MpmeStorage.getCurrentUser();
    setUser(currentUser);

    const c = MpmeStorage.getCohort();
    setCohort(c);

    let app: Application | null = null;
    if (currentUser) {
      app = MpmeStorage.getUserApplication(currentUser.email || currentUser.companyId);
    }
    if (!app && typeof window !== "undefined") {
      const lastAppId = sessionStorage.getItem("alodo_last_app_id");
      if (lastAppId) {
        app = MpmeStorage.getUserApplication(lastAppId);
      }
    }
    setApplication(app);

    // If app has a saved report, use it, else get latest report
    if (app?.diagnosticReport) {
      setReport(app.diagnosticReport);
    } else {
      const rep = MpmeStorage.getLatestReport();
      if (app && (app.diagnosticScore || app.status === "diagnostic_completed" || app.status === "selected")) {
        setReport(rep);
      } else if (!app) {
        setReport(rep);
      } else {
        setReport(null);
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
    refreshData();
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("tab") === "candidature") {
        setCurrentView("candidature");
      }
    }
  }, []);

  const handleGoogleSuccess = (selectedEmail: string, selectedName: string) => {
    const res = MpmeStorage.loginWithGoogle(selectedEmail, selectedName);
    if (res.user.role === "Admin") {
      router.push("/admin/candidatures");
    } else {
      refreshData();
    }
  };

  if (!isClient) return null;

  // ==========================================
  // CASE 0 : GUEST / NOT LOGGED IN
  // ==========================================
  if (!user && !application) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] text-[#0A0A0A] flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#EBEBEB] shadow-2xl max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#EC663B]/10 text-[#EC663B] flex items-center justify-center mx-auto mb-4">
            <LockIcon className="w-6 h-6 text-[#EC663B]" />
          </div>

          <span className="text-xs uppercase tracking-widest text-[#EC663B] font-bold">
            Plateforme ALODO MPME
          </span>
          <h1 className="text-2xl font-extrabold mt-1 text-[#0A0A0A]">
            Accès Espace Dirigeant
          </h1>
          <p className="text-xs text-[#6E6E73] mt-2 mb-8 leading-relaxed">
            Connectez-vous pour accéder à votre tableau de bord, suivre l'état de votre candidature et réaliser votre diagnostic de maturité.
          </p>

          <button
            type="button"
            onClick={() => setShowGoogleModal(true)}
            className="w-full py-3.5 px-4 rounded-full border border-[#D1D1D6] hover:border-[#0A0A0A] bg-white hover:bg-[#FAFAFA] text-[#0A0A0A] font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-colors shadow-xs mb-4 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continuer avec Google</span>
          </button>

          <div className="mt-6 pt-6 border-t border-[#F2F2F2]">
            <Link href="/" className="text-xs text-[#8E8E93] hover:text-[#0A0A0A]">
              ← Retourner à l'accueil du site
            </Link>
          </div>
        </div>

        <GoogleAuthModal
          isOpen={showGoogleModal}
          onClose={() => setShowGoogleModal(false)}
          onSuccess={handleGoogleSuccess}
        />
      </div>
    );
  }

  // ==========================================
  // CASE 1 : LOGGED IN BUT NO APPLICATION YET
  // ==========================================
  if (user && !application) {
    return (
      <DashboardLayout
        currentView={currentView}
        onSelectView={setCurrentView}
      >
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#EBEBEB] shadow-sm text-center max-w-xl mx-auto my-8">
          <div className="inline-block px-3 py-1 rounded-full bg-[#EC663B]/10 text-[#EC663B] text-xs font-bold mb-4">
            Cohorte 1 — 20 Places
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A]">
            Bienvenue, {user.name} !
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6E73] mt-3 leading-relaxed">
            Votre compte Google est connecté avec <strong>{user.email}</strong>. Déposez dès maintenant votre dossier de candidature pour rejoindre la Cohorte 1 ALODO MPME.
          </p>

          <div className="mt-8">
            <Link
              href="/mpme/candidature"
              className="inline-block px-8 py-4 bg-[#EC663B] hover:bg-[#d4562e] text-white font-bold rounded-full text-sm shadow-xl shadow-[#EC663B]/25 transition-all"
            >
              Remplir ma candidature (3 étapes) →
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ==========================================
  // CASE 2 : APPLICATION EXISTS (SaaS DASHBOARD)
  // ==========================================
  const appStatus = application?.status || "submitted";
  const isCohortSelected = appStatus === "selected";
  const hasDiagnostic = Boolean(
    report !== null ||
    application?.diagnosticReport ||
    application?.diagnosticScore ||
    appStatus === "diagnostic_completed"
  );
  const isRejected = appStatus === "rejected";

  return (
    <DashboardLayout
      currentView={currentView}
      onSelectView={setCurrentView}
    >
      {/* =====================================================================
          VUE 1 : MA CANDIDATURE (DÉTAILS COMPLETS DU DOSSIER TRANSMIS)
          ===================================================================== */}
      {currentView === "candidature" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Header Ma Candidature */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#EBEBEB]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs uppercase tracking-widest text-[#EC663B] font-bold">
                    Espace Candidat
                  </span>
                  <span className="text-xs text-[#A1A1A6]">•</span>
                  <span className="text-xs text-[#6E6E73] font-medium">
                    {cohort?.name || "Cohorte 1 — Bénin 2026"}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A]">
                  Détails de ma Candidature
                </h1>
                <p className="text-xs text-[#6E6E73] mt-1">
                  Récapitulatif officiel transmis au comité technique ALODO TECH pour l'examen d'admission.
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => setShowPdfModal(true)}
                  className="px-4 py-2 bg-[#0A0A0A] hover:bg-[#2C2C2E] text-white text-xs font-bold rounded-full transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <DownloadIcon className="w-3.5 h-3.5 text-white" />
                  <span>Télécharger en PDF</span>
                </button>
              </div>
            </div>

            {/* Statut de Candidature */}
            <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    isCohortSelected
                      ? "bg-emerald-100 text-emerald-800"
                      : isRejected
                      ? "bg-rose-100 text-rose-800"
                      : "bg-teal-100 text-teal-800"
                  }`}
                >
                  <CheckIcon className="w-3.5 h-3.5" />
                  {isCohortSelected
                    ? "Lauréat — Retenu pour la Cohorte 1"
                    : isRejected
                    ? "Dossier Non Retenu"
                    : "Candidature Enregistrée & Transmise"}
                </span>
              </div>

              <span className="text-xs text-[#8E8E93]">
                Dossier déposé le{" "}
                <strong>
                  {application?.submittedAt
                    ? new Date(application.submittedAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Récemment"}
                </strong>
              </span>
            </div>
          </div>

          {/* Grille des Fiches de Candidature */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. FICHE D'IDENTITÉ ENTREPRISE */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-[#F2F2F2]">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#EC663B] flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0A0A0A]">
                    Fiche d'Identité & Profil Opérationnel
                  </h3>
                  <span className="text-[11px] text-[#8E8E93]">
                    Informations structurelles de l'entreprise
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                  <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">
                    Entreprise
                  </span>
                  <span className="text-xs font-bold text-[#0A0A0A] mt-1 block truncate">
                    {application?.company.name}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                  <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">
                    Ville / Implantation
                  </span>
                  <span className="text-xs font-bold text-[#0A0A0A] mt-1 block">
                    {application?.company.city}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                  <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">
                    Secteur d'activité
                  </span>
                  <span className="text-xs font-bold text-[#0A0A0A] mt-1 block truncate">
                    {application?.company.sector}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                  <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">
                    Année de création
                  </span>
                  <span className="text-xs font-bold text-[#0A0A0A] mt-1 block">
                    {application?.company.yearCreated || 2024}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                  <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">
                    Effectif (Collaborateurs)
                  </span>
                  <span className="text-xs font-bold text-[#0A0A0A] mt-1 block">
                    {application?.company.employeesCount}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                  <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">
                    Chiffre d'Affaires Mensuel
                  </span>
                  <span className="text-xs font-bold text-[#0A0A0A] mt-1 block">
                    {application?.company.monthlyRevenue}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. CONFORMITÉ & DIRIGEANT */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm space-y-6">
              {/* Dirigeant */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 pb-4 border-b border-[#F2F2F2]">
                  <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#EC663B] flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0A0A0A]">
                      Contact & Dirigeant Référent
                    </h3>
                    <span className="text-[11px] text-[#8E8E93]">
                      Coordonnées de l'interlocuteur principal
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                    <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">
                      Nom & Prénom
                    </span>
                    <span className="text-xs font-bold text-[#0A0A0A] mt-1 block">
                      {application?.company.leaderName}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                    <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">
                      Email officiel
                    </span>
                    <span className="text-xs font-bold text-[#0A0A0A] mt-1 block truncate">
                      {application?.company.email}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                    <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">
                      Téléphone
                    </span>
                    <span className="text-xs font-bold text-[#0A0A0A] mt-1 block">
                      {application?.company.phone}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                    <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">
                      WhatsApp
                    </span>
                    <span className="text-xs font-bold text-[#0A0A0A] mt-1 block">
                      {application?.company.whatsapp || application?.company.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Statut Juridique & Bancaire */}
              <div className="pt-2">
                <span className="text-xs font-bold text-[#0A0A0A] block mb-3">
                  Conformité Administrative & Bancaire
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#0A0A0A] block">
                        Immatriculation RCCM / IFU
                      </span>
                      <span className="text-[11px] text-[#6E6E73]">
                        {application?.company.isFormalized
                          ? "Entreprise enregistrée"
                          : "En cours d'immatriculation"}
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        application?.company.isFormalized
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {application?.company.isFormalized ? "OUI" : "NON"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#0A0A0A] block">
                        Compte Bancaire Dédié
                      </span>
                      <span className="text-[11px] text-[#6E6E73]">
                        {application?.company.hasProBankAccount
                          ? "Compte pro actif"
                          : "Compte personnel"}
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        application?.company.hasProBankAccount
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {application?.company.hasProBankAccount ? "OUI" : "NON"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. PROBLÉMATIQUE N°1 & MOTIVATIONS */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-[#F2F2F2]">
              <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#EC663B] flex items-center justify-center font-bold text-xs">
                03
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0A0A0A]">
                  Problématique Prioritaire & Motivations
                </h3>
                <span className="text-[11px] text-[#8E8E93]">
                  Diagnostic déclaré pour l'accompagnement personnalisé
                </span>
              </div>
            </div>

            {/* Problème N°1 */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-50/60 to-white border border-[#EC663B]/25">
              <span className="text-[11px] font-bold text-[#EC663B] uppercase tracking-wider block mb-2">
                Problème prioritaire absolu à résoudre dans les 3 prochains mois
              </span>
              <p className="text-sm font-semibold text-[#0A0A0A] italic leading-relaxed">
                "{application?.company.singleBiggestProblem}"
              </p>
            </div>

            {/* Difficultés cochées */}
            {application?.company.mainDifficulties && application.company.mainDifficulties.length > 0 && (
              <div>
                <span className="text-xs font-bold text-[#0A0A0A] block mb-2.5">
                  Difficultés majeures identifiées par l'entreprise :
                </span>
                <div className="flex flex-wrap gap-2">
                  {application.company.mainDifficulties.map((diff, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-medium text-[#3A3A3C]"
                    >
                      • {diff}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Motivation */}
            {application?.company.motivation && (
              <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[11px] font-bold text-[#6E6E73] uppercase tracking-wider block mb-1.5">
                  Motivations pour rejoindre le programme ALODO MPME :
                </span>
                <p className="text-xs text-[#3A3A3C] leading-relaxed">
                  {application.company.motivation}
                </p>
              </div>
            )}
          </div>

          {/* 4. CALLOUT VERS LE DIAGNOSTIC SI DISPONIBLE */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#EC663B] uppercase tracking-wider block mb-1">
                Diagnostic de Maturité Stratégique
              </span>
              <h4 className="text-base font-bold text-[#0A0A0A]">
                {hasDiagnostic
                  ? `Diagnostic complété — Score Global : ${report?.globalScore || application?.diagnosticScore || 68}/100`
                  : "Diagnostic non encore complété"}
              </h4>
              <p className="text-xs text-[#6E6E73] mt-1 max-w-xl">
                {hasDiagnostic
                  ? "Consultez l'audit complet des 8 dimensions et votre plan d'action à 90 jours sur votre tableau de bord."
                  : "Réalisez votre diagnostic de maturité en 8 dimensions (~10 min) pour compléter votre dossier auprès du comité ALODO."}
              </p>
            </div>

            {hasDiagnostic ? (
              <button
                type="button"
                onClick={() => setCurrentView("dashboard")}
                className="shrink-0 px-6 py-3 bg-[#EC663B] hover:bg-[#d4562e] text-white text-xs font-bold rounded-full transition-colors shadow-md shadow-[#EC663B]/20 cursor-pointer"
              >
                Voir sur Mon Dashboard →
              </button>
            ) : (
              <Link
                href="/mpme/diagnostic"
                className="shrink-0 px-6 py-3 bg-[#EC663B] hover:bg-[#d4562e] text-white text-xs font-bold rounded-full transition-colors shadow-md shadow-[#EC663B]/20"
              >
                Passer le diagnostic (10 min) →
              </Link>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          VUE 2 : MON DASHBOARD (VUE D'ENSEMBLE, PARCOURS & RAPPORT)
          ===================================================================== */}
      {currentView === "dashboard" && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* PARCOURS / STATUT EN UN COUP D'ŒIL */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs uppercase tracking-widest text-[#EC663B] font-bold">
                    Mon Dashboard
                  </span>
                  <span className="text-xs text-[#A1A1A6]">•</span>
                  <span className="text-xs text-[#6E6E73] font-medium">
                    {cohort?.name || "Cohorte 1 — Bénin 2026"}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A]">
                  {application?.company.name || "Mon Entreprise"}
                </h1>
                <p className="text-xs text-[#6E6E73] mt-1">
                  Dirigeant : <strong>{application?.company.leaderName}</strong> ({application?.company.email})
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* TÉLÉCHARGER EN PDF */}
                <button
                  type="button"
                  onClick={() => setShowPdfModal(true)}
                  className="px-4 py-2 bg-white hover:bg-[#F2F2F2] border border-[#D1D1D6] text-xs font-bold rounded-full transition-colors flex items-center gap-2 text-[#0A0A0A] shadow-xs cursor-pointer"
                >
                  <DownloadIcon className="w-3.5 h-3.5 text-[#0A0A0A]" />
                  <span>Télécharger en PDF</span>
                </button>
              </div>
            </div>

            {/* Stepper Status (NO EMOJIS, CLEAN SVGs) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-[#EBEBEB]">
              {[
                {
                  label: "Candidature",
                  status: "Validée ✓",
                  done: true,
                  current: false,
                },
                {
                  label: "Diagnostic (8 dim.)",
                  status: hasDiagnostic
                    ? `Complété (${report?.globalScore || application?.diagnosticScore || 68}/100)`
                    : "À faire pour la sélection",
                  done: hasDiagnostic,
                  current: !hasDiagnostic,
                },
                {
                  label: "Évaluation Comité",
                  status: hasDiagnostic
                    ? isCohortSelected
                      ? "Validée ✓"
                      : "En cours d'étude"
                    : "En attente du test",
                  done: isCohortSelected,
                  current: hasDiagnostic && !isCohortSelected && !isRejected,
                  failed: isRejected,
                },
                {
                  label: "Sélection Cohorte 1",
                  status: isCohortSelected
                    ? "Retenu (Top 20)"
                    : isRejected
                    ? "Non retenu"
                    : "20 Places Max",
                  done: isCohortSelected,
                  current: false,
                  failed: isRejected,
                },
                {
                  label: "Accompagnement",
                  status: isCohortSelected ? "Prêt à démarrer" : "À planifier",
                  done: false,
                  current: isCohortSelected,
                },
              ].map((step, idx) => {
                const bgClass = step.done
                  ? "bg-emerald-50 border-emerald-200 text-[#0A0A0A]"
                  : step.current
                  ? "bg-orange-50 border-[#EC663B] text-[#0A0A0A] shadow-xs"
                  : step.failed
                  ? "bg-rose-50 border-rose-200 text-[#0A0A0A]"
                  : "bg-[#FAFAFA] border-[#EBEBEB] text-[#8E8E93]";

                return (
                  <div key={step.label} className={`p-3.5 rounded-2xl border text-xs ${bgClass}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] text-[#A1A1A6]">0{idx + 1}</span>
                      {step.done ? (
                        <CheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                      ) : step.current ? (
                        <RocketIcon className="w-3.5 h-3.5 text-[#EC663B] animate-pulse" />
                      ) : step.failed ? (
                        <span className="text-rose-500 font-bold">✕</span>
                      ) : (
                        <ClockIcon className="w-3.5 h-3.5 text-[#A1A1A6]" />
                      )}
                    </div>
                    <div className="font-bold text-[#0A0A0A]">{step.label}</div>
                    <div
                      className={`text-[11px] mt-0.5 ${
                        step.done
                          ? "text-emerald-700 font-semibold"
                          : step.current
                          ? "text-[#EC663B] font-bold"
                          : step.failed
                          ? "text-rose-700 font-semibold"
                          : "text-[#8E8E93]"
                      }`}
                    >
                      {step.status}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ======================================================== */}
          {/* CAS 1 : CANDIDATURE ENVOYÉE -> DIAGNOSTIC RECOMMANDÉ     */}
          {/* ======================================================== */}
          {!hasDiagnostic && !isRejected && (
            <div className="space-y-6">
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-orange-50 via-white to-amber-50 border border-[#EC663B]/30 shadow-sm">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                      <CheckIcon className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Votre candidature a été envoyée avec succès !</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A]">
                      Diagnostiquez votre entreprise pour maximiser vos chances de sélection
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6E6E73] max-w-2xl leading-relaxed">
                      Le comité ALODO TECH étudie les profils pour retenir les <strong>20 entreprises</strong> de la Cohorte 1. Passez votre diagnostic de maturité en 8 dimensions (~10 minutes) pour compléter votre dossier.
                    </p>
                  </div>

                  <Link
                    href="/mpme/diagnostic"
                    className="shrink-0 px-8 py-4 bg-[#EC663B] hover:bg-[#d4562e] text-white font-bold rounded-full text-sm shadow-xl shadow-[#EC663B]/25 transition-all text-center whitespace-nowrap"
                  >
                    Démarrer mon Diagnostic (10 min) →
                  </Link>
                </div>
              </div>

              {/* Récapitulatif du dossier déposé avec CTA Ma Candidature */}
              <div className="p-8 rounded-3xl bg-white border border-[#EBEBEB] shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#EBEBEB]">
                  <div>
                    <h3 className="text-base font-bold text-[#0A0A0A]">
                      Aperçu de votre candidature transmise
                    </h3>
                    <span className="text-xs text-[#8E8E93]">
                      Déposé le {new Date(application?.submittedAt || "").toLocaleDateString("fr-FR")}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentView("candidature")}
                    className="text-xs font-bold text-[#EC663B] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Voir tous les détails de ma candidature →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                    <span className="text-[11px] text-[#8E8E93] block font-medium">Secteur</span>
                    <span className="text-xs font-bold text-[#0A0A0A] mt-1 block">
                      {application?.company.sector}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                    <span className="text-[11px] text-[#8E8E93] block font-medium">Effectif</span>
                    <span className="text-xs font-bold text-[#0A0A0A] mt-1 block">
                      {application?.company.employeesCount}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                    <span className="text-[11px] text-[#8E8E93] block font-medium">Chiffre d'affaires</span>
                    <span className="text-xs font-bold text-[#0A0A0A] mt-1 block">
                      {application?.company.monthlyRevenue}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                    <span className="text-[11px] text-[#8E8E93] block font-medium">Implantation</span>
                    <span className="text-xs font-bold text-[#0A0A0A] mt-1 block">
                      {application?.company.city}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                  <span className="text-xs font-bold text-[#EC663B] block uppercase tracking-wider mb-1">
                    Problème prioritaire à résoudre
                  </span>
                  <p className="text-xs text-[#0A0A0A] italic">
                    "{application?.company.singleBiggestProblem}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* CAS 2 : LE DIAGNOSTIC A ÉTÉ COMPLÉTÉ                    */}
          {/* ======================================================== */}
          {hasDiagnostic && report && (
            <div className="space-y-8">
              {/* Bannière de Statut */}
              {isCohortSelected ? (
                <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                        <TrophyIcon className="w-4 h-4 text-emerald-700" />
                        <span>Félicitations ! Admis dans la Cohorte 1</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A]">
                        {application?.company.name} fait partie des 20 lauréats !
                      </h2>
                      <p className="text-xs sm:text-sm text-[#6E6E73] max-w-2xl leading-relaxed">
                        Votre score de maturité ({report.globalScore}/100) et votre profil ont convaincu le comité ALODO TECH.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowPdfModal(true)}
                      className="shrink-0 px-6 py-3.5 bg-slate-900 hover:bg-black text-white font-bold rounded-full text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <DownloadIcon className="w-4 h-4 text-white" />
                      <span>Télécharger en PDF</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-gradient-to-r from-teal-50 via-white to-orange-50 border border-teal-200 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold">
                        <CheckIcon className="w-3.5 h-3.5 text-teal-700" />
                        <span>Dossier Complet & Diagnostic Enregistré</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A]">
                        Votre note de maturité ({report.globalScore}/100) est entre les mains du comité
                      </h2>
                      <p className="text-xs sm:text-sm text-[#6E6E73] max-w-2xl leading-relaxed">
                        Le comité de sélection ALODO TECH étudie actuellement les dossiers pour sélectionner les 20 entreprises lauréates. Réponse sous 72h.
                      </p>
                    </div>

                    <div className="shrink-0 p-4 rounded-2xl bg-white border border-teal-200 text-center shadow-xs">
                      <span className="text-[11px] text-[#6E6E73] block">Score Obtenu</span>
                      <span className="text-2xl font-extrabold text-[#0A0A0A]">{report.globalScore}/100</span>
                      <span className="text-[10px] text-teal-700 font-bold block mt-0.5">{report.level}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* RAPPORT DE MATURITÉ COMPLET */}
              <div className="space-y-8">
                {/* SCORE GLOBAL & NIVEAU & FINANÇABILITÉ */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="p-8 rounded-3xl bg-gradient-to-br from-[#FFF5F2] via-white to-white border border-[#EC663B]/30 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#EC663B]">
                        Score Global ALODO MPME
                      </span>
                      <div className="flex items-baseline gap-2 mt-4">
                        <span className="text-6xl sm:text-7xl font-extrabold text-[#0A0A0A] tracking-tight">
                          {report.globalScore}
                        </span>
                        <span className="text-2xl text-[#6E6E73] font-semibold">/100</span>
                      </div>
                      <div className="mt-3 inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-[#EC663B]/10 text-[#EC663B] border border-[#EC663B]/30">
                        Niveau : {report.level}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#EBEBEB] text-xs text-[#6E6E73]">
                      Évaluation calculée sur les 8 dimensions clés. Rapport généré le {report.generatedAt}.
                    </div>
                  </div>

                  {/* RECOMMANDATION ALODO & FINANCABILITE */}
                  <div className="p-8 rounded-3xl bg-white border border-[#EBEBEB] shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#00C2A8]">
                        Orientation Stratégique ALODO
                      </span>
                      <h3 className="text-lg font-bold text-[#0A0A0A] mt-2 mb-3">
                        {report.alodoRecommendation}
                      </h3>
                      <p className="text-xs text-[#6E6E73] leading-relaxed">
                        Sur la base de vos faiblesses prioritaires, ce parcours ciblé vous permettra de franchir le cap de la structuration.
                      </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-[#EBEBEB]">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-[#0A0A0A]">Indicateur de Finançabilité</span>
                        <span className="font-bold text-[#00C2A8]">{report.fundingReadiness.score}/100</span>
                      </div>
                      <div className="w-full h-2 bg-[#F2F2F2] rounded-full overflow-hidden mb-2">
                        <div
                          className="h-full bg-[#00C2A8]"
                          style={{ width: `${report.fundingReadiness.score}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-[#6E6E73] leading-relaxed">
                        {report.fundingReadiness.analysis}
                      </p>
                    </div>
                  </div>

                  {/* FORCES & RISQUES CLÉS */}
                  <div className="p-8 rounded-3xl bg-white border border-[#EBEBEB] shadow-sm space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                        Points Forts Identifiés
                      </span>
                      <ul className="mt-2 space-y-2">
                        {report.strengths.map((s, i) => (
                          <li key={i} className="text-xs text-[#3A3A3C] flex items-start gap-2">
                            <CheckIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#EBEBEB]">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                        Principaux Risques Critiques
                      </span>
                      <ul className="mt-2 space-y-2">
                        {report.topRisks.map((r, i) => (
                          <li key={i} className="text-xs text-[#3A3A3C] flex items-start gap-2">
                            <AlertTriangleIcon className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* DÉTAIL DES 8 DIMENSIONS */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm">
                  <h2 className="text-lg sm:text-xl font-bold mb-6 text-[#0A0A0A]">
                    Score par Dimension Stratégique
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {report.dimensionScores.map((ds) => {
                      const barColor =
                        ds.score >= 70
                          ? "bg-[#00C2A8]"
                          : ds.score >= 45
                          ? "bg-amber-500"
                          : "bg-rose-500";

                      return (
                        <div
                          key={ds.dimensionId}
                          className="p-5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[#3A3A3C] font-semibold">{ds.title}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-white text-[#6E6E73] border border-[#EBEBEB]">
                              {ds.weight}%
                            </span>
                          </div>

                          <div className="flex items-baseline justify-between">
                            <span className="text-2xl font-extrabold text-[#0A0A0A]">{ds.score}/100</span>
                            <span className="text-xs text-[#6E6E73]">{ds.level}</span>
                          </div>

                          <div className="w-full h-1.5 bg-[#EBEBEB] rounded-full overflow-hidden">
                            <div
                              className={`h-full ${barColor}`}
                              style={{ width: `${ds.score}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* PLAN D'ACTION OPÉRATIONNEL 30 - 60 - 90 JOURS */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm">
                  <div className="mb-8">
                    <span className="text-xs uppercase tracking-widest text-[#EC663B] font-semibold">
                      Feuille de route
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold mt-1 text-[#0A0A0A]">
                      Plan d'Action Opérationnel Recommandé
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6E6E73] mt-1">
                      Les étapes concrètes pour structurer votre entreprise et préparer votre accès aux partenaires financiers.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 30 jours */}
                    <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                      <div className="inline-block px-3 py-1 rounded-full bg-[#EC663B]/10 text-[#EC663B] text-xs font-bold mb-4">
                        Jalon 0 – 30 Jours
                      </div>
                      <h3 className="text-sm font-bold text-[#0A0A0A] mb-3">Fondations & Trésorerie</h3>
                      <ul className="space-y-2.5">
                        {report.actionPlan.days30.map((a, i) => (
                          <li key={i} className="text-xs text-[#3A3A3C] flex items-start gap-2">
                            <span className="text-[#EC663B] font-bold">→</span> {a}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 60 jours */}
                    <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                      <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-4">
                        Jalon 30 – 60 Jours
                      </div>
                      <h3 className="text-sm font-bold text-[#0A0A0A] mb-3">Processus & Ventes</h3>
                      <ul className="space-y-2.5">
                        {report.actionPlan.days60.map((a, i) => (
                          <li key={i} className="text-xs text-[#3A3A3C] flex items-start gap-2">
                            <span className="text-amber-600 font-bold">→</span> {a}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 90 jours */}
                    <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                      <div className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold mb-4">
                        Jalon 60 – 90 Jours
                      </div>
                      <h3 className="text-sm font-bold text-[#0A0A0A] mb-3">Préparation au Financement</h3>
                      <ul className="space-y-2.5">
                        {report.actionPlan.days90.map((a, i) => (
                          <li key={i} className="text-xs text-[#3A3A3C] flex items-start gap-2">
                            <span className="text-teal-600 font-bold">→</span> {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* CAS 3 : REJETÉ / CAPACITÉ ATTEINTE                       */}
          {/* ======================================================== */}
          {isRejected && (
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#EBEBEB] shadow-sm text-center max-w-2xl mx-auto space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <InfoIcon className="w-6 h-6 text-rose-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0A0A0A]">
                Dossier non retenu pour la Cohorte 1
              </h2>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                La Cohorte 1 était strictement plafonnée à 20 places. Votre dossier reste prioritaire pour la prochaine promotion.
              </p>
            </div>
          )}
        </div>
      )}

      {/* MODAL OFFICIEL TÉLÉCHARGER EN PDF (CANDIDATURE + DIAGNOSTIC) */}
      <DossierPdfDocument
        application={application}
        report={report}
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
      />
    </DashboardLayout>
  );
}
