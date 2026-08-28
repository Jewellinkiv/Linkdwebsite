"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import styles from "./guided-demo.module.css";

type RepairStoryProps = {
  onComplete: () => void;
  onExit: () => void;
  onBenchChange: (isAtBench: boolean) => void;
};

type SkuDecision = "included" | "excluded";

const repairSkus = [
  {
    code: "RP-PRONG-02",
    name: "Rebuild 2 prongs & tighten center stone",
    detail: "Bench labor · quantity 1",
    reason: "Loose center stone · 2 worn prongs",
    price: 42_500,
    required: true,
  },
  {
    code: "CLN-POLISH-01",
    name: "Clean & polish",
    detail: "Finishing service · quantity 1",
    reason: "Surface scratches on shank",
    price: 7_500,
    required: false,
  },
] as const;

type RepairSku = (typeof repairSkus)[number];

const TAX_RATE_BPS = 825;
const DEPOSIT = 25_000;

const intakePhotos = [
  { label: "TOP", mark: "◇" },
  { label: "PROFILE", mark: "◇" },
  { label: "HALLMARK", mark: "14K" },
] as const;

const guideSteps = [
  {
    title: "Select the customer",
    instruction:
      "Choose Maya Thompson so the service, deposit, and pickup stay on one customer record.",
  },
  {
    title: "Start the repair intake",
    instruction:
      "Use Add Service from the POS cart—the same entry point used at the Linkd counter.",
  },
  {
    title: "Add the intake photos",
    instruction:
      "Attach three simulated condition photos before the piece enters store custody.",
  },
  {
    title: "Ask Linkd to suggest repair SKUs",
    instruction:
      "Use the repair request to find matching catalog SKUs. The result stays editable.",
  },
  {
    title: "Review the suggested tasks",
    instruction:
      "Include or exclude each suggested SKU, review the evidence and promise fields, then add the service to the sale.",
  },
  {
    title: "Collect the deposit",
    instruction:
      "Tender Maya’s $250 demo Visa deposit. The remaining balance follows the job to pickup.",
  },
  {
    title: "Create the repair",
    instruction:
      "Complete the POS transaction to create R-0317 and send it to In-house Bench 2.",
  },
  {
    title: "Prepare the pickup",
    instruction:
      "Apply the simulated bench update, mark the repair ready, and prepare Maya’s pickup notice.",
  },
];

function money(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default function RepairStory({ onComplete, onExit, onBenchChange }: RepairStoryProps) {
  const [step, setStep] = useState(0);
  const [skuDecisions, setSkuDecisions] = useState<Record<string, SkuDecision>>({});
  const completionSent = useRef(false);
  const storyRef = useRef<HTMLElement>(null);

  const isIntakeOpen = step >= 2 && step <= 4;
  const isAtBench = step >= 7;
  const isComplete = step >= 8;
  const currentGuide = guideSteps[Math.min(step, guideSteps.length - 1)];
  const requiredRepairSku = repairSkus.find((sku) => sku.required) ?? repairSkus[0];
  const allSkusReviewed = Object.keys(skuDecisions).length === repairSkus.length;
  const hasRequiredRepair = skuDecisions[requiredRepairSku.code] === "included";
  const canAddToSale = allSkusReviewed && hasRequiredRepair;
  const nextSkuToReview =
    repairSkus.find((sku) => !skuDecisions[sku.code])
    ?? (!hasRequiredRepair ? requiredRepairSku : undefined);
  const includedSkus = repairSkus.filter((sku) => skuDecisions[sku.code] === "included");
  const workSubtotal = includedSkus.reduce((sum, sku) => sum + sku.price, 0);
  const tax = Math.round((workSubtotal * TAX_RATE_BPS) / 10_000);
  const estimateTotal = workSubtotal + tax;
  const deposit = Math.min(DEPOSIT, estimateTotal);
  const pickupBalance = estimateTotal - deposit;
  const hasOpenDialog = step === 0 || isIntakeOpen;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const target = storyRef.current?.querySelector<HTMLElement>(
        isComplete ? "[data-repair-complete]" : '[data-repair-guide-target="true"]',
      );

      if (!target) return;

      target.focus({ preventScroll: true });
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "center",
      });
    }, 40);

    return () => window.clearTimeout(timer);
  }, [canAddToSale, isComplete, nextSkuToReview?.code, step]);

  function restartRepair() {
    completionSent.current = false;
    setSkuDecisions({});
    onBenchChange(false);
    setStep(0);
  }

  function cancelIntake() {
    setSkuDecisions({});
    setStep(1);
  }

  function setSkuDecision(skuCode: string, decision: SkuDecision) {
    if (step !== 4) return;
    setSkuDecisions((current) => ({ ...current, [skuCode]: decision }));
  }

  function addServiceToSale() {
    if (step !== 4 || !canAddToSale) return;
    setStep(5);
  }

  function createRepair() {
    if (step !== 6) return;
    onBenchChange(true);
    setStep(7);
  }

  function finishRepair() {
    if (step !== 7 || completionSent.current) return;
    completionSent.current = true;
    setStep(8);
    onComplete();
  }

  return (
    <section
      aria-label="Guided Repair Intake & Management workflow"
      className={styles.repairStory}
      ref={storyRef}
    >
      <div className={styles.saleGuide} aria-live="polite">
        <div className={styles.saleGuideProgress}>
          <span>{isComplete ? "STORY COMPLETE" : `STEP ${step + 1} OF 8`}</span>
          <div
            aria-label="Repair walkthrough progress"
            aria-valuemax={8}
            aria-valuemin={0}
            aria-valuenow={Math.min(step, 8)}
            role="progressbar"
          >
            <i style={{ width: `${(Math.min(step, 8) / 8) * 100}%` }} />
          </div>
        </div>
        <div className={styles.saleGuideCopy}>
          <strong>{isComplete ? "Repair ready for pickup" : currentGuide.title}</strong>
          <p>
            {isComplete
              ? "The customer, intake evidence, repair tasks, payment, bench history, and pickup are connected."
              : currentGuide.instruction}
          </p>
        </div>
        <div className={styles.saleGuideActions}>
          <span>Guided Demo · Sample Data</span>
          <button type="button" onClick={onExit}>Choose workflows</button>
          <button type="button" onClick={restartRepair}>Restart</button>
        </div>
      </div>

      {isAtBench ? (
        <RepairServicesWorkspace
          deposit={deposit}
          estimateTotal={estimateTotal}
          includedSkus={includedSkus}
          isComplete={isComplete}
          onExit={onExit}
          onReady={finishRepair}
          pickupBalance={pickupBalance}
        />
      ) : (
        <div aria-hidden={hasOpenDialog} inert={hasOpenDialog}>
          <RepairPosWorkspace
            deposit={deposit}
            estimateTotal={estimateTotal}
            includedSkus={includedSkus}
            onAddService={() => setStep(2)}
            onCompleteSale={createRepair}
            onTender={() => setStep(6)}
            pickupBalance={pickupBalance}
            step={step}
            tax={tax}
            workSubtotal={workSubtotal}
          />
        </div>
      )}

      {step === 0 ? (
        <RepairDialog eyebrow="CLIENT SEARCH" title="Select Client" onClose={onExit}>
          <button
            className={styles.salePickerResult}
            data-repair-guide-target="true"
            onClick={() => setStep(1)}
            type="button"
          >
            <span>MT</span>
            <p>
              <strong>Maya Thompson</strong>
              <small>C-20718 · (555) 014-6208 · 2 completed repairs</small>
            </p>
            <i>Choose →</i>
          </button>
        </RepairDialog>
      ) : null}

      {isIntakeOpen ? (
        <RepairIntakeModal
          canAddToSale={canAddToSale}
          deposit={deposit}
          hasPhotos={step >= 3}
          hasRequiredRepair={hasRequiredRepair}
          hasSuggestions={step >= 4}
          nextSkuToReview={nextSkuToReview?.code}
          onAddPhotos={() => setStep(3)}
          onAddToSale={addServiceToSale}
          onClose={cancelIntake}
          onDecideSku={setSkuDecision}
          onSuggest={() => setStep(4)}
          pickupBalance={pickupBalance}
          skuDecisions={skuDecisions}
          step={step}
          tax={tax}
          workSubtotal={workSubtotal}
        />
      ) : null}
    </section>
  );
}

function RepairPosWorkspace({
  step,
  workSubtotal,
  tax,
  estimateTotal,
  deposit,
  pickupBalance,
  includedSkus,
  onAddService,
  onTender,
  onCompleteSale,
}: {
  step: number;
  workSubtotal: number;
  tax: number;
  estimateTotal: number;
  deposit: number;
  pickupBalance: number;
  includedSkus: RepairSku[];
  onAddService: () => void;
  onTender: () => void;
  onCompleteSale: () => void;
}) {
  const hasCustomer = step >= 1;
  const serviceInCart = step >= 5;
  const depositTendered = step >= 6;

  return (
    <div className={styles.saleWorkspace}>
      <aside className={`${styles.salePanel} ${styles.saleClientPanel}`}>
        <p className={styles.salePanelLabel}>CLIENT</p>
        <button className={styles.salePrimaryAction} disabled type="button">
          <span aria-hidden="true">⌕</span> Select Client
        </button>
        <button className={styles.saleSecondaryAction} disabled type="button">
          <span aria-hidden="true">＋</span> Add New Client
        </button>
        <div className={styles.saleClientRule} />

        {hasCustomer ? (
          <div className={styles.saleClientDetails}>
            <div className={styles.saleClientName}>
              <div><strong>Maya Thompson</strong><span>C-20718 · (555) 014-6208</span></div>
              <button type="button" disabled>Profile</button>
            </div>
            <p className={styles.repairCustomerEmail}>maya.thompson@example.com</p>
            <dl>
              <div><dt>HOUSE ACCOUNT</dt><dd>$0.00</dd></div>
              <div><dt>LAYAWAY</dt><dd>$0.00</dd></div>
              <div><dt>STORE CREDIT</dt><dd>$0.00</dd></div>
            </dl>
            <div className={styles.saleWishlist}>
              <strong>◇ SERVICE HISTORY <span>2 REPAIRS</span></strong>
              <p>Last repair completed March 2026</p>
            </div>
          </div>
        ) : (
          <div className={styles.saleNoClient}>
            <span aria-hidden="true">◎</span>
            <p>Select a client to connect the service.</p>
          </div>
        )}
      </aside>

      <section className={`${styles.salePanel} ${styles.saleCartPanel}`}>
        <header className={styles.saleCartHeader}>
          <div><p className={styles.salePanelLabel}>SALE DRAFT</p><h1>Cart</h1></div>
          <div>
            <button disabled type="button"><span aria-hidden="true">＋</span> Add Item</button>
            <button
              className={step === 1 ? styles.guidedTarget : ""}
              data-repair-guide-target={step === 1 ? "true" : undefined}
              disabled={step !== 1}
              onClick={onAddService}
              type="button"
            >
              <span aria-hidden="true">⌁</span> Add Service
            </button>
          </div>
        </header>

        <div className={styles.saleCartBody}>
          {serviceInCart ? (
            <div className={styles.saleLines}>
              <article className={styles.saleServiceLine}>
                <span className={styles.saleLineThumb}>RPR</span>
                <div>
                  <small>REPAIR · R-0317 DRAFT</small>
                  <strong>
                    14K Gold Engagement Ring · {includedSkus.length > 1 ? "Prongs & polish" : "Prong repair"}
                  </strong>
                  <p>{includedSkus.length} repair SKU{includedSkus.length === 1 ? "" : "s"} · 3 photos · Due September 11, 2026</p>
                  <span className={styles.reservedTag}>Deposit requested · {money(deposit)}</span>
                </div>
                <strong>{money(estimateTotal)}</strong>
              </article>
            </div>
          ) : (
            <div className={styles.saleEmptyCart}>
              <span aria-hidden="true">▢</span>
              <strong>Cart is empty</strong>
              <p>Add items or services to get started.</p>
            </div>
          )}
        </div>

        <footer className={styles.saleTotals}>
          <dl>
            <div><dt>Subtotal</dt><dd>{serviceInCart ? money(workSubtotal) : "$0.00"}</dd></div>
            <div><dt>Tax</dt><dd>{serviceInCart ? money(tax) : "$0.00"}</dd></div>
            <div><dt>Total</dt><dd>{serviceInCart ? money(estimateTotal) : "$0.00"}</dd></div>
          </dl>
        </footer>
      </section>

      <aside className={styles.saleRightColumn}>
        <section className={`${styles.salePanel} ${styles.saleQuickActions}`}>
          <p className={styles.salePanelLabel}>QUICK ACTIONS</p>
          <small>CART</small>
          <div>
            <button type="button" disabled><span>↔</span>Trade / Buy</button>
            <button type="button" disabled><span>♢</span>Misc Charge</button>
            <button type="button" disabled><span>♡</span>Add to Wishlist</button>
            <button type="button" disabled><span>↶</span>Clear Draft</button>
          </div>
          <small>SERVICE & PICKUP</small>
          <div>
            <button type="button" disabled><span>⌗</span>Pickup</button>
            <button type="button" disabled><span>▱</span>Ship to Customer</button>
          </div>
        </section>

        <section className={`${styles.salePanel} ${styles.salePayment}`}>
          <div className={styles.salePaymentHeader}>
            <p className={styles.salePanelLabel}>PAYMENT</p>
            <span>$ &nbsp;Visa •••• 4242</span>
          </div>
          <dl>
            <div><dt>TENDERED</dt><dd>{depositTendered ? money(deposit) : "$0.00"}</dd></div>
            <div><dt>DUE NOW</dt><dd>{serviceInCart && !depositTendered ? money(deposit) : "$0.00"}</dd></div>
          </dl>
          <div className={styles.repairPickupBalance}>
            <span>DUE AT PICKUP</span>
            <strong>{serviceInCart ? money(pickupBalance) : "$0.00"}</strong>
          </div>
          <button
            className={step === 5 ? styles.guidedTarget : ""}
            data-repair-guide-target={step === 5 ? "true" : undefined}
            disabled={step !== 5}
            onClick={onTender}
            type="button"
          >
            ▭ &nbsp; Tender {step === 5 ? money(deposit) : ""}
          </button>
          <button
            className={step === 6 ? styles.guidedTarget : ""}
            data-repair-guide-target={step === 6 ? "true" : undefined}
            disabled={step !== 6}
            onClick={onCompleteSale}
            type="button"
          >
            ▭ &nbsp; Complete Sale
          </button>
          <p>
            {!serviceInCart
              ? "Add at least one line."
              : !depositTendered
                ? `Deposit due now · ${money(deposit)}`
                : `${money(pickupBalance)} will remain due at pickup.`}
          </p>
        </section>
      </aside>
    </div>
  );
}

function RepairIntakeModal({
  step,
  hasPhotos,
  hasSuggestions,
  skuDecisions,
  nextSkuToReview,
  canAddToSale,
  hasRequiredRepair,
  workSubtotal,
  tax,
  deposit,
  pickupBalance,
  onAddPhotos,
  onSuggest,
  onDecideSku,
  onAddToSale,
  onClose,
}: {
  step: number;
  hasPhotos: boolean;
  hasSuggestions: boolean;
  skuDecisions: Record<string, SkuDecision>;
  nextSkuToReview?: string;
  canAddToSale: boolean;
  hasRequiredRepair: boolean;
  workSubtotal: number;
  tax: number;
  deposit: number;
  pickupBalance: number;
  onAddPhotos: () => void;
  onSuggest: () => void;
  onDecideSku: (skuCode: string, decision: SkuDecision) => void;
  onAddToSale: () => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  useDialogFocusTrap(dialogRef, onClose);

  return (
    <div className={styles.repairIntakeBackdrop}>
      <section
        aria-labelledby="repair-intake-title"
        aria-modal="true"
        className={styles.repairIntakeModal}
        ref={dialogRef}
        role="dialog"
      >
        <header className={styles.repairIntakeHeader}>
          <h2 id="repair-intake-title">Repair Intake</h2>
          <button aria-label="Close Repair Intake" onClick={onClose} type="button">×</button>
        </header>

        <div className={styles.repairIntakeBody}>
          <section className={styles.repairFormSection}>
            <p className={styles.repairFormLabel}>SERVICE TYPE</p>
            <div className={styles.repairServiceTypes}>
              <button aria-pressed="true" disabled type="button"><span>⌁</span> Repair</button>
              <button disabled type="button"><span>♙</span> Watch Repair</button>
              <button disabled type="button"><span>⌕</span> Custom Job</button>
              <button disabled type="button"><span>◇</span> Appraisal</button>
              <button disabled type="button"><span>▱</span> Special Order</button>
            </div>
          </section>

          <section className={styles.repairFormSection}>
            <div className={styles.repairFormHeading}>
              <div>
                <p className={styles.repairFormLabel}>REPAIR PHOTOS</p>
                <span>Capture the item’s condition, stones, markings, and any damage before work begins.</span>
              </div>
              <button
                className={step === 2 ? styles.guidedTarget : ""}
                data-repair-guide-target={step === 2 ? "true" : undefined}
                disabled={step !== 2}
                onClick={onAddPhotos}
                type="button"
              >
                ▧ {hasPhotos ? "3 Photos Added" : "Add Photos"}
              </button>
            </div>
            <div className={styles.repairPhotoSlots}>
              {[0, 1, 2, 3].map((index) => {
                const photo = intakePhotos[index];
                return (
                  <figure className={photo && hasPhotos ? styles.repairPhotoAdded : undefined} key={index}>
                    {photo && hasPhotos ? (
                      <><span>{photo.mark}</span><figcaption>{photo.label}</figcaption><small>Sample photo</small></>
                    ) : (
                      <><span>＋</span><figcaption>EMPTY SLOT</figcaption></>
                    )}
                  </figure>
                );
              })}
            </div>
          </section>

          <section className={styles.repairFormSection}>
            <div className={styles.repairFormHeading}>
              <div><p className={styles.repairFormLabel}>REPAIR REQUEST</p></div>
              <div className={styles.repairRequestActions}>
                <button
                  className={step === 3 ? styles.guidedTarget : ""}
                  data-repair-guide-target={step === 3 ? "true" : undefined}
                  disabled={step !== 3}
                  onClick={onSuggest}
                  type="button"
                >
                  ✦ {hasSuggestions ? "Suggested SKUs Added" : "Add Suggested SKUs"}
                </button>
                <button disabled type="button">▧ Add Media References</button>
              </div>
            </div>
            <p className={styles.repairHelperCopy}>
              Suggested SKUs use words from the title and description to match this service family’s catalog.
              Media references add attached file names only. Review the suggested result before saving.
            </p>
            <textarea
              aria-label="Describe what the customer needs done"
              readOnly
              value="Heirloom 14K gold engagement ring. Center stone is loose, two prongs are worn, and the shank has surface scratches. Tighten the center and restore the finish."
            />
          </section>

          <section className={styles.repairFormSection}>
            <p className={styles.repairFormLabel}>REPAIR ITEM AND PROMISE</p>
            <div className={styles.repairFieldGrid}>
              <Field label="Item / Project Name" value="14K Gold Engagement Ring" wide />
              <Field label="Promised Date" value="September 11, 2026" />
              <div className={styles.repairField}>
                <span>Priority</span>
                <div className={styles.repairPriority}><button disabled type="button">Normal</button><button disabled type="button">Rush</button><button disabled type="button">Emergency</button></div>
              </div>
              <Field label="Metal Type" value="14K Gold" />
              <Field label="Stone" value="Diamond" />
              <Field label="Quantity" value="1" />
              <Field label="Additional Quote ($)" value="$0.00" />
              <Field label="Deposit ($)" value="$250.00" />
            </div>
          </section>

          <section className={styles.repairFormSection}>
            <p className={styles.repairFormLabel}>INTAKE EVIDENCE</p>
            <div className={styles.repairFieldGrid}>
              <Field label="Declared Value ($) *" value="$8,500.00" />
              <Field label="Envelope / Bag #" value="ENV-000317" />
              <Field label="Condition At Intake" value="Center loose · 2 worn prongs · surface scratches" wide />
              <Field label="Photo Ref" value="R-0317-IN-01" />
              <Field label="Private Counter Note" value="Heirloom ring · bench handling only" />
              <Field label="Linked Item # / SKU" value="REP-ITEM-00972" />
              <Field label="Service Location *" value="In-house Bench 2" />
            </div>
            <label className={styles.repairCustody}>
              <input checked readOnly type="checkbox" /> In store custody
            </label>
            <div className={styles.repairDeclaredValue}>
              <div><strong>Itemized Declared Value</strong><span>1 item · $8,500.00</span></div>
              <p><span>Center diamond & mounting</span><small>RING-01</small><strong>$8,500.00</strong></p>
            </div>
          </section>

          <section className={styles.repairFormSection}>
            <div className={styles.repairTaskHeading}>
              <div>
                <p className={styles.repairFormLabel}>REPAIR TASKS *</p>
                <span>
                  {hasSuggestions
                    ? `${Object.keys(skuDecisions).length} decided · ${repairSkus.length} suggested`
                    : "0 ready · 0 reference"}
                </span>
              </div>
              <small>* Required to start a repair</small>
            </div>

            {hasSuggestions ? (
              <div className={styles.repairSuggestedTasks}>
                <div className={styles.repairAiNotice}>
                  <span>✦</span>
                  <p><strong>SIMULATED AI SUGGEST · CATALOG MATCH</strong>Two reviewable SKUs match the repair request text. Photo file names remain references only, and staff decides what is included.</p>
                </div>
                {repairSkus.map((sku) => {
                  const decision = skuDecisions[sku.code];
                  const isNext = step === 4 && nextSkuToReview === sku.code;
                  return (
                    <article className={styles.repairSuggestedTask} key={sku.code}>
                      <span>{sku.code}</span>
                      <p>
                        <strong>{sku.name}{sku.required ? " · Required repair" : " · Optional finish"}</strong>
                        <small>{sku.reason} · {sku.detail}</small>
                      </p>
                      <strong>{money(sku.price)}</strong>
                      <div className={styles.repairSkuDecision}>
                        <button
                          aria-pressed={decision === "included"}
                          className={isNext ? styles.guidedTarget : ""}
                          data-repair-guide-target={isNext ? "true" : undefined}
                          onClick={() => onDecideSku(sku.code, "included")}
                          type="button"
                        >
                          {decision === "included" ? "✓ Included" : "Include"}
                        </button>
                        <button
                          aria-pressed={decision === "excluded"}
                          onClick={() => onDecideSku(sku.code, "excluded")}
                          type="button"
                        >
                          {decision === "excluded" ? "✓ Excluded" : "Exclude"}
                        </button>
                      </div>
                    </article>
                  );
                })}
                {!hasRequiredRepair && Object.keys(skuDecisions).length === repairSkus.length ? (
                  <p className={styles.repairTaskError}>Include RP-PRONG-02 to satisfy the required repair task.</p>
                ) : null}
              </div>
            ) : (
              <div className={styles.repairNoTasks}>Search repair, watch, custom, or appraisal SKUs…</div>
            )}
          </section>

          <section className={`${styles.repairFormSection} ${styles.repairFormFootFields}`}>
            <div><p className={styles.repairFormLabel}>REPAIR FLAGS</p><span>□ Express service &nbsp; □ Quote estimated &nbsp; □ ETA estimated</span></div>
            <div><p className={styles.repairFormLabel}>READY NOTIFICATION</p><strong>Auto — text first, then email</strong><span>Consent is checked again before any notification is sent.</span></div>
          </section>
        </div>

        <footer className={styles.repairIntakeFooter}>
          <p>Service will be associated with <strong>Maya Thompson.</strong></p>
          <div className={styles.repairIntakeTotals}>
            <span><small>SUBTOTAL</small><strong>{money(workSubtotal)}</strong></span>
            <span><small>TAX</small><strong>{money(tax)}</strong></span>
            <span><small>DEPOSIT</small><strong>{money(deposit)}</strong></span>
            <span><small>BALANCE</small><strong>{money(pickupBalance)}</strong></span>
          </div>
          <div className={styles.repairIntakeActions}>
            <button onClick={onClose} type="button">Cancel</button>
            <button disabled type="button">＋ Add Service Item</button>
            <button
              className={canAddToSale ? styles.guidedTarget : ""}
              data-repair-guide-target={canAddToSale ? "true" : undefined}
              disabled={!canAddToSale}
              onClick={onAddToSale}
              type="button"
            >
              Add to Sale
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}

function Field({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <label className={`${styles.repairField} ${wide ? styles.repairFieldWide : ""}`}>
      <span>{label}</span>
      <input readOnly value={value} />
    </label>
  );
}

function RepairServicesWorkspace({
  isComplete,
  estimateTotal,
  deposit,
  pickupBalance,
  includedSkus,
  onReady,
  onExit,
}: {
  isComplete: boolean;
  estimateTotal: number;
  deposit: number;
  pickupBalance: number;
  includedSkus: RepairSku[];
  onReady: () => void;
  onExit: () => void;
}) {
  return (
    <div className={styles.repairServicesWorkspace}>
      <aside className={styles.repairServicesNav}>
        <strong>SERVICES</strong>
        <nav aria-label="Services workspace">
          <span>Overview</span>
          <span>Jobs</span>
          <small>JOBS</small>
          <span>Bench Work</span>
          <span className={isComplete ? styles.repairServiceNavActive : undefined}>Ready for Pickup</span>
          <span>QC Review</span>
          <span>Scan Lookup</span>
          <span>Needs Approval</span>
          <span className={!isComplete ? styles.repairServiceNavActive : undefined}>In Progress</span>
          <small>CATALOG</small>
          <span>Service SKUs</span>
          <small>REPORTS</small>
          <span>Reports Overview</span>
          <span>Job Costing</span>
        </nav>
      </aside>

      <section aria-label="Service job R-0317" className={styles.repairServicesMain}>
        {isComplete ? (
          <RepairComplete
            deposit={deposit}
            includedSkus={includedSkus}
            onExit={onExit}
            pickupBalance={pickupBalance}
          />
        ) : (
          <>
            <header className={styles.repairServicesHeader}>
              <div><p>SERVICE JOB</p><h1>R-0317</h1><span>Created from POS · Estimate {money(estimateTotal)} · Deposit recorded</span></div>
              <strong>● In Progress</strong>
            </header>

            <article className={styles.repairBenchCard}>
              <div className={styles.repairBenchTopline}><span>REPAIR · IN-HOUSE</span><strong>● In Bench</strong></div>
              <h2>14K Gold Engagement Ring</h2>
              <p>Maya Thompson · REP-ITEM-00972 · Due September 11, 2026</p>
              <div className={styles.repairBenchMeta}>
                <div><span>ASSIGNED TO</span><strong>Daniel Ruiz</strong><small>Senior Bench Jeweler</small></div>
                <div><span>SERVICE LOCATION</span><strong>In-house Bench 2</strong><small>Normal priority</small></div>
                <div><span>PAYMENT</span><strong>{money(deposit)} paid</strong><small>{money(pickupBalance)} due at pickup</small></div>
              </div>
              <div className={styles.repairTimeline}>
                <p><span>10:18 AM</span><strong>Intake evidence recorded</strong>3 photos · declared value · custody confirmed</p>
                <p><span>10:22 AM</span><strong>Repair tasks approved</strong>{includedSkus.map((sku) => sku.code).join(" · ")}</p>
                <p><span>10:24 AM</span><strong>Sent to service location</strong>Daniel Ruiz · In-house Bench 2</p>
                <p className={styles.simulatedUpdate}>
                  <span>SIMULATED UPDATE · SEP 10 · 3:40 PM</span>
                  <strong>Bench work completed</strong>
                  {includedSkus.some((sku) => sku.code === "CLN-POLISH-01")
                    ? "Prongs rebuilt, center tightened, cleaned and polished"
                    : "Prongs rebuilt and center stone tightened"}
                </p>
              </div>
              <button
                className={`${styles.repairReadyButton} ${styles.guidedTarget}`}
                data-repair-guide-target="true"
                onClick={onReady}
                type="button"
              >
                ✓ Mark Ready for Pickup
              </button>
            </article>
          </>
        )}
      </section>
    </div>
  );
}

function RepairComplete({
  deposit,
  pickupBalance,
  includedSkus,
  onExit,
}: {
  deposit: number;
  pickupBalance: number;
  includedSkus: RepairSku[];
  onExit: () => void;
}) {
  return (
    <div className={styles.saleCompleteCard} data-repair-complete tabIndex={-1}>
      <span className={styles.saleCompleteMark} aria-hidden="true">✓</span>
      <p>REPAIR READY FOR PICKUP</p>
      <h2>R-0317 is ready for Maya.</h2>
      <strong>Balance due {money(pickupBalance)} · No message has been sent</strong>
      <ul>
        <li><span>✓</span><p><strong>Customer updated</strong>R-0317 is in Maya’s service history and ready-for-pickup queue.</p></li>
        <li><span>✓</span><p><strong>Evidence retained</strong>REP-ITEM-00972 keeps 3 photos, declared value, custody, and condition.</p></li>
        <li><span>✓</span><p><strong>Bench history recorded</strong>Daniel Ruiz, service location, {includedSkus.length} repair SKU{includedSkus.length === 1 ? "" : "s"}, and timestamps are connected.</p></li>
        <li><span>✓</span><p><strong>Deposit reconciled</strong>{money(deposit)} added to today’s Visa •••• 4242 reconciliation.</p></li>
        <li><span>✓</span><p><strong>Pickup prepared</strong>SMS preview: “Maya, repair R-0317 is ready. Balance due: {money(pickupBalance)}.”</p></li>
        <li><span>✓</span><p><strong>Owner view updated</strong>Ready-for-pickup increased by one; service receivables increased by {money(pickupBalance)}.</p></li>
      </ul>
      <button onClick={onExit} type="button">Choose another workflow</button>
    </div>
  );
}

function RepairDialog({
  eyebrow,
  title,
  onClose,
  children,
}: {
  eyebrow: string;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  useDialogFocusTrap(dialogRef, onClose);

  return (
    <div className={styles.salePickerBackdrop}>
      <section aria-label={title} aria-modal="true" className={styles.salePicker} ref={dialogRef} role="dialog">
        <header>
          <div><p>{eyebrow}</p><h2>{title}</h2></div>
          <button aria-label={`Close ${title}`} onClick={onClose} type="button">×</button>
        </header>
        <div className={styles.salePickerResults}>{children}</div>
      </section>
    </div>
  );
}

function useDialogFocusTrap(dialogRef: RefObject<HTMLElement | null>, onClose: () => void) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!dialog) return;

    const focusableSelector =
      'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function focusableElements() {
      return Array.from(dialog?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;
      const elements = focusableElements();
      if (!elements.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    dialog.addEventListener("keydown", handleKeyDown);
    const focusTimer = window.setTimeout(() => focusableElements()[0]?.focus(), 0);

    return () => {
      window.clearTimeout(focusTimer);
      dialog.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [dialogRef]);
}
