"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string, name: string) => void;
  title?: string;
  subtitle?: string;
  nextUrl?: string;
}

export default function GoogleAuthModal({
  isOpen,
  onClose,
  onSuccess,
  title = "Connexion avec Google",
  subtitle = "Connectez-vous pour postuler au programme ALODO MPME",
  nextUrl = "/mpme/dashboard",
}: GoogleAuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // Real Supabase Google Auth
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const supabase = createClient();
    
    // Determine the callback URL based on the current environment
    const redirectTo = `${window.location.origin}/auth/callback?next=${nextUrl}`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });

    if (error) {
      console.error("Erreur de connexion Google:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl border border-[#EBEBEB] shadow-2xl max-w-sm w-full overflow-hidden p-6 sm:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="flex justify-end -mt-2 -mr-2">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#8E8E93] hover:text-[#0A0A0A] hover:bg-[#F2F2F2] transition-colors disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* Google G Logo */}
        <div className="w-14 h-14 rounded-2xl bg-white border border-[#EBEBEB] shadow-sm flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24">
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
        </div>

        <h2 className="text-xl font-extrabold text-[#0A0A0A] mb-1">{title}</h2>
        <p className="text-xs text-[#6E6E73] mb-6 leading-relaxed">{subtitle}</p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-full border border-[#D1D1D6] hover:border-[#0A0A0A] bg-white hover:bg-[#FAFAFA] text-[#0A0A0A] font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin"></span>
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
            <span>{isLoading ? "Connexion en cours..." : "Continuer avec Google"}</span>
          </button>
        </div>

        <p className="text-[10px] text-[#A1A1A6] mt-6">
          ALODO TECH utilise l'authentification Google sécurisée pour valider votre identité.
        </p>
      </div>
    </div>
  );
}

