import InquiryForm from "../components/InquiryForm";
import JewelHireBrand from "../components/JewelHireBrand";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import Image from "next/image";
import Link from "next/link";

const ecosystemRoles = [
  {
    name: "Linkd",
    role: "Operational core",
    logo: "/assets/brand/linkd-logo-main.webp",
    alt: "Linkd",
    width: 1200,
    height: 721,
    proof: "Payments, receivables, inventory, services, permissions, reporting, and accounting handoff.",
    examples: ["Payments", "Receivables", "Services", "Inventory"],
    href: null,
  },
  {
    name: "JewelLink",
    role: "Relationship layer",
    logo: "/assets/brand/jewellink-logo-main.webp",
    alt: "JewelLink",
    width: 1600,
    height: 800,
    proof: "CRM, clienteling, texting, training, bridal workflows, follow-up, and AI-assisted selling.",
    examples: ["Clienteling", "Training", "Texting", "Follow-up"],
    href: "https://www.jewellink.com/",
  },
  {
    name: "CountRetail",
    role: "Intelligence layer",
    logo: "/assets/brand/countretail-logo-main.webp",
    alt: "CountRetail",
    width: 1400,
    height: 199,
    proof: "Vision AI traffic, marketing attribution, predictive aging, inventory signals, and owner decisions.",
    examples: ["Traffic", "Vision AI", "Inventory signals", "Owner cockpit"],
    href: "https://www.countretail.com/",
  },
  {
    name: "JewelHire",
    role: "People layer",
    logo: null,
    alt: "",
    width: 1,
    height: 1,
    proof: "Recruiting and talent built around the realities of jewelry retail.",
    examples: ["Recruiting", "Talent", "Jewelry roles", "Team growth"],
    href: "https://jewelhire.com/",
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
  {
    label: "4",
    title: "JewelHire builds the team",
    copy: "Jewelry-specific recruiting and talent support the people who carry every other workflow forward.",
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
    width: 1800,
    height: 1200,
    kind: "screenshot",
  },
  {
    name: "JewelLink",
    label: "Relationships",
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
    label: "Intelligence",
    question: "What is the store telling us?",
    proof: "Traffic, marketing, Vision AI, aging, owner insight.",
    image: "/assets/brand/countretail-logo-main.webp",
    alt: "CountRetail logo",
    width: 1400,
    height: 199,
    kind: "logo",
  },
  {
    name: "JewelHire",
    label: "People",
    question: "Who will carry the store forward?",
    proof: "Hiring, assessment, onboarding, and team growth.",
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
    label: "Operations",
    proof: "POS / inventory / accounts",
    image: "/assets/screenshots/linkd-pos-checkout.webp",
    alt: "Linkd POS register workflow",
    width: 1800,
    height: 1200,
    kind: "screen",
  },
  {
    name: "JewelLink",
    label: "Relationships",
    proof: "CRM / clienteling / training",
    image: "/assets/screenshots/jewellink-app.webp",
    alt: "JewelLink clienteling CRM dashboard",
    width: 1800,
    height: 1200,
    kind: "screen",
  },
  {
    name: "CountRetail",
    label: "Intelligence",
    proof: "Traffic / Vision AI / analytics",
    image: "/assets/screenshots/countretail-app.webp",
    alt: "CountRetail store analytics dashboard",
    width: 1800,
    height: 1200,
    kind: "screen",
  },
  {
    name: "JewelHire",
    label: "People",
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
      "Linkd runs operations, JewelLink grows customer relationships, CountRetail turns store signals into intelligence, and JewelHire supports recruiting and talent.",
  },
  {
    question: "Does Linkd replace the other ecosystem products?",
    answer:
      "No. Linkd stands on its own as the operational record while the other products each solve a distinct relationship, intelligence, or people need.",
  },
  {
    question: "Why connect the full ecosystem?",
    answer:
      "The connected ecosystem gives operators a clearer view of what happened, who needs attention, what the store is signaling, and where the team needs to grow.",
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
      "Operational core for jewelry POS, inventory, services, accounts, audits, reporting, and integrations.",
  },
  {
    "@type": "SoftwareApplication",
    name: "JewelHire",
    applicationCategory: "BusinessApplication",
    url: "https://jewelhire.com/",
    description:
      "People layer for jewelry retail hiring, assessment, onboarding, and talent.",
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
    name: "Linkd, JewelLink, CountRetail, and JewelHire Jewelry Retail Ecosystem",
    url: "https://linkd.com/ecosystem",
    description:
      "See how Linkd, JewelLink, CountRetail, and JewelHire work together across operations, relationships, intelligence, and people for jewelry retailers.",
    image: [
      "https://linkd.com/assets/screenshots/linkd-pos-checkout.webp",
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
    "Compare Linkd, JewelLink, CountRetail, and JewelHire across store operations, CRM and clienteling, retail intelligence, recruiting, and talent.",
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
      "Four clear products for operations, relationships, intelligence, and people.",
    url: "/ecosystem",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linkd Ecosystem for Luxury Jewelry Retail",
    description:
      "Compare the four connected roles in the Linkd Ecosystem.",
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
          <p className="eyebrow">Jewelry retail ecosystem</p>
          <h1>Four systems. One jewelry business.</h1>
          <p>
            Linkd keeps the operational record. JewelLink turns customer context
            into relationship workflows. CountRetail turns store signals into
            decisions. JewelHire helps build the team.
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
          <p className="eyebrow">How the ecosystem works</p>
          <h2>Every product has one clear job—and one shared direction.</h2>
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
          <span>Jewelry recruiting</span>
        </div>
      </section>

      <section className="section-white faq-section">
        <div className="section-copy">
          <p className="eyebrow">Quick answers</p>
          <h2>Four clear jobs. One connected business.</h2>
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
              Tell us about your store. We will show how the four products
              work together.
            </p>
            <div className="release-signals">
              <span>POS operations</span>
              <span>JewelLink CRM</span>
              <span>CountRetail AI</span>
              <span>JewelHire talent</span>
              <span>Connected stack</span>
            </div>
          </div>
          <InquiryForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
