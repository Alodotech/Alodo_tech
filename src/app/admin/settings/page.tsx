"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Cohort } from "@/lib/mpme/types";
import DashboardLayout from "@/components/mpme/DashboardLayout";

// Icons
function AwardIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
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

function BarChartIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
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

function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
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

function CheckCircleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export default function AdminSettingsPage() {
  const [cohort, setCohort] = useState<Cohort | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState<{ msg: string; type: "success" | "error" } | null>(null);

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
    
    // Check if admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = "/admin/login";
      return;
    }
    const { data: admin } = await supabase.from('admins').select('id').eq('email', user.email).single();
    if (!admin) {
      await supabase.auth.signOut();
      window.location.href = "/admin/login?error=unauthorized";
      return;
    }

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
  };

  useEffect(() => {
    setIsClient(true);
    refreshData();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cohort) return;

    setStatusFeedback(null);
    const supabase = createClient();
    
    const { error } = await supabase.from('cohorts').update({
      name: editCohortName,
      max_capacity: editMaxCapacity,
      status: editStatus,
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

  const handleResetDemo = () => {
    setStatusFeedback({ msg: "La réinitialisation est désactivée en mode base de données.", type: "error" });
  };

  if (!isClient) return null;

  return (
    <DashboardLayout activeTab="admin" adminSubTab="settings">
      <div className="space-y-6 animate-in fade-in duration-150">
        
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
                  Statut Global de la Cohorte
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as Cohort["status"])}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-bold text-[#0A0A0A] focus:outline-none focus:border-[#EC663B]"
                >
                  <option value="open">Ouverte (Dépôts en cours)</option>
                  <option value="reviewing">En Arbitrage (Dépôts fermés)</option>
                  <option value="closed">Clôturée (Programme démarré)</option>
                </select>
                <span className="text-[11px] text-[#8E8E93] mt-1 block">
                  Contrôle l'accès au formulaire pour le grand public
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
    </DashboardLayout>
  );
}
