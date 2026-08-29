import { NextResponse } from "next/server";
import {
  getSuiteDemoSecret,
  isSuiteDemoTarget,
  openSuiteDemoToken,
  readCookie,
  sealSuiteDemoToken,
  SUITE_DEMO_COOKIE,
  SUITE_SESSION_AUDIENCE,
  type SuiteDemoTarget,
} from "../../lib/suiteDemoAccess";

const PASS_TTL_SECONDS = 60 * 5;
const HANDOFF_URLS: Record<Exclude<SuiteDemoTarget, "linkd">, string> = {
  jewellink: "https://www.jewellink.com/api/suite-demo-handoff",
  countretail: "https://www.countretail.com/api/suite-demo-handoff",
  jewelhire: "https://app.jewelhire.com/api/public/suite-demo-handoff",
};

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const target = requestUrl.searchParams.get("target") ?? "";
  const suiteUrl = new URL("/suite-demo?access=required#suite-access", requestUrl);

  if (!isSuiteDemoTarget(target)) {
    return NextResponse.redirect(suiteUrl, 303);
  }

  const secret = await getSuiteDemoSecret();
  const profile = await openSuiteDemoToken({
    audience: SUITE_SESSION_AUDIENCE,
    secret,
    token: readCookie(request, SUITE_DEMO_COOKIE),
  });

  if (!profile) {
    return NextResponse.redirect(suiteUrl, 303);
  }

  if (target === "linkd") {
    return NextResponse.redirect(new URL("/guided-demo", requestUrl), 303);
  }

  const pass = await sealSuiteDemoToken({
    audience: target,
    profile: { name: profile.name, storeName: profile.storeName },
    secret,
    ttlSeconds: PASS_TTL_SECONDS,
  });
  const handoffUrl = new URL(HANDOFF_URLS[target]);
  handoffUrl.searchParams.set("pass", pass);
  return NextResponse.redirect(handoffUrl, 303);
}
