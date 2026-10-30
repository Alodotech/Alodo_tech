"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/mpme/DashboardLayout";
import { resolveConsoleSession } from "@/utils/supabase/guardConsole";

type AssignedMpme = {
  id: string;
  name: string;
  leaderName: string;
  email: string;
  phone: string;
  whatsapp: string;
  city: string;
  sector: string;
  yearCreated: number | string | null;
  employeesCount: string;
  monthlyRevenue: string;
  isFormalized: boolean;
  hasProBankAccount: boolean;
  mainDifficulties: string[];
  singleBiggestProblem: string;
  motivation: string;
  statusLabel: string;
  diagnosticScore: number;
  diagnosticLevel: string;
};

function Detail({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest font-bold text-[#8E8E93]">{label}</p>
      <p className="text-sm font-semibold text-[#0A0A0A] mt-1">{value}</p>
    </div>
  );
}

export default function PartnerDashboardPage() {
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);
  const [mpmes, setMpmes] = useState<AssignedMpme[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    resolveConsoleSession().then(async (session) => {
      if (!session) return;
      if (session.role === "admin") {
        window.location.href = "/admin/candidatures";
        return;
      }
      setEmail(session.email);
      try {
        const response = await fetch("/api/partenaire/mpmes");
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(payload.message || "Lecture impossible.");
        const rows = Array.isArray(payload.mpmes) ? payload.mpmes : [];
        setMpmes(rows);
        setSelectedId(rows[0]?.id || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Lecture impossible.");
      } finally {
        setReady(true);
      }
    });
  }, []);

  const selected = mpmes.find((mpme) => mpme.id === selectedId) || null;

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#EC663B] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[#8E8E93] font-medium tracking-wide">Ouverture de l&apos;espace partenaire...</span>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout activeTab="admin">
      <div className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm">
          <span className="text-xs uppercase tracking-widest font-bold text-[#EC663B] block mb-1">Staff</span>
          <h2 className="text-2xl font-extrabold text-[#0A0A0A] font-tech">Espace partenaire ALODO MPME</h2>
          <p className="text-xs text-[#6E6E73] mt-2 max-w-2xl leading-relaxed">
            Connecté en tant que {email}. Vous voyez uniquement les MPME qui vous sont confiées.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl text-xs font-semibold border bg-rose-50 border-rose-200 text-rose-800">{error}</div>
        )}

        {mpmes.length === 0 ? (
          <div className="p-8 rounded-3xl border border-dashed border-[#D1D1D6] bg-white text-center text-xs text-[#8E8E93]">
            Aucune MPME ne vous est affectée pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
            <div className="bg-white rounded-3xl border border-[#EBEBEB] shadow-sm overflow-hidden">
              <ul className="divide-y divide-[#F2F2F2]">
                {mpmes.map((mpme) => (
                  <li key={mpme.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(mpme.id)}
                      className={`w-full text-left px-4 py-4 cursor-pointer ${selectedId === mpme.id ? "bg-[#EC663B]/10" : "hover:bg-[#FAFAFA]"}`}
                    >
                      <p className="text-sm font-bold text-[#0A0A0A]">{mpme.name}</p>
                      <p className="text-[11px] text-[#6E6E73] mt-1">{mpme.leaderName} · {mpme.city || "Ville non renseignée"}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {selected && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0A0A0A]">{selected.name}</h3>
                    <p className="text-xs text-[#6E6E73] mt-1">{selected.sector || "Secteur non renseigné"}</p>
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-[#FAFAFA] border border-[#EBEBEB] text-[11px] font-bold text-[#0A0A0A]">
                    {selected.statusLabel}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Detail label="Dirigeant" value={selected.leaderName} />
                  <Detail label="Ville" value={selected.city} />
                  <Detail label="E-mail" value={selected.email} />
                  <Detail label="Téléphone" value={selected.phone} />
                  <Detail label="WhatsApp" value={selected.whatsapp} />
                  <Detail label="Année de création" value={selected.yearCreated ? String(selected.yearCreated) : ""} />
                  <Detail label="Effectif" value={selected.employeesCount} />
                  <Detail label="Chiffre d'affaires mensuel" value={selected.monthlyRevenue} />
                  <Detail label="Formalisation" value={selected.isFormalized ? "Formalisée" : "Non formalisée"} />
                  <Detail label="Compte bancaire professionnel" value={selected.hasProBankAccount ? "Oui" : "Non"} />
                  <Detail label="Score diagnostic" value={`${selected.diagnosticScore}/100`} />
                  <Detail label="Niveau" value={selected.diagnosticLevel} />
                </div>

                {selected.mainDifficulties.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[#8E8E93]">Difficultés principales</p>
                    <ul className="mt-2 space-y-1">
                      {selected.mainDifficulties.map((item) => (
                        <li key={item} className="text-sm text-[#0A0A0A]">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <Detail label="Problème prioritaire" value={selected.singleBiggestProblem} />
                <Detail label="Motivation" value={selected.motivation} />
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
