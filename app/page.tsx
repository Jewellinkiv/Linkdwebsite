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
    label: "Checkout, services, layaway",
  },
  {
    value: "RFID",
    label: "Serialized item control",
  },
  {
    value: "One",
    label: "Connected store workspace",
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
    copy: "House accounts, layaway schedules, balances, interest rules, and clean accounting handoff.",
  },
  {
    label: "Secure",
    title: "Role-based operations",
    copy: "Register permissions, approvals, location controls, security logs, and exception review.",
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
    label: "Report",
    title: "Owner reporting without a spreadsheet hunt.",
    copy: "Sales, tenders, inventory, payroll, commissions, and benchmarking live where operators can find them.",
    image: "/assets/screenshots/linkd-reports-home-devices.webp",
    alt: "Linkd reports catalog shown on a MacBook screen",
    chips: ["Sales reports", "Commissions", "Benchmarks"],
  },
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
    copy: "CRM, clienteling, texting, training, bridal workflows, and AI-assisted follow-up.",
    href: "https://www.jewellink.com/",
  },
  {
    name: "Linkd",
    role: "Operations",
    logo: "/assets/brand/linkd-logo-main.webp",
    alt: "Linkd",
    width: 5334,
    height: 3205,
    copy: "The POS partner: sales, services, inventory, house accounts, and accounting handoff.",
    href: "#early-access",
  },
  {
    name: "CountRetail",
    role: "Intelligence",
    logo: "/assets/brand/countretail-logo-main.webp",
    alt: "CountRetail",
    width: 3538,
    height: 504,
    copy: "Traffic, Vision AI, marketing attribution, predictive aging, and owner decisions.",
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
          <p className="eyebrow">The operational core for modern jewelry retail</p>
          <h1>Run the store. Connect every sale.</h1>
          <p className="hero-subtitle">
            Linkd is the point of sale in the JewelLink family: checkout,
            inventory, services, house accounts, and reporting in one modern
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

      <section className="section-white platform-section" id="platform">
        <div className="section-copy">
          <p className="eyebrow">Platform</p>
          <h2>Everything behind the counter. Nothing in the way.</h2>
          <p>
            Linkd is built around the data that must be right before CRM,
            analytics, accounting, and AI can be trusted.
          </p>
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

      <section className="section-light workflow-section" id="workflows">
        <div className="section-copy workflow-heading">
          <p className="eyebrow">Product</p>
          <h2>See the workspace your team will actually use.</h2>
          <p>
            Move from the counter to inventory and owner reporting without
            sending the store through separate tools.
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

      <section className="section-white family-section" id="ecosystem">
        <div className="section-copy">
          <p className="eyebrow">One family of products</p>
          <h2>Operations, relationships, and intelligence.</h2>
          <p>
            Linkd records the operation. JewelLink grows the relationship.
            CountRetail explains the store. Three products, one connected
            luxury jewelry stack.
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

      <section className="section-light faq-section">
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
            <p className="eyebrow">Book a demo</p>
            <h2>See Linkd run a real day at the counter.</h2>
            <p>
              Tell us about your store and we will walk you through checkout,
              inventory, accounts, reporting, and how Linkd connects with
              JewelLink and CountRetail.
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
