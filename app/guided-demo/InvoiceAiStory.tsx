"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./guided-demo.module.css";

type InvoiceAiStoryProps = {
  onComplete: () => void;
  onExit: () => void;
};

const invoiceLines = [
  {
    id: "line-1",
    vendorSku: "651251:600:P",
    title: "14K Yellow Gold Diamond Huggie Earrings",
    category: "Diamond Earrings",
    quantity: 1,
    unitCost: 82_000,
    retail: 205_000,
    confidence: 98,
    serialized: true,
  },
  {
    id: "line-2",
    vendorSku: "LG-TB700-W",
    title: "14K White Gold Lab-Grown Diamond Tennis Bracelet",
    category: "Diamond Bracelets",
    quantity: 1,
    unitCost: 145_000,
    retail: 362_500,
    confidence: 96,
    serialized: true,
  },
  {
    id: "line-3",
    vendorSku: "PEND-SS-18",
    title: "Sterling Silver Diamond-Cut Pendant",
    category: "Fashion Pendants",
    quantity: 2,
    unitCost: 18_500,
    retail: 49_500,
    confidence: 72,
    serialized: false,
  },
] as const;

type InvoiceLine = (typeof invoiceLines)[number];

const FREIGHT = 7_500;
const invoiceMerchandiseTotal = invoiceLines.reduce(
  (sum, line) => sum + line.unitCost * line.quantity,
  0,
);
const INVOICE_TOTAL = invoiceMerchandiseTotal + FREIGHT;

const guideSteps = [
  {
    title: "Start inventory entry",
    instruction:
      "Choose Add Item from Linkd’s Inventory workspace to begin a new receiving session.",
  },
  {
    title: "Choose AI invoice import",
    instruction:
      "Use the invoice path when a vendor document should create several item drafts at once.",
  },
  {
    title: "Upload the sample invoice",
    instruction:
      "Attach the simulated Stuller PDF. This walkthrough never sends or stores a real document.",
  },
  {
    title: "Run simulated Vision AI",
    instruction:
      "Extract the vendor, invoice totals, quantities, costs, descriptions, and suggested inventory fields.",
  },
  {
    title: "Review every draft",
    instruction:
      "Resolve the low-confidence exception, approve each line, and keep a person in control of the inventory record.",
  },
  {
    title: "Create the inventory items",
    instruction:
      "Confirm the receiving summary to create four sample units in Corporate Inventory Intake.",
  },
];

function money(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default function InvoiceAiStory({ onComplete, onExit }: InvoiceAiStoryProps) {
  const [step, setStep] = useState(0);
  const [exceptionResolved, setExceptionResolved] = useState(false);
  const [approvedLineIds, setApprovedLineIds] = useState<string[]>([]);
  const completionSent = useRef(false);
  const storyRef = useRef<HTMLElement>(null);

  const isComplete = step >= 6;
  const allLinesApproved = approvedLineIds.length === invoiceLines.length;
  const currentGuide = guideSteps[Math.min(step, guideSteps.length - 1)];
  const nextLine = invoiceLines.find((line) => !approvedLineIds.includes(line.id));

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const target = storyRef.current?.querySelector<HTMLElement>(
        isComplete ? "[data-invoice-complete]" : '[data-invoice-guide-target="true"]',
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
  }, [allLinesApproved, approvedLineIds, exceptionResolved, isComplete, step]);

  function restartImport() {
    completionSent.current = false;
    setApprovedLineIds([]);
    setExceptionResolved(false);
    setStep(0);
  }

  function approveLine(line: InvoiceLine) {
    if (step !== 4 || (line.id === "line-3" && !exceptionResolved)) return;
    setApprovedLineIds((current) =>
      current.includes(line.id) ? current : [...current, line.id],
    );
  }

  function createInventory() {
    if (step !== 5 || completionSent.current) return;
    completionSent.current = true;
    setStep(6);
    onComplete();
  }

  return (
    <section
      aria-label="Guided AI Invoice Import workflow"
      className={`${styles.repairStory} ${styles.invoiceStory}`}
      ref={storyRef}
    >
      <div className={styles.saleGuide} aria-live="polite">
        <div className={styles.saleGuideProgress}>
          <span>{isComplete ? "STORY COMPLETE" : `STEP ${step + 1} OF 6`}</span>
          <div
            aria-label="AI invoice walkthrough progress"
            aria-valuemax={6}
            aria-valuemin={0}
            aria-valuenow={Math.min(step, 6)}
            role="progressbar"
          >
            <i style={{ width: `${(Math.min(step, 6) / 6) * 100}%` }} />
          </div>
        </div>
        <div className={styles.saleGuideCopy}>
          <strong>{isComplete ? "Four inventory units created" : currentGuide.title}</strong>
          <p>
            {isComplete
              ? "The invoice, item records, costs, retail prices, locations, and receiving history are connected."
              : currentGuide.instruction}
          </p>
        </div>
        <div className={styles.saleGuideActions}>
          <span>Guided Demo · Sample Data</span>
          <button type="button" onClick={onExit}>Choose workflows</button>
          <button type="button" onClick={restartImport}>Restart</button>
        </div>
      </div>

      <div className={styles.repairServicesWorkspace}>
        <InventoryNavigation />
        <main className={`${styles.repairServicesMain} ${styles.invoiceMain}`}>
          {isComplete ? (
            <InvoiceComplete onExit={onExit} />
          ) : (
            <>
              <header className={styles.invoiceHeader}>
                <div>
                  <p>INVENTORY CONTROL</p>
                  <h1>{step === 0 ? "Inventory" : "Add Inventory"}</h1>
                  <span>{step === 0 ? "Friday, August 28, 2026" : "Receiving workspace · Sample data"}</span>
                </div>
                {step === 0 ? (
                  <button
                    className={styles.guidedTarget}
                    data-invoice-guide-target="true"
                    onClick={() => setStep(1)}
                    type="button"
                  >
                    ＋ Add Item
                  </button>
                ) : (
                  <span className={styles.invoiceSamplePill}>SIMULATED IMPORT</span>
                )}
              </header>

              {step === 0 ? (
                <InventoryLanding />
              ) : step === 1 ? (
                <ImportChoice onChoose={() => setStep(2)} />
              ) : step === 2 ? (
                <InvoiceUpload onUpload={() => setStep(3)} />
              ) : step === 3 ? (
                <InvoiceReady onAnalyze={() => setStep(4)} />
              ) : step === 4 ? (
                <InvoiceReview
                  allLinesApproved={allLinesApproved}
                  approvedLineIds={approvedLineIds}
                  exceptionResolved={exceptionResolved}
                  nextLineId={nextLine?.id}
                  onApprove={approveLine}
                  onContinue={() => setStep(5)}
                  onResolve={() => setExceptionResolved(true)}
                />
              ) : (
                <ImportConfirmation onCreate={createInventory} />
              )}
            </>
          )}
        </main>
      </div>
    </section>
  );
}

function InventoryNavigation() {
  return (
    <aside className={styles.repairServicesNav}>
      <strong>INVENTORY</strong>
      <nav aria-label="Inventory workspace">
        <span className={styles.repairServiceNavActive}>Items</span>
        <span>Categories</span><span>Vendors</span><span>Vendor Returns</span>
        <span>Purchase Orders</span><span>Locations</span>
        <small>PHYSICAL INVENTORY</small><span>Case Security</span><span>Count Schedules</span>
        <small>ANALYTICS</small><span>Transfers</span><span>Special Orders</span>
        <small>OPERATIONS</small><span>Trade-In Management</span>
      </nav>
    </aside>
  );
}

function InventoryLanding() {
  return (
    <section className={styles.invoiceLanding}>
      <div className={styles.invoiceSearchRow}>
        <label><span className="sr-only">Search inventory</span><input disabled placeholder="Search item #, SKU, serial, description…" /></label>
        <button disabled type="button">Search</button><button disabled type="button">Advanced</button>
      </div>
      <div className={styles.invoiceKpis}>
        <div><span>AVAILABLE ITEMS</span><strong>8,421</strong><small>Corporate inventory</small></div>
        <div><span>RETAIL VALUE</span><strong>$12.8M</strong><small>Current loaded value</small></div>
        <div><span>RECEIVED TODAY</span><strong>17</strong><small>Across 3 invoices</small></div>
      </div>
      <div className={styles.invoiceTableCard}>
        <div className={styles.invoiceTableHeading}><strong>Recently received</strong><span>Showing sample records</span></div>
        <div className={styles.invoiceInventoryRow}><span>ITEM</span><span>DESCRIPTION</span><span>VENDOR</span><span>LOCATION</span><span>RETAIL</span><span>STATUS</span></div>
        <div className={styles.invoiceInventoryRow}><strong>LNK-006813</strong><span>18K Yellow Gold Diamond Band</span><span>Memo Jewelry</span><span>Corporate Intake</span><span>$4,850.00</span><em>Available</em></div>
        <div className={styles.invoiceInventoryRow}><strong>LNK-006812</strong><span>Platinum Sapphire Halo Ring</span><span>GemSource</span><span>Corporate Intake</span><span>$7,250.00</span><em>Available</em></div>
        <div className={styles.invoiceInventoryRow}><strong>LNK-006811</strong><span>14K White Gold Diamond Studs</span><span>Stuller</span><span>Corporate Intake</span><span>$1,495.00</span><em>Available</em></div>
      </div>
    </section>
  );
}

function ImportChoice({ onChoose }: { onChoose: () => void }) {
  return (
    <section className={styles.invoiceChoiceCard}>
      <div className={styles.invoiceSectionHeading}><p>CHOOSE ENTRY METHOD</p><h2>How are you adding inventory?</h2><span>Use one item at a time or create reviewable drafts from a vendor invoice.</span></div>
      <div className={styles.invoiceChoiceGrid}>
        <button disabled type="button"><i>＋</i><strong>Manual item entry</strong><span>Create one detailed item record.</span></button>
        <button className={`${styles.invoiceChoiceActive} ${styles.guidedTarget}`} data-invoice-guide-target="true" onClick={onChoose} type="button"><i>✦</i><strong>AI invoice import</strong><span>Upload a vendor invoice and review the drafted items.</span><em>Recommended for this story →</em></button>
        <button disabled type="button"><i>▦</i><strong>Spreadsheet import</strong><span>Map rows from a prepared template.</span></button>
      </div>
    </section>
  );
}

function InvoiceUpload({ onUpload }: { onUpload: () => void }) {
  return (
    <section className={styles.invoiceUploadCard}>
      <div className={styles.invoiceSectionHeading}><p>AI INVOICE IMPORT</p><h2>Upload a vendor invoice</h2><span>PDF, PNG, or JPG · Up to 20 MB · Sample files only in this guided demo</span></div>
      <div className={styles.invoiceDropZone}>
        <i aria-hidden="true">⇧</i><strong>Drop the invoice here</strong><span>or choose the prepared sample document</span>
        <button className={styles.guidedTarget} data-invoice-guide-target="true" onClick={onUpload} type="button">Upload Stuller Invoice INV-884193.pdf</button>
        <small>SIMULATED FILE · 1.8 MB · No document leaves this browser</small>
      </div>
      <div className={styles.invoicePrivacyNote}><span>✓</span><p><strong>Human review is required.</strong> Vision AI creates drafts only. Nothing enters inventory until the extracted fields are reviewed and approved.</p></div>
    </section>
  );
}

function InvoiceReady({ onAnalyze }: { onAnalyze: () => void }) {
  return (
    <section className={styles.invoiceUploadCard}>
      <div className={styles.invoiceSectionHeading}><p>AI INVOICE IMPORT</p><h2>Invoice ready for extraction</h2><span>Confirm the document before creating the item drafts.</span></div>
      <div className={styles.invoiceFileCard}><span>PDF</span><div><strong>Stuller Invoice INV-884193.pdf</strong><small>1 page · 1.8 MB · Added from sample data</small></div><em>Ready</em></div>
      <div className={styles.invoicePreview}>
        <div><strong>STULLER</strong><span>Invoice INV-884193</span><small>August 26, 2026 · Account 014821</small></div>
        <dl><div><dt>MERCHANDISE</dt><dd>{money(invoiceMerchandiseTotal)}</dd></div><div><dt>FREIGHT</dt><dd>{money(FREIGHT)}</dd></div><div><dt>INVOICE TOTAL</dt><dd>{money(INVOICE_TOTAL)}</dd></div></dl>
      </div>
      <button className={`${styles.invoicePrimaryButton} ${styles.guidedTarget}`} data-invoice-guide-target="true" onClick={onAnalyze} type="button">✦ Run Simulated Vision AI</button>
    </section>
  );
}

function InvoiceReview({ exceptionResolved, approvedLineIds, nextLineId, allLinesApproved, onResolve, onApprove, onContinue }: {
  exceptionResolved: boolean; approvedLineIds: string[]; nextLineId?: string; allLinesApproved: boolean;
  onResolve: () => void; onApprove: (line: InvoiceLine) => void; onContinue: () => void;
}) {
  return (
    <section className={styles.invoiceReviewCard}>
      <div className={styles.invoiceReviewHeader}>
        <div><p>VISION AI REVIEW</p><h2>3 invoice lines · 4 inventory units</h2><span>Stuller · INV-884193 · Invoice total {money(INVOICE_TOTAL)}</span></div>
        <div><strong>{approvedLineIds.length} / 3 approved</strong><span>1 exception found</span></div>
      </div>
      <div className={styles.invoiceAiBanner}><span>✦</span><p><strong>SIMULATED VISION AI · DRAFTS ONLY</strong>Descriptions, quantities, costs, and vendor SKUs were extracted from the sample invoice. Suggested categories and retail prices remain editable.</p></div>
      <div className={styles.invoiceDraftList}>
        {invoiceLines.map((line, index) => {
          const approved = approvedLineIds.includes(line.id);
          const needsResolution = line.id === "line-3" && !exceptionResolved;
          const isNext = nextLineId === line.id && !needsResolution;
          return (
            <article className={styles.invoiceDraft} key={line.id}>
              <div className={styles.invoiceDraftTopline}><span>LINE {index + 1}</span><strong className={line.confidence < 80 ? styles.invoiceLowConfidence : undefined}>{line.confidence}% confidence</strong></div>
              <div className={styles.invoiceDraftMain}>
                <div><small>VENDOR SKU</small><strong>{line.vendorSku}</strong><span>{line.serialized ? "Serialized item" : "Quantity item"}</span></div>
                <div><small>DESCRIPTION</small><strong>{line.title}</strong><span>{line.category}</span></div>
                <div><small>QTY</small><strong>{line.quantity}</strong><span>Corporate Intake</span></div>
                <div><small>UNIT COST</small><strong>{money(line.unitCost)}</strong><span>Total {money(line.unitCost * line.quantity)}</span></div>
                <div><small>SUGGESTED RETAIL</small><strong>{needsResolution ? "Needs review" : money(line.retail)}</strong><span>{needsResolution ? "Category confidence is low" : "Editable before import"}</span></div>
              </div>
              {needsResolution ? (
                <div className={styles.invoiceException}><p><strong>Review required</strong>Confirm Fashion Pendants and set retail to $495.00 for each unit.</p><button className={styles.guidedTarget} data-invoice-guide-target="true" onClick={onResolve} type="button">Resolve fields</button></div>
              ) : (
                <button aria-pressed={approved} className={isNext ? styles.guidedTarget : ""} data-invoice-guide-target={isNext ? "true" : undefined} disabled={approved} onClick={() => onApprove(line)} type="button">{approved ? "✓ Approved" : "Approve draft"}</button>
              )}
            </article>
          );
        })}
      </div>
      <footer className={styles.invoiceReviewFooter}>
        <div><span>MERCHANDISE</span><strong>{money(invoiceMerchandiseTotal)}</strong></div><div><span>FREIGHT</span><strong>{money(FREIGHT)}</strong></div><div><span>INVOICE TOTAL</span><strong>{money(INVOICE_TOTAL)}</strong></div>
        <button className={allLinesApproved ? styles.guidedTarget : ""} data-invoice-guide-target={allLinesApproved ? "true" : undefined} disabled={!allLinesApproved} onClick={onContinue} type="button">Continue to import →</button>
      </footer>
    </section>
  );
}

function ImportConfirmation({ onCreate }: { onCreate: () => void }) {
  return (
    <section className={styles.invoiceConfirmCard}>
      <span className={styles.invoiceConfirmMark}>✓</span><p>REVIEW COMPLETE</p><h2>Ready to create four inventory units.</h2><span>Three approved invoice lines will be received into Corporate Inventory Intake.</span>
      <dl><div><dt>VENDOR</dt><dd>Stuller</dd></div><div><dt>INVOICE</dt><dd>INV-884193</dd></div><div><dt>ITEM RECORDS</dt><dd>4 units</dd></div><div><dt>MERCHANDISE COST</dt><dd>{money(invoiceMerchandiseTotal)}</dd></div><div><dt>FREIGHT</dt><dd>{money(FREIGHT)}</dd></div><div><dt>DESTINATION</dt><dd>Corporate Inventory Intake</dd></div></dl>
      <div className={styles.invoicePrivacyNote}><span>i</span><p><strong>Sample action only.</strong> This creates demo records in the walkthrough; it does not affect a live Linkd store.</p></div>
      <button className={`${styles.invoicePrimaryButton} ${styles.guidedTarget}`} data-invoice-guide-target="true" onClick={onCreate} type="button">Create 4 Inventory Items</button>
    </section>
  );
}

function InvoiceComplete({ onExit }: { onExit: () => void }) {
  const createdUnits = [
    ["LNK-006814", "14K Yellow Gold Diamond Huggie Earrings", "$2,050.00", "Serialized"],
    ["LNK-006815", "14K White Gold Lab-Grown Diamond Tennis Bracelet", "$3,625.00", "Serialized"],
    ["LNK-006816", "Sterling Silver Diamond-Cut Pendant", "$495.00", "Qty 1 of 2"],
    ["LNK-006817", "Sterling Silver Diamond-Cut Pendant", "$495.00", "Qty 2 of 2"],
  ] as const;
  return (
    <section className={styles.invoiceCompleteCard} data-invoice-complete tabIndex={-1}>
      <header><span>✓</span><div><p>INVOICE IMPORT COMPLETE</p><h1>Four inventory units created.</h1><small>Stuller · INV-884193 · Corporate Inventory Intake</small></div><strong>● Received</strong></header>
      <div className={styles.invoiceConnectionGrid}><div><span>ITEM RECORDS</span><strong>4</strong><small>2 serialized · 2 quantity units</small></div><div><span>INVOICE COST</span><strong>{money(INVOICE_TOTAL)}</strong><small>Merchandise + freight retained</small></div><div><span>EXCEPTIONS</span><strong>0</strong><small>1 reviewed and resolved</small></div></div>
      <div className={styles.invoiceTableCard}>
        <div className={styles.invoiceTableHeading}><strong>New inventory</strong><span>Created from reviewed sample drafts</span></div>
        <div className={styles.invoiceInventoryRow}><span>ITEM</span><span>DESCRIPTION</span><span>VENDOR</span><span>LOCATION</span><span>RETAIL</span><span>STATUS</span></div>
        {createdUnits.map(([item, title, retail, type]) => <div className={styles.invoiceInventoryRow} key={item}><strong>{item}</strong><span>{title}</span><span>Stuller · {type}</span><span>Corporate Intake</span><span>{retail}</span><em>Available</em></div>)}
      </div>
      <ul className={styles.invoiceOutcomeList}>
        <li><span>✓</span><p><strong>Vendor history updated</strong>INV-884193 and its four units are connected to Stuller.</p></li>
        <li><span>✓</span><p><strong>Costs retained</strong>{money(invoiceMerchandiseTotal)} merchandise and {money(FREIGHT)} freight remain available for costing and reconciliation.</p></li>
        <li><span>✓</span><p><strong>Security ready</strong>New item numbers and Corporate Intake locations can enter scans, counts, transfers, and movement history.</p></li>
        <li><span>✓</span><p><strong>Owner view updated</strong>Received-today increased by four; no live inventory was changed.</p></li>
      </ul>
      <button onClick={onExit} type="button">Choose another workflow</button>
    </section>
  );
}
