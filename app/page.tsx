import InquiryForm from "./components/InquiryForm";
import { FeatureFrameGrid, productFeatureFrames } from "./components/FeatureFrames";
import Image from "next/image";
import Link from "next/link";

const primaryNavItems = [
  { href: "/jewelry-pos", label: "POS" },
  { href: "/inventory", label: "Inventory" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/security", label: "Security" },
  { href: "/integrations", label: "Integrations" },
  { href: "#early-access", label: "Early Release" },
];

const roleStripCards = [
  {
    name: "Linkd",
    role: "Operations",
    proof: "POS, inventory, accounts, audits",
    image: "/assets/screenshots/linkd-pos-register-devices.webp",
    alt: "Linkd POS register workspace",
    width: 1536,
    height: 1024,
    href: "/jewelry-pos",
    kind: "screen",
  },
  {
    name: "JewelLink",
    role: "Relationships",
    proof: "CRM, clienteling, training",
    image: "/assets/brand/jewellink-logo-main.webp",
    alt: "JewelLink logo",
    width: 12500,
    height: 6250,
    href: "https://www.jewellink.com/",
    kind: "logo",
  },
  {
    name: "CountRetail",
    role: "Intelligence",
    proof: "Traffic, Vision AI, analytics",
    image: "/assets/brand/countretail-logo-main.webp",
    alt: "CountRetail logo",
    width: 3538,
    height: 504,
    href: "https://www.countretail.com/",
    kind: "logo",
  },
];

const heroProofs = [
  {
    value: "POS",
    label: "Checkout, services, layaway",
  },
  {
    value: "RFID",
    label: "Serialized item control",
  },
  {
    value: "API",
    label: "JewelLink and CountRetail ready",
  },
];

const operatingSignals = [
  {
    label: "Sell",
    title: "Point of sale",
    copy: "Fine jewelry checkout, repairs, appraisals, special orders, quotes, deposits, and tenders.",
  },
  {
    label: "Track",
    title: "Inventory control",
    copy: "Serialized items, transfers, receiving, aging, vendor context, and RFID-ready movement history.",
  },
  {
    label: "Account",
    title: "Store finance",
    copy: "House accounts, layaway schedules, specialty financing, balances, interest rules, and accounting handoff.",
  },
  {
    label: "Secure",
    title: "Role-based operations",
    copy: "Register permissions, approvals, location controls, security logs, and exception review.",
  },
];

const operationsMap = [
  {
    label: "Counter",
    title: "POS",
    signals: ["Sales", "Services", "Deposits"],
  },
  {
    label: "Case",
    title: "Inventory",
    signals: ["Serialized", "RFID-ready", "Transfers"],
  },
  {
    label: "Customer",
    title: "Accounts",
    signals: ["Layaway", "Balances", "History"],
  },
  {
    label: "Back office",
    title: "Finance",
    signals: ["Tenders", "Exports", "Review"],
  },
  {
    label: "Manager",
    title: "Security",
    signals: ["Roles", "Approvals", "Audits"],
  },
  {
    label: "Stack",
    title: "Integrations",
    signals: ["JewelLink", "CountRetail", "Accounting"],
  },
];

const workflowProofs = [
  {
    label: "Sell",
    title: "Counter POS built for jewelry sales.",
    copy: "Client lookup, service add-ons, manager controls, parked sales, and tender review in one register workspace.",
    image: "/assets/screenshots/linkd-pos-register-devices.webp",
    alt: "Linkd POS register shown on a MacBook screen",
    chips: ["Client lookup", "Repair intake", "Tender controls"],
  },
  {
    label: "Track",
    title: "Every item has a live operational record.",
    copy: "Search serialized inventory, review item movement, prepare RFID workflows, and see aging before it becomes a surprise.",
    image: "/assets/screenshots/linkd-inventory-search-devices.webp",
    alt: "Linkd inventory search shown on a MacBook screen",
    chips: ["Serialized stock", "Transfers", "Aging risk"],
  },
  {
    label: "Connect",
    title: "Customer context stays close to the sale.",
    copy: "POS history, service work, account status, and activity can feed JewelLink CRM and clienteling workflows.",
    image: "/assets/screenshots/linkd-customers-crm-devices.webp",
    alt: "Linkd customer management shown on a MacBook screen",
    chips: ["POS history", "Service timeline", "CRM-ready data"],
  },
  {
    label: "Report",
    title: "Owner reporting without a spreadsheet hunt.",
    copy: "Sales, tenders, inventory, payroll, commissions, and benchmarking live where operators can find them.",
    image: "/assets/screenshots/linkd-reports-home-devices.webp",
    alt: "Linkd reports catalog shown on a MacBook screen",
    chips: ["Sales reports", "Commissions", "Benchmarks"],
  },
  {
    label: "Sync",
    title: "Integration health is visible, not hidden.",
    copy: "Accounting, e-commerce, documents, tax, and provider syncs show status before they become back-office risk.",
    image: "/assets/screenshots/linkd-settings-integrations-devices.webp",
    alt: "Linkd integrations settings shown on a MacBook screen",
    chips: ["QuickBooks", "Shopify", "Open APIs"],
  },
];

const advertisingVisuals = [
  {
    label: "Ecosystem frame",
    title: "Full luxury management stack",
    copy: "Linkd, JewelLink, and CountRetail split operations, relationships, and intelligence into clear jobs.",
    image: "/assets/advertising/linkd-luxury-management-stack.webp",
    alt: "Linkd, JewelLink, and CountRetail full luxury jewelry management stack visual",
    href: "/ecosystem",
  },
  {
    label: "Feature frame",
    title: "Product proof without private records",
    copy: "Public-safe frames advertise POS, customers, services, inventory, reports, and integrations with minimal text.",
    image: "/assets/advertising/linkd-feature-frames.webp",
    alt: "Linkd product feature frame advertising visual for jewelry POS workflows",
    href: "#feature-frames",
  },
];

const seoPathCards = [
  {
    href: "/jewelry-pos",
    label: "Jewelry POS",
    title: "Checkout, services, layaway",
    copy: "A focused view of Linkd at the counter: clients, repairs, tenders, accounts, and sales flow.",
    image: "/assets/screenshots/linkd-pos-register-devices.webp",
    alt: "Linkd jewelry POS register",
  },
  {
    href: "/inventory",
    label: "Inventory",
    title: "Serialized item control",
    copy: "Track receiving, transfers, aging, RFID-ready events, and movement history across the store.",
    image: "/assets/screenshots/linkd-inventory-search-devices.webp",
    alt: "Linkd jewelry inventory management",
  },
  {
    href: "/repairs",
    label: "Repairs",
    title: "Service work beside POS",
    copy: "Keep repairs, appraisals, custom work, deposits, and service history tied to the customer.",
    image: "/assets/screenshots/linkd-pos-register-devices.webp",
    alt: "Linkd jewelry repair intake and service workflow",
  },
  {
    href: "/security",
    label: "Security",
    title: "Permissions and audit trails",
    copy: "Review sensitive register actions, RFID-ready events, transfers, and CountRetail camera context.",
    image: "/assets/screenshots/linkd-reports-home-devices.webp",
    alt: "Linkd jewelry store security and audit reporting",
  },
  {
    href: "/integrations",
    label: "Integrations",
    title: "CRM, analytics, and accounting",
    copy: "See how Linkd can connect JewelLink, CountRetail, accounting, e-commerce, RFID, and APIs.",
    image: "/assets/screenshots/linkd-settings-integrations-devices.webp",
    alt: "Linkd jewelry retail integrations",
  },
  {
    href: "/accounting",
    label: "Finance",
    title: "House accounts and layaway",
    copy: "Keep deposits, balances, tender review, and accounting handoff closer to the POS record.",
    image: "/assets/screenshots/linkd-reports-home-devices.webp",
    alt: "Linkd jewelry store finance and accounting review",
  },
  {
    href: "/multi-store",
    label: "Multi-Store",
    title: "Transfers, roles, and reporting",
    copy: "Connect locations with cleaner inventory movement, employee controls, and owner reporting.",
    image: "/assets/screenshots/linkd-inventory-search-devices.webp",
    alt: "Linkd multi-store jewelry operations and inventory movement",
  },
];

const ecosystemCards = [
  {
    name: "Linkd",
    role: "Operational core",
    logo: "/assets/brand/linkd-logo-main.webp",
    alt: "Linkd",
    width: 5334,
    height: 3205,
    copy: "Records the daily truth: sales, services, inventory, house accounts, permissions, and accounting handoff.",
    href: "#early-access",
  },
  {
    name: "JewelLink",
    role: "Relationship layer",
    logo: "/assets/brand/jewellink-logo-main.webp",
    alt: "JewelLink",
    width: 12500,
    height: 6250,
    copy: "Turns customer context into clienteling, texting, training, bridal workflows, and AI-assisted follow-up.",
    href: "https://www.jewellink.com/",
  },
  {
    name: "CountRetail",
    role: "Intelligence layer",
    logo: "/assets/brand/countretail-logo-main.webp",
    alt: "CountRetail",
    width: 3538,
    height: 504,
    copy: "Connects traffic, Vision AI, marketing attribution, predictive aging, and owner-level store decisions.",
    href: "https://www.countretail.com/",
  },
];

const securitySignals = [
  "RFID-ready inventory events",
  "Permission logs for sensitive actions",
  "CountRetail camera context alignment",
  "Multi-store transfer handoff history",
  "Exception review for managers",
];

const integrationCloud = [
  "JewelLink CRM",
  "CountRetail AI",
  "TrackTech RFID",
  "QuickBooks",
  "Xero",
  "Striven",
  "Shopify",
  "Avalara",
  "Open API",
];

const ecosystemFlows = [
  {
    label: "Relationship",
    product: "JewelLink",
    copy: "Clienteling, texting, training, follow-up",
  },
  {
    label: "Operations",
    product: "Linkd",
    copy: "POS, inventory, accounts, audit trail",
  },
  {
    label: "Intelligence",
    product: "CountRetail",
    copy: "Traffic, marketing, aging, owner insight",
  },
];

const earlyAccessSignals = [
  "Luxury jewelry POS change",
  "Multi-location inventory control",
  "House accounts and layaway",
  "Connected CRM and analytics",
];

const faqItems = [
  {
    question: "What is Linkd?",
    answer:
      "Linkd is jewelry POS software for luxury retailers, connecting checkout, inventory, repairs, house accounts, layaway, reporting, and accounting handoff.",
  },
  {
    question: "How is Linkd different from JewelLink?",
    answer:
      "Linkd records store operations at the counter and back office. JewelLink uses customer and POS context for CRM, clienteling, texting, training, and follow-up.",
  },
  {
    question: "How does Linkd work with CountRetail?",
    answer:
      "Linkd keeps operational records clean so CountRetail can compare traffic, camera intelligence, inventory pressure, and store performance against reliable retail data.",
  },
  {
    question: "How do Linkd, JewelLink, and CountRetail support full luxury jewelry management?",
    answer:
      "Linkd records POS, inventory, services, accounts, permissions, and reporting. JewelLink activates CRM, clienteling, texting, training, and follow-up. CountRetail adds traffic, Vision AI, analytics, and owner intelligence.",
  },
  {
    question: "Does Linkd support jewelry inventory workflows?",
    answer:
      "Linkd is designed for serialized inventory, receiving, transfers, aging views, RFID-ready events, vendor context, and multi-store movement history.",
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
  "Full luxury jewelry management ecosystem with Linkd, JewelLink, and CountRetail",
];

const seoPageMap = [
  ...seoPathCards.map((card) => ({
    name: card.label,
    url: `https://linkd.com${card.href}`,
    description: card.copy,
  })),
  {
    name: "Linkd, JewelLink, and CountRetail Ecosystem",
    url: "https://linkd.com/ecosystem",
    description:
      "Compare the Linkd operational core, JewelLink relationship layer, and CountRetail intelligence layer for jewelry retail.",
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
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      category: "Early access",
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
      name: "Request Linkd early release access",
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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="site-header">
        <Link className="brand-lockup" href="#top" aria-label="Linkd home">
          <span className="brand-logo-crop">
            <Image
              src="/assets/brand/linkd-logo-main.webp"
              alt="Linkd"
              width={5334}
              height={3205}
              priority
              unoptimized
            />
          </span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {primaryNavItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
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
          <p className="eyebrow">Luxury jewelry POS software</p>
          <h1>Jewelry POS that connects the store.</h1>
          <p className="hero-subtitle">
            Linkd gives luxury jewelers one operational workspace for checkout,
            inventory, services, house accounts, security, reporting, and
            accounting handoff, ready for JewelLink CRM and CountRetail AI.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="#early-access">
              Request Early Access
            </Link>
            <Link className="button button-secondary" href="#workflows">
              See Workflows
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

        <div className="product-stage hero-product-stage" aria-label="Linkd POS preview">
          <Image
            className="hero-device-image"
            src="/assets/screenshots/linkd-pos-register-devices.webp"
            alt="Linkd POS register shown on a MacBook screen"
            width={1536}
            height={1024}
            priority
            unoptimized
          />
          <div className="stage-proof-card">
            <span>Operational core</span>
            <strong>Sell, track, account, secure.</strong>
          </div>
          <div className="hero-visual-signals" aria-label="Core Linkd workflows">
            <span>POS</span>
            <span>Inventory</span>
            <span>Services</span>
            <span>Accounts</span>
            <span>Reporting</span>
          </div>
        </div>
      </section>

      <section className="section-white feature-frame-section" id="feature-frames">
        <div className="section-copy">
          <p className="eyebrow">Feature frames</p>
          <h2>Show the workflow before explaining it.</h2>
          <p>
            Public-safe product frames turn the Linkd workspace into quick,
            scannable proof for POS, customers, services, inventory, reports,
            and integrations.
          </p>
        </div>
        <FeatureFrameGrid frames={productFeatureFrames} />
      </section>

      <section
        className="section-light advertising-visual-section"
        id="advertising-visuals"
        aria-labelledby="advertising-visual-title"
      >
        <div className="section-copy">
          <p className="eyebrow">Advertising visuals</p>
          <h2 id="advertising-visual-title">Two frames. Full story.</h2>
          <p>
            Visual proof for buyers, search, and sales outreach, without
            exposing store data.
          </p>
        </div>
        <div className="advertising-visual-grid">
          {advertisingVisuals.map((visual) => (
            <Link className="advertising-visual-card" href={visual.href} key={visual.title}>
              <Image
                src={visual.image}
                alt={visual.alt}
                width={1600}
                height={1000}
                unoptimized
              />
              <span>{visual.label}</span>
              <h3>{visual.title}</h3>
              <p>{visual.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="role-strip-section" aria-labelledby="role-strip-title">
        <div className="role-strip-shell">
          <div className="role-strip-copy">
            <p className="eyebrow">Store stack</p>
            <h2 id="role-strip-title">The difference, fast.</h2>
            <p>
              Linkd records the operation. JewelLink grows the relationship.
              CountRetail explains the store.
            </p>
          </div>
          <div className="role-strip-grid" aria-label="Linkd ecosystem roles">
            {roleStripCards.map((card) => (
              <a
                className={`role-strip-card role-strip-${card.name.toLowerCase()}`}
                href={card.href}
                key={card.name}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <div className={`role-card-visual role-card-visual-${card.kind}`}>
                  <Image
                    src={card.image}
                    alt={card.alt}
                    width={card.width}
                    height={card.height}
                    unoptimized
                  />
                </div>
                <div>
                  <span>{card.role}</span>
                  <strong>{card.name}</strong>
                  <p>{card.proof}</p>
                </div>
              </a>
            ))}
          </div>
          <Link className="role-strip-link" href="/ecosystem">
            Compare the stack
          </Link>
        </div>
      </section>

      <section className="section-white platform-section" id="platform">
        <div className="section-copy">
          <p className="eyebrow">Platform</p>
          <h2>The daily operating system behind the jewelry counter.</h2>
          <p>
            Linkd is built around the data that must be right before CRM,
            analytics, accounting, and AI can be trusted.
          </p>
        </div>
        <div className="operating-grid">
          {operatingSignals.map((signal) => (
            <article className="operating-card" key={signal.label}>
              <span>{signal.label}</span>
              <h3>{signal.title}</h3>
              <p>{signal.copy}</p>
            </article>
          ))}
        </div>
        <div className="operations-map" aria-label="Linkd connected operations map">
          <div className="operations-map-core">
            <span>Linkd Core</span>
            <strong>One operating record</strong>
            <p>Sales, items, accounts, permissions, and handoffs stay connected.</p>
          </div>
          <div className="operations-map-grid">
            {operationsMap.map((module) => (
              <article className="operations-map-node" key={module.title}>
                <span>{module.label}</span>
                <strong>{module.title}</strong>
                <div
                  className="mini-chip-row"
                  aria-label={`${module.title} signals`}
                >
                  {module.signals.map((signal) => (
                    <small key={signal}>{signal}</small>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light seo-path-section">
        <div className="section-copy">
          <p className="eyebrow">Explore by priority</p>
          <h2>Start with the workflow you need to fix first.</h2>
        </div>
        <div className="seo-path-grid">
          {seoPathCards.map((card) => (
            <Link className="seo-path-card" href={card.href} key={card.href}>
              <Image
                src={card.image}
                alt={card.alt}
                width={1536}
                height={1024}
                unoptimized
              />
              <div>
                <span>{card.label}</span>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-light workflow-section" id="workflows">
        <div className="section-copy workflow-heading">
          <p className="eyebrow">Product proof</p>
          <h2>Product screens your team can recognize fast.</h2>
          <p>
            Move from the counter to inventory, customer history, reporting,
            and integrations without sending the store through separate tools.
          </p>
        </div>
        <div className="workflow-proof-list">
          {workflowProofs.map((workflow, index) => (
            <article className="workflow-proof-card" key={workflow.label}>
              <div className="workflow-shot">
                <Image
                  src={workflow.image}
                  alt={workflow.alt}
                  width={1536}
                  height={1024}
                  unoptimized
                />
              </div>
              <div className="workflow-copy">
                <span>{String(index + 1).padStart(2, "0")} / {workflow.label}</span>
                <h3>{workflow.title}</h3>
                <p>{workflow.copy}</p>
                <div className="chip-row" aria-label={`${workflow.label} highlights`}>
                  {workflow.chips.map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-dark ecosystem-section" id="ecosystem">
        <div className="section-copy">
          <p className="eyebrow">Connected ecosystem</p>
          <h2>One store stack. Three clear jobs.</h2>
          <p>
            Linkd, JewelLink, and CountRetail work together as a full luxury
            jewelry management ecosystem: operations, relationships, and
            intelligence.
          </p>
        </div>
        <div className="ecosystem-grid">
          {ecosystemCards.map((card) => (
            <a
              className="ecosystem-card"
              href={card.href}
              key={card.name}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <div className={`ecosystem-logo ecosystem-logo-${card.name.toLowerCase()}`}>
                <Image
                  src={card.logo}
                  alt={card.alt}
                  width={card.width}
                  height={card.height}
                  unoptimized
                />
              </div>
              <span>{card.role}</span>
              <h3>{card.name}</h3>
              <p>{card.copy}</p>
            </a>
          ))}
        </div>
        <div className="integration-cloud" aria-label="Planned integrations">
          {integrationCloud.map((integration) => (
            <span key={integration}>{integration}</span>
          ))}
        </div>
        <div className="ecosystem-flow" aria-label="Linkd ecosystem data map">
          {ecosystemFlows.map((flow) => (
            <article
              className={`ecosystem-flow-card ecosystem-flow-${flow.product.toLowerCase()}`}
              key={flow.product}
            >
              <span>{flow.label}</span>
              <strong>{flow.product}</strong>
              <p>{flow.copy}</p>
            </article>
          ))}
        </div>
        <div className="section-actions">
          <Link className="button button-secondary" href="/ecosystem">
            Compare the Stack
          </Link>
        </div>
      </section>

      <section className="section-white security-section" id="security">
        <div className="security-copy">
          <p className="eyebrow">Security and audits</p>
          <h2>Controls for the counter, the case, and the back office.</h2>
          <p>
            Jewelry operations need reviewable evidence around item movement,
            register actions, employee access, and inventory exceptions.
          </p>
        </div>
        <div className="security-list">
          {securitySignals.map((signal) => (
            <div className="security-row" key={signal}>
              <span aria-hidden="true"></span>
              <p>{signal}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-blue ai-section">
        <div>
          <p className="eyebrow">AI-ready operations</p>
          <h2>Cleaner records create better answers.</h2>
        </div>
        <div className="ai-grid">
          <article>
            <h3>Invoice ingestion</h3>
            <p>Convert vendor documents into inventory-ready records.</p>
          </article>
          <article>
            <h3>Predictive aging</h3>
            <p>Spot stock, margin, and merchandising pressure earlier.</p>
          </article>
          <article>
            <h3>Accounting assist</h3>
            <p>Prepare cleaner handoff into QuickBooks, Xero, and Striven.</p>
          </article>
        </div>
      </section>

      <section className="section-white faq-section">
        <div className="section-copy">
          <p className="eyebrow">Quick answers</p>
          <h2>Built for jewelry operators who need the store connected.</h2>
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
            <p className="eyebrow">Early release access</p>
            <h2>For jewelers ready to modernize POS and connected operations.</h2>
            <p>
              The early list is best for stores evaluating luxury POS,
              inventory control, accounting handoff, security, and ecosystem
              integrations.
            </p>
            <div className="release-signals">
              {earlyAccessSignals.map((signal) => (
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
          <p>Jewelry POS and operations for luxury retail teams.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="#platform">Platform</Link>
          <Link href="#workflows">Workflows</Link>
          <Link href="/ecosystem">Ecosystem</Link>
          <Link href="/jewelry-pos">Jewelry POS</Link>
          <Link href="/repairs">Repairs</Link>
          <Link href="/inventory">Inventory</Link>
          <Link href="/accounting">Finance</Link>
          <Link href="/multi-store">Multi-Store</Link>
          <Link href="/security">Security</Link>
          <Link href="/integrations">Integrations</Link>
          <Link href="#early-access">Early Release</Link>
          <Link href="/login">Login</Link>
        </nav>
      </footer>
    </main>
  );
}
