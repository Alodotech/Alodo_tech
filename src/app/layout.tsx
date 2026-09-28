import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://alodotech.com"),
    title: {
        default: "ALODO TECH",
        template: "%s | ALODO TECH",
    },
    description: "ALODO TECH est une entreprise technologique spécialisée dans la transformation digitale, la Fintech et l'Intelligence Artificielle.",
    openGraph: {
        title: "ALODO TECH",
        description: "Entreprise technologique spécialisée dans la transformation digitale, la Fintech et l'Intelligence Artificielle en Afrique.",
        url: "https://alodotech.com",
        siteName: "ALODO TECH",
        locale: "fr_FR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "ALODO TECH",
        description: "Entreprise technologique spécialisée dans la transformation digitale, la Fintech et l'Intelligence Artificielle en Afrique.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body>{children}</body>
        </html>
    );
}
