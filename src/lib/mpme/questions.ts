import { DimensionMeta, Question } from "./types";

export const DIMENSIONS: DimensionMeta[] = [
  {
    id: "formalisation",
    title: "Formalisation & Légalité",
    weight: 10,
    description: "Existence légale (RCCM, IFU), situation fiscale, contrats et compte bancaire professionnel.",
    iconName: "FileText",
  },
  {
    id: "finance",
    title: "Pilotage Financier",
    weight: 15,
    description: "Maîtrise du chiffre d'affaires, marges, trésorerie, budget et prévisions financières.",
    iconName: "TrendingUp",
  },
  {
    id: "comptabilite",
    title: "Comptabilité & Rigueur",
    weight: 10,
    description: "Qualité de l'enregistrement des opérations, pièces justificatives et états financiers réguliers.",
    iconName: "BookOpen",
  },
  {
    id: "commercial",
    title: "Commercial & Ventes",
    weight: 15,
    description: "Stratégie d'acquisition client, conversion, fidélisation et processus de vente formalisé.",
    iconName: "Target",
  },
  {
    id: "digitalisation",
    title: "Digitalisation & Outils",
    weight: 10,
    description: "Usage effectif du numérique dans les opérations, paiements digitaux et automatisation.",
    iconName: "Cpu",
  },
  {
    id: "operations",
    title: "Opérations & Processus",
    weight: 15,
    description: "Organisation opérationnelle, documentation, gestion des stocks et autonomie du dirigeant.",
    iconName: "Layers",
  },
  {
    id: "rh",
    title: "Ressources Humaines",
    weight: 10,
    description: "Gestion des contrats, rôles, compétences, rémunération et dépendance aux personnes clés.",
    iconName: "Users",
  },
  {
    id: "financabilite",
    title: "Finançabilité & Levée de fonds",
    weight: 15,
    description: "Capacité de remboursement, solidité du dossier et maturité pour lever des fonds ou un crédit.",
    iconName: "ShieldCheck",
  },
];

export const QUESTIONS_V1: Question[] = [
  // 1. Formalisation
  {
    id: "form_1",
    dimensionId: "formalisation",
    subDimension: "Statut légal",
    text: "Votre entreprise dispose-t-elle d'un enregistrement officiel (RCCM, IFU) ?",
    type: "single_choice",
    required: true,
    weight: 35,
    options: [
      { value: "fully_registered", label: "Oui, RCCM et IFU à jour et actifs", score: 100 },
      { value: "in_progress", label: "En cours de régularisation / dossier déposé", score: 50 },
      { value: "none", label: "Non, activité encore informelle", score: 10 },
    ],
  },
  {
    id: "form_2",
    dimensionId: "formalisation",
    subDimension: "Banque",
    text: "Disposez-vous d'un compte bancaire professionnel dédié séparé de vos finances personnelles ?",
    type: "single_choice",
    required: true,
    weight: 35,
    options: [
      { value: "strictly_separated", label: "Oui, compte bancaire pro dédié et séparation stricte", score: 100 },
      { value: "mixed_pro_personal", label: "Oui, mais j'utilise parfois mon compte personnel", score: 45 },
      { value: "no_pro_account", label: "Non, tout transite par mes comptes personnels ou Mobile Money perso", score: 15 },
    ],
  },
  {
    id: "form_3",
    dimensionId: "formalisation",
    subDimension: "Contrats",
    text: "Vos contrats clés (clients majeurs, bail commercial, fournisseurs stratégiques) sont-ils formalisés par écrit ?",
    type: "single_choice",
    required: true,
    weight: 30,
    options: [
      { value: "all_written", label: "Oui, tous les contrats majeurs sont formalisés et signés", score: 100 },
      { value: "some_verbal", label: "En partie seulement, plusieurs accords restent oraux", score: 50 },
      { value: "mostly_verbal", label: "Non, la majorité repose sur la confiance verbale", score: 20 },
    ],
  },

  // 2. Finance
  {
    id: "fin_1",
    dimensionId: "finance",
    subDimension: "Visibilité trésorerie",
    text: "À quelle fréquence suivez-vous précisément vos encaissements, décaissements et solde de trésorerie ?",
    type: "single_choice",
    required: true,
    weight: 40,
    options: [
      { value: "daily_weekly", label: "Tous les jours ou chaque semaine avec un tableau de trésorerie", score: 100 },
      { value: "monthly", label: "Une fois par mois de manière globale", score: 60 },
      { value: "rarely", label: "Seulement quand la trésorerie devient tendue", score: 20 },
      { value: "none", label: "Je n'ai pas de visibilité chiffrée exacte en temps réel", score: 0 },
    ],
  },
  {
    id: "fin_2",
    dimensionId: "finance",
    subDimension: "Calcul des marges",
    text: "Connaissez-vous votre marge brute et votre seuil de rentabilité (point mort) par produit ou service ?",
    type: "single_choice",
    required: true,
    weight: 30,
    options: [
      { value: "exact", label: "Oui, calculé et réévalué avec précision", score: 100 },
      { value: "estimated", label: "J'ai une idée globale mais sans calcul formalisé", score: 50 },
      { value: "unknown", label: "Non, nous vendons sans calculer la marge nette exacte", score: 15 },
    ],
  },
  {
    id: "fin_3",
    dimensionId: "finance",
    subDimension: "Recouvrement créances",
    text: "Comment gérez-vous les créances clients et les retards de paiement ?",
    type: "single_choice",
    required: true,
    weight: 30,
    options: [
      { value: "strict_system", label: "Processus clair de relance, délais stricts et acomptes systématiques", score: 100 },
      { value: "manual_irregular", label: "Relances manuelles et retards fréquents subis", score: 45 },
      { value: "high_unpaid", label: "Problème récurrent de factures impayées pesant sur la trésorerie", score: 15 },
    ],
  },

  // 3. Comptabilité
  {
    id: "compta_1",
    dimensionId: "comptabilite",
    subDimension: "Enregistrement",
    text: "Comment vos opérations comptables sont-elles enregistrées ?",
    type: "single_choice",
    required: true,
    weight: 50,
    options: [
      { value: "software_expert", label: "Logiciel comptable + expert-comptable externe ou interne", score: 100 },
      { value: "excel_regular", label: "Feuilles Excel tenues régulièrement et archivées", score: 60 },
      { value: "paper_notebook", label: "Cahier de caisse papier / notes manuscrites", score: 30 },
      { value: "no_bookkeeping", label: "Pas d'enregistrement systématique", score: 0 },
    ],
  },
  {
    id: "compta_2",
    dimensionId: "comptabilite",
    subDimension: "États financiers",
    text: "Êtes-vous en mesure de fournir un bilan et un compte de résultat officiel certifié pour l'exercice écoulé ?",
    type: "single_choice",
    required: true,
    weight: 50,
    options: [
      { value: "available_certified", label: "Oui, états financiers complets et validés disponibles", score: 100 },
      { value: "drafts_only", label: "États financiers en cours ou provisoires non certifiés", score: 50 },
      { value: "not_available", label: "Non, aucun état financier officiel disponible", score: 10 },
    ],
  },

  // 4. Commercial
  {
    id: "comm_1",
    dimensionId: "commercial",
    subDimension: "Acquisition",
    text: "Quelle est votre principale source d'acquisition de nouveaux clients ?",
    type: "single_choice",
    required: true,
    weight: 50,
    options: [
      { value: "multi_channel", label: "Système multi-canal prévisible (marketing digital, prospection, partenariats)", score: 100 },
      { value: "word_of_mouth", label: "Principalement le bouche-à-oreille et les recommandations", score: 60 },
      { value: "unstable", label: "Flux de nouveaux clients irrégulier et difficile à prévoir", score: 25 },
    ],
  },
  {
    id: "comm_2",
    dimensionId: "commercial",
    subDimension: "Fidélisation & Suivi",
    text: "Disposez-vous d'une base de données clients qualifiée et d'un outil de suivi commercial (CRM / tableau de suivi) ?",
    type: "single_choice",
    required: true,
    weight: 50,
    options: [
      { value: "structured_crm", label: "Oui, base de données centralisée avec historique des achats et suivi des relances", score: 100 },
      { value: "contacts_whatsapp", label: "Mes clients sont surtout enregistrés dans mon téléphone / WhatsApp", score: 45 },
      { value: "no_database", label: "Aucun fichier client structuré ni suivi régulier", score: 15 },
    ],
  },

  // 5. Digitalisation
  {
    id: "dig_1",
    dimensionId: "digitalisation",
    subDimension: "Encaissement digital",
    text: "Acceptez-vous les paiements digitaux professionnels (Mobile Money Pro, virement, carte bancaire) ?",
    type: "single_choice",
    required: true,
    weight: 50,
    options: [
      { value: "automated_pro", label: "Oui, terminaux / marchands Mobile Money pro et traçabilité automatisée", score: 100 },
      { value: "personal_momo", label: "J'utilise surtout un numéro Mobile Money personnel", score: 45 },
      { value: "cash_mostly", label: "L'essentiel se fait en espèces physiques (cash)", score: 15 },
    ],
  },
  {
    id: "dig_2",
    dimensionId: "digitalisation",
    subDimension: "Outils collaboratifs",
    text: "Votre équipe utilise-t-elle des outils numériques de travail (Google Workspace, Trello, ERP léger, facturation en ligne) ?",
    type: "single_choice",
    required: true,
    weight: 50,
    options: [
      { value: "daily_tools", label: "Oui, outils collaboratifs intégrés à notre routine de travail", score: 100 },
      { value: "whatsapp_only", label: "Principalement WhatsApp pour coordonner le travail", score: 50 },
      { value: "minimal", label: "Non, gestion papier et échanges directs uniquement", score: 20 },
    ],
  },

  // 6. Opérations
  {
    id: "ops_1",
    dimensionId: "operations",
    subDimension: "Autonomie du dirigeant",
    text: "Si vous (le dirigeant) deviez vous absenter pendant 3 semaines consécutives, que devient l'entreprise ?",
    type: "single_choice",
    required: true,
    weight: 60,
    options: [
      { value: "autonomous", label: "L'activité tourne normalement grâce aux processus et à l'équipe en place", score: 100 },
      { value: "slowdown", label: "L'activité ralentit nettement et nécessite des arbitrages à distance", score: 45 },
      { value: "paralysis", label: "L'activité s'arrête ou subit de graves blocages opérationnels", score: 10 },
    ],
  },
  {
    id: "ops_2",
    dimensionId: "operations",
    subDimension: "Procédures écrites",
    text: "Vos processus clés (production, livraison, service client) sont-ils documentés sous forme de fiches de procédure ?",
    type: "single_choice",
    required: true,
    weight: 40,
    options: [
      { value: "documented", label: "Oui, processus clés documentés et appliqués par l'équipe", score: 100 },
      { value: "partial", label: "Quelques notes, mais l'essentiel est transmis à l'oral", score: 45 },
      { value: "none", label: "Aucune procédure écrite", score: 15 },
    ],
  },

  // 7. Ressources Humaines
  {
    id: "rh_1",
    dimensionId: "rh",
    subDimension: "Contrats & Droit du travail",
    text: "Vos collaborateurs réguliers disposent-ils d'un contrat de travail formel et d'une couverture sociale déclarée ?",
    type: "single_choice",
    required: true,
    weight: 50,
    options: [
      { value: "fully_compliant", label: "Oui, contrats formalisés et déclarations sociales effectuées", score: 100 },
      { value: "partially_compliant", label: "Une partie de l'équipe seulement (certains sont journaliers/informels)", score: 45 },
      { value: "informal", label: "Collaborateurs non formalisés ou rémunérés à la tâche", score: 15 },
    ],
  },
  {
    id: "rh_2",
    dimensionId: "rh",
    subDimension: "Fiches de poste",
    text: "Chaque membre de l'équipe a-t-il une fiche de poste claire avec des objectifs de performance définis ?",
    type: "single_choice",
    required: true,
    weight: 50,
    options: [
      { value: "clear_roles", label: "Oui, rôles, responsabilités et objectifs explicites", score: 100 },
      { value: "informal_roles", label: "Chacun sait à peu près quoi faire mais tout le monde fait un peu de tout", score: 45 },
      { value: "unclear", label: "Rôles flous entraînant des oublis ou des conflits réguliers", score: 15 },
    ],
  },

  // 8. Finançabilité
  {
    id: "finan_1",
    dimensionId: "financabilite",
    subDimension: "Dossier bancaire",
    text: "Si une banque ou un investisseur vous demandait aujourd'hui votre dossier financier complet, pourriez-vous le fournir sous 48h ?",
    type: "single_choice",
    required: true,
    weight: 50,
    options: [
      { value: "ready_48h", label: "Oui, états financiers, relevés bancaires pro et prévisionnel prêts", score: 100 },
      { value: "needs_work", label: "Il nous faudrait 2 à 4 semaines de travail de reconstruction", score: 45 },
      { value: "impossible", label: "Non, nos données ne sont pas prêtes pour une analyse externe", score: 10 },
    ],
  },
  {
    id: "finan_2",
    dimensionId: "financabilite",
    subDimension: "Besoin & rentabilité",
    text: "Avez-vous identifié un besoin de financement précis, chiffré et assorti d'un retour sur investissement calculé ?",
    type: "single_choice",
    required: true,
    weight: 50,
    options: [
      { value: "structured_need", label: "Oui, besoin précis (matériel, BFR, expansion) avec modèle de rentabilité", score: 100 },
      { value: "general_need", label: "Nous avons besoin de fonds pour grandir, mais sans plan d'affaires chiffré", score: 45 },
      { value: "no_plan", label: "Pas de besoin clair formalisé à ce stade", score: 20 },
    ],
  },
];
