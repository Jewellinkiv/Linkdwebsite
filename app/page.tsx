import InquiryForm from "./components/InquiryForm";
import JewelHireBrand from "./components/JewelHireBrand";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import Image from "next/image";
import Link from "next/link";

const heroProofs = [
  {
    value: "PAY",
    label: "Payment economics",
  },
  {
    value: "AR",
    label: "Receivables control",
  },
  {
    value: "SVC",
    label: "Service workflows",
  },
  {
    value: "INV",
    label: "Inventory movement",
  },
];

const operatingSignals = [
  {
    label: "Payments",
    title: "Keep more of every sale",
    copy: "A better payment strategy, clean tender controls, and a reconciliation trail that starts at the counter.",
  },
  {
    label: "Receivables",
    title: "Know what is owed",
    copy: "Deposits, layaway schedules, house accounts, aging, and follow-up stay on one accountable record.",
  },
  {
    label: "Services",
    title: "Move every promise forward",
    copy: "Repairs, appraisals, and custom jobs move from intake to bench to pickup without a second system.",
  },
  {
    label: "Inventory",
    title: "See every piece in motion",
    copy: "Receiving, serialization, transfers, aging, audits, and RFID-ready events share a complete movement history.",
  },
];

const workflowProofs = [
  {
    image: "/assets/screenshots/linkd-pos-cart-demo-card-v2.webp",
  },
  {
    image: "/assets/screenshots/linkd-inventory.webp",
  },
  {
    image: "/assets/screenshots/linkd-reporting.webp",
  },
];

const productScenes = [
  {
    label: "Counter workspace",
    title: "One calm counter view for clients, pieces, services, and tender.",
    copy: "A live sale keeps the customer, the jewelry, service work, and payment decisions together.",
    image: "/assets/screenshots/linkd-pos-cart-demo-card-v2.webp",
    alt: "Linkd POS showing Val Jones, jewelry items, a service line, and payment totals",
    href: "/jewelry-pos",
    tone: "pos",
  },
  {
    label: "Inventory control",
    title: "Every piece visible—from the case to the vault.",
    copy: "Searchable, serialized inventory with location, status, value, and RFID-ready context.",
    image: "/assets/screenshots/linkd-inventory.webp",
    alt: "Linkd inventory workspace showing serialized jewelry, location, status, and retail value",
    href: "/inventory",
    tone: "inventory",
  },
  {
    label: "Service bench",
    title: "Repairs and custom work move with the same discipline as a sale.",
    copy: "A purposeful service board keeps every job, owner, due date, and pickup status in sight.",
    image: "/assets/screenshots/linkd-services-repairs.webp",
    alt: "Linkd repairs and services workspace with intake, bench, ready, and turnaround data",
    href: "/repairs",
    tone: "services",
  },
];

const coreModules = [
  { code: "PAY", label: "Payments", tone: "blue", position: "top" },
  { code: "INV", label: "Inventory", tone: "teal", position: "upper-right" },
  { code: "SVC", label: "Services & Repairs", tone: "pink", position: "upper-left" },
  { code: "AR", label: "Receivables", tone: "gold", position: "lower-left" },
  { code: "RPT", label: "Reporting", tone: "purple", position: "lower-right" },
  { code: "API", label: "Integrations", tone: "navy", position: "bottom" },
];

const specialtyChips = [
  "Luxury Jewelry",
  "Multi-Location",
  "Bridal",
  "Estate & Custom",
  "Repairs",
];

const advertisingVisuals = [
  {
    image: "/assets/advertising/linkd-luxury-management-stack.webp",
  },
  {
    image: "/assets/advertising/linkd-feature-frames.webp",
  },
];

const seoPathCards = [
  {
    href: "/payments",
    label: "Payments",
    title: "Processing and reconciliation",
    copy: "Connect tender decisions at the counter to cleaner settlement review and better payment economics.",
  },
  {
    href: "/jewelry-pos",
    label: "Jewelry POS",
    title: "Checkout, services, layaway",
    copy: "A focused view of Linkd at the counter: clients, repairs, tenders, accounts, and sales flow.",
  },
  {
    href: "/inventory",
    label: "Inventory",
    title: "Serialized item control",
    copy: "Track receiving, transfers, aging, RFID-ready events, and movement history across the store.",
  },
  {
    href: "/repairs",
    label: "Repairs",
    title: "Service work beside POS",
    copy: "Keep repairs, appraisals, custom work, deposits, and service history tied to the customer.",
  },
  {
    href: "/security",
    label: "Security",
    title: "Permissions and audit trails",
    copy: "Review sensitive register actions, RFID-ready events, transfers, and CountRetail camera context.",
  },
  {
    href: "/integrations",
    label: "Integrations",
    title: "CRM, analytics, and accounting",
    copy: "See how Linkd can connect JewelLink, CountRetail, accounting, e-commerce, RFID, and APIs.",
  },
  {
    href: "/accounting",
    label: "Finance",
    title: "House accounts and layaway",
    copy: "Keep deposits, balances, tender review, and accounting handoff closer to the POS record.",
  },
  {
    href: "/multi-store",
    label: "Multi-Store",
    title: "Transfers, roles, and reporting",
    copy: "Connect locations with cleaner inventory movement, employee controls, and owner reporting.",
  },
];

const ecosystemCards = [
  {
    name: "JewelLink",
    role: "Relationships",
    image: "/assets/screenshots/jewellink-app.webp",
    alt: "JewelLink clienteling CRM dashboard with client follow-ups and appointments",
    width: 1800,
    height: 1200,
    copy: "CRM, clienteling, and follow-up.",
    href: "https://www.jewellink.com/",
  },
  {
    name: "Linkd",
    role: "Operations",
    image: "/assets/screenshots/linkd-pos-cart-demo-card-v2.webp",
    alt: "Linkd POS with a populated jewelry cart and demo customer",
    width: 1800,
    height: 1200,
    copy: "POS, services, inventory, and accounts.",
    href: "#early-access",
  },
  {
    name: "CountRetail",
    role: "Intelligence",
    image: "/assets/screenshots/countretail-app.webp",
    alt: "CountRetail store analytics dashboard with traffic, dwell, and conversion",
    width: 1800,
    height: 1200,
    copy: "Traffic, Vision AI, and owner insight.",
    href: "https://www.countretail.com/",
  },
  {
    name: "JewelHire",
    role: "People",
    image: "/assets/screenshots/jewelhire-recruiting-pipeline.webp",
    alt: "JewelHire recruiting pipeline with jewelry applicants, hiring stages, and JewelCert status",
    width: 1271,
    height: 715,
    copy: "Hiring, assessment, and onboarding for jewelry stores.",
    href: "https://jewelhire.com/",
  },
];

const integrationCloud = [
  "Payment processing",
  "Sage",
  "QuickBooks",
  "JewelLink CRM",
  "CountRetail AI",
  "JewelHire",
  "TrackTech RFID",
  "Shopify",
  "Avalara",
  "Open API",
];

const demoSignals = [
  "Your current processor",
  "Your daily workflows",
  "Your data migration",
  "Your ecosystem roadmap",
];

const faqItems = [
  {
    question: "What is Linkd?",
    answer:
      "Linkd is a POS and ERP system for luxury jewelry retailers, connecting payments, receivables, inventory, services, reporting, and accounting handoff.",
  },
  {
    question: "How is Linkd different from JewelLink?",
    answer:
      "Linkd records store operations at the counter and back office. JewelLink uses customer and POS context for CRM, clienteling, texting, training, and follow-up.",
  },
  {
    question: "How quickly can we move to Linkd?",
    answer:
      "Linkd is designed around a rapid, guided migration: discover the source, prepare and map the data, validate it with your team, then launch with white-glove support.",
  },
  {
    question: "What is included in the Linkd Ecosystem?",
    answer:
      "Linkd runs operations, JewelLink grows customer relationships, CountRetail turns store signals into intelligence, and JewelHire helps build the team.",
  },
];

const softwareFeatures = [
  "Jewelry point of sale",
  "Serialized inventory management",
  "Repair, appraisal, and service workflows",
  "Layaway and house accounts",
  "Role-based permissions",
  "Inventory audit workflows",
  "Multi-store transfer controls",
  "Jewelry store finance review",
  "Accounting handoff",
  "POS integrations and API readiness",
  "JewelLink CRM integration readiness",
  "CountRetail AI integration readiness",
  "Customer profiles and segments",
  "Jewelry repair and appraisal intake",
  "Report catalog for sales, inventory, KPI, commission, payroll, customer, and operations reporting",
  "Full luxury jewelry management ecosystem with Linkd, JewelLink, CountRetail, and JewelHire",
];

const seoPageMap = [
  ...seoPathCards.map((card) => ({
    name: card.label,
    url: `https://linkd.com${card.href}`,
    description: card.copy,
  })),
  {
    name: "Linkd, JewelLink, CountRetail, and JewelHire Ecosystem",
    url: "https://linkd.com/ecosystem",
    description:
      "Compare the Linkd operational core, JewelLink relationship layer, CountRetail intelligence layer, and JewelHire people layer.",
  },
];

const siteNavigationItems = [
  {
    name: "Linkd Home",
    url: "https://linkd.com/",
    description:
      "Linkd jewelry POS and store operations overview for luxury retail jewelers.",
  },
  ...seoPageMap,
];

const relatedRetailSystems = [
  {
    "@type": "SoftwareApplication",
    name: "JewelLink",
    applicationCategory: "CRM",
    url: "https://www.jewellink.com/",
    description:
      "Relationship layer for CRM, clienteling, texting, training, follow-up, and team workflows.",
  },
  {
    "@type": "SoftwareApplication",
    name: "CountRetail",
    applicationCategory: "BusinessIntelligenceApplication",
    url: "https://www.countretail.com/",
    description:
      "Intelligence layer for traffic, Vision AI, marketing, inventory signals, and owner reporting.",
  },
  {
    "@type": "SoftwareApplication",
    name: "JewelHire",
    applicationCategory: "BusinessApplication",
    url: "https://jewelhire.com/",
    description:
      "People layer for jewelry retail hiring, assessment, onboarding, and talent.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Linkd",
    url: "https://linkd.com/",
    logo: "https://linkd.com/assets/brand/linkd-logo-main.webp",
    description:
      "Jewelry POS, inventory management, store operations, accounting handoff, and security controls for luxury retail jewelers.",
    knowsAbout: [
      "Jewelry point of sale",
      "Jewelry inventory management",
      "Jewelry repair management",
      "Jewelry appraisal intake",
      "Jewelry store finance",
      "House account and layaway management",
      "Multi-store jewelry operations",
      "Jewelry POS integrations",
      "RFID jewelry inventory",
      "Jewelry store security",
      "Full luxury jewelry management",
      "Luxury retail operations",
      "Retail accounting handoff",
      "JewelLink CRM",
      "CountRetail AI",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Linkd",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://linkd.com/",
    image: "https://linkd.com/assets/advertising/linkd-luxury-management-stack.webp",
    description:
      "Luxury jewelry POS software connecting checkout, inventory, repairs, house accounts, layaway, reporting, security, and retail integrations.",
    featureList: softwareFeatures,
    screenshot: [
      ...advertisingVisuals.map((visual) => `https://linkd.com${visual.image}`),
      ...workflowProofs.map((workflow) => `https://linkd.com${workflow.image}`),
    ],
    isRelatedTo: relatedRetailSystems,
    audience: {
      "@type": "Audience",
      audienceType: "Luxury jewelry retailers",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Linkd",
    url: "https://linkd.com/",
    hasPart: seoPageMap.map((page) => ({
      "@type": "WebPage",
      name: page.name,
      url: page.url,
      description: page.description,
    })),
    potentialAction: {
      "@type": "ContactAction",
      target: "https://linkd.com/#early-access",
      name: "Book a Linkd demo",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Linkd product and ecosystem pages",
    itemListElement: seoPageMap.map((page, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebPage",
        name: page.name,
        url: page.url,
        description: page.description,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: "Linkd product and workflow navigation",
    hasPart: siteNavigationItems.map((page, index) => ({
      "@type": "WebPage",
      position: index + 1,
      name: page.name,
      url: page.url,
      description: page.description,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
];

export default function Home() {
  return (
    <main className="linkd-home premier-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <p className="eyebrow">The operating center of the Linkd Ecosystem</p>
          <h1>
            Run the whole store. Connect the <em>entire ecosystem.</em>
          </h1>
          <p className="hero-subtitle">
            Linkd is the operational core for luxury jewelry retail—connecting
            best-in-class payments, receivables, services, and inventory with
            your customers, store intelligence, and team.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="#early-access">
              Book a Demo
            </Link>
            <Link className="button button-secondary" href="/suite-demo">
              See the System
            </Link>
          </div>
          <dl className="hero-metrics" aria-label="Platform highlights">
            {heroProofs.map((proof) => (
              <div key={proof.value}>
                <dt>{proof.value}</dt>
                <dd>{proof.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-stage" aria-label="Linkd POS preview">
          <span className="hero-glow hero-glow-blue" aria-hidden="true" />
          <span className="hero-glow hero-glow-mint" aria-hidden="true" />
          <div className="hero-device-picture">
            <div className="hero-device-toolbar" aria-hidden="true">
              <span className="hero-device-dots"><i /><i /><i /></span>
              <span className="hero-device-url">app.linkd.com/pos</span>
              <span className="hero-device-status">Live workflow</span>
            </div>
            <div className="hero-device-screen">
              <Image
                className="hero-device-image"
                src="/assets/screenshots/linkd-pos-cart-demo-v2.webp"
                alt="Linkd POS showing Val Jones, four jewelry and service lines, and a $24,664.76 balance"
                width={1817}
                height={866}
                loading="eager"
                sizes="(max-width: 860px) calc(100vw - 44px), 52vw"
                unoptimized
              />
            </div>
          </div>
          <p className="hero-scene-caption">
            <span aria-hidden="true" /> Every piece, payment, person, and promise—connected through Linkd.
          </p>
        </div>
      </section>

      <section className="guided-demo-band" aria-labelledby="guided-demo-title">
        <div className="guided-demo-band-copy">
          <p className="eyebrow">One suite. Four guided tours.</p>
          <h2 id="guided-demo-title">See the ecosystem from its operational center.</h2>
          <p>
            Enter once, then explore Linkd, JewelLink, CountRetail, and
            JewelHire at your own pace—individually or as one connected system.
          </p>
          <Link className="button button-primary" href="/suite-demo">
            Explore the Linkd Suite
          </Link>
          <small>One introduction unlocks every guided experience.</small>
        </div>
        <div className="guided-demo-band-console" aria-label="Available Linkd Suite guided tours">
          <header>
            <span>LINKD SUITE GUIDED TOURS</span>
            <strong>Choose a system</strong>
          </header>
          <div className="guided-demo-band-grid">
            <span><b>LD</b> Linkd · Operations</span>
            <span><b>JL</b> JewelLink · Relationships</span>
            <span><b>CR</b> CountRetail · Intelligence</span>
            <span><b>JH</b> JewelHire · People</span>
          </div>
          <footer><i /> Start with one product—or see how all four connect</footer>
        </div>
      </section>

      <section className="section-light manifesto-band" aria-labelledby="manifesto-title">
        <p className="eyebrow">Where Linkd leads</p>
          <h2 className="manifesto-statement" id="manifesto-title">
            Four operating engines. One system your team can trust from
            {" "}<em>open to close.</em>
          </h2>
        <div className="manifesto-practices" aria-label="Linkd operating practices">
          <span>Payments</span><b aria-hidden="true">•</b><span>Receivables</span><b aria-hidden="true">•</b><span>Services</span><b aria-hidden="true">•</b><span>Inventory</span>
        </div>
      </section>

      <section className="section-white core-section" id="workflows">
        <div className="core-copy">
          <p className="eyebrow">One operating record</p>
          <h2>Every part of the store, one core.</h2>
          <p>
            Payments, services, inventory, and receivables write to one
            record—ready for the rest of the Linkd Ecosystem.
          </p>
          <Link className="button button-secondary" href="/jewelry-pos">
            Explore workflows
          </Link>
        </div>
        <div className="core-orbit" aria-label="Linkd operational core modules">
          <div className="core-orbit-rings" aria-hidden="true"></div>
          <div className="core-hub">
            <strong>Linkd</strong>
            <span>Operational core</span>
          </div>
          {coreModules.map((module) => (
            <div
              className={`core-node core-node-${module.position} core-tone-${module.tone}`}
              key={module.code}
            >
              <i aria-hidden="true">{module.code}</i>
              {module.label}
            </div>
          ))}
        </div>
      </section>

      <section className="section-light platform-section" id="platform">
        <div className="section-copy">
          <p className="eyebrow">Platform</p>
          <h2>Four workflows. One operating system.</h2>
        </div>
        <div className="operating-grid">
          {operatingSignals.map((signal, index) => (
            <article className="operating-card" key={signal.label}>
              <span className="operating-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{signal.title}</h3>
              <p>{signal.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-white economics-section" aria-labelledby="economics-title">
        <div className="economics-copy">
          <p className="eyebrow">The Linkd advantage</p>
          <h2 id="economics-title">Payment processing should strengthen the business—not quietly tax it.</h2>
          <p>
            Linkd connects the payment decision to the sale, the customer,
            the balance, and the books. That gives jewelers a clearer path to
            better economics and cleaner daily control.
          </p>
          <Link className="button button-secondary" href="/payments">
            Explore Payments
          </Link>
        </div>
        <div className="economics-proof" aria-label="Connected payment workflow">
          <article>
            <span>01</span>
            <strong>Tender with context</strong>
            <p>Every payment stays tied to the client, sale, service, or account.</p>
          </article>
          <article>
            <span>02</span>
            <strong>Manage the balance</strong>
            <p>Deposits, layaway, and receivables remain visible after checkout.</p>
          </article>
          <article>
            <span>03</span>
            <strong>Reconcile with confidence</strong>
            <p>Counter activity and settlement review share one operational trail.</p>
          </article>
        </div>
      </section>

      <section className="section-white showcase-section" id="product">
        <div className="section-copy">
          <p className="eyebrow">The Linkd system</p>
          <h2>Every screen is built around the work your team actually does.</h2>
        </div>
        <div className="showcase-grid">
          {productScenes.map((scene) => (
            <article className={`showcase-card showcase-card-${scene.tone}`} key={scene.label}>
              <div className="scene-browser">
                <Image
                  src={scene.image}
                  alt={scene.alt}
                  width={1800}
                  height={1200}
                  sizes="(max-width: 860px) calc(100vw - 44px), 44vw"
                  unoptimized
                />
              </div>
              <div>
                <span>{scene.label}</span>
                <h3>{scene.title}</h3>
                <p>{scene.copy}</p>
                <Link className="scene-link" href={scene.href}>
                  Explore the workflow <i aria-hidden="true">↗</i>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="section-actions">
          <Link className="button button-secondary" href="/jewelry-pos">
            See the POS
          </Link>
        </div>
      </section>

      <section className="section-light family-section" id="ecosystem">
        <div className="section-copy">
          <p className="eyebrow">One family of products</p>
          <h2>Operations, relationships, intelligence, and people.</h2>
          <p>
            Linkd records the operation. JewelLink grows the relationship.
            CountRetail explains the store. JewelHire helps build the team.
          </p>
        </div>
        <div className="ecosystem-grid">
          {ecosystemCards.map((card) => (
            <a
              className={`ecosystem-card family-card family-card-${card.name.toLowerCase()}`}
              href={card.href}
              key={card.name}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <div className="family-shot">
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={card.alt}
                    width={card.width}
                    height={card.height}
                    sizes="(max-width: 860px) calc(100vw - 44px), (max-width: 1180px) 44vw, 29vw"
                    unoptimized
                  />
                ) : (
                  <JewelHireBrand />
                )}
              </div>
              <span>{card.role}</span>
              <h3>{card.name}</h3>
              <p>{card.copy}</p>
            </a>
          ))}
        </div>
        <div className="integration-cloud integration-strip" aria-label="Integration areas">
          {integrationCloud.map((integration) => {
            const brandClass = integration.startsWith("JewelLink")
              ? "chip-jewel"
              : integration.startsWith("CountRetail")
                ? "chip-count"
                : integration.startsWith("JewelHire")
                  ? "chip-hire"
                : undefined;
            return (
              <span key={integration} className={brandClass}>
                {integration}
              </span>
            );
          })}
        </div>
        <div className="section-actions">
          <Link className="button button-secondary" href="/ecosystem">
            Compare the Stack
          </Link>
        </div>
      </section>

      <section className="section-white migration-section" id="migration" aria-labelledby="migration-title">
        <div className="migration-intro">
          <p className="eyebrow">Switch without the stall</p>
          <h2 id="migration-title">Your history comes with you. Your momentum never leaves.</h2>
          <p>
            Linkd pairs a rapid migration path with a white-glove launch team,
            so moving systems feels controlled from the first data review to
            the first live sale.
          </p>
        </div>
        <ol className="migration-steps">
          <li><span>01</span><strong>Discover</strong><p>Review your current system, workflows, and data.</p></li>
          <li><span>02</span><strong>Prepare</strong><p>Map and clean the records your store depends on.</p></li>
          <li><span>03</span><strong>Validate</strong><p>Confirm data and workflows with your team.</p></li>
          <li><span>04</span><strong>Launch</strong><p>Go live with guided onboarding and real support.</p></li>
        </ol>
      </section>

      <section className="dark-band" aria-labelledby="specialty-title">
        <p className="eyebrow">Built for luxury jewelry retail</p>
        <h2 id="specialty-title">Built for the way luxury jewelry actually moves.</h2>
        <div className="dark-band-chips" aria-label="Store types">
          {specialtyChips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
      </section>

      <section className="section-white faq-section">
        <div className="section-copy">
          <p className="eyebrow">Quick answers</p>
          <h2>The essentials.</h2>
        </div>
        <div className="faq-grid">
          {faqItems.map((item) => (
            <article className="faq-card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="early-access-section" id="early-access">
        <div className="release-panel">
          <div className="release-copy">
            <p className="eyebrow">Book a demo</p>
            <h2>See Linkd run a real day at the counter.</h2>
            <p>
              Show us your processor, your workflows, and the system you are
              leaving. We will map the Linkd path from counter to close.
            </p>
            <div className="release-signals">
              {demoSignals.map((signal) => (
                <span key={signal}>{signal}</span>
              ))}
            </div>
          </div>
          <InquiryForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
