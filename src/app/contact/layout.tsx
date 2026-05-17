import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: "Contactez ALODO TECH pour vos questions, partenariats ou demandes d'informations.",
  openGraph: {
    title: 'Contact | ALODO TECH',
    description: "Contactez ALODO TECH pour vos questions, partenariats ou demandes d'informations.",
    url: 'https://alodotech.com/contact',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
