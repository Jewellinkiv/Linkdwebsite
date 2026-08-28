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

const guideSteps = [
  { title: "Open the scheduled count", instruction: "Open today’s assigned Bridal Case 3 count from Inventory › Physical Inventory › Count Schedules." },
  { title: "Start the scheduled case count", instruction: "Confirm the operator and freeze the twelve-item expectation before scanning the case." },
  { title: "Scan Bridal Case 3", instruction: "Run the simulated RFID read. Eleven tags respond and one expected piece does not." },
  { title: "Acknowledge the missing-item alert", instruction: "Linkd records the piece as Missing — Count Exception and leaves the scheduled count open." },
  { title: "Open the missing-item record", instruction: "Review the persistent exception in Case Security before starting an investigation." },
  { title: "Review the audit trail", instruction: "Use Security Log evidence to find the last known custody. Evidence tells the team where to look; it does not clear the exception." },
  { title: "Physically scan the found piece", instruction: "Verify the item at POS Viewing Tray 1 with its RFID tag before reconciling the count." },
  { title: "Close the scheduled count", instruction: "Close the reconciled count with the original variance, physical re-scan, operator, and timestamps preserved." },
];

function money(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export default function InventorySecurityStory({ onComplete, onExit }: InventorySecurityStoryProps) {
  const [step, setStep] = useState(0);
  const completionSent = useRef(false);
  const storyRef = useRef<HTMLElement>(null);
  const isComplete = step >= 8;
  const currentGuide = guideSteps[Math.min(step, guideSteps.length - 1)];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const target = storyRef.current?.querySelector<HTMLElement>(
        isComplete ? "[data-security-complete]" : '[data-security-guide-target="true"]',
      );
      if (!target) return;
      target.focus({ preventScroll: true });
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
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
    if (step !== 7 || completionSent.current) return;
    completionSent.current = true;
    setStep(8);
    onComplete();
  }

  return (
    <section aria-label="Guided Inventory Security workflow" className={`${styles.repairStory} ${styles.invoiceStory}`} ref={storyRef}>
      <div className={styles.saleGuide} aria-live="polite">
        <div className={styles.saleGuideProgress}>
          <span>{isComplete ? "STORY COMPLETE" : `STEP ${step + 1} OF 8`}</span>
          <div aria-label="Inventory security walkthrough progress" aria-valuemax={8} aria-valuemin={0} aria-valuenow={Math.min(step, 8)} role="progressbar">
            <i style={{ width: `${(Math.min(step, 8) / 8) * 100}%` }} />
          </div>
        </div>
        <div className={styles.saleGuideCopy}>
          <strong>{isComplete ? "Scheduled count closed" : currentGuide.title}</strong>
          <p>{isComplete ? "The missing status was cleared only after a physical re-scan, and the complete exception history remains in the audit record." : currentGuide.instruction}</p>
        </div>
        <div className={styles.saleGuideActions}>
          <span>Guided Demo · Sample Data</span>
          <button type="button" onClick={onExit}>Choose workflows</button>
          <button type="button" onClick={restartStory}>Restart</button>
        </div>
      </div>

      <div className={styles.repairServicesWorkspace}>
        <SecurityNavigation active={step === 0 ? "schedules" : "security"} />
        <main className={`${styles.repairServicesMain} ${styles.invoiceMain}`}>
          {isComplete ? <SecurityComplete onExit={onExit} /> : (
            <>
              <header className={styles.securityHeader}>
                <div>
                  <p>PHYSICAL INVENTORY</p>
                  <h1>{step === 0 ? "Count Schedules" : "Case Security"}</h1>
                  <span>{step === 0 ? "Manage recurring physical inventory assignments and today’s scheduled counts." : "Review secure case counts, missing-item exceptions, and audit history."}</span>
                </div>
                {step === 0 ? <span className={styles.securityOpenPill}>● 1 DUE NOW</span> : (
                  <span className={step >= 7 ? styles.securityResolvedPill : styles.securityVariancePill}>
                    {step >= 7 ? "● LOCATED — RECONCILED" : "● MISSING — COUNT EXCEPTION"}
                  </span>
                )}
              </header>
              {step === 0 ? <CountSchedules onOpen={() => setStep(1)} />
                : step === 1 ? <ScheduledCountSetup onStart={() => setStep(2)} />
                : step === 2 ? <RfidCapture onScan={() => setStep(3)} />
                : step === 3 ? <MissingAlert onAcknowledge={() => setStep(4)} />
                : step === 4 ? <MissingItemsQueue onInvestigate={() => setStep(5)} />
                : step === 5 ? <MovementEvidence onVerify={() => setStep(6)} />
                : step === 6 ? <PhysicalRescan onScan={() => setStep(7)} />
                : <CloseCount onClose={closeCount} />}
            </>
          )}
        </main>
      </div>
    </section>
  );
}

function SecurityNavigation({ active }: { active: "schedules" | "security" }) {
  return (
    <aside className={styles.repairServicesNav}>
      <strong>INVENTORY</strong>
      <nav aria-label="Inventory workspace">
        <span>Items</span><span>Categories</span><span>Vendors</span><span>Vendor Returns</span><span>Purchase Orders</span><span>Locations</span>
        <small>PHYSICAL INVENTORY</small>
        <span className={active === "security" ? styles.repairServiceNavActive : undefined}>Case Security</span>
        <span className={active === "schedules" ? styles.repairServiceNavActive : undefined}>Count Schedules</span>
        <small>ANALYTICS</small><span>Transfers</span><span>Special Orders</span>
        <small>OPERATIONS</small><span>Trade-In Management</span>
      </nav>
    </aside>
  );
}

function CountSchedules({ onOpen }: { onOpen: () => void }) {
  return (
    <section className={styles.securityLanding}>
      <div className={styles.securityKpis}>
        <div><span>DUE NOW</span><strong>1</strong><small>Assigned to Jordan Lee</small></div>
        <div><span>UPCOMING</span><strong>2</strong><small>Today · Corporate</small></div>
        <div><span>COMPLETED</span><strong>4</strong><small>All scheduled counts</small></div>
      </div>
      <div className={styles.securityPanel}>
        <header><div><p>TODAY · AUGUST 28</p><h2>Scheduled counts</h2></div><span>Corporate · America/New_York</span></header>
        <div className={styles.securityScheduleCard}>
          <div><span>3:00 PM</span><strong>Bridal Case 3 afternoon cycle</strong><small>Cycle count · Assigned to Jordan Lee</small></div>
          <div><span>LOCATION</span><strong>Bridal Case 3</strong><small>Expected population freezes when started</small></div>
          <em>Due now</em>
          <button className={styles.guidedTarget} data-security-guide-target="true" onClick={onOpen} type="button">Open scheduled count →</button>
        </div>
        <div className={`${styles.securityScheduleCard} ${styles.securityScheduleMuted}`}>
          <div><span>4:30 PM</span><strong>Bridal Case 5 blind cycle</strong><small>Blind cycle count · Assigned to Priya Shah</small></div>
          <div><span>LOCATION</span><strong>Bridal Case 5</strong><small>Upcoming</small></div>
          <em>Scheduled</em>
          <button disabled type="button">Open →</button>
        </div>
      </div>
    </section>
  );
}

function ScheduledCountSetup({ onStart }: { onStart: () => void }) {
  return (
    <section className={styles.securityPanel}>
      <header><div><p>SCHEDULED COUNT</p><h2>Bridal Case 3 afternoon cycle</h2></div><span>Due 3:00 PM · Corporate</span></header>
      <div className={styles.securitySetupGrid}>
        <ReadField label="Count type" value="Cycle count" /><ReadField label="Schedule" value="Weekdays at 3:00 PM" />
        <ReadField label="Inventory location" value="Bridal Case 3" /><ReadField label="Assigned operator" value="Jordan Lee" />
        <ReadField label="Count note" value="Afternoon case audit before shift change" wide /><ReadField label="Expected on start" value={`${EXPECTED_ITEMS} items · ${money(EXPECTED_VALUE)}`} wide />
      </div>
      <div className={styles.securitySnapshotNote}><span>i</span><p><strong>Starting freezes the expected population.</strong>A later transfer, price change, or status change cannot silently rewrite this count’s variance.</p></div>
      <button className={`${styles.securityPrimaryButton} ${styles.guidedTarget}`} data-security-guide-target="true" onClick={onStart} type="button">Start Scheduled Count →</button>
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
        <h3>Reader connected · Bridal Case 3</h3><p>The simulated read captures responding tags and retains RFID as the source method.</p>
        <button className={styles.guidedTarget} data-security-guide-target="true" onClick={onScan} type="button">⌁ Scan Case with RFID</button>
      </div>
      <div className={styles.securityCaptureMethods}><span>Capture methods:</span><strong>Barcode scan</strong><strong>Entered by hand</strong><strong className={styles.securityCaptureActive}>RFID read</strong><strong>Legacy scan</strong></div>
    </section>
  );
}

function MissingAlert({ onAcknowledge }: { onAcknowledge: () => void }) {
  return (
    <section className={styles.securityPanel}>
      <header><div><p>{COUNT_ID}</p><h2>Scan complete — exception found</h2></div><span className={styles.securityVariancePill}>1 MISSING</span></header>
      <div className={styles.securityProgressCards}>
        <div><span>EXPECTED</span><strong>{EXPECTED_ITEMS}</strong><small>{money(EXPECTED_VALUE)}</small></div>
        <div><span>SCANNED</span><strong>{SCANNED_ITEMS}</strong><small>{money(SCANNED_VALUE)} · RFID read</small></div>
        <div className={styles.securityVarianceCard}><span>MISSING</span><strong>1</strong><small>{money(MISSING_ITEM_VALUE)}</small></div>
      </div>
      <div className={styles.securityExceptionAlert} role="alert">
        <span>!</span><div><p>INVENTORY SECURITY ALERT</p><h3>One expected piece did not respond.</h3><strong>{MISSING_ITEM} · 18K White Gold Oval Diamond Halo Engagement Ring</strong><small>Status changed to Missing — Count Exception at 3:14 PM. The count stays open until the piece is physically verified or escalated.</small></div>
      </div>
      <button className={`${styles.securityPrimaryButton} ${styles.guidedTarget}`} data-security-guide-target="true" onClick={onAcknowledge} type="button">View Missing Status →</button>
    </section>
  );
}

function MissingItemsQueue({ onInvestigate }: { onInvestigate: () => void }) {
  return (
    <section className={styles.securityPanel}>
      <header><div><p>CASE SECURITY</p><h2>Missing items</h2></div><span>1 active exception</span></header>
      <div className={styles.securityScanList}>
        <div className={styles.securityMissingQueueHeading}><span>ITEM</span><span>LAST EXPECTED LOCATION</span><span>COUNT</span><span>STATUS</span></div>
        <div className={styles.securityMissingRow}><strong>{MISSING_ITEM}<small>Oval Diamond Halo Ring · Simon G.</small></strong><span>Bridal Case 3</span><span>{COUNT_ID}<small>3:14 PM · Jordan Lee</small></span><em>Missing — Count Exception</em></div>
      </div>
      <div className={styles.securitySnapshotNote}><span>i</span><p><strong>This status persists outside the count screen.</strong>If the piece is not physically re-scanned, it remains Missing and can be escalated for manager or security review.</p></div>
      <button className={`${styles.securityPrimaryButton} ${styles.guidedTarget}`} data-security-guide-target="true" onClick={onInvestigate} type="button">Investigate Missing Item →</button>
    </section>
  );
}

function MovementEvidence({ onVerify }: { onVerify: () => void }) {
  return (
    <section className={styles.securityPanel}>
      <header><div><p>REPORTS › OPERATIONS › SECURITY LOG</p><h2>{MISSING_ITEM} audit trail</h2></div><span className={styles.securityVariancePill}>MISSING — COUNT EXCEPTION</span></header>
      <div className={styles.securityItemSummary}>
        <div className={styles.securityItemMark}>◇</div>
        <div><strong>18K White Gold Oval Diamond Halo Engagement Ring</strong><span>Simon G. · MR2362-W · Serial SG-88421-26 · RFID 3034A7B21C0098</span></div>
        <div><span>EXPECTED LOCATION</span><strong>Bridal Case 3</strong><small>{money(MISSING_ITEM_VALUE)}</small></div>
      </div>
      <div className={styles.securityEvidenceGrid}>
        <div className={styles.securityEvidenceTimeline}>
          <p><span>11:42 AM</span><strong>Received into Bridal Case 3</strong>Jordan Lee · station INV-02 · status Success · source Audit event</p>
          <p><span>3:00 PM</span><strong>Scheduled count snapshot frozen</strong>Jordan Lee · station INV-02 · permission inventory.count.start · status Recorded</p>
          <p className={styles.securityEvidenceFound}><span>3:12 PM</span><strong>Authorized POS viewing checkout</strong>Jordan Lee · station POS-03 · permission inventory.viewing.checkout · status Recorded</p>
          <p><span>3:14 PM</span><strong>Bridal Case 3 RFID read</strong>No response · status Warning · source Audit event</p>
        </div>
        <div className={styles.securityEvidenceCallout}><span>!</span><h3>Last known custody: POS Viewing Tray 1</h3><p>The audit trail directs the team to a controlled location. It does not prove the piece is still there or clear its Missing status.</p><dl><div><dt>LAST ACTOR</dt><dd>Jordan Lee</dd></div><div><dt>STATION</dt><dd>POS-03</dd></div><div><dt>NEXT REQUIRED ACTION</dt><dd>Physical RFID or barcode scan</dd></div></dl></div>
      </div>
      <button className={`${styles.securityPrimaryButton} ${styles.guidedTarget}`} data-security-guide-target="true" onClick={onVerify} type="button">Verify at POS Viewing Tray 1 →</button>
    </section>
  );
}

function PhysicalRescan({ onScan }: { onScan: () => void }) {
  return (
    <section className={styles.securityPanel}>
      <header><div><p>PHYSICAL VERIFICATION</p><h2>Scan the found piece</h2></div><span className={styles.securityVariancePill}>STATUS STILL MISSING</span></header>
      <div className={styles.securityItemSummary}>
        <div className={styles.securityItemMark}>◇</div>
        <div><strong>{MISSING_ITEM} · Oval Diamond Halo Engagement Ring</strong><span>Serial SG-88421-26 · Expected RFID 3034A7B21C0098</span></div>
        <div><span>VERIFY AT</span><strong>POS Viewing Tray 1</strong><small>Station POS-03</small></div>
      </div>
      <div className={styles.securityScanner}>
        <div className={styles.securityScannerRings}><i /><i /><span>RFID</span></div>
        <h3>Physical reader ready</h3><p>Scanning the tag confirms the actual piece, location, station, operator, and time. Audit evidence alone cannot perform this step.</p>
        <button className={styles.guidedTarget} data-security-guide-target="true" onClick={onScan} type="button">⌁ Scan Found Item · 3034A7B21C0098</button>
      </div>
      <div className={styles.securitySnapshotNote}><span>i</span><p><strong>No automatic inventory adjustment.</strong>The physical read reconciles the exception against the frozen count without silently moving or rewriting the item record.</p></div>
    </section>
  );
}

function CloseCount({ onClose }: { onClose: () => void }) {
  return (
    <section className={styles.securityPanel}>
      <header><div><p>COUNT READY TO CLOSE</p><h2>Bridal Case 3 reconciled</h2></div><span className={styles.securityResolvedPill}>0 UNRESOLVED</span></header>
      <div className={styles.securityCloseSummary}>
        <div><span>EXPECTED</span><strong>12</strong><small>Frozen at 3:00 PM</small></div><div><span>INITIAL SCAN</span><strong>11</strong><small>{money(SCANNED_VALUE)}</small></div><div><span>PHYSICALLY RE-SCANNED</span><strong>1</strong><small>POS Viewing Tray 1</small></div><div><span>UNRESOLVED</span><strong>0</strong><small>Missing status cleared</small></div>
      </div>
      <div className={styles.securityCloseChecklist}>
        <p><span>✓</span><strong>Expected population frozen</strong>{EXPECTED_ITEMS} items · {money(EXPECTED_VALUE)}</p>
        <p><span>✓</span><strong>Missing exception retained</strong>{MISSING_ITEM} entered Missing — Count Exception at 3:14 PM</p>
        <p><span>✓</span><strong>Physical verification recorded</strong>RFID 3034A7B21C0098 read at POS-03 · 3:17 PM</p>
        <p><span>✓</span><strong>Audit trail connected</strong>Jordan Lee · scheduled count, checkout, exception, re-scan, and reconciliation</p>
      </div>
      <button className={`${styles.securityPrimaryButton} ${styles.guidedTarget}`} data-security-guide-target="true" onClick={onClose} type="button">Close Scheduled Count →</button>
    </section>
  );
}

function SecurityComplete({ onExit }: { onExit: () => void }) {
  return (
    <section className={styles.securityComplete} data-security-complete tabIndex={-1}>
      <header><span>✓</span><div><p>COUNT CLOSED</p><h1>{COUNT_ID}</h1><small>Bridal Case 3 afternoon cycle · Closed 3:18 PM</small></div><strong>● Reconciled</strong></header>
      <div className={styles.securityCompleteKpis}><div><span>EXPECTED</span><strong>12</strong><small>{money(EXPECTED_VALUE)}</small></div><div><span>INITIAL SCAN</span><strong>11</strong><small>{money(SCANNED_VALUE)}</small></div><div><span>RE-SCANNED</span><strong>1</strong><small>{MISSING_ITEM}</small></div><div><span>UNRESOLVED</span><strong>0</strong><small>Missing status cleared</small></div></div>
      <div className={styles.securityAuditTrail}>
        <p><span>3:00 PM</span><strong>Scheduled count started</strong>Jordan Lee · Bridal Case 3 · expected snapshot frozen</p>
        <p><span>3:14 PM</span><strong>Missing status set</strong>{MISSING_ITEM} · Missing — Count Exception · security alert created</p>
        <p><span>3:15 PM</span><strong>Security Log reviewed</strong>Last known custody POS Viewing Tray 1 · physical verification required</p>
        <p><span>3:17 PM</span><strong>Physical re-scan matched</strong>RFID 3034A7B21C0098 · station POS-03 · Jordan Lee</p>
        <p><span>3:18 PM</span><strong>Missing status cleared and count closed</strong>0 unresolved · immutable audit record created</p>
      </div>
      <ul><li><span>✓</span><p><strong>Count history updated</strong>The closed scheduled count remains searchable by count, case, store, staff, status, date, and capture method.</p></li><li><span>✓</span><p><strong>Inventory truth protected</strong>The exception stayed Missing until {MISSING_ITEM} was physically scanned.</p></li><li><span>✓</span><p><strong>Owner view updated</strong>One security exception reconciled, zero unresolved, and no loss or adjustment posted.</p></li><li><span>✓</span><p><strong>Security evidence retained</strong>RFID reads, timestamps, operator, permission, station, source, and status remain connected.</p></li></ul>
      <button onClick={onExit} type="button">Choose another workflow</button>
    </section>
  );
}

function ReadField({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return <label className={wide ? styles.securityFieldWide : undefined}><span>{label}</span><input readOnly value={value} /></label>;
}
