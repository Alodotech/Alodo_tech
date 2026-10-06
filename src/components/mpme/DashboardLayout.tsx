"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Application } from "@/lib/mpme/types";
import { createClient } from "@/utils/supabase/client";

// ============================================================================
// CLEAN PROFESSIONAL VECTOR SVG ICONS (NO EMOJIS)
// ============================================================================
function DashboardIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

function CandidatureIcon({ className = "w-4 h-4" }: { className?: string }) {
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

function DownloadPdfIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function UsersIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function GlobeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function LogOutIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
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

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: "dashboard" | "candidature" | "overview" | "diagnostic" | "admin";
  currentView?: "dashboard" | "candidature";
  onSelectView?: (view: "dashboard" | "candidature") => void;
  onDownloadPdf?: () => void;
  adminSubTab?: "registry" | "top20" | "diagnostics" | "settings" | "leaders";
  onSelectAdminTab?: (tab: "registry" | "top20" | "diagnostics" | "settings" | "leaders") => void;
}

export default function DashboardLayout({
  children,
  activeTab = "dashboard",
  currentView,
  onSelectView,
  onDownloadPdf,
  adminSubTab = "registry",
  onSelectAdminTab,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string; name?: string; provider?: string; role?: string } | null>(null);
  const [application, setApplication] = useState<Application | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        let isAdmin = false;
        if (user.email) {
          const { data: adminRecord } = await supabase
            .from("admins")
            .select("id")
            .eq("email", user.email)
            .single();
          isAdmin = !!adminRecord;
        }

        setUser({
          email: user.email,
          name: user.user_metadata?.full_name || user.email?.split("@")[0],
          provider: "google",
          role: isAdmin ? "Admin" : "MPME"
        });
        
        // Temporarily keeping application logic but removing MpmeStorage dependency for user.
        // We will need to adapt Application fetching as well later if it's connected to Supabase DB.
      } else {
        setUser(null);
      }
    };
    fetchUser();
  }, [pathname]);

  const handleConfirmLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setShowLogoutModal(false);
    router.push("/");
  };

  const handleReturnToSite = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  const isDashboardActive = currentView
    ? currentView === "dashboard"
    : activeTab === "dashboard" || activeTab === "overview";
  const isCandidatureActive = currentView
    ? currentView === "candidature"
    : activeTab === "candidature";

  const companyName = application?.company.name || "Mon Entreprise";
  const leaderName = application?.company.leaderName || user?.name || "Dirigeant MPME";
  const userEmail = application?.company.email || user?.email || "";

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0A0A0A] font-sans">
      {/* =========================================================================
          1. IMMOBILE LATERAL SIDEBAR (DESKTOP)
          Fixed to viewport: "ne doit pas bouger, ça doit être planté"
          ========================================================================= */}
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-72 bg-white border-r border-[#EBEBEB] flex-col justify-between z-30 overflow-y-auto print:hidden">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-[#F2F2F2]">
            <div className="flex items-center gap-3">
              <img
                src="/logo/logo.png"
                alt="Alodo Tech Logo"
                style={{ height: "28px", width: "auto" }}
              />
              <div>
                <div className="font-tech font-bold text-sm tracking-wider text-[#0A0A0A]">
                  <span className="text-[#EC663B]">ALODO</span> TECH
                </div>
                <span className="text-[10px] font-semibold text-[#8E8E93] tracking-widest uppercase block">
                  {activeTab === "admin" || user?.role === "Admin" ? "Administration" : "Plateforme MPME"}
                </span>
              </div>
            </div>
          </div>



          {/* =====================================================================
              NAVIGATION: "Vue Générale" & "Paramètres Gouverneur"
              ===================================================================== */}
          <nav className="p-4 space-y-1.5">
            {activeTab === "admin" || user?.role === "Admin" ? (
              <>
                {/* 1. VUE GÉNÉRALE */}
                <Link
                  href="/admin/candidatures"
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all text-left cursor-pointer ${
                    activeTab === "admin" && adminSubTab !== "settings"
                      ? "bg-[#EC663B]/10 text-[#EC663B] font-bold"
                      : "text-[#6E6E73] hover:text-[#0A0A0A] hover:bg-[#FAFAFA]"
                  }`}
                >
                  <DashboardIcon
                    className={`w-5 h-5 shrink-0 ${
                      activeTab === "admin" && adminSubTab !== "settings" ? "text-[#EC663B]" : "text-[#6E6E73]"
                    }`}
                  />
                  <span>Vue Générale</span>
                </Link>

                {/* 2. PARAMÈTRES GOUVERNEUR */}
                <Link
                  href="/admin/settings"
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all text-left cursor-pointer ${
                    activeTab === "admin" && adminSubTab === "settings"
                      ? "bg-[#EC663B]/10 text-[#EC663B] font-bold"
                      : "text-[#6E6E73] hover:text-[#0A0A0A] hover:bg-[#FAFAFA]"
                  }`}
                >
                  <SettingsIcon
                    className={`w-5 h-5 shrink-0 ${
                      activeTab === "admin" && adminSubTab === "settings" ? "text-[#EC663B]" : "text-[#6E6E73]"
                    }`}
                  />
                  <span>Paramètres Gouverneur</span>
                </Link>
              </>
            ) : (
              <>
                {/* 1. MON DASHBOARD */}
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectView) onSelectView("dashboard");
                    else router.push("/mpme/dashboard");
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-semibold transition-all text-left cursor-pointer ${
                    isDashboardActive
                      ? "bg-[#EC663B]/10 text-[#EC663B] font-bold"
                      : "text-[#6E6E73] hover:text-[#0A0A0A] hover:bg-[#FAFAFA]"
                  }`}
                >
                  <DashboardIcon
                    className={`w-4 h-4 shrink-0 ${
                      isDashboardActive ? "text-[#EC663B]" : "text-[#6E6E73]"
                    }`}
                  />
                  <span>Mon Dashboard</span>
                </button>

                {/* 2. MON ENTREPRISE */}
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectView) onSelectView("candidature");
                    else router.push("/mpme/dashboard?tab=candidature");
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-semibold transition-all text-left cursor-pointer ${
                    isCandidatureActive
                      ? "bg-[#EC663B]/10 text-[#EC663B] font-bold"
                      : "text-[#6E6E73] hover:text-[#0A0A0A] hover:bg-[#FAFAFA]"
                  }`}
                >
                  <CandidatureIcon
                    className={`w-4 h-4 shrink-0 ${
                      isCandidatureActive ? "text-[#EC663B]" : "text-[#6E6E73]"
                    }`}
                  />
                  <span>Mon Entreprise</span>
                </button>
              </>
            )}
          </nav>
        </div>

        {/* =====================================================================
            BOTTOM ACTION: STRICTEMENT "Se déconnecter" COMPLETEMENT EN BAS
            ===================================================================== */}
        <div className="p-4 border-t border-[#F2F2F2]">
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOutIcon className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          2. MAIN CONTENT WRAPPER (WITH lg:pl-72 TO ACCOMMODATE FIXED SIDEBAR)
          ========================================================================= */}
      <div className="flex flex-col min-h-screen lg:pl-72 print:pl-0 print:min-h-0 print:block">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-[#EBEBEB] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 print:hidden">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#0A0A0A] hover:bg-[#FAFAFA]"
              aria-label="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <span className="text-[11px] font-semibold text-[#8E8E93] hidden sm:block">
                Programme National d'Accompagnement
              </span>
              <div className="text-xs sm:text-sm font-bold text-[#0A0A0A]">
                {activeTab === "admin"
                  ? (user?.email || "Console Administration — Cohorte 1")
                  : "Cohorte 1 — Bénin 2026 (20 Places)"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-1.5 text-xs text-[#8E8E93] hover:text-rose-600 transition-colors px-3 py-1.5 rounded-full hover:bg-rose-50 font-medium cursor-pointer"
              title="Se déconnecter"
            >
              <LogOutIcon className="w-3.5 h-3.5" />
              <span>Se déconnecter</span>
            </button>
          </div>
        </header>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="w-72 bg-white h-full p-6 flex flex-col justify-between shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="font-tech font-bold text-sm tracking-wider text-[#0A0A0A]">
                    <span className="text-[#EC663B]">ALODO</span> TECH
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[#8E8E93] text-lg font-bold p-1 hover:text-[#0A0A0A]"
                  >
                    ✕
                  </button>
                </div>



                <nav className="space-y-1.5">
                  {activeTab === "admin" || user?.role === "Admin" ? (
                    <>
                      {/* 1. VUE GÉNÉRALE */}
                      <Link
                        href="/admin/candidatures"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-left ${
                          activeTab === "admin" && adminSubTab !== "settings"
                            ? "bg-[#EC663B]/10 text-[#EC663B] font-bold"
                            : "text-[#3A3A3C] hover:bg-[#FAFAFA]"
                        }`}
                      >
                        <DashboardIcon
                          className={`w-5 h-5 shrink-0 ${
                            activeTab === "admin" && adminSubTab !== "settings" ? "text-[#EC663B]" : "text-[#6E6E73]"
                          }`}
                        />
                        <span>Vue Générale</span>
                      </Link>

                      {/* 2. PARAMÈTRES GOUVERNEUR */}
                      <Link
                        href="/admin/settings"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-left ${
                          activeTab === "admin" && adminSubTab === "settings"
                            ? "bg-[#EC663B]/10 text-[#EC663B] font-bold"
                            : "text-[#3A3A3C] hover:bg-[#FAFAFA]"
                        }`}
                      >
                        <SettingsIcon
                          className={`w-5 h-5 shrink-0 ${
                            activeTab === "admin" && adminSubTab === "settings" ? "text-[#EC663B]" : "text-[#6E6E73]"
                          }`}
                        />
                        <span>Paramètres Gouverneur</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          if (onSelectView) onSelectView("dashboard");
                          else router.push("/mpme/dashboard");
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold text-left ${
                          isDashboardActive
                            ? "bg-[#EC663B]/10 text-[#EC663B] font-bold"
                            : "text-[#3A3A3C] hover:bg-[#FAFAFA]"
                        }`}
                      >
                        <DashboardIcon className="w-4 h-4 shrink-0" />
                        <span>Mon Dashboard</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          if (onSelectView) onSelectView("candidature");
                          else router.push("/mpme/dashboard?tab=candidature");
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold text-left ${
                          isCandidatureActive
                            ? "bg-[#EC663B]/10 text-[#EC663B] font-bold"
                            : "text-[#3A3A3C] hover:bg-[#FAFAFA]"
                        }`}
                      >
                        <CandidatureIcon className="w-4 h-4 shrink-0" />
                        <span>Ma Candidature</span>
                      </button>
                    </>
                  )}
                </nav>
              </div>

              <div className="border-t border-[#F2F2F2] pt-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setShowLogoutModal(true);
                  }}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl text-xs text-rose-600 font-bold hover:bg-rose-50 transition-colors"
                >
                  <LogOutIcon className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>Se déconnecter</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto print:p-0 print:m-0 print:max-w-none print:w-full">
          {children}
        </main>
      </div>

      {/* =========================================================================
          LOGOUT CONFIRMATION MODAL
          ========================================================================= */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white rounded-3xl border border-[#EBEBEB] shadow-2xl max-w-sm w-full p-6 sm:p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <LogOutIcon className="w-6 h-6 text-rose-600" />
            </div>

            <h3 className="text-lg font-bold text-[#0A0A0A] mb-1">
              Confirmer la déconnexion
            </h3>
            <p className="text-xs text-[#6E6E73] mb-6 leading-relaxed">
              Êtes-vous sûr de vouloir vous déconnecter de votre Espace MPME ? Vous pourrez vous reconnecter à tout moment avec votre compte Google.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 rounded-full border border-[#D1D1D6] hover:bg-[#FAFAFA] text-xs font-semibold text-[#6E6E73] transition-colors cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="flex-1 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
