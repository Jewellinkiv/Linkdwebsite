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
      "One introduction unlocks guided tours across operations, relationships, intelligence, and people.",
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
    description: "Enter once and explore four connected guided experiences.",
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
