"use client";

import { Application, DiagnosticReport } from "@/lib/mpme/types";
import { MpmeStorage } from "@/lib/mpme/storage";

interface RapportMpmePdfProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function niveauClair(level: string): string {
  switch (level) {
    case "Très faible":       return "Entreprise en démarrage — beaucoup de structuration à faire";
    case "Fragile":           return "Bases fragiles — des points essentiels restent à consolider";
    case "En développement":  return "En bonne progression — quelques lacunes importantes à corriger";
    case "Structuré":         return "Bien organisée — l'entreprise est prête à se développer";
    case "Très structuré":    return "Excellente organisation — entreprise mature et solide";
    default:                  return level;
  }
}

function bgScore(score: number): string {
  if (score >= 75) return "#D1FAE5";
  if (score >= 50) return "#FEF9C3";
  return "#FEE2E2";
}

function txScore(score: number): string {
  if (score >= 75) return "#065F46";
  if (score >= 50) return "#92400E";
  return "#991B1B";
}

const DIMENSION_LABELS: Record<string, string> = {
  formalisation:  "Enregistrement légal (RCCM, IFU…)",
  finance:        "Santé financière & accès au financement",
  comptabilite:   "Comptabilité & gestion de trésorerie",
  fiscalite:      "Respect des obligations fiscales",
  commercial:     "Activité commerciale & clientèle",
  digitalisation: "Utilisation des outils numériques",
  operations:     "Organisation interne & processus",
  rh:             "Gestion de l'équipe & des ressources humaines",
  financabilite:  "Bancarisation & crédit",
};

// Styles de base
const BODY_FONT  = "'Poppins', 'Segoe UI', sans-serif";
const TITLE_FONT = "'Oswald', 'Arial Narrow', sans-serif";

// Titre de section réutilisable
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: TITLE_FONT,
      fontSize: "14px",
      fontWeight: 700,
      color: "#0A0A0A",
      textTransform: "uppercase" as const,
      letterSpacing: "0.08em",
      borderBottom: "2px solid #E5E7EB",
      paddingBottom: "6px",
      marginBottom: "14px",
    }}>
      {children}
    </div>
  );
}

// ── Composant principal ───────────────────────────────────────────────────────

export default function RapportMpmePdf({ application, isOpen, onClose }: RapportMpmePdfProps) {
  if (!isOpen || !application) return null;

  const handlePrint = () => window.print();

  const comp = application.company;
  const report: DiagnosticReport | null =
    application.diagnosticReport ||
    (typeof window !== "undefined" ? MpmeStorage.getLatestReport() : null);

  const today = new Date().toLocaleDateString("fr-FR", {
    year: "numeric", month: "long", day: "numeric",
  });

  const score = application.diagnosticScore ?? report?.globalScore ?? null;
  const level = application.diagnosticLevel ?? report?.level ?? null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full my-8 overflow-hidden flex flex-col border border-[#EBEBEB]">

        {/* ── Barre de contrôle (cachée à l'impression) ── */}
        <div className="p-4 bg-[#0d2a1e] text-white flex items-center justify-between print:hidden shrink-0">
          <div className="flex items-center gap-3">
            <img src="/logo/logo.png" alt="ALODO TECH" style={{ height: "28px", width: "auto", filter: "brightness(0) invert(1)" }} />
            <div>
              <span className="text-sm font-bold block">Rapport MPME — Version Simplifiée</span>
              <span className="text-xs text-slate-400">Destiné au dirigeant & partenaires</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-[#00C2A8] hover:bg-[#009e8a] text-white font-bold text-xs rounded-full shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Télécharger en PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 text-slate-300 hover:text-white flex items-center justify-center text-xs"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── Corps du document imprimable ── */}
        <div
          id="printable-rapport-mpme"
          style={{ fontFamily: BODY_FONT, background: "#FFFFFF", color: "#1a1a1a", minHeight: "297mm" }}
        >
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
            @media print {
              @page { size: A4 portrait; margin: 10mm; }
              .print\\:hidden { display: none !important; }
              #printable-rapport-mpme { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            }
          `}</style>

          {/* ══ EN-TÊTE ══════════════════════════════════════════════════════ */}
          <div style={{
            background: "linear-gradient(135deg, #0A0A0A 0%, #1a3a2a 100%)",
            padding: "28px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}>
            {/* Logo + identité */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <img
                src="/logo/logo.png"
                alt="ALODO TECH"
                style={{ height: "48px", width: "auto", filter: "brightness(0) invert(1)" }}
              />
              <div>
                <div style={{
                  fontFamily: TITLE_FONT,
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "0.06em",
                  lineHeight: 1.1,
                }}>
                  <span style={{ color: "#EC663B" }}>ALODO</span> TECH
                </div>
                <div style={{ fontSize: "11px", color: "#A7F3D0", fontWeight: 500, letterSpacing: "0.05em", marginTop: "3px" }}>
                  Programme National MPME · République du Bénin
                </div>
              </div>
            </div>

            {/* Titre du document */}
            <div style={{ textAlign: "right" }}>
              <div style={{
                fontFamily: TITLE_FONT,
                fontSize: "16px",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                Rapport de Suivi MPME
              </div>
              <div style={{ fontSize: "12px", color: "#6EE7B7", marginTop: "4px" }}>Émis le {today}</div>
              <div style={{ fontSize: "10px", color: "#9CA3AF", marginTop: "2px" }}>
                Réf : {application.id}
              </div>
            </div>
          </div>

          {/* Bandeau orange "Entreprise" */}
          <div style={{
            background: "#EC663B",
            padding: "14px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}>
            <div>
              <div style={{ fontFamily: TITLE_FONT, fontSize: "20px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.04em" }}>
                {comp?.name || "—"}
              </div>
              <div style={{ fontSize: "12px", color: "#FFE4D9", marginTop: "2px" }}>
                Dirigeant(e) : <strong style={{ color: "#FFFFFF" }}>{comp?.leaderName || "—"}</strong>
                {comp?.city ? ` · ${comp.city}` : ""}
                {comp?.sector ? ` · ${comp.sector}` : ""}
              </div>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: "10px",
              padding: "8px 14px",
              textAlign: "center",
              flexShrink: 0,
            }}>
              <div style={{ fontFamily: TITLE_FONT, fontSize: "11px", color: "#FFE4D9", letterSpacing: "0.06em", textTransform: "uppercase" }}>Statut</div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#FFFFFF", marginTop: "2px" }}>
                {application.status === "selected" ? "Retenu — Top 20" : "Candidature déposée"}
              </div>
            </div>
          </div>

          {/* ── Contenu des sections ── */}
          <div style={{ padding: "32px 40px", display: "flex", flexDirection: "column", gap: "28px" }}>

            {/* ══ SCORE GLOBAL ══ */}
            {score !== null && (
              <div>
                <SectionTitle>Résultat global du diagnostic</SectionTitle>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "stretch" }}>

                  {/* Score */}
                  <div style={{ background: bgScore(score), borderRadius: "14px", padding: "22px 28px", textAlign: "center", minWidth: "130px", flexShrink: 0 }}>
                    <div style={{ fontFamily: TITLE_FONT, fontSize: "56px", fontWeight: 700, color: txScore(score), lineHeight: 1 }}>{score}</div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: txScore(score) }}>/ 100</div>
                    <div style={{ fontSize: "10px", color: txScore(score), marginTop: "4px" }}>Score de maturité</div>
                  </div>

                  {/* Interprétation */}
                  <div style={{ flex: 1, background: "#F9FAFB", borderRadius: "14px", padding: "18px 22px", minWidth: "200px" }}>
                    <div style={{ fontFamily: TITLE_FONT, fontSize: "11px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
                      Ce que ça veut dire
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#0A0A0A", lineHeight: 1.5 }}>
                      {level ? niveauClair(level) : "—"}
                    </div>
                    {report?.alodoRecommendation && (
                      <div style={{ fontSize: "12px", color: "#374151", marginTop: "10px", lineHeight: 1.6, borderTop: "1px solid #E5E7EB", paddingTop: "8px" }}>
                        <strong>Recommandation :</strong> {report.alodoRecommendation}
                      </div>
                    )}
                  </div>

                  {/* Crédit */}
                  {report?.fundingReadiness && (
                    <div style={{ background: "#EFF6FF", borderRadius: "14px", padding: "18px 22px", minWidth: "150px", flexShrink: 0 }}>
                      <div style={{ fontFamily: TITLE_FONT, fontSize: "11px", fontWeight: 600, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
                        Prêt pour un crédit ?
                      </div>
                      <div style={{ fontFamily: TITLE_FONT, fontSize: "40px", fontWeight: 700, color: "#1D4ED8", lineHeight: 1 }}>{report.fundingReadiness.score}</div>
                      <div style={{ fontSize: "11px", color: "#3B82F6", fontWeight: 600 }}>/ 100</div>
                      <div style={{ fontSize: "11px", color: "#374151", marginTop: "6px", lineHeight: 1.5 }}>
                        {report.fundingReadiness.analysis}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ══ TABLEAU DES DOMAINES ══ */}
            {report?.dimensionScores && report.dimensionScores.length > 0 && (
              <div>
                <SectionTitle>Évaluation par domaine</SectionTitle>
                <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "10px" }}>
                  Chaque domaine est noté sur 100. En dessous de 50, c'est un point d'attention important.
                </div>
                <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #E5E7EB" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 110px", background: "#F3F4F6", padding: "10px 14px" }}>
                    {["Domaine", "Note /100", "Appréciation"].map((h) => (
                      <span key={h} style={{ fontFamily: TITLE_FONT, fontSize: "10px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: h !== "Domaine" ? "center" : undefined }}>
                        {h}
                      </span>
                    ))}
                  </div>
                  {report.dimensionScores.map((ds, i) => (
                    <div key={ds.dimensionId} style={{ display: "grid", gridTemplateColumns: "1fr 80px 110px", padding: "10px 14px", fontSize: "12px", borderTop: "1px solid #F3F4F6", background: i % 2 === 0 ? "#FFFFFF" : "#FAFAFA", alignItems: "center" }}>
                      <span style={{ fontWeight: 500, color: "#111827" }}>
                        {DIMENSION_LABELS[ds.dimensionId] || ds.title}
                      </span>
                      <span style={{ textAlign: "center", fontFamily: TITLE_FONT, fontWeight: 700, fontSize: "16px", color: txScore(ds.score) }}>
                        {ds.score}
                      </span>
                      <span style={{ display: "block", textAlign: "center", fontSize: "10px", fontFamily: TITLE_FONT, fontWeight: 600, padding: "3px 0", borderRadius: "99px", background: bgScore(ds.score), color: txScore(ds.score) }}>
                        {ds.score >= 75 ? "Bon" : ds.score >= 50 ? "À améliorer" : "Insuffisant"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ POINTS FORTS & RISQUES ══ */}
            {report && (report.strengths?.length > 0 || report.topRisks?.length > 0) && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {report.strengths?.length > 0 && (
                  <div style={{ background: "#F0FDF4", borderRadius: "12px", padding: "16px 18px", border: "1px solid #BBF7D0" }}>
                    <div style={{ fontFamily: TITLE_FONT, fontSize: "11px", fontWeight: 600, color: "#166534", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>
                      Ce qui fonctionne bien
                    </div>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                      {report.strengths.map((s, i) => (
                        <li key={i} style={{ fontSize: "12px", color: "#14532D", display: "flex", gap: "6px", alignItems: "flex-start" }}>
                          <span style={{ color: "#16A34A", fontWeight: 700, flexShrink: 0 }}>✓</span><span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {report.topRisks?.length > 0 && (
                  <div style={{ background: "#FFF7ED", borderRadius: "12px", padding: "16px 18px", border: "1px solid #FED7AA" }}>
                    <div style={{ fontFamily: TITLE_FONT, fontSize: "11px", fontWeight: 600, color: "#9A3412", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>
                      Points à corriger en priorité
                    </div>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                      {report.topRisks.map((r, i) => (
                        <li key={i} style={{ fontSize: "12px", color: "#7C2D12", display: "flex", gap: "6px", alignItems: "flex-start" }}>
                          <span style={{ color: "#EA580C", fontWeight: 700, flexShrink: 0 }}>!</span><span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* ══ PLAN D'ACTION 90 JOURS ══ */}
            {report?.actionPlan && (
              <div>
                <SectionTitle>Que faire dans les 90 prochains jours ?</SectionTitle>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                  {[
                    { label: "Mois 1  (0 – 30 j.)", items: report.actionPlan.days30, color: "#EC663B", bg: "#FFF5F2" },
                    { label: "Mois 2  (30 – 60 j.)", items: report.actionPlan.days60, color: "#D97706", bg: "#FFFBEB" },
                    { label: "Mois 3  (60 – 90 j.)", items: report.actionPlan.days90, color: "#10B981", bg: "#F0FDF4" },
                  ].map(({ label, items, color, bg }) => (
                    <div key={label} style={{ background: bg, borderRadius: "12px", padding: "14px 16px", borderTop: `3px solid ${color}` }}>
                      <div style={{ fontFamily: TITLE_FONT, fontSize: "11px", fontWeight: 600, color, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                        {label}
                      </div>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "5px" }}>
                        {items.map((a, i) => (
                          <li key={i} style={{ fontSize: "11px", color: "#374151", display: "flex", gap: "5px", alignItems: "flex-start" }}>
                            <span style={{ color, fontWeight: 700, flexShrink: 0 }}>→</span>{a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ INFORMATIONS COMPLÉMENTAIRES ══ */}
            <div>
              <SectionTitle>Informations déclarées par l'entreprise</SectionTitle>
              <div style={{ background: "#F9FAFB", borderRadius: "12px", padding: "16px 20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "12px" }}>
                  <div><span style={{ color: "#6B7280" }}>Nombre d'employés : </span><strong>{comp?.employeesCount || "—"}</strong></div>
                  <div><span style={{ color: "#6B7280" }}>Chiffre d'affaires mensuel : </span><strong>{comp?.monthlyRevenue || "—"}</strong></div>
                  <div><span style={{ color: "#6B7280" }}>Enregistrement légal (RCCM/IFU) : </span>
                    <strong style={{ color: comp?.isFormalized ? "#16A34A" : "#DC2626" }}>
                      {comp?.isFormalized ? "Oui" : "Non / En cours"}
                    </strong>
                  </div>
                  <div><span style={{ color: "#6B7280" }}>Compte bancaire professionnel : </span>
                    <strong style={{ color: comp?.hasProBankAccount ? "#16A34A" : "#DC2626" }}>
                      {comp?.hasProBankAccount ? "Oui" : "Non"}
                    </strong>
                  </div>
                </div>
                {comp?.singleBiggestProblem && (
                  <div style={{ marginTop: "10px", padding: "10px 14px", background: "#FFFFFF", borderRadius: "8px", border: "1px solid #E5E7EB" }}>
                    <span style={{ fontFamily: TITLE_FONT, fontSize: "10px", fontWeight: 600, color: "#EC663B", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Problème principal à résoudre :{" "}
                    </span>
                    <span style={{ fontSize: "12px", color: "#374151", fontStyle: "italic" }}>
                      "{comp.singleBiggestProblem}"
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* ══ PIED DE PAGE ══ */}
            <div style={{ paddingTop: "20px", borderTop: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "10px", color: "#9CA3AF" }}>
                <strong style={{ color: "#374151" }}>ALODO TECH SARL</strong> · Cotonou, République du Bénin · contact@alodo.tech
                <div style={{ marginTop: "3px" }}>Document confidentiel — Programme National MPME · Cohorte 1 · {today}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img src="/logo/logo.png" alt="ALODO TECH" style={{ height: "22px", width: "auto", opacity: 0.5 }} />
                <span style={{ fontFamily: TITLE_FONT, fontSize: "11px", fontWeight: 600, color: "#00C2A8", letterSpacing: "0.05em" }}>
                  Rapport MPME Simplifié
                </span>
              </div>
            </div>

          </div>{/* fin padding */}
        </div>{/* fin corps */}
      </div>
    </div>
  );
}
