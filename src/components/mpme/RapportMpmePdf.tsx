"use client";

import { useEffect } from "react";
import { Application, DiagnosticReport, DiagnosticAnswer } from "@/lib/mpme/types";
import { MpmeStorage } from "@/lib/mpme/storage";

interface RapportMpmePdfProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
}

// ── Traduction en langage 100% humain et concret de terrain (zéro jargon, zéro score, zéro pourcentage) ──

function getTerrainDiagnostique(application: Application, _report: DiagnosticReport | null) {
  const comp = application.company;
  const answers: DiagnosticAnswer[] = application.diagnosticAnswers || [];

  const defis: { titre: string; constat: string; solution: string }[] = [];
  const atouts: string[] = [];

  // 1. Gestion de la caisse & séparation des poches
  if (!comp?.hasProBankAccount) {
    defis.push({
      titre: "Séparer l'argent de la maison et l'argent du commerce",
      constat: "Vos recettes de vente et vos dépenses de famille se mélangent encore dans la même poche ou sur le même compte Mobile Money.",
      solution: "Créer un numéro Mobile Money ou un compte dédié uniquement au commerce dès le premier mois, pour savoir exactement ce que votre activité vous rapporte chaque soir.",
    });
  } else {
    atouts.push("Vous avez déjà le réflexe de séparer vos finances personnelles de l'argent de votre commerce.");
  }

  // 2. Les papiers officiels sans tracas
  if (!comp?.isFormalized) {
    defis.push({
      titre: "Mettre les papiers officiels en règle, sans stress",
      constat: "Votre activité n'est pas encore enregistrée au registre du commerce ou aux impôts, ce qui peut vous faire peur en cas de contrôle.",
      solution: "L'équipe ALODO vous accompagne étape par étape pour régulariser vos papiers simplement, sans tracasserie, pour travailler l'esprit tranquille et vendre à de grands clients.",
    });
  } else {
    atouts.push("Votre entreprise est déjà enregistrée officiellement, une vraie force pour rassurer vos partenaires.");
  }

  // 3. Suivi quotidien des ventes et des dépenses (la règle des 5 minutes)
  const fin1 = answers.find((a) => a.questionId === "fin_1")?.value;
  if (fin1 === "none" || fin1 === "when_tight" || !fin1) {
    defis.push({
      titre: "Savoir exactement ce qui rentre et ce qui sort chaque jour",
      constat: "Vous gérez la caisse de tête ou seulement quand l'argent commence à manquer, ce qui apporte des angoisses imprévues à chaque fin de mois.",
      solution: "La règle simple des 5 minutes par jour : un petit carnet de caisse ou une note sur téléphone pour inscrire chaque vente et chaque dépense avant de dormir.",
    });
  } else {
    atouts.push("Vous avez l'habitude de noter et suivre vos rentrées d'argent avec rigueur.");
  }

  // 4. Connaissance du bénéfice réel sur chaque vente
  const fin2 = answers.find((a) => a.questionId === "fin_2")?.value;
  if (fin2 === "none" || fin2 === "estimated" || !fin2) {
    defis.push({
      titre: "Calculer son vrai bénéfice sur chaque produit ou service",
      constat: "Vous vendez régulièrement, mais à la fin du mois vous ne savez pas exactement combien il vous reste en bénéfice net après avoir payé les charges et le transport.",
      solution: "Calculer votre coût de revient réel pour fixer vos prix avec certitude et être sûr de dégager un bénéfice net sur chaque vente.",
    });
  } else {
    atouts.push("Vous connaissez bien vos marges et ce que chaque vente vous rapporte réellement.");
  }

  // 5. Les impayés et la protection des livraisons
  const form3 = answers.find((a) => a.questionId === "form_3")?.value;
  const fin3 = answers.find((a) => a.questionId === "fin_3")?.value;
  if (form3 === "mostly_verbal" || form3 === "some_verbal" || fin3 === "high_delay") {
    defis.push({
      titre: "Éviter les impayés et les retards de paiement",
      constat: "Beaucoup de ventes ou livraisons reposent uniquement sur la parole verbale, ce qui entraîne des retards de paiement ou des dettes difficiles à récupérer.",
      solution: "Sécuriser vos ventes avec un reçu simple, un bon de commande ou un message de confirmation écrit, et demander une avance avant toute commande importante.",
    });
  } else {
    atouts.push("Vous avez l'habitude de garder des traces écrites de vos accords commerciaux.");
  }

  // 6. Utiliser le téléphone pour vendre et fidéliser
  const digi1 = answers.find((a) => a.questionId === "digi_1")?.value;
  if (digi1 === "paper_only" || digi1 === "basic_whatsapp" || !digi1) {
    defis.push({
      titre: "Utiliser son téléphone comme un vrai commercial",
      constat: "Vos opérations se font encore sur papier volant ou de mémoire, sans sauvegarde organisée des numéros de vos clients.",
      solution: "Installer WhatsApp Business, créer un catalogue photo de vos produits et garder le contact avec vos anciens clients pour qu'ils reviennent commander chez vous.",
    });
  } else {
    atouts.push("Vous utilisez déjà les outils sur smartphone pour communiquer et vendre à vos clients.");
  }

  // 7. Organisation de l'équipe et transmission
  const rh1 = answers.find((a) => a.questionId === "rh_1")?.value;
  if (rh1 === "all_on_founder" || rh1 === "informal_tasks") {
    defis.push({
      titre: "Ne plus tout porter seul sur ses épaules",
      constat: "Tout repose sur vous du matin au soir : si vous êtes absent ou malade, l'activité s'arrête ou tourne au ralenti.",
      solution: "Former un collaborateur ou apprenti de confiance sur les tâches simples pour vous libérer du temps et pouvoir vous reposer.",
    });
  }

  // 8. Problème prioritaire déclaré par le dirigeant
  const mainProblem = comp?.singleBiggestProblem;

  // Atouts naturels complémentaires
  if (atouts.length === 0) {
    atouts.push("Votre courage entrepreneurial et votre présence active auprès de vos clients.");
    atouts.push("Une activité commerciale vivante avec des produits ou services qui répondent à un vrai besoin.");
  }

  return { defis: defis.slice(0, 5), atouts, mainProblem };
}

export default function RapportMpmePdf({ application, isOpen, onClose }: RapportMpmePdfProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !application) return null;

  const comp = application.company;
  const report: DiagnosticReport | null =
    application.diagnosticReport ||
    (typeof window !== "undefined" ? MpmeStorage.getLatestReport() : null);

  const today = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePrint = () => {
    const prevTitle = document.title;
    const compName = comp?.name ? comp.name.replace(/[^a-zA-Z0-9_-]/g, "_") : "Entreprise";
    document.title = `Feuille_De_Route_MPME_${compName}`;
    document.body.classList.add("printing-mpme-pdf");
    window.print();
    setTimeout(() => {
      document.title = prevTitle;
      document.body.classList.remove("printing-mpme-pdf");
    }, 1000);
  };

  const { defis, atouts, mainProblem } = getTerrainDiagnostique(application, report);

  return (
    <div
      className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md overflow-y-auto p-2 sm:p-6 print:static print:inset-auto print:bg-white print:p-0 print:m-0 print:overflow-visible print:w-full print:block"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-[#EBEBEB] overflow-hidden my-2 sm:my-6 print:my-0 print:border-none print:shadow-none print:rounded-none print:max-w-none print:w-full">
        
        {/* ── BARRE D'ACTION SUPÉRIEURE (ÉCRAN SEULEMENT) ── */}
        <div className="sticky top-0 z-50 p-4 bg-[#0A0A0A] text-white flex items-center justify-between border-b border-white/10 shadow-lg print:hidden shrink-0">
          <div className="flex items-center gap-3">
            <img
              src="/logo/logo.png"
              alt="ALODO TECH"
              style={{ height: "28px", width: "auto", filter: "brightness(0) invert(1)" }}
            />
            <div>
              <span className="text-sm font-bold block">Feuille de Route & Guide Pratique MPME</span>
              <span className="text-xs text-emerald-400">Document remis au dirigeant • Zéro jargon technique, zéro score • Format A4</span>
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
              className="px-3.5 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
              title="Fermer"
            >
              <span>✕ Fermer</span>
            </button>
          </div>
        </div>

        {/* ── CORPS DU DOCUMENT IMPRIMABLE (A4) ── */}
        <div
          id="printable-rapport-mpme"
          className="p-8 sm:p-12 text-[#111827] bg-white font-sans space-y-6 print:p-6 print:space-y-5"
          style={{ minHeight: "297mm" }}
        >
          {/* EN-TÊTE OFFICIEL ET CHALEUREUX */}
          <div className="flex items-center justify-between border-b-2 border-[#EC663B] pb-5 avoid-break">
            <div className="flex items-center gap-3">
              <img src="/logo/logo.png" alt="ALODO TECH" style={{ height: "42px", width: "auto" }} />
              <div>
                <div className="text-xl font-bold tracking-tight text-[#0A0A0A]">
                  <span className="text-[#EC663B]">ALODO</span> TECH
                </div>
                <div className="text-xs font-semibold text-[#00C2A8] tracking-wider uppercase">
                  Programme National d'Accompagnement des Entreprises
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#FFF5F2] text-[#EC663B] border border-[#EC663B]/20 inline-block mb-1">
                GUIDE PRATIQUE DE L'ENTREPRISE
              </span>
              <div className="text-xs text-[#6B7280]">Émis le {today}</div>
            </div>
          </div>

          {/* FICHE DE L'ENTREPRISE ACCOMPAGNÉE */}
          <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 avoid-break">
            <div>
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block mb-0.5">
                Dossier Pratique d'Accompagnement
              </span>
              <h1 className="text-2xl font-extrabold text-[#0A0A0A] leading-tight">
                {comp?.name || "Votre Entreprise"}
              </h1>
              <p className="text-xs text-[#4B5563] mt-1">
                Dirigeant(e) : <strong>{comp?.leaderName || "Chère Dirigeante / Cher Dirigeant"}</strong>
                {comp?.city ? ` · ${comp.city}` : ""}
                {comp?.sector ? ` · ${comp.sector}` : ""}
              </p>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 text-center shrink-0 shadow-xs">
              <span className="text-[10px] font-bold text-[#6B7280] uppercase block">Mission ALODO</span>
              <span className="text-sm font-extrabold text-[#00C2A8] block mt-0.5">
                Accompagnement de Terrain
              </span>
            </div>
          </div>

          {/* MOT D'INTRODUCTION BIENVEILLANT ALODO (ZÉRO JARGON, ZÉRO SCORE) */}
          <div className="p-4 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-xs text-[#1E3A8A] leading-relaxed avoid-break">
            <strong className="block text-sm font-bold text-[#1D4ED8] mb-1">
              👋 Le message de l'équipe ALODO : Vous n'êtes plus seul(e)
            </strong>
            <p>
              Merci d'avoir partagé la situation de votre entreprise en toute franchise. 
              Le Programme ALODO a été créé pour <strong>les entrepreneurs du quotidien qui se battent avec de vraies réalités</strong> : 
              argent de la maison mélangé avec la caisse, clients qui tardent à payer, imprévus financiers, manque de temps. 
              Ici, il n'y a <strong>aucune note, aucun jugement, aucun calcul compliqué</strong> : juste des solutions simples et réalistes pour débloquer votre activité pas à pas.
            </p>
          </div>

          {/* LA PRIORITÉ N°1 EXPRIMÉE PAR LE DIRIGEANT */}
          {mainProblem && (
            <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] avoid-break">
              <span className="text-[11px] font-bold text-[#B45309] uppercase tracking-wider block mb-1">
                🎯 Ce qui vous préoccupe le plus en ce moment (votre priorité déclarée) :
              </span>
              <p className="text-sm font-bold text-[#92400E] italic">
                "{mainProblem}"
              </p>
              <p className="text-[11px] text-[#B45309] mt-2">
                → C'est exactement par ce point que nos conseillers vont commencer leur travail à vos côtés.
              </p>
            </div>
          )}

          {/* VOS VRAIS DÉFIS DU QUOTIDIEN ET LES SOLUTIONS PRATIQUES */}
          <div className="space-y-3 avoid-break">
            <div className="border-b border-[#E5E7EB] pb-2">
              <h2 className="text-sm font-extrabold text-[#0A0A0A] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EC663B]" />
                Ce qui bloque aujourd'hui (et comment on le règle ensemble)
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Ces difficultés sont tout à fait normales quand un commerce grandit. Voici les solutions concrètes :
              </p>
            </div>

            <div className="space-y-2.5">
              {defis.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs text-xs space-y-1.5 avoid-break"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FEE2E2] text-[#991B1B] text-[10px] font-bold flex items-center justify-center shrink-0">
                      !
                    </span>
                    <h3 className="font-bold text-[#111827] text-xs">
                      {item.titre}
                    </h3>
                  </div>

                  <p className="text-[#4B5563] pl-7 leading-relaxed">
                    <strong className="text-[#374151]">Ce qui se passe :</strong> {item.constat}
                  </p>

                  <div className="pl-7 pt-1 text-[#065F46] bg-[#ECFDF5] p-2 rounded-lg mt-1 flex items-start gap-1.5">
                    <span className="font-bold shrink-0">💡 Ce qu'on va faire avec ALODO :</span>
                    <span>{item.solution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VOS FORCES DÉJÀ PRÉSENTES */}
          {atouts.length > 0 && (
            <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] avoid-break">
              <h3 className="text-xs font-bold text-[#166534] uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span> Vos forces & les atouts solides de votre commerce
              </h3>
              <ul className="space-y-1 text-xs text-[#14532D]">
                {atouts.map((atout, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{atout}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* PLAN D'ACTION SIMPLE ET RÉALISTE SUR 3 MOIS */}
          <div className="space-y-3 avoid-break">
            <div className="border-b border-[#E5E7EB] pb-2">
              <h2 className="text-sm font-extrabold text-[#0A0A0A] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00C2A8]" />
                Votre plan pas à pas pour les 3 prochains mois
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Des étapes claires, faisables même si vos journées sont très chargées :
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* MOIS 1 */}
              <div className="p-3.5 rounded-xl bg-[#FFF5F2] border border-[#EC663B]/30 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold text-[#EC663B] uppercase tracking-wider mb-1">
                    Mois 1
                  </div>
                  <h4 className="font-extrabold text-[#0A0A0A] mb-2 text-xs">
                    Mettre de l'ordre dans la caisse
                  </h4>
                  <ul className="space-y-1.5 text-[#374151]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#EC663B] font-bold">1.</span>
                      <span>Ouvrir une poche ou un compte séparé pour le commerce.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#EC663B] font-bold">2.</span>
                      <span>Noter chaque soir les entrées et les sorties d'argent.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#EC663B] font-bold">3.</span>
                      <span>Identifier les dépenses inutiles qui font fuiter vos bénéfices.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* MOIS 2 */}
              <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#F59E0B]/30 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold text-[#B45309] uppercase tracking-wider mb-1">
                    Mois 2
                  </div>
                  <h4 className="font-extrabold text-[#0A0A0A] mb-2 text-xs">
                    Sécuriser ses clients et ses papiers
                  </h4>
                  <ul className="space-y-1.5 text-[#374151]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#B45309] font-bold">1.</span>
                      <span>Donner des reçus écrits pour ne plus avoir d'impayés.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#B45309] font-bold">2.</span>
                      <span>Lancer les démarches simples pour mettre en règle vos papiers.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#B45309] font-bold">3.</span>
                      <span>Relancer poliment les anciens clients pour faire de nouvelles ventes.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* MOIS 3 */}
              <div className="p-3.5 rounded-xl bg-[#ECFDF5] border border-[#10B981]/30 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold text-[#047857] uppercase tracking-wider mb-1">
                    Mois 3
                  </div>
                  <h4 className="font-extrabold text-[#0A0A0A] mb-2 text-xs">
                    Faire grandir son commerce
                  </h4>
                  <ul className="space-y-1.5 text-[#374151]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#047857] font-bold">1.</span>
                      <span>Calculer son vrai bénéfice net à la fin du mois.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#047857] font-bold">2.</span>
                      <span>Avoir un carnet de caisse propre pour rassurer les partenaires.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#047857] font-bold">3.</span>
                      <span>Réinvestir dans les produits qui se vendent le plus vite.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT & COMMUNAUTÉ ALODO */}
          <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs avoid-break">
            <div>
              <strong className="text-sm font-bold text-[#0A0A0A] block mb-0.5">
                Besoin d'aide pour appliquer ce plan ?
              </strong>
              <p className="text-[#4B5563]">
                Rejoignez le groupe WhatsApp ALODO pour poser vos questions à tout moment.
              </p>
            </div>

            <a
              href="https://whatsapp.com/channel/0029VbDTqIa0lwgh8GZWuS1k"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#25D366] text-white font-bold text-xs inline-flex items-center gap-2 shrink-0 hover:opacity-90 transition-all shadow-xs"
            >
              <span>Canal WhatsApp Direct</span>
              <span>→</span>
            </a>
          </div>

          {/* PIED DE PAGE DISCRET */}
          <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-[10px] text-[#9CA3AF] avoid-break">
            <div>
              <strong>ALODO TECH</strong> · République du Bénin · Accompagnement de terrain
              <div className="text-[9px] mt-0.5">Ce document appartient au chef d'entreprise.</div>
            </div>
            <div className="font-semibold text-[#00C2A8]">
              ALODO MPME — Avançons ensemble, pas à pas
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
