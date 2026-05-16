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
    title: "ALODO TECH — Building financial & digital infrastructure for emerging markets",
    description: "ALODO TECH builds financial and digital infrastructure for emerging markets — financial inclusion for MSMEs and AI-driven investing.",
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
