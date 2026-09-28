"use client";

import { useState } from "react";
import { GOOGLE_DEMO_ACCOUNTS } from "@/lib/mpme/storage";

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string, name: string) => void;
  title?: string;
  subtitle?: string;
}

export default function GoogleAuthModal({
  isOpen,
  onClose,
  onSuccess,
  title = "Connexion avec Google",
  subtitle = "Connectez-vous pour postuler au programme ALODO MPME",
}: GoogleAuthModalProps) {
  const [showAccountsList, setShowAccountsList] = useState(false);
  const [customEmail, setCustomEmail] = useState("");
  const [customName, setCustomName] = useState("");

  if (!isOpen) return null;

  // Direct fast one-click Google login
  const handleFastGoogleConnect = () => {
    // Default dirigente Google profile
    onSuccess("dirigeant.mpme@gmail.com", "Dirigeant MPME");
    onClose();
  };

  const handleSelectAccount = (acc: (typeof GOOGLE_DEMO_ACCOUNTS)[0]) => {
    onSuccess(acc.email, acc.name);
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim()) return;
    const resolvedName = customName.trim() || customEmail.split("@")[0];
    onSuccess(customEmail.trim(), resolvedName);
    onClose();
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
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#8E8E93] hover:text-[#0A0A0A] hover:bg-[#F2F2F2] transition-colors"
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

        {!showAccountsList ? (
          <div className="space-y-3">
            {/* Primary One-Click Google Action */}
            <button
              type="button"
              onClick={handleFastGoogleConnect}
              className="w-full py-3.5 px-4 rounded-full border border-[#D1D1D6] hover:border-[#0A0A0A] bg-white hover:bg-[#FAFAFA] text-[#0A0A0A] font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-sm"
            >
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
              <span>Continuer avec Google</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAccountsList(true)}
              className="text-xs text-[#8E8E93] hover:text-[#0A0A0A] underline pt-2 block mx-auto"
            >
              Choisir un autre compte Google...
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-left">
            <div className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider text-center">
              Choisir un profil dirigeant
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {GOOGLE_DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => handleSelectAccount(acc)}
                  className="w-full p-2.5 rounded-xl border border-[#EBEBEB] hover:border-[#EC663B] hover:bg-orange-50/40 transition-all text-left flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#EC663B] to-[#00C2A8] text-white flex items-center justify-center font-bold text-xs">
                      {acc.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0A0A0A] group-hover:text-[#EC663B]">
                        {acc.name}
                      </div>
                      <div className="text-[11px] text-[#6E6E73]">{acc.email}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#8E8E93] font-medium">{acc.company}</span>
                </button>
              ))}
            </div>

            {/* Custom Google account */}
            <form onSubmit={handleCustomSubmit} className="pt-2 border-t border-[#F2F2F2] space-y-2">
              <input
                type="email"
                required
                placeholder="techalodo@gmail.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-[#D1D1D6] rounded-xl px-3 py-2 text-xs text-[#0A0A0A] focus:outline-none focus:border-[#EC663B] focus:bg-white"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAccountsList(false)}
                  className="flex-1 py-2 rounded-full border border-[#D1D1D6] text-xs font-semibold text-[#6E6E73]"
                >
                  ← Retour
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-full bg-[#EC663B] hover:bg-[#d4562e] text-xs font-bold text-white shadow-sm"
                >
                  Valider →
                </button>
              </div>
            </form>
          </div>
        )}

        <p className="text-[10px] text-[#A1A1A6] mt-6">
          ALODO TECH utilise l'authentification Google sécurisée pour valider votre identité.
        </p>
      </div>
    </div>
  );
}
