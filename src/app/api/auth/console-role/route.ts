import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/utils/supabase/server";
import { isListedAdmin } from "@/utils/supabase/isAdmin";
import { readFallbackRole } from "@/lib/staff/fallbackStore";

export async function GET() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const email = user?.email?.trim().toLowerCase() ?? "";
  if (!email.includes("@")) return NextResponse.json({ role: null });
  if (await isListedAdmin(supabase, email)) return NextResponse.json({ role: "admin" });

  const role = readFallbackRole(email);
  return NextResponse.json({ role });
}
