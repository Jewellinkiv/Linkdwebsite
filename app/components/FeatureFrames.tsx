export type FeatureFrameData = {
  eyebrow: string;
  title: string;
  metric: string;
  metricLabel: string;
  nav: string[];
  rows: {
    label: string;
    value: string;
    status: string;
  }[];
  chips: string[];
};

export const productFeatureFrames: FeatureFrameData[] = [
  {
    eyebrow: "POS",
    title: "Counter workspace",
    metric: "4",
    metricLabel: "sale paths",
    nav: ["Client", "Items", "Services", "Tender"],
    rows: [
      { label: "Diamond sale", value: "Cart ready", status: "Open" },
      { label: "Repair intake", value: "Deposit", status: "Attach" },
      { label: "Layaway", value: "Schedule", status: "Review" },
    ],
    chips: ["Park sale", "Manager approval", "Split tender"],
  },
  {
    eyebrow: "Customers",
    title: "CRM-ready record",
    metric: "5",
    metricLabel: "customer signals",
    nav: ["Profile", "Segments", "Finance", "Activity"],
    rows: [
      { label: "Purchase history", value: "POS", status: "Ready" },
      { label: "Service history", value: "Repairs", status: "Linked" },
      { label: "House account", value: "Balance", status: "Review" },
    ],
    chips: ["Segments", "Layaways", "JewelLink context"],
  },
  {
    eyebrow: "Services",
    title: "Repair and appraisal flow",
    metric: "3",
    metricLabel: "service lanes",
    nav: ["Intake", "Status", "Notes", "Pickup"],
    rows: [
      { label: "Repair job", value: "Bench", status: "Track" },
      { label: "Appraisal", value: "Document", status: "Draft" },
      { label: "Custom work", value: "Quote", status: "Approve" },
    ],
    chips: ["Deposits", "Status updates", "Client follow-up"],
  },
  {
    eyebrow: "Inventory",
    title: "Case-to-vault control",
    metric: "9",
    metricLabel: "inventory tools",
    nav: ["Items", "Transfers", "Case scans", "Vendors"],
    rows: [
      { label: "Serialized item", value: "In case", status: "Live" },
      { label: "Transfer", value: "Store to store", status: "Pending" },
      { label: "Reorder alert", value: "Fast turn", status: "Watch" },
    ],
    chips: ["RFID-ready", "Aging", "Purchase orders"],
  },
  {
    eyebrow: "Reports",
    title: "Owner reporting catalog",
    metric: "59",
    metricLabel: "report views",
    nav: ["Sales", "Inventory", "KPI", "Commission"],
    rows: [
      { label: "Sales by tender", value: "Daily", status: "Run" },
      { label: "Inventory reporting", value: "Aging", status: "Scan" },
      { label: "Commission report", value: "Team", status: "Share" },
    ],
    chips: ["Payroll", "Customer", "Operations"],
  },
  {
    eyebrow: "Integrations",
    title: "Luxury management stack",
    metric: "3",
    metricLabel: "connected layers",
    nav: ["Linkd", "JewelLink", "CountRetail", "API"],
    rows: [
      { label: "Linkd", value: "Operations", status: "Record" },
      { label: "JewelLink", value: "Relationships", status: "Activate" },
      { label: "CountRetail", value: "Intelligence", status: "Explain" },
    ],
    chips: ["Accounting", "E-commerce", "Open API"],
  },
];

export const landingFeatureFramesBySlug: Record<string, FeatureFrameData> = {
  "jewelry-pos": productFeatureFrames[0],
  repairs: productFeatureFrames[2],
  inventory: productFeatureFrames[3],
  accounting: {
    eyebrow: "Finance",
    title: "Accounts and handoff",
    metric: "4",
    metricLabel: "finance paths",
    nav: ["House accounts", "Layaway", "Tender", "Export"],
    rows: [
      { label: "House account", value: "Aging", status: "Review" },
      { label: "Layaway", value: "Schedule", status: "Open" },
      { label: "Accounting", value: "Export", status: "Ready" },
    ],
    chips: ["QuickBooks", "Xero", "Striven"],
  },
  "multi-store": {
    eyebrow: "Multi-store",
    title: "Location operations",
    metric: "All",
    metricLabel: "store records",
    nav: ["Locations", "Transfers", "Roles", "Reports"],
    rows: [
      { label: "Store transfer", value: "In transit", status: "Track" },
      { label: "Location role", value: "Manager", status: "Gate" },
      { label: "Owner view", value: "All stores", status: "Compare" },
    ],
    chips: ["Inventory movement", "Approvals", "Owner reporting"],
  },
  security: {
    eyebrow: "Security",
    title: "Audit evidence",
    metric: "24/7",
    metricLabel: "review trail",
    nav: ["Roles", "Register", "Inventory", "Camera"],
    rows: [
      { label: "Sensitive action", value: "Manager", status: "Approve" },
      { label: "Item movement", value: "Case scan", status: "Match" },
      { label: "CountRetail", value: "Camera context", status: "Review" },
    ],
    chips: ["RFID-ready", "Exceptions", "Permission logs"],
  },
  integrations: productFeatureFrames[5],
};

type FeatureFrameCardProps = {
  frame: FeatureFrameData;
  compact?: boolean;
};

export function FeatureFrameCard({ frame, compact = false }: FeatureFrameCardProps) {
  return (
    <article className={`feature-frame-card${compact ? " feature-frame-card-compact" : ""}`}>
      <div className="feature-frame-topbar">
        <span>{frame.eyebrow}</span>
        <small>{frame.metricLabel}</small>
      </div>
      <div className="feature-frame-header">
        <div>
          <strong>{frame.title}</strong>
          <p>{frame.nav.join(" / ")}</p>
        </div>
        <b>{frame.metric}</b>
      </div>
      <div className="feature-frame-tabs" aria-label={`${frame.eyebrow} frame navigation`}>
        {frame.nav.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="feature-frame-rows">
        {frame.rows.map((row) => (
          <div className="feature-frame-row" key={row.label}>
            <span>{row.label}</span>
            <strong>{row.value}</strong>
            <small>{row.status}</small>
          </div>
        ))}
      </div>
      <div className="feature-frame-chip-row" aria-label={`${frame.eyebrow} feature signals`}>
        {frame.chips.map((chip) => (
          <span key={chip}>{chip}</span>
        ))}
      </div>
    </article>
  );
}

type FeatureFrameGridProps = {
  frames: FeatureFrameData[];
};

export function FeatureFrameGrid({ frames }: FeatureFrameGridProps) {
  return (
    <div className="feature-frame-grid" aria-label="Linkd product feature frames">
      {frames.map((frame) => (
        <FeatureFrameCard frame={frame} key={frame.eyebrow} />
      ))}
    </div>
  );
}
