import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos',
  description: "Découvrez la mission d’ALODO TECH : transformer les transactions de l’économie informelle en données de confiance.",
  openGraph: {
    title: 'À propos | ALODO TECH',
    description: "Découvrez la mission d’ALODO TECH : transformer les transactions de l’économie informelle en données de confiance.",
    url: 'https://alodotech.com/about',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
