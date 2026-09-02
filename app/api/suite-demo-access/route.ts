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

const POSTMARK_ENDPOINT = "https://api.postmarkapp.com/email";
const LEAD_RECIPIENT = "support@jewellink.com";
const MAX_FIELD_LENGTH = 600;
const SESSION_TTL_SECONDS = 60 * 60 * 4;
const RESUME_TTL_SECONDS = 60 * 60 * 24 * 365 * 5;
const JSON_HEADERS = { "cache-control": "no-store" };

type SuiteAccessPayload = {
  name?: unknown;
  storeName?: unknown;
  email?: unknown;
  website?: unknown;
  sourcePath?: unknown;
  sourceUrl?: unknown;
  referrer?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  utmContent?: unknown;
};

export async function POST(request: Request) {
  let payload: SuiteAccessPayload;

  try {
    payload = (await request.json()) as SuiteAccessPayload;
  } catch {
    return jsonResponse({ ok: false, message: "Please check your details and try again." }, 400);
  }

  if (field(payload.website)) {
    return jsonResponse({ ok: true, message: "Your guided product tours are open." });
  }

  const lead = {
    name: field(payload.name),
    storeName: field(payload.storeName),
    email: field(payload.email),
    sourcePath: field(payload.sourcePath) || field(request.headers.get("referer")),
    sourceUrl: field(payload.sourceUrl) || field(request.headers.get("referer")),
    referrer: field(payload.referrer) || field(request.headers.get("referer")),
    utmSource: field(payload.utmSource),
    utmMedium: field(payload.utmMedium),
    utmCampaign: field(payload.utmCampaign),
    utmContent: field(payload.utmContent),
  };

  if (!lead.name || !lead.storeName || !lead.email || !isEmail(lead.email)) {
    return jsonResponse(
      { ok: false, message: "Name, store name, and a valid work email are required." },
      400,
    );
  }

  const secret = await getSuiteDemoSecret();
  if (!secret) {
    return jsonResponse(
      { ok: false, message: "Suite access is temporarily unavailable." },
      503,
    );
  }

  const existingToken = readCookie(request, SUITE_DEMO_COOKIE);
  const existingProfile = await openSuiteDemoToken({
    audience: SUITE_SESSION_AUDIENCE,
    secret,
    token: existingToken,
  });

  if (existingProfile?.email?.toLowerCase() === lead.email.toLowerCase()) {
    return unlockedResponse(request, secret, lead);
  }

  const runtime = await loadRuntimeEnv();
  const postmarkToken = runtimeEnv(runtime, "POSTMARK_SERVER_TOKEN");
  const fromEmail = runtimeEnv(runtime, "POSTMARK_FROM_EMAIL");
  const messageStream = runtimeEnv(runtime, "POSTMARK_MESSAGE_STREAM") || "outbound";

  if (!postmarkToken || !fromEmail) {
    return jsonResponse(
      { ok: false, message: "Contact delivery is temporarily unavailable." },
      503,
    );
  }

  const response = await fetch(POSTMARK_ENDPOINT, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-postmark-server-token": postmarkToken,
    },
    body: JSON.stringify({
      From: fromEmail,
      To: LEAD_RECIPIENT,
      ReplyTo: lead.email,
      Subject: `Linkd + JewelLink System guided demos: ${lead.storeName}`,
      TextBody: buildTextEmail(lead),
      HtmlBody: buildHtmlEmail(lead),
      MessageStream: messageStream,
      Tag: "linkd-suite-demo",
    }),
  });

  if (!response.ok) {
    return jsonResponse(
      { ok: false, message: "Contact delivery is temporarily unavailable." },
      502,
    );
  }

  return unlockedResponse(request, secret, lead);
}

async function unlockedResponse(
  request: Request,
  secret: string,
  lead: { name: string; storeName: string; email: string },
) {
  const token = await sealSuiteDemoToken({
    audience: SUITE_SESSION_AUDIENCE,
    profile: lead,
    secret,
    ttlSeconds: SESSION_TTL_SECONDS,
  });
  const resumeToken = await sealSuiteDemoToken({
    audience: SUITE_RESUME_AUDIENCE,
    profile: lead,
    secret,
    ttlSeconds: RESUME_TTL_SECONDS,
  });
  const response = jsonResponse({
    ok: true,
    message: "Your guided product tours are open.",
    profile: { name: lead.name, storeName: lead.storeName, email: lead.email },
    resumeToken,
  });
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

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: JSON_HEADERS });
}

function field(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function runtimeEnv(runtime: Record<string, string | undefined>, key: string) {
  return runtime[key] ?? process.env[key];
}

async function loadRuntimeEnv() {
  try {
    const cloudflare = await import("cloudflare:workers");
    return cloudflare.env;
  } catch {
    return {};
  }
}

function buildTextEmail(lead: Record<string, string>) {
  return [
    "New Linkd + JewelLink System guided demo visitor",
    "",
    `Name: ${lead.name}`,
    `Store: ${lead.storeName}`,
    `Email: ${lead.email}`,
    "Requested access: Linkd, JewelLink, CountRetail, and JewelHire",
    `Source page: ${lead.sourcePath || "Not provided"}`,
    `Source URL: ${lead.sourceUrl || "Not provided"}`,
    `Referrer: ${lead.referrer || "Not provided"}`,
    `UTM source: ${lead.utmSource || "Not provided"}`,
    `UTM medium: ${lead.utmMedium || "Not provided"}`,
    `UTM campaign: ${lead.utmCampaign || "Not provided"}`,
    `UTM content: ${lead.utmContent || "Not provided"}`,
  ].join("\n");
}

function buildHtmlEmail(lead: Record<string, string>) {
  const rows = [
    ["Name", lead.name],
    ["Store", lead.storeName],
    ["Email", lead.email],
    ["Requested access", "Linkd, JewelLink, CountRetail, and JewelHire"],
    ["Source page", lead.sourcePath || "Not provided"],
    ["Source URL", lead.sourceUrl || "Not provided"],
    ["Referrer", lead.referrer || "Not provided"],
    ["UTM source", lead.utmSource || "Not provided"],
    ["UTM medium", lead.utmMedium || "Not provided"],
    ["UTM campaign", lead.utmCampaign || "Not provided"],
    ["UTM content", lead.utmContent || "Not provided"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#121826;line-height:1.5">
      <h1 style="font-size:22px;margin:0 0 6px">New guided product demo visitor</h1>
      <p style="margin:0 0 18px;color:#52617a">One lead requested access to Linkd and the JewelLink System guided tours.</p>
      <table style="border-collapse:collapse;width:100%;max-width:680px">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="border:1px solid #e3e8f2;padding:10px;font-weight:700;background:#f6f8fb;width:150px">${escapeHtml(label)}</td>
                <td style="border:1px solid #e3e8f2;padding:10px">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
