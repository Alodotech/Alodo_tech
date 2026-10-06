export type ApplicationStatus =
  | "submitted"
  | "under_review"
  | "shortlisted"
  | "selected"
  | "rejected"
  | "waitlisted"
  | "diagnostic_pending"
  | "diagnostic_completed";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "MPME" | "Admin";
  provider: "email" | "google";
  avatarUrl?: string;
  companyId?: string;
}

export interface Company {
  id: string;
  name: string;
  leaderName: string;
  phone: string;
  whatsapp?: string;
  email: string;
  city: string;
  sector: string;
  yearCreated: number;
  employeesCount: string;
  monthlyRevenue: string;
  isFormalized: boolean;
  hasProBankAccount: boolean;
  mainDifficulties: string[];
  singleBiggestProblem: string;
  motivation: string;
  leaderAvailability?: string;
}

export interface Application {
  id: string;
  companyId: string;
  cohortId: string;
  status: ApplicationStatus;
  company: Company;
  submittedAt: string;
  internalNotes?: AdminNote[];
  diagnosticScore?: number;
  diagnosticLevel?: string;
  diagnosticReport?: DiagnosticReport;
  diagnosticAnswers?: DiagnosticAnswer[];
}

export interface Cohort {
  id: string;
  name: string;
  maxCapacity: number;
  selectedCount: number;
  status: "draft" | "open" | "deliberation" | "closed" | "archived";
  openedAt: string;
  closingDate?: string;
  announcementDate?: string;
  minScoreThreshold?: number;
  announcementBanner?: string;
  selectionCriteriaNotes?: string;
}

export interface AdminNote {
  id: string;
  applicationId: string;
  author: string;
  content: string;
  createdAt: string;
}

export type QuestionType =
  | "boolean"
  | "single_choice"
  | "multiple_choice"
  | "scale"
  | "number"
  | "text";

export interface QuestionOption {
  value: string;
  label: string;
  score: number; // 0 to 100 contribution
}

export interface Question {
  id: string;
  dimensionId: DimensionId;
  subDimension: string;
  text: string;
  type: QuestionType;
  required: boolean;
  weight: number;
  options?: QuestionOption[];
  conditional?: {
    dependsOnQuestionId: string;
    showIfValueEquals?: string | boolean;
    showIfSectorIn?: string[];
  };
}

export type DimensionId =
  | "formalisation"
  | "finance"
  | "comptabilite"
  | "fiscalite"
  | "commercial"
  | "digitalisation"
  | "operations"
  | "rh"
  | "financabilite";

export interface DimensionMeta {
  id: DimensionId;
  title: string;
  weight: number; // percentage
  description: string;
  iconName: string;
}

export interface DiagnosticAnswer {
  questionId: string;
  value: string | number | boolean | string[];
}

export interface DimensionScore {
  dimensionId: DimensionId;
  title: string;
  score: number; // 0 to 100
  level: "Très faible" | "Fragile" | "En développement" | "Structuré" | "Très structuré";
  weight: number;
}

export interface DiagnosticReport {
  id: string;
  diagnosticId: string;
  companyName: string;
  globalScore: number;
  level: "Très faible" | "Fragile" | "En développement" | "Structuré" | "Très structuré";
  dimensionScores: DimensionScore[];
  strengths: string[];
  weaknesses: string[];
  topRisks: string[];
  topPriorities: string[];
  actionPlan: {
    days30: string[];
    days60: string[];
    days90: string[];
  };
  fundingReadiness: {
    score: number;
    analysis: string;
  };
  alodoRecommendation: string;
  generatedAt: string;
}
