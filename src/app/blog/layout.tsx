import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: "Actualités, analyses et réflexions sur l'inclusion financière et les technologies en Afrique.",
  openGraph: {
    title: 'Blog | ALODO TECH',
    description: "Actualités, analyses et réflexions sur l'inclusion financière et les technologies en Afrique.",
    url: 'https://alodotech.com/blog',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
