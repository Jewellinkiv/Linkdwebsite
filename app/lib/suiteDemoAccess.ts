export const SUITE_DEMO_COOKIE = "linkd_suite_demo_access";
export const SUITE_SESSION_AUDIENCE = "linkd-suite-session";
export const SUITE_DEMO_TARGETS = [
  "linkd",
  "jewellink",
  "countretail",
  "jewelhire",
] as const;

export type SuiteDemoTarget = (typeof SUITE_DEMO_TARGETS)[number];

export type SuiteDemoProfile = {
  name: string;
  storeName: string;
  email?: string;
};

type SuiteDemoTokenPayload = SuiteDemoProfile & {
  audience: string;
  expiresAt: number;
  issuedAt: number;
  version: 1;
};

const TOKEN_PREFIX = "sd1";
const TOKEN_CONTEXT = new TextEncoder().encode("linkd-suite-demo:sd1");
const DEVELOPMENT_SECRET =
  "linkd-suite-demo-local-development-only-2026-change-before-production";

export function isSuiteDemoTarget(value: string): value is SuiteDemoTarget {
  return (SUITE_DEMO_TARGETS as readonly string[]).includes(value);
}

export async function getSuiteDemoSecret() {
  let runtime: Record<string, string | undefined> = {};

  try {
    const cloudflare = await import("cloudflare:workers");
    runtime = cloudflare.env;
  } catch {
    // Local Next runtimes read from process.env instead.
  }

  const configured =
    runtime.SUITE_DEMO_SIGNING_SECRET ?? process.env.SUITE_DEMO_SIGNING_SECRET;

  if (configured) return configured;
  return process.env.NODE_ENV === "production" ? "" : DEVELOPMENT_SECRET;
}

export async function sealSuiteDemoToken({
  audience,
  profile,
  secret,
  ttlSeconds,
}: {
  audience: string;
  profile: SuiteDemoProfile;
  secret: string;
  ttlSeconds: number;
}) {
  if (!secret) throw new Error("Suite demo signing secret is unavailable.");

  const now = Math.floor(Date.now() / 1000);
  const payload: SuiteDemoTokenPayload = {
    audience,
    email: profile.email,
    expiresAt: now + ttlSeconds,
    issuedAt: now,
    name: profile.name,
    storeName: profile.storeName,
    version: 1,
  };
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await encryptionKey(secret);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv, additionalData: TOKEN_CONTEXT },
    key,
    new TextEncoder().encode(JSON.stringify(payload)),
  );

  return `${TOKEN_PREFIX}.${base64Url(iv)}.${base64Url(new Uint8Array(encrypted))}`;
}

export async function openSuiteDemoToken({
  audience,
  secret,
  token,
}: {
  audience: string;
  secret: string;
  token: string;
}): Promise<SuiteDemoProfile | null> {
  if (!secret || !token) return null;

  const [prefix, encodedIv, encodedPayload, ...rest] = token.split(".");
  if (
    prefix !== TOKEN_PREFIX ||
    !encodedIv ||
    !encodedPayload ||
    rest.length > 0
  ) {
    return null;
  }

  try {
    const key = await encryptionKey(secret);
    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: fromBase64Url(encodedIv),
        additionalData: TOKEN_CONTEXT,
      },
      key,
      fromBase64Url(encodedPayload),
    );
    const payload = JSON.parse(
      new TextDecoder().decode(decrypted),
    ) as Partial<SuiteDemoTokenPayload>;
    const now = Math.floor(Date.now() / 1000);

    if (
      payload.version !== 1 ||
      payload.audience !== audience ||
      typeof payload.name !== "string" ||
      typeof payload.storeName !== "string" ||
      typeof payload.issuedAt !== "number" ||
      typeof payload.expiresAt !== "number" ||
      payload.issuedAt > now + 60 ||
      payload.expiresAt <= now
    ) {
      return null;
    }

    return {
      name: payload.name,
      storeName: payload.storeName,
      email: typeof payload.email === "string" ? payload.email : undefined,
    };
  } catch {
    return null;
  }
}

export function readCookie(request: Request, name: string) {
  const cookies = request.headers.get("cookie") ?? "";

  for (const entry of cookies.split(";")) {
    const separator = entry.indexOf("=");
    if (separator < 0) continue;
    const cookieName = entry.slice(0, separator).trim();
    if (cookieName !== name) continue;
    return decodeURIComponent(entry.slice(separator + 1).trim());
  }

  return "";
}

async function encryptionKey(secret: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(secret),
  );

  return crypto.subtle.importKey("raw", digest, "AES-GCM", false, [
    "encrypt",
    "decrypt",
  ]);
}

function base64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}
