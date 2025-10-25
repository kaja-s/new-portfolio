import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Load Lay Grotesk Bold for titles
const layGroteskBold = localFont({
  src: '../public/fonts/LayGrotesk-Bold.otf',
  weight: '700',
  style: 'normal',
  variable: '--font-lay-grotesk',
  display: 'swap',
});

// Load Akkurat Mono Regular for body text
const akkuratMono = localFont({
  src: '../public/fonts/AkkuratMono-Regular.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-akkurat-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Kaja Skerlj - Product Designer",
  description: "Product designer based in Berlin. I design and build interfaces for AI and early-stage startups from 0 → 1.",
  keywords: ["product design", "ux design", "ui design", "berlin", "portfolio", "kaja skerlj"],
  authors: [{ name: "Kaja Skerlj" }],
  openGraph: {
    title: "Kaja Skerlj - Product Designer",
    description: "Product designer based in Berlin. I design and build interfaces for AI and early-stage startups from 0 → 1.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${layGroteskBold.variable} ${akkuratMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
