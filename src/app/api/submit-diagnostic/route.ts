import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { calculateDiagnosticScore } from "@/lib/mpme/scoring";
import { MpmeStorage } from "@/lib/mpme/storage";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formData, answers } = body;

    if (!formData || !formData.name || !formData.email || !formData.phone) {
      return NextResponse.json(
        { success: false, message: "Informations d'entreprise incomplètes." },
        { status: 400 }
      );
    }

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json(
        { success: false, message: "Réponses du diagnostic manquantes." },
        { status: 400 }
      );
    }

    // 1. Calculate Score & Action Plan
    const report = calculateDiagnosticScore(formData.name, answers);

    // 2. Initialize Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY !== 'your-service-role-key'
      ? process.env.SUPABASE_SERVICE_ROLE_KEY
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 3. Find active cohort
    const { data: cohortData } = await supabase.from("cohorts").select("id").eq("status", "open").limit(1).single();
    const cohortId = cohortData?.id || "c4464c20-7214-41d3-92f7-7b24cfeb631a";

    // 4. Insert Company
    const isFormalizedVal = answers.find((a: any) => a.questionId === "form_1")?.value !== "none";
    const hasProBankVal = answers.find((a: any) => a.questionId === "form_2")?.value === "strictly_separated";

    const companyPayload: any = {
      name: formData.name,
      leader_name: formData.leaderName || formData.name,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      city: formData.city || "Cotonou",
      sector: formData.sector || "Commerce & Distribution",
      year_created: Number(formData.yearCreated) || 2022,
      employees_count: formData.employeesCount || "3 à 5 personnes",
      monthly_revenue: formData.monthlyRevenue || "Moins de 1 000 000 FCFA / mois",
      is_formalized: isFormalizedVal,
      has_pro_bank_account: hasProBankVal,
      main_difficulties: [formData.sector || "Commerce", formData.city || "Cotonou"],
      single_biggest_problem: "Développement et structuration",
      motivation: `Programme MPME ALODO [Communauté MPME: ${formData.joinCommunity ? "Oui, souhaite rejoindre" : "Non, pas pour le moment"}]`,
      leader_availability: "Temps plein",
    };

    const { data: company, error: compErr } = await supabase
      .from("companies")
      .insert(companyPayload)
      .select("id")
      .single();

    if (compErr) {
      console.error("Erreur insertion company:", compErr);
    }

    const companyId = company?.id || `comp_${Date.now()}`;

    // 5. Insert Application
    const { data: application, error: appErr } = await supabase
      .from("applications")
      .insert({
        company_id: companyId,
        cohort_id: cohortId,
        status: "under_review",
      })
      .select("id")
      .single();

    if (appErr) {
      console.error("Erreur insertion application:", appErr);
    }

    const applicationId = application?.id || `app_${Date.now()}`;

    // 6. Insert Diagnostic
    if (application?.id) {
      const { error: diagErr } = await supabase.from("diagnostics").insert({
        application_id: application.id,
        status: "completed",
        answers: answers,
        global_score: report.globalScore,
        diagnostic_level: report.level,
        report_data: report,
        completed_at: new Date().toISOString(),
      });

      if (diagErr) {
        console.error("Erreur insertion diagnostic:", diagErr);
      }
    }

    return NextResponse.json({
      success: true,
      report,
      companyId,
      applicationId,
    });
  } catch (err: any) {
    console.error("Server submit-diagnostic error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Erreur serveur lors de la soumission." },
      { status: 500 }
    );
  }
}
