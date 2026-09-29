import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://olive-web-one.vercel.app"),
  title: "O'live - Aceite de Oliva Virgen Extra Premium | Perú",
  description: "Aceite de oliva virgen extra artesanal del Valle de Ilo, Perú. Tradición, calidad y sabor auténtico en cada gota.",
  keywords: ["aceite de oliva", "virgen extra", "Perú", "Ilo", "aceite artesanal", "productos premium"],
  authors: [{ name: "Oscar Vargas Caldas", url: "https://github.com/oscarvargascaldas" }],
  openGraph: {
    title: "O'live - Aceite de Oliva Virgen Extra",
    description: "Descubre nuestro aceite de oliva premium del sur peruano",
    url: "https://olive-web-one.vercel.app",
    siteName: "O'live",
    images: [
      {
        url: "/olive-bottle.png",
        width: 1200,
        height: 630,
        alt: "O'live - Aceite de Oliva",
      },
    ],
    type: "website",
  },
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#202015" />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
