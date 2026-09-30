"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CandidatureRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/mpme/diagnostic");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center font-sans">
      <div className="text-center p-8">
        <div className="w-8 h-8 border-2 border-[#EC663B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs sm:text-sm text-[#6E6E73]">
          Chargement du formulaire de diagnostic unifié...
        </p>
      </div>
    </div>
  );
}
