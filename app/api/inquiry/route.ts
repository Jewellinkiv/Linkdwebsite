import { NextResponse } from "next/server";

const POSTMARK_ENDPOINT = "https://api.postmarkapp.com/email";
const MAX_FIELD_LENGTH = 1200;

type InquiryPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  locations?: unknown;
  currentPos?: unknown;
  timeline?: unknown;
  preferredContact?: unknown;
  notes?: unknown;
  website?: unknown;
  interests?: unknown;
};

export async function POST(request: Request) {
  let payload: InquiryPayload;

  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json(
      { message: "Please check the form and try again." },
      { status: 400 },
    );
  }

  if (field(payload.website)) {
    return NextResponse.json({ message: "Thanks." });
  }

  const inquiry = {
    name: field(payload.name),
    email: field(payload.email),
    phone: field(payload.phone),
    company: field(payload.company),
    locations: field(payload.locations),
    currentPos: field(payload.currentPos),
    timeline: field(payload.timeline),
    preferredContact: field(payload.preferredContact),
    notes: field(payload.notes),
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
    return NextResponse.json(
      { message: "Name, email, phone, store, and locations are required." },
      { status: 400 },
    );
  }

  const postmarkToken = process.env.POSTMARK_SERVER_TOKEN;
  const fromEmail = process.env.POSTMARK_FROM_EMAIL;
  const toEmail = process.env.LINKD_ALERT_TO_EMAIL;
  const messageStream = process.env.POSTMARK_MESSAGE_STREAM || "outbound";

  if (!postmarkToken || !fromEmail || !toEmail) {
    return NextResponse.json(
      {
        message:
          "This form is ready for Postmark. Add the Postmark alert environment variables before launch.",
      },
      { status: 503 },
    );
  }

  const subject = `Linkd early access request: ${inquiry.company}`;
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
    return NextResponse.json(
      { message: "Unable to send the alert right now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Thanks. The Linkd team has your request and will follow up soon.",
  });
}

function field(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildTextEmail(inquiry: Required<Omit<InquiryPayload, "interests" | "website">> & { interests: string[] }) {
  return [
    "New Linkd early access request",
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    `Store: ${inquiry.company}`,
    `Locations: ${inquiry.locations}`,
    `Current POS: ${inquiry.currentPos || "Not provided"}`,
    `Timeline: ${inquiry.timeline || "Not provided"}`,
    `Preferred contact: ${inquiry.preferredContact || "Not provided"}`,
    `Interests: ${inquiry.interests.join(", ") || "Not provided"}`,
    "",
    "Notes:",
    inquiry.notes || "Not provided",
  ].join("\n");
}

function buildHtmlEmail(inquiry: Required<Omit<InquiryPayload, "interests" | "website">> & { interests: string[] }) {
  const rows = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Phone", inquiry.phone],
    ["Store", inquiry.company],
    ["Locations", inquiry.locations],
    ["Current POS", inquiry.currentPos || "Not provided"],
    ["Timeline", inquiry.timeline || "Not provided"],
    ["Preferred contact", inquiry.preferredContact || "Not provided"],
    ["Interests", inquiry.interests.join(", ") || "Not provided"],
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
