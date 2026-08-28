"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import styles from "./guided-demo.module.css";

type CustomStoryProps = {
  onComplete: () => void;
  onExit: () => void;
  onWorkspaceChange: (isInServices: boolean) => void;
};

type SkuDecision = "included" | "excluded";

const customSkus = [
  {
    code: "CUST-CAD-01",
    name: "Custom CAD design & approval render",
    detail: "Design milestone · 2 revision rounds",
    reason: "Customer wants a new pendant built around an heirloom diamond",
    price: 35_000,
    required: true,
  },
  {
    code: "CUST-FAB-18K",
    name: "18K yellow gold pendant fabrication",
    detail: "Bench build · setting · finishing",
    reason: "18K yellow gold, low-profile bezel, 18-inch cable chain",
    price: 285_000,
    required: true,
  },
  {
    code: "APP-FINAL-01",
    name: "Finished-piece insurance appraisal",
    detail: "Optional deliverable · digital copy",
    reason: "Declared heirloom stone and new finished-piece value",
    price: 17_500,
    required: false,
  },
] as const;

type CustomSku = (typeof customSkus)[number];

const TAX_RATE_BPS = 825;
const DEPOSIT = 150_000;

const referencePhotos = [
  { label: "INSPIRATION", mark: "◇" },
  { label: "HEIRLOOM STONE", mark: "◆" },
  { label: "SKETCH", mark: "✎" },
] as const;

const guideSteps = [
  {
    title: "Select the customer",
    instruction:
      "Choose Eleanor Price so the design brief, approvals, property, and deposit stay on one customer record.",
  },
  {
    title: "Start a custom job",
    instruction:
      "Use Add Service from the POS cart—the same counter entry point used in Linkd.",
  },
  {
    title: "Add design references",
    instruction:
      "Attach simulated inspiration, heirloom-stone, and sketch photos before the design is quoted.",
  },
  {
    title: "Ask Linkd to suggest custom SKUs",
    instruction:
      "Use the end-product brief to find matching design, fabrication, and deliverable SKUs.",
  },
  {
    title: "Review the build plan",
    instruction:
      "Include or exclude every suggested SKU, confirm custody and materials, then add the custom job to the sale.",
  },
  {
    title: "Collect the design deposit",
    instruction:
      "Tender Eleanor’s $1,500 demo Visa deposit. The remaining balance follows the custom job.",
  },
  {
    title: "Create the custom job",
    instruction:
      "Complete the POS transaction to create C-0428 in Services with its design milestone awaiting approval.",
  },
  {
    title: "Approve the design milestone",
    instruction:
      "Apply the simulated customer approval and move the project from Needs Approval into production.",
  },
];

function money(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default function CustomStory({
  onComplete,
  onExit,
  onWorkspaceChange,
}: CustomStoryProps) {
  const [step, setStep] = useState(0);
  const [skuDecisions, setSkuDecisions] = useState<Record<string, SkuDecision>>({});
  const completionSent = useRef(false);
  const storyRef = useRef<HTMLElement>(null);

  const isIntakeOpen = step >= 2 && step <= 4;
  const isInServices = step >= 7;
  const isComplete = step >= 8;
  const currentGuide = guideSteps[Math.min(step, guideSteps.length - 1)];
  const requiredSkus = customSkus.filter((sku) => sku.required);
  const allSkusReviewed = Object.keys(skuDecisions).length === customSkus.length;
  const hasRequiredBuild = requiredSkus.every(
    (sku) => skuDecisions[sku.code] === "included",
  );
  const canAddToSale = allSkusReviewed && hasRequiredBuild;
  const nextSkuToReview =
    customSkus.find((sku) => !skuDecisions[sku.code])
    ?? requiredSkus.find((sku) => skuDecisions[sku.code] !== "included");
  const includedSkus = customSkus.filter(
    (sku) => skuDecisions[sku.code] === "included",
  );
  const workSubtotal = includedSkus.reduce((sum, sku) => sum + sku.price, 0);
  const tax = Math.round((workSubtotal * TAX_RATE_BPS) / 10_000);
  const projectTotal = workSubtotal + tax;
  const deposit = Math.min(DEPOSIT, projectTotal);
  const remainingBalance = Math.max(0, projectTotal - deposit);
  const hasOpenDialog = step === 0 || isIntakeOpen;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const target = storyRef.current?.querySelector<HTMLElement>(
        isComplete ? "[data-custom-complete]" : '[data-custom-guide-target="true"]',
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
  }, [canAddToSale, isComplete, nextSkuToReview?.code, step]);

  function restartCustom() {
    completionSent.current = false;
    setSkuDecisions({});
    onWorkspaceChange(false);
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

  function createCustomJob() {
    if (step !== 6) return;
    onWorkspaceChange(true);
    setStep(7);
  }

  function approveDesign() {
    if (step !== 7 || completionSent.current) return;
    completionSent.current = true;
    setStep(8);
    onComplete();
  }

  return (
    <section
      aria-label="Guided Custom Intake & Management workflow"
      className={styles.repairStory}
      ref={storyRef}
    >
      <div className={styles.saleGuide} aria-live="polite">
        <div className={styles.saleGuideProgress}>
          <span>{isComplete ? "STORY COMPLETE" : `STEP ${step + 1} OF 8`}</span>
          <div
            aria-label="Custom walkthrough progress"
            aria-valuemax={8}
            aria-valuemin={0}
            aria-valuenow={Math.min(step, 8)}
            role="progressbar"
          >
            <i style={{ width: `${(Math.min(step, 8) / 8) * 100}%` }} />
          </div>
        </div>
        <div className={styles.saleGuideCopy}>
          <strong>{isComplete ? "Custom project is in production" : currentGuide.title}</strong>
          <p>
            {isComplete
              ? "The customer, design brief, approvals, property, materials, payment, and production milestone are connected."
              : currentGuide.instruction}
          </p>
        </div>
        <div className={styles.saleGuideActions}>
          <span>Guided Demo · Sample Data</span>
          <button type="button" onClick={onExit}>Choose workflows</button>
          <button type="button" onClick={restartCustom}>Restart</button>
        </div>
      </div>

      {isInServices ? (
        <CustomServicesWorkspace
          deposit={deposit}
          includedSkus={includedSkus}
          isComplete={isComplete}
          onApprove={approveDesign}
          onExit={onExit}
          projectTotal={projectTotal}
          remainingBalance={remainingBalance}
        />
      ) : (
        <div aria-hidden={hasOpenDialog} inert={hasOpenDialog}>
          <CustomPosWorkspace
            deposit={deposit}
            includedSkus={includedSkus}
            onAddService={() => setStep(2)}
            onCompleteSale={createCustomJob}
            onTender={() => setStep(6)}
            projectTotal={projectTotal}
            remainingBalance={remainingBalance}
            step={step}
            tax={tax}
            workSubtotal={workSubtotal}
          />
        </div>
      )}

      {step === 0 ? (
        <CustomDialog eyebrow="CLIENT SEARCH" title="Select Client" onClose={onExit}>
          <button
            className={styles.salePickerResult}
            data-custom-guide-target="true"
            onClick={() => setStep(1)}
            type="button"
          >
            <span>EP</span>
            <p>
              <strong>Eleanor Price</strong>
              <small>C-31842 · (555) 013-4820 · 1 active wishlist</small>
            </p>
            <i>Choose →</i>
          </button>
        </CustomDialog>
      ) : null}

      {isIntakeOpen ? (
        <CustomIntakeModal
          canAddToSale={canAddToSale}
          deposit={deposit}
          hasPhotos={step >= 3}
          hasRequiredBuild={hasRequiredBuild}
          hasSuggestions={step >= 4}
          nextSkuToReview={nextSkuToReview?.code}
          onAddPhotos={() => setStep(3)}
          onAddToSale={addServiceToSale}
          onClose={cancelIntake}
          onDecideSku={setSkuDecision}
          onSuggest={() => setStep(4)}
          remainingBalance={remainingBalance}
          skuDecisions={skuDecisions}
          step={step}
          tax={tax}
          workSubtotal={workSubtotal}
        />
      ) : null}
    </section>
  );
}

function CustomPosWorkspace({
  step,
  workSubtotal,
  tax,
  projectTotal,
  deposit,
  remainingBalance,
  includedSkus,
  onAddService,
  onTender,
  onCompleteSale,
}: {
  step: number;
  workSubtotal: number;
  tax: number;
  projectTotal: number;
  deposit: number;
  remainingBalance: number;
  includedSkus: CustomSku[];
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
              <div><strong>Eleanor Price</strong><span>C-31842 · (555) 013-4820</span></div>
              <button type="button" disabled>Profile</button>
            </div>
            <p className={styles.repairCustomerEmail}>eleanor.price@example.com</p>
            <dl>
              <div><dt>HOUSE ACCOUNT</dt><dd>$0.00</dd></div>
              <div><dt>LAYAWAY</dt><dd>$0.00</dd></div>
              <div><dt>STORE CREDIT</dt><dd>$0.00</dd></div>
            </dl>
            <div className={styles.saleWishlist}>
              <strong>◇ WISHLIST <span>1 ITEM</span></strong>
              <p>Yellow gold bezel pendant · saved August 2026</p>
            </div>
          </div>
        ) : (
          <div className={styles.saleNoClient}>
            <span aria-hidden="true">◎</span>
            <p>Select a client to connect the custom project.</p>
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
              data-custom-guide-target={step === 1 ? "true" : undefined}
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
                <span className={styles.saleLineThumb}>CST</span>
                <div>
                  <small>CUSTOM JOB · C-0428 DRAFT</small>
                  <strong>Heirloom Diamond Pendant Redesign</strong>
                  <p>{includedSkus.length} build SKU{includedSkus.length === 1 ? "" : "s"} · 3 references · Design approval required</p>
                  <span className={styles.reservedTag}>Deposit requested · {money(deposit)}</span>
                </div>
                <strong>{money(projectTotal)}</strong>
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
            <div><dt>Total</dt><dd>{serviceInCart ? money(projectTotal) : "$0.00"}</dd></div>
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
            <span>PROJECT BALANCE</span>
            <strong>{serviceInCart ? money(remainingBalance) : "$0.00"}</strong>
          </div>
          <button
            className={step === 5 ? styles.guidedTarget : ""}
            data-custom-guide-target={step === 5 ? "true" : undefined}
            disabled={step !== 5}
            onClick={onTender}
            type="button"
          >
            ▭ &nbsp; Tender {step === 5 ? money(deposit) : ""}
          </button>
          <button
            className={step === 6 ? styles.guidedTarget : ""}
            data-custom-guide-target={step === 6 ? "true" : undefined}
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
                : `${money(remainingBalance)} remains on the custom job.`}
          </p>
        </section>
      </aside>
    </div>
  );
}

function CustomIntakeModal({
  step,
  hasPhotos,
  hasSuggestions,
  skuDecisions,
  nextSkuToReview,
  canAddToSale,
  hasRequiredBuild,
  workSubtotal,
  tax,
  deposit,
  remainingBalance,
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
  hasRequiredBuild: boolean;
  workSubtotal: number;
  tax: number;
  deposit: number;
  remainingBalance: number;
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
        aria-labelledby="custom-intake-title"
        aria-modal="true"
        className={styles.repairIntakeModal}
        ref={dialogRef}
        role="dialog"
      >
        <header className={styles.repairIntakeHeader}>
          <h2 id="custom-intake-title">Custom Job Intake</h2>
          <button aria-label="Close Custom Job Intake" onClick={onClose} type="button">×</button>
        </header>

        <div className={styles.repairIntakeBody}>
          <section className={styles.repairFormSection}>
            <p className={styles.repairFormLabel}>SERVICE TYPE</p>
            <div className={styles.repairServiceTypes}>
              <button disabled type="button"><span>⌁</span> Repair</button>
              <button disabled type="button"><span>♙</span> Watch Repair</button>
              <button aria-pressed="true" disabled type="button"><span>⌕</span> Custom Job</button>
              <button disabled type="button"><span>◇</span> Appraisal</button>
              <button disabled type="button"><span>▱</span> Special Order</button>
            </div>
          </section>

          <section className={styles.repairFormSection}>
            <div className={styles.repairFormHeading}>
              <div>
                <p className={styles.repairFormLabel}>COPY FROM ACTIVE CUSTOM JOB</p>
                <span>Copy a prior design plan without copying custody, media, deposit, notes, or inventory links.</span>
              </div>
              <button disabled type="button">Copy design plan</button>
            </div>
          </section>

          <section className={styles.repairFormSection}>
            <div className={styles.repairFormHeading}>
              <div>
                <p className={styles.repairFormLabel}>DESIGN REFERENCES &amp; MEDIA</p>
                <span>Capture inspiration, customer property, sketches, and the desired finished look.</span>
              </div>
              <button
                className={step === 2 ? styles.guidedTarget : ""}
                data-custom-guide-target={step === 2 ? "true" : undefined}
                disabled={step !== 2}
                onClick={onAddPhotos}
                type="button"
              >
                ▧ {hasPhotos ? "3 Photos Added" : "Add Photo"}
              </button>
            </div>
            <div className={styles.repairPhotoSlots}>
              {[0, 1, 2, 3].map((index) => {
                const photo = referencePhotos[index];
                return (
                  <figure className={photo && hasPhotos ? styles.repairPhotoAdded : undefined} key={index}>
                    {photo && hasPhotos ? (
                      <><span>{photo.mark}</span><figcaption>{photo.label}</figcaption><small>Sample reference</small></>
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
              <div><p className={styles.repairFormLabel}>END PRODUCT &amp; DESIGN BRIEF</p></div>
              <div className={styles.repairRequestActions}>
                <button
                  className={step === 3 ? styles.guidedTarget : ""}
                  data-custom-guide-target={step === 3 ? "true" : undefined}
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
              Suggested custom SKUs use the customer-facing brief to start the build plan. Staff reviews every result before saving.
            </p>
            <textarea
              aria-label="Describe the desired end product"
              readOnly
              value="Redesign Eleanor’s 1.25 ct heirloom diamond as a low-profile bezel pendant in 18K yellow gold. Add an 18-inch cable chain, preserve the stone, and keep the finished look clean and modern."
            />
          </section>

          <section className={styles.repairFormSection}>
            <p className={styles.repairFormLabel}>DESIGN DETAILS &amp; PROMISE</p>
            <div className={styles.repairFieldGrid}>
              <Field label="Project / design name" value="Heirloom Diamond Pendant Redesign" wide />
              <Field label="Promised Date" value="October 16, 2026" />
              <div className={styles.repairField}>
                <span>Priority</span>
                <div className={styles.repairPriority}><button disabled type="button">Normal</button><button disabled type="button">Rush</button><button disabled type="button">Emergency</button></div>
              </div>
              <Field label="Primary metal" value="18K Gold" />
              <Field label="Stones / gems" value="1.25 ct Diamond · customer owned" />
              <Field label="Quantity" value="1" />
              <Field label="Additional Quote ($)" value="$0.00" />
              <Field label="Deposit ($)" value="$1,500.00" />
            </div>
          </section>

          <section className={styles.repairFormSection}>
            <p className={styles.repairFormLabel}>CUSTOMER PROPERTY &amp; CUSTODY</p>
            <div className={styles.repairFieldGrid}>
              <Field label="Declared Value ($) *" value="$7,200.00" />
              <Field label="Envelope / Bag #" value="ENV-000428" />
              <Field label="Customer property condition" value="Loose 1.25 ct round diamond · minor girdle abrasion noted" wide />
              <Field label="Photo Ref" value="C-0428-IN-01" />
              <Field label="Internal design note" value="Preserve low profile · approval required before casting" />
              <Field label="Linked Item # / SKU" value="CUST-STONE-00428" />
              <Field label="Service Location *" value="Custom Studio 1" />
            </div>
            <label className={styles.repairCustody}>
              <input checked readOnly type="checkbox" /> In store custody
            </label>
            <div className={styles.repairDeclaredValue}>
              <div><strong>Itemized Declared Value</strong><span>1 item · $7,200.00</span></div>
              <p><span>1.25 ct round heirloom diamond</span><small>STONE-01</small><strong>$7,200.00</strong></p>
            </div>
          </section>

          <section className={styles.repairFormSection}>
            <div className={styles.repairTaskHeading}>
              <div>
                <p className={styles.repairFormLabel}>BUILD PLAN &amp; TASKS *</p>
                <span>
                  {hasSuggestions
                    ? `${Object.keys(skuDecisions).length} decided · ${customSkus.length} suggested`
                    : "0 ready · 0 reference"}
                </span>
              </div>
              <small>* Design and fabrication tasks are required</small>
            </div>

            {hasSuggestions ? (
              <div className={styles.repairSuggestedTasks}>
                <div className={styles.repairAiNotice}>
                  <span>✦</span>
                  <p><strong>SIMULATED AI SUGGEST · CATALOG MATCH</strong>Three reviewable SKUs match the end-product brief. Reference images are evidence only; staff decides what enters the build plan.</p>
                </div>
                {customSkus.map((sku) => {
                  const decision = skuDecisions[sku.code];
                  const isNext = step === 4 && nextSkuToReview === sku.code;
                  return (
                    <article className={styles.repairSuggestedTask} key={sku.code}>
                      <span>{sku.code}</span>
                      <p>
                        <strong>{sku.name}{sku.required ? " · Required" : " · Optional"}</strong>
                        <small>{sku.reason} · {sku.detail}</small>
                      </p>
                      <strong>{money(sku.price)}</strong>
                      <div className={styles.repairSkuDecision}>
                        <button
                          aria-pressed={decision === "included"}
                          className={isNext ? styles.guidedTarget : ""}
                          data-custom-guide-target={isNext ? "true" : undefined}
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
                {!hasRequiredBuild && Object.keys(skuDecisions).length === customSkus.length ? (
                  <p className={styles.repairTaskError}>Include CUST-CAD-01 and CUST-FAB-18K to create the required custom build plan.</p>
                ) : null}
              </div>
            ) : (
              <div className={styles.repairNoTasks}>Search repair, watch, custom, or appraisal SKUs…</div>
            )}
          </section>

          <section className={styles.repairFormSection}>
            <p className={styles.repairFormLabel}>BUILD MATERIAL</p>
            <div className={styles.repairDeclaredValue}>
              <div><strong>18K yellow gold stock</strong><span>In stock and ready to use</span></div>
              <p><span>Sheet, bezel wire &amp; 18-inch cable chain</span><small>CUST-GOLD-18K · Counter</small><strong>Qty 1</strong></p>
              <p><span>1.25 ct round heirloom diamond</span><small>CUST-STONE-00428</small><strong>Customer owned</strong></p>
            </div>
          </section>

          <section className={`${styles.repairFormSection} ${styles.repairFormFootFields}`}>
            <div><p className={styles.repairFormLabel}>QUOTE &amp; PROMISE FLAGS</p><span>□ Express service &nbsp; □ Quote estimated &nbsp; □ ETA estimated &nbsp; □ Estimate only</span></div>
            <div><p className={styles.repairFormLabel}>READY NOTIFICATION</p><strong>Auto — text first, then email</strong><span>Consent is checked again before any notification is sent.</span></div>
          </section>
        </div>

        <footer className={styles.repairIntakeFooter}>
          <p>Service will be associated with <strong>Eleanor Price.</strong></p>
          <div className={styles.repairIntakeTotals}>
            <span><small>SUBTOTAL</small><strong>{money(workSubtotal)}</strong></span>
            <span><small>TAX</small><strong>{money(tax)}</strong></span>
            <span><small>DEPOSIT</small><strong>{money(deposit)}</strong></span>
            <span><small>BALANCE</small><strong>{money(remainingBalance)}</strong></span>
          </div>
          <div className={styles.repairIntakeActions}>
            <button onClick={onClose} type="button">Cancel</button>
            <button disabled type="button">＋ Add Service Item</button>
            <button
              className={canAddToSale ? styles.guidedTarget : ""}
              data-custom-guide-target={canAddToSale ? "true" : undefined}
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

function CustomServicesWorkspace({
  isComplete,
  projectTotal,
  deposit,
  remainingBalance,
  includedSkus,
  onApprove,
  onExit,
}: {
  isComplete: boolean;
  projectTotal: number;
  deposit: number;
  remainingBalance: number;
  includedSkus: CustomSku[];
  onApprove: () => void;
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
          <span>Ready for Pickup</span>
          <span>QC Review</span>
          <span>Scan Lookup</span>
          <span className={!isComplete ? styles.repairServiceNavActive : undefined}>Needs Approval</span>
          <span className={isComplete ? styles.repairServiceNavActive : undefined}>In Progress</span>
          <small>CATALOG</small>
          <span>Service SKUs</span>
          <small>REPORTS</small>
          <span>Reports Overview</span>
          <span>Job Costing</span>
        </nav>
      </aside>

      <section aria-label="Custom service job C-0428" className={styles.repairServicesMain}>
        {isComplete ? (
          <CustomComplete
            deposit={deposit}
            includedSkus={includedSkus}
            onExit={onExit}
            remainingBalance={remainingBalance}
          />
        ) : (
          <>
            <header className={styles.repairServicesHeader}>
              <div><p>CUSTOM JOB</p><h1>C-0428</h1><span>Created from POS · Estimate {money(projectTotal)} · Deposit recorded</span></div>
              <strong>● Needs Approval</strong>
            </header>

            <article className={styles.repairBenchCard}>
              <div className={styles.repairBenchTopline}><span>CUSTOM · DESIGN MILESTONE</span><strong>● Customer Review</strong></div>
              <h2>Heirloom Diamond Pendant Redesign</h2>
              <p>Eleanor Price · CUST-STONE-00428 · Promised October 16, 2026</p>
              <div className={styles.repairBenchMeta}>
                <div><span>DESIGNER</span><strong>Sofia Bennett</strong><small>Custom Design Studio</small></div>
                <div><span>SERVICE LOCATION</span><strong>Custom Studio 1</strong><small>Normal priority</small></div>
                <div><span>PAYMENT</span><strong>{money(deposit)} paid</strong><small>{money(remainingBalance)} project balance</small></div>
              </div>
              <div className={styles.repairTimeline}>
                <p><span>AUG 28 · 11:05 AM</span><strong>Design brief and property recorded</strong>3 references · $7,200 declared value · custody confirmed</p>
                <p><span>AUG 28 · 11:12 AM</span><strong>Build plan approved internally</strong>{includedSkus.map((sku) => sku.code).join(" · ")}</p>
                <p><span>SEP 2 · 2:30 PM</span><strong>CAD render prepared</strong>Version 2 · low-profile bezel · 18-inch cable chain</p>
                <p className={styles.simulatedUpdate}>
                  <span>SIMULATED CUSTOMER UPDATE · SEP 3 · 9:42 AM</span>
                  <strong>Design approved by Eleanor</strong>
                  Approval captured for CAD version 2 · no requested revisions
                </p>
              </div>
              <button
                className={`${styles.repairReadyButton} ${styles.guidedTarget}`}
                data-custom-guide-target="true"
                onClick={onApprove}
                type="button"
              >
                ✓ Approve Design &amp; Start Production
              </button>
            </article>
          </>
        )}
      </section>
    </div>
  );
}

function CustomComplete({
  deposit,
  remainingBalance,
  includedSkus,
  onExit,
}: {
  deposit: number;
  remainingBalance: number;
  includedSkus: CustomSku[];
  onExit: () => void;
}) {
  return (
    <div className={styles.saleCompleteCard} data-custom-complete tabIndex={-1}>
      <span className={styles.saleCompleteMark} aria-hidden="true">✓</span>
      <p>CUSTOM DESIGN APPROVED</p>
      <h2>C-0428 is ready for production.</h2>
      <strong>CAD version 2 approved · Balance {money(remainingBalance)}</strong>
      <ul>
        <li><span>✓</span><p><strong>Customer updated</strong>C-0428 and the approved CAD milestone now appear in Eleanor’s service history.</p></li>
        <li><span>✓</span><p><strong>Customer property protected</strong>CUST-STONE-00428 keeps 3 references, condition, $7,200 declared value, and custody history.</p></li>
        <li><span>✓</span><p><strong>Build plan released</strong>Sofia Bennett, Custom Studio 1, {includedSkus.length} SKU{includedSkus.length === 1 ? "" : "s"}, and materials are connected.</p></li>
        <li><span>✓</span><p><strong>Deposit reconciled</strong>{money(deposit)} added to today’s Visa •••• 4242 reconciliation.</p></li>
        <li><span>✓</span><p><strong>Milestone advanced</strong>Needs Approval decreased by one; In Progress increased by one. No message has been sent.</p></li>
        <li><span>✓</span><p><strong>Owner view updated</strong>Custom work in progress and the {money(remainingBalance)} service receivable now reflect C-0428.</p></li>
      </ul>
      <button onClick={onExit} type="button">Choose another workflow</button>
    </div>
  );
}

function CustomDialog({
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
    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
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
