import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, company, subject, message } = body;

    // Basic validation
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Veuillez renseigner votre nom, email et votre message." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || "partnership@alodotech.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "ALODO TECH <partnership@alodotech.com>";

    if (!apiKey) {
      console.warn("RESEND_API_KEY manquante. Message de contact reçu :", body);
      return NextResponse.json(
        { success: true, warning: "Mode démo : message enregistré sans envoi email." },
        { status: 200 }
      );
    }

    const resend = new Resend(apiKey);

    const emailSubject = `[Nouveau Contact ALODO TECH] ${subject || "Message de contact"} - ${fullName}`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 16px;">
        <div style="border-bottom: 2px solid #EC663B; padding-bottom: 16px; margin-bottom: 24px;">
          <h2 style="color: #0A0A0A; margin: 0 0 6px 0; font-size: 20px; font-weight: 800;">
            <span style="color: #EC663B;">ALODO</span> TECH — Formulaire de Contact
          </h2>
          <p style="color: #6E6E73; margin: 0; font-size: 13px;">
            Nouveau message reçu depuis le site officiel
          </p>
        </div>

        <div style="margin-bottom: 24px; background-color: #FAFAFA; border-radius: 12px; padding: 16px; border: 1px solid #EBEBEB;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #8E8E93; width: 140px; font-weight: 600;">Expéditeur :</td>
              <td style="padding: 6px 0; color: #0A0A0A; font-weight: 700;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8E8E93; font-weight: 600;">Email direct :</td>
              <td style="padding: 6px 0; color: #0A0A0A;"><a href="mailto:${email}" style="color: #EC663B; text-decoration: none; font-weight: 600;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8E8E93; font-weight: 600;">Société / Structure :</td>
              <td style="padding: 6px 0; color: #0A0A0A;">${company || "Non renseigné"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8E8E93; font-weight: 600;">Objet :</td>
              <td style="padding: 6px 0; color: #0A0A0A; font-weight: 600;">
                <span style="display: inline-block; background-color: #FFF5F2; color: #EC663B; padding: 2px 10px; border-radius: 20px; font-size: 12px; border: 1px solid rgba(236,102,59,0.2);">
                  ${subject || "Général"}
                </span>
              </td>
            </tr>
          </table>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 style="color: #3A3A3C; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px 0;">Message transmis :</h4>
          <div style="background-color: #ffffff; border: 1px solid #EBEBEB; border-left: 4px solid #EC663B; border-radius: 8px; padding: 16px; color: #1C1C1E; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
${message}
          </div>
        </div>

        <div style="border-top: 1px solid #F2F2F2; padding-top: 16px; font-size: 12px; color: #8E8E93; text-align: center;">
          <p style="margin: 0 0 4px 0;">
            Vous pouvez répondre directement à cet email pour contacter <strong>${fullName}</strong> (${email}).
          </p>
          <p style="margin: 0; font-size: 11px; color: #AEAEB2;">
            Notification générée automatiquement par le portail ALODO TECH.
          </p>
        </div>
      </div>
    `;

    // Recipients: primary email + backup Gmail so no message is ever missed
    const recipients = Array.from(new Set([recipientEmail, "partnershipalodotech@gmail.com"]));

    const sendResult = await resend.emails.send({
      from: fromEmail,
      to: recipients,
      replyTo: email,
      subject: emailSubject,
      html: htmlContent,
    });

    if (sendResult.error) {
      console.error("Erreur Resend :", sendResult.error);
      return NextResponse.json(
        { error: `Erreur d'envoi email (${sendResult.error.message})` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: sendResult.data });
  } catch (err: any) {
    console.error("Erreur API Contact :", err);
    return NextResponse.json(
      { error: err.message || "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
