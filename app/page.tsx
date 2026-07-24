import InquiryForm from "./components/InquiryForm";
import Image from "next/image";
import Link from "next/link";

const pillars = [
  {
    label: "Sell",
    title: "Point of sale made for luxury retail",
    copy: "Fast checkout, repairs, services, layaway, appraisals, quotes, and customer purchase context in one daily workflow.",
  },
  {
    label: "Track",
    title: "Inventory control from case to vault",
    copy: "Serialized inventory, RFID readiness, transfers, aging, receiving, movements, and item-level audit history.",
  },
  {
    label: "Account",
    title: "House accounts without spreadsheet drift",
    copy: "Aging criteria, interest on balances or transactions, specialty financing, layaway schedules, and accounting handoff.",
  },
  {
    label: "Secure",
    title: "Permissioned operations for every role",
    copy: "Role gating, approval paths, geofencing, register controls, and security logs that managers can actually review.",
  },
];

const productShots = [
  {
    label: "POS",
    title: "Counter workflows built around jewelry sales.",
    copy: "Checkout, client selection, service add-ons, tender controls, parking, register permissions, and manager review live in one workspace.",
    image: "/assets/screenshots/linkd-pos-register-devices.png",
    alt: "Linkd POS register shown on laptop and tablet",
  },
  {
    label: "Inventory",
    title: "A live view of every item, transfer, and exception.",
    copy: "Search, serialized inventory, RFID readiness, purchasing, receiving, aging, and movement history stay close to the daily store flow.",
    image: "/assets/screenshots/linkd-inventory-search-devices.png",
    alt: "Linkd inventory search shown on laptop and tablet",
  },
  {
    label: "CRM context",
    title: "Customer history connected to the operational record.",
    copy: "Linkd keeps store activity, finance status, service history, and customer context ready for JewelLink CRM and clienteling workflows.",
    image: "/assets/screenshots/linkd-customers-crm-devices.png",
    alt: "Linkd customer management shown on laptop and tablet",
  },
  {
    label: "Reporting",
    title: "Business intelligence operators can actually run.",
    copy: "Sales, tender, inventory, benchmarking, payroll, and commission reporting are organized for owners and managers who need answers quickly.",
    image: "/assets/screenshots/linkd-reports-home-devices.png",
    alt: "Linkd reports catalog shown on laptop and tablet",
  },
  {
    label: "Integrations",
    title: "Provider health, mapping, and sync controls in one place.",
    copy: "Accounting exports, Shopify, QuickBooks, Striven, Xero, documents, and provider handoffs get explicit status instead of becoming invisible back-office risk.",
    image: "/assets/screenshots/linkd-settings-integrations-devices.png",
    alt: "Linkd integrations settings shown on laptop and tablet",
  },
];

const featureExplainers = [
  {
    label: "POS",
    title: "Counter checkout and service intake",
    copy: "Run fine jewelry sales, repairs, appraisals, special orders, quotes, layaway payments, and tender controls from a workspace built around the customer at the counter.",
    bullets: ["Fast item lookup", "Parked sales", "Manager approvals"],
  },
  {
    label: "Inventory",
    title: "Serialized inventory with movement history",
    copy: "Track diamonds, watches, bridal, estate, repairs, and memo goods with audit-ready receiving, transfers, aging, vendor context, and RFID-ready security events.",
    bullets: ["Receiving and transfers", "Aging views", "RFID readiness"],
  },
  {
    label: "Customer",
    title: "Operational customer context",
    copy: "Keep purchase history, service work, finance status, warranties, wishlists, and POS context available for associates and ready for JewelLink clienteling workflows.",
    bullets: ["Purchase history", "Repair timelines", "JewelLink-ready CRM context"],
  },
  {
    label: "Finance",
    title: "House accounts, layaway, and accounting",
    copy: "Support house account aging, interest rules, specialty financing, deposits, split tenders, and accounting handoff without forcing the store back into spreadsheets.",
    bullets: ["Account aging", "Layaway schedules", "QuickBooks and Xero paths"],
  },
  {
    label: "Security",
    title: "Permissions and exception review",
    copy: "Connect sensitive POS actions, item movements, register events, employee roles, location context, and CountRetail camera intelligence into reviewable operational evidence.",
    bullets: ["Role permissions", "Exception queues", "Camera-aligned events"],
  },
  {
    label: "Reports",
    title: "Owner and manager reporting",
    copy: "Give operators clean reporting across sales, tenders, inventory, staff performance, benchmarking, payroll, commissions, and integration health.",
    bullets: ["Sales and tender reports", "Commission support", "Provider sync health"],
  },
];

const securityRows = [
  "RFID inventory integrations through TrackTech",
  "Store camera and CountRetail audit trail alignment",
  "Permission logs for sensitive POS actions",
  "Inventory aging and movement exception reporting",
  "Multi-store transfers with controlled handoff history",
];

const integrations = [
  "JewelLink CRM",
  "CountRetail AI",
  "TrackTech RFID",
  "Avalara",
  "QuickBooks",
  "Xero",
  "Striven",
  "Shopify",
  "Open APIs",
];

const releaseSignals = [
  "Luxury jewelry retailers preparing a POS change",
  "Multi-location stores needing stronger inventory controls",
  "Teams running house accounts, layaway, and specialty financing",
  "Retailers who want POS, CRM, cameras, and accounting connected",
];

const partnerPaths = [
  {
    name: "JewelLink",
    href: "https://www.jewellink.com/demo/",
    label: "CRM and clienteling",
    copy: "For retailers who want Linkd POS history to feed sales follow-up, training, texting, bridal workflows, and AI clienteling.",
  },
  {
    name: "CountRetail AI",
    href: "https://www.countretail.com/demo/",
    label: "Traffic and owner cockpit",
    copy: "For retailers who want Linkd operational data connected with store traffic, Vision AI, inventory pressure, and marketing attribution.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Linkd",
    url: "https://www.linkd.com/",
    logo: "https://www.linkd.com/assets/brand/linkd-logo-main.png",
    description:
      "Luxury POS, inventory, security, accounting, and store operations for modern jewelry retailers.",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Linkd",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.linkd.com/",
    image: "https://www.linkd.com/assets/screenshots/linkd-login-tagline-devices.png",
    description:
      "The operational core for modern jewelry retail, connecting POS, inventory, house accounts, security, reporting, and luxury retail integrations.",
    audience: {
      "@type": "Audience",
      audienceType: "Luxury retail jewelers",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Linkd",
    url: "https://www.linkd.com/",
    potentialAction: {
      "@type": "ContactAction",
      target: "https://www.linkd.com/#early-access",
      name: "Request Linkd early release access",
    },
  },
];

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="site-header">
        <Link className="brand-lockup" href="#top" aria-label="Linkd home">
          <span className="brand-logo-crop">
            <Image
              src="/assets/brand/linkd-logo-main.png"
              alt="Linkd"
              width={5334}
              height={3205}
              priority
              unoptimized
            />
          </span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          <Link href="#platform">Platform</Link>
          <Link href="#features">Features</Link>
          <Link href="#security">Security</Link>
          <Link href="#integrations">Integrations</Link>
          <Link href="#early-access">Early Release</Link>
        </nav>
        <div className="header-actions">
          <Link className="text-button" href="/login">
            Login
          </Link>
          <Link className="button button-primary" href="#early-access">
            Join Early Release
          </Link>
        </div>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Luxury POS for retail jewelers</p>
          <h1>The operational core for modern jewelry retail.</h1>
          <p className="hero-subtitle">
            Linkd brings point of sale, inventory control, house accounts,
            layaway, accounting, security audits, and multi-store operations
            into one cloud platform built for luxury jewelry operators.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="#early-access">
              Request Early Access
            </Link>
            <Link className="button button-secondary" href="/login">
              Open Login
            </Link>
          </div>
          <dl className="hero-metrics" aria-label="Platform highlights">
            <div>
              <dt>POS</dt>
              <dd>Checkout, services, layaway</dd>
            </div>
            <div>
              <dt>RFID</dt>
              <dd>Inventory security ready</dd>
            </div>
            <div>
              <dt>API</dt>
              <dd>Open integration strategy</dd>
            </div>
          </dl>
        </div>

        <div className="product-stage" aria-label="Linkd product preview">
          <Image
            className="hero-device-image"
            src="/assets/screenshots/linkd-login-tagline-devices.png"
            alt="Linkd login and workspace shown on a MacBook and iPad"
            width={1536}
            height={1024}
            priority
            unoptimized
          />
          <div className="hero-visual-signals" aria-label="Core Linkd workflows">
            <span>POS</span>
            <span>Inventory</span>
            <span>Services</span>
            <span>Security</span>
            <span>Reporting</span>
          </div>
        </div>
      </section>

      <section className="section-light product-showcase-section" aria-label="Linkd product screens">
        <div className="section-copy">
          <p className="eyebrow">Product preview</p>
          <h2>One operational workspace from the sales floor to the back office.</h2>
          <p>
            Early screenshot studies are being shaped into launch visuals for
            the first release. The product story starts with the workflows
            luxury jewelers run every day: sell, track, secure, and follow up.
          </p>
        </div>
        <div className="product-shot-grid">
          {productShots.map((shot) => (
            <article className="product-shot-card" key={shot.label}>
              <Image
                src={shot.image}
                alt={shot.alt}
                width={1536}
                height={1024}
                unoptimized
              />
              <div>
                <span>{shot.label}</span>
                <h3>{shot.title}</h3>
                <p>{shot.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-light intro-band" id="platform">
        <div className="section-copy">
          <p className="eyebrow">Platform</p>
          <h2>Designed around the real operating pressure of jewelry stores.</h2>
          <p>
            Linkd is positioned as the system of record for the store: the place
            where sales, inventory, finance, employees, and security events
            connect before they become expensive problems.
          </p>
        </div>
        <div className="pillar-grid">
          {pillars.map((pillar) => (
            <article className="pillar-card" key={pillar.label}>
              <span>{pillar.label}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-white feature-section" id="features">
        <div className="section-copy">
          <p className="eyebrow">Feature explainers</p>
          <h2>The system of record behind every jewelry retail workflow.</h2>
          <p>
            Linkd is the operating layer for the work that has to be accurate
            before AI, CRM, reporting, and accounting can trust the data.
          </p>
        </div>
        <div className="feature-grid">
          {featureExplainers.map((feature) => (
            <article className="feature-card" key={feature.label}>
              <span>{feature.label}</span>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
              <ul>
                {feature.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-dark security-section" id="security">
        <div className="security-copy">
          <p className="eyebrow">Security and audits</p>
          <h2>Controls that connect what happened at the counter, in the case, and on camera.</h2>
          <p>
            Luxury retailers need more than end-of-day reports. Linkd is being
            shaped to connect inventory movement, employee permissions, register
            events, camera context, and exception reporting into one reviewable
            timeline.
          </p>
        </div>
        <div className="security-list">
          {securityRows.map((row) => (
            <div className="security-row" key={row}>
              <span aria-hidden="true"></span>
              <p>{row}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-light ecosystem-section" id="integrations">
        <div className="section-copy narrow">
          <p className="eyebrow">Connected ecosystem</p>
          <h2>Standalone POS, connected to the tools luxury jewelers already trust.</h2>
          <p>
            Linkd should stand on its own while working cleanly with JewelLink,
            CountRetail, accounting, tax, e-commerce, RFID, and custom retail
            systems through open APIs.
          </p>
        </div>
        <div className="partner-strip" aria-label="Industry partners">
          <a href="https://www.jewellink.com/" target="_blank" rel="noreferrer">
            <Image
              src="/assets/brand/jewellink-logo-main.png"
              alt="JewelLink"
              width={12500}
              height={6250}
              unoptimized
            />
          </a>
          <a href="https://www.countretail.com/" target="_blank" rel="noreferrer">
            <Image
              src="/assets/brand/countretail-logo-main.png"
              alt="CountRetail AI"
              width={3538}
              height={504}
              unoptimized
            />
          </a>
        </div>
        <div className="partner-notes">
          <article>
            <span>JewelLink</span>
            <p>
              Clienteling, training, follow-up, texting, and CRM context can
              sit beside Linkd POS data instead of living in a disconnected
              sales process.
            </p>
          </article>
          <article>
            <span>CountRetail AI</span>
            <p>
              Store traffic, camera intelligence, marketing attribution, and
              inventory pressure signals can support the operational decisions
              Linkd records.
            </p>
          </article>
        </div>
        <div className="partner-action-grid" aria-label="Partner demo paths">
          {partnerPaths.map((partner) => (
            <article key={partner.name}>
              <span>{partner.label}</span>
              <h3>Linkd + {partner.name}</h3>
              <p>{partner.copy}</p>
              <div>
                <Link className="button button-primary" href="#early-access">
                  Request Linkd Access
                </Link>
                <a className="partner-link" href={partner.href} target="_blank" rel="noreferrer">
                  Partner demo form
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="integration-cloud" aria-label="Planned integrations">
          {integrations.map((integration) => (
            <span key={integration}>{integration}</span>
          ))}
        </div>
      </section>

      <section className="section-blue ai-section">
        <div>
          <p className="eyebrow">AI-assisted operations</p>
          <h2>From invoice ingestion to predictive aging.</h2>
        </div>
        <div className="ai-grid">
          <article>
            <h3>Invoice ingestion</h3>
            <p>Turn vendor invoices into inventory and accounting-ready records.</p>
          </article>
          <article>
            <h3>Predictive inventory</h3>
            <p>Spot aging, margin, traffic, and merchandising signals earlier.</p>
          </article>
          <article>
            <h3>Accounting assist</h3>
            <p>Prepare clean handoff into QuickBooks, Xero, Striven, and tax tools.</p>
          </article>
        </div>
      </section>

      <section className="early-access-section" id="early-access">
        <div className="release-panel">
          <div className="release-copy">
            <p className="eyebrow">Early release access</p>
            <h2>For jewelers ready to modernize POS, inventory security, and connected operations.</h2>
            <p>
              The early list should prioritize retailers who can give direct
              feedback on luxury POS workflows, inventory movement, accounting,
              store security, migration, and ecosystem integrations with
              JewelLink and CountRetail.
            </p>
            <div className="release-signals">
              {releaseSignals.map((signal) => (
                <span key={signal}>{signal}</span>
              ))}
            </div>
          </div>
          <InquiryForm />
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <span className="footer-mark">Linkd</span>
          <p>The operational core for modern jewelry retail.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="#platform">Platform</Link>
          <Link href="#features">Features</Link>
          <Link href="#security">Security</Link>
          <Link href="#early-access">Early Release</Link>
          <Link href="/login">Login</Link>
        </nav>
      </footer>
    </main>
  );
}
