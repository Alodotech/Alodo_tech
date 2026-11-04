import { DiagnosticAnswer, DimensionReading } from "./types";
import { DIMENSIONS, QUESTIONS_V1 } from "./questions";

export type Niveau = DimensionReading["niveau"];

export interface PriorityAction {
  priorite: "Haute" | "Moyenne";
  couleur: string;
  action: string;
  objectif: string;
  echeance: string;
}

export interface NarrativeDimension extends DimensionReading {
  num: string;
  observation: string;
  constat: string;
}

export interface Narrative {
  summary: string;
  meaning: string;
  conclusion: string;
  strengths: string[];
  watchpoints: string[];
  checks: string[];
  priorities: PriorityAction[];
  actionPlan: { days30: string[]; days60: string[]; days90: string[] };
  dimensions: NarrativeDimension[];
  fundingAnalysis: string;
  recommendation: string;
}

type Polarity = "strong" | "watch" | "gap" | "info";

interface AnswerReading {
  fact: string;
  clause: string;
  polarity: Polarity;
  action?: string;
  objectif?: string;
}

const READINGS: Record<string, Record<string, AnswerReading>> = {
  form_1: {
    fully_registered: {
      fact: "Formalisation juridique à jour (RCCM et IFU).",
      clause: "le cadre juridique est à jour (RCCM et IFU)",
      polarity: "strong",
    },
    in_progress: {
      fact: "Enregistrement officiel en cours de régularisation.",
      clause: "l'enregistrement officiel est en cours de régularisation",
      polarity: "watch",
      action: "Finaliser l'enregistrement RCCM et IFU.",
      objectif: "Disposer d'un cadre juridique à jour, comme indiqué dans le formulaire.",
    },
    none: {
      fact: "Activité pas encore officiellement enregistrée.",
      clause: "l'activité n'est pas encore officiellement enregistrée",
      polarity: "gap",
      action: "Engager l'enregistrement officiel (RCCM et IFU).",
      objectif: "Répondre à l'absence d'enregistrement déclarée.",
    },
  },
  form_2: {
    strictly_separated: {
      fact: "Séparation des finances personnelles et professionnelles.",
      clause: "les finances de l'entreprise sont séparées des finances personnelles",
      polarity: "strong",
    },
    mixed_pro_personal: {
      fact: "Compte professionnel existant, mais finances personnelles et professionnelles encore mélangées.",
      clause: "un compte professionnel existe, mais les finances personnelles et professionnelles se mélangent encore",
      polarity: "watch",
      action: "Séparer les mouvements personnels et professionnels sur le compte de l'entreprise.",
      objectif: "Corriger le mélange de finances déclaré.",
    },
    no_pro_account: {
      fact: "Pas de compte dédié à l'entreprise.",
      clause: "il n'y a pas de compte dédié à l'entreprise",
      polarity: "gap",
      action: "Ouvrir un compte dédié à l'entreprise.",
      objectif: "Répondre à l'absence de compte professionnel déclarée.",
    },
  },
  form_3: {
    all_written: {
      fact: "Principaux accords écrits et signés.",
      clause: "les principaux accords sont écrits",
      polarity: "strong",
    },
    some_verbal: {
      fact: "Certains engagements restent verbaux.",
      clause: "certains engagements restent à formaliser",
      polarity: "watch",
      action: "Mettre par écrit les accords encore verbaux avec clients, fournisseurs ou propriétaire.",
      objectif: "Formaliser les accords que le dirigeant dit encore verbaux.",
    },
    mostly_verbal: {
      fact: "La plupart des accords restent verbaux.",
      clause: "la plupart des accords restent verbaux",
      polarity: "gap",
      action: "Écrire les principaux accords aujourd'hui seulement verbaux.",
      objectif: "Répondre à l'absence d'accords écrits déclarée.",
    },
  },
  fin_1: {
    daily_weekly: {
      fact: "Suivi régulier des entrées et sorties d'argent.",
      clause: "le suivi des entrées et sorties est régulier",
      polarity: "strong",
    },
    general_idea: {
      fact: "Idée générale de la trésorerie, sans suivi régulier.",
      clause: "la trésorerie n'est pas suivie régulièrement",
      polarity: "watch",
      action: "Mettre en place un suivi régulier des entrées et des sorties.",
      objectif: "Passer de l'idée générale déclarée à un suivi régulier.",
    },
    when_tight: {
      fact: "Trésorerie consultée surtout en cas de tension.",
      clause: "la trésorerie n'est regardée que lorsqu'elle se tend",
      polarity: "gap",
      action: "Suivre les entrées et sorties sur un rythme fixe, pas seulement en cas de tension.",
      objectif: "Répondre au suivi de trésorerie déclaré comme occasionnel.",
    },
    none: {
      fact: "Pas de suivi précis de la trésorerie.",
      clause: "il n'y a pas de suivi précis de la trésorerie",
      polarity: "gap",
      action: "Mettre en place un suivi des entrées et des sorties.",
      objectif: "Répondre à l'absence de suivi de trésorerie déclarée.",
    },
  },
  fin_2: {
    exact: {
      fact: "Marges et seuil de rentabilité calculés et suivis.",
      clause: "les marges et le seuil de rentabilité sont calculés",
      polarity: "strong",
    },
    estimated: {
      fact: "Marges estimées, sans calcul formalisé.",
      clause: "les marges ne sont pas formalisées",
      polarity: "watch",
      action: "Calculer les marges et le seuil de rentabilité.",
      objectif: "Remplacer l'estimation déclarée par un calcul suivi.",
    },
    none: {
      fact: "Marges et seuil de rentabilité non connus.",
      clause: "les marges et le seuil de rentabilité ne sont pas connus",
      polarity: "gap",
      action: "Calculer les marges et le seuil de rentabilité.",
      objectif: "Répondre à l'absence de calcul des marges déclarée.",
    },
  },
  fin_3: {
    strict_system: {
      fact: "Relance organisée des retards de paiement.",
      clause: "les retards de paiement font l'objet d'une relance organisée",
      polarity: "strong",
    },
    case_by_case: {
      fact: "Relance des clients au cas par cas.",
      clause: "les relances clients se font au cas par cas",
      polarity: "watch",
      action: "Organiser le suivi des factures impayées et les relances.",
      objectif: "Structurer les relances aujourd'hui faites au cas par cas.",
    },
    high_delay: {
      fact: "Retards de paiement clients fréquents, avec impact sur la trésorerie.",
      clause: "les retards de paiement des clients sont fréquents",
      polarity: "gap",
      action: "Recenser les créances en retard et organiser leur relance.",
      objectif: "Répondre aux retards de paiement déclarés comme fréquents.",
    },
  },
  compta_1: {
    software_expert: {
      fact: "Comptabilité tenue avec un logiciel ou un professionnel.",
      clause: "la comptabilité est tenue avec un logiciel ou un professionnel",
      polarity: "strong",
    },
    excel_regular: {
      fact: "Comptabilité suivie sur un tableau.",
      clause: "la comptabilité est suivie sur un tableau",
      polarity: "watch",
      action: "Faire relire le tableau de suivi par un professionnel et en tirer les états utiles.",
      objectif: "Consolider le suivi sur tableau déclaré.",
    },
    paper_notebook: {
      fact: "Comptabilité tenue sur un cahier ou des notes.",
      clause: "la comptabilité reste peu structurée (cahier ou notes)",
      polarity: "gap",
      action: "Reprendre la comptabilité tenue sur cahier dans un suivi structuré.",
      objectif: "Répondre au suivi comptable déclaré sur cahier ou notes.",
    },
    no_bookkeeping: {
      fact: "Pas de suivi comptable régulier.",
      clause: "il n'y a pas de suivi comptable régulier",
      polarity: "gap",
      action: "Mettre en place un suivi comptable régulier.",
      objectif: "Répondre à l'absence de suivi comptable déclarée.",
    },
  },
  compta_2: {
    available_certified: {
      fact: "Derniers états financiers disponibles.",
      clause: "les derniers états financiers sont disponibles",
      polarity: "strong",
    },
    drafts_only: {
      fact: "États financiers en cours de préparation.",
      clause: "les états financiers sont en cours de préparation",
      polarity: "watch",
      action: "Terminer les états financiers indiqués comme en cours de préparation.",
      objectif: "Aboutir les états financiers pas encore disponibles.",
    },
    not_available: {
      fact: "Derniers états financiers non disponibles.",
      clause: "les états financiers récents ne sont pas disponibles",
      polarity: "gap",
      action: "Établir les états financiers, aujourd'hui non disponibles.",
      objectif: "Répondre à l'absence d'états financiers déclarée.",
    },
  },
  fisc_1: {
    on_time_regular: {
      fact: "Obligations fiscales suivies dans les délais.",
      clause: "les obligations fiscales sont suivies dans les délais",
      polarity: "strong",
    },
    general_irregular: {
      fact: "Déclarations fiscales généralement faites, mais suivi irrégulier.",
      clause: "les déclarations fiscales sont généralement faites, mais le suivi n'est pas régulier",
      polarity: "watch",
      action: "Fixer un calendrier des déclarations et paiements fiscaux.",
      objectif: "Rendre régulier le suivi fiscal déclaré comme irrégulier.",
    },
    struggling_deadlines: {
      fact: "Difficulté à suivre les obligations fiscales et leurs échéances.",
      clause: "les échéances fiscales sont difficiles à tenir",
      polarity: "gap",
      action: "Lister les obligations fiscales et leurs échéances.",
      objectif: "Répondre aux difficultés déclarées sur les échéances fiscales.",
    },
    unknown_obligations: {
      fact: "Obligations fiscales pas clairement identifiées.",
      clause: "les obligations fiscales ne sont pas clairement identifiées",
      polarity: "gap",
      action: "Identifier les obligations fiscales applicables à l'entreprise.",
      objectif: "Répondre à l'incertitude déclarée sur les obligations fiscales.",
    },
  },
  fisc_2: {
    available_organized: {
      fact: "Justificatifs fiscaux classés et disponibles.",
      clause: "les justificatifs fiscaux sont classés",
      polarity: "strong",
    },
    available_improvable: {
      fact: "Justificatifs fiscaux disponibles, classement à améliorer.",
      clause: "les justificatifs fiscaux existent, mais leur classement reste à améliorer",
      polarity: "watch",
      action: "Classer les justificatifs fiscaux déjà disponibles.",
      objectif: "Améliorer le classement déclaré comme perfectible.",
    },
    missing_hard_to_find: {
      fact: "Justificatifs fiscaux manquants ou difficiles à retrouver.",
      clause: "plusieurs justificatifs fiscaux manquent ou sont difficiles à retrouver",
      polarity: "gap",
      action: "Rassembler et classer les justificatifs fiscaux manquants.",
      objectif: "Répondre aux justificatifs déclarés manquants.",
    },
    none_kept: {
      fact: "Justificatifs fiscaux peu ou pas conservés.",
      clause: "les justificatifs fiscaux ne sont presque pas conservés",
      polarity: "gap",
      action: "Mettre en place la conservation des justificatifs fiscaux.",
      objectif: "Répondre à l'absence de conservation déclarée.",
    },
  },
  comm_1: {
    multi_channel: {
      fact: "Nouveaux clients obtenus par plusieurs canaux.",
      clause: "les nouveaux clients arrivent par plusieurs canaux",
      polarity: "strong",
    },
    word_of_mouth: {
      fact: "Clientèle acquise principalement par recommandation.",
      clause: "la clientèle vient principalement du bouche-à-oreille",
      polarity: "info",
    },
    irregular: {
      fact: "Arrivée irrégulière des nouveaux clients.",
      clause: "les nouveaux clients arrivent de façon irrégulière",
      polarity: "gap",
      action: "Noter d'où viennent les clients et ce qui déclenche une vente.",
      objectif: "Éclairer l'arrivée irrégulière de clients déclarée.",
    },
  },
  comm_2: {
    structured_tool: {
      fact: "Suivi des clients organisé dans un fichier ou un outil.",
      clause: "le suivi des clients est organisé",
      polarity: "strong",
    },
    phone_whatsapp: {
      fact: "Informations clients conservées dans le téléphone ou WhatsApp.",
      clause: "le suivi commercial reste peu structuré (téléphone ou WhatsApp)",
      polarity: "watch",
      action: "Sortir le fichier clients du téléphone et de WhatsApp vers un suivi unique.",
      objectif: "Structurer le suivi clients déclaré comme dispersé.",
    },
    no_system: {
      fact: "Pas de système organisé pour suivre les clients.",
      clause: "il n'y a pas de suivi organisé des clients",
      polarity: "gap",
      action: "Créer un fichier des clients et de leur historique.",
      objectif: "Répondre à l'absence de suivi clients déclarée.",
    },
  },
  dig_1: {
    momo_pro_bank: {
      fact: "Utilisation de moyens de paiement numériques.",
      clause: "les paiements passent par des moyens numériques professionnels",
      polarity: "strong",
    },
    momo_perso: {
      fact: "Paiements principalement reçus sur un Mobile Money personnel.",
      clause: "les paiements passent surtout par un Mobile Money personnel",
      polarity: "watch",
      action: "Recevoir les paiements de l'entreprise sur un compte professionnel.",
      objectif: "Sortir les encaissements du Mobile Money personnel déclaré.",
    },
    cash_mostly: {
      fact: "Paiements principalement reçus en espèces.",
      clause: "les paiements se font principalement en espèces",
      polarity: "gap",
      action: "Tracer les encaissements, aujourd'hui principalement en espèces.",
      objectif: "Rendre visibles les paiements déclarés en espèces.",
    },
  },
  dig_2: {
    digital_tools: {
      fact: "Travail suivi avec plusieurs outils numériques.",
      clause: "le travail est suivi avec plusieurs outils numériques",
      polarity: "strong",
    },
    whatsapp_only: {
      fact: "Organisation interne surtout limitée à WhatsApp.",
      clause: "l'organisation interne repose surtout sur WhatsApp",
      polarity: "watch",
      action: "Identifier les suivis qui ne devraient plus reposer seulement sur WhatsApp.",
      objectif: "Dépasser l'organisation interne déclarée comme limitée à WhatsApp.",
    },
    paper_informal: {
      fact: "Travail principalement sur papier ou de manière informelle.",
      clause: "le travail reste principalement sur papier ou informel",
      polarity: "gap",
      action: "Choisir un support de suivi unique pour les tâches aujourd'hui informelles.",
      objectif: "Répondre au fonctionnement papier ou informel déclaré.",
    },
  },
  ops_1: {
    normal_run: {
      fact: "L'activité peut continuer en l'absence du dirigeant.",
      clause: "l'activité peut continuer en l'absence du dirigeant",
      polarity: "strong",
    },
    slowdown_remote: {
      fact: "Dépendance partielle au dirigeant : l'activité ralentit en son absence.",
      clause: "il existe une dépendance partielle au dirigeant",
      polarity: "watch",
      action: "Désigner qui décide pendant une absence du dirigeant.",
      objectif: "Réduire le ralentissement déclaré en cas d'absence.",
    },
    stop_disrupted: {
      fact: "L'activité serait fortement perturbée ou arrêtée sans le dirigeant.",
      clause: "l'activité s'arrêterait ou serait fortement perturbée sans le dirigeant",
      polarity: "gap",
      action: "Lister les tâches qui s'arrêtent en l'absence du dirigeant et désigner un relais.",
      objectif: "Répondre à l'arrêt d'activité déclaré en cas d'absence.",
    },
  },
  ops_2: {
    documented_followed: {
      fact: "Principales tâches documentées et suivies.",
      clause: "les principales tâches sont documentées",
      polarity: "strong",
    },
    partially_written: {
      fact: "Procédures opérationnelles incomplètement formalisées.",
      clause: "les procédures opérationnelles sont incomplètement formalisées",
      polarity: "watch",
      action: "Écrire les tâches principales encore laissées aux habitudes.",
      objectif: "Compléter les procédures déclarées comme seulement partielles.",
    },
    oral_only: {
      fact: "Tâches principalement expliquées à l'oral.",
      clause: "les tâches sont principalement expliquées à l'oral",
      polarity: "gap",
      action: "Écrire la façon de réaliser les principales tâches.",
      objectif: "Répondre à l'absence de procédures écrites déclarée.",
    },
  },
  rh_1: {
    all_declared: {
      fact: "Employés déclarés et sous contrat.",
      clause: "les employés sont déclarés et ont un contrat",
      polarity: "strong",
    },
    partially_declared: {
      fact: "Une partie seulement des relations de travail est formalisée.",
      clause: "la formalisation administrative des relations de travail reste à renforcer",
      polarity: "watch",
      action: "Régulariser les employés déclarés sans contrat, ou l'inverse.",
      objectif: "Compléter la formalisation partielle déclarée.",
    },
    not_formalized: {
      fact: "La plupart des employés ne sont pas formalisés.",
      clause: "la plupart des relations de travail ne sont pas formalisées",
      polarity: "gap",
      action: "Établir les contrats et déclarations manquants pour l'équipe.",
      objectif: "Répondre à l'absence de formalisation des employés déclarée.",
    },
  },
  rh_2: {
    clear_roles: {
      fact: "Rôles clairement définis au sein de l'équipe.",
      clause: "la répartition des responsabilités est claire",
      polarity: "strong",
    },
    overlapping_roles: {
      fact: "Rôles globalement connus, mais qui se chevauchent parfois.",
      clause: "les rôles se chevauchent parfois",
      polarity: "watch",
      action: "Écrire qui fait quoi pour les rôles qui se chevauchent.",
      objectif: "Clarifier les chevauchements de rôles déclarés.",
    },
    unclear_roles: {
      fact: "Rôles pas clairement définis.",
      clause: "les rôles ne sont pas clairement définis",
      polarity: "gap",
      action: "Définir le rôle de chaque personne de l'équipe.",
      objectif: "Répondre aux rôles déclarés comme non définis.",
    },
  },
  finan_1: {
    ready_now: {
      fact: "Principaux documents financiers indiqués comme disponibles.",
      clause: "les principaux documents financiers sont indiqués comme disponibles",
      polarity: "strong",
    },
    needs_weeks: {
      fact: "Documents financiers pas prêts : quelques semaines de préparation seraient nécessaires.",
      clause: "les documents financiers demanderaient quelques semaines de préparation",
      polarity: "watch",
      action: "Préparer les pièces financières que le dirigeant dit pouvoir réunir en quelques semaines.",
      objectif: "Aboutir les documents indiqués comme non prêts.",
    },
    not_organized: {
      fact: "Informations financières pas assez organisées pour un financeur.",
      clause: "les informations financières ne sont pas assez organisées pour être présentées",
      polarity: "gap",
      action: "Rassembler les pièces financières aujourd'hui pas organisées.",
      objectif: "Répondre au manque d'organisation financière déclaré.",
    },
  },
  finan_2: {
    structured_need: {
      fact: "Besoin de financement clairement identifié.",
      clause: "le besoin de financement est clairement identifié",
      polarity: "strong",
    },
    undefined_need: {
      fact: "Besoin de financement sans montant ni usage précis.",
      clause: "un besoin de financement est exprimé sans montant ni usage précis",
      polarity: "watch",
      action: "Chiffrer le besoin de financement et son usage.",
      objectif: "Préciser le besoin de financement déclaré comme encore flou.",
    },
    no_need_now: {
      fact: "Pas de besoin de financement précis pour le moment.",
      clause: "aucun besoin de financement précis n'est exprimé pour le moment",
      polarity: "info",
    },
  },
};

const EMPTY_BUCKET = "Aucune action de ce jalon ne se déduit des réponses renseignées.";

function answerValue(answers: DiagnosticAnswer[], questionId: string): string | undefined {
  const found = answers.find((answer) => answer.questionId === questionId);
  if (!found || found.value === undefined || found.value === null || found.value === "") return undefined;
  if (Array.isArray(found.value)) return undefined;
  return String(found.value);
}

function joinClauses(clauses: string[]): string {
  if (clauses.length <= 1) return clauses[0] ?? "";
  return `${clauses.slice(0, -1).join(", ")} et ${clauses[clauses.length - 1]}`;
}

function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function compose(clauses: { clause: string; polarity: Polarity }[], missing: number): string {
  if (clauses.length === 0) {
    return "Information à approfondir : les réponses de cette dimension n'ont pas été renseignées.";
  }
  const strong = clauses.filter((item) => item.polarity === "strong" || item.polarity === "info").map((item) => item.clause);
  const rest = clauses.filter((item) => item.polarity === "watch" || item.polarity === "gap").map((item) => item.clause);
  let sentence: string;
  if (strong.length > 0 && rest.length > 0) sentence = `${capitalize(joinClauses(strong))}, mais ${joinClauses(rest)}.`;
  else sentence = `${capitalize(joinClauses(strong.length > 0 ? strong : rest))}.`;
  if (missing > 0) {
    sentence += " Information à approfondir : une ou plusieurs questions de cette dimension n'ont pas été renseignées.";
  }
  return sentence;
}

export function buildNarrative(answers: DiagnosticAnswer[]): Narrative {
  const byQuestion = QUESTIONS_V1.map((question) => {
    const value = answerValue(answers, question.id);
    const reading = value ? READINGS[question.id]?.[value] : undefined;
    const option = question.options?.find((item) => item.value === value);
    return {
      question,
      value,
      reading: reading ?? null,
      score: option?.score ?? null,
      missing: !value,
      unknown: Boolean(value) && !reading,
    };
  });

  const documentsContradicted =
    answerValue(answers, "finan_1") === "ready_now" &&
    (answerValue(answers, "compta_2") === "not_available" ||
      answerValue(answers, "compta_1") === "paper_notebook" ||
      answerValue(answers, "compta_1") === "no_bookkeeping");

  const statementsContradicted =
    answerValue(answers, "compta_2") === "available_certified" &&
    (answerValue(answers, "compta_1") === "paper_notebook" ||
      answerValue(answers, "compta_1") === "no_bookkeeping");

  const checks: string[] = [];
  if (documentsContradicted) {
    checks.push(
      "Finançabilité : les principaux documents financiers sont indiqués comme disponibles, alors que la comptabilité déclarée (cahier, notes ou absence de suivi) et/ou l'absence d'états financiers ne le confirment pas. À vérifier lors de l'entretien."
    );
  }
  if (statementsContradicted) {
    checks.push(
      "Comptabilité : les états financiers sont indiqués comme disponibles, alors que le suivi déclaré est un cahier, des notes ou l'absence de suivi régulier. À vérifier lors de l'entretien."
    );
  }
  if (answerValue(answers, "form_1") === "none" && answerValue(answers, "fisc_1") === "on_time_regular") {
    checks.push(
      "Fiscalité : les obligations fiscales sont indiquées comme suivies dans les délais, alors que l'activité est déclarée non enregistrée. À vérifier lors de l'entretien."
    );
  }
  if (answerValue(answers, "form_1") === "none" && answerValue(answers, "rh_1") === "all_declared") {
    checks.push(
      "Ressources humaines : les employés sont indiqués comme déclarés et sous contrat, alors que l'activité est déclarée non enregistrée. À vérifier lors de l'entretien."
    );
  }

  const dimensions: NarrativeDimension[] = DIMENSIONS.map((dimension, index) => {
    const rows = byQuestion.filter((row) => row.question.dimensionId === dimension.id);
    const known = rows.filter((row) => row.reading);
    const missing = rows.filter((row) => row.missing || row.unknown).length;
    let text = compose(
      known.map((row) => ({ clause: row.reading!.clause, polarity: row.reading!.polarity })),
      missing
    );

    if (dimension.id === "financabilite" && documentsContradicted) {
      const need = known.find((row) => row.question.id === "finan_2");
      text = need
        ? `${capitalize(need.reading!.clause)}, mais la disponibilité et la cohérence des pièces financières sont à vérifier.`
        : "La disponibilité et la cohérence des pièces financières sont à vérifier.";
      if (missing > 0) {
        text += " Information à approfondir : une ou plusieurs questions de cette dimension n'ont pas été renseignées.";
      }
    }

    const actionable = known
      .filter((row) => row.reading!.action && !(documentsContradicted && row.question.id === "finan_1"))
      .sort((a, b) => (a.score ?? 100) - (b.score ?? 100));
    const action = actionable[0]?.reading!.action
      ?? (dimension.id === "financabilite" && documentsContradicted
        ? "Vérifier en entretien la cohérence entre les documents financiers annoncés et la comptabilité déclarée."
        : missing > 0
          ? "Information à approfondir lors de l'entretien."
          : "Aucune action ne se déduit des réponses de cette dimension.");

    const polarities = known.map((row) => row.reading!.polarity);
    let niveau: Niveau = "a_approfondir";
    if (known.length > 0) {
      if (polarities.some((item) => item === "gap") || (dimension.id === "financabilite" && documentsContradicted)) {
        niveau = "vigilance";
      } else if (polarities.some((item) => item === "watch")) {
        niveau = "moyen";
      } else {
        niveau = "solide";
      }
    }

    return {
      dimensionId: dimension.id,
      num: String(index + 1).padStart(2, "0"),
      title: dimension.title,
      niveau,
      text,
      observation: text,
      constat: text,
      action,
    };
  });

  const strengths = byQuestion
    .filter((row) => row.reading?.polarity === "strong")
    .filter((row) => !(documentsContradicted && row.question.id === "finan_1"))
    .filter((row) => !(statementsContradicted && row.question.id === "compta_2"))
    .map((row) => row.reading!.fact);

  const watchpoints = byQuestion
    .filter((row) => row.reading && (row.reading.polarity === "watch" || row.reading.polarity === "gap"))
    .sort((a, b) => (a.score ?? 100) - (b.score ?? 100))
    .map((row) => row.reading!.fact);

  const rankedActions = byQuestion
    .filter((row) => row.reading?.action && (row.reading.polarity === "watch" || row.reading.polarity === "gap"))
    .sort((a, b) => (a.score ?? 100) - (b.score ?? 100));

  const seen = new Set<string>();
  const priorities: PriorityAction[] = [];
  for (const row of rankedActions.slice(0, 6)) {
    const action = row.reading!.action!;
    if (seen.has(action)) continue;
    seen.add(action);
    const haute = (row.score ?? 100) < 40;
    const echeance = haute ? "0–30 jours" : priorities.filter((item) => item.priorite === "Moyenne").length < 2 ? "30–60 jours" : "60–90 jours";
    priorities.push({
      priorite: haute ? "Haute" : "Moyenne",
      couleur: haute ? "#DC2626" : "#EC663B",
      action,
      objectif: row.reading!.objectif || action,
      echeance,
    });
  }

  const bucket = (label: string) => {
    const items = priorities.filter((item) => item.echeance === label).map((item) => item.action);
    return items.length > 0 ? items : [EMPTY_BUCKET];
  };

  const strengthText = strengths.slice(0, 4).join(" ");
  const watchText = watchpoints.slice(0, 5).join(" ");
  const summaryParts = ["Cette première analyse repose uniquement sur les réponses du formulaire."];
  if (strengthText) summaryParts.push(`Elle fait ressortir : ${strengthText}`);
  if (watchText) summaryParts.push(`Les points à approfondir sont : ${watchText}`);
  if (!strengthText && !watchText) {
    summaryParts.push("Les réponses renseignées ne permettent pas encore de dégager un constat. Information à approfondir.");
  }
  if (checks.length > 0) {
    summaryParts.push("Certaines réponses se contredisent et sont signalées pour vérification en entretien, sans conclusion supplémentaire.");
  }

  const meaningParts: string[] = [];
  if (strengths.length > 0) meaningParts.push(`Les réponses confirment les points suivants : ${strengths.join(" ")}`);
  if (watchpoints.length > 0) meaningParts.push(`Les difficultés qui en découlent sont : ${watchpoints.join(" ")}`);
  if (checks.length > 0) meaningParts.push("Les écarts entre réponses sont laissés ouverts pour l'entretien.");
  if (meaningParts.length === 0) meaningParts.push("Information à approfondir : les réponses ne permettent pas encore de conclure.");

  const gapTitles = dimensions.filter((dimension) => dimension.niveau === "vigilance").map((dimension) => dimension.title);
  const watchTitles = dimensions.filter((dimension) => dimension.niveau === "moyen").map((dimension) => dimension.title);
  const recommendation = gapTitles.length > 0
    ? `Les réponses désignent en priorité : ${gapTitles.join(", ")}.`
    : watchTitles.length > 0
      ? `Les réponses indiquent des points à consolider : ${watchTitles.join(", ")}.`
      : "Les réponses renseignées ne font pas ressortir de difficulté prioritaire.";

  const funding = dimensions.find((dimension) => dimension.dimensionId === "financabilite");

  return {
    summary: summaryParts.join(" "),
    meaning: meaningParts.join(" "),
    conclusion: `${meaningParts.join(" ")} Ce rapport ne retient que ce que le formulaire permet d'affirmer.`,
    strengths,
    watchpoints,
    checks,
    priorities,
    actionPlan: {
      days30: bucket("0–30 jours"),
      days60: bucket("30–60 jours"),
      days90: bucket("60–90 jours"),
    },
    dimensions,
    fundingAnalysis: funding?.text ?? "Information à approfondir.",
    recommendation,
  };
}
