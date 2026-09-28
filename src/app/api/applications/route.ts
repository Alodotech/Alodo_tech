import { NextResponse } from "next/server";
import { MpmeStorage } from "@/lib/mpme/storage";

export async function GET() {
  const applications = MpmeStorage.getApplications();
  return NextResponse.json({ success: true, applications });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Anti-spam honeypot
    if (body.honeypot) {
      return NextResponse.json({ success: true, message: "OK" });
    }

    if (!body.company?.name || !body.company?.email || !body.company?.phone) {
      return NextResponse.json(
        { success: false, message: "Nom, email et téléphone obligatoires." },
        { status: 400 }
      );
    }

    const cohort = MpmeStorage.getCohort();
    const newApplication = {
      id: `app_${Date.now()}`,
      companyId: `comp_${Date.now()}`,
      cohortId: cohort.id,
      status: "submitted" as const,
      submittedAt: new Date().toISOString(),
      company: body.company,
    };

    const res = MpmeStorage.saveApplication(newApplication);

    if (!res.success) {
      return NextResponse.json({ success: false, message: res.message }, { status: 409 });
    }

    return NextResponse.json({ success: true, application: newApplication }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
