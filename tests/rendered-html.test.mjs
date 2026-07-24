import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Linkd landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /The operational core for modern jewelry retail\./i);
  assert.match(html, /Request early access/i);
  assert.match(html, /JewelLink CRM/i);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview/i);
});

test("keeps Postmark configuration documented in code", async () => {
  const route = await readFile(
    new URL("../app/api/inquiry/route.ts", import.meta.url),
    "utf8",
  );

  assert.match(route, /POSTMARK_SERVER_TOKEN/);
  assert.match(route, /POSTMARK_FROM_EMAIL/);
  assert.match(route, /LINKD_ALERT_TO_EMAIL/);
  assert.match(route, /x-postmark-server-token/i);
});
