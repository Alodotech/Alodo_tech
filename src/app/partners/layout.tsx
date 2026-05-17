import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investir & Partenaires',
  description: "Prenez part à la révolution financière en Afrique en devenant partenaire ou investisseur d'ALODO TECH.",
  openGraph: {
    title: 'Investir & Partenaires | ALODO TECH',
    description: "Prenez part à la révolution financière en Afrique en devenant partenaire ou investisseur d'ALODO TECH.",
    url: 'https://alodotech.com/partners',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
