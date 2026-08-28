import { NextResponse } from "next/server";

const POSTMARK_ENDPOINT = "https://api.postmarkapp.com/email";
const MAX_FIELD_LENGTH = 600;
const JSON_HEADERS = { "cache-control": "no-store" };

type DemoAccessPayload = {
  name?: unknown;
  storeName?: unknown;
  email?: unknown;
  website?: unknown;
  sourcePath?: unknown;
  sourceUrl?: unknown;
  referrer?: unknown;
};

export async function POST(request: Request) {
  let payload: DemoAccessPayload;

  try {
    payload = (await request.json()) as DemoAccessPayload;
  } catch {
    return jsonResponse({ message: "Please check your details and try again." }, 400);
  }

  if (field(payload.website)) {
    return jsonResponse({ message: "Demo access granted." });
  }

  const lead = {
    name: field(payload.name),
    storeName: field(payload.storeName),
    email: field(payload.email),
    sourcePath: field(payload.sourcePath) || field(request.headers.get("referer")),
    sourceUrl: field(payload.sourceUrl) || field(request.headers.get("referer")),
    referrer: field(payload.referrer) || field(request.headers.get("referer")),
  };

  if (!lead.name || !lead.storeName || !lead.email || !isEmail(lead.email)) {
    return jsonResponse(
      { message: "Name, store name, and a valid email are required." },
      400,
    );
  }

  const runtime = await loadRuntimeEnv();
  const postmarkToken = runtimeEnv(runtime, "POSTMARK_SERVER_TOKEN");
  const fromEmail = runtimeEnv(runtime, "POSTMARK_FROM_EMAIL");
  const toEmail = runtimeEnv(runtime, "LINKD_ALERT_TO_EMAIL");
  const messageStream = runtimeEnv(runtime, "POSTMARK_MESSAGE_STREAM") || "outbound";

  if (!postmarkToken || !fromEmail || !toEmail) {
    return jsonResponse(
      { message: "Contact delivery is temporarily unavailable." },
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
      To: toEmail,
      ReplyTo: lead.email,
      Subject: `Linkd guided demo: ${lead.storeName}`,
      TextBody: buildTextEmail(lead),
      HtmlBody: buildHtmlEmail(lead),
      MessageStream: messageStream,
    }),
  });

  if (!response.ok) {
    return jsonResponse({ message: "Contact delivery is temporarily unavailable." }, 502);
  }

  return jsonResponse({ message: "Demo access granted." });
}

function jsonResponse(body: { message: string }, status = 200) {
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

function buildTextEmail(lead: {
  name: string;
  storeName: string;
  email: string;
  sourcePath: string;
  sourceUrl: string;
  referrer: string;
}) {
  return [
    "New Linkd guided demo visitor",
    "",
    `Name: ${lead.name}`,
    `Store: ${lead.storeName}`,
    `Email: ${lead.email}`,
    `Source page: ${lead.sourcePath || "Not provided"}`,
    `Source URL: ${lead.sourceUrl || "Not provided"}`,
    `Referrer: ${lead.referrer || "Not provided"}`,
  ].join("\n");
}

function buildHtmlEmail(lead: {
  name: string;
  storeName: string;
  email: string;
  sourcePath: string;
  sourceUrl: string;
  referrer: string;
}) {
  const rows = [
    ["Name", lead.name],
    ["Store", lead.storeName],
    ["Email", lead.email],
    ["Source page", lead.sourcePath || "Not provided"],
    ["Source URL", lead.sourceUrl || "Not provided"],
    ["Referrer", lead.referrer || "Not provided"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#121826;line-height:1.5">
      <h1 style="font-size:22px;margin:0 0 16px">New Linkd guided demo visitor</h1>
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
