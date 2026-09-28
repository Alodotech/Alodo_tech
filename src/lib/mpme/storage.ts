import { Application, Cohort, DiagnosticAnswer, DiagnosticReport, User } from "./types";
import { calculateDiagnosticScore } from "./scoring";

const INITIAL_COHORT: Cohort = {
  id: "cohort-1",
  name: "Cohorte 1 — Bénin 2026",
  maxCapacity: 20,
  selectedCount: 2,
  status: "open",
  openedAt: "2026-09-01",
  closingDate: "2026-10-31",
  announcementDate: "2026-11-15",
  minScoreThreshold: 60,
  announcementBanner: "Sélection officielle en cours : 20 MPME d'excellence seront retenues pour un accompagnement intensif.",
  selectionCriteriaNotes: "Critères prioritaires du comité : Formalisation RCCM/IFU, compte bancaire pro actif, score de maturité >= 60/100, potentiel de création d'emplois au Bénin.",
};

const SAMPLE_APPLICATIONS: Application[] = [
  {
    id: "app-101",
    companyId: "comp-101",
    cohortId: "cohort-1",
    status: "selected",
    submittedAt: "2026-09-20T10:14:00Z",
    diagnosticScore: 74,
    diagnosticLevel: "Opérationnel Structuré",
    company: {
      id: "comp-101",
      name: "BioAgro Bénin",
      leaderName: "Koffi Mensah",
      phone: "+229 97 00 11 22",
      email: "contact@bioagro.bj",
      city: "Cotonou",
      sector: "Agriculture & Agroalimentaire",
      yearCreated: 2022,
      employeesCount: "6 à 10",
      monthlyRevenue: "5M - 15M FCFA",
      isFormalized: true,
      hasProBankAccount: true,
      mainDifficulties: ["financement", "trésorerie", "stock"],
      singleBiggestProblem: "Besoin de structurer notre trésorerie pour faire face aux pics de récolte.",
      motivation: "Rejoindre ALODO pour préparer un dossier bancaire solide pour notre usine de transformation.",
    },
    internalNotes: [
      {
        id: "note-1",
        applicationId: "app-101",
        author: "Admin ALODO",
        content: "Dossier très prometteur. Activité tangible et dirigeant rigoureux.",
        createdAt: "2026-09-21T09:30:00Z",
      },
    ],
  },
  {
    id: "app-102",
    companyId: "comp-102",
    cohortId: "cohort-1",
    status: "selected",
    submittedAt: "2026-09-22T14:45:00Z",
    diagnosticScore: 68,
    diagnosticLevel: "En Croissance",
    company: {
      id: "comp-102",
      name: "Délice Tropic",
      leaderName: "Amina Bio",
      phone: "+229 95 33 44 55",
      email: "amina@delicetropic.bj",
      city: "Porto-Novo",
      sector: "Restauration & Hôtellerie",
      yearCreated: 2021,
      employeesCount: "11 à 25",
      monthlyRevenue: "2M - 5M FCFA",
      isFormalized: true,
      hasProBankAccount: true,
      mainDifficulties: ["organisation", "gestion financière", "digitalisation"],
      singleBiggestProblem: "Forte dépendance à la présence physique de la fondatrice pour chaque commande.",
      motivation: "Mettre en place des processus et déléguer la gestion quotidienne.",
    },
  },
  {
    id: "app-103",
    companyId: "comp-103",
    cohortId: "cohort-1",
    status: "under_review",
    submittedAt: "2026-09-24T08:12:00Z",
    company: {
      id: "comp-103",
      name: "LogisTrans Express",
      leaderName: "Charly Dossou",
      phone: "+229 66 77 88 99",
      email: "cdossou@logistrans.bj",
      city: "Parakou",
      sector: "Transport & Logistique",
      yearCreated: 2023,
      employeesCount: "3 à 5",
      monthlyRevenue: "5M - 15M FCFA",
      isFormalized: true,
      hasProBankAccount: false,
      mainDifficulties: ["comptabilité", "fiscalité", "recrutement"],
      singleBiggestProblem: "Retards réguliers de facturation et absence de comptabilité formalisée.",
      motivation: "Nous structurer avant de candidater aux marchés publics de la zone septentrionale.",
    },
  },
  {
    id: "app-104",
    companyId: "comp-104",
    cohortId: "cohort-1",
    status: "submitted",
    submittedAt: "2026-09-26T17:30:00Z",
    company: {
      id: "comp-104",
      name: "Mode & Tendance Cotonou",
      leaderName: "Grace Houndé",
      phone: "+229 96 12 34 56",
      email: "grace@modetendance.bj",
      city: "Cotonou",
      sector: "Commerce & Distribution",
      yearCreated: 2024,
      employeesCount: "1 à 2",
      monthlyRevenue: "< 2M FCFA",
      isFormalized: false,
      hasProBankAccount: false,
      mainDifficulties: ["financement", "digitalisation", "ventes"],
      singleBiggestProblem: "Pas de visibilité sur les ventes et absence de compte bancaire pro.",
      motivation: "Formaliser notre boutique et développer notre présence e-commerce.",
    },
  },
];

const STORAGE_KEYS = {
  APPLICATIONS: "alodo_mpme_applications",
  COHORT: "alodo_mpme_cohort",
  CURRENT_DIAGNOSTIC: "alodo_mpme_diagnostic_draft",
  CURRENT_REPORT: "alodo_mpme_latest_report",
  CURRENT_USER: "alodo_mpme_user",
  USERS: "alodo_mpme_registered_users",
};

export const MpmeStorage = {
  getCohort(): Cohort {
    if (typeof window === "undefined") return INITIAL_COHORT;
    const stored = localStorage.getItem(STORAGE_KEYS.COHORT);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.COHORT, JSON.stringify(INITIAL_COHORT));
      return INITIAL_COHORT;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_COHORT;
    }
  },

  getApplications(): Application[] {
    if (typeof window === "undefined") return SAMPLE_APPLICATIONS;
    const stored = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(SAMPLE_APPLICATIONS));
      return SAMPLE_APPLICATIONS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return SAMPLE_APPLICATIONS;
    }
  },

  saveApplication(application: Application): { success: boolean; message?: string } {
    const list = this.getApplications();
    // Anti-double submission check (by email or phone in same cohort)
    const exists = list.some(
      (a) =>
        a.cohortId === application.cohortId &&
        (a.company.email.toLowerCase() === application.company.email.toLowerCase() ||
          a.company.phone === application.company.phone)
    );
    if (exists) {
      return { success: false, message: "Une candidature a déjà été enregistrée avec cet email ou numéro." };
    }
    list.unshift(application);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(list));
    }
    return { success: true };
  },

  updateApplicationStatus(
    appId: string,
    newStatus: Application["status"]
  ): { success: boolean; message?: string } {
    const list = this.getApplications();
    const cohort = this.getCohort();
    const target = list.find((a) => a.id === appId);

    if (!target) return { success: false, message: "Candidature introuvable." };

    // STRICT CAPACITY CONSTRAINT (max 20 per cohort)
    if (newStatus === "selected" && target.status !== "selected") {
      const currentSelected = list.filter(
        (a) => a.cohortId === cohort.id && a.status === "selected"
      ).length;

      if (currentSelected >= cohort.maxCapacity) {
        return {
          success: false,
          message: `Capacité maximale atteinte ! La cohorte est limitée à ${cohort.maxCapacity} entreprises sélectionnées.`,
        };
      }
    }

    target.status = newStatus;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(list));
      // update selected count in cohort
      const newSelectedCount = list.filter((a) => a.status === "selected").length;
      cohort.selectedCount = newSelectedCount;
      localStorage.setItem(STORAGE_KEYS.COHORT, JSON.stringify(cohort));
    }

    return { success: true };
  },

  updateCohort(updated: Partial<Cohort>): { success: boolean; cohort: Cohort } {
    const current = this.getCohort();
    const merged: Cohort = { ...current, ...updated };
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.COHORT, JSON.stringify(merged));
    }
    return { success: true, cohort: merged };
  },

  resetDemoData(): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.COHORT, JSON.stringify(INITIAL_COHORT));
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(SAMPLE_APPLICATIONS));
    }
  },

  addInternalNote(appId: string, noteContent: string, author = "Admin ALODO"): boolean {
    const list = this.getApplications();
    const target = list.find((a) => a.id === appId);
    if (!target) return false;

    if (!target.internalNotes) target.internalNotes = [];
    target.internalNotes.push({
      id: `note-${Date.now()}`,
      applicationId: appId,
      author,
      content: noteContent,
      createdAt: new Date().toISOString(),
    });

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(list));
    }
    return true;
  },

  saveDiagnosticProgress(answers: DiagnosticAnswer[]) {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.CURRENT_DIAGNOSTIC, JSON.stringify(answers));
    }
  },

  getDiagnosticProgress(): DiagnosticAnswer[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_DIAGNOSTIC);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  },

  submitDiagnostic(companyName: string, answers: DiagnosticAnswer[], companyId?: string): DiagnosticReport {
    const report = calculateDiagnosticScore(companyName, answers);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.CURRENT_REPORT, JSON.stringify(report));
      // Link to application if exists
      const list = this.getApplications();
      const currentUser = this.getCurrentUser();
      const lastAppId = sessionStorage.getItem("alodo_last_app_id");

      let target = list.find(
        (a) =>
          (companyId && (a.companyId === companyId || a.id === companyId)) ||
          (lastAppId && a.id === lastAppId) ||
          (currentUser && (
            (currentUser.email && a.company.email.toLowerCase() === currentUser.email.toLowerCase()) ||
            (currentUser.companyId && a.companyId === currentUser.companyId)
          )) ||
          (companyName && a.company.name.trim().toLowerCase() === companyName.trim().toLowerCase())
      );

      if (!target && currentUser) {
        target = list.find(
          (a) => a.company.leaderName.toLowerCase() === currentUser.name.toLowerCase()
        );
      }

      if (target) {
        target.diagnosticScore = report.globalScore;
        target.diagnosticLevel = report.level;
        target.diagnosticReport = report;
        target.status = "diagnostic_completed";
        sessionStorage.setItem("alodo_last_app_id", target.id);
        localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(list));
      } else if (list.length > 0) {
        // Fallback: update active user's first matching app
        const fallback = list[0];
        fallback.diagnosticScore = report.globalScore;
        fallback.diagnosticLevel = report.level;
        fallback.diagnosticReport = report;
        fallback.status = "diagnostic_completed";
        sessionStorage.setItem("alodo_last_app_id", fallback.id);
        localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(list));
      }
    }
    return report;
  },

  getLatestReport(): DiagnosticReport | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_REPORT);
    if (!stored) {
      // Return a default demo report for immediate viewing if empty
      const demo = calculateDiagnosticScore("BioAgro Bénin", [
        { questionId: "form_1", value: "fully_registered" },
        { questionId: "form_2", value: "strictly_separated" },
        { questionId: "form_3", value: "some_verbal" },
        { questionId: "fin_1", value: "daily_weekly" },
        { questionId: "fin_2", value: "estimated" },
        { questionId: "fin_3", value: "manual_irregular" },
        { questionId: "compta_1", value: "excel_regular" },
        { questionId: "compta_2", value: "drafts_only" },
        { questionId: "comm_1", value: "word_of_mouth" },
        { questionId: "comm_2", value: "contacts_whatsapp" },
        { questionId: "dig_1", value: "automated_pro" },
        { questionId: "dig_2", value: "whatsapp_only" },
        { questionId: "ops_1", value: "slowdown" },
        { questionId: "ops_2", value: "partial" },
        { questionId: "rh_1", value: "partially_compliant" },
        { questionId: "rh_2", value: "informal_roles" },
        { questionId: "finan_1", value: "needs_work" },
        { questionId: "finan_2", value: "structured_need" },
      ]);
      localStorage.setItem(STORAGE_KEYS.CURRENT_REPORT, JSON.stringify(demo));
      return demo;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  setCurrentUser(user: User | null): void {
    if (typeof window === "undefined") return;
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  loginWithEmail(email: string, pass: string): { success: boolean; message?: string; user?: User } {
    if (!email.trim() || !pass.trim()) {
      return { success: false, message: "Email et mot de passe requis." };
    }

    // Check for admin
    if (email.toLowerCase() === "admin@alodo.tech") {
      const adminUser: User = {
        id: "admin-alodo",
        name: "Équipe ALODO TECH",
        email: "admin@alodo.tech",
        role: "Admin",
        provider: "email",
      };
      this.setCurrentUser(adminUser);
      return { success: true, user: adminUser };
    }

    // Look for existing registered user
    let users: User[] = [];
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEYS.USERS);
      if (stored) {
        try { users = JSON.parse(stored); } catch {}
      }
    }

    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      this.setCurrentUser(found);
      return { success: true, user: found };
    }

    // Check if an application with this email exists
    const apps = this.getApplications();
    const appMatch = apps.find((a) => a.company.email.toLowerCase() === email.toLowerCase());

    const user: User = {
      id: `usr_${Date.now()}`,
      name: appMatch ? appMatch.company.leaderName : email.split("@")[0],
      email: email.toLowerCase(),
      role: "MPME",
      provider: "email",
      companyId: appMatch?.companyId,
    };

    this.setCurrentUser(user);
    return { success: true, user };
  },

  loginWithGoogle(email?: string, name?: string): { success: boolean; user: User } {
    const googleEmail = email?.toLowerCase() || "dirigeant.mpme@gmail.com";
    const googleName = name || "Dirigeant MPME";

    // Check if application exists with this email or name
    const apps = this.getApplications();
    const appMatch = apps.find(
      (a) =>
        a.company.email.toLowerCase() === googleEmail ||
        (name && a.company.leaderName.toLowerCase() === name.toLowerCase())
    );

    const isAdmin =
      googleEmail === "techalodo@gmail.com" ||
      googleEmail === "admin@alodo.tech" ||
      googleEmail.startsWith("admin");

    const user: User = {
      id: `usr_google_${Date.now()}`,
      name: isAdmin ? (name || "Germain DANDJI (CTO)") : (appMatch ? appMatch.company.leaderName : googleName),
      email: googleEmail,
      role: isAdmin ? "Admin" : "MPME",
      provider: "google",
      avatarUrl: "https://lh3.googleusercontent.com/a/default-user=s96-c",
      companyId: appMatch?.companyId,
    };

    this.setCurrentUser(user);
    return { success: true, user };
  },

  registerUser(
    name: string,
    email: string,
    companyId?: string,
    provider: "email" | "google" = "email"
  ): User {
    const user: User = {
      id: `usr_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      role: "MPME",
      provider,
      companyId,
      avatarUrl: provider === "google" ? "https://lh3.googleusercontent.com/a/default-user=s96-c" : undefined,
    };

    if (typeof window !== "undefined") {
      let users: User[] = [];
      const stored = localStorage.getItem(STORAGE_KEYS.USERS);
      if (stored) {
        try { users = JSON.parse(stored); } catch {}
      }
      users.push(user);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }

    this.setCurrentUser(user);
    return user;
  },

  logout(): void {
    this.setCurrentUser(null);
  },

  getUserApplication(query?: string | null): Application | null {
    if (!query) return null;
    const apps = this.getApplications();
    const q = query.toLowerCase().trim();
    return (
      apps.find(
        (a) =>
          a.company.email.toLowerCase() === q ||
          a.id.toLowerCase() === q ||
          a.companyId.toLowerCase() === q ||
          a.company.name.toLowerCase() === q ||
          a.company.leaderName.toLowerCase() === q
      ) || null
    );
  },
};

export const GOOGLE_DEMO_ACCOUNTS = [
  {
    name: "Germain DANDJI (CTO)",
    email: "techalodo@gmail.com",
    company: "Direction ALODO TECH",
    statusBadge: "Session Administrateur ALODO",
    statusType: "admin",
  },
  {
    name: "Koffi Mensah",
    email: "contact@bioagro.bj",
    company: "BioAgro Bénin",
    statusBadge: "Cohorte 1 — Retenue (Top 20)",
    statusType: "selected",
  },
  {
    name: "Amina Bio",
    email: "amina@delicetropic.bj",
    company: "Délice Tropic",
    statusBadge: "Cohorte 1 — Retenue (Top 20)",
    statusType: "selected",
  },
  {
    name: "Charly Dossou",
    email: "cdossou@logistrans.bj",
    company: "LogisTrans Express",
    statusBadge: "En cours d'étude",
    statusType: "under_review",
  },
  {
    name: "Grace Houndé",
    email: "grace@modetendance.bj",
    company: "Mode & Tendance",
    statusBadge: "Dossier soumis",
    statusType: "submitted",
  },
];

