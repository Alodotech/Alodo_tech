"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/mpme/DashboardLayout";
import { resolveConsoleSession } from "@/utils/supabase/guardConsole";

type StaffRole = "admin" | "partenaire";

type StaffUser = {
  email: string;
  role: StaffRole;
  applicationIds: string[];
};

type MpmeOption = {
  id: string;
  name: string;
  leaderName: string;
  city: string;
  sector: string;
};

function RoleSwitch({
  checked,
  onRequestAdmin,
  onSelectPartner,
}: {
  checked: boolean;
  onRequestAdmin: () => void;
  onSelectPartner: () => void;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => {
          if (event.target.checked) onSelectPartner();
          else onRequestAdmin();
        }}
        className="mt-0.5 h-4 w-4 accent-[#EC663B]"
      />
      <span>
        <span className="block text-xs font-bold text-[#0A0A0A]">Rôle partenaire</span>
        <span className="block text-[11px] text-[#6E6E73] mt-0.5">
          Coché par défaut. Décochez pour attribuer le rôle administrateur : une confirmation sera demandée.
        </span>
      </span>
    </label>
  );
}

function mpmeLabel(mpme: MpmeOption) {
  return [mpme.name, mpme.leaderName, mpme.city].filter(Boolean).join(" · ");
}

function MpmePicker({
  mpmes,
  selected,
  onChange,
}: {
  mpmes: MpmeOption[];
  selected: string[];
  onChange: (ids: string[]) => void;
}) {
  const chosen = mpmes.filter((mpme) => selected.includes(mpme.id));
  const available = mpmes.filter((mpme) => !selected.includes(mpme.id));

  if (mpmes.length === 0) {
    return <p className="text-xs text-[#8E8E93]">Aucune MPME enregistrée pour le moment.</p>;
  }

  return (
    <div className="space-y-3">
      <select
        value=""
        onChange={(event) => {
          const id = event.target.value;
          if (!id || selected.includes(id)) return;
          onChange([...selected, id]);
        }}
        className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-bold text-[#0A0A0A] focus:outline-none focus:border-[#EC663B]"
      >
        <option value="">Choisir une MPME</option>
        {available.map((mpme) => (
          <option key={mpme.id} value={mpme.id}>
            {mpmeLabel(mpme)}
          </option>
        ))}
      </select>
      {chosen.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {chosen.map((mpme) => (
            <li key={mpme.id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAFAFA] border border-[#EBEBEB] text-[11px] font-bold text-[#0A0A0A]">
              <span>{mpme.name}</span>
              <button
                type="button"
                onClick={() => onChange(selected.filter((id) => id !== mpme.id))}
                className="text-[#8E8E93] hover:text-rose-600 cursor-pointer"
                aria-label={`Retirer ${mpme.name}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function StaffDirectory() {
  const [ready, setReady] = useState(false);
  const [users, setUsers] = useState<StaffUser[]>([]);
  const [mpmes, setMpmes] = useState<MpmeOption[]>([]);
  const [email, setEmail] = useState("");
  const [isPartnerRole, setIsPartnerRole] = useState(true);
  const [selectedMpmes, setSelectedMpmes] = useState<string[]>([]);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [draftEmail, setDraftEmail] = useState("");
  const [draftPartner, setDraftPartner] = useState(true);
  const [draftMpmes, setDraftMpmes] = useState<string[]>([]);
  const [confirmAdmin, setConfirmAdmin] = useState<null | "create" | "edit">(null);
  const [feedback, setFeedback] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [busy, setBusy] = useState(false);

  const names = useMemo(() => new Map(mpmes.map((mpme) => [mpme.id, mpme.name])), [mpmes]);

  const load = async () => {
    const response = await fetch("/api/admin/staff");
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.message || "Lecture impossible.");
    setUsers(Array.isArray(payload.users) ? payload.users : []);
    setMpmes(Array.isArray(payload.mpmes) ? payload.mpmes : []);
  };

  useEffect(() => {
    resolveConsoleSession().then(async (session) => {
      if (!session) return;
      if (session.role !== "admin") {
        window.location.href = "/partenaire";
        return;
      }
      try {
        await load();
      } catch (error) {
        setFeedback({
          msg: error instanceof Error ? error.message : "Lecture impossible.",
          type: "error",
        });
      } finally {
        setReady(true);
      }
    });
  }, []);

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setFeedback(null);
    try {
      await action();
      await load();
    } catch (error) {
      setFeedback({
        msg: error instanceof Error ? error.message : "Action impossible.",
        type: "error",
      });
    } finally {
      setBusy(false);
    }
  };

  const addUser = async (event: React.FormEvent) => {
    event.preventDefault();
    await run(async () => {
      const response = await fetch("/api/admin/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          role: isPartnerRole ? "partenaire" : "admin",
          applicationIds: isPartnerRole ? selectedMpmes : [],
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.message || "Ajout impossible.");
      setEmail("");
      setIsPartnerRole(true);
      setSelectedMpmes([]);
      setFeedback({ msg: isPartnerRole ? "Partenaire ajouté." : "Administrateur ajouté.", type: "success" });
    });
  };

  const saveEdit = async (currentEmail: string) => {
    await run(async () => {
      const response = await fetch("/api/admin/staff", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentEmail,
          email: draftEmail,
          role: draftPartner ? "partenaire" : "admin",
          applicationIds: draftPartner ? draftMpmes : [],
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.message || "Modification impossible.");
      setEditingEmail(null);
      setFeedback({ msg: "Modification enregistrée.", type: "success" });
    });
  };

  const removeUser = async (target: StaffUser) => {
    if (!window.confirm(`Supprimer ${target.email} ?`)) return;
    await run(async () => {
      const response = await fetch("/api/admin/staff", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: target.email }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.message || "Suppression impossible.");
      setFeedback({ msg: "Compte supprimé.", type: "success" });
    });
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#EC663B] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[#8E8E93] font-medium tracking-wide">Vérification des autorisations...</span>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout activeTab="admin">
      <div className="space-y-6">
        {feedback && (
          <div className={`p-4 rounded-2xl text-xs font-semibold border flex items-center justify-between ${feedback.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-rose-50 border-rose-200 text-rose-800"}`}>
            <span>{feedback.msg}</span>
            <button type="button" onClick={() => setFeedback(null)} className="text-xs opacity-60 hover:opacity-100 p-1 cursor-pointer">✕</button>
          </div>
        )}

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBEBEB] shadow-sm">
          <span className="text-xs uppercase tracking-widest font-bold text-[#EC663B] block mb-1">Staff</span>
          <h2 className="text-2xl font-extrabold text-[#0A0A0A] font-tech">Partenaires</h2>
          <p className="text-xs text-[#6E6E73] mt-1 max-w-2xl leading-relaxed">
            Un partenaire gère les MPME qui lui sont affectées. Il n&apos;entre pas dans la console administrateur. Seul un administrateur peut ajouter, modifier ou supprimer un partenaire.
          </p>
        </div>

        <form onSubmit={addUser} className="bg-white p-6 rounded-3xl border border-[#EBEBEB] shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-[#0A0A0A]">Ajouter un partenaire</h3>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nom@organisation.com"
            className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-bold text-[#0A0A0A] focus:outline-none focus:border-[#EC663B]"
          />
          <RoleSwitch
            checked={isPartnerRole}
            onSelectPartner={() => setIsPartnerRole(true)}
            onRequestAdmin={() => setConfirmAdmin("create")}
          />
          {isPartnerRole && (
            <div className="space-y-2">
              <p className="text-xs font-bold text-[#0A0A0A]">MPME à gérer</p>
              <MpmePicker mpmes={mpmes} selected={selectedMpmes} onChange={setSelectedMpmes} />
            </div>
          )}
          <div className="flex justify-end">
            <button type="submit" disabled={busy} className="px-6 py-3 rounded-full bg-[#EC663B] hover:bg-[#d4562e] text-white text-xs font-bold shadow-md shadow-[#EC663B]/20 cursor-pointer disabled:opacity-60">
              Ajouter
            </button>
          </div>
        </form>

        {users.length === 0 ? (
          <div className="p-8 rounded-3xl border border-dashed border-[#D1D1D6] bg-[#FAFAFA] text-center text-xs text-[#8E8E93]">
            Aucun partenaire ajouté.
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#EBEBEB] shadow-sm overflow-hidden">
            <ul className="divide-y divide-[#F2F2F2]">
              {users.map((user) => {
                const editing = editingEmail === user.email;
                return (
                  <li key={user.email} className="p-4 sm:p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex-1 min-w-0">
                        {editing ? (
                          <input
                            type="email"
                            value={draftEmail}
                            onChange={(event) => setDraftEmail(event.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-bold text-[#0A0A0A] focus:outline-none focus:border-[#EC663B]"
                          />
                        ) : (
                          <p className="text-sm font-bold text-[#0A0A0A] truncate">{user.email}</p>
                        )}
                      </div>
                      {!editing && (
                        <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${user.role === "admin" ? "bg-[#EC663B]/10 text-[#EC663B] border-[#EC663B]/20" : "bg-[#FAFAFA] text-[#6E6E73] border-[#EBEBEB]"}`}>
                          {user.role === "admin" ? "Administrateur" : "Partenaire"}
                        </span>
                      )}
                      <div className="flex items-center gap-2">
                        {editing ? (
                          <>
                            <button type="button" disabled={busy} onClick={() => saveEdit(user.email)} className="px-4 py-2 rounded-full bg-[#0A0A0A] text-white text-xs font-bold cursor-pointer disabled:opacity-60">Enregistrer</button>
                            <button type="button" onClick={() => setEditingEmail(null)} className="px-4 py-2 rounded-full border border-[#D1D1D6] text-xs font-semibold text-[#6E6E73] cursor-pointer">Annuler</button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingEmail(user.email);
                                setDraftEmail(user.email);
                                setDraftPartner(user.role === "partenaire");
                                setDraftMpmes(user.applicationIds || []);
                              }}
                              className="px-4 py-2 rounded-full border border-[#D1D1D6] text-xs font-semibold text-[#0A0A0A] cursor-pointer hover:bg-[#FAFAFA]"
                            >
                              Modifier
                            </button>
                            <button type="button" disabled={busy} onClick={() => removeUser(user)} className="px-4 py-2 rounded-full text-xs font-bold text-rose-600 hover:bg-rose-50 cursor-pointer disabled:opacity-60">Supprimer</button>
                          </>
                        )}
                      </div>
                    </div>

                    {editing ? (
                      <div className="space-y-3">
                        <RoleSwitch
                          checked={draftPartner}
                          onSelectPartner={() => setDraftPartner(true)}
                          onRequestAdmin={() => setConfirmAdmin("edit")}
                        />
                        {draftPartner && (
                          <MpmePicker mpmes={mpmes} selected={draftMpmes} onChange={setDraftMpmes} />
                        )}
                      </div>
                    ) : user.role === "partenaire" ? (
                      <p className="text-[11px] text-[#6E6E73]">
                        {user.applicationIds.length === 0
                          ? "Aucune MPME affectée."
                          : user.applicationIds.map((id) => names.get(id) || "MPME").join(" · ")}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {confirmAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-[#EBEBEB] shadow-2xl max-w-sm w-full p-6 sm:p-8 text-center">
            <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Confirmer le rôle administrateur</h3>
            <p className="text-xs text-[#6E6E73] mb-6 leading-relaxed">
              Cette personne n&apos;aura plus le rôle partenaire. Elle accédera à toute la console, y compris les paramètres gouverneur, et ne sera pas limitée à des MPME.
            </p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setConfirmAdmin(null)} className="flex-1 py-3 rounded-full border border-[#D1D1D6] text-xs font-semibold text-[#6E6E73] cursor-pointer">Annuler</button>
              <button
                type="button"
                onClick={() => {
                  if (confirmAdmin === "create") {
                    setIsPartnerRole(false);
                    setSelectedMpmes([]);
                  } else {
                    setDraftPartner(false);
                    setDraftMpmes([]);
                  }
                  setConfirmAdmin(null);
                }}
                className="flex-1 py-3 rounded-full bg-[#EC663B] text-white text-xs font-bold cursor-pointer"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
