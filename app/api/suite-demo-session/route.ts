import { NextResponse } from "next/server";
import {
  getSuiteDemoSecret,
  openSuiteDemoToken,
  readCookie,
  sealSuiteDemoToken,
  SUITE_DEMO_COOKIE,
  SUITE_RESUME_AUDIENCE,
  SUITE_SESSION_AUDIENCE,
} from "../../lib/suiteDemoAccess";

const SESSION_TTL_SECONDS = 60 * 60 * 4;

export async function GET(request: Request) {
  const secret = await getSuiteDemoSecret();
  const profile = await openSuiteDemoToken({
    audience: SUITE_SESSION_AUDIENCE,
    secret,
    token: readCookie(request, SUITE_DEMO_COOKIE),
  });

  return NextResponse.json(
    profile
      ? { ok: true, profile: { name: profile.name, storeName: profile.storeName, email: profile.email } }
      : { ok: false },
    { headers: { "cache-control": "no-store" } },
  );
}

export async function POST(request: Request) {
  let resumeToken = "";
  try {
    const payload = (await request.json()) as { resumeToken?: unknown };
    resumeToken = typeof payload.resumeToken === "string" ? payload.resumeToken : "";
  } catch {
    return NextResponse.json({ ok: false }, { status: 400, headers: { "cache-control": "no-store" } });
  }

  const secret = await getSuiteDemoSecret();
  const profile = await openSuiteDemoToken({
    audience: SUITE_RESUME_AUDIENCE,
    secret,
    token: resumeToken,
  });
  if (!profile?.email) {
    return NextResponse.json({ ok: false }, { status: 401, headers: { "cache-control": "no-store" } });
  }

  const token = await sealSuiteDemoToken({
    audience: SUITE_SESSION_AUDIENCE,
    profile,
    secret,
    ttlSeconds: SESSION_TTL_SECONDS,
  });
  const response = NextResponse.json(
    { ok: true, profile: { name: profile.name, storeName: profile.storeName, email: profile.email } },
    { headers: { "cache-control": "no-store" } },
  );
  response.cookies.set({
    name: SUITE_DEMO_COOKIE,
    value: token,
    httpOnly: true,
    maxAge: SESSION_TTL_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: new URL(request.url).protocol === "https:",
  });
  return response;
}
