import { NextResponse } from 'next/server';
// import { Resend } from 'resend';

export async function POST(request: Request) {
  // Envoi automatique d'emails commenté temporairement pour ne pas bloquer les déploiements
  /*
  const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');
  try {
    const { toEmail, companyName, action } = await request.json();
    ...
  } catch (err: any) {
    ...
  }
  */
  return NextResponse.json({ success: true, message: "Envoi automatique d'emails désactivé pour le déploiement." });
}
