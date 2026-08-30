import InquiryForm from "../components/InquiryForm";
import JewelHireBrand from "../components/JewelHireBrand";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import Image from "next/image";
import Link from "next/link";

const ecosystemRoles = [
  {
    name: "Linkd",
    role: "POS and store operations",
    logo: "/assets/brand/linkd-logo-main.webp",
    alt: "Linkd",
    width: 1200,
    height: 721,
    proof: "Checkout, payments, balances, repairs, inventory, reporting, and accounting preparation.",
    examples: ["Payments", "Receivables", "Services", "Inventory"],
    href: null,
  },
  {
    name: "JewelLink",
    role: "Customer relationships",
    logo: "/assets/brand/jewellink-logo-main.webp",
    alt: "JewelLink",
    width: 1600,
    height: 800,
    proof: "Customer profiles, clienteling, texting, bridal follow-up, training, and assisted selling.",
    examples: ["Clienteling", "Training", "Texting", "Follow-up"],
    href: "https://www.jewellink.com/",
  },
  {
    name: "CountRetail",
    role: "Store analytics",
    logo: "/assets/brand/countretail-logo-main.webp",
    alt: "CountRetail",
    width: 1400,
    height: 199,
    proof: "Traffic, marketing attribution, inventory analytics, and owner reporting.",
    examples: ["Traffic", "Vision AI", "Inventory signals", "Owner cockpit"],
    href: "https://www.countretail.com/",
  },
  {
    name: "JewelHire",
    role: "Hiring and onboarding",
    logo: null,
    alt: "",
    width: 1,
    height: 1,
    proof: "Recruiting, assessment, hiring, and onboarding for jewelry retail teams.",
    examples: ["Recruiting", "Talent", "Jewelry roles", "Team growth"],
    href: "https://jewelhire.com/",
  },
];

const handoffSteps = [
  {
    label: "POS",
    title: "Linkd runs the daily store work",
    copy: "Associates complete sales, payments, repairs, inventory tasks, and account work in the POS and back office.",
  },
  {
    label: "CRM",
    title: "JewelLink helps associates follow up",
    copy: "Customer history supports clienteling, texting, bridal follow-up, training, and the next conversation.",
  },
  {
    label: "Analytics",
    title: "CountRetail helps owners read the store",
    copy: "Traffic, camera, marketing, inventory, and sales information support store-performance analysis.",
  },
  {
    label: "Hiring",
    title: "JewelHire helps build the team",
    copy: "Jewelry-specific recruiting, assessment, hiring, and onboarding support each role in the store.",
  },
];

const ecosystemProofs = [
  {
    name: "Linkd",
    label: "POS and store management",
    question: "What records the sale and daily store work?",
    proof: "Sales, items, services, balances, permissions, and reports.",
    image: "/assets/screenshots/linkd-pos-cart-demo-card-v2.webp",
    alt: "Linkd POS showing Val Jones, jewelry items, a service line, and payment totals",
    width: 1800,
    height: 1200,
    kind: "screenshot",
  },
  {
    name: "JewelLink",
    label: "CRM and clienteling",
    question: "Who needs follow-up?",
    proof: "CRM, clienteling, texting, training, bridal workflows.",
    image: "/assets/brand/jewellink-logo-main.webp",
    alt: "JewelLink logo",
    width: 1600,
    height: 800,
    kind: "logo",
  },
  {
    name: "CountRetail",
    label: "Store analytics",
    question: "How are traffic, sales, and inventory changing?",
    proof: "Traffic, marketing, Vision AI, aging, and owner reports.",
    image: "/assets/brand/countretail-logo-main.webp",
    alt: "CountRetail logo",
    width: 1400,
    height: 199,
    kind: "logo",
  },
  {
    name: "JewelHire",
    label: "Hiring and onboarding",
    question: "Who is moving through the hiring pipeline?",
    proof: "Recruiting, assessment, hiring, and onboarding.",
    image: "/assets/screenshots/jewelhire-recruiting-pipeline.webp",
    alt: "JewelHire recruiting pipeline for jewelry stores",
    width: 1271,
    height: 715,
    kind: "screenshot",
  },
];

const ecosystemHeroCards = [
  {
    name: "Linkd",
    label: "POS + store management",
    proof: "POS / inventory / accounts",
    image: "/assets/screenshots/linkd-pos-cart-demo-card-v2.webp",
    alt: "Linkd populated jewelry POS cart with demo customer and payment totals",
    width: 1800,
    height: 1200,
    kind: "screen",
  },
  {
    name: "JewelLink",
    label: "CRM + clienteling",
    proof: "CRM / clienteling / training",
    image: "/assets/screenshots/jewellink-app.webp",
    alt: "JewelLink clienteling CRM dashboard",
    width: 1800,
    height: 1200,
    kind: "screen",
  },
  {
    name: "CountRetail",
    label: "Store analytics",
    proof: "Traffic / Vision AI / analytics",
    image: "/assets/screenshots/countretail-app.webp",
    alt: "CountRetail store analytics dashboard",
    width: 1800,
    height: 1200,
    kind: "screen",
  },
  {
    name: "JewelHire",
    label: "Hiring + onboarding",
    proof: "Hiring / assessment / onboarding",
    image: "/assets/screenshots/jewelhire-recruiting-pipeline.webp",
    alt: "JewelHire recruiting pipeline for jewelry stores",
    width: 1271,
    height: 715,
    kind: "screen",
  },
];

const faqItems = [
  {
    question: "How are the four Linkd Ecosystem products different?",
    answer:
      "Linkd runs POS and store operations. JewelLink supports customer relationships, CountRetail provides store analytics, and JewelHire supports hiring and onboarding.",
  },
  {
    question: "Does Linkd replace the other ecosystem products?",
    answer:
      "No. Linkd works on its own as the POS and store-management system. The other products are separate and can be added when your store needs them.",
  },
  {
    question: "Do we need all four products?",
    answer:
      "No. Start with the product that solves today's problem. Connect additional products when shared customer, store, or team information will help.",
  },
];

const socialImage = {
  url: "/og-linkd-v2.png",
  width: 1200,
  height: 630,
  alt: "Linkd Ecosystem for luxury jewelry retail",
};

const relatedRetailSystems = [
  {
    "@type": "SoftwareApplication",
    name: "Linkd",
    applicationCategory: "BusinessApplication",
    url: "https://linkd.com/",
    description:
      "Jewelry POS and store-management software for sales, inventory, services, accounts, audits, and reporting.",
  },
  {
    "@type": "SoftwareApplication",
    name: "JewelHire",
    applicationCategory: "BusinessApplication",
    url: "https://jewelhire.com/",
    description:
      "Hiring, assessment, and onboarding software built for jewelry retail teams.",
  },
  {
    "@type": "SoftwareApplication",
    name: "JewelLink",
    applicationCategory: "CRM",
    url: "https://www.jewellink.com/",
    description:
      "CRM software for clienteling, texting, training, follow-up, and team workflows in jewelry retail.",
  },
  {
    "@type": "SoftwareApplication",
    name: "CountRetail",
    applicationCategory: "BusinessIntelligenceApplication",
    url: "https://www.countretail.com/",
    description:
      "Store analytics software for traffic, marketing, inventory signals, and owner reporting.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Linkd, JewelLink, CountRetail, and JewelHire Jewelry Retail Ecosystem",
    url: "https://linkd.com/ecosystem",
    description:
      "Compare Linkd store management, JewelLink CRM, CountRetail analytics, and JewelHire hiring software for jewelry retailers.",
    image: [
      "https://linkd.com/assets/screenshots/linkd-pos-cart-demo-card-v2.webp",
      "https://linkd.com/assets/brand/jewellink-logo-main.webp",
      "https://linkd.com/assets/brand/countretail-logo-main.webp",
    ],
    about: relatedRetailSystems,
    mentions: relatedRetailSystems,
    mainEntity: {
      "@type": "ItemList",
      name: "Linkd Ecosystem product roles",
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
  title: "Linkd Ecosystem for Luxury Jewelry Retail",
  description:
    "Compare Linkd store management, JewelLink CRM, CountRetail analytics, and JewelHire hiring software for jewelry retailers.",
  keywords: [
    "Linkd JewelLink CountRetail",
    "jewelry retail ecosystem",
    "jewelry POS CRM analytics",
    "JewelLink CRM",
    "CountRetail AI",
    "JewelHire",
    "jewelry store intelligence",
    "luxury jewelry retail operations",
  ],
  alternates: {
    canonical: "/ecosystem",
  },
  openGraph: {
    title: "Linkd Ecosystem for Luxury Jewelry Retail",
    description:
      "Four jewelry-retail products for POS, CRM, analytics, and hiring.",
    url: "/ecosystem",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linkd Ecosystem for Luxury Jewelry Retail",
    description:
      "Compare four jewelry-retail products for POS, CRM, analytics, and hiring.",
    images: [socialImage],
  },
};

export default function EcosystemPage() {
  return (
    <main className="premier-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader current="ecosystem" />

      <section className="ecosystem-hero">
        <div className="section-copy">
          <p className="eyebrow">Four products for jewelry retail</p>
          <h1>Four systems. One jewelry business.</h1>
          <p>
            Linkd is the POS and store-management system. JewelLink,
            CountRetail, and JewelHire are separate products. Each works on its
            own, and each can connect when your store needs it.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="#early-access">
              Book a Demo
            </Link>
            <Link className="button button-secondary" href="/integrations">
              See How Products Connect
            </Link>
          </div>
        </div>
        <div
          className="ecosystem-hero-board"
          aria-label="Linkd Ecosystem visual role map"
        >
          {ecosystemHeroCards.map((item) => (
            <article
              className={`ecosystem-hero-tile ecosystem-hero-tile-${item.name.toLowerCase()}`}
              key={item.name}
            >
              <div
                className={`ecosystem-hero-visual ecosystem-hero-visual-${item.kind}`}
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 860px) 92px, 118px"
                    unoptimized
                  />
                ) : (
                  <JewelHireBrand />
                )}
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
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 860px) 56vw, 20vw"
                    unoptimized
                  />
                ) : (
                  <JewelHireBrand />
                )}
              </div>
              <span>{item.role}</span>
              <h2>{item.name}</h2>
              <p>{item.proof}</p>
              <div className="chip-row" aria-label={`${item.name} examples`}>
                {item.examples.map((example) => (
                  <span key={example}>{example}</span>
                ))}
              </div>
              {item.href ? (
                <a
                  className="ecosystem-role-link"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit {item.name} <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section-light handoff-section">
        <div className="section-copy">
          <p className="eyebrow">How the products differ</p>
          <h2>Start with what you need. Connect more when it helps.</h2>
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
          <p className="eyebrow">At a glance</p>
          <h2>Connect only what your store needs.</h2>
        </div>
        <div className="integration-cloud integration-strip" aria-label="Ecosystem keywords">
          <span>POS operations</span>
          <span>CRM and clienteling</span>
          <span>Vision AI traffic</span>
          <span>Inventory signals</span>
          <span>Accounting handoff</span>
          <span>Owner reporting</span>
          <span>Jewelry recruiting</span>
        </div>
      </section>

      <section className="section-white faq-section">
        <div className="section-copy">
          <p className="eyebrow">Quick answers</p>
          <h2>What to know before choosing a product.</h2>
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
            <h2>See the products your store is considering.</h2>
            <p>
              Tell us what your store needs. We will show the relevant
              products and explain which connections are available.
            </p>
            <div className="release-signals">
              <span>POS operations</span>
              <span>JewelLink CRM</span>
              <span>CountRetail AI</span>
              <span>JewelHire talent</span>
              <span>Optional connections</span>
            </div>
          </div>
          <InquiryForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
