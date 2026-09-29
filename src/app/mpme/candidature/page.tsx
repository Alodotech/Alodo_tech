"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAuthModal from "@/components/GoogleAuthModal";
import { MpmeStorage } from "@/lib/mpme/storage";
import { createClient } from "@/utils/supabase/client";

const SECTORS = [
  "Commerce & Distribution",
  "Agriculture & Agroalimentaire",
  "Restauration & Hôtellerie",
  "Services aux entreprises & B2B",
  "Artisanat & Métiers d'art",
  "Transport & Logistique",
  "BTP & Immobilier",
  "Santé & Bien-être",
  "Technologies & Numérique",
  "Autre secteur",
];

const REVENUE_BRACKETS = [
  "Moins de 1 000 000 FCFA / mois",
  "1 000 000 à 3 000 000 FCFA / mois",
  "3 000 000 à 10 000 000 FCFA / mois",
  "10 000 000 à 25 000 000 FCFA / mois",
  "Plus de 25 000 000 FCFA / mois",
];

const DIFFICULTIES_LIST = [
  "Trésorerie & Cash-flow",
  "Financement & Crédit",
  "Comptabilité & Rapprochement bancaire",
  "Fiscalité & Déclarations",
  "Ventes & Acquisition clients",
  "Organisation & Procédures",
  "Dépendance au dirigeant",
  "Digitalisation & Outils de gestion",
  "Ressources humaines & Recrutement",
  "Gestion des stocks & Fournisseurs",
];

export default function CandidaturePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    leaderName: "",
    phone: "",
    whatsapp: "",
    email: "",
    city: "Cotonou",
    sector: SECTORS[0],
    yearCreated: 2022,
    employeesCount: "3 à 5 personnes",
    monthlyRevenue: REVENUE_BRACKETS[0],
    isFormalized: true,
    hasProBankAccount: true,
    mainDifficulties: [] as string[],
    singleBiggestProblem: "",
    motivation: "",
    leaderAvailability: "Temps plein",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Check if admin
        const { data: admin } = await supabase.from('admins').select('id').eq('email', user.email).single();
        if (admin) {
          router.push('/admin/candidatures');
          return;
        }

        const u = {
          email: user.email,
          name: user.user_metadata?.full_name || user.email?.split("@")[0],
          provider: "google",
          role: "MPME"
        };
        setCurrentUser(u);
        setFormData((prev) => ({
          ...prev,
          email: u.email || prev.email,
          leaderName: u.name || prev.leaderName,
        }));
      } else {
        // If not logged in, prompt Google Modal to facilitate pre-fill
        setShowGoogleModal(true);
      }
    };
    fetchUser();
  }, []);

  const handleGoogleSuccess = () => {};

  const toggleDifficulty = (diff: string) => {
    setFormData((prev) => {
      const exists = prev.mainDifficulties.includes(diff);
      const updated = exists
        ? prev.mainDifficulties.filter((d) => d !== diff)
        : [...prev.mainDifficulties, diff];
      return { ...prev, mainDifficulties: updated };
    });
  };

  const handleNextStep = () => {
    setErrorMsg("");

    if (currentStep === 1) {
      if (!formData.name.trim() || !formData.leaderName.trim() || !formData.phone.trim() || !formData.email.trim()) {
        setErrorMsg("Veuillez renseigner tous les champs obligatoires d'identité.");
        return;
      }
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === 2) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    setErrorMsg("");
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (formData.mainDifficulties.length === 0) {
      setErrorMsg("Veuillez sélectionner au moins une difficulté principale.");
      return;
    }

    if (!formData.singleBiggestProblem.trim() || !formData.motivation.trim()) {
      setErrorMsg("Veuillez remplir votre problème prioritaire et votre motivation.");
      return;
    }

    setSubmitting(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setErrorMsg("Vous devez être connecté pour soumettre une candidature.");
      setSubmitting(false);
      return;
    }

    // 1. Fetch active cohort
    const { data: cohortData } = await supabase.from('cohorts').select('id').eq('status', 'open').single();
    const cohortId = cohortData?.id || 'c4464c20-7214-41d3-92f7-7b24cfeb631a';

    // 2. Insert into companies
    const { data: companyData, error: companyError } = await supabase.from('companies').insert({
      user_id: user.id,
      name: formData.name,
      leader_name: formData.leaderName,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      city: formData.city,
      sector: formData.sector,
      year_created: Number(formData.yearCreated),
      employees_count: formData.employeesCount,
      monthly_revenue: formData.monthlyRevenue,
      is_formalized: formData.isFormalized,
      has_pro_bank_account: formData.hasProBankAccount,
      main_difficulties: formData.mainDifficulties,
      single_biggest_problem: formData.singleBiggestProblem,
      motivation: formData.motivation,
      leader_availability: formData.leaderAvailability
    }).select('id').single();

    if (companyError || !companyData) {
      console.error(companyError);
      setErrorMsg("Une erreur est survenue lors de l'enregistrement de l'entreprise.");
      setSubmitting(false);
      return;
    }

    // 3. Insert into applications
    const { error: appError } = await supabase.from('applications').insert({
      company_id: companyData.id,
      cohort_id: cohortId,
      status: 'submitted'
    });

    if (appError) {
      console.error(appError);
      setErrorMsg("Une erreur est survenue lors de la soumission de la candidature.");
      setSubmitting(false);
      return;
    }

    // Redirect directly to Diagnostic!
    router.push("/mpme/diagnostic");
  };

  const stepProgress = Math.round((currentStep / 3) * 100);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] flex flex-col font-sans">
      <Navbar activeKey="mpme" />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full">
        {/* En-tête formulaire multi-étape */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#EC663B] text-xs font-semibold mb-3 border border-[#EBEBEB] shadow-sm">
            Candidature Cohorte 1 — 20 Places
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0A0A0A]">
            Dépôt de Candidature
          </h1>
          <p className="text-[#6E6E73] text-xs sm:text-sm mt-1">
            Formulaire guidé étape par étape (~5 minutes).
          </p>

          {/* Stepper Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex items-center justify-between text-xs font-bold text-[#6E6E73] mb-2">
              <span className={currentStep === 1 ? "text-[#EC663B]" : currentStep > 1 ? "text-emerald-700" : ""}>
                1. Identité
              </span>
              <span className={currentStep === 2 ? "text-[#EC663B]" : currentStep > 2 ? "text-emerald-700" : ""}>
                2. Profil
              </span>
              <span className={currentStep === 3 ? "text-[#EC663B]" : ""}>
                3. Problématiques
              </span>
            </div>

            <div className="w-full h-2 bg-[#EBEBEB] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#EC663B] transition-all duration-300 rounded-full"
                style={{ width: `${stepProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Info compte Google connecté */}
        {currentUser && (
          <div className="mb-6 p-3.5 rounded-2xl bg-white border border-[#EBEBEB] shadow-xs flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
                ✓
              </span>
              <span className="text-[#3A3A3C]">
                Connecté avec Google : <strong>{currentUser.email}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowGoogleModal(true)}
              className="text-[#EC663B] hover:underline font-semibold"
            >
              Changer
            </button>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
            <svg className="w-4 h-4 text-rose-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-3xl border border-[#EBEBEB] shadow-lg">
          {/* =========================================================================
              ÉTAPE 1 : IDENTITÉ DE L'ENTREPRISE & DIRIGEANT
              ========================================================================= */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="border-b border-[#F2F2F2] pb-3 mb-4">
                <span className="text-xs font-bold text-[#EC663B] uppercase tracking-wider block">
                  Étape 1 sur 3
                </span>
                <h2 className="text-lg font-bold text-[#0A0A0A]">
                  Identité de l'Entreprise & du Dirigeant
                </h2>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                  Nom de l'entreprise <span className="text-[#EC663B]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: BioAgro Bénin SARL"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                    Nom complet du dirigeant <span className="text-[#EC663B]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Koffi Mensah"
                    value={formData.leaderName}
                    onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                    Adresse email professionnelle <span className="text-[#EC663B]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="dirigeant@entreprise.bj"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                    Téléphone principal <span className="text-[#EC663B]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+229 97 00 00 00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                    Numéro WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+229 95 00 00 00"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                    Ville d'implantation <span className="text-[#EC663B]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Cotonou, Porto-Novo, Parakou..."
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                    Secteur d'activité <span className="text-[#EC663B]">*</span>
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white transition-all"
                  >
                    {SECTORS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3A3A3C] mb-1 mt-4">
                  Disponibilité du dirigeant pour le programme <span className="text-[#EC663B]">*</span>
                </label>
                <select
                  value={formData.leaderAvailability}
                  onChange={(e) => setFormData({ ...formData, leaderAvailability: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white transition-all"
                >
                  <option value="Temps plein">À temps plein sur mon entreprise</option>
                  <option value="Temps partiel">À temps partiel (j'ai une autre activité)</option>
                  <option value="Occasionnel">Occasionnel (projet parallèle)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-[#F2F2F2]">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-3.5 bg-[#EC663B] hover:bg-[#d4562e] text-white font-bold rounded-full text-sm shadow-md shadow-[#EC663B]/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Passer au profil opérationnel (Étape 2/3)</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* =========================================================================
              ÉTAPE 2 : PROFIL OPÉRATIONNEL
              ========================================================================= */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="border-b border-[#F2F2F2] pb-3 mb-4">
                <span className="text-xs font-bold text-[#EC663B] uppercase tracking-wider block">
                  Étape 2 sur 3
                </span>
                <h2 className="text-lg font-bold text-[#0A0A0A]">
                  Profil Opérationnel & Financier
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                    Année de création <span className="text-[#EC663B]">*</span>
                  </label>
                  <input
                    type="number"
                    min={1990}
                    max={2026}
                    required
                    value={formData.yearCreated}
                    onChange={(e) => setFormData({ ...formData, yearCreated: Number(e.target.value) })}
                    className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                    Nombre d'employés <span className="text-[#EC663B]">*</span>
                  </label>
                  <select
                    value={formData.employeesCount}
                    onChange={(e) => setFormData({ ...formData, employeesCount: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white"
                  >
                    <option value="1 à 2 personnes">1 à 2 personnes</option>
                    <option value="3 à 5 personnes">3 à 5 personnes</option>
                    <option value="6 à 10 personnes">6 à 10 personnes</option>
                    <option value="11 à 25 personnes">11 à 25 personnes</option>
                    <option value="Plus de 25 personnes">Plus de 25 personnes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                    Chiffre d'affaires mensuel <span className="text-[#EC663B]">*</span>
                  </label>
                  <select
                    value={formData.monthlyRevenue}
                    onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white"
                  >
                    {REVENUE_BRACKETS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                  <span className="block text-xs font-semibold text-[#3A3A3C] mb-2">
                    Enregistrement légal (RCCM / IFU) ?
                  </span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs text-[#0A0A0A] cursor-pointer">
                      <input
                        type="radio"
                        name="formalized"
                        checked={formData.isFormalized === true}
                        onChange={() => setFormData({ ...formData, isFormalized: true })}
                        className="accent-[#EC663B]"
                      />
                      Oui
                    </label>
                    <label className="flex items-center gap-2 text-xs text-[#0A0A0A] cursor-pointer">
                      <input
                        type="radio"
                        name="formalized"
                        checked={formData.isFormalized === false}
                        onChange={() => setFormData({ ...formData, isFormalized: false })}
                        className="accent-[#EC663B]"
                      />
                      Non / En cours
                    </label>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                  <span className="block text-xs font-semibold text-[#3A3A3C] mb-2">
                    Compte bancaire professionnel dédié ?
                  </span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs text-[#0A0A0A] cursor-pointer">
                      <input
                        type="radio"
                        name="bank_account"
                        checked={formData.hasProBankAccount === true}
                        onChange={() => setFormData({ ...formData, hasProBankAccount: true })}
                        className="accent-[#EC663B]"
                      />
                      Oui
                    </label>
                    <label className="flex items-center gap-2 text-xs text-[#0A0A0A] cursor-pointer">
                      <input
                        type="radio"
                        name="bank_account"
                        checked={formData.hasProBankAccount === false}
                        onChange={() => setFormData({ ...formData, hasProBankAccount: false })}
                        className="accent-[#EC663B]"
                      />
                      Non
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F2F2F2] flex gap-3">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-1/3 py-3 rounded-full border border-[#D1D1D6] hover:bg-[#FAFAFA] text-xs font-semibold text-[#6E6E73] transition-colors"
                >
                  ← Précédent
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-2/3 py-3 bg-[#EC663B] hover:bg-[#d4562e] text-white font-bold rounded-full text-xs shadow-md shadow-[#EC663B]/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Passer aux problématiques (Étape 3/3)</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* =========================================================================
              ÉTAPE 3 : PROBLÉMATIQUES & MOTIVATION
              ========================================================================= */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="border-b border-[#F2F2F2] pb-3 mb-4">
                <span className="text-xs font-bold text-[#EC663B] uppercase tracking-wider block">
                  Étape 3 sur 3
                </span>
                <h2 className="text-lg font-bold text-[#0A0A0A]">
                  Problématiques Clés & Motivation
                </h2>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3A3A3C] mb-2">
                  Quelles sont vos principales difficultés actuelles ? (Cochez celles qui s'appliquent) <span className="text-[#EC663B]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DIFFICULTIES_LIST.map((diff) => {
                    const isChecked = formData.mainDifficulties.includes(diff);
                    return (
                      <button
                        type="button"
                        key={diff}
                        onClick={() => toggleDifficulty(diff)}
                        className={`text-left text-xs p-2.5 rounded-xl border transition-all ${
                          isChecked
                            ? "bg-[#EC663B]/10 border-[#EC663B] text-[#EC663B] font-bold shadow-xs"
                            : "bg-[#FAFAFA] border-[#EBEBEB] text-[#6E6E73] hover:border-[#D1D1D6]"
                        }`}
                      >
                        {isChecked ? "✓ " : "+ "}
                        {diff}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                  Si vous pouviez résoudre UN SEUL problème dans les 3 prochains mois, lequel ? <span className="text-[#EC663B]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Obtenir 10M FCFA de ligne de crédit pour acheter du stock en gros"
                  value={formData.singleBiggestProblem}
                  onChange={(e) => setFormData({ ...formData, singleBiggestProblem: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                  Pourquoi souhaitez-vous rejoindre ALODO MPME ? <span className="text-[#EC663B]">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Expliquez vos attentes et ce que ce programme apporterait concrètement à votre entreprise..."
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white"
                />
              </div>

              <div className="pt-4 border-t border-[#F2F2F2] flex gap-3">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-1/3 py-3 rounded-full border border-[#D1D1D6] hover:bg-[#FAFAFA] text-xs font-semibold text-[#6E6E73] transition-colors"
                >
                  ← Précédent
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-2/3 py-3.5 bg-[#EC663B] hover:bg-[#d4562e] disabled:opacity-50 text-white font-bold rounded-full text-xs sm:text-sm shadow-xl shadow-[#EC663B]/25 transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? "Envoi en cours..." : "Envoyer ma candidature et passer au diagnostic →"}
                </button>
              </div>
            </div>
          )}
        </form>
      </main>

      <GoogleAuthModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onSuccess={handleGoogleSuccess}
        title="Continuer avec Google"
        subtitle="Connectez-vous pour candidater au programme ALODO MPME"
      />

      <Footer />
    </div>
  );
}
