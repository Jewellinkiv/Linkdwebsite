import type { Metadata } from "next";
import GuidedDemoChooser from "./GuidedDemoChooser";

export const metadata: Metadata = {
  title: "Interactive Guided Demo",
  description:
    "Choose a jewelry-store workflow and explore Linkd with guided sample data.",
  alternates: {
    canonical: "/guided-demo",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function GuidedDemoPage() {
  return <GuidedDemoChooser />;
}
