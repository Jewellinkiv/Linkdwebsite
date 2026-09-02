import type { Metadata } from "next";
import SuiteDemoHub from "./SuiteDemoHub";

export const metadata: Metadata = {
  title: "Linkd and JewelLink System Guided Tours",
  description:
    "Enter once to explore Linkd POS and ERP or the JewelLink System: JewelLink, CountRetail, and JewelHire.",
  alternates: {
    canonical: "/suite-demo",
  },
  openGraph: {
    title: "Explore Linkd and the JewelLink System",
    description:
      "Use one short form to explore Linkd POS and ERP plus JewelLink CRM, CountRetail analytics, and JewelHire hiring.",
    url: "/suite-demo",
    images: [
      {
        url: "/og-linkd-v2.png",
        width: 1200,
        height: 630,
        alt: "Linkd and the JewelLink System for luxury jewelry retail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Linkd and the JewelLink System",
    description: "Enter once and choose from Linkd or three JewelLink System guided tours.",
    images: ["/og-linkd-v2.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SuiteDemoPage() {
  return <SuiteDemoHub />;
}
