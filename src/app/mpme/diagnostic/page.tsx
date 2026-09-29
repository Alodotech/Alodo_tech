"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { QUESTIONS_V1, DIMENSIONS } from "@/lib/mpme/questions";
import { DiagnosticAnswer } from "@/lib/mpme/types";
import { MpmeStorage } from "@/lib/mpme/storage";
import { createClient } from "@/utils/supabase/client";

export default function DiagnosticPage() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswer[]>([]);
  const [companyName, setCompanyName] = useState("BioAgro Bénin");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    const saved = MpmeStorage.getDiagnosticProgress();
    if (saved && saved.length > 0) {
      setAnswers(saved);
      const lastAnsweredIdx = QUESTIONS_V1.findIndex((q) => !saved.some((a) => a.questionId === q.id));
      if (lastAnsweredIdx > 0) {
        setCurrentIndex(lastAnsweredIdx);
      }
    }

    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      let app = null;
      if (user) {
        setCurrentUser(user);
        const { data, error } = await supabase
          .from('applications')
          .select(`
            id,
            status,
            companies (
              name,
              user_id
            )
          `)
          .single(); // Actually we should filter by user_id but RLS ensures we only get ours. Since we might have multiple, let's just get the first one.

        // Fix to filter properly
        const { data: appsData } = await supabase
          .from('applications')
          .select(`id, status, companies!inner(name, user_id)`)
          .eq('companies.user_id', user.id)
          .limit(1);

        if (appsData && appsData.length > 0) {
          const appData = appsData[0];
          app = {
            id: appData.id,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            company: { name: (Array.isArray(appData.companies) ? (appData.companies as any[])[0]?.name : (appData.companies as any)?.name) || '' },
            status: appData.status
          };
        }
      }
      if (!app && typeof window !== "undefined") {
        const lastAppId = sessionStorage.getItem("alodo_last_app_id");
        if (lastAppId) app = MpmeStorage.getUserApplication(lastAppId);
      }

      if (app && (app.status === "diagnostic_completed" || app.status === "selected")) {
        router.push("/mpme/candidature/confirmation");
        return;
      }

      if (app) {
        setCompanyName(app.company.name);
      } else {
        const name = sessionStorage.getItem("alodo_last_company_name");
        if (name) setCompanyName(name);
      }
    };
    fetchUser();
  }, []);

  const currentQuestion = QUESTIONS_V1[currentIndex];
  const currentDimension = DIMENSIONS.find((d) => d.id === currentQuestion.dimensionId);
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion.id);

  const handleSelectOption = (val: string) => {
    const updated = answers.filter((a) => a.questionId !== currentQuestion.id);
    updated.push({ questionId: currentQuestion.id, value: val });
    setAnswers(updated);
    MpmeStorage.saveDiagnosticProgress(updated);

    if (currentIndex < QUESTIONS_V1.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 250);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS_V1.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmitFinal = async () => {
    setIsSubmitting(true);
    let app = null;
    
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data: appsData } = await supabase
        .from('applications')
        .select(`id, status, companies!inner(name, user_id)`)
        .eq('companies.user_id', user.id)
        .limit(1);

      if (appsData && appsData.length > 0) {
        app = appsData[0];
      }
    }

    if (!app && typeof window !== "undefined") {
      const lastAppId = sessionStorage.getItem("alodo_last_app_id");
      if (lastAppId) app = { id: lastAppId, companies: { name: sessionStorage.getItem("alodo_last_company_name") || "" } };
    }
    
    const targetName = (Array.isArray(app?.companies) ? app?.companies[0]?.name : app?.companies?.name) || companyName || "Mon Entreprise";
    const report = MpmeStorage.submitDiagnostic(targetName, answers, app?.id);
    
    if (user && app) {
      // Save diagnostic report to diagnostics table
      await supabase
        .from('diagnostics')
        .insert({
          application_id: app.id,
          status: 'completed',
          answers: answers,
          global_score: report.globalScore,
          diagnostic_level: report.level,
          report_data: report,
          completed_at: new Date().toISOString()
        });

      // Update application status
      await supabase
        .from('applications')
        .update({ status: 'diagnostic_completed' })
        .eq('id', app.id);
    }

    MpmeStorage.saveDiagnosticProgress([]);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("alodo_diagnostic_done", "true");
    }
    router.push("/mpme/candidature/confirmation");
  };

  const progressPercent = Math.round(((currentIndex + 1) / QUESTIONS_V1.length) * 100);
  const answeredCount = answers.length;
  const isComplete = answeredCount >= QUESTIONS_V1.length;

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] flex flex-col font-sans">
      <Navbar activeKey="mpme" />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        <div>
          {/* Header Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-[#6E6E73] mb-2">
              <span className="font-semibold text-[#EC663B] uppercase tracking-wider">
                {currentDimension?.title} ({currentIndex + 1}/{QUESTIONS_V1.length})
              </span>
              <span className="font-bold text-[#0A0A0A]">{progressPercent}% complété</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-[#EBEBEB] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#EC663B] to-[#00C2A8] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between mt-3 text-xs text-[#6E6E73]">
              <span>Entreprise évaluée : <strong className="text-[#0A0A0A]">{companyName}</strong></span>
              <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Sauvegarde progressive active
              </span>
            </div>
          </div>

          {/* QUESTION CARD */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#EBEBEB] shadow-xl relative">
            <div className="inline-block px-3 py-1 rounded-full bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-mono text-[#6E6E73] mb-4">
              Sous-dimension : {currentQuestion.subDimension}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mb-6 leading-snug text-[#0A0A0A]">
              {currentQuestion.text}
            </h2>

            {/* OPTIONS */}
            <div className="space-y-3">
              {currentQuestion.options?.map((opt) => {
                const isSelected = currentAnswer?.value === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(opt.value)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                      isSelected
                        ? "bg-[#EC663B]/10 border-[#EC663B] text-[#0A0A0A] shadow-md shadow-[#EC663B]/10 font-medium"
                        : "bg-[#FAFAFA] border-[#EBEBEB] text-[#3A3A3C] hover:border-[#D1D1D6] hover:bg-white"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 shrink-0 ${
                        isSelected ? "border-[#EC663B] bg-[#EC663B]" : "border-[#D1D1D6]"
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm sm:text-base leading-relaxed">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* NAVIGATION BOTTOM BAR */}
        <div className="mt-8 pt-4 border-t border-[#EBEBEB] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-5 py-3 rounded-full bg-white border border-[#D1D1D6] text-xs sm:text-sm font-semibold text-[#0A0A0A] disabled:opacity-30 hover:bg-[#F2F2F2] transition-colors"
          >
            ← Question précédente
          </button>

          {currentIndex < QUESTIONS_V1.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!currentAnswer}
              className="px-6 py-3 rounded-full bg-[#EC663B] hover:bg-[#d4562e] disabled:opacity-40 text-xs sm:text-sm font-bold text-white transition-all shadow-md shadow-[#EC663B]/20"
            >
              Suivante →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitFinal}
              disabled={!isComplete || isSubmitting}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#EC663B] to-[#00C2A8] text-white font-extrabold text-sm sm:text-base shadow-xl disabled:opacity-50 transition-all transform hover:scale-105"
            >
              {isSubmitting ? "Envoi du diagnostic..." : "Finaliser mon diagnostic →"}
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
