"use client";

import { createClient } from "@/utils/supabase/client";
import { getConsoleRole, type ConsoleRole } from "@/utils/supabase/isAdmin";

export async function resolveConsoleSession(): Promise<{ email: string; role: ConsoleRole } | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email) {
    window.location.href = "/admin/login";
    return null;
  }

  const role = await getConsoleRole(supabase, user.email);
  if (!role) {
    await supabase.auth.signOut();
    window.location.href = "/admin/login?error=unauthorized";
    return null;
  }

  return { email: user.email, role };
}
