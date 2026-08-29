import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  getSuiteDemoSecret,
  openSuiteDemoToken,
  SUITE_DEMO_COOKIE,
  SUITE_SESSION_AUDIENCE,
} from "../lib/suiteDemoAccess";
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

export const dynamic = "force-dynamic";

export default async function GuidedDemoPage() {
  const cookieStore = await cookies();
  const profile = await openSuiteDemoToken({
    audience: SUITE_SESSION_AUDIENCE,
    secret: await getSuiteDemoSecret(),
    token: cookieStore.get(SUITE_DEMO_COOKIE)?.value ?? "",
  });

  return (
    <GuidedDemoChooser
      initialProfile={profile ? { name: profile.name, storeName: profile.storeName } : null}
      suiteAccess={Boolean(profile)}
    />
  );
}
