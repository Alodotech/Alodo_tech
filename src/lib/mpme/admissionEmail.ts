const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029VbDTqIa0lwgh8GZWuS1k";
const LINKEDIN_URL = "https://www.linkedin.com/company/alodo-tech/";

export function defaultAdmissionSubject(companyName: string) {
  const enterpriseName = companyName?.trim() || "votre entreprise";
  return `Félicitations ! ${enterpriseName} est retenue pour le Programme ALODO MPME (Cohorte 1)`;
}

export function defaultAdmissionBody(leaderName: string, companyName: string) {
  const salutation = leaderName?.trim() ? `Bonjour ${leaderName.trim()},` : "Bonjour,";
  const enterpriseName = companyName?.trim() || "votre entreprise";
  return [
    salutation,
    "",
    `Nous avons le plaisir de vous annoncer que suite à l'évaluation de votre diagnostic de maturité et aux délibérations du comité, ${enterpriseName} a été officiellement retenue pour intégrer la Cohorte 1 du Programme ALODO MPME.`,
    "",
    "Face à un nombre très élevé de candidatures, la qualité de votre activité, votre potentiel de croissance et votre volonté de structuration ont retenu l'attention du jury.",
    "",
    "Ce que vous apporte le programme :",
    "- Accompagnement pour accélérer la structuration et la conformité de votre entreprise.",
    "- Méthodes et outils pour maîtriser votre trésorerie, vos marges et votre gestion commerciale.",
    "- Préparation aux échanges avec des institutions bancaires et des fonds partenaires. Le diagnostic ne garantit pas un financement.",
    "",
    "Prochaine étape : notre équipe vous contactera prochainement, par e-mail et WhatsApp, pour les modalités d'accueil et le calendrier de la première session.",
  ].join("\n");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function bodyToHtml(body: string) {
  const blocks = body.replace(/\r\n/g, "\n").split(/\n{2,}/);
  return blocks
    .map((block) => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      if (lines.length === 0) return "";
      if (lines.every((line) => line.startsWith("- "))) {
        const items = lines
          .map((line) => `<li style="margin: 0 0 6px 0;">${escapeHtml(line.slice(2))}</li>`)
          .join("");
        return `<ul style="margin: 0 0 16px 0; padding-left: 20px; font-size: 14px; color: #3A3A3C; line-height: 1.7;">${items}</ul>`;
      }
      return lines
        .map((line, index) => {
          const style = index === 0 && /^bonjour\b/i.test(line)
            ? "font-size: 16px; font-weight: 700; color: #0A0A0A; margin: 0 0 14px 0;"
            : "margin: 0 0 16px 0;";
          return `<p style="${style}">${escapeHtml(line)}</p>`;
        })
        .join("");
    })
    .join("");
}

export function renderAdmissionEmailHtml(body: string) {
  const message = bodyToHtml(body.trim() || "Bonjour,");
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px 24px; background-color: #ffffff; border: 1px solid #EBEBEB; border-radius: 20px;">
      <div style="border-bottom: 2px solid #EC663B; padding-bottom: 18px; margin-bottom: 24px;">
        <div style="font-size: 20px; font-weight: 800; color: #0A0A0A; letter-spacing: -0.5px;">
          <span style="color: #EC663B;">ALODO</span> TECH
        </div>
        <p style="color: #6E6E73; margin: 6px 0 0 0; font-size: 13px;">
          Programme National de Structuration &amp; Finançabilité des MPME
        </p>
      </div>
      <div style="color: #1C1C1E; font-size: 15px; line-height: 1.6; margin-bottom: 28px;">
        ${message}
      </div>
      <div style="background: #FAFAFA; border: 1px solid #EBEBEB; border-radius: 16px; padding: 20px; text-align: center; margin-bottom: 28px;">
        <p style="margin: 0 0 14px 0; font-size: 13px; color: #6E6E73;">
          Les consignes du programme sont aussi publiées sur les canaux officiels :
        </p>
        <a href="${WHATSAPP_CHANNEL_URL}" style="display: inline-block; margin: 4px; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 10px 16px; border-radius: 24px; font-size: 13px; font-weight: 700;">WhatsApp</a>
        <a href="${LINKEDIN_URL}" style="display: inline-block; margin: 4px; background-color: #0A66C2; color: #ffffff; text-decoration: none; padding: 10px 16px; border-radius: 24px; font-size: 13px; font-weight: 700;">LinkedIn</a>
      </div>
      <div style="border-top: 1px solid #F2F2F2; padding-top: 18px; font-size: 12px; color: #8E8E93; text-align: center;">
        <p style="margin: 0 0 4px 0; font-weight: 700; color: #0A0A0A;">L'équipe ALODO TECH</p>
        <p style="margin: 0; font-size: 11px;">partnership@alodotech.com • Cadjèhoun, Cotonou, Bénin</p>
      </div>
    </div>
  `;
}
