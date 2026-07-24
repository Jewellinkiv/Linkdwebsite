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
    default: "Linkd | The Operational Core for Modern Jewelry Retail",
    template: "%s | Linkd",
  },
  description:
    "Luxury POS, inventory, security, accounting, and store operations built for modern jewelry retailers.",
  icons: {
    icon: "/assets/brand/linkd-logo-main.png",
    shortcut: "/assets/brand/linkd-logo-main.png",
  },
  openGraph: {
    title: "Linkd | The Operational Core for Modern Jewelry Retail",
    description:
      "Luxury POS, inventory, security, accounting, and store operations built for modern jewelry retailers.",
    type: "website",
    url: "https://linkd.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linkd | The Operational Core for Modern Jewelry Retail",
    description:
      "Luxury POS, inventory, security, accounting, and store operations built for modern jewelry retailers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
