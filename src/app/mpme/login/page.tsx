"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAuthModal from "@/components/GoogleAuthModal";
import { MpmeStorage } from "@/lib/mpme/storage";

export default function MpmeLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const res = MpmeStorage.loginWithEmail(email, password);
    if (!res.success) {
      setErrorMsg(res.message || "Identifiants invalides.");
      setLoading(false);
      return;
    }

    if (res.user?.role === "Admin") {
      router.push("/admin/candidatures");
    } else {
      router.push("/mpme/dashboard");
    }
  };

  const handleGoogleSuccess = (selectedEmail: string, selectedName: string) => {
    setErrorMsg("");
    setLoading(true);
    MpmeStorage.loginWithGoogle(selectedEmail, selectedName);
    router.push("/mpme/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] flex flex-col font-sans">
      <Navbar activeKey="mpme" />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#EBEBEB] shadow-xl">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-[#EC663B] font-bold">
              Espace MPME
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 text-[#0A0A0A]">
              Connexion Dirigeant
            </h1>
            <p className="text-xs text-[#6E6E73] mt-2">
              Accédez à votre dossier de candidature, au diagnostic et à votre rapport d'audit.
            </p>
          </div>

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

          {/* GOOGLE SIGN-IN BUTTON */}
          <button
            type="button"
            onClick={() => setShowGoogleModal(true)}
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-full border border-[#D1D1D6] hover:bg-[#FAFAFA] bg-white text-[#0A0A0A] font-semibold text-xs sm:text-sm flex items-center justify-center gap-3 transition-colors shadow-xs"
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

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#EBEBEB]" />
            </div>
            <span className="relative bg-white px-3 text-xs text-[#A1A1A6]">
              ou avec votre email
            </span>
          </div>

          {/* EMAIL & PASSWORD FORM */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                Adresse email
              </label>
              <input
                type="email"
                required
                placeholder="votre.email@entreprise.bj"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#EC663B] hover:bg-[#d4562e] disabled:opacity-50 text-white font-bold rounded-full text-xs sm:text-sm shadow-md shadow-[#EC663B]/20 transition-all mt-2"
            >
              {loading ? "Connexion en cours..." : "Se connecter →"}
            </button>
          </form>

          {/* QUICK LINKS */}
          <div className="mt-8 pt-6 border-t border-[#EBEBEB] text-center space-y-2">
            <p className="text-xs text-[#6E6E73]">
              Pas encore candidat à la Cohorte 1 ?{" "}
              <Link href="/mpme/candidature" className="text-[#EC663B] font-semibold hover:underline">
                Postuler au programme (5 min)
              </Link>
            </p>

            <button
              type="button"
              onClick={() => {
                setEmail("admin@alodo.tech");
                setPassword("alodo2026");
              }}
              className="text-[11px] text-[#A1A1A6] hover:text-[#0A0A0A] underline"
            >
              Démo : Remplir identifiants Admin ALODO
            </button>
          </div>
        </div>
      </main>

      <GoogleAuthModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onSuccess={handleGoogleSuccess}
      />

      <Footer />
    </div>
  );
}
