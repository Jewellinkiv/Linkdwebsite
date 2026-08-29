import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  return request(path, {
    headers: { accept: "text/html" },
  });
}

async function request(path = "/", init = {}, runtimeEnv = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, init),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
      ...runtimeEnv,
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function pngSize(path) {
  const buffer = await readFile(new URL(path, import.meta.url));
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

test("server-renders the Linkd landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Luxury jewelry POS software/i);
  assert.match(html, /href="#main-content"/i);
  assert.match(html, /id="main-content"/i);
  assert.match(html, /tabindex="-1"/i);
  assert.match(html, /Skip to content/i);
  assert.match(html, /Book a Demo/i);
  assert.match(html, /operating center of the Linkd Ecosystem/i);
  assert.match(html, /JewelLink CRM/i);
  assert.match(html, /linkd-pos-cart-demo-v2\.webp/i);
  assert.match(html, /Linkd POS showing Val Jones, four jewelry and service lines/i);
  assert.match(html, /app\.linkd\.com\/pos/i);
  assert.match(html, /Run the whole store\. Connect the/i);
  assert.match(html, /See the ecosystem from its operational center/i);
  assert.match(html, /href="\/suite-demo"/i);
  assert.match(html, /Explore the Linkd Suite/i);
  assert.match(html, /href="\/suite-demo"[^>]*>\s*See the System/i);
  assert.match(html, /Four workflows\. One operating system\./i);
  assert.match(html, /Four operating engines\. One system your team can trust/i);
  assert.match(html, /Payment processing should strengthen the business/i);
  assert.match(html, /Receivables/i);
  assert.match(html, /Service workflows/i);
  assert.match(html, /Inventory movement/i);
  assert.match(html, /Every part of the store, one core/i);
  assert.match(html, /Operational core/i);
  assert.match(html, /Payments/i);
  assert.match(html, /Services &amp; Repairs|Services & Repairs/i);
  assert.match(html, /Every screen is built around the work your team actually does/i);
  assert.match(html, /Linkd POS showing Val Jones, jewelry items, a service line, and payment totals/i);
  assert.match(html, /Linkd inventory workspace showing serialized jewelry, location, status, and retail value/i);
  assert.match(html, /Linkd repairs and services workspace with intake, bench, ready, and turnaround data/i);
  assert.match(html, /CountRetail/i);
  assert.match(html, /One family of products/i);
  assert.match(html, /Operations, relationships, intelligence, and people\./i);
  assert.match(html, /Linkd records the operation/i);
  assert.match(html, /JewelLink grows the relationship/i);
  assert.match(html, /CountRetail explains the store/i);
  assert.match(html, /JewelHire helps build the team/i);
  assert.match(html, /jewelhire-recruiting-pipeline\.webp/i);
  assert.match(html, /href="https:\/\/www\.jewellink\.com\/"/i);
  assert.match(html, /href="https:\/\/www\.countretail\.com\/"/i);
  assert.match(html, /href="https:\/\/jewelhire\.com\/"/i);
  assert.doesNotMatch(html, /jewelhire\.ai/i);
  assert.match(html, /POS, services, inventory, and accounts\./i);
  assert.match(html, /Compare the Stack/i);
  assert.match(html, /QuickBooks/i);
  assert.match(html, /Sage/i);
  assert.match(html, /Open API/i);
  assert.match(html, /See Linkd run a real day at the counter/i);
  assert.match(html, /Your history comes with you\. Your momentum never leaves\./i);
  assert.match(html, /Start with the essentials/i);
  assert.match(html, /How is Linkd different from JewelLink/i);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /SoftwareApplication/i);
  assert.match(html, /isRelatedTo/i);
  assert.match(html, /knowsAbout/i);
  assert.match(html, /Relationship layer for CRM/i);
  assert.match(html, /Intelligence layer for traffic/i);
  assert.match(html, /Jewelry point of sale/i);
  assert.match(html, /Linkd product and ecosystem pages/i);
  assert.match(html, /https:\/\/linkd\.com\/jewelry-pos/i);
  assert.match(html, /https:\/\/linkd\.com\/repairs/i);
  assert.match(html, /https:\/\/linkd\.com\/accounting/i);
  assert.match(html, /https:\/\/linkd\.com\/multi-store/i);
  assert.match(html, /https:\/\/linkd\.com\/ecosystem/i);
  assert.match(html, /ItemList/i);
  assert.match(html, /SiteNavigationElement/i);
  assert.match(html, /Linkd product and workflow navigation/i);
  assert.match(html, /Repair, appraisal, and service workflows/i);
  assert.match(html, /Multi-store transfer controls/i);
  assert.match(html, /Jewelry POS integrations/i);
  assert.match(html, /site\.webmanifest/i);
  assert.match(html, /icon-512\.png/i);
  assert.match(html, /max-image-preview:large/i);
  assert.match(html, /FAQPage/i);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview/i);
});

test("server-renders focused SEO landing pages", async () => {
  const cases = [
    [
      "/payments",
      /Better payment economics, built into the sale/i,
      /Tender decisions beside the sale/i,
      /jewelry store payment processing/i,
    ],
    [
      "/jewelry-pos",
      /POS built around the way jewelers actually sell/i,
      /Checkout and service intake/i,
      /luxury jewelry point of sale/i,
    ],
    [
      "/inventory",
      /Inventory control from case to vault/i,
      /Serialized inventory lookup/i,
      /RFID jewelry inventory/i,
    ],
    [
      "/repairs",
      /Repairs, appraisals, and services connected to the sale/i,
      /Repair bench, intake to pickup/i,
      /jewelry repair intake software/i,
    ],
    [
      "/security",
      /Controls for the counter, the case, and the back office/i,
      /Reports for sensitive review/i,
      /jewelry POS permissions/i,
    ],
    [
      "/ecosystem",
      /Four systems\. One jewelry business/i,
      /One stack that agrees with itself/i,
      /jewelry retail ecosystem/i,
    ],
    [
      "/integrations",
      /One operational record\. Every essential connection/i,
      /Integration health at a glance/i,
      /jewelry POS integrations/i,
    ],
    [
      "/accounting",
      /House accounts, layaway, and accounting handoff without drift/i,
      /Accounting-ready review/i,
      /jewelry store accounting/i,
    ],
    [
      "/multi-store",
      /One operating record across every location/i,
      /Controlled store transfers/i,
      /multi-store jewelry POS/i,
    ],
  ];

  for (const [path, heading, proof, keyword] of cases) {
    const response = await render(path);
    assert.equal(response.status, 200, path);

    const html = await response.text();
    assert.match(html, heading);
    assert.match(html, proof);
    assert.match(html, /name="keywords"/i);
    assert.match(html, keyword);
    assert.match(html, /Book a Demo/i);
    assert.match(html, /href="#early-access"/);
    assert.match(html, /id="early-access"/);
    assert.match(html, /Start with the essentials/i);
    assert.match(html, /FAQPage/i);
    assert.match(html, /BreadcrumbList/i);
    assert.match(html, /WebPage/i);
    assert.match(html, /Linkd/i);
    assert.match(html, /og:image:width/i);
    assert.match(html, path === "/ecosystem" ? /1200/ : /1800/);
    assert.match(html, /og:image:height/i);
    assert.match(html, path === "/ecosystem" ? /630/ : /1200/);
    if (path !== "/ecosystem") {
      const currentHref = path === "/integrations"
        ? "/integrations"
        : path === "/payments"
          ? "/payments"
          : "/jewelry-pos";
      assert.match(
        html,
        new RegExp(
          `<a(?=[^>]*aria-current="page")(?=[^>]*href="${currentHref.replace("/", "\\/")}")`,
        ),
      );
      assert.match(html, /Screen proof/i);
      assert.match(html, /See the workflow before the paragraph/i);
      assert.match(html, /href="#product-screens"/);
      assert.match(html, /id="product-screens"/);
      assert.match(html, /Workflow outcomes/i);
      assert.match(html, /Less explanation\. More operational proof\./i);
      assert.match(html, /Where Linkd fits/i);
      assert.match(html, /POS, inventory, accounts, audits/i);
      assert.match(html, /CRM, clienteling, team follow-up/i);
      assert.match(html, /Traffic, Vision AI, owner insight/i);
      assert.match(html, /Hiring, assessment, and onboarding/i);
      assert.match(html, /Compare the Stack/i);
      assert.match(html, /Related workflows/i);
      assert.match(html, /Jump to the next operating question/i);
      assert.match(html, /related Linkd workflows/i);
      assert.match(html, /significantLink/i);
      assert.match(html, /related-workflow-card/i);
      assert.match(
        html,
        new RegExp(`https://linkd\\.com/(?!${path.slice(1)}["/#])[^"]+`),
      );
      assert.doesNotMatch(html, /href="\/#workflows"/);
      assert.match(html, /SoftwareApplication/i);
      assert.match(html, /BusinessApplication/i);
      assert.doesNotMatch(html, /PreOrder/i);
      assert.match(html, /ContactAction/i);
      assert.match(html, /isRelatedTo/i);
      assert.match(html, /BusinessIntelligenceApplication/i);
      assert.match(html, /Relationship layer for CRM/i);
      assert.match(html, /Intelligence layer for traffic/i);
      assert.match(html, /https:\/\/www\.jewellink\.com\//i);
      assert.match(html, /https:\/\/www\.countretail\.com\//i);
      assert.match(html, /https:\/\/jewelhire\.com\//i);
      assert.doesNotMatch(html, /jewelhire\.ai/i);
      assert.match(
        html,
        new RegExp(`https://linkd\\.com${path}#early-access`),
      );
      assert.match(html, /Luxury jewelry retailers/i);
      assert.match(html, /linkd-customer-overview-demo-v2\.webp|linkd-integrations\.webp/);
    } else {
      assert.match(html, /What happened at the counter/i);
      assert.match(html, /Who needs follow-up/i);
      assert.match(html, /What is the store telling us/i);
      assert.match(html, /Who will carry the store forward/i);
      assert.match(
        html,
        /<a(?=[^>]*aria-current="page")(?=[^>]*href="\/ecosystem")/,
      );
      assert.match(html, /Linkd Ecosystem product roles/i);
      assert.match(html, /Linkd Ecosystem visual role map/i);
      assert.match(html, /POS \/ inventory \/ accounts/i);
      assert.match(html, /CRM \/ clienteling \/ training/i);
      assert.match(html, /Traffic \/ Vision AI \/ analytics/i);
      assert.match(html, /Hiring \/ assessment \/ onboarding/i);
      assert.match(html, /jewelhire-recruiting-pipeline\.webp/i);
      assert.match(html, /href="https:\/\/www\.jewellink\.com\/"/i);
      assert.match(html, /href="https:\/\/www\.countretail\.com\/"/i);
      assert.match(html, /href="https:\/\/jewelhire\.com\/"/i);
      assert.doesNotMatch(html, /jewelhire\.ai/i);
      assert.match(html, /href="\/repairs"/);
      assert.match(html, /href="\/accounting"/);
      assert.match(html, /href="\/multi-store"/);
      assert.match(html, /Operational core for jewelry POS/i);
      assert.match(html, /Relationship layer for CRM/i);
      assert.match(html, /Intelligence layer for traffic/i);
      assert.match(html, /linkd-pos-cart-demo-card-v2\.webp/);
      assert.match(html, /https:\/\/linkd\.com\/ecosystem#early-access/i);
    }
  }
});

test("renders a branded not-found page", async () => {
  const response = await render("/missing-launch-page");
  assert.equal(response.status, 404);

  const html = await response.text();
  assert.match(html, /Back to the operational core/i);
  assert.match(html, /Return to Linkd/i);
});

test("keeps utility pages out of the ranked SEO surface", async () => {
  const response = await render("/login");
  assert.equal(response.status, 200);

  const html = await response.text();
  const sitemap = await readFile(
    new URL("../public/sitemap.xml", import.meta.url),
    "utf8",
  );

  assert.match(html, /Linkd POS Login/i);
  assert.match(html, /noindex/i);
  assert.doesNotMatch(sitemap, /\/login/);
});

test("server-renders the guided Linkd workflow chooser", async () => {
  const response = await render("/guided-demo");
  assert.equal(response.status, 200);

  const html = await response.text();
  const sitemap = await readFile(
    new URL("../public/sitemap.xml", import.meta.url),
    "utf8",
  );

  assert.match(html, /Guided Demo/i);
  assert.match(html, /Sample data/i);
  assert.match(html, /Make a sale/i);
  assert.match(html, /Repair intake/i);
  assert.match(html, /Custom intake/i);
  assert.match(html, /AI invoice import/i);
  assert.match(html, /Inventory entry/i);
  assert.match(html, /Know the customer/i);
  assert.match(html, /Run the day as an owner/i);
  assert.match(html, /security exception/i);
  assert.match(html, /name="name"/i);
  assert.match(html, /name="storeName"/i);
  assert.match(html, /name="email"/i);
  assert.doesNotMatch(html, /name="phone"|name="locations"/i);
  assert.doesNotMatch(html, /Open with sample demo details/i);
  assert.match(html, /noindex/i);
  assert.doesNotMatch(sitemap, /\/guided-demo/);
});

test("validates guided-demo access without caching responses", async () => {
  const response = await request("/api/demo-access", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "Alex Morgan",
      storeName: "Demo Jewelers",
      email: "invalid",
    }),
  });

  assert.equal(response.status, 400);
  assert.match(response.headers.get("cache-control") ?? "", /no-store/i);
  const result = await response.json();
  assert.match(result.message, /valid email/i);
});

test("server-renders one Linkd Suite gate with four visible tour choices", async () => {
  const response = await render("/suite-demo");
  assert.equal(response.status, 200);
  const html = await response.text();
  const sitemap = await readFile(
    new URL("../public/sitemap.xml", import.meta.url),
    "utf8",
  );

  assert.match(html, /One introduction\. Four guided experiences\./i);
  assert.match(html, /Unlock every tour once/i);
  assert.match(html, /name="name"/i);
  assert.match(html, /name="storeName"/i);
  assert.match(html, /name="email"/i);
  assert.match(html, /Unlock all four tours/i);
  assert.match(html, /Linkd/i);
  assert.match(html, /JewelLink/i);
  assert.match(html, /CountRetail/i);
  assert.match(html, /JewelHire/i);
  assert.match(html, /Works independently/i);
  assert.match(html, /Connected advantage/i);
  assert.match(html, /Choose your guided tour/i);
  assert.match(html, /noindex/i);
  assert.doesNotMatch(sitemap, /\/suite-demo/);
});

test("validates suite-demo leads and keeps responses uncached", async () => {
  const response = await request("/api/suite-demo-access", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "Val Jones",
      storeName: "Linkd Demo Jewelers",
      email: "invalid",
    }),
  });
  assert.equal(response.status, 400);
  assert.match(response.headers.get("cache-control") ?? "", /no-store/i);
  const result = await response.json();
  assert.equal(result.ok, false);
  assert.match(result.message, /valid work email/i);
});

test("one suite submission launches and verifies every product without PII in URLs", async () => {
  const originalFetch = globalThis.fetch;
  let postmarkMessage;
  globalThis.fetch = async (input, init) => {
    if (String(input) !== "https://api.postmarkapp.com/email") {
      return originalFetch(input, init);
    }
    postmarkMessage = JSON.parse(init.body);
    return Response.json({ MessageID: "test-message" });
  };

  const env = {
    POSTMARK_SERVER_TOKEN: "test-postmark-token",
    POSTMARK_FROM_EMAIL: "Linkd <no-reply@linkd.com>",
    POSTMARK_MESSAGE_STREAM: "outbound",
    SUITE_DEMO_SIGNING_SECRET: "linkd-suite-test-secret-that-is-long-enough-for-aes",
  };
  const previousEnv = Object.fromEntries(
    Object.keys(env).map((key) => [key, process.env[key]]),
  );
  Object.assign(process.env, env);

  try {
    const access = await request("/api/suite-demo-access", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Val Jones",
        storeName: "Linkd Demo Jewelers",
        email: "val@example.com",
        sourcePath: "/suite-demo",
      }),
    }, env);

    assert.equal(access.status, 200);
    assert.match(postmarkMessage.Subject, /Linkd Suite \(all systems\) demo: Linkd Demo Jewelers/);
    assert.equal(postmarkMessage.To, "support@jewellink.com");
    const cookie = access.headers.get("set-cookie");
    assert.match(cookie, /linkd_suite_demo_access=/);
    assert.match(cookie, /HttpOnly/i);
    assert.match(cookie, /SameSite=Lax/i);
    const cookiePair = cookie.split(";", 1)[0];

    const restored = await request("/api/suite-demo-session", {
      headers: { cookie: cookiePair },
    }, env);
    assert.deepEqual(await restored.json(), {
      ok: true,
      profile: { name: "Val Jones", storeName: "Linkd Demo Jewelers" },
    });

    const direct = await request("/api/suite-demo-launch?target=linkd", {
      headers: { cookie: cookiePair },
      redirect: "manual",
    }, env);
    assert.equal(direct.status, 303);
    assert.match(direct.headers.get("location"), /\/guided-demo$/);

    for (const target of ["jewellink", "countretail", "jewelhire"]) {
      const launch = await request(`/api/suite-demo-launch?target=${target}`, {
        headers: { cookie: cookiePair },
        redirect: "manual",
      }, env);
      assert.equal(launch.status, 303);
      const location = new URL(launch.headers.get("location"));
      assert.equal(location.searchParams.has("name"), false);
      assert.equal(location.searchParams.has("storeName"), false);
      assert.equal(location.searchParams.has("email"), false);
      const pass = location.searchParams.get("pass");
      assert.ok(pass);

      const verification = await request("/api/suite-demo-verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ pass, target }),
      }, env);
      assert.equal(verification.status, 200);
      assert.deepEqual(await verification.json(), {
        ok: true,
        profile: { name: "Val Jones", storeName: "Linkd Demo Jewelers" },
      });
    }
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries(previousEnv)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test("keeps the guided sale deterministic and connected", async () => {
  const chooser = await readFile(
    new URL("../app/guided-demo/GuidedDemoChooser.tsx", import.meta.url),
    "utf8",
  );
  const saleStory = await readFile(
    new URL("../app/guided-demo/MakeSaleStory.tsx", import.meta.url),
    "utf8",
  );

  assert.match(chooser, /setActiveWorkflow\(workflow\.id\)/);
  assert.match(chooser, /Start guided sale/i);
  assert.match(saleStory, /STEP \$\{step \+ 1\} OF 5/);
  assert.match(saleStory, /Alexus Jones/);
  assert.match(saleStory, /LNK-004821/);
  assert.match(saleStory, /ITEM_PRICE = 495_000/);
  assert.doesNotMatch(saleStory, /SERVICE_PRICE/);
  assert.match(saleStory, /TAX_RATE_BPS = 825/);
  assert.match(saleStory, /Sale S-10428/);
  assert.match(saleStory, /SALE RECEIPT/);
  assert.match(saleStory, /Receipt R-10428/);
  assert.match(saleStory, /setPostingSummaryOpen\(true\)/);
  assert.doesNotMatch(saleStory, /Service created/);
  assert.match(saleStory, /Visa •••• 4242/);
  assert.match(saleStory, /onComplete\(\)/);
  assert.match(saleStory, /Choose another workflow/);
});

test("keeps the guided repair deterministic, documented, and reviewable", async () => {
  const chooser = await readFile(
    new URL("../app/guided-demo/GuidedDemoChooser.tsx", import.meta.url),
    "utf8",
  );
  const repairStory = await readFile(
    new URL("../app/guided-demo/RepairStory.tsx", import.meta.url),
    "utf8",
  );

  assert.match(chooser, /"repair-management"/);
  assert.match(chooser, /<RepairStory/);
  assert.match(chooser, /Start guided repair/i);
  assert.match(repairStory, /STEP \$\{step \+ 1\} OF 8/);
  assert.match(repairStory, /Maya Thompson/);
  assert.match(repairStory, /REP-ITEM-00972/);
  assert.match(repairStory, /R-0317/);
  assert.match(repairStory, /DEPOSIT = 25_000/);
  assert.match(repairStory, /TAX_RATE_BPS = 825/);
  assert.match(repairStory, /RP-PRONG-02/);
  assert.match(repairStory, /CLN-POLISH-01/);
  assert.match(repairStory, /Repair Intake/);
  assert.match(repairStory, /Watch Repair/);
  assert.match(repairStory, /Custom Job/);
  assert.match(repairStory, /Special Order/);
  assert.match(repairStory, /Add Photos/);
  assert.match(repairStory, /Add Suggested SKUs/);
  assert.match(repairStory, /Add Media References/);
  assert.match(repairStory, /SIMULATED AI SUGGEST/);
  assert.match(repairStory, /Review the suggested result before saving/);
  assert.match(repairStory, /skuDecisions/);
  assert.match(repairStory, /"included" \| "excluded"/);
  assert.match(repairStory, /Include/);
  assert.match(repairStory, /Exclude/);
  assert.match(repairStory, /REPAIR ITEM AND PROMISE/);
  assert.match(repairStory, /INTAKE EVIDENCE/);
  assert.match(repairStory, /Declared Value/);
  assert.match(repairStory, /In store custody/);
  assert.match(repairStory, /Service Location/);
  assert.match(repairStory, /REPAIR TASKS/);
  assert.match(repairStory, /READY NOTIFICATION/);
  assert.match(repairStory, /Add to Sale/);
  assert.match(repairStory, /Tender/);
  assert.match(repairStory, /Complete Sale/);
  assert.match(repairStory, /SIMULATED UPDATE/);
  assert.match(repairStory, /Mark Ready for Pickup/);
  assert.match(repairStory, /No message has been sent/);
  assert.match(repairStory, /onBenchChange\(true\)/);
  assert.match(repairStory, /useDialogFocusTrap/);
  assert.match(repairStory, /data-repair-guide-target/);
  assert.match(repairStory, /onComplete\(\)/);
  assert.doesNotMatch(repairStory, /fetch\(|Math\.random|new Date/);

  const sourceNumber = (name) => {
    const match = repairStory.match(new RegExp(`const ${name} = ([\\d_]+);`));
    assert.ok(match, `${name} should be a fixed integer`);
    return Number(match[1].replaceAll("_", ""));
  };
  const skuPrices = [...repairStory.matchAll(/price: ([\d_]+),/g)]
    .map((match) => Number(match[1].replaceAll("_", "")));
  const taxRateBps = sourceNumber("TAX_RATE_BPS");
  const deposit = sourceNumber("DEPOSIT");
  assert.equal(skuPrices.length, 2);
  const subtotal = skuPrices.reduce((sum, price) => sum + price, 0);
  const tax = Math.round((subtotal * taxRateBps) / 10_000);

  assert.equal(subtotal, 50_000);
  assert.equal(tax, 4_125);
  assert.equal(subtotal + tax, 54_125);
  assert.equal(subtotal + tax - deposit, 29_125);
});

test("keeps the guided custom job deterministic, reviewable, and connected", async () => {
  const chooser = await readFile(
    new URL("../app/guided-demo/GuidedDemoChooser.tsx", import.meta.url),
    "utf8",
  );
  const customStory = await readFile(
    new URL("../app/guided-demo/CustomStory.tsx", import.meta.url),
    "utf8",
  );

  assert.match(chooser, /"custom-management"/);
  assert.match(chooser, /<CustomStory/);
  assert.match(chooser, /Start guided custom job/i);
  assert.match(customStory, /STEP \$\{step \+ 1\} OF 8/);
  assert.match(customStory, /Eleanor Price/);
  assert.match(customStory, /C-0428/);
  assert.match(customStory, /CUST-STONE-00428/);
  assert.match(customStory, /DEPOSIT = 150_000/);
  assert.match(customStory, /TAX_RATE_BPS = 825/);
  assert.match(customStory, /CUST-CAD-01/);
  assert.match(customStory, /CUST-FAB-18K/);
  assert.match(customStory, /APP-FINAL-01/);
  assert.match(customStory, /Custom Job Intake/);
  assert.match(customStory, /COPY FROM ACTIVE CUSTOM JOB/);
  assert.match(customStory, /DESIGN REFERENCES &amp; MEDIA/);
  assert.match(customStory, /END PRODUCT &amp; DESIGN BRIEF/);
  assert.match(customStory, /Add Suggested SKUs/);
  assert.match(customStory, /SIMULATED AI SUGGEST/);
  assert.match(customStory, /Include/);
  assert.match(customStory, /Exclude/);
  assert.match(customStory, /CUSTOMER PROPERTY &amp; CUSTODY/);
  assert.match(customStory, /BUILD MATERIAL/);
  assert.match(customStory, /Estimate only/);
  assert.match(customStory, /Needs Approval/);
  assert.match(customStory, /SIMULATED CUSTOMER UPDATE/);
  assert.match(customStory, /Approve Design &amp; Start Production/);
  assert.match(customStory, /No message has been sent/);
  assert.match(customStory, /useDialogFocusTrap/);
  assert.match(customStory, /data-custom-guide-target/);
  assert.match(customStory, /onComplete\(\)/);
  assert.doesNotMatch(customStory, /fetch\(|Math\.random|new Date/);

  const constant = (name) => {
    const match = customStory.match(new RegExp(`const ${name} = ([\\d_]+);`));
    assert.ok(match, `${name} should be a numeric constant`);
    return Number(match[1].replaceAll("_", ""));
  };
  const skuPrices = [...customStory.matchAll(/price: ([\d_]+),/g)]
    .map((match) => Number(match[1].replaceAll("_", "")));
  const subtotal = skuPrices.reduce((sum, price) => sum + price, 0);
  const tax = Math.round((subtotal * constant("TAX_RATE_BPS")) / 10_000);
  const total = subtotal + tax;
  const deposit = Math.min(constant("DEPOSIT"), total);

  assert.equal(subtotal, 337_500);
  assert.equal(tax, 27_844);
  assert.equal(total, 365_344);
  assert.equal(deposit, 150_000);
  assert.equal(total - deposit, 215_344);
});

test("keeps the AI invoice walkthrough deterministic and human-reviewed", async () => {
  const chooser = await readFile(
    new URL("../app/guided-demo/GuidedDemoChooser.tsx", import.meta.url),
    "utf8",
  );
  const invoiceStory = await readFile(
    new URL("../app/guided-demo/InvoiceAiStory.tsx", import.meta.url),
    "utf8",
  );

  assert.match(chooser, /"invoice-ai"/);
  assert.match(chooser, /<InvoiceAiStory/);
  assert.match(chooser, /Start guided invoice import/i);
  assert.match(invoiceStory, /STEP \$\{step \+ 1\} OF 6/);
  assert.match(invoiceStory, /Stuller Invoice INV-884193\.pdf/);
  assert.match(invoiceStory, /SIMULATED VISION AI/);
  assert.match(invoiceStory, /DRAFTS ONLY/);
  assert.match(invoiceStory, /Human review is required/);
  assert.match(invoiceStory, /Resolve fields/);
  assert.match(invoiceStory, /Approve draft/);
  assert.match(invoiceStory, /Create 4 Inventory Items/);
  assert.match(invoiceStory, /LNK-006814/);
  assert.match(invoiceStory, /LNK-006817/);
  assert.match(invoiceStory, /Corporate Inventory Intake/);
  assert.match(invoiceStory, /Case Security/);
  assert.match(invoiceStory, /Count Schedules/);
  assert.match(invoiceStory, /Trade-In Management/);
  assert.match(invoiceStory, /FREIGHT = 7_500/);
  assert.match(invoiceStory, /data-invoice-guide-target/);
  assert.match(invoiceStory, /onComplete\(\)/);
  assert.doesNotMatch(invoiceStory, /fetch\(|Math\.random|new Date/);

  const costs = [...invoiceStory.matchAll(/unitCost: ([\d_]+),/g)]
    .map((match) => Number(match[1].replaceAll("_", "")));
  const quantities = [...invoiceStory.matchAll(/quantity: (\d+),/g)]
    .map((match) => Number(match[1]));
  const merchandise = costs.reduce(
    (sum, cost, index) => sum + cost * quantities[index],
    0,
  );

  assert.deepEqual(costs, [82_000, 145_000, 18_500]);
  assert.deepEqual(quantities, [1, 1, 2]);
  assert.equal(merchandise, 264_000);
  assert.equal(merchandise + 7_500, 271_500);
});

test("keeps the inventory management walkthrough serialized and traceable", async () => {
  const chooser = await readFile(
    new URL("../app/guided-demo/GuidedDemoChooser.tsx", import.meta.url),
    "utf8",
  );
  const inventoryStory = await readFile(
    new URL("../app/guided-demo/InventoryManagementStory.tsx", import.meta.url),
    "utf8",
  );

  assert.match(chooser, /"inventory-management"/);
  assert.match(chooser, /<InventoryManagementStory/);
  assert.match(chooser, /Start guided inventory entry/i);
  assert.match(inventoryStory, /STEP \$\{step \+ 1\} OF 7/);
  assert.match(inventoryStory, /Simon G\./);
  assert.match(inventoryStory, /MR2362-W/);
  assert.match(inventoryStory, /ITEM_COST = 745_000/);
  assert.match(inventoryStory, /ITEM_RETAIL = 1_499_500/);
  assert.match(inventoryStory, /LNK-006818/);
  assert.match(inventoryStory, /SG-88421-26/);
  assert.match(inventoryStory, /3034A7B21C0098/);
  assert.match(inventoryStory, /GIA 7482193401/);
  assert.match(inventoryStory, /Manual item entry/);
  assert.match(inventoryStory, /Assign Item Number &amp; Serial/);
  assert.match(inventoryStory, /Generate Barcode \/ RFID Tag/);
  assert.match(inventoryStory, /Corporate Inventory Intake/);
  assert.match(inventoryStory, /Bridal Case 3/);
  assert.match(inventoryStory, /MOVEMENT &amp; MANAGEMENT HISTORY/);
  assert.match(inventoryStory, /POS ready/);
  assert.match(inventoryStory, /Scan ready/);
  assert.match(inventoryStory, /Count ready/);
  assert.match(inventoryStory, /Transfer ready/);
  assert.match(inventoryStory, /No live inventory location is changed/);
  assert.match(inventoryStory, /data-inventory-guide-target/);
  assert.match(inventoryStory, /onComplete\(\)/);
  assert.doesNotMatch(inventoryStory, /fetch\(|Math\.random|new Date/);
});

test("keeps the inventory security walkthrough immutable and accountable", async () => {
  const chooser = await readFile(
    new URL("../app/guided-demo/GuidedDemoChooser.tsx", import.meta.url),
    "utf8",
  );
  const securityStory = await readFile(
    new URL("../app/guided-demo/InventorySecurityStory.tsx", import.meta.url),
    "utf8",
  );

  assert.match(chooser, /"inventory-security"/);
  assert.match(chooser, /<InventorySecurityStory/);
  assert.match(chooser, /Start guided case count/i);
  assert.match(securityStory, /STEP \$\{step \+ 1\} OF 8/);
  assert.match(securityStory, /CNT-20260828-0031/);
  assert.match(securityStory, /EXPECTED_ITEMS = 12/);
  assert.match(securityStory, /SCANNED_ITEMS = 11/);
  assert.match(securityStory, /EXPECTED_VALUE = 8_624_000/);
  assert.match(securityStory, /MISSING_ITEM_VALUE = 1_499_500/);
  assert.match(securityStory, /LNK-006818/);
  assert.match(securityStory, /Count Schedules/);
  assert.match(securityStory, /Scheduled counts/);
  assert.match(securityStory, /Bridal Case 3/);
  assert.match(securityStory, /Scan Case with RFID/);
  assert.match(securityStory, /Barcode scan/);
  assert.match(securityStory, /Entered by hand/);
  assert.match(securityStory, /RFID read/);
  assert.match(securityStory, /Legacy scan/);
  assert.match(securityStory, /Starting freezes the expected population/);
  assert.match(securityStory, /authorized POS viewing checkout/i);
  assert.match(securityStory, /POS Viewing Tray 1/);
  assert.match(securityStory, /Missing — Count Exception/);
  assert.match(securityStory, /Security Log/);
  assert.match(securityStory, /Physical re-scan matched/);
  assert.match(securityStory, /Audit evidence alone cannot perform this step/);
  assert.match(securityStory, /No automatic inventory adjustment/);
  assert.match(securityStory, /immutable audit record created/i);
  assert.match(securityStory, /Jordan Lee/);
  assert.match(securityStory, /data-security-guide-target/);
  assert.match(securityStory, /onComplete\(\)/);
  assert.doesNotMatch(securityStory, /fetch\(|Math\.random|new Date/);
});

test("keeps the customer walkthrough connected and staff-reviewed", async () => {
  const chooser = await readFile(
    new URL("../app/guided-demo/GuidedDemoChooser.tsx", import.meta.url),
    "utf8",
  );
  const customerStory = await readFile(
    new URL("../app/guided-demo/CustomerStory.tsx", import.meta.url),
    "utf8",
  );

  assert.match(chooser, /"customer-story"/);
  assert.match(chooser, /<CustomerStory/);
  assert.match(chooser, /Start customer story/i);
  assert.match(customerStory, /STEP \$\{step \+ 1\} OF 6/);
  assert.match(customerStory, /Alexus Jones/);
  assert.match(customerStory, /C-10491/);
  assert.match(customerStory, /S-10428/);
  assert.match(customerStory, /R-0874/);
  assert.match(customerStory, /LNK-005902/);
  assert.match(customerStory, /September 18/);
  assert.match(customerStory, /Linkd follow-up suggestion/i);
  assert.match(customerStory, /staff member reviews the context/i);
  assert.match(customerStory, /TASK-20841/);
  assert.match(customerStory, /Owner queue updated/);
  assert.match(customerStory, /data-customer-guide-target/);
  assert.match(customerStory, /onComplete\(\)/);
  assert.doesNotMatch(customerStory, /fetch\(|Math\.random|new Date/);
});

test("keeps the owner walkthrough aligned with Linkd Office and Reports", async () => {
  const chooser = await readFile(
    new URL("../app/guided-demo/GuidedDemoChooser.tsx", import.meta.url),
    "utf8",
  );
  const ownerStory = await readFile(
    new URL("../app/guided-demo/OwnerStory.tsx", import.meta.url),
    "utf8",
  );

  assert.match(chooser, /"owner-story"/);
  assert.match(chooser, /<OwnerStory/);
  assert.match(chooser, /Start owner review/i);
  assert.match(ownerStory, /STEP \$\{step \+ 1\} OF 7/);
  assert.match(ownerStory, /Office Today/);
  assert.match(ownerStory, /Closeout Control Record/);
  assert.match(ownerStory, /Daily Closeout Register/);
  assert.match(ownerStory, /Exception Follow-up Queue/);
  assert.match(ownerStory, /Business Day Summary/);
  assert.match(ownerStory, /Four-Plane Money Story/);
  assert.match(ownerStory, /Sales Overview/);
  assert.match(ownerStory, /Revenue, transaction, margin, and tender mix overview/);
  assert.match(ownerStory, /Benchmarking \/ KPI/);
  assert.match(ownerStory, /Service Workload/);
  assert.match(ownerStory, /Inventory Reporting/);
  assert.match(ownerStory, /Aging Reference/);
  assert.match(ownerStory, /does not create or approve a live closeout/i);
  assert.match(ownerStory, /data-owner-guide-target/);
  assert.match(ownerStory, /onComplete\(\)/);
  assert.doesNotMatch(ownerStory, /fetch\(|Math\.random|new Date/);
});

test("gives every guided action a visible purple focus ring", async () => {
  const demoCss = await readFile(
    new URL("../app/guided-demo/guided-demo.module.css", import.meta.url),
    "utf8",
  );

  assert.match(demoCss, /\.guidedTarget\s*\{/);
  assert.match(demoCss, /outline: 2px solid #8b5cf6/i);
  assert.match(demoCss, /rgba\(139, 92, 246, 0\.9\)/i);
  assert.match(demoCss, /rgba\(124, 58, 237, 0\.42\)/i);
  assert.match(demoCss, /@keyframes guidedPulse/);
});

test("keeps Postmark configuration documented in code", async () => {
  const route = await readFile(
    new URL("../app/api/inquiry/route.ts", import.meta.url),
    "utf8",
  );
  const envExample = await readFile(
    new URL("../.env.example", import.meta.url),
    "utf8",
  );

  assert.match(route, /POSTMARK_SERVER_TOKEN/);
  assert.match(route, /POSTMARK_FROM_EMAIL/);
  assert.match(route, /support@jewellink\.com/);
  assert.match(route, /x-postmark-server-token/i);
  assert.match(route, /Demo focus/);
  assert.match(route, /sourcePath/);
  assert.match(route, /sourceUrl/);
  assert.match(route, /referrer/);
  assert.match(route, /Source page/);
  assert.match(route, /Source URL/);
  assert.match(route, /Referrer/);
  assert.match(route, /request\.headers\.get\("referer"\)/);
  assert.match(envExample, /^POSTMARK_SERVER_TOKEN=/m);
  assert.match(envExample, /^POSTMARK_FROM_EMAIL=/m);
  assert.doesNotMatch(envExample, /^LINKD_ALERT_TO_EMAIL=/m);
  assert.match(envExample, /^POSTMARK_MESSAGE_STREAM=outbound/m);
  assert.match(envExample, /^SUITE_DEMO_SIGNING_SECRET=/m);
});

test("keeps inquiry API responses uncached", async () => {
  const response = await request("/api/inquiry", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  });

  assert.equal(response.status, 400);
  assert.match(response.headers.get("cache-control") ?? "", /no-store/i);

  const result = await response.json();
  assert.match(result.message, /required/i);
});

test("keeps the early-access form accessible and mobile-friendly", async () => {
  const form = await readFile(
    new URL("../app/components/InquiryForm.tsx", import.meta.url),
    "utf8",
  );

  assert.match(form, /aria-busy=\{submitState === "submitting"\}/);
  assert.match(form, /aria-describedby="inquiry-form-intro inquiry-form-status"/);
  assert.match(form, /id="inquiry-form-intro"/);
  assert.match(form, /id="inquiry-form-status"/);
  assert.match(form, /statusCopy \? "" : "is-empty"/);
  assert.match(form, /useEffect/);
  assert.match(form, /window\.location\.pathname/);
  assert.match(form, /window\.location\.search/);
  assert.match(form, /window\.location\.href/);
  assert.match(form, /document\.referrer/);
  assert.match(form, /name="sourcePath"/);
  assert.match(form, /name="sourceUrl"/);
  assert.match(form, /name="referrer"/);
  assert.match(form, /function setSourcePath/);
  assert.match(form, /form\.reset\(\);\s*setSourcePath\(\);/);
  assert.match(form, /inputMode="email"/);
  assert.match(form, /inputMode="tel"/);
  assert.match(form, /name="interests"/);
  assert.match(form, /role=\{submitState === "error" \? "alert" : "status"\}/);
});

test("ships mobile app metadata for richer link and phone presentation", async () => {
  const manifest = JSON.parse(
    await readFile(new URL("../public/site.webmanifest", import.meta.url), "utf8"),
  );

  assert.equal(manifest.name, "Linkd Jewelry POS");
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.theme_color, "#17213a");
  assert.deepEqual(
    manifest.icons
      .filter((icon) => icon.type === "image/png")
      .map((icon) => [icon.src, icon.sizes]),
    [
      ["/icon-192.png", "192x192"],
      ["/icon-512.png", "512x512"],
    ],
  );
  assert.deepEqual(await pngSize("../public/icon-192.png"), {
    width: 192,
    height: 192,
  });
  assert.deepEqual(await pngSize("../public/icon-512.png"), {
    width: 512,
    height: 512,
  });
  assert.deepEqual(
    manifest.shortcuts.map((shortcut) => shortcut.url),
    ["/jewelry-pos", "/inventory", "/integrations"],
  );
});

test("ships a social card made from real Linkd product assets", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );
  const generator = await readFile(
    new URL("../scripts/generate-og.mjs", import.meta.url),
    "utf8",
  );
  const ogImage = await readFile(new URL("../public/og.png", import.meta.url));

  assert.equal(packageJson.scripts["generate:og"], "node scripts/generate-og.mjs");
  assert.deepEqual(await pngSize("../public/og.png"), {
    width: 1200,
    height: 630,
  });
  assert.ok(ogImage.byteLength > 250_000);
  assert.match(generator, /linkd-logo-main\.png/);
  assert.match(generator, /linkd-pos-register-devices\.png/);
  assert.match(generator, /linkd-inventory-search-devices\.png/);
  assert.match(generator, /Jewelry POS/);
  assert.match(generator, /JewelLink and CountRetail ready/);
});

test("serves lighter web visuals for mobile and SEO pages", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );
  const optimizer = await readFile(
    new URL("../scripts/optimize-assets.mjs", import.meta.url),
    "utf8",
  );
  const marketingFrameGenerator = await readFile(
    new URL("../scripts/generate-marketing-frames.mjs", import.meta.url),
    "utf8",
  );

  assert.equal(packageJson.scripts["optimize:assets"], "node scripts/optimize-assets.mjs");
  assert.equal(
    packageJson.scripts["generate:marketing-frames"],
    "node scripts/generate-marketing-frames.mjs",
  );
  assert.match(optimizer, /webp/);
  assert.match(optimizer, /linkd-pos-register-devices\.png/);
  assert.match(optimizer, /jewellink-logo-main\.png/);
  assert.match(marketingFrameGenerator, /FULL LUXURY JEWELRY MANAGEMENT/);
  assert.match(marketingFrameGenerator, /Linkd \+ JewelLink/);
  assert.match(marketingFrameGenerator, /CountRetail/);
  assert.match(marketingFrameGenerator, /LINKD FEATURE FRAMES/);

  const optimizedAssets = [
    "../public/assets/screenshots/linkd-home-hero-banner.webp",
    "../public/assets/screenshots/linkd-pos-register-devices.webp",
    "../public/assets/screenshots/linkd-inventory-search-devices.webp",
    "../public/assets/screenshots/linkd-customers-crm-devices.webp",
    "../public/assets/screenshots/linkd-reports-home-devices.webp",
    "../public/assets/screenshots/linkd-settings-integrations-devices.webp",
    "../public/assets/brand/linkd-logo-main.webp",
    "../public/assets/brand/jewellink-logo-main.webp",
    "../public/assets/brand/countretail-logo-main.webp",
  ];

  for (const asset of optimizedAssets) {
    const info = await stat(new URL(asset, import.meta.url));
    assert.ok(info.size > 5_000, `${asset} should not be empty`);
    assert.ok(info.size < 70_000, `${asset} should stay lightweight`);
  }

  const sanitizedProductAssets = [
    "../public/assets/screenshots/linkd-pos-cart-demo-v2.webp",
    "../public/assets/screenshots/linkd-pos-cart-demo-card-v2.webp",
    "../public/assets/screenshots/linkd-customer-overview-demo-v2.webp",
  ];

  for (const asset of sanitizedProductAssets) {
    const info = await stat(new URL(asset, import.meta.url));
    assert.ok(info.size > 50_000, `${asset} should retain readable UI detail`);
    assert.ok(info.size < 150_000, `${asset} should remain web-ready`);
  }

  const marketingAssets = [
    "../public/assets/advertising/linkd-luxury-management-stack.webp",
    "../public/assets/advertising/linkd-feature-frames.webp",
  ];

  for (const asset of marketingAssets) {
    const info = await stat(new URL(asset, import.meta.url));
    assert.ok(info.size > 40_000, `${asset} should contain the rendered frame`);
    assert.ok(info.size < 90_000, `${asset} should stay lightweight`);
  }
});

test("keeps mobile navigation available without crowding the hero", async () => {
  const homePage = await readFile(
    new URL("../app/page.tsx", import.meta.url),
    "utf8",
  );
  const chrome = await readFile(
    new URL("../app/components/SiteChrome.tsx", import.meta.url),
    "utf8",
  );
  const baseCss = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  const premierCss = await readFile(
    new URL("../app/premier.css", import.meta.url),
    "utf8",
  );

  assert.match(chrome, /const primaryLinks/);
  assert.match(chrome, /href: "\/jewelry-pos", label: "Platform"/);
  assert.match(chrome, /href: "\/payments", label: "Payments"/);
  assert.match(chrome, /href: "\/ecosystem", label: "Ecosystem"/);
  assert.match(chrome, /href: "\/integrations", label: "Integrations"/);
  assert.match(chrome, /href: "\/#migration", label: "Switch to Linkd"/);
  assert.match(chrome, /<details className="premier-mobile-menu"/);
  assert.match(chrome, /<summary aria-label="Open site navigation">/);
  assert.match(chrome, /closeMobileMenu/);
  assert.match(chrome, /removeAttribute\("open"\)/);
  assert.doesNotMatch(chrome, />Login</);

  assert.match(homePage, /href: "\/repairs"/);
  assert.match(homePage, /Service work beside POS/);
  assert.match(homePage, /href: "\/accounting"/);
  assert.match(homePage, /House accounts and layaway/);
  assert.match(homePage, /href: "\/multi-store"/);
  assert.match(homePage, /Transfers, roles, and reporting/);
  assert.match(homePage, /<div className="hero-device-picture">/);
  assert.match(homePage, /className="hero-device-toolbar"/);
  assert.match(homePage, /className="hero-device-screen"/);
  assert.doesNotMatch(homePage, /media="\(max-width: 600px\)"/);
  assert.match(homePage, /sizes="\(max-width: 860px\)/);

  assert.match(baseCss, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(baseCss, /scroll-behavior: auto/);
  assert.match(baseCss, /animation-duration: 0\.01ms !important/);
  assert.match(premierCss, /@media \(max-width: 900px\)/);
  assert.match(premierCss, /\.premier-nav\s*\{\s*display: none/);
  assert.match(premierCss, /\.premier-mobile-menu\s*\{[\s\S]*display: block/);
  assert.match(premierCss, /overflow: visible !important/);
  assert.match(premierCss, /max-height: calc\(100vh - 102px\)/);
  assert.match(premierCss, /min-width: min\(360px, calc\(100vw - 36px\)\)/);
  assert.match(premierCss, /@media \(max-width: 640px\)/);
  assert.match(premierCss, /\.premier-header-actions\s*\{\s*display: none/);
  assert.match(premierCss, /\.hero-device-picture\s*\{[\s\S]*aspect-ratio: 16 \/ 9/);
  assert.match(baseCss, /\.hero-device-picture\s*\{[\s\S]*aspect-ratio: 16 \/ 9/);
  assert.match(baseCss, /\.hero-device-image\s*\{[\s\S]*object-fit: contain/);
  assert.match(premierCss, /outline-color: #0b57c5/);
});

test("keeps deployable metadata branded and search-current", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );
  const readme = await readFile(
    new URL("../README.md", import.meta.url),
    "utf8",
  );
  const proxy = await readFile(
    new URL("../proxy.ts", import.meta.url),
    "utf8",
  );
  const worker = await readFile(
    new URL("../worker/index.ts", import.meta.url),
    "utf8",
  );
  const viteConfig = await readFile(
    new URL("../vite.config.ts", import.meta.url),
    "utf8",
  );
  const layout = await readFile(
    new URL("../app/layout.tsx", import.meta.url),
    "utf8",
  );
  const landingData = await readFile(
    new URL("../app/seoLandingPages.ts", import.meta.url),
    "utf8",
  );
  const sitemap = await readFile(
    new URL("../public/sitemap.xml", import.meta.url),
    "utf8",
  );
  const robots = await readFile(
    new URL("../public/robots.txt", import.meta.url),
    "utf8",
  );
  const llms = await readFile(
    new URL("../public/llms.txt", import.meta.url),
    "utf8",
  );

  assert.equal(packageJson.name, "linkd-website");
  assert.doesNotMatch(packageJson.name, /starter/i);
  assert.equal(packageJson.scripts["db:generate"], undefined);
  assert.doesNotMatch(JSON.stringify(packageJson), /drizzle/i);
  assert.match(readme, /^# Linkd website/m);
  assert.match(readme, /jewelry POS and operations platform/i);
  assert.match(readme, /\/jewelry-pos/);
  assert.match(readme, /\/repairs/);
  assert.match(readme, /\/accounting/);
  assert.match(readme, /Postmark runtime values/i);
  assert.doesNotMatch(readme, /vinext-starter|loading skeleton|starter/i);
  assert.match(worker, /Linkd marketing site/);
  assert.doesNotMatch(worker, /vinext-starter|starter template/i);
  assert.doesNotMatch(worker, /DB:\s*D1Database/);
  assert.match(viteConfig, /LINKD_LOCAL_PLACEHOLDER_DATABASE_ID/);
  assert.match(viteConfig, /linkd-local-d1/);
  assert.match(viteConfig, /linkd-local-r2/);
  assert.doesNotMatch(viteConfig, /site-creator|SITE_CREATOR/);
  assert.match(layout, /multi-location jewelry POS/);
  assert.match(layout, /jewelry repair management/);
  assert.match(layout, /jewelry appraisal intake/);
  assert.match(layout, /jewelry store accounting/);
  assert.match(layout, /jewelry POS integrations/);
  assert.match(layout, /multi-store jewelry inventory/);
  assert.match(layout, /luxury jewelry management software/);
  assert.match(layout, /full jewelry management ecosystem/);
  assert.match(landingData, /createSeoLandingMetadata/);
  assert.match(landingData, /keywords: page\.keywords/);
  assert.match(landingData, /luxury jewelry point of sale/);
  assert.match(landingData, /jewelry repair intake software/);
  assert.match(landingData, /multi-store jewelry POS/);
  assert.match(landingData, /jewelry POS integrations/);
  assert.match(landingData, /jewelry store payment processing/);
  assert.match(landingData, /Luxury Management Ecosystem/);
  assert.match(landingData, /Linkd Ecosystem/);
  assert.match(landingData, /Does Linkd replace the other ecosystem products/);
  assert.match(proxy, /export function proxy/);
  assert.match(proxy, /NextResponse\.next/);
  assert.match(proxy, /X-Content-Type-Options/);
  assert.match(proxy, /nosniff/);
  assert.match(proxy, /X-Frame-Options/);
  assert.match(proxy, /DENY/);
  assert.match(proxy, /Referrer-Policy/);
  assert.match(proxy, /strict-origin-when-cross-origin/);
  assert.match(proxy, /Permissions-Policy/);
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Disallow: \/api\//);
  assert.match(robots, /Sitemap: https:\/\/linkd\.com\/sitemap\.xml/);
  assert.match(robots, /LLMs: https:\/\/linkd\.com\/llms\.txt/);
  assert.match(llms, /^# Linkd/m);
  assert.match(llms, /POS and ERP system for luxury retail jewelers/i);
  assert.match(llms, /Linkd: operational core/i);
  assert.match(llms, /JewelLink: relationship layer/i);
  assert.match(llms, /CountRetail: intelligence layer/i);
  assert.match(llms, /JewelHire: people layer/i);
  assert.match(llms, /Linkd\s+Ecosystem/i);
  assert.match(llms, /https:\/\/linkd\.com\/payments/);
  assert.match(llms, /https:\/\/linkd\.com\/repairs/);
  assert.match(llms, /https:\/\/linkd\.com\/accounting/);
  assert.match(llms, /https:\/\/linkd\.com\/multi-store/);
  assert.match(llms, /https:\/\/linkd\.com\/ecosystem/);
  assert.match(
    sitemap,
    /xmlns:image="http:\/\/www\.google\.com\/schemas\/sitemap-image\/1\.1"/,
  );
  assert.match(sitemap, /<loc>https:\/\/linkd\.com\/ecosystem<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/linkd\.com\/payments<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/linkd\.com\/repairs<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/linkd\.com\/accounting<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/linkd\.com\/multi-store<\/loc>/);
  assert.match(sitemap, /linkd-pos-cart-demo-v2\.webp/);
  assert.match(sitemap, /Linkd jewelry POS register hero banner/);
  assert.match(sitemap, /linkd-pos-cart-demo-card-v2\.webp/);
  assert.match(sitemap, /linkd-customer-overview-demo-v2\.webp/);
  assert.match(sitemap, /linkd-reporting\.webp/);
  assert.match(sitemap, /linkd-integrations\.webp/);
  assert.match(sitemap, /linkd-luxury-management-stack\.webp/);
  assert.match(sitemap, /linkd-feature-frames\.webp/);
  assert.match(sitemap, /jewellink-logo-main\.webp/);
  assert.match(sitemap, /countretail-logo-main\.webp/);
  assert.match(sitemap, /Linkd, JewelLink, and CountRetail full luxury jewelry management stack/);
  assert.match(sitemap, /Linkd product feature frames for jewelry POS advertising/);
  assert.match(sitemap, /Linkd customer context and CRM-ready record/);
  assert.match(sitemap, /Linkd provider and integration control settings/);
  assert.match(sitemap, /Linkd jewelry retail ecosystem preview/);
  assert.match(sitemap, /Linkd jewelry repair bench, intake to pickup/);
  assert.match(sitemap, /Linkd jewelry store finance and accounting review/);
  assert.match(sitemap, /Linkd multi-store jewelry operations and inventory movement/);
  assert.match(sitemap, /<lastmod>2026-07-25<\/lastmod>/);
  assert.doesNotMatch(sitemap, /<loc>https:\/\/linkd\.com\/login<\/loc>/);
});
