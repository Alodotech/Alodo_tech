import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Produits',
  description: "Découvrez ALODO et COINAI. Nos solutions pour digitaliser les MPME et faciliter les investissements.",
  openGraph: {
    title: 'Nos Produits | ALODO TECH',
    description: "Découvrez ALODO et COINAI. Nos solutions pour digitaliser les MPME et faciliter les investissements.",
    url: 'https://alodotech.com/products',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
