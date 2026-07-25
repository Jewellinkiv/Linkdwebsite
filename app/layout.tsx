import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://linkd.com"),
  applicationName: "Linkd",
  creator: "Linkd",
  publisher: "Linkd",
  category: "Jewelry POS software",
  manifest: "/site.webmanifest",
  title: {
    default: "Linkd | Jewelry POS and Operations for Luxury Retail",
    template: "%s | Linkd",
  },
  description:
    "Jewelry POS software for luxury retailers, connecting checkout, inventory management, repairs, house accounts, security, reporting, accounting, JewelLink CRM, and CountRetail AI for full luxury jewelry management.",
  keywords: [
    "jewelry POS",
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
    "JewelLink CountRetail",
    "jewelry retail ecosystem",
    "luxury jewelry management software",
    "full jewelry management ecosystem",
    "JewelLink CRM",
    "CountRetail AI",
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
    title: "Linkd | Jewelry POS That Connects the Store",
    description:
      "Luxury jewelry POS software for checkout, inventory, services, house accounts, reporting, accounting handoff, JewelLink CRM, CountRetail AI, and connected retail operations.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Linkd jewelry POS that connects the store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linkd | Jewelry POS That Connects the Store",
    description:
      "Luxury jewelry POS software for checkout, inventory, services, house accounts, reporting, accounting handoff, JewelLink CRM, CountRetail AI, and connected retail operations.",
    images: ["/og.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
