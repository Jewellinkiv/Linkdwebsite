"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./guided-demo.module.css";

type InventoryManagementStoryProps = {
  onComplete: () => void;
  onExit: () => void;
};

const ITEM_COST = 745_000;
const ITEM_RETAIL = 1_499_500;
const ITEM_NUMBER = "LNK-006818";
const SERIAL_NUMBER = "SG-88421-26";
const RFID_EPC = "3034A7B21C0098";

const guideSteps = [
  {
    title: "Start item entry",
    instruction:
      "Choose Add Item from Linkd’s Inventory workspace to create one detailed serialized record.",
  },
  {
    title: "Choose manual item entry",
    instruction:
      "Use manual entry when the store needs full control over one unique jewelry item.",
  },
  {
    title: "Capture the jewelry details",
    instruction:
      "Review the vendor, style, metal, stone, grading report, size, and customer-facing description.",
  },
  {
    title: "Set value and identity",
    instruction:
      "Confirm category, cost, retail, item number, and the vendor serial before the piece is received.",
  },
  {
    title: "Generate the inventory tag",
    instruction:
      "Create the sample barcode and RFID tag that follows this serialized piece through scans and counts.",
  },
  {
    title: "Place it in a selling location",
    instruction:
      "Receive the item from Corporate Inventory Intake into Bridal Case 3 with an accountable movement record.",
  },
  {
    title: "Open the managed item record",
    instruction:
      "Review the item from the inventory list and see its complete identity, value, location, and movement history.",
  },
];

function money(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default function InventoryManagementStory({
  onComplete,
  onExit,
}: InventoryManagementStoryProps) {
  const [step, setStep] = useState(0);
  const completionSent = useRef(false);
  const storyRef = useRef<HTMLElement>(null);
  const isComplete = step >= 7;
  const currentGuide = guideSteps[Math.min(step, guideSteps.length - 1)];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const target = storyRef.current?.querySelector<HTMLElement>(
        isComplete
          ? "[data-inventory-complete]"
          : '[data-inventory-guide-target="true"]',
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

  function openItemRecord() {
    if (step !== 6 || completionSent.current) return;
    completionSent.current = true;
    setStep(7);
    onComplete();
  }

  return (
    <section
      aria-label="Guided Inventory Entry & Management workflow"
      className={`${styles.repairStory} ${styles.invoiceStory}`}
      ref={storyRef}
    >
      <div className={styles.saleGuide} aria-live="polite">
        <div className={styles.saleGuideProgress}>
          <span>{isComplete ? "STORY COMPLETE" : `STEP ${step + 1} OF 7`}</span>
          <div
            aria-label="Inventory management walkthrough progress"
            aria-valuemax={7}
            aria-valuemin={0}
            aria-valuenow={Math.min(step, 7)}
            role="progressbar"
          >
            <i style={{ width: `${(Math.min(step, 7) / 7) * 100}%` }} />
          </div>
        </div>
        <div className={styles.saleGuideCopy}>
          <strong>{isComplete ? "Serialized inventory is ready to sell" : currentGuide.title}</strong>
          <p>
            {isComplete
              ? "The item, vendor, category, valuation, tag, location, and movement history are connected."
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
        <InventoryNavigation />
        <main className={`${styles.repairServicesMain} ${styles.invoiceMain}`}>
          {isComplete ? (
            <InventoryItemRecord onExit={onExit} />
          ) : (
            <>
              <header className={styles.invoiceHeader}>
                <div>
                  <p>INVENTORY CONTROL</p>
                  <h1>{step === 0 || step === 6 ? "Inventory" : "Add Inventory"}</h1>
                  <span>{step === 0 || step === 6 ? "Friday, August 28, 2026" : "Serialized item workspace · Sample data"}</span>
                </div>
                {step === 0 ? (
                  <button
                    className={styles.guidedTarget}
                    data-inventory-guide-target="true"
                    onClick={() => setStep(1)}
                    type="button"
                  >
                    ＋ Add Item
                  </button>
                ) : step < 6 ? (
                  <span className={styles.invoiceSamplePill}>MANUAL ENTRY</span>
                ) : (
                  <span className={styles.inventoryReceivedPill}>● IN STOCK</span>
                )}
              </header>

              {step === 0 ? (
                <InventoryLanding />
              ) : step === 1 ? (
                <EntryChoice onChoose={() => setStep(2)} />
              ) : step === 2 ? (
                <ItemDetails onContinue={() => setStep(3)} />
              ) : step === 3 ? (
                <ItemIdentity onAssign={() => setStep(4)} />
              ) : step === 4 ? (
                <ItemTag onGenerate={() => setStep(5)} />
              ) : step === 5 ? (
                <ItemPlacement onReceive={() => setStep(6)} />
              ) : (
                <ReceivedInventory onOpen={openItemRecord} />
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
        <button disabled type="button">Search Inventory</button><button disabled type="button">Advanced</button>
      </div>
      <div className={styles.inventoryListSummary}><span>200 of 1,022,271 results · capped at 200 — narrow filters to load more</span><strong>Loaded retail value: $1,016,200.56</strong></div>
      <div className={styles.invoiceTableCard}>
        <div className={styles.invoiceTableHeading}><strong>Inventory</strong><span>Showing sample records</span></div>
        <div className={styles.invoiceInventoryRow}><span>SKU</span><span>DESCRIPTION</span><span>VENDOR</span><span>LOCATION</span><span>RETAIL</span><span>STATUS</span></div>
        <InventoryRow item="SIM-S02-QA-0002" title="Oval halo engagement ring" vendor="Unknown" location="002-00382" retail="$3,150.00" />
        <InventoryRow item="LNK-006817" title="Sterling Silver Diamond-Cut Pendant" vendor="Stuller" location="Corporate Intake" retail="$495.00" />
        <InventoryRow item="007-806-01474" title="18KWG 1.77CT round diamond bridal set" vendor="JEWELR" location="007-00007" retail="$17,195.00" />
      </div>
    </section>
  );
}

function InventoryRow({ item, title, vendor, location, retail }: {
  item: string; title: string; vendor: string; location: string; retail: string;
}) {
  return <div className={styles.invoiceInventoryRow}><strong>{item}</strong><span>{title}</span><span>{vendor}</span><span>{location}</span><span>{retail}</span><em>In Stock</em></div>;
}

function EntryChoice({ onChoose }: { onChoose: () => void }) {
  return (
    <section className={styles.invoiceChoiceCard}>
      <div className={styles.invoiceSectionHeading}><p>CHOOSE ENTRY METHOD</p><h2>How are you adding inventory?</h2><span>Create one controlled record or start from a prepared import.</span></div>
      <div className={styles.invoiceChoiceGrid}>
        <button className={`${styles.invoiceChoiceActive} ${styles.guidedTarget}`} data-inventory-guide-target="true" onClick={onChoose} type="button"><i>＋</i><strong>Manual item entry</strong><span>Create one serialized jewelry record with complete details.</span><em>Recommended for this story →</em></button>
        <button disabled type="button"><i>✦</i><strong>AI invoice import</strong><span>Upload a vendor invoice and review drafted items.</span></button>
        <button disabled type="button"><i>▦</i><strong>Spreadsheet import</strong><span>Map rows from a prepared template.</span></button>
      </div>
    </section>
  );
}

function ItemDetails({ onContinue }: { onContinue: () => void }) {
  return (
    <section className={styles.inventoryFormCard}>
      <div className={styles.invoiceSectionHeading}><p>ITEM DETAILS</p><h2>Describe the jewelry item</h2><span>The description and attributes support selling, searching, reporting, and service history.</span></div>
      <div className={styles.inventoryPhotoAndForm}>
        <div className={styles.inventoryItemPhoto}><span>◇</span><strong>OVAL HALO</strong><small>Sample product photo</small></div>
        <div className={styles.inventoryFieldGrid}>
          <ReadField label="Vendor" value="Simon G." />
          <ReadField label="Vendor Style" value="MR2362-W" />
          <ReadField label="Description" value="18K White Gold Oval Diamond Halo Engagement Ring" wide />
          <ReadField label="Metal" value="18K White Gold" />
          <ReadField label="Ring Size" value="6.5" />
          <ReadField label="Center Stone" value="1.20 ct Oval Diamond · G · SI1" wide />
          <ReadField label="Grading Report" value="GIA 7482193401" />
          <ReadField label="Accent Stones" value="0.42 ctw Round Diamonds" />
        </div>
      </div>
      <div className={styles.inventoryFormNote}><span>✓</span><p><strong>Search-ready description</strong>Vendor style, metal, shape, weight, color, clarity, size, and grading report are retained as structured sample fields.</p></div>
      <button className={`${styles.inventoryFormButton} ${styles.guidedTarget}`} data-inventory-guide-target="true" onClick={onContinue} type="button">Save Details &amp; Continue →</button>
    </section>
  );
}

function ItemIdentity({ onAssign }: { onAssign: () => void }) {
  const grossMargin = Math.round(((ITEM_RETAIL - ITEM_COST) / ITEM_RETAIL) * 10_000) / 100;
  return (
    <section className={styles.inventoryFormCard}>
      <div className={styles.invoiceSectionHeading}><p>CLASSIFICATION, VALUE &amp; IDENTITY</p><h2>Make the piece sellable and traceable</h2><span>Confirm where the item belongs, what it cost, and how Linkd will identify it.</span></div>
      <div className={styles.inventoryFieldGrid}>
        <ReadField label="Category" value="Engagement Rings" />
        <ReadField label="Subcategory" value="Oval Halo" />
        <ReadField label="Unit Cost" value={money(ITEM_COST)} />
        <ReadField label="Retail Price" value={money(ITEM_RETAIL)} />
        <ReadField label="Gross Margin" value={`${grossMargin.toFixed(2)}%`} />
        <ReadField label="Status" value="Pending Receipt" />
        <ReadField label="Item Number" value={ITEM_NUMBER} />
        <ReadField label="Vendor Serial" value={SERIAL_NUMBER} />
      </div>
      <div className={styles.inventoryIdPreview}>
        <div><span>ITEM NUMBER</span><strong>{ITEM_NUMBER}</strong><small>Unique Linkd identity</small></div>
        <div><span>VENDOR SERIAL</span><strong>{SERIAL_NUMBER}</strong><small>Manufacturer trace</small></div>
        <div><span>VALUATION</span><strong>{money(ITEM_RETAIL)}</strong><small>{money(ITEM_COST)} cost</small></div>
      </div>
      <button className={`${styles.inventoryFormButton} ${styles.guidedTarget}`} data-inventory-guide-target="true" onClick={onAssign} type="button">Assign Item Number &amp; Serial →</button>
    </section>
  );
}

function ItemTag({ onGenerate }: { onGenerate: () => void }) {
  return (
    <section className={styles.inventoryFormCard}>
      <div className={styles.invoiceSectionHeading}><p>BARCODE &amp; RFID</p><h2>Generate the item tag</h2><span>The tag connects the physical piece to its Linkd record during sales, transfers, scans, and counts.</span></div>
      <div className={styles.inventoryTagWorkspace}>
        <div className={styles.inventoryTagPreview}>
          <div><strong>LINKD</strong><span>{ITEM_NUMBER}</span></div>
          <p>18KWG OVAL DIA HALO ENG RING</p>
          <div className={styles.inventoryBarcode} aria-label="Sample barcode"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
          <small>{SERIAL_NUMBER}</small><b>{money(ITEM_RETAIL)}</b>
        </div>
        <div className={styles.inventoryTagDetails}>
          <div><span>TAG FORMAT</span><strong>Jewelry Butterfly · RFID</strong></div>
          <div><span>BARCODE VALUE</span><strong>00681814995</strong></div>
          <div><span>RFID EPC</span><strong>{RFID_EPC}</strong></div>
          <div><span>PRINT QUEUE</span><strong>Corporate Zebra ZD621</strong></div>
          <p><span>✓</span> Tag values match the sample item record.</p>
        </div>
      </div>
      <button className={`${styles.inventoryFormButton} ${styles.guidedTarget}`} data-inventory-guide-target="true" onClick={onGenerate} type="button">Generate Barcode / RFID Tag →</button>
    </section>
  );
}

function ItemPlacement({ onReceive }: { onReceive: () => void }) {
  return (
    <section className={styles.inventoryFormCard}>
      <div className={styles.invoiceSectionHeading}><p>RECEIVING &amp; LOCATION</p><h2>Move the item onto the selling floor</h2><span>Linkd records both the current location and the accountable movement that put it there.</span></div>
      <div className={styles.inventoryMovementRoute}>
        <div><span>FROM</span><strong>Corporate Inventory Intake</strong><small>Receiving · tag verified</small></div>
        <i>→</i>
        <div><span>TO</span><strong>Bridal Case 3</strong><small>Corporate · case 003</small></div>
      </div>
      <div className={styles.inventoryPlacementGrid}>
        <ReadField label="Item" value={ITEM_NUMBER} />
        <ReadField label="Status after receipt" value="In Stock" />
        <ReadField label="Destination" value="Bridal Case 3" />
        <ReadField label="Responsible employee" value="Jordan Lee" />
      </div>
      <div className={styles.inventoryFormNote}><span>i</span><p><strong>Sample movement only</strong>The walkthrough records a simulated intake-to-case move. No live inventory location is changed.</p></div>
      <button className={`${styles.inventoryFormButton} ${styles.guidedTarget}`} data-inventory-guide-target="true" onClick={onReceive} type="button">Receive into Bridal Case 3 →</button>
    </section>
  );
}

function ReceivedInventory({ onOpen }: { onOpen: () => void }) {
  return (
    <section className={styles.invoiceLanding}>
      <div className={styles.invoiceSearchRow}>
        <label><span className="sr-only">Search inventory</span><input readOnly value={ITEM_NUMBER} /></label>
        <button disabled type="button">Search Inventory</button><button disabled type="button">Advanced</button>
      </div>
      <div className={styles.inventoryListSummary}><span>1 matching item · received today</span><strong>Loaded retail value: {money(ITEM_RETAIL)}</strong></div>
      <div className={styles.invoiceTableCard}>
        <div className={styles.invoiceTableHeading}><strong>Inventory</strong><span>New serialized item highlighted</span></div>
        <div className={styles.invoiceInventoryRow}><span>SKU</span><span>DESCRIPTION</span><span>VENDOR</span><span>LOCATION</span><span>RETAIL</span><span>OPEN</span></div>
        <div className={`${styles.invoiceInventoryRow} ${styles.inventoryNewRow}`}>
          <strong>{ITEM_NUMBER}</strong><span>18K White Gold Oval Diamond Halo Engagement Ring</span><span>Simon G. · MR2362-W</span><span>Bridal Case 3</span><span>{money(ITEM_RETAIL)}</span>
          <button className={styles.guidedTarget} data-inventory-guide-target="true" onClick={onOpen} type="button">Open →</button>
        </div>
      </div>
      <div className={styles.inventoryMovementMini}><span>✓</span><p><strong>Item received and available</strong>{ITEM_NUMBER} moved from Corporate Inventory Intake to Bridal Case 3 at 11:42 AM.</p></div>
    </section>
  );
}

function InventoryItemRecord({ onExit }: { onExit: () => void }) {
  return (
    <section className={styles.inventoryRecord} data-inventory-complete tabIndex={-1}>
      <header>
        <div><p>INVENTORY ITEM</p><h1>{ITEM_NUMBER}</h1><span>18K White Gold Oval Diamond Halo Engagement Ring</span></div>
        <strong>● In Stock</strong>
      </header>
      <div className={styles.inventoryRecordGrid}>
        <div className={styles.inventoryRecordHero}>
          <div className={styles.inventoryRecordPhoto}><span>◇</span><small>Sample item image</small></div>
          <h2>Oval Diamond Halo Engagement Ring</h2><p>Simon G. · MR2362-W · Serial {SERIAL_NUMBER}</p>
          <dl><div><dt>RETAIL</dt><dd>{money(ITEM_RETAIL)}</dd></div><div><dt>COST</dt><dd>{money(ITEM_COST)}</dd></div><div><dt>LOCATION</dt><dd>Bridal Case 3</dd></div></dl>
        </div>
        <div className={styles.inventoryRecordDetails}>
          <div><span>CATEGORY</span><strong>Engagement Rings · Oval Halo</strong></div>
          <div><span>METAL</span><strong>18K White Gold · Size 6.5</strong></div>
          <div><span>CENTER STONE</span><strong>1.20 ct Oval · G · SI1</strong></div>
          <div><span>GRADING REPORT</span><strong>GIA 7482193401</strong></div>
          <div><span>ACCENT STONES</span><strong>0.42 ctw Round Diamonds</strong></div>
          <div><span>RFID EPC</span><strong>{RFID_EPC}</strong></div>
        </div>
      </div>
      <div className={styles.inventoryHistory}>
        <div><p>MOVEMENT &amp; MANAGEMENT HISTORY</p><span>Complete sample audit trail</span></div>
        <ol>
          <li><span>10:58 AM</span><strong>Item record created</strong><p>Jordan Lee · manual entry · Simon G. MR2362-W</p></li>
          <li><span>11:06 AM</span><strong>Value and identity assigned</strong><p>{ITEM_NUMBER} · {SERIAL_NUMBER} · {money(ITEM_COST)} cost · {money(ITEM_RETAIL)} retail</p></li>
          <li><span>11:14 AM</span><strong>Barcode / RFID tag generated</strong><p>{RFID_EPC} · Corporate Zebra ZD621</p></li>
          <li><span>11:42 AM</span><strong>Received into selling location</strong><p>Corporate Inventory Intake → Bridal Case 3 · status changed to In Stock</p></li>
        </ol>
      </div>
      <div className={styles.inventoryRecordOutcomes}>
        <span>✓ Searchable</span><span>✓ POS ready</span><span>✓ Scan ready</span><span>✓ Count ready</span><span>✓ Transfer ready</span>
      </div>
      <button onClick={onExit} type="button">Choose another workflow</button>
    </section>
  );
}

function ReadField({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return <label className={wide ? styles.inventoryFieldWide : undefined}><span>{label}</span><input readOnly value={value} /></label>;
}
