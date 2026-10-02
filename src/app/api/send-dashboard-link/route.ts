import { NextResponse } from "next/server";
import { Resend } from "resend";

const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029VbDTqIa0lwgh8GZWuS1k";
const LINKEDIN_URL = "https://www.linkedin.com/company/alodo-tech/";

export async function POST(request: Request) {
  try {
    const { toEmail, companyName, leaderName, action } = await request.json();

    if (!toEmail) {
      return NextResponse.json({ error: "Adresse email manquante." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY non configurée. Notification ignorée.");
      return NextResponse.json({ success: true, warning: "Clé Resend absente." });
    }

    const resend = new Resend(apiKey);
    const fromEmail = "ALODO TECH <partnership@alodotech.com>";
    const salutation = leaderName ? `Bonjour ${leaderName},` : `Bonjour,`;
    const enterpriseName = companyName || "votre entreprise";

    const isAccepted = action === "accept" || action === "selected";
    const isRejected = action === "reject" || action === "rejected";

    if (!isAccepted && !isRejected) {
      return NextResponse.json({ success: true, message: "Action sans notification email nécessaire." });
    }

    let subject = "";
    let emailHtml = "";

    if (isAccepted) {
      subject = `Félicitations ! ${enterpriseName} est retenue pour le Programme ALODO MPME (Cohorte 1)`;
      emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px 24px; background-color: #ffffff; border: 1px solid #EBEBEB; border-radius: 20px;">
          
          <!-- En-tête officiel -->
          <div style="border-bottom: 2px solid #EC663B; padding-bottom: 18px; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px; font-weight: 800; color: #0A0A0A; letter-spacing: -0.5px;">
                <span style="color: #EC663B;">ALODO</span> TECH
              </span>
              <span style="font-size: 11px; background-color: #ECFDF5; color: #059669; padding: 2px 10px; border-radius: 20px; font-weight: 700; border: 1px solid #A7F3D0; margin-left: auto;">
                Cohorte 1 • Admission Confirmée
              </span>
            </div>
            <p style="color: #6E6E73; margin: 6px 0 0 0; font-size: 13px;">
              Programme National de Structuration & Finançabilité des MPME
            </p>
          </div>

          <!-- Message principal -->
          <div style="color: #1C1C1E; font-size: 15px; line-height: 1.6; margin-bottom: 28px;">
            <p style="font-size: 16px; font-weight: 700; color: #0A0A0A; margin: 0 0 14px 0;">
              ${salutation}
            </p>

            <p style="margin: 0 0 16px 0;">
              Nous avons le plaisir de vous annoncer que suite à l’évaluation rigoureuse de votre diagnostic de maturité et aux délibérations du comité de gouvernance, <strong>${enterpriseName}</strong> a été <strong>officiellement retenue pour intégrer la Cohorte 1 du Programme ALODO MPME</strong>.
            </p>

            <p style="margin: 0 0 20px 0;">
              Face à un nombre très élevé de candidatures réparties sur tout le territoire national, la qualité de votre activité, votre potentiel de croissance et votre volonté de structuration ont particulièrement retenu l'attention du jury.
            </p>

            <!-- Box des bénéfices -->
            <div style="background-color: #FAFAFA; border: 1px solid #EBEBEB; border-left: 4px solid #EC663B; border-radius: 12px; padding: 18px; margin-bottom: 22px;">
              <h4 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #0A0A0A; text-transform: uppercase; letter-spacing: 0.5px;">
                🚀 Ce que vous apporte le programme :
              </h4>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #3A3A3C; line-height: 1.7;">
                <li><strong>Accompagnement stratégique sur mesure</strong> pour accélérer la structuration et la conformité de votre entreprise.</li>
                <li><strong>Méthodologies & Outils digitaux</strong> pour maîtriser votre trésorerie, vos marges et votre gestion commerciale.</li>
                <li><strong>Accélération de la Finançabilité</strong> et préparation aux rencontres avec les institutions bancaires et fonds partenaires.</li>
              </ul>
            </div>

            <!-- Prochaine étape -->
            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #0A0A0A;">
              📅 Prochaine étape :
            </h4>
            <p style="margin: 0 0 24px 0; font-size: 14px; color: #3A3A3C;">
              Notre équipe d'arbitrage et de coordination vous contactera très prochainement (par email et WhatsApp) pour vous transmettre les modalités d'onboarding et le calendrier de la première session d'immersion.
            </p>
          </div>

          <!-- Section Réseaux Sociaux (WhatsApp & LinkedIn) -->
          <div style="background: linear-gradient(135deg, #FFF9F6 0%, #FAFAFA 100%); border: 1px solid rgba(236,102,59,0.25); border-radius: 16px; padding: 20px; text-align: center; margin-bottom: 28px;">
            <h4 style="margin: 0 0 6px 0; font-size: 15px; font-weight: 800; color: #0A0A0A;">
              📲 Restez connecté(e) à la communauté ALODO
            </h4>
            <p style="margin: 0 0 16px 0; font-size: 13px; color: #6E6E73;">
              Pour ne manquer aucune consigne officielle, directive, opportunité ou actualité du programme, rejoignez dès aujourd'hui nos réseaux officiels :
            </p>

            <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
              <tr>
                <td style="padding: 6px;">
                  <a href="${WHATSAPP_CHANNEL_URL}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 11px 20px; border-radius: 26px; font-size: 13px; font-weight: 700; box-shadow: 0 3px 10px rgba(37,211,102,0.3);">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 8px;">
                          <img src="https://img.icons8.com/color/48/whatsapp--v1.png" width="22" height="22" alt="WhatsApp" style="display: block; border: 0;" />
                        </td>
                        <td style="vertical-align: middle; color: #ffffff; font-weight: 700; font-size: 13px; white-space: nowrap;">
                          Rejoindre la Chaîne WhatsApp
                        </td>
                      </tr>
                    </table>
                  </a>
                </td>
                <td style="padding: 6px;">
                  <a href="${LINKEDIN_URL}" target="_blank" style="display: inline-block; background-color: #0A66C2; color: #ffffff; text-decoration: none; padding: 11px 20px; border-radius: 26px; font-size: 13px; font-weight: 700; box-shadow: 0 3px 10px rgba(10,102,194,0.3);">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 8px;">
                          <img src="https://img.icons8.com/color/48/linkedin.png" width="22" height="22" alt="LinkedIn" style="display: block; border: 0;" />
                        </td>
                        <td style="vertical-align: middle; color: #ffffff; font-weight: 700; font-size: 13px; white-space: nowrap;">
                          Suivre ALODO sur LinkedIn
                        </td>
                      </tr>
                    </table>
                  </a>
                </td>
              </tr>
            </table>
          </div>

          <!-- Signature -->
          <div style="border-top: 1px solid #F2F2F2; padding-top: 18px; font-size: 12px; color: #8E8E93; text-align: center;">
            <p style="margin: 0 0 4px 0; font-weight: 700; color: #0A0A0A;">
              L'équipe ALODO TECH & La Direction du Programme MPME
            </p>
            <p style="margin: 0 0 10px 0; color: #8E8E93; font-size: 11px;">
              Contact : <a href="mailto:partnership@alodotech.com" style="color: #EC663B; text-decoration: none; font-weight: 600;">partnership@alodotech.com</a> • Cadjèhoun, Cotonou, Bénin
            </p>
            <div>
              <a href="${WHATSAPP_CHANNEL_URL}" target="_blank" style="display: inline-block; margin: 0 6px; text-decoration: none;">
                <img src="https://img.icons8.com/color/48/whatsapp--v1.png" width="24" height="24" alt="WhatsApp" style="display: inline-block; vertical-align: middle;" />
              </a>
              <a href="${LINKEDIN_URL}" target="_blank" style="display: inline-block; margin: 0 6px; text-decoration: none;">
                <img src="https://img.icons8.com/color/48/linkedin.png" width="24" height="24" alt="LinkedIn" style="display: inline-block; vertical-align: middle;" />
              </a>
            </div>
          </div>

        </div>
      `;
    } else if (isRejected) {
      subject = `Information concernant votre candidature au Programme ALODO MPME (Cohorte 1) - ${enterpriseName}`;
      emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px 24px; background-color: #ffffff; border: 1px solid #EBEBEB; border-radius: 20px;">
          
          <!-- En-tête officiel -->
          <div style="border-bottom: 2px solid #D1D1D6; padding-bottom: 18px; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px; font-weight: 800; color: #0A0A0A; letter-spacing: -0.5px;">
                <span style="color: #EC663B;">ALODO</span> TECH
              </span>
              <span style="font-size: 11px; background-color: #F4F4F5; color: #71717A; padding: 2px 10px; border-radius: 20px; font-weight: 700; border: 1px solid #E4E4E7; margin-left: auto;">
                Programme MPME • Délibération
              </span>
            </div>
            <p style="color: #6E6E73; margin: 6px 0 0 0; font-size: 13px;">
              Programme National de Structuration & Finançabilité des MPME
            </p>
          </div>

          <!-- Message principal -->
          <div style="color: #1C1C1E; font-size: 15px; line-height: 1.6; margin-bottom: 28px;">
            <p style="font-size: 16px; font-weight: 700; color: #0A0A0A; margin: 0 0 14px 0;">
              ${salutation}
            </p>

            <p style="margin: 0 0 16px 0;">
              Nous tenons à vous remercier chaleureusement pour votre candidature et pour l'intérêt que vous portez au Programme ALODO MPME en effectuant le diagnostic de maturité de <strong>${enterpriseName}</strong>.
            </p>

            <p style="margin: 0 0 18px 0;">
              Le nombre de places disponibles pour cette première promotion étant strictement fixé à <strong>20 entreprises</strong> et face au volume très important de candidatures reçues, le comité de sélection n’a malheureusement pas pu retenir votre dossier pour cette cohorte.
            </p>

            <!-- Box positive -->
            <div style="background-color: #FAFAFA; border: 1px solid #EBEBEB; border-left: 4px solid #3A3A3C; border-radius: 12px; padding: 18px; margin-bottom: 22px;">
              <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #0A0A0A;">
                💡 Votre diagnostic reste votre feuille de route :
              </h4>
              <p style="margin: 0 0 10px 0; font-size: 13px; color: #3A3A3C;">
                Cette décision ne remet nullement en cause la valeur de votre projet. Les résultats de votre diagnostic restent accessibles et constituent un guide clair pour continuer à renforcer la compétitivité et la structuration de votre entreprise.
              </p>
              <p style="margin: 0; font-size: 13px; color: #3A3A3C;">
                De plus, votre entreprise est désormais membre de la <strong>Communauté des MPME d’ALODO</strong> et votre dossier bénéficiera d'une attention prioritaire lors de nos prochains appels à projets.
              </p>
            </div>
          </div>

          <!-- Section Réseaux Sociaux (WhatsApp & LinkedIn) -->
          <div style="background: linear-gradient(135deg, #F8FAFC 0%, #FAFAFA 100%); border: 1px solid #E2E8F0; border-radius: 16px; padding: 20px; text-align: center; margin-bottom: 28px;">
            <h4 style="margin: 0 0 6px 0; font-size: 15px; font-weight: 800; color: #0A0A0A;">
              📲 Restez informé(e) des prochaines cohortes et opportunités
            </h4>
            <p style="margin: 0 0 16px 0; font-size: 13px; color: #6E6E73;">
              Des webinaires, des sessions de formation, des opportunités de financement et les prochaines promotions sont régulièrement publiés. Suivez-nous pour ne rien manquer :
            </p>

            <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
              <tr>
                <td style="padding: 6px;">
                  <a href="${WHATSAPP_CHANNEL_URL}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 11px 20px; border-radius: 26px; font-size: 13px; font-weight: 700; box-shadow: 0 3px 10px rgba(37,211,102,0.3);">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 8px;">
                          <img src="https://img.icons8.com/color/48/whatsapp--v1.png" width="22" height="22" alt="WhatsApp" style="display: block; border: 0;" />
                        </td>
                        <td style="vertical-align: middle; color: #ffffff; font-weight: 700; font-size: 13px; white-space: nowrap;">
                          Rejoindre la Chaîne WhatsApp
                        </td>
                      </tr>
                    </table>
                  </a>
                </td>
                <td style="padding: 6px;">
                  <a href="${LINKEDIN_URL}" target="_blank" style="display: inline-block; background-color: #0A66C2; color: #ffffff; text-decoration: none; padding: 11px 20px; border-radius: 26px; font-size: 13px; font-weight: 700; box-shadow: 0 3px 10px rgba(10,102,194,0.3);">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 8px;">
                          <img src="https://img.icons8.com/color/48/linkedin.png" width="22" height="22" alt="LinkedIn" style="display: block; border: 0;" />
                        </td>
                        <td style="vertical-align: middle; color: #ffffff; font-weight: 700; font-size: 13px; white-space: nowrap;">
                          Suivre ALODO sur LinkedIn
                        </td>
                      </tr>
                    </table>
                  </a>
                </td>
              </tr>
            </table>
          </div>

          <!-- Signature -->
          <div style="border-top: 1px solid #F2F2F2; padding-top: 18px; font-size: 12px; color: #8E8E93; text-align: center;">
            <p style="margin: 0 0 4px 0; font-weight: 700; color: #0A0A0A;">
              L'équipe ALODO TECH
            </p>
            <p style="margin: 0 0 10px 0; color: #8E8E93; font-size: 11px;">
              Contact : <a href="mailto:partnership@alodotech.com" style="color: #EC663B; text-decoration: none; font-weight: 600;">partnership@alodotech.com</a> • Cadjèhoun, Cotonou, Bénin
            </p>
            <div>
              <a href="${WHATSAPP_CHANNEL_URL}" target="_blank" style="display: inline-block; margin: 0 6px; text-decoration: none;">
                <img src="https://img.icons8.com/color/48/whatsapp--v1.png" width="24" height="24" alt="WhatsApp" style="display: inline-block; vertical-align: middle;" />
              </a>
              <a href="${LINKEDIN_URL}" target="_blank" style="display: inline-block; margin: 0 6px; text-decoration: none;">
                <img src="https://img.icons8.com/color/48/linkedin.png" width="24" height="24" alt="LinkedIn" style="display: inline-block; vertical-align: middle;" />
              </a>
            </div>
          </div>

        </div>
      `;
    }

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: "partnership@alodotech.com",
      subject: subject,
      html: emailHtml,
    });

    if (error) {
      console.error("Erreur Resend notification statut :", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error("Erreur API notification statut :", err);
    return NextResponse.json({ error: err.message || "Erreur interne" }, { status: 500 });
  }
}
