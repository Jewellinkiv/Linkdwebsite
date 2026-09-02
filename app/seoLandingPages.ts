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
    copy: string;
    image: string;
    alt: string;
  }[];
  tourEyebrow: string;
  tourTitle: string;
  outcomes: {
    label: string;
    title: string;
    copy: string;
  }[];
  outcomesEyebrow: string;
  outcomesTitle: string;
  stackTitle: string;
  stackCopy: string;
  stackItems: string[];
  connectionEyebrow: string;
  connectionSteps: {
    label: string;
    title: string;
    copy: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

export const seoLandingPages = {
  payments: {
    slug: "payments",
    eyebrow: "Payment processing for jewelers",
    title: "Take payments, track balances, and close with a clear trail.",
    description:
      "Linkd keeps each payment with the sale, customer, deposit, layaway, or house account so your team can review what happened before it reaches the books.",
    image: "/assets/screenshots/linkd-pos-cart-demo-card-v2.webp",
    imageAlt: "Linkd checkout workspace with customer, jewelry items, services, and tender context",
    proof: ["Checkout payments", "Deposits and balances", "Settlement review", "Accounting records"],
    tourEyebrow: "From tender to settlement",
    tourTitle: "Follow a payment from checkout to daily close.",
    visualProofs: [
      {
        label: "Checkout",
        title: "Take payment without leaving the sale",
        copy: "The associate sees the customer, items, services, and amount due in the same register view.",
        image: "/assets/screenshots/linkd-pos-cart-demo-card-v2.webp",
        alt: "Linkd jewelry POS checkout and tender workflow",
      },
      {
        label: "Customer",
        title: "Keep deposits and balances with the customer",
        copy: "Customer details and account information remain available after the register closes.",
        image: "/assets/screenshots/linkd-customer-overview-demo-v2.webp",
        alt: "Linkd customer account and balance context",
      },
      {
        label: "Daily close",
        title: "Review sales and tenders before handoff",
        copy: "Managers can review daily activity before preparing records for accounting.",
        image: "/assets/screenshots/linkd-reporting.webp",
        alt: "Linkd reporting workspace for sales and payment review",
      },
    ],
    outcomesEyebrow: "What changes for your team",
    outcomesTitle: "Keep payment, balance, and daily-close details on the same records.",
    outcomes: [
      {
        label: "Take payment",
        title: "Tender stays with the sale",
        copy: "Keep the payment method, customer, items, services, and amount due together at checkout.",
      },
      {
        label: "Track balances",
        title: "Deposits remain easy to find",
        copy: "Keep deposits, layaway, house accounts, and open balances connected to the customer and the original transaction.",
      },
      {
        label: "Close the day",
        title: "Review before it reaches the books",
        copy: "See the day's tender activity in one place before settlement review and accounting preparation.",
      },
    ],
    connectionEyebrow: "From counter to close",
    stackTitle: "How payment information moves through Linkd.",
    stackCopy:
      "A payment starts at checkout, stays tied to any open balance, and remains available for end-of-day review. Accounting setup is planned around the systems your store uses.",
    stackItems: ["Linkd POS", "Receivables", "Sage", "QuickBooks", "Reporting", "Open API"],
    connectionSteps: [
      {
        label: "Checkout",
        title: "The associate records the payment",
        copy: "Tender is saved with the customer, sale, service, or account it belongs to.",
      },
      {
        label: "Balance",
        title: "Open amounts remain visible",
        copy: "Deposits, layaway schedules, and house-account balances stay attached to the original transaction.",
      },
      {
        label: "Review",
        title: "Managers verify the day",
        copy: "Tender activity can be reviewed before settlement and the store's configured accounting process.",
      },
    ],
    faq: [
      {
        question: "Does Linkd separate payment processing from the POS?",
        answer:
          "No. Linkd keeps the payment with the sale, customer, balance, and daily review instead of treating it as a separate step.",
      },
      {
        question: "Can Linkd help with layaway and house accounts?",
        answer:
          "Yes. Deposits, payment schedules, balances, and aging remain connected to the customer and original transaction.",
      },
      {
        question: "How does payment activity reach accounting?",
        answer:
          "Your team reviews payment activity in Linkd first. The exact export or integration path is mapped around your accounting system during implementation.",
      },
    ],
    metaTitle: "Payment Processing for Jewelry Stores",
    metaDescription:
      "Linkd connects payment processing, receivables, tender controls, settlement review, and accounting handoff for luxury jewelry retailers.",
    keywords: [
      "jewelry store payment processing",
      "jewelry POS payments",
      "luxury retail payment processing",
      "jewelry store receivables",
      "jewelry layaway software",
      "payment reconciliation jewelry retail",
    ],
  },
  jewelryPos: {
    slug: "jewelry-pos",
    eyebrow: "Jewelry POS software",
    title: "POS built around the way jewelers actually sell.",
    description:
      "Linkd connects checkout, services, layaway, account balances, tender controls, and customer context in one counter workflow.",
    image: "/assets/screenshots/linkd-pos-cart-demo-card-v2.webp",
    imageAlt: "Linkd jewelry POS register on a MacBook screen",
    proof: ["Checkout", "Repair intake", "Layaway", "Tender controls"],
    tourEyebrow: "At the counter",
    tourTitle: "See a sale from cart to close.",
    visualProofs: [
      {
        label: "Register",
        title: "Build the sale around the customer",
        copy: "Add serialized pieces, services, and payment details without losing sight of who you are serving.",
        image: "/assets/screenshots/linkd-pos-cart-demo-card-v2.webp",
        alt: "Linkd jewelry POS register workflow",
      },
      {
        label: "Customer",
        title: "Keep purchase and account details close",
        copy: "Associates can see the information they need to continue the relationship after checkout.",
        image: "/assets/screenshots/linkd-customer-overview-demo-v2.webp",
        alt: "Linkd customer context and CRM-ready record",
      },
      {
        label: "Review",
        title: "Review the day after the sale",
        copy: "Managers can scan sales and store activity from the reporting workspace.",
        image: "/assets/screenshots/linkd-reporting.webp",
        alt: "Linkd reports dashboard for jewelry store operators",
      },
    ],
    outcomesEyebrow: "What your team can do",
    outcomesTitle: "Handle the whole sale without switching systems.",
    outcomes: [
      {
        label: "Sell",
        title: "Counter checkout",
        copy: "Build each sale from the customer, serialized items, services, and tender. Park or resume it without starting over.",
      },
      {
        label: "Service",
        title: "Repairs and appraisals",
        copy: "Start repairs, appraisals, custom work, and special orders at the counter with the customer and item records attached.",
      },
      {
        label: "Account",
        title: "Layaway and balances",
        copy: "Record deposits, layaway schedules, house accounts, and remaining balances on the customer and sale records.",
      },
    ],
    connectionEyebrow: "After the receipt",
    stackTitle: "What happens after a sale.",
    stackCopy:
      "The same sale can update inventory, customer history, open balances, and reporting. Optional connections can carry the right information into CRM, analytics, and accounting tools.",
    stackItems: ["JewelLink CRM", "CountRetail AI", "QuickBooks", "Xero", "Striven", "Open API"],
    connectionSteps: [
      {
        label: "Sell",
        title: "Complete the transaction",
        copy: "The associate adds the customer, serialized items, services, and tender in the register.",
      },
      {
        label: "Update",
        title: "The store records change together",
        copy: "Inventory status, customer history, and any remaining balance reflect the sale.",
      },
      {
        label: "Continue",
        title: "The next team has the details",
        copy: "Reporting, accounting, CRM, and analytics connections can use the information your store has configured.",
      },
    ],
    faq: [
      {
        question: "Is Linkd a jewelry POS?",
        answer:
          "Yes. Linkd is jewelry-specific POS and store-management software for checkout, services, inventory, accounts, and reporting.",
      },
      {
        question: "Can Linkd support layaway and house accounts?",
        answer:
          "Yes. Linkd keeps layaway schedules, deposits, customer balances, and house accounts with the original sale and customer.",
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
    title: "Take a repair in at the counter and track it through pickup.",
    description:
      "Document the piece, collect a deposit, assign the work, and keep the customer informed without moving the job to a separate system.",
    image: "/assets/screenshots/linkd-services-repairs.webp",
    imageAlt: "Linkd jewelry repair bench board from intake to pickup",
    proof: ["Repair intake", "Appraisals", "Service history", "Customer context"],
    tourEyebrow: "From intake to pickup",
    tourTitle: "Follow a repair through the store.",
    visualProofs: [
      {
        label: "Bench",
        title: "See every job and its next step",
        copy: "The service board shows which jobs are at intake, on the bench, ready, or waiting for pickup.",
        image: "/assets/screenshots/linkd-services-repairs.webp",
        alt: "Linkd jewelry repair board tracking jobs from intake to pickup",
      },
      {
        label: "Customer",
        title: "Keep the job with the customer",
        copy: "Associates can return to the customer record when they need contact, account, or service details.",
        image: "/assets/screenshots/linkd-customer-overview-demo-v2.webp",
        alt: "Linkd customer record with repair and service history",
      },
      {
        label: "Review",
        title: "Review store activity in one place",
        copy: "Managers can use Linkd reporting alongside the service board to review the day.",
        image: "/assets/screenshots/linkd-reporting.webp",
        alt: "Linkd reports dashboard for jewelry service review",
      },
    ],
    outcomesEyebrow: "What changes for your team",
    outcomesTitle: "Everyone can see what the job needs and what happens next.",
    outcomes: [
      {
        label: "Capture",
        title: "Counter repair intake",
        copy: "Start repairs, appraisals, and custom jobs at the counter with the customer and piece already attached.",
      },
      {
        label: "Track",
        title: "Service history",
        copy: "Keep status, deposits, item references, due dates, and notes together so another associate can pick up the job.",
      },
      {
        label: "Follow up",
        title: "CRM-ready service context",
        copy: "When JewelLink is connected, ready-job details can support timely client follow-up.",
      },
    ],
    connectionEyebrow: "One job record",
    stackTitle: "Keep the repair with the customer and the piece.",
    stackCopy:
      "The repair starts at the counter, moves through the service board, and remains easy to find when the customer calls or returns.",
    stackItems: ["Repair intake", "Appraisals", "Custom work", "Customer history", "JewelLink CRM", "Owner reporting", "Deposits", "Open API"],
    connectionSteps: [
      {
        label: "Intake",
        title: "Document the piece and the request",
        copy: "Add photos, notes, due dates, customer details, and any deposit at the counter.",
      },
      {
        label: "Service",
        title: "Move the job through the bench",
        copy: "The team can see the current status, owner, and next step without asking for the intake details again.",
      },
      {
        label: "Pickup",
        title: "Finish with the history intact",
        copy: "Completion, payment, and pickup stay available on the customer and service records.",
      },
    ],
    faq: [
      {
        question: "Can Linkd support jewelry repair intake?",
        answer:
          "Yes. Linkd keeps repair intake, appraisals, custom work, deposits, notes, and status close to the customer and POS record.",
      },
      {
        question: "How can repair history connect to CRM?",
        answer:
          "When JewelLink is connected, service status and customer details can support reminders, follow-up, and associate outreach.",
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
    title: "Know where every piece is—and where it has been.",
    description:
      "Find serialized items, record receiving and transfers, review aging, and keep movement history with each piece.",
    image: "/assets/screenshots/linkd-inventory.webp",
    imageAlt: "Linkd jewelry inventory search on a MacBook screen",
    proof: ["Serialized items", "Transfers", "Aging views", "RFID-ready events"],
    tourEyebrow: "From receiving to the case",
    tourTitle: "Find a piece and see where it has been.",
    visualProofs: [
      {
        label: "Search",
        title: "Find the exact piece",
        copy: "Search serialized inventory and check its location, status, vendor, and value.",
        image: "/assets/screenshots/linkd-inventory.webp",
        alt: "Linkd serialized jewelry inventory search workflow",
      },
      {
        label: "Customer",
        title: "Return to the related customer record",
        copy: "When a piece is tied to a sale, the customer workspace keeps the relationship easy to find.",
        image: "/assets/screenshots/linkd-customer-overview-demo-v2.webp",
        alt: "Linkd customer history connected to store operations",
      },
      {
        label: "Report",
        title: "Review aging and store activity",
        copy: "Use reporting to identify inventory questions that need a closer look.",
        image: "/assets/screenshots/linkd-reporting.webp",
        alt: "Linkd reporting views for jewelry inventory review",
      },
    ],
    outcomesEyebrow: "What your team can do",
    outcomesTitle: "Track movement as it happens, not after the fact.",
    outcomes: [
      {
        label: "Track",
        title: "Serialized item records",
        copy: "Give each serialized item a searchable record with its location, movement, vendor, and status.",
      },
      {
        label: "Move",
        title: "Receiving and transfers",
        copy: "Log receiving, multi-store transfers, and vault movement when each action happens.",
      },
      {
        label: "Review",
        title: "Aging and exceptions",
        copy: "Use aging and movement history to spot records that need attention before review time.",
      },
    ],
    connectionEyebrow: "When an item moves",
    stackTitle: "What Linkd updates with each inventory action.",
    stackCopy:
      "Receiving, transfers, location changes, and sales stay with the serialized item. Optional analytics connections can use that history alongside store performance data.",
    stackItems: ["RFID readiness", "CountRetail AI", "Vendor context", "Multi-store movement", "Owner reporting", "Open API"],
    connectionSteps: [
      {
        label: "Receive",
        title: "Create the item record",
        copy: "Capture the serial number, vendor, cost, price, and starting location when the piece arrives.",
      },
      {
        label: "Move",
        title: "Record each location change",
        copy: "Transfers and vault or case movement add to the item's history instead of replacing it.",
      },
      {
        label: "Review",
        title: "Use the history to answer questions",
        copy: "Managers can review location, aging, status, and movement when a piece needs attention.",
      },
    ],
    faq: [
      {
        question: "Does Linkd support serialized jewelry inventory?",
        answer:
          "Yes. Linkd supports serialized item lookup, movement history, transfers, receiving, aging, and vendor details.",
      },
      {
        question: "How does Linkd connect inventory with security?",
        answer:
          "Linkd keeps item movement and register activity available for review. When CountRetail is connected, store intelligence can add another source of context.",
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
    title: "Connect Linkd to the tools your store already uses.",
    description:
      "Connect Linkd with payment, accounting, commerce, tax, RFID, CRM, and analytics tools. Exact availability and setup are confirmed during integration planning.",
    image: "/assets/screenshots/linkd-integrations.webp",
    imageAlt: "Linkd integrations settings on a MacBook screen",
    proof: ["Payment processing", "Sage", "QuickBooks", "Open API"],
    tourEyebrow: "Connection setup",
    tourTitle: "See what is connected and when it last synced.",
    visualProofs: [
      {
        label: "Status",
        title: "Check provider and sync status",
        copy: "The integrations workspace shows configured providers and their current connection state.",
        image: "/assets/screenshots/linkd-integrations.webp",
        alt: "Linkd integration settings and provider status workflow",
      },
      {
        label: "Linkd",
        title: "Capture the store activity first",
        copy: "The sale begins with the customer, items, services, and tender in Linkd.",
        image: "/assets/screenshots/linkd-pos-cart-demo-card-v2.webp",
        alt: "Linkd POS register as the operational source of truth",
      },
      {
        label: "Customer",
        title: "Keep the related customer details available",
        copy: "The customer workspace shows the store information a configured CRM connection may use.",
        image: "/assets/screenshots/linkd-customer-overview-demo-v2.webp",
        alt: "Linkd customer activity ready for CRM workflows",
      },
    ],
    outcomesEyebrow: "What connections do",
    outcomesTitle: "Document which systems receive each configured record.",
    outcomes: [
      {
        label: "Customer tools",
        title: "CRM and analytics connections",
        copy: "Configure the information JewelLink or CountRetail needs around the way your store works.",
      },
      {
        label: "Payments",
        title: "Processing stays with the transaction",
        copy: "Keep payment activity connected to the sale, customer balance, and daily review.",
      },
      {
        label: "Back office",
        title: "Accounting, commerce, and tax",
        copy: "Map each supported connection around the records your back office needs and the systems it already uses.",
      },
    ],
    connectionEyebrow: "What connects and why",
    stackTitle: "Linkd runs the store. Connections move the right data.",
    stackCopy:
      "Each connection has a specific job. Its exact scope, direction, and setup depend on the provider and the way your store works.",
    stackItems: ["Payment processing", "Sage", "QuickBooks", "JewelLink CRM", "CountRetail AI", "JewelHire", "TrackTech RFID", "Shopify", "Avalara", "Open API"],
    connectionSteps: [
      {
        label: "Record",
        title: "Work starts in Linkd",
        copy: "Sales, customers, items, services, payments, and balances are recorded where the team completes the work.",
      },
      {
        label: "Connect",
        title: "Define what each provider needs",
        copy: "During planning, the team confirms which records move, in which direction, and how often.",
      },
      {
        label: "Monitor",
        title: "Check connection health",
        copy: "The integrations workspace gives operators a place to review configured provider status.",
      },
    ],
    faq: [
      {
        question: "How do Linkd, JewelLink, and CountRetail work together?",
        answer:
          "Linkd manages store operations. JewelLink, CountRetail, and JewelHire are separate products that can connect when your store needs them.",
      },
      {
        question: "Does Linkd replace JewelLink System products?",
        answer:
          "No. Linkd works on its own as the POS and store-management system. The other products add customer, analytics, or hiring tools.",
      },
      {
        question: "Can Linkd connect to accounting and e-commerce?",
        answer:
          "Linkd supports planned connections for accounting, tax, e-commerce, RFID, and custom APIs. Exact provider availability and scope are confirmed during integration planning.",
      },
    ],
    metaTitle: "Jewelry POS Integrations for Luxury Retail",
    metaDescription:
      "Linkd connects jewelry POS operations with payment processing, Sage, QuickBooks, JewelLink, CountRetail, JewelHire, Shopify, Avalara, RFID, and open API paths.",
    keywords: [
      "jewelry POS integrations",
      "luxury jewelry management software",
      "JewelLink System integration",
      "JewelLink CRM integration",
      "CountRetail AI integration",
      "QuickBooks jewelry POS",
      "Sage jewelry POS",
      "Shopify jewelry POS integration",
      "jewelry retail API",
    ],
  },
  accounting: {
    slug: "accounting",
    eyebrow: "Jewelry store finance",
    title: "Keep deposits, layaway, and house accounts tied to the sale.",
    description:
      "Review customer balances and tender activity in Linkd before preparing the records your accounting process needs.",
    image: "/assets/screenshots/linkd-reporting.webp",
    imageAlt: "Linkd finance and reporting views on a MacBook screen",
    proof: ["House accounts", "Layaway", "Tender review", "Accounting preparation"],
    tourEyebrow: "From sale to books",
    tourTitle: "Follow the numbers from checkout to review.",
    visualProofs: [
      {
        label: "Register",
        title: "Record the sale and selected tender",
        copy: "The register keeps the customer, items, services, amount due, and payment choice together.",
        image: "/assets/screenshots/linkd-pos-cart-demo-card-v2.webp",
        alt: "Linkd POS register with tender and sale context",
      },
      {
        label: "Customer",
        title: "Check balances beside the customer",
        copy: "Return to the customer workspace when you need account or transaction details.",
        image: "/assets/screenshots/linkd-customer-overview-demo-v2.webp",
        alt: "Linkd customer record with operational account context",
      },
      {
        label: "Report",
        title: "Review sales before accounting preparation",
        copy: "Managers can scan sales, margin, and transaction activity before the next back-office step.",
        image: "/assets/screenshots/linkd-reporting.webp",
        alt: "Linkd reporting dashboard for finance review",
      },
    ],
    outcomesEyebrow: "For the back office",
    outcomesTitle: "Give accounting a cleaner starting point.",
    outcomes: [
      {
        label: "Account",
        title: "House account control",
        copy: "Keep balances, account aging, and finance status with the customer instead of rebuilding them later.",
      },
      {
        label: "Schedule",
        title: "Layaway and deposits",
        copy: "Keep layaway schedules, deposits, and split tenders tied to the sale and customer.",
      },
      {
        label: "Handoff",
        title: "Prepared accounting records",
        copy: "Review store activity before it moves through the accounting setup configured during implementation.",
      },
    ],
    connectionEyebrow: "Before the books",
    stackTitle: "How store activity reaches accounting.",
    stackCopy:
      "Linkd keeps the sale, tender, deposit, and customer balance together. The export or integration path is mapped around your accounting system during implementation.",
    stackItems: ["House accounts", "Layaway schedules", "Tender reporting", "QuickBooks", "Xero", "Striven", "Avalara", "Owner reporting"],
    connectionSteps: [
      {
        label: "Record",
        title: "Capture the transaction once",
        copy: "The sale, tender, deposit, and any remaining balance stay with the customer record.",
      },
      {
        label: "Review",
        title: "Check the day in Linkd",
        copy: "Managers review sales and transaction activity before it moves to the next system.",
      },
      {
        label: "Prepare",
        title: "Follow the configured accounting path",
        copy: "The exact export, sync, or review process is agreed during implementation.",
      },
    ],
    faq: [
      {
        question: "Can Linkd support jewelry store house accounts?",
        answer:
          "Yes. Linkd keeps customer balances, account aging, house accounts, specialty financing, and review details with the store record.",
      },
      {
        question: "How does Linkd help with accounting handoff?",
        answer:
          "Linkd keeps POS, tender, customer, layaway, and account activity together for review. The exact export or integration is mapped during implementation.",
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
    title: "Run every location from the same set of records.",
    description:
      "Move inventory between stores, set access by role, and compare location activity from one Linkd workspace.",
    image: "/assets/screenshots/linkd-inventory.webp",
    imageAlt: "Linkd multi-store inventory and operations view on a MacBook screen",
    proof: ["Transfers", "Locations", "Permissions", "Owner reporting"],
    tourEyebrow: "Across locations",
    tourTitle: "Check inventory and sales across your stores.",
    visualProofs: [
      {
        label: "Inventory",
        title: "Find each item's store and location",
        copy: "Search inventory and check where a serialized piece is currently recorded.",
        image: "/assets/screenshots/linkd-inventory.webp",
        alt: "Linkd inventory movement and multi-store transfer workflow",
      },
      {
        label: "Connections",
        title: "Check provider and sync status",
        copy: "The integrations view shows configured providers and their current connection state.",
        image: "/assets/screenshots/linkd-integrations.webp",
        alt: "Linkd provider and integration status for multi-store operations",
      },
      {
        label: "Report",
        title: "Compare sales across locations",
        copy: "Owners can use the all-store reporting view to compare sales and store activity.",
        image: "/assets/screenshots/linkd-reporting.webp",
        alt: "Linkd reporting dashboard for multi-location jewelry operators",
      },
    ],
    outcomesEyebrow: "For owners and managers",
    outcomesTitle: "Use the same process at every location.",
    outcomes: [
      {
        label: "Transfer",
        title: "Item movement history",
        copy: "Keep receiving, vault movement, and inter-store transfers in the item's movement history.",
      },
      {
        label: "Control",
        title: "Permissions by role and location",
        copy: "Set register controls, approvals, and access around each employee's role and location.",
      },
      {
        label: "Compare",
        title: "Reporting owners can scan",
        copy: "Compare sales, tenders, inventory, and connection status without combining separate store reports by hand.",
      },
    ],
    connectionEyebrow: "One shared process",
    stackTitle: "How location activity stays connected.",
    stackCopy:
      "Linkd ties inventory, transfers, permissions, and sales to each location. JewelLink and CountRetail are optional additions for customer and store-performance information.",
    stackItems: ["Store transfers", "Role permissions", "Inventory movement", "JewelLink CRM", "CountRetail AI", "Accounting handoff", "Owner reporting", "Open API"],
    connectionSteps: [
      {
        label: "Locate",
        title: "Know which store has the piece",
        copy: "Each serialized item keeps its current location and movement history.",
      },
      {
        label: "Move",
        title: "Record transfers between stores",
        copy: "The sending and receiving locations use the same transfer record and item history.",
      },
      {
        label: "Compare",
        title: "Review locations together",
        copy: "Owners can compare store activity while managers continue working in their own location.",
      },
    ],
    faq: [
      {
        question: "Can Linkd support multi-location jewelry retailers?",
        answer:
          "Yes. Linkd supports inventory movement, inter-store transfers, role permissions, and reporting across locations.",
      },
      {
        question: "How does multi-store Linkd data help JewelLink and CountRetail?",
        answer:
          "When connected, JewelLink can use customer and POS details while CountRetail can add traffic and store-performance information by location.",
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
    title: "Review sensitive actions with the records behind them.",
    description:
      "Review register activity, serialized-item movement, and employee access, with optional CountRetail camera details when an exception needs investigation.",
    image: "/assets/screenshots/linkd-reporting.webp",
    imageAlt: "Linkd reporting and security audit views on a MacBook screen",
    proof: ["Permissions", "RFID-ready events", "Exception review", "Camera context"],
    tourEyebrow: "What you can review",
    tourTitle: "See the records behind an exception.",
    visualProofs: [
      {
        label: "Reporting",
        title: "Review sales and team activity",
        copy: "The reporting workspace gives managers a starting point for questions about store activity.",
        image: "/assets/screenshots/linkd-reporting.webp",
        alt: "Linkd reports and audit review workflow",
      },
      {
        label: "Inventory",
        title: "Check an item's location and status",
        copy: "Search serialized inventory when a piece or movement record needs a closer look.",
        image: "/assets/screenshots/linkd-inventory.webp",
        alt: "Linkd inventory movement and serialized item review",
      },
      {
        label: "Connections",
        title: "Confirm connected systems are available",
        copy: "The integrations workspace shows provider and sync status during an investigation.",
        image: "/assets/screenshots/linkd-integrations.webp",
        alt: "Linkd provider and integration status settings",
      },
    ],
    outcomesEyebrow: "When something needs review",
    outcomesTitle: "Check the records involved in the exception.",
    outcomes: [
      {
        label: "Control",
        title: "Permissioned POS actions",
        copy: "Keep register events, approvals, and sensitive actions available for review by role.",
      },
      {
        label: "Audit",
        title: "Item movement evidence",
        copy: "Keep inventory movement, transfers, receiving, and RFID-ready events with the item history.",
      },
      {
        label: "Review",
        title: "Exception workflows",
        copy: "Bring together POS, inventory, employee, and optional CountRetail details when an exception needs attention.",
      },
    ],
    connectionEyebrow: "From event to review",
    stackTitle: "Put the records behind an exception in one place.",
    stackCopy:
      "Linkd keeps role, register, transfer, and inventory records available for review. CountRetail can add camera and traffic details when connected.",
    stackItems: ["Role permissions", "Register logs", "RFID readiness", "CountRetail AI", "Transfer history", "Exception review"],
    connectionSteps: [
      {
        label: "Record",
        title: "Linkd keeps the store event",
        copy: "Register actions, employee roles, and serialized-item movement remain available for review.",
      },
      {
        label: "Investigate",
        title: "A manager checks the related records",
        copy: "Use reporting, inventory status, transfer history, and connection status to narrow the question.",
      },
      {
        label: "CountRetail",
        title: "Add optional camera and traffic details",
        copy: "When CountRetail is connected, camera, zone, and traffic details can support the review.",
      },
    ],
    faq: [
      {
        question: "How can Linkd help with jewelry store audit workflows?",
        answer:
          "Linkd keeps POS actions, inventory movement, employee permissions, transfers, and related records available for manager review.",
      },
      {
        question: "How does Linkd connect with CountRetail for security?",
        answer:
          "Linkd provides register and inventory records. When CountRetail is connected, traffic, camera, and zone details can add context to an exception review.",
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
    url: page.image,
    width: 1800,
    height: 1200,
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
