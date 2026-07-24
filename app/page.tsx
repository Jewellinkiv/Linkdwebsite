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

export default function Home() {
  return (
    <main>
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
            into one cloud platform built with feedback from leading jewelry
            retailers.
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
              store security, and ecosystem integrations.
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
          <Link href="#security">Security</Link>
          <Link href="#early-access">Early Release</Link>
          <Link href="/login">Login</Link>
        </nav>
      </footer>
    </main>
  );
}
