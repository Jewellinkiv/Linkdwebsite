import InquiryForm from "../components/InquiryForm";
import Image from "next/image";
import Link from "next/link";

const ecosystemRoles = [
  {
    name: "Linkd",
    role: "Operational core",
    logo: "/assets/brand/linkd-logo-main.webp",
    alt: "Linkd",
    width: 5334,
    height: 3205,
    proof: "POS, inventory, services, house accounts, permissions, reporting, and accounting handoff.",
    examples: ["Checkout", "Serialized inventory", "Audit trail", "Accounting handoff"],
  },
  {
    name: "JewelLink",
    role: "Relationship layer",
    logo: "/assets/brand/jewellink-logo-main.webp",
    alt: "JewelLink",
    width: 12500,
    height: 6250,
    proof: "CRM, clienteling, texting, training, bridal workflows, follow-up, and AI-assisted selling.",
    examples: ["Clienteling", "Training", "Texting", "Follow-up"],
  },
  {
    name: "CountRetail",
    role: "Intelligence layer",
    logo: "/assets/brand/countretail-logo-main.webp",
    alt: "CountRetail",
    width: 3538,
    height: 504,
    proof: "Vision AI traffic, marketing attribution, predictive aging, inventory signals, and owner decisions.",
    examples: ["Traffic", "Vision AI", "Inventory signals", "Owner cockpit"],
  },
];

const handoffSteps = [
  {
    label: "1",
    title: "Linkd records the store",
    copy: "Sales, items, services, balances, register actions, and permissions become the operational record.",
  },
  {
    label: "2",
    title: "JewelLink activates the relationship",
    copy: "Customer context supports clienteling, texting, bridal follow-up, training, and associate workflows.",
  },
  {
    label: "3",
    title: "CountRetail explains the signals",
    copy: "Traffic, camera, marketing, aging, inventory, and sales signals become owner-level decisions.",
  },
];

const ecosystemProofs = [
  {
    name: "Linkd",
    label: "Operations",
    question: "What happened at the counter?",
    proof: "Sales, items, services, balances, permissions.",
    image: "/assets/screenshots/linkd-pos-checkout.webp",
    alt: "Linkd POS register showing jewelry store counter operations",
    width: 1536,
    height: 1024,
    kind: "screenshot",
  },
  {
    name: "JewelLink",
    label: "Relationships",
    question: "Who needs follow-up?",
    proof: "CRM, clienteling, texting, training, bridal workflows.",
    image: "/assets/brand/jewellink-logo-main.webp",
    alt: "JewelLink logo",
    width: 12500,
    height: 6250,
    kind: "logo",
  },
  {
    name: "CountRetail",
    label: "Intelligence",
    question: "What is the store telling us?",
    proof: "Traffic, marketing, Vision AI, aging, owner insight.",
    image: "/assets/brand/countretail-logo-main.webp",
    alt: "CountRetail logo",
    width: 3538,
    height: 504,
    kind: "logo",
  },
];

const ecosystemHeroCards = [
  {
    name: "Linkd",
    label: "Operations",
    proof: "POS / inventory / accounts",
    image: "/assets/screenshots/linkd-pos-checkout.webp",
    alt: "Linkd POS register workflow",
    width: 1536,
    height: 1024,
    kind: "screen",
  },
  {
    name: "JewelLink",
    label: "Relationships",
    proof: "CRM / clienteling / training",
    image: "/assets/screenshots/jewellink-app.webp",
    alt: "JewelLink clienteling CRM dashboard",
    width: 3000,
    height: 2000,
    kind: "screen",
  },
  {
    name: "CountRetail",
    label: "Intelligence",
    proof: "Traffic / Vision AI / analytics",
    image: "/assets/screenshots/countretail-app.webp",
    alt: "CountRetail store analytics dashboard",
    width: 3000,
    height: 2000,
    kind: "screen",
  },
];

const faqItems = [
  {
    question: "How are Linkd, JewelLink, and CountRetail different?",
    answer:
      "Linkd is the POS and operations layer, JewelLink is the customer relationship and team workflow layer, and CountRetail is the traffic, analytics, and store intelligence layer.",
  },
  {
    question: "Does Linkd replace JewelLink or CountRetail?",
    answer:
      "No. Linkd is designed to stand on its own as the operational record while making JewelLink and CountRetail more useful with clean POS, inventory, and store operations data.",
  },
  {
    question: "Why should a jewelry store connect all three?",
    answer:
      "The connected stack lets owners compare what was sold, who was followed up with, what moved in inventory, and what happened in the store.",
  },
];

const socialImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Linkd jewelry retail ecosystem social preview",
};

const relatedRetailSystems = [
  {
    "@type": "SoftwareApplication",
    name: "Linkd",
    applicationCategory: "BusinessApplication",
    url: "https://linkd.com/",
    description:
      "Operational core for jewelry POS, inventory, services, accounts, audits, reporting, and integrations.",
  },
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
    "@type": "WebPage",
    name: "Linkd, JewelLink, and CountRetail Jewelry Retail Ecosystem",
    url: "https://linkd.com/ecosystem",
    description:
      "See how Linkd, JewelLink, and CountRetail work together as the POS operations layer, customer relationship layer, and retail intelligence layer for jewelry stores.",
    image: [
      "https://linkd.com/assets/screenshots/linkd-pos-checkout.webp",
      "https://linkd.com/assets/brand/jewellink-logo-main.webp",
      "https://linkd.com/assets/brand/countretail-logo-main.webp",
    ],
    about: relatedRetailSystems,
    mentions: relatedRetailSystems,
    mainEntity: {
      "@type": "ItemList",
      name: "Linkd, JewelLink, and CountRetail roles",
      itemListElement: ecosystemProofs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Thing",
          name: item.name,
          description: `${item.question} ${item.label}: ${item.proof}`,
        },
      })),
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Linkd",
      url: "https://linkd.com/",
    },
    potentialAction: {
      "@type": "ContactAction",
      target: "https://linkd.com/ecosystem#early-access",
      name: "Book a Linkd ecosystem demo",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Linkd",
        item: "https://linkd.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Ecosystem",
        item: "https://linkd.com/ecosystem",
      },
    ],
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

export const metadata = {
  title: "Linkd, JewelLink, and CountRetail Jewelry Retail Ecosystem",
  description:
    "Compare Linkd, JewelLink, and CountRetail: POS operations, CRM and clienteling, Vision AI traffic, analytics, inventory signals, and jewelry retail intelligence.",
  keywords: [
    "Linkd JewelLink CountRetail",
    "jewelry retail ecosystem",
    "jewelry POS CRM analytics",
    "JewelLink CRM",
    "CountRetail AI",
    "jewelry store intelligence",
    "luxury jewelry retail operations",
  ],
  alternates: {
    canonical: "/ecosystem",
  },
  openGraph: {
    title: "Linkd, JewelLink, and CountRetail Jewelry Retail Ecosystem",
    description:
      "See how the Linkd operational core connects with JewelLink CRM and CountRetail AI for modern jewelry retail.",
    url: "/ecosystem",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linkd, JewelLink, and CountRetail Jewelry Retail Ecosystem",
    description:
      "Compare the POS operations, customer relationship, and retail intelligence layers for jewelry stores.",
    images: [socialImage],
  },
};

export default function EcosystemPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="site-header">
        <Link className="brand-lockup" href="/" aria-label="Linkd home">
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
          <Link href="/">Home</Link>
          <Link href="/jewelry-pos">POS</Link>
          <Link href="/repairs">Repairs</Link>
          <Link href="/inventory">Inventory</Link>
          <Link href="/accounting">Finance</Link>
          <Link href="/multi-store">Multi-Store</Link>
          <Link href="/security">Security</Link>
          <Link aria-current="page" href="/ecosystem">Ecosystem</Link>
          <Link href="/integrations">Integrations</Link>
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

      <section className="ecosystem-hero">
        <div className="section-copy">
          <p className="eyebrow">Jewelry retail ecosystem</p>
          <h1>Linkd, JewelLink, and CountRetail each have a clear job.</h1>
          <p>
            Linkd keeps the operational record. JewelLink turns customer context
            into relationship workflows. CountRetail turns store signals into
            decisions.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="#early-access">
              Book a Demo
            </Link>
            <Link className="button button-secondary" href="/integrations">
              View Integrations
            </Link>
          </div>
        </div>
        <div
          className="ecosystem-hero-board"
          aria-label="Linkd, JewelLink, and CountRetail visual role map"
        >
          {ecosystemHeroCards.map((item) => (
            <article
              className={`ecosystem-hero-tile ecosystem-hero-tile-${item.name.toLowerCase()}`}
              key={item.name}
            >
              <div
                className={`ecosystem-hero-visual ecosystem-hero-visual-${item.kind}`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  unoptimized
                />
              </div>
              <div className="ecosystem-hero-role">
                <span>{item.label}</span>
                <strong>{item.name}</strong>
                <p>{item.proof}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-white ecosystem-compare-section">
        <div className="ecosystem-role-grid">
          {ecosystemRoles.map((item) => (
            <article className={`ecosystem-role-card ecosystem-role-card-${item.name.toLowerCase()}`} key={item.name}>
              <div className={`ecosystem-logo ecosystem-logo-${item.name.toLowerCase()}`}>
                <Image
                  src={item.logo}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  unoptimized
                />
              </div>
              <span>{item.role}</span>
              <h2>{item.name}</h2>
              <p>{item.proof}</p>
              <div className="chip-row" aria-label={`${item.name} examples`}>
                {item.examples.map((example) => (
                  <span key={example}>{example}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-light handoff-section">
        <div className="section-copy">
          <p className="eyebrow">How data moves</p>
          <h2>From daily operations to customer action to owner insight.</h2>
        </div>
        <div className="handoff-grid">
          {handoffSteps.map((step) => (
            <article key={step.label}>
              <span>{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-white landing-stack-section">
        <div className="section-copy">
          <p className="eyebrow">Simple positioning</p>
          <h2>One stack that agrees with itself.</h2>
        </div>
        <div className="integration-cloud integration-strip" aria-label="Ecosystem keywords">
          <span>POS operations</span>
          <span>CRM and clienteling</span>
          <span>Vision AI traffic</span>
          <span>Inventory signals</span>
          <span>Accounting handoff</span>
          <span>Owner reporting</span>
        </div>
      </section>

      <section className="section-white faq-section">
        <div className="section-copy">
          <p className="eyebrow">Quick answers</p>
          <h2>The three-layer jewelry retail stack.</h2>
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
            <h2>See the connected stack in one demo.</h2>
            <p>
              Tell us about your store. We will show how the three products
              work together.
            </p>
            <div className="release-signals">
              <span>POS operations</span>
              <span>JewelLink CRM</span>
              <span>CountRetail AI</span>
              <span>Connected stack</span>
            </div>
          </div>
          <InquiryForm />
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-top">
          <span className="footer-mark">Linkd</span>
          <p>The operations center for luxury jewelry stores.</p>
        </div>
        <div className="footer-columns">
          <nav aria-label="Platform">
            <strong>Platform</strong>
            <Link href="/jewelry-pos">Jewelry POS</Link>
            <Link href="/repairs">Repairs</Link>
            <Link href="/inventory">Inventory</Link>
            <Link href="/accounting">Finance</Link>
            <Link href="/multi-store">Multi-Store</Link>
            <Link href="/security">Security</Link>
          </nav>
          <nav aria-label="Ecosystem">
            <strong>Ecosystem</strong>
            <Link href="/ecosystem">The Family</Link>
            <Link href="/integrations">Integrations</Link>
            <a href="https://www.jewellink.com/" target="_blank" rel="noreferrer">JewelLink</a>
            <a href="https://www.countretail.com/" target="_blank" rel="noreferrer">CountRetail</a>
          </nav>
          <nav aria-label="Access">
            <strong>Access</strong>
            <Link href="/login">Login</Link>
            <Link href="#early-access">Book a Demo</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Linkd. All rights reserved.</p>
          <Link href="/">Home</Link>
        </div>
      </footer>
    </main>
  );
}
