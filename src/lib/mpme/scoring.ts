import {
  DiagnosticAnswer,
  DiagnosticReport,
  DimensionId,
  DimensionScore,
} from "./types";
import { DIMENSIONS, QUESTIONS_V1 } from "./questions";

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

  // Identify strengths (scores >= 70) and weaknesses (scores < 50)
  const sortedDims = [...dimensionScores].sort((a, b) => b.score - a.score);
  const strengths = sortedDims
    .filter((d) => d.score >= 60)
    .slice(0, 3)
    .map((d) => `${d.title} (Score: ${d.score}/100) — Base solide à consolider.`);

  if (strengths.length === 0) {
    strengths.push("Volonté de structuration et lucidité du dirigeant sur ses axes de progrès.");
  }

  const weaknesses = sortedDims
    .filter((d) => d.score < 60)
    .slice(-3)
    .reverse()
    .map((d) => `${d.title} (Score: ${d.score}/100) — Risque opérationnel nécessitant une intervention urgente.`);

  // Generate Top 3 Risks
  const topRisks: string[] = [];
  const dimMap = new Map(dimensionScores.map((d) => [d.dimensionId, d.score]));

  if ((dimMap.get("finance") || 0) < 50) {
    topRisks.push("Risque d'asphyxie financière : absence de suivi prévisionnel du cash et manque d'anticipation des creux de trésorerie.");
  }
  if ((dimMap.get("operations") || 0) < 50) {
    topRisks.push("Forte dépendance au dirigeant : vulnérabilité majeure en cas d'absence ou d'urgence opérationnelle.");
  }
  if ((dimMap.get("formalisation") || 0) < 50 || (dimMap.get("comptabilite") || 0) < 50) {
    topRisks.push("Fragilité juridique et fiscale : risque de redressement et blocage d'accès aux contrats institutionnels.");
  }
  if (topRisks.length < 3) {
    topRisks.push("Plafonnement de la croissance : absence de système d'acquisition client mesurable et prévisible.");
  }

  // Generate Top 3 Priorities
  const topPriorities: string[] = [
    "Mettre en place un tableau de bord de trésorerie hebdomadaire et séparer strictement les comptes personnels et professionnels.",
    "Structurer le suivi des prospects et automatiser la relance des factures impayées.",
    "Formaliser les fiches de poste et documenter les 3 processus opérationnels clés de l'entreprise.",
  ];

  // Action plan 30 - 60 - 90 days
  const actionPlan = {
    days30: [
      "Ouvrir ou assainir le compte bancaire professionnel dédié.",
      "Déployer un outil de suivi quotidien des encaissements / décaissements.",
      "Recenser et formaliser la liste exacte des créances clients en retard.",
    ],
    days60: [
      "Mettre en place un logiciel ou registre de facturation numérotée conforme.",
      "Structurer le fichier client et définir un processus d'acquisition régulier.",
      "Rédiger les contrats de travail ou conventions de collaboration pour l'équipe clé.",
    ],
    days90: [
      "Établir un budget prévisionnel à 12 mois avec scénarios de vente.",
      "Compiler le dossier de finançabilité (états financiers, plan de trésorerie, présentation d'activité).",
      "Engager une première démarche auprès d'un partenaire bancaire ou d'un programme d'accompagnement ALODO.",
    ],
  };

  // Funding Readiness
  const finanScore = dimMap.get("financabilite") || 0;
  const fundingReadiness = {
    score: finanScore,
    analysis:
      finanScore >= 70
        ? "Dossier solide. L'entreprise dispose des éléments clés pour solliciter une ligne de crédit ou un investissement structuré."
        : finanScore >= 45
        ? "Maturité intermédiaire. Quelques points critiques (comptabilité certifiée et visibilité de trésorerie) doivent être résolus avant de solliciter un financement."
        : "Non éligible à court terme. Priorité absolue à la formalisation et à la stabilisation de la trésorerie avant toute recherche de fonds.",
  };

  const alodoRecommendation =
    globalScore < 45
      ? "Programme d'accompagnement Fondations : structuration juridique, comptable et mise sous contrôle de la trésorerie."
      : globalScore < 70
      ? "Programme d'accompagnement Croissance : optimisation commerciale, digitalisation des opérations et préparation au financement."
      : "Programme d'accompagnement Expansion : structuration de gouvernance, levée de fonds et mise à l'échelle.";

  return {
    id: `rep_${Date.now()}`,
    diagnosticId: `diag_${Date.now()}`,
    companyName: companyName || "Entreprise Candidate",
    globalScore,
    level: globalLevel,
    dimensionScores,
    strengths,
    weaknesses,
    topRisks: topRisks.slice(0, 3),
    topPriorities,
    actionPlan,
    fundingReadiness,
    alodoRecommendation,
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
