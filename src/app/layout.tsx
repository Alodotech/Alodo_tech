import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://alodotech.com"),
    title: {
        default: "ALODO TECH",
        template: "%s | ALODO TECH",
    },
    description: "ALODO TECH builds financial and digital infrastructure for emerging markets — financial inclusion for MSMEs and AI-driven investing.",
    openGraph: {
        title: "ALODO TECH",
        description: "ALODO TECH builds financial and digital infrastructure for emerging markets.",
        url: "https://alodotech.com",
        siteName: "ALODO TECH",
        locale: "fr_FR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "ALODO TECH",
        description: "ALODO TECH builds financial and digital infrastructure for emerging markets.",
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
        <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
            <body>{children}</body>
        </html>
    );
}
