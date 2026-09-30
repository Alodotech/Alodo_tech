import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');

  try {
    const { toEmail, companyName, action } = await request.json();

    if (!toEmail) {
      return NextResponse.json({ error: 'Adresse email manquante' }, { status: 400 });
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    let subject = '';
    let html = '';

    if (action === 'reject') {
      subject = `Programme ALODO MPME — Suite de votre dossier (${companyName})`;
      html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0A0A0A; padding: 24px; line-height: 1.6;">
          <h1 style="color: #0A0A0A; margin-bottom: 20px; font-size: 22px;">Bonjour ${companyName},</h1>
          
          <p style="font-size: 15px; margin-bottom: 16px;">
            Nous tenons à vous remercier pour votre confiance et pour le temps accordé à la réalisation de votre diagnostic au sein du <strong>Programme ALODO MPME</strong>.
          </p>
          
          <p style="font-size: 15px; margin-bottom: 20px;">
            Pour cette première cohorte, les places étaient strictement limitées à <strong>20 entreprises</strong> afin de garantir un accompagnement de haute proximité. Malgré la qualité de votre profil, votre entreprise n'a pas pu être retenue parmi les 20 places de cette promotion.
          </p>
          
          <div style="background-color: #F8F9FA; border-left: 4px solid #00C2A8; padding: 18px; margin: 24px 0; border-radius: 8px;">
            <h3 style="color: #00C2A8; margin: 0 0 8px 0; font-size: 16px;">Bienvenue dans la Communauté des MPME d'ALODO</h3>
            <p style="font-size: 14px; margin: 0; color: #3A3A3C;">
              Votre dossier reste actif dans notre écosystème. Vous recevrez nos guides de gestion pratiques, serez invité(e) à nos événements et bénéficierez d'une priorité pour les prochaines cohortes.
            </p>
          </div>
          
          <p style="font-size: 14px; color: #6E6E73; margin-top: 24px;">
            Nous vous félicitons pour votre démarche de structuration et restons à vos côtés pour soutenir le développement de votre entreprise.
          </p>
          
          <p style="font-size: 13px; color: #8E8E93; border-top: 1px solid #EBEBEB; padding-top: 20px; margin-top: 32px;">
            L’équipe ALODO TECH<br/>
            <a href="https://alodotech.com" style="color: #EC663B; text-decoration: none;">www.alodotech.com</a>
          </p>
        </div>
      `;
    } else {
      // Default: Acceptance email
      subject = `Félicitations ! ${companyName} est retenue pour la Cohorte 1 ALODO MPME`;
      html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0A0A0A; padding: 24px; line-height: 1.6;">
          <h1 style="color: #EC663B; margin-bottom: 20px; font-size: 24px;">Félicitations ${companyName} ! 🎉</h1>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            Notre comité technique a le plaisir de vous annoncer que votre entreprise a été officiellement sélectionnée pour rejoindre la <strong>Cohorte 1 du Programme ALODO MPME</strong>.
          </p>
          
          <div style="background-color: #F8F9FA; border-left: 4px solid #EC663B; padding: 18px; margin: 24px 0; border-radius: 8px;">
            <p style="font-size: 15px; font-weight: 600; margin: 0 0 8px 0; color: #0A0A0A;">
              Accédez à votre espace sécurisé et à votre feuille de route
            </p>
            <p style="font-size: 14px; margin: 0 0 16px 0; color: #6E6E73;">
              Consultez vos résultats détaillés sur les 8 dimensions et engagez les prochaines étapes de votre accompagnement.
            </p>
            <a href="https://alodotech.com/mpme/dashboard" style="display: inline-block; background-color: #EC663B; color: #FFFFFF; font-weight: bold; font-size: 15px; text-decoration: none; padding: 12px 26px; border-radius: 50px;">
              Accéder à Mon Espace Privé →
            </a>
          </div>
          
          <div style="margin: 32px 0 24px 0; padding: 20px; border: 1px solid #EBEBEB; border-radius: 12px;">
            <h2 style="font-size: 17px; margin: 0 0 8px 0; color: #0A0A0A;">Prochaine étape : Parlons de vos priorités</h2>
            <p style="font-size: 14px; margin: 0 0 16px 0; color: #6E6E73;">
              Un échange avec l’équipe ALODO permettra de mieux comprendre vos besoins et de définir les prochaines actions adaptées à votre entreprise.
            </p>
            <a href="https://alodotech.com/mpme/dashboard" style="display: inline-block; background-color: #0A0A0A; color: #FFFFFF; font-weight: 600; font-size: 13px; text-decoration: none; padding: 10px 20px; border-radius: 50px;">
              Choisir un créneau d'échange
            </a>
          </div>
          
          <p style="font-size: 13px; color: #8E8E93; line-height: 1.5; border-top: 1px solid #EBEBEB; padding-top: 20px; margin-top: 32px;">
            Pour accéder à votre espace, connectez-vous avec cette adresse (${toEmail}) sur la plateforme.
          </p>
          
          <p style="font-size: 13px; color: #8E8E93;">
            L’équipe ALODO TECH<br/>
            <a href="https://alodotech.com" style="color: #EC663B; text-decoration: none;">www.alodotech.com</a>
          </p>
        </div>
      `;
    }

    const { data, error } = await resend.emails.send({
      from: `ALODO TECH <${fromEmail}>`,
      to: [toEmail],
      subject,
      html,
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
