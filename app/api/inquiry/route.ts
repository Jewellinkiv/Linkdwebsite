import { NextResponse } from "next/server";

const POSTMARK_ENDPOINT = "https://api.postmarkapp.com/email";
const MAX_FIELD_LENGTH = 1200;
const JSON_HEADERS = {
  "cache-control": "no-store",
};

type InquiryPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  locations?: unknown;
  currentPos?: unknown;
  demoFocus?: unknown;
  timeline?: unknown;
  preferredContact?: unknown;
  notes?: unknown;
  website?: unknown;
  sourcePath?: unknown;
  sourceUrl?: unknown;
  referrer?: unknown;
  interests?: unknown;
};

type SanitizedInquiry = {
  name: string;
  email: string;
  phone: string;
  company: string;
  locations: string;
  currentPos: string;
  demoFocus: string;
  timeline: string;
  preferredContact: string;
  notes: string;
  sourcePath: string;
  sourceUrl: string;
  referrer: string;
  interests: string[];
};

export async function POST(request: Request) {
  let payload: InquiryPayload;

  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return jsonResponse({ message: "Please check the form and try again." }, 400);
  }

  if (field(payload.website)) {
    return jsonResponse({ message: "Thanks." });
  }

  const inquiry = {
    name: field(payload.name),
    email: field(payload.email),
    phone: field(payload.phone),
    company: field(payload.company),
    locations: field(payload.locations),
    currentPos: field(payload.currentPos),
    demoFocus: field(payload.demoFocus),
    timeline: field(payload.timeline),
    preferredContact: field(payload.preferredContact),
    notes: field(payload.notes),
    sourcePath: field(payload.sourcePath) || field(request.headers.get("referer")),
    sourceUrl: field(payload.sourceUrl) || field(request.headers.get("referer")),
    referrer: field(payload.referrer) || field(request.headers.get("referer")),
    interests: Array.isArray(payload.interests)
      ? payload.interests.map(field).filter(Boolean).slice(0, 20)
      : [],
  };

  if (
    !inquiry.name ||
    !inquiry.email ||
    !isEmail(inquiry.email) ||
    !inquiry.phone ||
    !inquiry.company ||
    !inquiry.locations
  ) {
    return jsonResponse(
      { message: "Name, email, phone, store, and locations are required." },
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
      {
        message:
          "Demo requests are temporarily unavailable. Please try again shortly.",
      },
      503,
    );
  }

  const subject = `Linkd demo request: ${inquiry.company}`;
  const htmlBody = buildHtmlEmail(inquiry);
  const textBody = buildTextEmail(inquiry);

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
      ReplyTo: inquiry.email,
      Subject: subject,
      HtmlBody: htmlBody,
      TextBody: textBody,
      MessageStream: messageStream,
    }),
  });

  if (!response.ok) {
    return jsonResponse(
      { message: "Unable to send the alert right now. Please try again." },
      502,
    );
  }

  return jsonResponse({
    message: "Thanks. The Linkd team has your request and will follow up soon.",
  });
}

function jsonResponse(body: { message: string }, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: JSON_HEADERS,
  });
}

function field(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
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

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildTextEmail(inquiry: SanitizedInquiry) {
  return [
    "New Linkd early access request",
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    `Store: ${inquiry.company}`,
    `Locations: ${inquiry.locations}`,
    `Current POS: ${inquiry.currentPos || "Not provided"}`,
    `Demo focus: ${inquiry.demoFocus || "Not provided"}`,
    `Timeline: ${inquiry.timeline || "Not provided"}`,
    `Preferred contact: ${inquiry.preferredContact || "Not provided"}`,
    `Interests: ${inquiry.interests.join(", ") || "Not provided"}`,
    `Source page: ${inquiry.sourcePath || "Not provided"}`,
    `Source URL: ${inquiry.sourceUrl || "Not provided"}`,
    `Referrer: ${inquiry.referrer || "Not provided"}`,
    "",
    "Notes:",
    inquiry.notes || "Not provided",
  ].join("\n");
}

function buildHtmlEmail(inquiry: SanitizedInquiry) {
  const rows = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Phone", inquiry.phone],
    ["Store", inquiry.company],
    ["Locations", inquiry.locations],
    ["Current POS", inquiry.currentPos || "Not provided"],
    ["Demo focus", inquiry.demoFocus || "Not provided"],
    ["Timeline", inquiry.timeline || "Not provided"],
    ["Preferred contact", inquiry.preferredContact || "Not provided"],
    ["Interests", inquiry.interests.join(", ") || "Not provided"],
    ["Source page", inquiry.sourcePath || "Not provided"],
    ["Source URL", inquiry.sourceUrl || "Not provided"],
    ["Referrer", inquiry.referrer || "Not provided"],
    ["Notes", inquiry.notes || "Not provided"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#121826;line-height:1.5">
      <h1 style="font-size:22px;margin:0 0 16px">New Linkd early access request</h1>
      <table style="border-collapse:collapse;width:100%;max-width:680px">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="border:1px solid #e3e8f2;padding:10px;font-weight:700;background:#f6f8fb;width:180px">${escapeHtml(label)}</td>
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
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
