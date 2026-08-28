"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./guided-demo.module.css";

type InventorySecurityStoryProps = {
  onComplete: () => void;
  onExit: () => void;
};

const COUNT_ID = "CNT-20260828-0031";
const EXPECTED_ITEMS = 12;
const SCANNED_ITEMS = 11;
const EXPECTED_VALUE = 8_624_000;
const MISSING_ITEM_VALUE = 1_499_500;
const SCANNED_VALUE = EXPECTED_VALUE - MISSING_ITEM_VALUE;
const MISSING_ITEM = "LNK-006818";

const scannedItems = [
  ["LNK-006802", "Platinum Diamond Solitaire Ring", "$18,500.00"],
  ["LNK-006805", "18K Yellow Gold Three-Stone Ring", "$12,950.00"],
  ["LNK-006807", "14K White Gold Diamond Bridal Set", "$8,795.00"],
  ["LNK-006809", "18K Rose Gold Oval Halo Ring", "$7,450.00"],
] as const;

const guideSteps = [
  {
    title: "Start a secure case count",
    instruction:
      "Use Start a count from Case Security to begin an accountable physical-inventory check.",
  },
  {
    title: "Snapshot Bridal Case 3",
    instruction:
      "Choose a cycle count and freeze the twelve items Linkd expects in this active location.",
  },
  {
    title: "Capture the case with RFID",
    instruction:
      "Run a simulated RFID read. Eleven tags respond, leaving one item for human review.",
  },
  {
    title: "Review the variance",
    instruction:
      "Open the missing-item exception instead of changing the inventory record automatically.",
  },
  {
    title: "Inspect the movement trail",
    instruction:
      "Use the frozen count snapshot and signed movement evidence to determine where the item went.",
  },
  {
    title: "Resolve with accountable evidence",
    instruction:
      "Record that the item is verified in an authorized POS viewing tray and retain the responsible employee.",
  },
  {
    title: "Close the cycle count",
    instruction:
      "Close the reconciled count so its expected population, captures, variance, evidence, and operator remain immutable.",
  },
];

function money(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default function InventorySecurityStory({
  onComplete,
  onExit,
}: InventorySecurityStoryProps) {
  const [step, setStep] = useState(0);
  const completionSent = useRef(false);
  const storyRef = useRef<HTMLElement>(null);
  const isComplete = step >= 7;
  const currentGuide = guideSteps[Math.min(step, guideSteps.length - 1)];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const target = storyRef.current?.querySelector<HTMLElement>(
        isComplete
          ? "[data-security-complete]"
          : '[data-security-guide-target="true"]',
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

  function closeCount() {
    if (step !== 6 || completionSent.current) return;
    completionSent.current = true;
    setStep(7);
    onComplete();
  }

  return (
    <section
      aria-label="Guided Inventory Security workflow"
      className={`${styles.repairStory} ${styles.invoiceStory}`}
      ref={storyRef}
    >
      <div className={styles.saleGuide} aria-live="polite">
        <div className={styles.saleGuideProgress}>
          <span>{isComplete ? "STORY COMPLETE" : `STEP ${step + 1} OF 7`}</span>
          <div
            aria-label="Inventory security walkthrough progress"
            aria-valuemax={7}
            aria-valuemin={0}
            aria-valuenow={Math.min(step, 7)}
            role="progressbar"
          >
            <i style={{ width: `${(Math.min(step, 7) / 7) * 100}%` }} />
          </div>
        </div>
        <div className={styles.saleGuideCopy}>
          <strong>{isComplete ? "Case count closed with evidence" : currentGuide.title}</strong>
          <p>
            {isComplete
              ? "The frozen expectation, RFID captures, variance, signed movement, resolution, and operator are connected."
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
        <SecurityNavigation />
        <main className={`${styles.repairServicesMain} ${styles.invoiceMain}`}>
          {isComplete ? (
            <SecurityComplete onExit={onExit} />
          ) : (
            <>
              <header className={styles.securityHeader}>
                <div><p>PHYSICAL INVENTORY</p><h1>Case Security</h1><span>Review secure case counts, assigned operators, variance, and audit history.</span></div>
                {step === 0 ? (
                  <button className={styles.guidedTarget} data-security-guide-target="true" onClick={() => setStep(1)} type="button">＋ Start a count</button>
                ) : (
                  <span className={step >= 6 ? styles.securityResolvedPill : styles.securityOpenPill}>{step >= 6 ? "● RECONCILED" : "● OPEN COUNT"}</span>
                )}
              </header>

              {step === 0 ? (
                <CaseSecurityLanding />
              ) : step === 1 ? (
                <CountSetup onStart={() => setStep(2)} />
              ) : step === 2 ? (
                <RfidCapture onScan={() => setStep(3)} />
              ) : step === 3 ? (
                <VarianceReview onReview={() => setStep(4)} />
              ) : step === 4 ? (
                <MovementEvidence onUseEvidence={() => setStep(5)} />
              ) : step === 5 ? (
                <VarianceResolution onResolve={() => setStep(6)} />
              ) : (
                <CloseCount onClose={closeCount} />
              )}
            </>
          )}
        </main>
      </div>
    </section>
  );
}

function SecurityNavigation() {
  return (
    <aside className={styles.repairServicesNav}>
      <strong>INVENTORY</strong>
      <nav aria-label="Inventory workspace">
        <span>Items</span><span>Categories</span><span>Vendors</span><span>Vendor Returns</span><span>Purchase Orders</span><span>Locations</span>
        <small>PHYSICAL INVENTORY</small><span className={styles.repairServiceNavActive}>Case Security</span><span>Count Schedules</span>
        <small>ANALYTICS</small><span>Transfers</span><span>Special Orders</span>
        <small>OPERATIONS</small><span>Trade-In Management</span>
      </nav>
    </aside>
  );
}

function CaseSecurityLanding() {
  return (
    <section className={styles.securityLanding}>
      <div className={styles.securityKpis}>
        <div><span>OPEN COUNTS</span><strong>0</strong><small>All assigned locations</small></div>
        <div><span>CLOSED TODAY</span><strong>4</strong><small>0 unresolved exceptions</small></div>
        <div><span>NEXT SCHEDULE</span><strong>4:30 PM</strong><small>Bridal Case 5 · blind cycle</small></div>
      </div>
      <div className={styles.securityPanel}>
        <header><div><p>COUNT RECORDS</p><h2>Counts and audit history</h2></div><span>0 open · 4 closed or cancelled</span></header>
        <div className={styles.securityFilters}><label>Search<input disabled placeholder="Count, case, store, or staff" /></label><label>Status<select disabled><option>All statuses</option></select></label></div>
        <div className={styles.securityCountRow}><strong>CNT-20260828-0027</strong><span>Bridal Case 1 morning cycle</span><span>Jordan Lee</span><span>12 / 12</span><em>Closed</em></div>
        <div className={styles.securityCountRow}><strong>CNT-20260828-0024</strong><span>Diamond Vault opening count</span><span>Priya Shah</span><span>28 / 28</span><em>Closed</em></div>
      </div>
      <div className={styles.securityPanel}>
        <header><div><p>OPERATIONAL REPORTING</p><h2>Count activity and accountability</h2></div><span>Read-only evidence across allowed stores</span></header>
        <p className={styles.securityReportCopy}>Filter by start date and capture method to review immutable activity, variance, source method, and operator evidence.</p>
      </div>
    </section>
  );
}

function CountSetup({ onStart }: { onStart: () => void }) {
  return (
    <section className={styles.securityPanel}>
      <header><div><p>START A COUNT</p><h2>Freeze the expected case population</h2></div><span>Sample setup</span></header>
      <div className={styles.securityTypeGrid}>
        <button disabled type="button"><strong>Full store count</strong><span>All active physical custody</span></button>
        <button disabled type="button"><strong>Filtered count</strong><span>Rules across categories or locations</span></button>
        <button className={styles.securityTypeActive} disabled type="button"><strong>Cycle count</strong><span>One active inventory location</span></button>
        <button disabled type="button"><strong>Blind cycle count</strong><span>Hide expected quantity from operator</span></button>
      </div>
      <div className={styles.securitySetupGrid}>
        <ReadField label="Count type" value="Cycle count" /><ReadField label="Count name" value="Bridal Case 3 afternoon cycle" />
        <ReadField label="Inventory location" value="Bridal Case 3" /><ReadField label="Assigned operator" value="Jordan Lee" />
        <ReadField label="Count note" value="Afternoon case audit before shift change" wide /><ReadField label="Expected snapshot" value={`${EXPECTED_ITEMS} items · ${money(EXPECTED_VALUE)}`} wide />
      </div>
      <div className={styles.securitySnapshotNote}><span>i</span><p><strong>Expected items are snapshotted now.</strong>A later transfer, price change, or status change cannot alter this count’s variance.</p></div>
      <button className={`${styles.securityPrimaryButton} ${styles.guidedTarget}`} data-security-guide-target="true" onClick={onStart} type="button">Start Cycle Count →</button>
    </section>
  );
}

function RfidCapture({ onScan }: { onScan: () => void }) {
  return (
    <section className={styles.securityPanel}>
      <header><div><p>{COUNT_ID}</p><h2>Bridal Case 3 afternoon cycle</h2></div><span>Jordan Lee · Started 3:00 PM</span></header>
      <div className={styles.securityProgressCards}>
        <div><span>EXPECTED</span><strong>{EXPECTED_ITEMS}</strong><small>{money(EXPECTED_VALUE)}</small></div>
        <div><span>CAPTURED</span><strong>0</strong><small>RFID reader ready</small></div>
        <div><span>VARIANCE</span><strong>—</strong><small>Scan not started</small></div>
      </div>
      <div className={styles.securityScanner}>
        <div className={styles.securityScannerRings}><i /><i /><span>RFID</span></div>
        <h3>Reader connected · Bridal Case 3</h3><p>The simulated read will capture every responding tag and retain RFID as the source method.</p>
        <button className={styles.guidedTarget} data-security-guide-target="true" onClick={onScan} type="button">⌁ Scan Case with RFID</button>
      </div>
      <div className={styles.securityCaptureMethods}><span>Capture methods:</span><strong>Barcode scan</strong><strong>Entered by hand</strong><strong className={styles.securityCaptureActive}>RFID read</strong><strong>Legacy scan</strong></div>
    </section>
  );
}

function VarianceReview({ onReview }: { onReview: () => void }) {
  return (
    <section className={styles.securityPanel}>
      <header><div><p>{COUNT_ID}</p><h2>Count capture complete</h2></div><span className={styles.securityVariancePill}>1 VARIANCE</span></header>
      <div className={styles.securityProgressCards}>
        <div><span>EXPECTED</span><strong>{EXPECTED_ITEMS}</strong><small>{money(EXPECTED_VALUE)}</small></div>
        <div><span>SCANNED</span><strong>{SCANNED_ITEMS}</strong><small>{money(SCANNED_VALUE)} · RFID read</small></div>
        <div className={styles.securityVarianceCard}><span>MISSING</span><strong>1</strong><small>{money(MISSING_ITEM_VALUE)}</small></div>
      </div>
      <div className={styles.securityScanList}>
        <div className={styles.securityScanHeading}><span>ITEM</span><span>DESCRIPTION</span><span>CAPTURE</span><span>RESULT</span></div>
        {scannedItems.map(([item, title, retail]) => <div key={item}><strong>{item}</strong><span>{title} · {retail}</span><span>RFID read</span><em>✓ Matched</em></div>)}
        <div className={styles.securityMissingRow}><strong>{MISSING_ITEM}</strong><span>18K White Gold Oval Diamond Halo Engagement Ring · {money(MISSING_ITEM_VALUE)}</span><span>No response</span><em>Missing</em></div>
      </div>
      <button className={`${styles.securityPrimaryButton} ${styles.guidedTarget}`} data-security-guide-target="true" onClick={onReview} type="button">Review Missing Item →</button>
    </section>
  );
}

function MovementEvidence({ onUseEvidence }: { onUseEvidence: () => void }) {
  return (
    <section className={styles.securityPanel}>
      <header><div><p>VARIANCE INVESTIGATION</p><h2>{MISSING_ITEM}</h2></div><span className={styles.securityVariancePill}>MISSING FROM CASE</span></header>
      <div className={styles.securityItemSummary}>
        <div className={styles.securityItemMark}>◇</div>
        <div><strong>18K White Gold Oval Diamond Halo Engagement Ring</strong><span>Simon G. · MR2362-W · Serial SG-88421-26</span></div>
        <div><span>SNAPSHOT LOCATION</span><strong>Bridal Case 3</strong><small>{money(MISSING_ITEM_VALUE)}</small></div>
      </div>
      <div className={styles.securityEvidenceGrid}>
        <div className={styles.securityEvidenceTimeline}>
          <p><span>11:42 AM</span><strong>Received into Bridal Case 3</strong>Jordan Lee · RFID 3034A7B21C0098</p>
          <p><span>3:00 PM</span><strong>Cycle count snapshot frozen</strong>Expected in Bridal Case 3 · {COUNT_ID}</p>
          <p className={styles.securityEvidenceFound}><span>3:12 PM</span><strong>Authorized POS viewing checkout</strong>Jordan Lee · POS Viewing Tray 1 · customer presentation</p>
          <p><span>3:14 PM</span><strong>Bridal Case 3 RFID read</strong>No response · item remains a variance against the frozen snapshot</p>
        </div>
        <div className={styles.securityEvidenceCallout}><span>✓</span><h3>Item location is supported by signed evidence.</h3><p>The piece left the case after the 3:00 PM snapshot under Jordan Lee’s authorized checkout. Linkd keeps the variance instead of rewriting the count.</p><dl><div><dt>LAST ACTOR</dt><dd>Jordan Lee</dd></div><div><dt>VERIFIED LOCATION</dt><dd>POS Viewing Tray 1</dd></div><div><dt>CAPTURE SOURCE</dt><dd>Authorized checkout</dd></div></dl></div>
      </div>
      <button className={`${styles.securityPrimaryButton} ${styles.guidedTarget}`} data-security-guide-target="true" onClick={onUseEvidence} type="button">Use This Evidence →</button>
    </section>
  );
}

function VarianceResolution({ onResolve }: { onResolve: () => void }) {
  return (
    <section className={styles.securityPanel}>
      <header><div><p>RESOLVE VARIANCE</p><h2>Record the accountable outcome</h2></div><span>{MISSING_ITEM}</span></header>
      <div className={styles.securityResolutionOptions}>
        <button disabled type="button"><span>○</span><div><strong>Item found in counted location</strong><small>RFID or manual verification inside the case</small></div></button>
        <button className={styles.securityResolutionActive} disabled type="button"><span>●</span><div><strong>Verified in authorized temporary location</strong><small>Retain variance and attach responsible movement evidence</small></div></button>
        <button disabled type="button"><span>○</span><div><strong>Escalate as unresolved missing item</strong><small>Keep count open for manager or security review</small></div></button>
      </div>
      <div className={styles.securitySetupGrid}>
        <ReadField label="Resolution" value="Verified in authorized temporary location" wide />
        <ReadField label="Verified location" value="POS Viewing Tray 1" /><ReadField label="Responsible employee" value="Jordan Lee" />
        <ReadField label="Resolution note" value="Customer presentation checkout at 3:12 PM; item physically verified in secured POS tray." wide />
      </div>
      <div className={styles.securitySnapshotNote}><span>i</span><p><strong>No automatic inventory adjustment.</strong>The resolution reconciles this count while preserving the frozen expectation and the signed location evidence.</p></div>
      <button className={`${styles.securityPrimaryButton} ${styles.guidedTarget}`} data-security-guide-target="true" onClick={onResolve} type="button">Resolve Variance with Evidence →</button>
    </section>
  );
}

function CloseCount({ onClose }: { onClose: () => void }) {
  return (
    <section className={styles.securityPanel}>
      <header><div><p>COUNT READY TO CLOSE</p><h2>Bridal Case 3 reconciled</h2></div><span className={styles.securityResolvedPill}>0 UNRESOLVED</span></header>
      <div className={styles.securityCloseSummary}>
        <div><span>EXPECTED</span><strong>12</strong><small>Frozen at 3:00 PM</small></div><div><span>RFID MATCHED</span><strong>11</strong><small>{money(SCANNED_VALUE)}</small></div><div><span>RESOLVED</span><strong>1</strong><small>Signed movement evidence</small></div><div><span>UNRESOLVED</span><strong>0</strong><small>No inventory adjustments</small></div>
      </div>
      <div className={styles.securityCloseChecklist}>
        <p><span>✓</span><strong>Expected population frozen</strong>{EXPECTED_ITEMS} items · {money(EXPECTED_VALUE)}</p>
        <p><span>✓</span><strong>Capture evidence retained</strong>{SCANNED_ITEMS} RFID reads · reader and timestamps saved</p>
        <p><span>✓</span><strong>Variance reviewed</strong>{MISSING_ITEM} · authorized POS Viewing Tray 1 checkout</p>
        <p><span>✓</span><strong>Operator accountable</strong>Jordan Lee · count and resolution actions connected</p>
      </div>
      <button className={`${styles.securityPrimaryButton} ${styles.guidedTarget}`} data-security-guide-target="true" onClick={onClose} type="button">Close Cycle Count →</button>
    </section>
  );
}

function SecurityComplete({ onExit }: { onExit: () => void }) {
  return (
    <section className={styles.securityComplete} data-security-complete tabIndex={-1}>
      <header><span>✓</span><div><p>COUNT CLOSED</p><h1>{COUNT_ID}</h1><small>Bridal Case 3 afternoon cycle · Closed 3:18 PM</small></div><strong>● Reconciled</strong></header>
      <div className={styles.securityCompleteKpis}><div><span>EXPECTED</span><strong>12</strong><small>{money(EXPECTED_VALUE)}</small></div><div><span>RFID MATCHED</span><strong>11</strong><small>{money(SCANNED_VALUE)}</small></div><div><span>RESOLVED</span><strong>1</strong><small>{MISSING_ITEM}</small></div><div><span>UNRESOLVED</span><strong>0</strong><small>No adjustment posted</small></div></div>
      <div className={styles.securityAuditTrail}>
        <p><span>3:00 PM</span><strong>Cycle count started</strong>Jordan Lee · Bridal Case 3 · expected snapshot frozen</p>
        <p><span>3:14 PM</span><strong>RFID capture completed</strong>11 matched · 1 missing · source method retained</p>
        <p><span>3:16 PM</span><strong>Variance resolved with evidence</strong>{MISSING_ITEM} verified in POS Viewing Tray 1 · responsible employee retained</p>
        <p><span>3:18 PM</span><strong>Count closed</strong>0 unresolved · immutable audit record created</p>
      </div>
      <ul><li><span>✓</span><p><strong>Count history updated</strong>The closed record is searchable by count, case, store, staff, status, date, and capture method.</p></li><li><span>✓</span><p><strong>Inventory truth protected</strong>The exception did not silently move or adjust {MISSING_ITEM}.</p></li><li><span>✓</span><p><strong>Owner view updated</strong>One variance resolved, zero unresolved, and no loss or adjustment posted.</p></li><li><span>✓</span><p><strong>Security evidence retained</strong>RFID reads, timestamps, operator, movement, and resolution remain connected.</p></li></ul>
      <button onClick={onExit} type="button">Choose another workflow</button>
    </section>
  );
}

function ReadField({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return <label className={wide ? styles.securityFieldWide : undefined}><span>{label}</span><input readOnly value={value} /></label>;
}
