"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./guided-demo.module.css";

type OwnerStoryProps = {
  onAreaChange: (area: "Office" | "Reports") => void;
  onComplete: () => void;
  onExit: () => void;
};

const guideSteps = [
  {
    title: "Open Closeout from Office Today",
    instruction:
      "Use Linkd’s Office workspace to move from today’s cash, receipts, transactions, and recovery tools into Closeout.",
  },
  {
    title: "Review day-end control points",
    instruction:
      "Review tender totals, the official store-day control record, coverage, exceptions, and the business-day summary.",
  },
  {
    title: "Open Sales Overview",
    instruction:
      "Move into Reports and start with Linkd’s revenue, transaction, average-ticket, and gross-margin view.",
  },
  {
    title: "Compare store performance",
    instruction:
      "Use Benchmarking / KPI to compare ranking, average ticket, attach rate, and goal attainment across stores.",
  },
  {
    title: "Review service workload",
    instruction:
      "Check active repair workload, amount due, pickup readiness, parts or vendor waits, and repair SKU detail.",
  },
  {
    title: "Review inventory reporting",
    instruction:
      "Inspect stock value, aged inventory, GMROI, velocity, and aging by store, category, and location.",
  },
  {
    title: "Finish the owner review",
    instruction:
      "Complete the walkthrough after reviewing the same Office and Reports surfaces available in Linkd.",
  },
];

export default function OwnerStory({
  onAreaChange,
  onComplete,
  onExit,
}: OwnerStoryProps) {
  const [step, setStep] = useState(0);
  const completionSent = useRef(false);
  const storyRef = useRef<HTMLElement>(null);
  const isComplete = step >= 7;
  const isOffice = step <= 1;
  const currentGuide = guideSteps[Math.min(step, guideSteps.length - 1)];

  useEffect(() => {
    onAreaChange(isOffice ? "Office" : "Reports");
  }, [isOffice, onAreaChange]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const target = storyRef.current?.querySelector<HTMLElement>(
        isComplete
          ? "[data-owner-complete]"
          : '[data-owner-guide-target="true"]',
      );
      if (!target) return;
      target.focus({ preventScroll: true });
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "center",
      });
    }, 40);
    return () => window.clearTimeout(timer);
  }, [isComplete, step]);

  function restartStory() {
    completionSent.current = false;
    setStep(0);
  }

  function finishStory() {
    if (step !== 6 || completionSent.current) return;
    completionSent.current = true;
    setStep(7);
    onComplete();
  }

  return (
    <section
      aria-label="Guided Run the Day as an Owner workflow"
      className={`${styles.repairStory} ${styles.ownerStory}`}
      ref={storyRef}
    >
      <div className={styles.saleGuide} aria-live="polite">
        <div className={styles.saleGuideProgress}>
          <span>{isComplete ? "STORY COMPLETE" : `STEP ${step + 1} OF 7`}</span>
          <div
            aria-label="Owner walkthrough progress"
            aria-valuemax={7}
            aria-valuemin={0}
            aria-valuenow={Math.min(step, 7)}
            role="progressbar"
          >
            <i style={{ width: `${(Math.min(step, 7) / 7) * 100}%` }} />
          </div>
        </div>
        <div className={styles.saleGuideCopy}>
          <strong>{isComplete ? "Owner review complete" : currentGuide.title}</strong>
          <p>
            {isComplete
              ? "Office closeout and the linked sales, benchmarking, service, and inventory reports have been reviewed."
              : currentGuide.instruction}
          </p>
        </div>
        <div className={styles.saleGuideActions}>
          <span>Guided Demo · Sample Data</span>
          <button type="button" onClick={onExit}>Choose workflows</button>
          <button type="button" onClick={restartStory}>Restart</button>
        </div>
      </div>

      <div className={styles.repairServicesWorkspace}>
        {isOffice ? <OfficeNavigation active={step === 0 ? "Today" : "Closeout"} /> : <ReportsNavigation active={step} />}
        <main className={`${styles.repairServicesMain} ${styles.ownerMain}`}>
          {isComplete ? (
            <OwnerComplete onExit={onExit} />
          ) : step === 0 ? (
            <OfficeToday onOpenCloseout={() => setStep(1)} />
          ) : step === 1 ? (
            <CloseoutReview onContinue={() => setStep(2)} />
          ) : step === 2 ? (
            <ReportsHome onOpenSales={() => setStep(3)} />
          ) : step === 3 ? (
            <SalesOverview onCompareStores={() => setStep(4)} />
          ) : step === 4 ? (
            <BenchmarkingReport onReviewServices={() => setStep(5)} />
          ) : step === 5 ? (
            <ServiceWorkload onReviewInventory={() => setStep(6)} />
          ) : (
            <InventoryReporting onFinish={finishStory} />
          )}
        </main>
      </div>
    </section>
  );
}

function OfficeNavigation({ active }: { active: "Today" | "Closeout" }) {
  return (
    <aside className={`${styles.repairServicesNav} ${styles.ownerNav}`}>
      <nav aria-label="Office workspace">
        <span className={active === "Today" ? styles.repairServiceNavActive : ""}>Today</span>
        <small>OPERATIONS</small><span>Store Activity</span>
        <small>TRANSACTIONS</small><span>Receipts</span><span>Transactions</span>
        <small>FINANCE</small><span>House Accounts</span><span>Layaways</span><span>Accounting</span>
        <small>CASH OFFICE</small><span>Daily Front</span><span>Cash Counts</span><span className={active === "Closeout" ? styles.repairServiceNavActive : ""}>Closeout</span>
        <small>RECOVERY</small><span>Recovery Queue</span>
      </nav>
    </aside>
  );
}

function ReportsNavigation({ active }: { active: number }) {
  return (
    <aside className={`${styles.repairServicesNav} ${styles.ownerNav}`}>
      <nav aria-label="Reports workspace">
        <span className={active === 2 ? styles.repairServiceNavActive : ""}>Reports Home</span>
        <small>SALES</small><span className={active === 3 ? styles.repairServiceNavActive : ""}>Sales Overview</span>
        <small>INVENTORY</small><span className={active === 6 ? styles.repairServiceNavActive : ""}>Inventory Reports</span>
        <small>BENCHMARKING</small><span className={active === 4 ? styles.repairServiceNavActive : ""}>Benchmarking</span>
        <small>OPERATIONS</small><span>Operations Overview</span><span>Deposit Liability</span><span>Compliance Cases</span><span>Job P&amp;L</span><span>Memo Payables</span><span>Transfers</span><span className={active === 5 ? styles.repairServiceNavActive : ""}>Repairs</span>
        <small>TEAM</small><span>Commissions</span>
        <small>CUSTOMER</small><span>Customer Reports</span>
        <small>TIME CLOCK</small><span>Time Reports</span>
      </nav>
    </aside>
  );
}

function WorkspaceHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className={styles.ownerHeader}><p>{eyebrow}</p><h1>{title}</h1><span>{description}</span></header>;
}

function OfficeToday({ onOpenCloseout }: { onOpenCloseout: () => void }) {
  return (
    <section className={styles.ownerPage}>
      <WorkspaceHeader eyebrow="OFFICE" title="Office Today" description="Cash, receipts, transactions, closeout, and recovery for the selected store." />
      <div className={styles.ownerLaunchGrid}>
        <LaunchCard title="Transactions" tag="Live review" description="Receipt lookup, activity feed, Void Transaction review, return launch, and refund recovery." />
        <LaunchCard title="Receipts" tag="Live lookup" description="Receipt review, reprint, gift receipt, and gift certificate envelope." />
        <LaunchCard title="Cash Counts" tag="Custody log" description="Selected-store, safe, vault, and drawer custody evidence; separate from POS till reconciliation." />
        <LaunchCard title="House Accounts" tag="Finance" description="Account balances, aging, statements, adjustments, activity, and reports." />
        <LaunchCard title="Layaways" tag="Finance" description="Open obligations, payment schedules, aging, activity, and reports." />
        <LaunchCard title="Closeout" tag="Review" description="Daily tender totals, drawer expected cash, and variance review." action onClick={onOpenCloseout} />
        <LaunchCard title="Accounting" tag="GL review" description="Run multi-prefix item GL activity and inspect original-date post-sale cost corrections." />
        <LaunchCard title="Recovery Queue" tag="Watch" description="Unresolved refund attempts that need follow-up." />
        <LaunchCard title="Store Activity" tag="Live feed" description="Store-scoped register actions and receipt controls." />
      </div>
    </section>
  );
}

function CloseoutReview({ onContinue }: { onContinue: () => void }) {
  return (
    <section className={styles.ownerPage}>
      <WorkspaceHeader eyebrow="OFFICE" title="Closeout" description="Daily closeout, tender totals, device batches, and variance review." />
      <OwnerPanel eyebrow="OFFICE CLOSEOUT" title="Day-End Control Points" description="Review each official source before day-end signoff.">
        <div className={styles.ownerControlGrid}>
          <MiniControl title="Cash Counts" tag="Separate custody log" />
          <MiniControl title="Transactions" tag="Review" />
          <MiniControl title="House Accounts" tag="Review" />
          <MiniControl title="Layaways" tag="Review" />
          <MiniControl title="Receipts" tag="Lookup" />
          <MiniControl title="Recovery Queue" tag="Watch" />
        </div>
      </OwnerPanel>
      <OwnerPanel eyebrow="OFFICIAL STORE DAY" title="Closeout Control Record" description="Prepare, document exceptions, approve independently, and reopen only with durable evidence.">
        <div className={styles.ownerFilterRow}><ReadField label="Business day" value="2026-08-28" /><button type="button" disabled>Prepare closeout</button><button type="button" disabled>Refresh</button></div>
        <OwnerTable headers={["Business day", "Revision", "State", "Approved", ""]} rows={[["2026-08-28", "1", "Needs review", "Pending", "Open →"]]} />
      </OwnerPanel>
      <div className={styles.ownerSplitPanels}>
        <OwnerPanel eyebrow="CONTROL COVERAGE" title="Daily Closeout Register" description="Every store business date is shown, including dates where no closeout was ever prepared.">
          <div className={styles.ownerStatusStrip}><span>Missing <strong>0</strong></span><span>Needs review <strong>1</strong></span><span>Approved <strong>12</strong></span></div>
          <OwnerTable headers={["Business day", "Coverage", "Revision", "Approved"]} rows={[["Aug 28, 2026", "Complete", "1", "Pending"]]} />
        </OwnerPanel>
        <OwnerPanel eyebrow="OPERATIONAL FOLLOW-THROUGH" title="Exception Follow-up Queue" description="Resolution evidence is separate from the immutable approval packet.">
          <div className={styles.ownerStatusStrip}><span>All <strong>1</strong></span><span>Open <strong>1</strong></span><span>Overdue <strong>0</strong></span></div>
          <div className={styles.ownerException}><strong>Credit-card batch variance</strong><span>Owner: William Jones · Due 6:00 PM</span><em>OPEN</em></div>
        </OwnerPanel>
      </div>
      <OwnerPanel eyebrow="DAILY CLOSE-OUT" title="Business Day Summary" description="Sales, tender buckets, till sessions, and drawer opens for one day.">
        <div className={styles.ownerMoneyCards}>
          <Metric label="Goods" value="$35,940.00" /><Metric label="Services" value="$6,740.00" /><Metric label="Other" value="$0.00" /><Metric label="Tax" value="$3,521.11" /><Metric label="Total" value="$46,201.11" /><Metric label="Sales" value="18" />
        </div>
        <p className={styles.ownerTenderLine}>Cash $4,820.00 · Checks $0.00 · Credit Card $39,881.11 · Gift Certificate $1,500.00 · Total Tender $46,201.11</p>
      </OwnerPanel>
      <button className={`${styles.ownerNextButton} ${styles.guidedTarget}`} data-owner-guide-target="true" onClick={onContinue} type="button">Continue to Reports →</button>
    </section>
  );
}

function ReportsHome({ onOpenSales }: { onOpenSales: () => void }) {
  return (
    <section className={styles.ownerPage}>
      <WorkspaceHeader eyebrow="ANALYTICS" title="Reports" description="View sales performance, inventory metrics, and business insights." />
      <OwnerPanel eyebrow="QUICK REPORTS" title="Start with the decision you need to make" description="Open a focused report or browse by business area.">
        <div className={styles.ownerQuickReports}>
          <ReportCard title="Sales Overview" description="KPI dashboard with revenue trends, YoY comparisons, and store breakdown." action onClick={onOpenSales} />
          <ReportCard title="Multi-Store Dashboard" description="Side-by-side store KPIs with rankings, variance highlights, and trend sparklines." />
          <ReportCard title="Aged Inventory" description="Aging by ownership type with turn-rate, GMROI, and configurable age bands." />
          <ReportCard title="Special Orders" description="Special order status, fulfillment rate, and aging." />
          <ReportCard title="Team Commissions" description="Commission earnings by associate with transaction detail." />
        </div>
      </OwnerPanel>
      <OwnerPanel eyebrow="DAILY ACTIVITY" title="Four-Plane Money Story" description="Recognized sales · tender · on-account deposits · future pipeline, for one day.">
        <div className={styles.ownerMoneyCards}>
          <Metric label="Goods" value="$35,940.00" /><Metric label="Services" value="$6,740.00" /><Metric label="Other" value="$0.00" /><Metric label="Tax" value="$3,521.11" /><Metric label="Total" value="$46,201.11" /><Metric label="Sales" value="18" />
        </div>
        <div className={styles.ownerFourPlane}><p><strong>Tender</strong>Cash $4,820.00 · Credit Card $39,881.11 · Gift Certificate $1,500.00</p><p><strong>On Account</strong>Layaway $2,250.00 · Special order $1,800.00 · House account $750.00</p><p><strong>Future</strong>$4,050.00 future in · $1,800.00 recognized out at pickup</p></div>
      </OwnerPanel>
    </section>
  );
}

function SalesOverview({ onCompareStores }: { onCompareStores: () => void }) {
  return (
    <section className={styles.ownerPage}>
      <WorkspaceHeader eyebrow="REPORTS" title="Sales Overview" description="Revenue, transaction, margin, and tender mix overview for launch review reporting." />
      <ReportFilters firstLabel="Date Range" firstValue="Today" secondLabel="Store" secondValue="All Stores" />
      <div className={styles.ownerReportMetrics}><Metric label="Revenue" value="$46,201.11" /><Metric label="Transactions" value="18" /><Metric label="Avg Ticket" value="$2,566.73" /><Metric label="Gross Margin" value="48.6%" /></div>
      <OwnerPanel eyebrow="STORE BREAKDOWN" title="Sales performance" description="Today · All Stores">
        <OwnerTable headers={["Store", "Transactions", "Revenue", "Gross Margin", "YoY"]} rows={[["Corporate", "8", "$22,486.38", "51.2%", "+8.4%"],["Little Rock", "5", "$12,940.00", "47.9%", "+3.1%"],["West Little Rock", "3", "$7,820.00", "45.8%", "−1.2%"],["Memphis", "2", "$2,954.73", "42.6%", "+2.7%"]]} />
      </OwnerPanel>
      <button className={`${styles.ownerNextButton} ${styles.guidedTarget}`} data-owner-guide-target="true" onClick={onCompareStores} type="button">Open Benchmarking / KPI →</button>
    </section>
  );
}

function BenchmarkingReport({ onReviewServices }: { onReviewServices: () => void }) {
  return (
    <section className={styles.ownerPage}>
      <WorkspaceHeader eyebrow="REPORTS" title="Benchmarking / KPI" description="Multi-store comparisons, rankings, variance, and KPI goal tracking." />
      <ReportFilters firstLabel="Date Range" firstValue="This Month" secondLabel="Store" secondValue="All Stores" />
      <OwnerPanel eyebrow="BENCHMARKING" title="Store ranking and goal attainment" description="Average-ticket and attach-rate comparison rows.">
        <OwnerTable headers={["Rank", "Store", "Revenue", "Avg Ticket", "Attach Rate", "Goal"]} rows={[["1", "Corporate", "$412,680", "$2,418", "18.2%", "108%"],["2", "Little Rock", "$288,940", "$2,105", "15.8%", "101%"],["3", "West Little Rock", "$241,775", "$1,984", "13.2%", "96%"],["4", "Memphis", "$198,420", "$1,876", "12.7%", "92%"]]} />
      </OwnerPanel>
      <button className={`${styles.ownerNextButton} ${styles.guidedTarget}`} data-owner-guide-target="true" onClick={onReviewServices} type="button">Open Service Workload →</button>
    </section>
  );
}

function ServiceWorkload({ onReviewInventory }: { onReviewInventory: () => void }) {
  return (
    <section className={styles.ownerPage}>
      <WorkspaceHeader eyebrow="OPERATIONS" title="Service Workload" description="Active repair workload, amount due, pickup readiness, parts/vendor waits, and repair SKU detail." />
      <ReportFilters firstLabel="Date Range" firstValue="This Month" secondLabel="Store" secondValue="All Stores" />
      <div className={styles.ownerReportMetrics}><Metric label="Active Repairs" value="14" /><Metric label="Amount Due" value="$7,840.00" /><Metric label="Pickup Ready" value="3" /><Metric label="Parts / Vendor Wait" value="4" /></div>
      <OwnerPanel eyebrow="REPAIR WORKLOAD" title="Active service jobs" description="All Stores · Sample data">
        <OwnerTable headers={["Service", "Customer", "Status", "Due", "Amount Due", "Repair SKU"]} rows={[["R-0317", "Maya Thompson", "Ready for pickup", "Aug 28", "$185.00", "RPR-PRONG-01"],["R-0874", "Alexus Jones", "Completed", "Aug 28", "$0.00", "RPR-INSP-01"],["R-0931", "Daniel Brooks", "Vendor wait", "Sep 2", "$640.00", "RPR-WATCH-04"],["R-0940", "Laura Chen", "Parts wait", "Sep 4", "$285.00", "RPR-CHAIN-02"]]} />
      </OwnerPanel>
      <button className={`${styles.ownerNextButton} ${styles.guidedTarget}`} data-owner-guide-target="true" onClick={onReviewInventory} type="button">Open Inventory Reporting →</button>
    </section>
  );
}

function InventoryReporting({ onFinish }: { onFinish: () => void }) {
  return (
    <section className={styles.ownerPage}>
      <WorkspaceHeader eyebrow="INVENTORY" title="Inventory Reporting" description="Stock value, aged inventory, turn-rate / GMROI, velocity, and reorder signals." />
      <ReportFilters firstLabel="Aging Reference" firstValue="This Month" secondLabel="Store" secondValue="All Stores" />
      <div className={styles.ownerReportMetrics}><Metric label="Stock Value" value="$8.42M" /><Metric label="Units" value="3,284" /><Metric label="Aged Value" value="$1.16M" /><Metric label="GMROI" value="1.84" /></div>
      <OwnerPanel eyebrow="AGED INVENTORY" title="Aging by store, category, and location" description="Current balance and aging reference with value, units, and GMROI.">
        <OwnerTable headers={["Store", "Category", "Location", "Units", "Stock Value", "Aged Units", "Aged Value", "GMROI"]} rows={[["Corporate", "Bridal", "Bridal Case 3", "126", "$842,400", "9", "$114,950", "2.14"],["Little Rock", "Fashion", "Fashion Case 2", "184", "$621,880", "22", "$96,440", "1.62"],["West Little Rock", "Watches", "Watch Wall", "48", "$714,200", "8", "$132,800", "1.41"],["Memphis", "Diamond", "Diamond Vault", "67", "$1,224,500", "4", "$88,250", "2.36"]]} />
      </OwnerPanel>
      <button className={`${styles.ownerNextButton} ${styles.guidedTarget}`} data-owner-guide-target="true" onClick={onFinish} type="button">Complete Owner Review →</button>
    </section>
  );
}

function OwnerComplete({ onExit }: { onExit: () => void }) {
  return (
    <section className={styles.ownerComplete} data-owner-complete tabIndex={-1}>
      <header><span>✓</span><div><p>OWNER REVIEW COMPLETE</p><h1>The day has been reviewed in Linkd.</h1><small>Friday, August 28, 2026 · Corporate and All Stores</small></div><strong>COMPLETE</strong></header>
      <ul>
        <li><span>✓</span><p><strong>Office Closeout reviewed</strong>Tender totals, control record, coverage, exceptions, and the business-day summary were checked.</p></li>
        <li><span>✓</span><p><strong>Sales performance reviewed</strong>Revenue, transactions, average ticket, gross margin, and the store breakdown were compared.</p></li>
        <li><span>✓</span><p><strong>Benchmarking reviewed</strong>Store ranking, average ticket, attach rate, variance, and goal attainment were compared.</p></li>
        <li><span>✓</span><p><strong>Operations reviewed</strong>Active repair workload, pickup readiness, balances due, and parts or vendor waits were checked.</p></li>
        <li><span>✓</span><p><strong>Inventory reporting reviewed</strong>Stock value, aged units, aged value, location, and GMROI were reviewed.</p></li>
      </ul>
      <p>This walkthrough mirrors Linkd’s Office and Reports navigation. It does not create or approve a live closeout.</p>
      <button type="button" onClick={onExit}>Choose another workflow</button>
    </section>
  );
}

function LaunchCard({ title, tag, description, action = false, onClick }: { title: string; tag: string; description: string; action?: boolean; onClick?: () => void }) {
  return <button className={action ? styles.guidedTarget : ""} data-owner-guide-target={action ? "true" : undefined} disabled={!action} onClick={onClick} type="button"><span>{tag}</span><strong>{title}</strong><p>{description}</p><em>Open</em></button>;
}

function ReportCard({ title, description, action = false, onClick }: { title: string; description: string; action?: boolean; onClick?: () => void }) {
  return <button className={action ? styles.guidedTarget : ""} data-owner-guide-target={action ? "true" : undefined} disabled={!action} onClick={onClick} type="button"><strong>{title}</strong><p>{description}</p><span>Open report →</span></button>;
}

function MiniControl({ title, tag }: { title: string; tag: string }) {
  return <div><span>{tag}</span><strong>{title}</strong><small>Open →</small></div>;
}

function OwnerPanel({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  return <section className={styles.ownerPanel}><header><div><p>{eyebrow}</p><h2>{title}</h2></div><span>{description}</span></header>{children}</section>;
}

function ReportFilters({ firstLabel, firstValue, secondLabel, secondValue }: { firstLabel: string; firstValue: string; secondLabel: string; secondValue: string }) {
  return <div className={styles.ownerReportFilters}><ReadField label={firstLabel} value={firstValue} /><ReadField label={secondLabel} value={secondValue} /><label>Criteria Name<input disabled placeholder="Month end" /></label><label className={styles.ownerCheckbox}><input checked readOnly type="checkbox" /> Default</label><button type="button" disabled>Run</button><button type="button" disabled>Export</button><button type="button" disabled>Print</button><button type="button" disabled>Snapshot</button><button type="button" disabled>Criteria</button></div>;
}

function ReadField({ label, value }: { label: string; value: string }) {
  return <label>{label}<input readOnly value={value} /></label>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div><span>{label}</span><strong>{value}</strong></div>;
}

function OwnerTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return <div className={styles.ownerTableWrap}><table><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={`${row[0]}-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
