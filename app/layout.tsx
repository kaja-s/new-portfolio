import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "kaja skerlj - product designer",
  description: "product designer based in berlin. i design and build interfaces for ai and early-stage startups from 0 → 1.",
  keywords: ["product design", "ux design", "ui design", "berlin", "portfolio", "kaja skerlj"],
  authors: [{ name: "kaja skerlj" }],
  openGraph: {
    title: "kaja skerlj - product designer",
    description: "product designer based in berlin. i design and build interfaces for ai and early-stage startups from 0 → 1.",
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
