import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carrières',
  description: "Rejoignez l'équipe ALODO TECH pour construire l'infrastructure digitale de demain.",
  openGraph: {
    title: 'Carrières | ALODO TECH',
    description: "Rejoignez l'équipe ALODO TECH pour construire l'infrastructure digitale de demain.",
    url: 'https://alodotech.com/careers',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
