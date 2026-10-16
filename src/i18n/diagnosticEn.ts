export const DIM_TITLE_EN: Record<string, string> = {
  formalisation: "Formalization",
  finance: "Finance",
  comptabilite: "Accounting",
  fiscalite: "Tax & compliance",
  commercial: "Commercial",
  digitalisation: "Digitalization",
  operations: "Operations",
  rh: "Human resources",
  financabilite: "Bankability",
};

export const SECTOR_EN: Record<string, string> = {
  "Commerce & Distribution": "Trade & distribution",
  "Agriculture & Agroalimentaire": "Agriculture & food",
  "Restauration & Hôtellerie": "Food service & hospitality",
  "Services aux entreprises & B2B": "Business services & B2B",
  "Artisanat & Métiers d'art": "Crafts & applied arts",
  "Transport & Logistique": "Transport & logistics",
  "BTP & Immobilier": "Construction & real estate",
  "Santé & Bien-être": "Health & wellness",
  "Technologies & Numérique": "Technology & digital",
  "Éducation & Formation": "Education & training",
  "Mode, Textile & Habillement": "Fashion, textile & apparel",
  "Autre secteur": "Other sector",
};

export const REVENUE_EN: Record<string, string> = {
  "Moins de 1 000 000 FCFA / mois": "Under 1,000,000 FCFA / month",
  "1 000 000 à 3 000 000 FCFA / mois": "1,000,000 to 3,000,000 FCFA / month",
  "3 000 000 à 10 000 000 FCFA / mois": "3,000,000 to 10,000,000 FCFA / month",
  "10 000 000 à 25 000 000 FCFA / mois": "10,000,000 to 25,000,000 FCFA / month",
  "Plus de 25 000 000 FCFA / mois": "Over 25,000,000 FCFA / month",
};

export const STAFF_EN: Record<string, string> = {
  "1 à 2 personnes": "1 to 2 people",
  "3 à 5 personnes": "3 to 5 people",
  "6 à 10 personnes": "6 to 10 people",
  "11 à 25 personnes": "11 to 25 people",
  "Plus de 25 personnes": "More than 25 people",
};

type QEn = { sub: string; text: string; options: Record<string, string> };

export const QUESTIONS_EN: Record<string, QEn> = {
  form_1: {
    sub: "Legal status",
    text: "Is your business officially registered?",
    options: {
      fully_registered: "Yes, RCCM and IFU are up to date",
      in_progress: "I am in the process of regularizing it",
      none: "No, my activity is not officially registered yet",
    },
  },
  form_2: {
    sub: "Bank account",
    text: "Do you have an account dedicated to your business?",
    options: {
      strictly_separated: "Yes, and I keep business money separate from my personal money",
      mixed_pro_personal: "Yes, but I still sometimes mix the two",
      no_pro_account: "No, I use my personal accounts or personal Mobile Money",
    },
  },
  form_3: {
    sub: "Contracts",
    text: "Are your main agreements with customers, suppliers or landlords in writing?",
    options: {
      all_written: "Yes, my main agreements are written and signed",
      some_verbal: "Some are written, others are only verbal",
      mostly_verbal: "Most of my agreements are verbal",
    },
  },
  fin_1: {
    sub: "Cash",
    text: "Do you know how much money comes in and goes out of your business?",
    options: {
      daily_weekly: "Yes, I track it regularly with a spreadsheet or a tool",
      general_idea: "I have a general idea, but I do not track it regularly",
      when_tight: "I mainly look when I have a cash problem",
      none: "No, I do not have precise tracking",
    },
  },
  fin_2: {
    sub: "Margins / profitability",
    text: "Do you know your margins and your break-even point?",
    options: {
      exact: "Yes, they are calculated and tracked regularly",
      estimated: "I have an estimate, but nothing really formalized",
      none: "No",
    },
  },
  fin_3: {
    sub: "Customer payments",
    text: "What do you do when customers are late paying you?",
    options: {
      strict_system: "I have a well-organized follow-up system",
      case_by_case: "I follow up case by case",
      high_delay: "Late payments are frequent and strain my cash",
    },
  },
  compta_1: {
    sub: "Bookkeeping",
    text: "How do you keep your accounts today?",
    options: {
      software_expert: "With accounting software and/or a professional",
      excel_regular: "With Excel or another tracking spreadsheet",
      paper_notebook: "With a notebook or notes",
      no_bookkeeping: "I do not yet keep regular records",
    },
  },
  compta_2: {
    sub: "Financial statements",
    text: "Do you have your business's latest financial statements?",
    options: {
      available_certified: "Yes, they are complete and available",
      drafts_only: "They are being prepared",
      not_available: "No, I do not have them",
    },
  },
  fisc_1: {
    sub: "Tax obligations",
    text: "Are your tax obligations tracked regularly?",
    options: {
      on_time_regular: "Yes, my filings and payments are made on time and tracked regularly",
      general_irregular: "I generally file, but tracking is not always regular",
      struggling_deadlines: "I struggle to keep up with my tax obligations and deadlines",
      unknown_obligations: "I do not know exactly what my tax obligations are",
    },
  },
  fisc_2: {
    sub: "Keeping records",
    text: "Are your tax documents and supporting records kept properly?",
    options: {
      available_organized: "Yes, they are available and well filed",
      available_improvable: "They are available, but filing could be improved",
      missing_hard_to_find: "Several documents are missing or hard to find",
      none_kept: "No, I keep few or no tax records",
    },
  },
  comm_1: {
    sub: "Customer acquisition",
    text: "How do you mainly find new customers?",
    options: {
      multi_channel: "Through several channels: social media, outreach, partnerships, and so on",
      word_of_mouth: "Mainly through word of mouth and recommendations",
      irregular: "New customers arrive irregularly",
    },
  },
  comm_2: {
    sub: "Customer tracking",
    text: "How do you keep information about your customers and follow your sales?",
    options: {
      structured_tool: "I have a file or a tool where I can easily find customers and their history",
      phone_whatsapp: "Most of the information is in my phone or WhatsApp",
      no_system: "I do not have an organized system to follow my customers",
    },
  },
  dig_1: {
    sub: "Digital payments",
    text: "How do your customers mainly pay you?",
    options: {
      momo_pro_bank: "Business Mobile Money, bank transfer or card",
      momo_perso: "Mainly through a personal Mobile Money account",
      cash_mostly: "Mainly in cash",
    },
  },
  dig_2: {
    sub: "Digital tools",
    text: "Which tools do you use to organize work in your business?",
    options: {
      digital_tools: "Several digital tools let us work and track our activities",
      whatsapp_only: "We mainly use WhatsApp",
      paper_informal: "We work mainly on paper or informally",
    },
  },
  ops_1: {
    sub: "Dependence on the owner",
    text: "If you had to be away for 3 weeks, what would happen in your business?",
    options: {
      normal_run: "The business would keep running normally",
      slowdown_remote: "Activity would slow down and I would need to step in remotely",
      stop_disrupted: "Activity would be badly disrupted or would stop",
    },
  },
  ops_2: {
    sub: "Procedures",
    text: "Have you written down how the main tasks in your business should be done?",
    options: {
      documented_followed: "Yes, the main tasks are documented and followed",
      partially_written: "Some are written, but many still depend on each person's habits",
      oral_only: "No, tasks are mainly explained orally",
    },
  },
  rh_1: {
    sub: "HR / contracts",
    text: "Are your employees officially declared and do they have an employment contract?",
    options: {
      all_declared: "Yes, all are declared and have a contract",
      partially_declared: "Only some are declared or have a contract",
      not_formalized: "No, most are not formalized yet",
    },
  },
  rh_2: {
    sub: "Team organization",
    text: "Does everyone on your team clearly know what they are supposed to do?",
    options: {
      clear_roles: "Yes, each person's roles and goals are clearly defined",
      overlapping_roles: "Everyone roughly knows what to do, but roles sometimes overlap",
      unclear_roles: "Roles are not clearly defined",
    },
  },
  finan_1: {
    sub: "Financial readiness",
    text: "If you had to present your financial situation to a bank or a funder today, would your documents be ready?",
    options: {
      ready_now: "Yes, my main documents are available",
      needs_weeks: "I would need a few weeks to prepare them",
      not_organized: "No, my information is not organized enough yet",
    },
  },
  finan_2: {
    sub: "Financing need",
    text: "Do you currently have a specific financing need for your business?",
    options: {
      structured_need: "Yes, I know how much I need, why, and how it will help the business grow",
      undefined_need: "I need financing, but I have not yet defined the amount or how it will be used",
      no_need_now: "No, I do not have a specific financing need right now",
    },
  },
};
