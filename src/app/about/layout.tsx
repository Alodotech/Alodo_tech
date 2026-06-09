import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos',
  description: "Découvrez ALODO TECH, pionnier de la transformation digitale en Afrique, combinant expertise Fintech et Intelligence Artificielle.",
  openGraph: {
    title: 'À propos | ALODO TECH',
    description: "Découvrez ALODO TECH, pionnier de la transformation digitale en Afrique, combinant expertise Fintech et Intelligence Artificielle.",
    url: 'https://alodotech.com/about',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
