import InquiryForm from "./components/InquiryForm";
import Image from "next/image";
import Link from "next/link";

const primaryNavItems = [
  { href: "/jewelry-pos", label: "POS" },
  { href: "/inventory", label: "Inventory" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/security", label: "Security" },
  { href: "/integrations", label: "Integrations" },
];

const heroProofs = [
  {
    value: "POS",
    label: "Checkout & services",
  },
  {
    value: "RFID",
    label: "Inventory security",
  },
  {
    value: "API",
    label: "Integrations ready",
  },
];

const operatingSignals = [
  {
    label: "Sell",
    title: "Point of sale",
    copy: "Checkout, deposits, layaway, and house accounts.",
  },
  {
    label: "Serve",
    title: "Service management",
    copy: "Repairs, appraisals, and custom work, intake to pickup.",
  },
  {
    label: "Secure",
    title: "Inventory security",
    copy: "Serialized, RFID-ready items with audits and movement history.",
  },
  {
    label: "Connect",
    title: "Integrations",
    copy: "JewelLink CRM, CountRetail AI, accounting, and open APIs.",
  },
];

const workflowProofs = [
  {
    image: "/assets/screenshots/linkd-pos-register-devices.webp",
  },
  {
    image: "/assets/screenshots/linkd-inventory-search-devices.webp",
  },
  {
    image: "/assets/screenshots/linkd-reports-home-devices.webp",
  },
];

const coreModules = [
  { code: "POS", label: "Point of Sale", tone: "blue", position: "top" },
  { code: "INV", label: "Inventory", tone: "teal", position: "upper-right" },
  { code: "SVC", label: "Services & Repairs", tone: "pink", position: "upper-left" },
  { code: "ACC", label: "House Accounts", tone: "gold", position: "lower-left" },
  { code: "RPT", label: "Reporting", tone: "purple", position: "lower-right" },
  { code: "API", label: "Integrations", tone: "navy", position: "bottom" },
];

const proofChips = [
  "Client lookup",
  "Serialized stock",
  "Tender controls",
  "Owner reports",
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
    logo: "/assets/brand/jewellink-logo-main.webp",
    alt: "JewelLink",
    width: 12500,
    height: 6250,
    copy: "CRM, clienteling, and follow-up.",
    href: "https://www.jewellink.com/",
  },
  {
    name: "Linkd",
    role: "Operations",
    logo: "/assets/brand/linkd-logo-main.webp",
    alt: "Linkd",
    width: 5334,
    height: 3205,
    copy: "POS, services, inventory, and accounts.",
    href: "#early-access",
  },
  {
    name: "CountRetail",
    role: "Intelligence",
    logo: "/assets/brand/countretail-logo-main.webp",
    alt: "CountRetail",
    width: 3538,
    height: 504,
    copy: "Traffic, Vision AI, and owner insight.",
    href: "https://www.countretail.com/",
  },
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

const demoSignals = [
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
            Book a Demo
          </Link>
        </div>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Luxury jewelry POS software</p>
          <h1>The operations center for luxury jewelry stores.</h1>
          <p className="hero-subtitle">
            Checkout, service management, and inventory security in one simple
            workspace, connected to JewelLink CRM and CountRetail AI.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="#early-access">
              Book a Demo
            </Link>
            <Link className="button button-secondary" href="#platform">
              Explore Platform
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
          <Image
            className="hero-device-image"
            src="/assets/screenshots/linkd-pos-register-hero.webp"
            alt="Linkd POS register shown on a MacBook and iPad"
            width={1536}
            height={1024}
            priority
            unoptimized
          />
        </div>
      </section>

      <section className="section-white core-section" id="workflows">
        <div className="core-copy">
          <p className="eyebrow">One operating record</p>
          <h2>Every part of the store, one core.</h2>
          <p>
            Sales, services, inventory, and accounts write to one record,
            shared with JewelLink and CountRetail.
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
          <h2>Four jobs. One workspace.</h2>
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

      <section className="section-white proof-section" id="product">
        <div className="proof-copy">
          <p className="eyebrow">Product proof</p>
          <h2>Screens your team will recognize on day one.</h2>
          <div className="release-signals" aria-label="Product highlights">
            {proofChips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
          <div className="section-actions proof-actions">
            <Link className="button button-secondary" href="/jewelry-pos">
              See the POS
            </Link>
          </div>
        </div>
        <div className="proof-stage" aria-label="Linkd product screens">
          <Image
            className="proof-shot proof-shot-back"
            src="/assets/screenshots/linkd-reports-home-devices.webp"
            alt="Linkd owner reporting catalog"
            width={1536}
            height={1024}
            unoptimized
          />
          <Image
            className="proof-shot proof-shot-front"
            src="/assets/screenshots/linkd-pos-register-devices.webp"
            alt="Linkd POS register workspace"
            width={1536}
            height={1024}
            unoptimized
          />
        </div>
      </section>

      <section className="section-light family-section" id="ecosystem">
        <div className="section-copy">
          <p className="eyebrow">One family of products</p>
          <h2>Operations, relationships, and intelligence.</h2>
          <p>
            Linkd records the operation. JewelLink grows the relationship.
            CountRetail explains the store.
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
        <div className="integration-cloud integration-strip" aria-label="Planned integrations">
          {integrationCloud.map((integration) => (
            <span key={integration}>{integration}</span>
          ))}
        </div>
        <div className="section-actions">
          <Link className="button button-secondary" href="/ecosystem">
            Compare the Stack
          </Link>
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
              Tell us about your store. We will show you the counter, the
              case, and the back office.
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

      <footer className="site-footer">
        <div>
          <span className="footer-mark">Linkd</span>
          <p>Jewelry POS and operations for luxury retail teams.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="#platform">Platform</Link>
          <Link href="#workflows">Product</Link>
          <Link href="/ecosystem">Ecosystem</Link>
          <Link href="/jewelry-pos">Jewelry POS</Link>
          <Link href="/repairs">Repairs</Link>
          <Link href="/inventory">Inventory</Link>
          <Link href="/accounting">Finance</Link>
          <Link href="/multi-store">Multi-Store</Link>
          <Link href="/security">Security</Link>
          <Link href="/integrations">Integrations</Link>
          <Link href="#early-access">Book a Demo</Link>
          <Link href="/login">Login</Link>
        </nav>
      </footer>
    </main>
  );
}
