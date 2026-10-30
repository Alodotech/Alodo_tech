import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/utils/supabase/server";
import { getConsoleRole } from "@/utils/supabase/isAdmin";
import { listFallbackUsers, readFallbackRole } from "@/lib/staff/fallbackStore";

function serviceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    process.env.SUPABASE_SERVICE_ROLE_KEY !== "your-service-role-key"
      ? process.env.SUPABASE_SERVICE_ROLE_KEY
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;
  return createClient(url, key);
}

const STATUS_LABEL: Record<string, string> = {
  submitted: "Dossier déposé",
  under_review: "En analyse",
  shortlisted: "Présélectionnée",
  selected: "Retenue",
  rejected: "Non retenue",
  waitlisted: "Liste d'attente",
  diagnostic_pending: "Diagnostic en attente",
  diagnostic_completed: "Diagnostic terminé",
};

export async function GET() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const email = user?.email?.trim().toLowerCase() || "";
  const role = await getConsoleRole(supabase, email) ?? readFallbackRole(email);

  if (role !== "partenaire") {
    return NextResponse.json({ message: "Accès réservé à l'espace partenaire." }, { status: 403 });
  }

  const db = serviceClient();
  if (!db) return NextResponse.json({ message: "Supabase n'est pas configuré." }, { status: 500 });

  const { data: links, error: linkError } = await db
    .from("partner_assignments")
    .select("application_id")
    .ilike("partner_email", email);

  if (linkError && !/partner_assignments|schema cache|PGRST205/i.test(linkError.message)) {
    return NextResponse.json({ message: linkError.message }, { status: 500 });
  }

  const ids = linkError
    ? listFallbackUsers().find((item) => item.email === email)?.applicationIds || []
    : (links || []).map((row) => String(row.application_id)).filter(Boolean);
  if (ids.length === 0) return NextResponse.json({ mpmes: [] });

  const { data, error } = await db
    .from("applications")
    .select(`
      id,
      status,
      submitted_at,
      companies (
        name,
        leader_name,
        email,
        phone,
        whatsapp,
        city,
        sector,
        year_created,
        employees_count,
        monthly_revenue,
        is_formalized,
        has_pro_bank_account,
        main_difficulties,
        single_biggest_problem,
        motivation
      ),
      diagnostics (
        global_score,
        diagnostic_level
      )
    `)
    .in("id", ids);

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  const mpmes = (data || []).map((row: {
    id: string;
    status?: string;
    submitted_at?: string;
    companies?: Record<string, unknown> | Record<string, unknown>[] | null;
    diagnostics?: Record<string, unknown> | Record<string, unknown>[] | null;
  }) => {
    const company = (Array.isArray(row.companies) ? row.companies[0] : row.companies) || {};
    const diagnostic = (Array.isArray(row.diagnostics) ? row.diagnostics[0] : row.diagnostics) || {};
    const difficulties = company.main_difficulties;
    return {
      id: row.id,
      status: row.status || "submitted",
      statusLabel: STATUS_LABEL[row.status || ""] || row.status || "Dossier déposé",
      submittedAt: row.submitted_at || null,
      name: String(company.name || "Entreprise"),
      leaderName: String(company.leader_name || "Dirigeant"),
      email: String(company.email || ""),
      phone: String(company.phone || ""),
      whatsapp: String(company.whatsapp || company.phone || ""),
      city: String(company.city || ""),
      sector: String(company.sector || ""),
      yearCreated: company.year_created || null,
      employeesCount: String(company.employees_count || ""),
      monthlyRevenue: String(company.monthly_revenue || ""),
      isFormalized: Boolean(company.is_formalized),
      hasProBankAccount: Boolean(company.has_pro_bank_account),
      mainDifficulties: Array.isArray(difficulties) ? difficulties.map(String) : [],
      singleBiggestProblem: String(company.single_biggest_problem || ""),
      motivation: String(company.motivation || ""),
      diagnosticScore: Number(diagnostic.global_score || 0),
      diagnosticLevel: String(diagnostic.diagnostic_level || ""),
    };
  });

  return NextResponse.json({ mpmes });
}
