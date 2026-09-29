import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  // Initialize Resend lazily inside handler (avoids build-time error when env var missing)
  const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');

  try {
    const { toEmail, companyName } = await request.json();

    if (!toEmail) {
      return NextResponse.json({ error: 'Adresse email manquante' }, { status: 400 });
    }

    // Replace onboarding@resend.dev with your verified domain email if you have one
    // e.g. contact@votredomaine.com
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    const { data, error } = await resend.emails.send({
      from: `ALODO TECH <${fromEmail}>`,
      to: [toEmail],
      subject: 'Félicitations ! Vous êtes retenu pour la Cohorte 1 ALODO MPME',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0A0A0A; padding: 20px;">
          <h1 style="color: #EC663B; margin-bottom: 24px;">Félicitations ${companyName} ! 🎉</h1>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Nous avons le plaisir de vous annoncer que votre entreprise a été officiellement sélectionnée par notre comité pour rejoindre la <strong>Cohorte 1 du programme ALODO MPME</strong>.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            Vous pouvez dès à présent accéder à votre espace sécurisé pour consulter le résultat de votre audit stratégique (Diagnostic 8 Dimensions) et préparer la phase d'accompagnement.
          </p>
          
          <div style="text-align: center; margin-bottom: 40px;">
            <a href="https://alodotech.com/mpme/dashboard" style="display: inline-block; background-color: #EC663B; color: #FFFFFF; font-weight: bold; font-size: 16px; text-decoration: none; padding: 14px 28px; border-radius: 50px;">
              Accéder à Mon Dashboard Privé
            </a>
          </div>
          
          <p style="font-size: 14px; color: #6E6E73; line-height: 1.5; border-top: 1px solid #EBEBEB; padding-top: 20px;">
            Pour des raisons de sécurité, connectez-vous avec cette adresse email (${toEmail}) via Google sur la plateforme.
          </p>
          
          <p style="font-size: 14px; color: #6E6E73;">
            L'équipe ALODO TECH<br/>
            <a href="https://alodotech.com" style="color: #EC663B; text-decoration: none;">www.alodotech.com</a>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('Server Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
