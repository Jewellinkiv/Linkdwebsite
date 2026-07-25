import type { Metadata } from "next";

export type SeoLandingPage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  proof: string[];
  visualProofs: {
    label: string;
    title: string;
    image: string;
    alt: string;
  }[];
  outcomes: {
    label: string;
    title: string;
    copy: string;
  }[];
  stackTitle: string;
  stackCopy: string;
  stackItems: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

export const seoLandingPages = {
  jewelryPos: {
    slug: "jewelry-pos",
    eyebrow: "Jewelry POS software",
    title: "POS built around the way jewelers actually sell.",
    description:
      "Linkd connects checkout, services, layaway, account balances, tender controls, and customer context in one counter workflow.",
    image: "/assets/screenshots/linkd-pos-register-devices.webp",
    imageAlt: "Linkd jewelry POS register on a MacBook screen",
    proof: ["Checkout", "Repair intake", "Layaway", "Tender controls"],
    visualProofs: [
      {
        label: "Register",
        title: "Checkout and service intake",
        image: "/assets/screenshots/linkd-pos-register-devices.webp",
        alt: "Linkd jewelry POS register workflow",
      },
      {
        label: "Customer",
        title: "POS context beside the relationship",
        image: "/assets/screenshots/linkd-customers-crm-devices.webp",
        alt: "Linkd customer context and CRM-ready record",
      },
      {
        label: "Review",
        title: "Tender, sales, and owner reporting",
        image: "/assets/screenshots/linkd-reports-home-devices.webp",
        alt: "Linkd reports dashboard for jewelry store operators",
      },
    ],
    outcomes: [
      {
        label: "Sell",
        title: "Counter checkout",
        copy: "Find clients, add items, attach services, park sales, and finish tender from the same register view.",
      },
      {
        label: "Service",
        title: "Repairs and appraisals",
        copy: "Bring repairs, appraisals, custom work, and special orders closer to the sale instead of sending staff to separate tools.",
      },
      {
        label: "Account",
        title: "Layaway and balances",
        copy: "Support deposits, layaway schedules, house accounts, interest rules, and customer balances without spreadsheet drift.",
      },
    ],
    stackTitle: "Designed to feed the rest of the store.",
    stackCopy:
      "Clean POS activity becomes useful context for JewelLink clienteling, CountRetail analytics, accounting, and owner reporting.",
    stackItems: ["JewelLink CRM", "CountRetail AI", "QuickBooks", "Xero", "Striven", "Open API"],
    faq: [
      {
        question: "Is Linkd a jewelry POS?",
        answer:
          "Yes. Linkd is being built as a luxury jewelry POS and store operations platform for checkout, services, inventory, accounts, and reporting.",
      },
      {
        question: "Can Linkd support layaway and house accounts?",
        answer:
          "Linkd is designed around jewelry workflows that include layaway schedules, deposits, customer balances, house accounts, and accounting handoff.",
      },
    ],
    metaTitle: "Jewelry POS Software for Luxury Retailers",
    metaDescription:
      "Linkd jewelry POS software connects checkout, repairs, layaway, house accounts, tender controls, customer context, reporting, and accounting handoff.",
    keywords: [
      "jewelry POS software",
      "luxury jewelry point of sale",
      "jewelry store checkout software",
      "jewelry repair POS",
      "jewelry layaway POS",
      "house accounts POS",
    ],
  },
  repairs: {
    slug: "repairs",
    eyebrow: "Jewelry repair intake",
    title: "Repairs, appraisals, and services connected to the sale.",
    description:
      "Linkd keeps repair intake, service work, appraisals, custom jobs, deposits, customer context, and POS history in the same operational workspace.",
    image: "/assets/screenshots/linkd-pos-register-devices.webp",
    imageAlt: "Linkd jewelry repair intake and POS service workflow on a MacBook screen",
    proof: ["Repair intake", "Appraisals", "Service history", "Customer context"],
    visualProofs: [
      {
        label: "Intake",
        title: "Service work beside checkout",
        image: "/assets/screenshots/linkd-pos-register-devices.webp",
        alt: "Linkd POS register with jewelry service intake context",
      },
      {
        label: "Customer",
        title: "Repair history tied to the relationship",
        image: "/assets/screenshots/linkd-customers-crm-devices.webp",
        alt: "Linkd customer record with repair and service history",
      },
      {
        label: "Review",
        title: "Service reporting owners can scan",
        image: "/assets/screenshots/linkd-reports-home-devices.webp",
        alt: "Linkd reports dashboard for jewelry service review",
      },
    ],
    outcomes: [
      {
        label: "Capture",
        title: "Counter repair intake",
        copy: "Start repairs, appraisals, custom work, and service jobs from the same counter workflow associates already use.",
      },
      {
        label: "Track",
        title: "Service history",
        copy: "Keep repair status, customer context, deposits, item references, and notes close to the operational record.",
      },
      {
        label: "Follow up",
        title: "CRM-ready service context",
        copy: "Make service activity useful for JewelLink follow-up, clienteling, reminders, and team workflows.",
      },
    ],
    stackTitle: "Service work should not live outside the store record.",
    stackCopy:
      "When repair and appraisal activity stays close to POS, inventory, and customer context, associates and managers can see the full relationship.",
    stackItems: ["Repair intake", "Appraisals", "Custom work", "Customer history", "JewelLink CRM", "Owner reporting", "Deposits", "Open API"],
    faq: [
      {
        question: "Can Linkd support jewelry repair intake?",
        answer:
          "Linkd is designed to keep repair intake, appraisals, custom work, deposits, notes, status, and customer context close to the POS workflow.",
      },
      {
        question: "How can repair history connect to CRM?",
        answer:
          "Service activity can become useful customer context for JewelLink clienteling, reminders, follow-up, and associate workflows.",
      },
    ],
    metaTitle: "Jewelry Repair Intake, Appraisals, Services, and POS History",
    metaDescription:
      "Linkd supports jewelry repair intake, appraisals, services, custom work, deposits, customer history, POS context, JewelLink CRM readiness, and owner reporting.",
    keywords: [
      "jewelry repair intake software",
      "jewelry appraisal intake",
      "jewelry service workflow",
      "repair history POS",
      "jewelry custom work software",
      "service follow-up CRM",
    ],
  },
  inventory: {
    slug: "inventory",
    eyebrow: "Jewelry inventory management",
    title: "Inventory control from case to vault.",
    description:
      "Track serialized items, receiving, transfers, aging, vendor context, and RFID-ready inventory events in the same operational record.",
    image: "/assets/screenshots/linkd-inventory-search-devices.webp",
    imageAlt: "Linkd jewelry inventory search on a MacBook screen",
    proof: ["Serialized items", "Transfers", "Aging views", "RFID-ready events"],
    visualProofs: [
      {
        label: "Search",
        title: "Serialized inventory lookup",
        image: "/assets/screenshots/linkd-inventory-search-devices.webp",
        alt: "Linkd serialized jewelry inventory search workflow",
      },
      {
        label: "Account",
        title: "Customer history tied to items",
        image: "/assets/screenshots/linkd-customers-crm-devices.webp",
        alt: "Linkd customer history connected to store operations",
      },
      {
        label: "Report",
        title: "Aging and exception review",
        image: "/assets/screenshots/linkd-reports-home-devices.webp",
        alt: "Linkd reporting views for jewelry inventory review",
      },
    ],
    outcomes: [
      {
        label: "Track",
        title: "Serialized item records",
        copy: "Give every item a searchable operational record with location, movement, vendor, and status context.",
      },
      {
        label: "Move",
        title: "Receiving and transfers",
        copy: "Control receiving, multi-store transfers, vault movement, and handoff history with less manual reconciliation.",
      },
      {
        label: "Review",
        title: "Aging and exceptions",
        copy: "Surface aging pressure, movement gaps, and exceptions before they turn into reporting or security problems.",
      },
    ],
    stackTitle: "Inventory data ready for intelligence.",
    stackCopy:
      "When Linkd keeps item movement clean, CountRetail can compare inventory pressure with traffic, demand, and store performance.",
    stackItems: ["RFID readiness", "CountRetail AI", "Vendor context", "Multi-store movement", "Owner reporting", "Open API"],
    faq: [
      {
        question: "Does Linkd support serialized jewelry inventory?",
        answer:
          "Linkd is designed for serialized jewelry inventory, including item lookup, movement history, transfers, receiving, aging, and vendor context.",
      },
      {
        question: "How does Linkd connect inventory with security?",
        answer:
          "Linkd can align inventory movement, employee permissions, register actions, and CountRetail camera context for reviewable exception workflows.",
      },
    ],
    metaTitle: "Jewelry Inventory Management and RFID-Ready Operations",
    metaDescription:
      "Linkd jewelry inventory management supports serialized items, transfers, receiving, aging, RFID-ready events, vendor context, and CountRetail analytics.",
    keywords: [
      "jewelry inventory management",
      "serialized jewelry inventory",
      "RFID jewelry inventory",
      "jewelry store transfers",
      "jewelry inventory aging",
      "multi-store inventory movement",
    ],
  },
  integrations: {
    slug: "integrations",
    eyebrow: "Jewelry retail integrations",
    title: "Connect POS, CRM, analytics, accounting, and e-commerce.",
    description:
      "Linkd is the operational hub that can feed JewelLink CRM, CountRetail AI, accounting, tax, e-commerce, RFID, and custom APIs.",
    image: "/assets/screenshots/linkd-settings-integrations-devices.webp",
    imageAlt: "Linkd integrations settings on a MacBook screen",
    proof: ["JewelLink CRM", "CountRetail AI", "Accounting", "Open API"],
    visualProofs: [
      {
        label: "Status",
        title: "Integration health at a glance",
        image: "/assets/screenshots/linkd-settings-integrations-devices.webp",
        alt: "Linkd integration settings and provider status workflow",
      },
      {
        label: "Source",
        title: "POS activity stays the record",
        image: "/assets/screenshots/linkd-pos-register-devices.webp",
        alt: "Linkd POS register as the operational source of truth",
      },
      {
        label: "Context",
        title: "CRM-ready customer activity",
        image: "/assets/screenshots/linkd-customers-crm-devices.webp",
        alt: "Linkd customer activity ready for CRM workflows",
      },
    ],
    outcomes: [
      {
        label: "CRM",
        title: "JewelLink-ready context",
        copy: "Send useful POS, service, account, and customer activity into clienteling and follow-up workflows.",
      },
      {
        label: "Analytics",
        title: "CountRetail-ready signals",
        copy: "Make traffic, marketing, inventory pressure, and owner reporting more useful with cleaner operational data.",
      },
      {
        label: "Back office",
        title: "Accounting and commerce paths",
        copy: "Prepare handoff paths for QuickBooks, Xero, Striven, Shopify, Avalara, documents, and custom systems.",
      },
    ],
    stackTitle: "A connected stack without hiding the source of truth.",
    stackCopy:
      "Linkd should remain the daily operational record while partner systems activate customer, analytics, and back-office workflows.",
    stackItems: ["JewelLink", "CountRetail", "TrackTech RFID", "QuickBooks", "Xero", "Shopify", "Avalara", "Open API"],
    faq: [
      {
        question: "Does Linkd replace JewelLink or CountRetail?",
        answer:
          "No. Linkd is the POS and operations layer. JewelLink handles CRM and clienteling workflows, while CountRetail handles traffic, analytics, and store intelligence.",
      },
      {
        question: "Can Linkd connect to accounting and e-commerce?",
        answer:
          "Linkd is being positioned for accounting, tax, e-commerce, document, RFID, and custom API integrations, including QuickBooks, Xero, Striven, Shopify, and Avalara paths.",
      },
    ],
    metaTitle: "Jewelry POS Integrations for CRM, Analytics, Accounting, and E-Commerce",
    metaDescription:
      "Linkd connects jewelry POS operations with JewelLink CRM, CountRetail AI, QuickBooks, Xero, Striven, Shopify, Avalara, RFID, and open APIs.",
    keywords: [
      "jewelry POS integrations",
      "JewelLink CRM integration",
      "CountRetail AI integration",
      "QuickBooks jewelry POS",
      "Shopify jewelry POS integration",
      "jewelry retail API",
    ],
  },
  accounting: {
    slug: "accounting",
    eyebrow: "Jewelry store finance",
    title: "House accounts, layaway, and accounting handoff without drift.",
    description:
      "Linkd brings deposits, balances, layaway schedules, house accounts, tender activity, and accounting paths closer to the POS record.",
    image: "/assets/screenshots/linkd-reports-home-devices.webp",
    imageAlt: "Linkd finance and reporting views on a MacBook screen",
    proof: ["House accounts", "Layaway", "Tender review", "Accounting handoff"],
    visualProofs: [
      {
        label: "Register",
        title: "Deposits and tender context",
        image: "/assets/screenshots/linkd-pos-register-devices.webp",
        alt: "Linkd POS register with tender and sale context",
      },
      {
        label: "Customer",
        title: "Balances beside the customer record",
        image: "/assets/screenshots/linkd-customers-crm-devices.webp",
        alt: "Linkd customer record with operational account context",
      },
      {
        label: "Report",
        title: "Accounting-ready review",
        image: "/assets/screenshots/linkd-reports-home-devices.webp",
        alt: "Linkd reporting dashboard for finance review",
      },
    ],
    outcomes: [
      {
        label: "Account",
        title: "House account control",
        copy: "Track balances, account aging, customer context, and finance status without relying on disconnected spreadsheets.",
      },
      {
        label: "Schedule",
        title: "Layaway and deposits",
        copy: "Keep layaway schedules, deposits, split tenders, and payment activity tied to the sale and customer.",
      },
      {
        label: "Handoff",
        title: "Cleaner accounting paths",
        copy: "Prepare reviewable activity for QuickBooks, Xero, Striven, tax workflows, and owner reporting.",
      },
    ],
    stackTitle: "Finance works better when POS is the record.",
    stackCopy:
      "Linkd keeps store finance activity close to customer, inventory, and tender context so reporting and accounting handoff stay easier to trust.",
    stackItems: ["House accounts", "Layaway schedules", "Tender reporting", "QuickBooks", "Xero", "Striven", "Avalara", "Owner reporting"],
    faq: [
      {
        question: "Can Linkd support jewelry store house accounts?",
        answer:
          "Linkd is designed for jewelry store finance workflows that include customer balances, account aging, house accounts, specialty financing, and reporting review.",
      },
      {
        question: "How does Linkd help with accounting handoff?",
        answer:
          "Linkd keeps POS, tender, customer, layaway, and account activity closer together so accounting exports and review paths can be cleaner.",
      },
    ],
    metaTitle: "Jewelry Store House Accounts, Layaway, and Accounting Handoff",
    metaDescription:
      "Linkd supports jewelry store finance workflows including house accounts, layaway schedules, deposits, tender review, customer balances, QuickBooks, Xero, Striven, and accounting handoff.",
    keywords: [
      "jewelry store accounting",
      "jewelry house accounts",
      "jewelry layaway software",
      "jewelry POS accounting handoff",
      "tender reporting jewelry store",
      "QuickBooks jewelry store POS",
    ],
  },
  multiStore: {
    slug: "multi-store",
    eyebrow: "Multi-store jewelry operations",
    title: "One operating record across every location.",
    description:
      "Linkd helps multi-location jewelers connect store transfers, employee permissions, inventory movement, reporting, customer context, and accounting handoff.",
    image: "/assets/screenshots/linkd-inventory-search-devices.webp",
    imageAlt: "Linkd multi-store inventory and operations view on a MacBook screen",
    proof: ["Transfers", "Locations", "Permissions", "Owner reporting"],
    visualProofs: [
      {
        label: "Move",
        title: "Controlled store transfers",
        image: "/assets/screenshots/linkd-inventory-search-devices.webp",
        alt: "Linkd inventory movement and multi-store transfer workflow",
      },
      {
        label: "Control",
        title: "Permissions by location",
        image: "/assets/screenshots/linkd-settings-integrations-devices.webp",
        alt: "Linkd provider and permission settings for multi-store control",
      },
      {
        label: "Report",
        title: "Owner views across stores",
        image: "/assets/screenshots/linkd-reports-home-devices.webp",
        alt: "Linkd reporting dashboard for multi-location jewelry operators",
      },
    ],
    outcomes: [
      {
        label: "Transfer",
        title: "Item movement history",
        copy: "Track receiving, vault movement, inter-store transfers, handoffs, and item status from one operational record.",
      },
      {
        label: "Control",
        title: "Permissions by role and location",
        copy: "Keep register controls, sensitive actions, approvals, and employee access aligned with how each store operates.",
      },
      {
        label: "Compare",
        title: "Reporting owners can scan",
        copy: "Give owners cleaner views across locations for sales, tenders, inventory pressure, staffing, and integration health.",
      },
    ],
    stackTitle: "Multi-store data needs one source of truth.",
    stackCopy:
      "When Linkd keeps each location's sales, inventory, permissions, and transfers clean, JewelLink and CountRetail can make relationship and intelligence workflows more useful.",
    stackItems: ["Store transfers", "Role permissions", "Inventory movement", "JewelLink CRM", "CountRetail AI", "Accounting handoff", "Owner reporting", "Open API"],
    faq: [
      {
        question: "Can Linkd support multi-location jewelry retailers?",
        answer:
          "Linkd is designed for multi-location jewelry operations, including inventory movement, inter-store transfers, role permissions, reporting, and accounting handoff.",
      },
      {
        question: "How does multi-store Linkd data help JewelLink and CountRetail?",
        answer:
          "Cleaner location-level POS, customer, inventory, and transfer data gives JewelLink better relationship context and CountRetail better store intelligence signals.",
      },
    ],
    metaTitle: "Multi-Store Jewelry POS, Transfers, Inventory, and Reporting",
    metaDescription:
      "Linkd supports multi-store jewelry operations with location-aware POS, inventory transfers, role permissions, owner reporting, accounting handoff, JewelLink CRM, and CountRetail AI readiness.",
    keywords: [
      "multi-store jewelry POS",
      "multi-location jewelry inventory",
      "jewelry store transfers",
      "location-aware POS",
      "jewelry owner reporting",
      "multi-store retail operations",
    ],
  },
  security: {
    slug: "security",
    eyebrow: "Jewelry store security and audits",
    title: "Controls for the counter, the case, and the back office.",
    description:
      "Linkd connects item movement, register actions, employee permissions, RFID-ready events, and CountRetail camera context into reviewable operating evidence.",
    image: "/assets/screenshots/linkd-reports-home-devices.webp",
    imageAlt: "Linkd reporting and security audit views on a MacBook screen",
    proof: ["Permissions", "RFID-ready events", "Exception review", "Camera context"],
    visualProofs: [
      {
        label: "Audit",
        title: "Reports for sensitive review",
        image: "/assets/screenshots/linkd-reports-home-devices.webp",
        alt: "Linkd reports and audit review workflow",
      },
      {
        label: "Movement",
        title: "Item history from case to vault",
        image: "/assets/screenshots/linkd-inventory-search-devices.webp",
        alt: "Linkd inventory movement and serialized item review",
      },
      {
        label: "Control",
        title: "Provider and permission signals",
        image: "/assets/screenshots/linkd-settings-integrations-devices.webp",
        alt: "Linkd provider and integration control settings",
      },
    ],
    outcomes: [
      {
        label: "Control",
        title: "Permissioned POS actions",
        copy: "Review register events, manager approvals, sensitive actions, and employee access without relying on memory.",
      },
      {
        label: "Audit",
        title: "Item movement evidence",
        copy: "Connect inventory movement, transfers, receiving, aging, and RFID-ready events to a cleaner operational timeline.",
      },
      {
        label: "Review",
        title: "Exception workflows",
        copy: "Give managers a place to review exceptions across POS, inventory, employees, locations, and CountRetail camera context.",
      },
    ],
    stackTitle: "Security gets stronger when systems agree.",
    stackCopy:
      "Linkd can connect the operational record with CountRetail store intelligence so owners can understand what happened, where, and why.",
    stackItems: ["Role permissions", "Register logs", "RFID readiness", "CountRetail AI", "Transfer history", "Exception review"],
    faq: [
      {
        question: "How can Linkd help with jewelry store audit workflows?",
        answer:
          "Linkd is designed to keep POS actions, inventory movement, employee permissions, transfers, and exceptions in reviewable operational records.",
      },
      {
        question: "How does Linkd connect with CountRetail for security?",
        answer:
          "Linkd can provide operational context while CountRetail contributes traffic, camera, zone, and store intelligence for stronger exception review.",
      },
    ],
    metaTitle: "Jewelry Store Security, POS Permissions, and Inventory Audit Workflows",
    metaDescription:
      "Linkd supports jewelry store security workflows with POS permissions, register logs, RFID-ready inventory events, transfer history, exception review, and CountRetail camera context.",
    keywords: [
      "jewelry store security",
      "jewelry POS permissions",
      "jewelry inventory audit",
      "RFID audit trail",
      "register permission logs",
      "jewelry store exception review",
    ],
  },
} satisfies Record<string, SeoLandingPage>;

export function createSeoLandingMetadata(page: SeoLandingPage): Metadata {
  const socialImage = {
    url: "/og.png",
    width: 1200,
    height: 630,
    alt: `${page.metaTitle} from Linkd`,
  };

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    category: "Jewelry POS software",
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: `${page.metaTitle} | Linkd`,
      description: page.metaDescription,
      url: `/${page.slug}`,
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.metaTitle} | Linkd`,
      description: page.metaDescription,
      images: [socialImage],
    },
  };
}
