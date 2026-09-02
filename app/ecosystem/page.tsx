import InquiryForm from "../components/InquiryForm";
import JewelHireBrand from "../components/JewelHireBrand";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import Image from "next/image";
import Link from "next/link";

const ecosystemRoles = [
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
    question: "What belongs to the JewelLink System?",
    answer:
      "The JewelLink System includes JewelLink for customer relationships, CountRetail for store analytics, and JewelHire for hiring and onboarding.",
  },
  {
    question: "How does Linkd relate to the JewelLink System?",
    answer:
      "Linkd is a separate POS and ERP platform. It can work on its own and can connect with JewelLink System products when shared store information helps.",
  },
  {
    question: "Do we need every JewelLink System product?",
    answer:
      "No. Start with JewelLink, CountRetail, or JewelHire based on the need in front of you, then add another when shared customer, store, or team information will help.",
  },
];

const socialImage = {
  url: "/og-linkd-v2.png",
  width: 1200,
  height: 630,
  alt: "JewelLink System for luxury jewelry retail",
};

const relatedRetailSystems = [
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
    name: "JewelLink System for Jewelry Retail",
    url: "https://linkd.com/ecosystem",
    description:
      "Explore the JewelLink System for CRM, store analytics, hiring, and onboarding in jewelry retail.",
    image: [
      "https://linkd.com/assets/brand/jewellink-logo-main.webp",
      "https://linkd.com/assets/brand/countretail-logo-main.webp",
    ],
    about: relatedRetailSystems,
    mentions: relatedRetailSystems,
    mainEntity: {
      "@type": "ItemList",
      name: "JewelLink System product roles",
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
      name: "Book a JewelLink System demo",
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
        name: "JewelLink System",
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
  title: "JewelLink System for Luxury Jewelry Retail",
  description:
    "Explore JewelLink CRM, CountRetail analytics, and JewelHire hiring software as the connected JewelLink System for jewelry retailers.",
  keywords: [
    "JewelLink CountRetail JewelHire",
    "JewelLink System",
    "jewelry CRM analytics hiring",
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
    title: "JewelLink System for Luxury Jewelry Retail",
    description:
      "Three jewelry-retail products for relationships, analytics, and hiring.",
    url: "/ecosystem",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "JewelLink System for Luxury Jewelry Retail",
    description:
      "Explore three jewelry-retail products for relationships, analytics, and hiring.",
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
          <p className="eyebrow">The JewelLink System</p>
          <h1>Relationships, intelligence, and people—connected.</h1>
          <p>
            JewelLink, CountRetail, and JewelHire each solve a distinct jewelry-
            retail need. Use one on its own or connect all three as the JewelLink
            System. Linkd remains a separate POS and ERP that can integrate when
            your store chooses it.
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
          aria-label="JewelLink System visual role map"
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
          <p className="eyebrow">How the JewelLink System works</p>
          <h2>Start with one need. Connect more when it helps.</h2>
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
        <div className="integration-cloud integration-strip" aria-label="JewelLink System keywords">
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
              <span>Optional Linkd connection</span>
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
