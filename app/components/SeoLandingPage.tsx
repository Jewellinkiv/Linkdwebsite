import type { SeoLandingPage as SeoLandingPageData } from "../seoLandingPages";
import InquiryForm from "./InquiryForm";
import Image from "next/image";
import Link from "next/link";

type SeoLandingPageProps = {
  page: SeoLandingPageData;
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/jewelry-pos", label: "POS", slug: "jewelry-pos" },
  { href: "/repairs", label: "Repairs", slug: "repairs" },
  { href: "/inventory", label: "Inventory", slug: "inventory" },
  { href: "/accounting", label: "Finance", slug: "accounting" },
  { href: "/multi-store", label: "Multi-Store", slug: "multi-store" },
  { href: "/security", label: "Security", slug: "security" },
  { href: "/ecosystem", label: "Ecosystem", slug: "ecosystem" },
  { href: "/integrations", label: "Integrations", slug: "integrations" },
];

const workflowLinkCards = [
  {
    slug: "jewelry-pos",
    href: "/jewelry-pos",
    label: "POS",
    title: "Checkout and services",
    copy: "Counter flow, tenders, layaway.",
  },
  {
    slug: "repairs",
    href: "/repairs",
    label: "Repairs",
    title: "Service intake",
    copy: "Repairs, appraisals, custom work.",
  },
  {
    slug: "inventory",
    href: "/inventory",
    label: "Inventory",
    title: "Serialized control",
    copy: "Items, transfers, RFID-ready events.",
  },
  {
    slug: "accounting",
    href: "/accounting",
    label: "Finance",
    title: "Accounts and handoff",
    copy: "Balances, deposits, accounting paths.",
  },
  {
    slug: "multi-store",
    href: "/multi-store",
    label: "Multi-Store",
    title: "Location operations",
    copy: "Transfers, roles, owner views.",
  },
  {
    slug: "security",
    href: "/security",
    label: "Security",
    title: "Permissions and audits",
    copy: "Approvals, logs, exception review.",
  },
  {
    slug: "integrations",
    href: "/integrations",
    label: "Integrations",
    title: "Connected stack",
    copy: "CRM, analytics, accounting, APIs.",
  },
];

type WorkflowLinkCard = (typeof workflowLinkCards)[number];

const relatedWorkflowMap: Record<string, string[]> = {
  "jewelry-pos": ["repairs", "inventory", "accounting"],
  repairs: ["jewelry-pos", "inventory", "integrations"],
  inventory: ["multi-store", "security", "integrations"],
  accounting: ["jewelry-pos", "integrations", "multi-store"],
  "multi-store": ["inventory", "security", "accounting"],
  security: ["inventory", "multi-store", "integrations"],
  integrations: ["jewelry-pos", "inventory", "accounting"],
};

const ecosystemFitCards = [
  {
    name: "Linkd",
    label: "Operational core",
    proof: "POS, inventory, accounts, audits",
    image: "",
    alt: "",
    width: 1536,
    height: 1024,
    kind: "screen",
  },
  {
    name: "JewelLink",
    label: "Relationship layer",
    proof: "CRM, clienteling, team follow-up",
    image: "/assets/brand/jewellink-logo-main.webp",
    alt: "JewelLink logo",
    width: 12500,
    height: 6250,
    kind: "logo",
  },
  {
    name: "CountRetail",
    label: "Intelligence layer",
    proof: "Traffic, Vision AI, owner insight",
    image: "/assets/brand/countretail-logo-main.webp",
    alt: "CountRetail logo",
    width: 3538,
    height: 504,
    kind: "logo",
  },
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

export default function SeoLandingPage({ page }: SeoLandingPageProps) {
  const pageUrl = `https://linkd.com/${page.slug}`;
  const fitCards = ecosystemFitCards.map((card) =>
    card.name === "Linkd"
      ? { ...card, image: page.image, alt: page.imageAlt }
      : card,
  );
  const pageImages = [
    `https://linkd.com${page.image}`,
    ...page.visualProofs.map((proof) => `https://linkd.com${proof.image}`),
  ];
  const pageFeatures = [
    ...page.proof,
    ...page.outcomes.map((outcome) => outcome.title),
    ...page.stackItems,
  ];
  const relatedWorkflowCards = (
    relatedWorkflowMap[page.slug] ??
    workflowLinkCards
      .map((card) => card.slug)
      .filter((slug) => slug !== page.slug)
      .slice(0, 3)
  )
    .map((slug) => workflowLinkCards.find((card) => card.slug === slug))
    .filter((card): card is WorkflowLinkCard => Boolean(card));
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.metaTitle,
      url: pageUrl,
      description: page.metaDescription,
      primaryImageOfPage: `https://linkd.com${page.image}`,
      image: pageImages,
      significantLink: relatedWorkflowCards.map((card) => `https://linkd.com${card.href}`),
      mentions: relatedRetailSystems,
      mainEntity: {
        "@type": "SoftwareApplication",
        name: `Linkd ${page.eyebrow}`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: pageUrl,
        description: page.metaDescription,
        image: pageImages[0],
        screenshot: pageImages,
        featureList: pageFeatures,
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
      potentialAction: {
        "@type": "ContactAction",
        target: `${pageUrl}#early-access`,
        name: `Book a ${page.metaTitle} demo`,
      },
      isPartOf: {
        "@type": "WebSite",
        name: "Linkd",
        url: "https://linkd.com/",
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
          name: page.metaTitle,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

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
          {navItems.map((item) => (
            <Link
              aria-current={item.slug === page.slug ? "page" : undefined}
              href={item.href}
              key={item.href}
            >
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

      <section className="landing-hero">
        <div className="landing-copy">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="#early-access">
              Book a Demo
            </Link>
            <Link className="button button-secondary" href="#product-screens">
              View Product Screens
            </Link>
          </div>
          <div className="landing-proof" aria-label={`${page.eyebrow} highlights`}>
            {page.proof.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="landing-stage">
          <Image
            src={page.image}
            alt={page.imageAlt}
            width={1536}
            height={1024}
            priority
            unoptimized
          />
        </div>
      </section>

      <section className="section-white landing-proof-rail-section" id="product-screens">
        <div className="section-copy">
          <p className="eyebrow">Screen proof</p>
          <h2>See the workflow before the paragraph.</h2>
        </div>
        <div className="landing-proof-rail">
          {page.visualProofs.map((proof, index) => (
            <article className="landing-proof-tile" key={proof.title}>
              <Image
                src={proof.image}
                alt={proof.alt}
                width={1536}
                height={1024}
                unoptimized
              />
              <div>
                <span>{String(index + 1).padStart(2, "0")} / {proof.label}</span>
                <h3>{proof.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-light landing-outcomes-section">
        <div className="section-copy">
          <p className="eyebrow">Workflow outcomes</p>
          <h2>Less explanation. More operational proof.</h2>
        </div>
        <div className="landing-outcomes">
          {page.outcomes.map((outcome) => (
            <article key={outcome.label}>
              <span>{outcome.label}</span>
              <h3>{outcome.title}</h3>
              <p>{outcome.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-white landing-fit-section">
        <div className="section-copy">
          <p className="eyebrow">Where Linkd fits</p>
          <h2>Operations first. Relationships and intelligence next.</h2>
        </div>
        <div
          className="landing-fit-board"
          aria-label="Linkd, JewelLink, and CountRetail roles"
        >
          {fitCards.map((card) => (
            <article
              className={`landing-fit-card landing-fit-card-${card.name.toLowerCase()}`}
              key={card.name}
            >
              <div className={`landing-fit-visual landing-fit-visual-${card.kind}`}>
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={card.width}
                  height={card.height}
                  unoptimized
                />
              </div>
              <span>{card.label}</span>
              <h3>{card.name}</h3>
              <p>{card.proof}</p>
            </article>
          ))}
        </div>
        <div className="integration-cloud integration-strip" aria-label={`${page.eyebrow} stack`}>
          {page.stackItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="section-actions">
          <Link className="button button-secondary" href="/ecosystem">
            Compare the Stack
          </Link>
        </div>
      </section>

      <section className="section-light related-workflow-section">
        <div className="section-copy">
          <p className="eyebrow">Related workflows</p>
          <h2>Jump to the next operating question.</h2>
        </div>
        <div
          className="related-workflow-grid"
          aria-label={`${page.eyebrow} related Linkd workflows`}
        >
          {relatedWorkflowCards.map((card) => (
            <Link className="related-workflow-card" href={card.href} key={card.slug}>
              <span>{card.label}</span>
              <strong>{card.title}</strong>
              <p>{card.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-white faq-section">
        <div className="section-copy">
          <p className="eyebrow">Quick answers</p>
          <h2>What jewelers ask before changing systems.</h2>
        </div>
        <div className="faq-grid compact-faq-grid">
          {page.faq.map((item) => (
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
            <h2>See how Linkd fits your store.</h2>
            <p>
              Tell us about your store. We will show you the counter, the
              case, and the back office.
            </p>
            <div className="release-signals">
              {page.proof.map((signal) => (
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
          <p>
            Jewelry POS and operations for luxury retail teams.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/jewelry-pos">Jewelry POS</Link>
          <Link href="/inventory">Inventory</Link>
          <Link href="/security">Security</Link>
          <Link href="/ecosystem">Ecosystem</Link>
          <Link href="/integrations">Integrations</Link>
          <Link href="#early-access">Book a Demo</Link>
          <Link href="/login">Login</Link>
        </nav>
      </footer>
    </main>
  );
}
