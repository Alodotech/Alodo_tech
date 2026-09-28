import { NextResponse } from "next/server";
import { calculateDiagnosticScore } from "@/lib/mpme/scoring";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyName, answers } = body;

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { success: false, message: "Réponses du diagnostic manquantes ou invalides." },
        { status: 400 }
      );
    }

    const report = calculateDiagnosticScore(companyName || "Entreprise", answers);
    return NextResponse.json({ success: true, report });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erreur lors du calcul du score." },
      { status: 500 }
    );
  }
}
