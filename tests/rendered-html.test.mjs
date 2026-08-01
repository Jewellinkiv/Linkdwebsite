import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  return request(path, {
    headers: { accept: "text/html" },
  });
}

async function request(path = "/", init = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, init),
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
  assert.match(html, /Jewelry POS that connects the store\./i);
  assert.match(html, /href="#main-content"/i);
  assert.match(html, /id="main-content"/i);
  assert.match(html, /tabindex="-1"/i);
  assert.match(html, /Skip to content/i);
  assert.match(html, /Request early access/i);
  assert.match(html, /JewelLink CRM/i);
  assert.match(html, /linkd-home-hero-banner\.webp/i);
  assert.match(html, /Linkd POS register shown on a MacBook screen/i);
  assert.match(html, /The daily operating system behind the jewelry counter/i);
  assert.match(html, /Linkd connected operations map/i);
  assert.match(html, /One operating record/i);
  assert.match(html, /Sales, items, accounts, permissions, and handoffs stay connected/i);
  assert.match(html, /Counter/i);
  assert.match(html, /Serialized/i);
  assert.match(html, /Approvals/i);
  assert.match(html, /Integrations signals/i);
  assert.match(html, /Feature frames/i);
  assert.match(html, /Show the workflow before explaining it/i);
  assert.match(html, /Counter workspace/i);
  assert.match(html, /CRM-ready record/i);
  assert.match(html, /Repair and appraisal flow/i);
  assert.match(html, /Owner reporting catalog/i);
  assert.match(html, /Luxury management stack/i);
  assert.match(html, /JewelLink context/i);
  assert.match(html, /Advertising visuals/i);
  assert.match(html, /id="advertising-visuals"/i);
  assert.match(html, /Two frames\. Full story/i);
  assert.match(html, /Full luxury management stack/i);
  assert.match(html, /Product proof without private records/i);
  assert.match(html, /linkd-luxury-management-stack\.webp/i);
  assert.match(html, /linkd-feature-frames\.webp/i);
  assert.match(html, /CountRetail/i);
  assert.match(html, /The difference, fast\./i);
  assert.match(html, /Linkd records the operation/i);
  assert.match(html, /JewelLink grows the relationship/i);
  assert.match(html, /CountRetail explains the store/i);
  assert.match(html, /POS, inventory, accounts, audits/i);
  assert.match(html, /CRM, clienteling, training/i);
  assert.match(html, /Traffic, Vision AI, analytics/i);
  assert.match(html, /Compare the stack/i);
  assert.match(html, /One store stack\. Three clear jobs\./i);
  assert.match(html, /POS, inventory, accounts, audit trail/i);
  assert.match(html, /Traffic, marketing, aging, owner insight/i);
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
      /Service work beside checkout/i,
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
      /Linkd, JewelLink, and CountRetail each have a clear job/i,
      /Each system answers a different store question/i,
      /jewelry retail ecosystem/i,
    ],
    [
      "/integrations",
      /Connect POS, CRM, analytics, accounting, and e-commerce/i,
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
    assert.match(html, /Request Early Access/i);
    assert.match(html, /href="#early-access"/);
    assert.match(html, /id="early-access"/);
    assert.match(html, /Start with the essentials/i);
    assert.match(html, /FAQPage/i);
    assert.match(html, /BreadcrumbList/i);
    assert.match(html, /WebPage/i);
    assert.match(html, /Linkd/i);
    assert.match(html, /og:image:width/i);
    assert.match(html, /1200/);
    assert.match(html, /og:image:height/i);
    assert.match(html, /630/);
    if (path !== "/ecosystem") {
      assert.match(
        html,
        new RegExp(
          `<a(?=[^>]*aria-current="page")(?=[^>]*href="${path.replace("/", "\\/")}")`,
        ),
      );
      assert.match(html, /Screen proof/i);
      assert.match(html, /See the workflow before the paragraph/i);
      assert.match(html, /href="#product-screens"/);
      assert.match(html, /id="product-screens"/);
      assert.match(html, /At a glance/i);
      assert.match(html, /What this workflow connects/i);
      assert.match(html, /connected workflow map/i);
      assert.match(html, /Product frame/i);
      assert.match(html, /The workspace view, simplified for fast scanning/i);
      assert.match(html, /Start/i);
      assert.match(html, /Control/i);
      assert.match(html, /Connect/i);
      assert.match(html, /Review/i);
      assert.match(html, /Where Linkd fits/i);
      assert.match(html, /Operations first\. Relationships and intelligence next\./i);
      assert.match(html, /POS, inventory, accounts, audits/i);
      assert.match(html, /CRM, clienteling, team follow-up/i);
      assert.match(html, /Traffic, Vision AI, owner insight/i);
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
      assert.doesNotMatch(html, /href="\/#early-access"/);
      assert.match(html, /SoftwareApplication/i);
      assert.match(html, /BusinessApplication/i);
      assert.match(html, /PreOrder/i);
      assert.match(html, /ContactAction/i);
      assert.match(html, /isRelatedTo/i);
      assert.match(html, /BusinessIntelligenceApplication/i);
      assert.match(html, /Relationship layer for CRM/i);
      assert.match(html, /Intelligence layer for traffic/i);
      assert.match(html, /https:\/\/www\.jewellink\.com\//i);
      assert.match(html, /https:\/\/www\.countretail\.com\//i);
      assert.match(
        html,
        new RegExp(`https://linkd\\.com${path}#early-access`),
      );
      assert.match(html, /Luxury jewelry retailers/i);
      assert.match(html, /linkd-customers-crm-devices\.webp|linkd-settings-integrations-devices\.webp/);
    } else {
      assert.match(html, /What happened at the counter/i);
      assert.match(html, /Who needs follow-up/i);
      assert.match(html, /What is the store telling us/i);
      assert.match(
        html,
        /<a(?=[^>]*aria-current="page")(?=[^>]*href="\/ecosystem")/,
      );
      assert.match(html, /Linkd, JewelLink, and CountRetail roles/i);
      assert.match(html, /Linkd, JewelLink, and CountRetail visual role map/i);
      assert.match(html, /POS \/ inventory \/ accounts/i);
      assert.match(html, /CRM \/ clienteling \/ training/i);
      assert.match(html, /Traffic \/ Vision AI \/ analytics/i);
      assert.match(html, /href="\/repairs"/);
      assert.match(html, /href="\/accounting"/);
      assert.match(html, /href="\/multi-store"/);
      assert.match(html, /Operational core for jewelry POS/i);
      assert.match(html, /Relationship layer for CRM/i);
      assert.match(html, /Intelligence layer for traffic/i);
      assert.match(html, /linkd-pos-register-devices\.webp/);
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
  assert.match(route, /LINKD_ALERT_TO_EMAIL/);
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
  assert.match(envExample, /^LINKD_ALERT_TO_EMAIL=/m);
  assert.match(envExample, /^POSTMARK_MESSAGE_STREAM=outbound/m);
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
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(homePage, /const primaryNavItems/);
  assert.match(homePage, /\{ href: "\/jewelry-pos", label: "POS" \}/);
  assert.match(homePage, /\{ href: "\/inventory", label: "Inventory" \}/);
  assert.match(homePage, /\{ href: "\/ecosystem", label: "Ecosystem" \}/);
  assert.match(homePage, /\{ href: "\/security", label: "Security" \}/);
  assert.match(homePage, /\{ href: "\/integrations", label: "Integrations" \}/);
  assert.match(homePage, /href: "\/repairs"/);
  assert.match(homePage, /Service work beside POS/);
  assert.match(homePage, /href: "\/accounting"/);
  assert.match(homePage, /House accounts and layaway/);
  assert.match(homePage, /href: "\/multi-store"/);
  assert.match(homePage, /Transfers, roles, and reporting/);
  assert.match(homePage, /primaryNavItems\.map/);
  assert.doesNotMatch(homePage, /\{ href: "#platform", label: "Platform" \}/);
  assert.doesNotMatch(homePage, /\{ href: "#workflows", label: "Workflows" \}/);
  assert.match(css, /@media \(max-width: 860px\)/);
  assert.match(css, /a:focus-visible/);
  assert.match(css, /button:focus-visible/);
  assert.match(css, /\.nav-links a\[aria-current="page"\]/);
  assert.match(css, /\.nav-links a\[aria-current="page"\]::after/);
  assert.match(css, /background: var\(--blue\)/);
  assert.match(css, /\.check-option:focus-within/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /scroll-behavior: auto/);
  assert.match(css, /animation-duration: 0\.01ms !important/);
  assert.match(css, /\.nav-links\s*\{[\s\S]*overflow-x: auto/);
  assert.match(css, /\.nav-links a\s*\{[\s\S]*white-space: nowrap/);
  assert.match(
    css,
    /\.nav-links a\[aria-current="page"\]\s*\{[\s\S]*background: var\(--navy\)/,
  );
  assert.match(
    css,
    /\.nav-links a\[aria-current="page"\]\s*\{[\s\S]*order: -1/,
  );
  assert.match(
    css,
    /\.nav-links a\[aria-current="page"\]::after\s*\{[\s\S]*content: none/,
  );
  assert.match(css, /\.header-actions \.text-button\s*\{[\s\S]*display: none/);
  assert.match(css, /\.header-actions \.button\s*\{[\s\S]*display: inline-flex/);
  assert.match(css, /\.hero-section\s*\{[\s\S]*padding-top: 154px/);
  assert.match(css, /\.role-strip-section/);
  assert.match(css, /\.role-strip-shell\s*\{[\s\S]*grid-template-columns/);
  assert.match(css, /\.role-strip-grid\s*\{[\s\S]*repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.role-strip-card\s*\{[\s\S]*grid-template-columns: 82px minmax\(0, 1fr\)/);
  assert.match(css, /\.role-card-visual-screen img\s*\{[\s\S]*object-fit: cover/);
  assert.match(css, /\.role-strip-jewellink \.role-card-visual-logo img\s*\{[\s\S]*transform: scale\(1\.45\)/);
  assert.match(css, /\.operations-map\s*\{[\s\S]*grid-template-columns: minmax\(240px, 0\.42fr\) minmax\(0, 1fr\)/);
  assert.match(css, /\.operations-map-core\s*\{[\s\S]*min-height: 320px/);
  assert.match(css, /\.operations-map-grid\s*\{[\s\S]*repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.operations-map-node\s*\{[\s\S]*min-height: 154px/);
  assert.match(css, /\.feature-frame-grid\s*\{[\s\S]*repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.feature-frame-card\s*\{[\s\S]*min-height: 390px/);
  assert.match(css, /\.feature-frame-tabs\s*\{[\s\S]*repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.feature-frame-row\s*\{[\s\S]*min-height: 58px/);
  assert.match(css, /\.feature-frame-card-compact\s*\{[\s\S]*max-width: 980px/);
  assert.match(css, /\.advertising-visual-section/);
  assert.match(css, /\.advertising-visual-grid\s*\{[\s\S]*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.advertising-visual-card img\s*\{[\s\S]*aspect-ratio: 16 \/ 10/);
  assert.match(css, /\.advertising-visual-card h3\s*\{[\s\S]*text-wrap: balance/);
  assert.match(css, /\.mini-chip-row small\s*\{[\s\S]*border-radius: 99px/);
  assert.match(css, /\.operations-map\s*\{[\s\S]*grid-template-columns: 1fr/);
  assert.match(css, /\.operations-map-grid,\s*\.role-strip-grid/);
  assert.match(css, /\.role-strip-grid,\s*\.feature-frame-grid/);
  assert.match(css, /\.seo-path-card\s*\{[\s\S]*grid-template-columns: 102px minmax\(0, 1fr\)/);
  assert.match(css, /\.seo-path-card img\s*\{[\s\S]*min-height: 126px/);
  assert.match(css, /\.seo-path-card p\s*\{[\s\S]*-webkit-line-clamp: 2/);
  assert.match(css, /\.seo-path-card\s*\{[\s\S]*grid-template-columns: 86px minmax\(0, 1fr\)/);
  assert.match(css, /\.ecosystem-hero-board/);
  assert.match(css, /\.landing-fit-board/);
  assert.match(css, /\.landing-signal-board\s*\{[\s\S]*repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.landing-signal-card\s*\{[\s\S]*min-height: 190px/);
  assert.match(css, /\.landing-signal-card strong\s*\{[\s\S]*text-wrap: balance/);
  assert.match(css, /\.landing-signal-card small\s*\{[\s\S]*width: fit-content/);
  assert.match(css, /\.related-workflow-grid\s*\{[\s\S]*repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.related-workflow-card\s*\{[\s\S]*min-height: 210px/);
  assert.match(css, /\.related-workflow-card::before\s*\{[\s\S]*border-radius: 99px/);
  assert.match(css, /\.related-workflow-card strong\s*\{[\s\S]*text-wrap: balance/);
  assert.match(
    css,
    /\.ecosystem-hero-tile,\s*\.ecosystem-hero-tile-jewellink,\s*\.ecosystem-hero-tile-countretail\s*\{[\s\S]*margin-left: 0/,
  );
  assert.match(
    css,
    /\.role-strip-grid,\s*\.feature-frame-grid,\s*\.seo-path-grid/,
  );
  assert.match(
    css,
    /\.landing-proof-rail,\s*\.landing-outcomes,\s*\.landing-signal-board,\s*\.landing-fit-board,\s*\.related-workflow-grid/,
  );
  assert.match(
    css,
    /\.landing-proof-rail,\s*\.landing-outcomes,\s*\.landing-signal-board,\s*\.landing-fit-board,\s*\.related-workflow-grid,\s*\.form-grid/,
  );
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
  assert.match(landingData, /Luxury Management Ecosystem/);
  assert.match(landingData, /full luxury jewelry management stack/);
  assert.match(landingData, /How do Linkd, JewelLink, and CountRetail work together/);
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
  assert.match(llms, /jewelry POS and store operations software/i);
  assert.match(llms, /Linkd: operational core/i);
  assert.match(llms, /JewelLink: relationship layer/i);
  assert.match(llms, /CountRetail: intelligence layer/i);
  assert.match(llms, /full luxury jewelry management stack/i);
  assert.match(llms, /https:\/\/linkd\.com\/repairs/);
  assert.match(llms, /https:\/\/linkd\.com\/accounting/);
  assert.match(llms, /https:\/\/linkd\.com\/multi-store/);
  assert.match(llms, /https:\/\/linkd\.com\/ecosystem/);
  assert.match(
    sitemap,
    /xmlns:image="http:\/\/www\.google\.com\/schemas\/sitemap-image\/1\.1"/,
  );
  assert.match(sitemap, /<loc>https:\/\/linkd\.com\/ecosystem<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/linkd\.com\/repairs<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/linkd\.com\/accounting<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/linkd\.com\/multi-store<\/loc>/);
  assert.match(sitemap, /linkd-home-hero-banner\.webp/);
  assert.match(sitemap, /Linkd jewelry POS register hero banner/);
  assert.match(sitemap, /linkd-pos-register-devices\.webp/);
  assert.match(sitemap, /linkd-customers-crm-devices\.webp/);
  assert.match(sitemap, /linkd-reports-home-devices\.webp/);
  assert.match(sitemap, /linkd-settings-integrations-devices\.webp/);
  assert.match(sitemap, /linkd-luxury-management-stack\.webp/);
  assert.match(sitemap, /linkd-feature-frames\.webp/);
  assert.match(sitemap, /jewellink-logo-main\.webp/);
  assert.match(sitemap, /countretail-logo-main\.webp/);
  assert.match(sitemap, /Linkd, JewelLink, and CountRetail full luxury jewelry management stack/);
  assert.match(sitemap, /Linkd product feature frames for jewelry POS advertising/);
  assert.match(sitemap, /Linkd customer context and CRM-ready record/);
  assert.match(sitemap, /Linkd provider and integration control settings/);
  assert.match(sitemap, /Linkd jewelry retail ecosystem preview/);
  assert.match(sitemap, /Linkd jewelry repair intake and service workflow/);
  assert.match(sitemap, /Linkd jewelry store finance and accounting review/);
  assert.match(sitemap, /Linkd multi-store jewelry operations and inventory movement/);
  assert.match(sitemap, /<lastmod>2026-07-25<\/lastmod>/);
  assert.doesNotMatch(sitemap, /<loc>https:\/\/linkd\.com\/login<\/loc>/);
});
