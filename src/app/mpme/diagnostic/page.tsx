"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { QUESTIONS_V1, DIMENSIONS } from "@/lib/mpme/questions";
import { DiagnosticAnswer } from "@/lib/mpme/types";
import { MpmeStorage } from "@/lib/mpme/storage";
import { useLang } from "@/i18n/LanguageProvider";
import { DIM_TITLE_EN, QUESTIONS_EN, REVENUE_EN, SECTOR_EN, STAFF_EN } from "@/i18n/diagnosticEn";

const BENIN_CITIES = [
  "Cotonou",
  "Abomey-Calavi",
  "Porto-Novo",
  "Parakou",
  "Abomey",
  "Adja-Ouèrè",
  "Adjarra",
  "Adjohoun",
  "Agbangnizoun",
  "Aguégués",
  "Akpro-Missérété",
  "Allada",
  "Aplahoué",
  "Athiémé",
  "Avrankou",
  "Banikoara",
  "Bantè",
  "Bassila",
  "Bembéréké",
  "Bohicon",
  "Bonou",
  "Bopa",
  "Boukoumbé",
  "Cobly",
  "Comè",
  "Copargo",
  "Covè",
  "Dangbo",
  "Dassa-Zoumè",
  "Djakotomey",
  "Djidja",
  "Djougou",
  "Dogbo",
  "Glazoué",
  "Gogounou",
  "Grand-Popo",
  "Houéyogbé",
  "Ifangni",
  "Kalalé",
  "Kandi",
  "Karimama",
  "Kérou",
  "Kétou",
  "Klouékanmè",
  "Kouandé",
  "Kpomassè",
  "Lalo",
  "Lokossa",
  "Malanville",
  "Matéri",
  "N'Dali",
  "Natitingou",
  "Nikki",
  "Ouaké",
  "Ouèssè",
  "Ouidah",
  "Ouinhi",
  "Pehunco",
  "Pèrèrè",
  "Pobè",
  "Sakété",
  "Savalou",
  "Savè",
  "Ségbana",
  "Sèmè-Kpodji",
  "Sinendé",
  "Sô-Ava",
  "Tanguiéta",
  "Tchaourou",
  "Toffo",
  "Tori-Bossito",
  "Toucountouna",
  "Toviklin",
  "Za-Kpota",
  "Zagnanado",
  "Zè",
  "Zogbodomey",
  "Autre commune / ville",
];

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
  "Éducation & Formation",
  "Mode, Textile & Habillement",
  "Autre secteur",
];

const REVENUE_BRACKETS = [
  "Moins de 1 000 000 FCFA / mois",
  "1 000 000 à 3 000 000 FCFA / mois",
  "3 000 000 à 10 000 000 FCFA / mois",
  "10 000 000 à 25 000 000 FCFA / mois",
  "Plus de 25 000 000 FCFA / mois",
];

function DiagnosticContent() {
  const router = useRouter();
  const { lang } = useLang();
  const en = lang === "en";

  // Phase: "company" -> "questions" -> "confirmation"
  const [phase, setPhase] = useState<"company" | "questions" | "confirmation">("company");

  // Company Information
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
    joinCommunity: true,
  });

  const [customCity, setCustomCity] = useState("");
  const [customSector, setCustomSector] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedScore, setSubmittedScore] = useState<number | null>(null);

  useEffect(() => {
    setIsClient(true);

    // Recover pending session form if any
    const savedFormData = sessionStorage.getItem("alodo_unified_form");
    if (savedFormData) {
      try {
        const parsed = JSON.parse(savedFormData);
        setFormData(parsed);
        if (parsed.customCity) setCustomCity(parsed.customCity);
        if (parsed.customSector) setCustomSector(parsed.customSector);
      } catch (e) {
        console.error(e);
      }
    }

    // Recover answers progress if any
    const savedAnswers = MpmeStorage.getDiagnosticProgress();
    if (savedAnswers && savedAnswers.length > 0) {
      setAnswers(savedAnswers);
      const lastAnsweredIdx = QUESTIONS_V1.findIndex((q) => !savedAnswers.some((a) => a.questionId === q.id));
      if (lastAnsweredIdx > 0) {
        setCurrentIndex(lastAnsweredIdx);
      }
    }
  }, []);

  // Validation before going to questions
  const handleStartQuestions = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim()) {
      setErrorMsg(en ? "Please enter your business name." : "Veuillez renseigner le nom de votre entreprise.");
      return;
    }
    if (!formData.leaderName.trim()) {
      setErrorMsg(en ? "Please enter the owner's full name." : "Veuillez renseigner le nom et prénom du dirigeant.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg(en ? "Please enter your phone number." : "Veuillez renseigner votre numéro de téléphone.");
      return;
    }
    if (!formData.whatsapp.trim()) {
      setErrorMsg(en ? "Please enter your WhatsApp number." : "Veuillez renseigner votre numéro WhatsApp.");
      return;
    }
    if (!formData.email.trim()) {
      setErrorMsg(en ? "Please enter your email address." : "Veuillez renseigner votre adresse email.");
      return;
    }
    if (formData.city === "Autre commune / ville" && !customCity.trim()) {
      setErrorMsg(en ? "Please specify your city or town." : "Veuillez préciser le nom de votre ville ou commune.");
      return;
    }
    if (formData.sector === "Autre secteur" && !customSector.trim()) {
      setErrorMsg(en ? "Please specify your sector." : "Veuillez préciser votre secteur d'activité.");
      return;
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "alodo_unified_form",
        JSON.stringify({ ...formData, customCity, customSector })
      );
      sessionStorage.setItem("alodo_last_company_name", formData.name);
    }

    setPhase("questions");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentQuestion = QUESTIONS_V1[currentIndex];
  const currentDimension = currentQuestion ? DIMENSIONS.find((d) => d.id === currentQuestion.dimensionId) : null;
  const currentAnswer = currentQuestion ? answers.find((a) => a.questionId === currentQuestion.id) : null;

  const handleSelectOption = (val: string) => {
    if (!currentQuestion) return;
    const updated = answers.filter((a) => a.questionId !== currentQuestion.id);
    updated.push({ questionId: currentQuestion.id, value: val });
    setAnswers(updated);
    MpmeStorage.saveDiagnosticProgress(updated);

    if (currentIndex < QUESTIONS_V1.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 200);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      // Go back to company profile
      setPhase("company");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS_V1.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Direct Submission handler — NO Google auth required!
  const finalizeSubmission = async () => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const finalCity = formData.city === "Autre commune / ville" ? customCity.trim() : formData.city;
      const finalSector = formData.sector === "Autre secteur" ? customSector.trim() : formData.sector;

      const res = await fetch("/api/submit-diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData: {
            ...formData,
            city: finalCity,
            sector: finalSector,
          },
          answers,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Une erreur est survenue lors de l'enregistrement.");
      }

      // Clear local storage progress
      MpmeStorage.saveDiagnosticProgress([]);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("alodo_last_company_name", formData.name);
        sessionStorage.setItem("alodo_diagnostic_submitted", "true");
        if (data.report) {
          sessionStorage.setItem("alodo_last_score", String(data.report.globalScore));
          setSubmittedScore(data.report.globalScore);
        }
      }

      setPhase("confirmation");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || (en ? "Something went wrong while sending." : "Une erreur est survenue lors de l'envoi."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercent = Math.round(((currentIndex + 1) / QUESTIONS_V1.length) * 100);
  const answeredCount = answers.length;
  const isComplete = answeredCount >= QUESTIONS_V1.length;

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] flex flex-col font-sans">
      <Navbar activeKey="mpme" />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        {/* =========================================================================
            PHASE 1 : IDENTIFICATION & COORDONNÉES DE L'ENTREPRISE
            ========================================================================= */}
        {phase === "company" && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#EBEBEB] shadow-sm">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#EC663B]/10 text-[#EC663B] mb-3">
                {en ? "Step 1 of 2 • Business profile" : "Étape 1 sur 2 • Profil de l'entreprise"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0A0A0A]">
                {en ? "MSME maturity diagnostic" : "Diagnostic de Maturité MPME"}
              </h1>
              <p className="text-[#6E6E73] text-xs sm:text-sm mt-2 max-w-lg mx-auto">
                {en
                  ? "Enter your business details below, then continue with the 20 questions to get your full assessment."
                  : "Renseignez les coordonnées de votre entreprise ci-dessous, puis poursuivez avec les 20 questions pour obtenir votre évaluation complète."}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleStartQuestions} className="space-y-6">
              {/* SECTION 1 : IDENTITÉ DE L'ENTREPRISE */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-1.5 border-b border-[#F2F2F2]">
                  <span className="w-5 h-5 rounded-full bg-[#EC663B]/10 text-[#EC663B] text-[10px] font-extrabold flex items-center justify-center">1</span>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A]">
                    {en ? "Business identity" : "Identité de l'entreprise"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3A3A3C] mb-1.5">
                      {en ? "Business name" : "Nom de l'entreprise"} <span className="text-[#EC663B]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: BioAgro Bénin SARL"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white focus:ring-2 focus:ring-[#EC663B]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3A3A3C] mb-1.5">
                      {en ? "Owner's full name" : "Nom et Prénom du dirigeant"} <span className="text-[#EC663B]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Jean Houndété"
                      value={formData.leaderName}
                      onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white focus:ring-2 focus:ring-[#EC663B]/10 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2 : CONTACT & LOCALISATION */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-1.5 border-b border-[#F2F2F2]">
                  <span className="w-5 h-5 rounded-full bg-[#EC663B]/10 text-[#EC663B] text-[10px] font-extrabold flex items-center justify-center">2</span>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A]">
                    {en ? "Contact & location" : "Contact & Localisation"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3A3A3C] mb-1.5">
                      {en ? "Email address" : "Adresse Email"} <span className="text-[#EC663B]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="contact@monentreprise.bj"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white focus:ring-2 focus:ring-[#EC663B]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3A3A3C] mb-1.5">
                      {en ? "WhatsApp number" : "Numéro WhatsApp"} <span className="text-[#EC663B]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+229 97 00 00 00"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white focus:ring-2 focus:ring-[#EC663B]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3A3A3C] mb-1.5">
                      {en ? "Phone number" : "Téléphone d'appel"} <span className="text-[#EC663B]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+229 97 00 00 00"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white focus:ring-2 focus:ring-[#EC663B]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3A3A3C] mb-1.5">
                      {en ? "Main city of activity" : "Ville principale d'activité"} <span className="text-[#EC663B]">*</span>
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white focus:ring-2 focus:ring-[#EC663B]/10 transition-all"
                    >
                      {BENIN_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c === "Autre commune / ville" && en ? "Other city / town" : c}
                        </option>
                      ))}
                    </select>

                    {formData.city === "Autre commune / ville" && (
                      <div className="mt-2.5 animate-in fade-in duration-200">
                        <label className="block text-[11px] font-semibold text-[#3A3A3C] mb-1">
                          {en ? "Specify your city / town" : "Précisez votre ville / commune"} <span className="text-[#EC663B]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Athiémé, Kétou, etc."
                          value={customCity}
                          onChange={(e) => setCustomCity(e.target.value)}
                          className="w-full bg-[#FAFAFA] border border-[#EC663B] rounded-xl px-3.5 py-2 text-sm text-[#0A0A0A] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#EC663B]"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 3 : PROFIL & ACTIVITÉ */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-1.5 border-b border-[#F2F2F2]">
                  <span className="w-5 h-5 rounded-full bg-[#EC663B]/10 text-[#EC663B] text-[10px] font-extrabold flex items-center justify-center">3</span>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A]">
                    {en ? "Profile & size" : "Profil & Dimensionnement"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3A3A3C] mb-1.5">
                      {en ? "Sector" : "Secteur d'activité"} <span className="text-[#EC663B]">*</span>
                    </label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white focus:ring-2 focus:ring-[#EC663B]/10 transition-all"
                    >
                      {SECTORS.map((s) => (
                        <option key={s} value={s}>
                          {en ? (SECTOR_EN[s] ?? s) : s}
                        </option>
                      ))}
                    </select>

                    {formData.sector === "Autre secteur" && (
                      <div className="mt-2.5 animate-in fade-in duration-200">
                        <label className="block text-[11px] font-semibold text-[#3A3A3C] mb-1">
                          {en ? "Specify your sector" : "Précisez votre secteur d'activité"} <span className="text-[#EC663B]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Énergies renouvelables, Cosmétique, etc."
                          value={customSector}
                          onChange={(e) => setCustomSector(e.target.value)}
                          className="w-full bg-[#FAFAFA] border border-[#EC663B] rounded-xl px-3.5 py-2 text-sm text-[#0A0A0A] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#EC663B]"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3A3A3C] mb-1.5">
                      {en ? "Year founded" : "Année de création"} <span className="text-[#EC663B]">*</span>
                    </label>
                    <input
                      type="number"
                      min={1990}
                      max={2026}
                      required
                      value={formData.yearCreated}
                      onChange={(e) => setFormData({ ...formData, yearCreated: Number(e.target.value) })}
                      className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white focus:ring-2 focus:ring-[#EC663B]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3A3A3C] mb-1.5">
                      {en ? "Number of employees" : "Nombre d'employés"} <span className="text-[#EC663B]">*</span>
                    </label>
                    <select
                      value={formData.employeesCount}
                      onChange={(e) => setFormData({ ...formData, employeesCount: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white focus:ring-2 focus:ring-[#EC663B]/10 transition-all"
                    >
                      {Object.keys(STAFF_EN).map((value) => (
                        <option key={value} value={value}>
                          {en ? STAFF_EN[value] : value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3A3A3C] mb-1.5">
                      {en ? "Average monthly revenue" : "Chiffre d'affaires mensuel moyen"} <span className="text-[#EC663B]">*</span>
                    </label>
                    <select
                      value={formData.monthlyRevenue}
                      onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white focus:ring-2 focus:ring-[#EC663B]/10 transition-all"
                    >
                      {REVENUE_BRACKETS.map((r) => (
                        <option key={r} value={r}>
                          {en ? (REVENUE_EN[r] ?? r) : r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F2F2F2]">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#EC663B] hover:bg-[#d4562e] text-white font-bold rounded-2xl text-sm shadow-xl shadow-[#EC663B]/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <span>{en ? "Continue to the 20 diagnostic questions" : "Poursuivre vers les 20 questions du diagnostic"}</span>
                  <span>→</span>
                </button>
                <p className="text-center text-[11px] text-[#8E8E93] mt-2.5">
                  {en
                    ? "Step 1 of 2 • About 4 to 5 minutes • Your answers stay strictly confidential"
                    : "Étape 1 sur 2 • Temps estimé : 4 à 5 minutes • Vos réponses restent strictement confidentielles"}
                </p>
              </div>
            </form>
          </div>
        )}

        {/* =========================================================================
            PHASE 2 : LES 20 QUESTIONS DU DIAGNOSTIC
            ========================================================================= */}
        {phase === "questions" && currentQuestion && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#EBEBEB] shadow-sm">
            {/* Same Header with Title */}
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0A0A0A]">
                {en ? "MSME diagnostic" : "Diagnostic MPME"}
              </h1>
              <p className="text-[#6E6E73] text-xs sm:text-sm mt-2 max-w-lg mx-auto">
                {en
                  ? "Assess how mature your business is across the key strategic dimensions."
                  : "Évaluez la maturité de votre entreprise sur les dimensions stratégiques clés."}
              </p>

              {/* Progress Bar inside Header */}
              <div className="mt-5 max-w-md mx-auto">
                <div className="flex items-center justify-between text-xs text-[#6E6E73] mb-1.5 font-medium">
                  <span className="text-[#EC663B] font-semibold uppercase tracking-wider">
                    {(en && currentDimension ? DIM_TITLE_EN[currentDimension.id] : currentDimension?.title)} · {en ? "Question" : "Question"} {currentIndex + 1} {en ? "of" : "sur"} {QUESTIONS_V1.length}
                  </span>
                  <span className="font-bold text-[#0A0A0A]">{progressPercent}% {en ? "complete" : "complété"}</span>
                </div>
                <div className="w-full h-2 bg-[#F2F2F2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#EC663B] to-[#00C2A8] transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            {/* Question Details */}
            <div className="mt-6 pt-6 border-t border-[#F2F2F2]">
              <div 
                className="inline-block px-3 py-1 rounded-full bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-mono text-[#6E6E73]"
                style={{ marginBottom: "14px" }}
              >
                {en ? "Sub-dimension" : "Sous-dimension"} : {en ? (QUESTIONS_EN[currentQuestion.id]?.sub ?? currentQuestion.subDimension) : currentQuestion.subDimension}
              </div>

              <h2
                className="text-lg sm:text-xl font-bold text-[#0A0A0A]"
                style={{ marginTop: "6px", marginBottom: "26px", lineHeight: "1.4" }}
              >
                {en ? (QUESTIONS_EN[currentQuestion.id]?.text ?? currentQuestion.text) : currentQuestion.text}
              </h2>

              {/* Options with clean generous breathing room */}
              <div className="space-y-3.5" style={{ marginTop: "24px" }}>
                {currentQuestion.options?.map((opt) => {
                  const isSelected = currentAnswer?.value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelectOption(opt.value)}
                      className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer ${
                        isSelected
                          ? "bg-[#EC663B]/10 border-[#EC663B] text-[#0A0A0A] shadow-sm font-medium"
                          : "bg-[#FAFAFA] border-[#EBEBEB] text-[#3A3A3C] hover:border-[#D1D1D6] hover:bg-white"
                      }`}
                      style={{ padding: "16px 18px" }}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 shrink-0 ${
                          isSelected ? "border-[#EC663B] bg-[#EC663B]" : "border-[#D1D1D6]"
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="text-sm leading-relaxed text-[#2C2C2E]">
                        {en ? (QUESTIONS_EN[currentQuestion.id]?.options[opt.value] ?? opt.label) : opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation buttons inside the card */}
              <div 
                className="border-t border-[#F2F2F2] flex items-center justify-between gap-3 flex-wrap"
                style={{ marginTop: "36px", paddingTop: "24px" }}
              >
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-5 py-3 rounded-full bg-[#FAFAFA] border border-[#D1D1D6] text-xs sm:text-sm font-semibold text-[#0A0A0A] hover:bg-[#F2F2F2] transition-colors cursor-pointer"
                >
                  {currentIndex === 0
                    ? (en ? "← Edit business profile" : "← Modifier profil entreprise")
                    : (en ? "← Previous" : "← Précédent")}
                </button>

                {currentIndex < QUESTIONS_V1.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!currentAnswer}
                    className="px-7 py-3 bg-[#EC663B] hover:bg-[#d4562e] disabled:opacity-40 text-xs sm:text-sm font-bold text-white rounded-full transition-all shadow-md shadow-[#EC663B]/20 cursor-pointer"
                  >
                    {en ? "Next →" : "Suivante →"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={finalizeSubmission}
                    disabled={!isComplete || isSubmitting}
                    className="px-8 py-3.5 bg-gradient-to-r from-[#EC663B] to-[#00C2A8] text-white font-extrabold text-sm sm:text-base rounded-full shadow-lg disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {isSubmitting
                      ? (en ? "Sending the diagnostic..." : "Envoi du diagnostic...")
                      : (en ? "Submit my diagnostic →" : "Valider mon diagnostic →")}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            PHASE 3 : CONFIRMATION & REMERCIEMENT
            ========================================================================= */}
        {phase === "confirmation" && (
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#EBEBEB] text-center shadow-xl max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 text-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-200">
              ✓
            </div>

            <span className="text-xs uppercase tracking-widest text-[#00C2A8] font-bold">
              {en ? "File & diagnostic received" : "Dossier & Diagnostic Bien Reçus"}
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-4 text-[#0A0A0A]">
              {en ? "Thank you" : "Merci"}, {formData.name} !
            </h1>

            <p className="text-sm text-[#6E6E73] mb-6 leading-relaxed">
              {en
                ? "Your maturity diagnostic has been saved. Our team is reviewing your profile across the strategic dimensions."
                : "Votre diagnostic de maturité a été enregistré avec succès. Nos experts examinent actuellement les éléments de votre profil sur les dimensions stratégiques."}
            </p>

            {/* INVITATION À REJOINDRE LA COMMUNAUTÉ / CHAÎNE WHATSAPP */}
            <div className="bg-gradient-to-br from-[#F0FDF4] to-[#FAFAFA] border border-[#25D366]/30 rounded-2xl p-6 sm:p-7 mb-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto">
                <img
                  src="https://img.icons8.com/color/48/whatsapp--v1.png"
                  alt="WhatsApp"
                  className="w-7 h-7"
                />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-[#0A0A0A]">
                  {en ? "Join the ALODO MSME community" : "Rejoignez la Communauté des MPME d'ALODO"}
                </h3>
                <p className="text-xs sm:text-sm text-[#4A4A4F] mt-1.5 max-w-md mx-auto leading-relaxed">
                  {en
                    ? "To follow the rest of the program, official announcements, support opportunities and upcoming workshops, join our official WhatsApp channel."
                    : "Pour suivre la suite du programme, les annonces officielles, les opportunités d'accompagnement et les prochains ateliers, rejoignez notre chaîne WhatsApp officielle."}
                </p>
              </div>

              <div className="pt-1">
                <a
                  href="https://whatsapp.com/channel/0029VbDTqIa0lwgh8GZWuS1k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-full text-sm shadow-lg shadow-[#25D366]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <img
                    src="https://img.icons8.com/color/48/whatsapp--v1.png"
                    alt=""
                    className="w-5 h-5"
                  />
                  <span>{en ? "Join the WhatsApp channel →" : "Rejoindre la Chaîne WhatsApp →"}</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/mpme"
                className="py-3 px-6 bg-white hover:bg-[#F5F5F7] text-[#0A0A0A] font-semibold border border-[#D1D1D6] rounded-full text-xs sm:text-sm transition-all text-center"
              >
                {en ? "Back to the program" : "Retour à l'accueil du programme"}
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-[#EBEBEB] text-xs text-[#8E8E93]">
              {en ? "A question? Email our team at" : "Une question ? Contactez notre équipe par email à"} <strong>partnership@alodotech.com</strong>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function DiagnosticFallback() {
  const { lang } = useLang();
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center font-sans">
      <div className="text-center p-8">
        <div className="w-8 h-8 border-2 border-[#EC663B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs sm:text-sm text-[#6E6E73]">
          {lang === "en" ? "Loading the diagnostic..." : "Chargement du diagnostic..."}
        </p>
      </div>
    </div>
  );
}

export default function DiagnosticPage() {
  return (
    <Suspense fallback={<DiagnosticFallback />}>
      <DiagnosticContent />
    </Suspense>
  );
}
