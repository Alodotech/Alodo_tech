"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/client";

function AdminLoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("error") === "unauthorized") {
      setErrorMessage("Accès restreint : Votre compte Google n'est pas autorisé en tant qu'administrateur.");
    }
  }, [searchParams]);

  // Check if already authenticated as admin
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.email) {
        const isWhitelisted =
          user.email === "germaindandji03@gmail.com" ||
          user.email === "germaindandji04@gmail.com" ||
          user.email.endsWith("@alodotech.com");

        const { data: admin } = await supabase
          .from("admins")
          .select("id")
          .eq("email", user.email)
          .single();
        if (admin || isWhitelisted) {
          router.replace("/admin/candidatures");
        }
      }
    };
    checkSession();
  }, [router]);

  // Google OAuth Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=/admin/candidatures`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Erreur de connexion.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#EBEBEB] text-center shadow-xl animate-in fade-in duration-200">
          {/* Official ALODO TECH Brand Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-5">
            <img
              src="/logo/logo.png"
              alt="ALODO TECH Logo"
              style={{ height: "36px", width: "auto" }}
            />
            <span className="text-xl font-bold tracking-tight">
              <span style={{ color: "var(--primary)" }}>ALODO</span>{" "}
              <span style={{ color: "var(--black)" }}>TECH</span>
            </span>
          </div>

          {/* Secure Admin Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAFA] border border-[#EBEBEB] text-[11px] font-semibold text-[#6E6E73] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#EC663B]" />
            Console Gouverneur · Espace Privé
          </div>

          {/* Headline */}
          <h1
            className="text-2xl font-extrabold text-[#0A0A0A] mb-2"
            style={{ margin: "0 0 8px 0" }}
          >
            Connexion Administrateur
          </h1>

          <p className="text-xs sm:text-sm text-[#6E6E73] mb-8 leading-relaxed max-w-xs mx-auto">
            Accès sécurisé réservé aux membres de la direction ALODO TECH pour la gestion du Programme MPME.
          </p>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-left leading-relaxed">
              {errorMessage}
            </div>
          )}

          {/* Google Sign-in Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-4 px-6 rounded-full border border-[#D1D1D6] hover:border-[#0A0A0A] bg-white hover:bg-[#FAFAFA] text-[#0A0A0A] font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-sm hover:shadow-md disabled:opacity-70 cursor-pointer active:scale-[0.99]"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24">
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
            )}
            <span>Continuer avec Google</span>
          </button>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-[#6E6E73] text-sm font-sans">
          Chargement de l'espace administrateur...
        </div>
      }
    >
      <AdminLoginInner />
    </Suspense>
  );
}
