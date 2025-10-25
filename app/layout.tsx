import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
