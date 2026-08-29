import { NextResponse } from "next/server";
import {
  getSuiteDemoSecret,
  openSuiteDemoToken,
  readCookie,
  SUITE_DEMO_COOKIE,
  SUITE_SESSION_AUDIENCE,
} from "../../lib/suiteDemoAccess";

export async function GET(request: Request) {
  const secret = await getSuiteDemoSecret();
  const profile = await openSuiteDemoToken({
    audience: SUITE_SESSION_AUDIENCE,
    secret,
    token: readCookie(request, SUITE_DEMO_COOKIE),
  });

  return NextResponse.json(
    profile
      ? { ok: true, profile: { name: profile.name, storeName: profile.storeName } }
      : { ok: false },
    { headers: { "cache-control": "no-store" } },
  );
}
