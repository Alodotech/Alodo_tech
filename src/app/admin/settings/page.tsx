"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { isListedAdmin } from "@/utils/supabase/isAdmin";
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

function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
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

type CohortRecord = {
  id: string;
  name: string;
  maxCapacity: number;
  status: string;
  openedAt: string | null;
};

const COHORT_STATUS: Record<string, string> = {
  open: "Ouverte",
  reviewing: "En arbitrage",
  deliberation: "En délibération",
  closed: "Clôturée",
  archived: "Archivée",
  draft: "Brouillon",
};

export default function AdminSettingsPage() {
  const [cohort, setCohort] = useState<Cohort | null>(null);
  const [history, setHistory] = useState<CohortRecord[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [editMaxCapacity, setEditMaxCapacity] = useState<number>(20);
  const [editCohortName, setEditCohortName] = useState<string>("Cohorte 1 — Bénin 2026");

  const refreshData = async () => {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = "/admin/login";
      return;
    }
    if (!(await isListedAdmin(supabase, user.email))) {
      await supabase.auth.signOut();
      window.location.href = "/admin/login?error=unauthorized";
      return;
    }

    setIsAuthorized(true);

    const { data: rows } = await supabase.from("cohorts").select("*");
    const mapped: CohortRecord[] = (rows || [])
      .map((row: any) => ({
        id: row.id,
        name: row.name || "Cohorte",
        maxCapacity: row.max_capacity || 0,
        status: row.status || "draft",
        openedAt: row.opened_at || row.created_at || null,
      }))
      .sort((a, b) => {
        const left = a.openedAt ? new Date(a.openedAt).getTime() : 0;
        const right = b.openedAt ? new Date(b.openedAt).getTime() : 0;
        return left - right;
      });

    setHistory(mapped);

    const active = mapped.find((item) => item.status === "open") || mapped[mapped.length - 1];
    if (active) {
      setCohort({
        id: active.id,
        name: active.name,
        maxCapacity: active.maxCapacity,
        selectedCount: 0,
        status: active.status as Cohort["status"],
        openedAt: active.openedAt || "",
      });
      setEditMaxCapacity(active.maxCapacity || 20);
      setEditCohortName(active.name);
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

    const { error } = await supabase.from("cohorts").update({
      name: editCohortName,
      max_capacity: editMaxCapacity,
    }).eq("id", cohort.id);

    if (error) {
      setStatusFeedback({
        msg: "Erreur lors de la sauvegarde des paramètres.",
        type: "error",
      });
    } else {
      setStatusFeedback({
        msg: "La cohorte active a été mise à jour.",
        type: "success",
      });
      refreshData();
    }
  };

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
    <DashboardLayout activeTab="admin" adminSubTab="settings">
      <div className="space-y-6 animate-in fade-in duration-150">

        {statusFeedback && (
          <div
            className={`p-4 rounded-2xl text-xs font-semibold border flex items-center justify-between animate-in fade-in duration-150 ${statusFeedback.type === "success"
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
                Régulez l'ensemble du cycle de vie du programme : quotas d'admission, dates du calendrier national, pondérations des dimensions d'évaluation, bannières du site et directives d'arbitrage.
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
                <span>Quotas d'Admission & Statut de la Cohorte</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#0A0A0A] block mb-1">
                  Promotion
                </label>
                <input
                  type="text"
                  value={editCohortName}
                  onChange={(e) => setEditCohortName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-bold text-[#0A0A0A] focus:outline-none focus:border-[#EC663B]"
                />
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
              </div>
            </div>

            <div className="pt-1 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#EC663B] hover:bg-[#d4562e] text-white text-xs font-bold transition-all shadow-md shadow-[#EC663B]/20 flex items-center gap-2 cursor-pointer"
              >
                <CheckIcon className="w-4 h-4 text-white" />
                <span>Enregistrer la cohorte active</span>
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-4">
          <div>
            <h3 className="font-extrabold text-sm text-[#0A0A0A]">Historique des cohortes</h3>
          </div>

          {history.length === 0 ? (
            <div className="p-8 rounded-3xl border border-dashed border-[#D1D1D6] bg-[#FAFAFA] text-center text-xs text-[#8E8E93]">
              Aucune cohorte enregistrée.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {history.map((item, index) => {
                const isActive = item.id === cohort?.id;
                return (
                  <div
                    key={item.id}
                    className={`p-5 rounded-3xl border-dashed border text-center ${isActive
                        ? "bg-white border-[#EC663B] shadow-sm"
                        : "bg-[#FAFAFA] border-dashed border-[#D1D1D6]"
                      }`}
                  >
                    <div className="py-6 space-y-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs mx-auto ${isActive ? "bg-[#EC663B] text-white" : "bg-[#EBEBEB] text-[#8E8E93]"
                          }`}
                      >
                        #{index + 1}
                      </div>
                      <p className="text-xs font-bold text-[#0A0A0A]">{item.name}</p>
                      <p className="text-sm font-extrabold text-[#0A0A0A]">
                        {item.maxCapacity} places
                      </p>
                      <p className="text-[10px] text-[#8E8E93]">
                        {isActive ? "Cohorte active · " : ""}
                        {COHORT_STATUS[item.status] || item.status}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
