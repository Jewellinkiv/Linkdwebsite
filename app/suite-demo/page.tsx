import type { Metadata } from "next";
import SuiteDemoHub from "./SuiteDemoHub";

export const metadata: Metadata = {
  title: "Linkd Suite Guided Tours",
  description:
    "Enter once and explore guided tours of Linkd, JewelLink, CountRetail, and JewelHire for luxury jewelry retail.",
  alternates: {
    canonical: "/suite-demo",
  },
  openGraph: {
    title: "Explore the Linkd Suite",
    description:
      "Use one short form to explore Linkd POS, JewelLink CRM, CountRetail analytics, and JewelHire hiring software.",
    url: "/suite-demo",
    images: [
      {
        url: "/og-linkd-v2.png",
        width: 1200,
        height: 630,
        alt: "Linkd Suite for luxury jewelry retail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore the Linkd Suite",
    description: "Enter once and explore four guided product tours.",
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
