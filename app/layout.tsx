import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HumanTrack - Biblioteca de Instrumentos Psicológicos",
    template: "%s | HumanTrack",
  },
  description:
    "Explore nossa biblioteca com mais de 50 ferramentas clínicas e terapêuticas. Instrumentos psicológicos validados para profissionais da saúde mental.",
  keywords: [
    "instrumentos psicológicos",
    "ferramentas clínicas",
    "terapia",
    "psicologia",
    "avaliação psicológica",
    "saúde mental",
    "humantrack",
  ],
  authors: [{ name: "HumanTrack" }],
  creator: "HumanTrack",
  publisher: "HumanTrack",
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
  category: "health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#7375FC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
