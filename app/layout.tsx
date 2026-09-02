import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import "./premier.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://linkd.com"),
  applicationName: "Linkd",
  creator: "Linkd",
  publisher: "Linkd",
  category: "Jewelry POS software",
  manifest: "/site.webmanifest",
  title: {
    default: "Linkd | Jewelry POS and Store Management",
    template: "%s | Linkd",
  },
  description:
    "Jewelry-specific POS and store-management software for sales, payments, balances, repairs, inventory, and reporting.",
  keywords: [
    "jewelry POS",
    "jewelry store payment processing",
    "jewelry receivables management",
    "jewelry point of sale",
    "luxury retail POS",
    "jewelry inventory management",
    "jewelry store operations",
    "multi-location jewelry POS",
    "jewelry repair intake",
    "jewelry repair management",
    "jewelry appraisal intake",
    "layaway POS",
    "house accounts",
    "RFID jewelry inventory",
    "jewelry store security",
    "jewelry inventory audit",
    "jewelry store accounting",
    "jewelry POS integrations",
    "jewelry store transfers",
    "multi-store jewelry inventory",
    "luxury jewelry management software",
    "JewelLink System integration",
    "JewelLink CRM",
    "CountRetail AI",
    "JewelHire",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.svg",
    apple: "/icon-512.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: "Linkd",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Linkd | Jewelry POS and Store Management",
    description:
      "Sales, payments, balances, repairs, inventory, and reporting in one jewelry-specific system.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og-linkd-v2.png",
        width: 1200,
        height: 630,
        alt: "Linkd jewelry POS that connects the store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linkd | Jewelry POS and Store Management",
    description:
      "Sales, payments, balances, repairs, inventory, and reporting in one jewelry-specific system.",
    images: ["/og-linkd-v2.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#17213a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} antialiased`}
      >
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
      </body>
    </html>
  );
}
