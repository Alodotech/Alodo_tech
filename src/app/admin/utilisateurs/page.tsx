"use client";

import { useEffect } from "react";
import { resolveConsoleSession } from "@/utils/supabase/guardConsole";

export default function FormerUsersPage() {
  useEffect(() => {
    resolveConsoleSession().then((session) => {
      if (!session) return;
      window.location.href = session.role === "partenaire" ? "/partenaire" : "/admin/partenaires";
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center font-sans">
      <span className="text-xs text-[#8E8E93] font-medium">Redirection...</span>
    </div>
  );
}
