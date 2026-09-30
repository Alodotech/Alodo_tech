"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { QUESTIONS_V1, DIMENSIONS } from "@/lib/mpme/questions";
import { DiagnosticAnswer } from "@/lib/mpme/types";
import { MpmeStorage } from "@/lib/mpme/storage";

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
      setErrorMsg("Veuillez renseigner le nom de votre entreprise.");
      return;
    }
    if (!formData.leaderName.trim()) {
      setErrorMsg("Veuillez renseigner le nom et prénom du dirigeant.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg("Veuillez renseigner votre numéro de téléphone.");
      return;
    }
    if (!formData.whatsapp.trim()) {
      setErrorMsg("Veuillez renseigner votre numéro WhatsApp.");
      return;
    }
    if (!formData.email.trim()) {
      setErrorMsg("Veuillez renseigner votre adresse email.");
      return;
    }
    if (formData.city === "Autre commune / ville" && !customCity.trim()) {
      setErrorMsg("Veuillez préciser le nom de votre ville ou commune.");
      return;
    }
    if (formData.sector === "Autre secteur" && !customSector.trim()) {
      setErrorMsg("Veuillez préciser votre secteur d'activité.");
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
      setErrorMsg(err.message || "Une erreur est survenue lors de l'envoi.");
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
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0A0A0A]">
                Diagnostic MPME
              </h1>
              <p className="text-[#6E6E73] text-xs sm:text-sm mt-2 max-w-lg mx-auto">
                Renseignez les coordonnées de votre entreprise ci-dessous, puis poursuivez avec les questions pour obtenir votre évaluation.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleStartQuestions} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                    Nom et Prénom du dirigeant <span className="text-[#EC663B]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Jean Houndété"
                    value={formData.leaderName}
                    onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                    Numéro WhatsApp <span className="text-[#EC663B]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+229 97 00 00 00"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                    Téléphone d'appel <span className="text-[#EC663B]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+229 97 00 00 00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                    Adresse Email <span className="text-[#EC663B]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@monentreprise.bj"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                    Ville principale d'activité <span className="text-[#EC663B]">*</span>
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white"
                  >
                    {BENIN_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  {formData.city === "Autre commune / ville" && (
                    <div className="mt-2.5 animate-in fade-in duration-200">
                      <label className="block text-[11px] font-semibold text-[#3A3A3C] mb-1">
                        Précisez votre ville / commune <span className="text-[#EC663B]">*</span>
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

                <div>
                  <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                    Secteur d'activité <span className="text-[#EC663B]">*</span>
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white"
                  >
                    {SECTORS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  {formData.sector === "Autre secteur" && (
                    <div className="mt-2.5 animate-in fade-in duration-200">
                      <label className="block text-[11px] font-semibold text-[#3A3A3C] mb-1">
                        Précisez votre secteur d'activité <span className="text-[#EC663B]">*</span>
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
                    Chiffre d'affaires mensuel moyen <span className="text-[#EC663B]">*</span>
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

              {/* OPTION COMMUNAUTÉ MPME ALODO */}
              <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] space-y-3">
                <div>
                  <h3 className="text-xs font-bold text-[#0A0A0A]">
                    Souhaitez-vous rejoindre la Communauté des MPME d’ALODO ?
                  </h3>
                  <p className="text-xs text-[#6E6E73] mt-1 leading-relaxed">
                    La Communauté des MPME permet aux entreprises participantes de rester informées des ressources, opportunités, événements et initiatives proposées par ALODO et son écosystème.
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2.5 text-xs text-[#0A0A0A] cursor-pointer">
                    <input
                      type="radio"
                      name="community"
                      checked={formData.joinCommunity === true}
                      onChange={() => setFormData({ ...formData, joinCommunity: true })}
                      className="accent-[#EC663B]"
                    />
                    <span>Oui, je souhaite rejoindre la Communauté des MPME</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs text-[#0A0A0A] cursor-pointer">
                    <input
                      type="radio"
                      name="community"
                      checked={formData.joinCommunity === false}
                      onChange={() => setFormData({ ...formData, joinCommunity: false })}
                      className="accent-[#EC663B]"
                    />
                    <span>Non, pas pour le moment</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F2F2F2]">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#EC663B] hover:bg-[#d4562e] text-white font-bold rounded-full text-sm shadow-xl shadow-[#EC663B]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Suivant</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =========================================================================
            PHASE 2 : LES 18 QUESTIONS DU DIAGNOSTIC
            ========================================================================= */}
        {phase === "questions" && currentQuestion && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#EBEBEB] shadow-sm">
            {/* Same Header with Title */}
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0A0A0A]">
                Diagnostic MPME
              </h1>
              <p className="text-[#6E6E73] text-xs sm:text-sm mt-2 max-w-lg mx-auto">
                Évaluez la maturité de votre entreprise sur les 8 dimensions stratégiques.
              </p>

              {/* Progress Bar inside Header */}
              <div className="mt-5 max-w-md mx-auto">
                <div className="flex items-center justify-between text-xs text-[#6E6E73] mb-1.5 font-medium">
                  <span className="text-[#EC663B] font-semibold uppercase tracking-wider">
                    {currentDimension?.title} · Question {currentIndex + 1} sur {QUESTIONS_V1.length}
                  </span>
                  <span className="font-bold text-[#0A0A0A]">{progressPercent}% complété</span>
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
                Sous-dimension : {currentQuestion.subDimension}
              </div>

              <h2
                className="text-lg sm:text-xl font-bold text-[#0A0A0A]"
                style={{ marginTop: "6px", marginBottom: "26px", lineHeight: "1.4" }}
              >
                {currentQuestion.text}
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
                        {opt.label}
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
                  {currentIndex === 0 ? "← Modifier profil entreprise" : "← Précédent"}
                </button>

                {currentIndex < QUESTIONS_V1.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!currentAnswer}
                    className="px-7 py-3 bg-[#EC663B] hover:bg-[#d4562e] disabled:opacity-40 text-xs sm:text-sm font-bold text-white rounded-full transition-all shadow-md shadow-[#EC663B]/20 cursor-pointer"
                  >
                    Suivante →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={finalizeSubmission}
                    disabled={!isComplete || isSubmitting}
                    className="px-8 py-3.5 bg-gradient-to-r from-[#EC663B] to-[#00C2A8] text-white font-extrabold text-sm sm:text-base rounded-full shadow-lg disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {isSubmitting ? "Envoi du diagnostic..." : "Valider mon diagnostic →"}
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
              Dossier & Diagnostic Bien Reçus
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-4 text-[#0A0A0A]">
              Merci, {formData.name} !
            </h1>

            <p className="text-sm text-[#6E6E73] mb-6 leading-relaxed">
              Votre diagnostic de maturité a été enregistré avec succès. Nos experts examinent actuellement les éléments de votre profil sur les 8 dimensions.
            </p>

            <div className="text-left bg-[#FAFAFA] p-6 rounded-2xl border border-[#EBEBEB] space-y-3.5 mb-8 text-xs sm:text-sm text-[#3A3A3C]">
              <div className="flex gap-3">
                <span className="text-[#EC663B] font-bold">01.</span>
                <p>
                  <strong>Examen de votre dossier :</strong> L'équipe ALODO TECH analyse les 8 dimensions de votre entreprise.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#EC663B] font-bold">02.</span>
                <p>
                  <strong>Retour par email :</strong> Nous vous ferons un retour par email dans un délai de 7 à 14 jours.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/mpme"
                className="py-3.5 px-6 bg-[#EC663B] hover:bg-[#d4562e] text-white font-bold rounded-full text-sm transition-all text-center shadow-md shadow-[#EC663B]/20"
              >
                Retour à l'accueil ALODO MPME →
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-[#EBEBEB] text-xs text-[#8E8E93]">
              Une question ? Contactez notre équipe par email à <strong>partnership@alodotech.com</strong>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function DiagnosticPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center font-sans">
          <div className="text-center p-8">
            <div className="w-8 h-8 border-2 border-[#EC663B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs sm:text-sm text-[#6E6E73]">Chargement du diagnostic...</p>
          </div>
        </div>
      }
    >
      <DiagnosticContent />
    </Suspense>
  );
}
