import { NextResponse } from "next/server";
import {
  getSuiteDemoSecret,
  isSuiteDemoTarget,
  openSuiteDemoToken,
} from "../../lib/suiteDemoAccess";

export async function POST(request: Request) {
  let payload: { pass?: unknown; target?: unknown };

  try {
    payload = (await request.json()) as { pass?: unknown; target?: unknown };
  } catch {
    return response({ ok: false }, 400);
  }

  const pass = typeof payload.pass === "string" ? payload.pass : "";
  const target = typeof payload.target === "string" ? payload.target : "";

  if (!pass || !isSuiteDemoTarget(target)) {
    return response({ ok: false }, 400);
  }

  const profile = await openSuiteDemoToken({
    audience: target,
    secret: await getSuiteDemoSecret(),
    token: pass,
  });

  if (!profile) {
    return response({ ok: false }, 401);
  }

  return response({
    ok: true,
    profile: { name: profile.name, storeName: profile.storeName },
  });
}

function response(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
      "referrer-policy": "no-referrer",
    },
  });
}
