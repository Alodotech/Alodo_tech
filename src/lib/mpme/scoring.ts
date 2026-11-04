import {
  DiagnosticAnswer,
  DiagnosticReport,
  DimensionScore,
} from "./types";
import { DIMENSIONS, QUESTIONS_V1 } from "./questions";
import { buildNarrative } from "./narrative";

export function calculateDiagnosticScore(
  companyName: string,
  answers: DiagnosticAnswer[]
): DiagnosticReport {
  const answerMap = new Map(answers.map((a) => [a.questionId, a.value]));

  // Calculate score for each dimension
  const dimensionScores: DimensionScore[] = DIMENSIONS.map((dim) => {
    const dimQuestions = QUESTIONS_V1.filter((q) => q.dimensionId === dim.id);
    let totalDimScore = 0;
    let totalWeight = 0;

    for (const q of dimQuestions) {
      const ansVal = answerMap.get(q.id);
      const opt = q.options?.find((o) => o.value === ansVal);
      const questionScore = opt ? opt.score : 0;
      totalDimScore += questionScore * (q.weight / 100);
      totalWeight += q.weight / 100;
    }

    const normalizedScore = totalWeight > 0 ? Math.round(totalDimScore / totalWeight) : 0;

    return {
      dimensionId: dim.id,
      title: dim.title,
      score: normalizedScore,
      level: getScoreLevel(normalizedScore),
      weight: dim.weight,
    };
  });

  // Calculate Global Weighted Score
  let globalWeighted = 0;
  let totalWeights = 0;

  for (const ds of dimensionScores) {
    globalWeighted += ds.score * (ds.weight / 100);
    totalWeights += ds.weight / 100;
  }

  const globalScore = Math.round(globalWeighted / totalWeights);
  const globalLevel = getScoreLevel(globalScore);
  const narrative = buildNarrative(answers);
  const finanScore = dimensionScores.find((dimension) => dimension.dimensionId === "financabilite")?.score ?? 0;

  const strengths = narrative.strengths.length > 0
    ? narrative.strengths
    : ["Information à approfondir : aucune force ne se déduit des réponses renseignées."];
  const watchpoints = narrative.watchpoints.length > 0
    ? narrative.watchpoints
    : ["Information à approfondir : aucun point faible ne se déduit des réponses renseignées."];

  return {
    id: `rep_${Date.now()}`,
    diagnosticId: `diag_${Date.now()}`,
    companyName: companyName || "Entreprise Candidate",
    globalScore,
    level: globalLevel,
    dimensionScores,
    strengths,
    weaknesses: watchpoints,
    topRisks: watchpoints,
    topPriorities: narrative.priorities.map((item) => item.action),
    actionPlan: narrative.actionPlan,
    fundingReadiness: {
      score: finanScore,
      analysis: narrative.fundingAnalysis,
    },
    alodoRecommendation: narrative.recommendation,
    summary: narrative.summary,
    checks: narrative.checks,
    dimensionReadings: narrative.dimensions.map((dimension) => ({
      dimensionId: dimension.dimensionId,
      title: dimension.title,
      niveau: dimension.niveau,
      text: dimension.text,
      action: dimension.action,
    })),
    generatedAt: new Date().toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

function getScoreLevel(
  score: number
): "Très faible" | "Fragile" | "En développement" | "Structuré" | "Très structuré" {
  if (score <= 20) return "Très faible";
  if (score <= 40) return "Fragile";
  if (score <= 60) return "En développement";
  if (score <= 80) return "Structuré";
  return "Très structuré";
}
