"use client";

import { useState } from "react";
import styles from "./guided-demo.module.css";

type MakeSaleStoryProps = {
  onComplete: () => void;
  onExit: () => void;
};

const ITEM_PRICE = 495_000;
const SERVICE_PRICE = 15_000;
const TAX_RATE_BPS = 825;

const guideSteps = [
  {
    title: "Select the client",
    instruction:
      "Choose Alexus Jones so the sale and service work stay on one customer record.",
  },
  {
    title: "Open inventory",
    instruction:
      "Use Add Item to find the exact serialized piece without leaving the sale.",
  },
  {
    title: "Add the anniversary band",
    instruction:
      "Add serial LNK-004821. Linkd will reserve this exact piece in the sale draft.",
  },
  {
    title: "Add the sizing work",
    instruction:
      "Alexus needs the band resized before pickup. Add the service beside the item.",
  },
  {
    title: "Confirm ring sizing",
    instruction:
      "The order is prefilled from size 7 to 6.5, due September 5. Add it to the sale.",
  },
  {
    title: "Tender the balance",
    instruction:
      "The demo Visa is selected. Tender the full balance and bring it to zero.",
  },
  {
    title: "Complete the sale",
    instruction:
      "The balance is zero. Complete the sale to post every connected record together.",
  },
];

function money(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default function MakeSaleStory({ onComplete, onExit }: MakeSaleStoryProps) {
  const [step, setStep] = useState(0);

  const hasClient = step >= 1;
  const hasItem = step >= 3;
  const hasService = step >= 5;
  const isTendered = step >= 6;
  const isComplete = step >= 7;
  const subtotal = (hasItem ? ITEM_PRICE : 0) + (hasService ? SERVICE_PRICE : 0);
  const tax = Math.round((subtotal * TAX_RATE_BPS) / 10_000);
  const total = subtotal + tax;
  const tendered = isTendered ? total : 0;
  const balance = total - tendered;
  const currentGuide = guideSteps[Math.min(step, guideSteps.length - 1)];

  function finishSale() {
    if (step !== 6) return;
    setStep(7);
    onComplete();
  }

  return (
    <section className={styles.saleStory} aria-label="Guided Make a Sale workflow">
      <div className={styles.saleGuide} aria-live="polite">
        <div className={styles.saleGuideProgress}>
          <span>{isComplete ? "STORY COMPLETE" : `STEP ${step + 1} OF 7`}</span>
          <div><i style={{ width: `${(Math.min(step, 7) / 7) * 100}%` }} /></div>
        </div>
        <div className={styles.saleGuideCopy}>
          <strong>{isComplete ? "Sale complete" : currentGuide.title}</strong>
          <p>
            {isComplete
              ? "The customer, inventory, service, payment, and owner records are connected."
              : currentGuide.instruction}
          </p>
        </div>
        <div className={styles.saleGuideActions}>
          <span>Guided Demo · Sample Data</span>
          <button type="button" onClick={onExit}>Choose workflows</button>
          <button type="button" onClick={() => setStep(0)}>Restart</button>
        </div>
      </div>

      <div className={styles.saleWorkspace}>
        <aside className={`${styles.salePanel} ${styles.saleClientPanel}`}>
          <p className={styles.salePanelLabel}>CLIENT</p>
          <button
            className={`${styles.salePrimaryAction} ${step === 0 ? styles.guidedTarget : ""}`}
            disabled={step !== 0}
            onClick={() => setStep(1)}
            type="button"
          >
            <span aria-hidden="true">⌕</span> Select Client
          </button>
          <button className={styles.saleSecondaryAction} disabled type="button">
            <span aria-hidden="true">＋</span> Add New Client
          </button>

          <div className={styles.saleClientRule} />
          {hasClient ? (
            <div className={styles.saleClientDetails}>
              <div className={styles.saleClientName}>
                <div>
                  <strong>Alexus Jones</strong>
                  <span>C-10491 · (555) 013-4919</span>
                </div>
                <button type="button" disabled>Profile</button>
              </div>
              <dl>
                <div><dt>HOUSE ACCOUNT</dt><dd>$0.00</dd></div>
                <div><dt>LAYAWAY</dt><dd>$0.00</dd></div>
                <div><dt>STORE CREDIT</dt><dd>$0.00</dd></div>
              </dl>
              <div className={styles.saleWishlist}>
                <strong>♡ WISHLIST <span>1 ITEM</span></strong>
                <p>Diamond anniversary band</p>
              </div>
            </div>
          ) : (
            <div className={styles.saleNoClient}>
              <span aria-hidden="true">◎</span>
              <p>Select a client to connect the sale.</p>
            </div>
          )}
        </aside>

        <section className={`${styles.salePanel} ${styles.saleCartPanel}`}>
          <header className={styles.saleCartHeader}>
            <div>
              <p className={styles.salePanelLabel}>SALE DRAFT</p>
              <h1>Cart</h1>
            </div>
            <div>
              <button
                className={step === 1 ? styles.guidedTarget : ""}
                disabled={step !== 1}
                onClick={() => setStep(2)}
                type="button"
              >
                <span aria-hidden="true">＋</span> Add Item
              </button>
              <button
                className={step === 3 ? styles.guidedTarget : ""}
                disabled={step !== 3}
                onClick={() => setStep(4)}
                type="button"
              >
                <span aria-hidden="true">⌁</span> Add Service
              </button>
            </div>
          </header>

          <div className={styles.saleCartBody}>
            {isComplete ? (
              <div className={styles.saleCompleteCard} tabIndex={-1}>
                <span className={styles.saleCompleteMark} aria-hidden="true">✓</span>
                <p>SALE COMPLETE</p>
                <h2>Everything posted together.</h2>
                <strong>Sale S-10428 · {money(total)} · Visa •••• 4242</strong>
                <ul>
                  <li><span>✓</span><p><strong>Customer updated</strong>Purchase added to Alexus Jones’s history.</p></li>
                  <li><span>✓</span><p><strong>Inventory updated</strong>Serial LNK-004821 changed from reserved to sold.</p></li>
                  <li><span>✓</span><p><strong>Service created</strong>Work order SVC-2841 is due September 5.</p></li>
                  <li><span>✓</span><p><strong>Payment recorded</strong>{money(total)} added to today’s Visa reconciliation.</p></li>
                  <li><span>✓</span><p><strong>Owner reporting updated</strong>Daily sales increased by {money(total)}.</p></li>
                </ul>
                <button type="button" onClick={onExit}>Choose another workflow</button>
              </div>
            ) : hasItem ? (
              <div className={styles.saleLines}>
                <article>
                  <span className={styles.saleLineThumb}>AB</span>
                  <div>
                    <small>ANNIVERSARY BANDS</small>
                    <strong>14K White Gold Diamond Anniversary Band</strong>
                    <p>Style AB-750-WG · Serial LNK-004821 · Size 7 · 0.75 ctw</p>
                    <span className={styles.reservedTag}>Reserved in draft</span>
                  </div>
                  <strong>{money(ITEM_PRICE)}</strong>
                </article>
                {hasService ? (
                  <article className={styles.saleServiceLine}>
                    <span className={styles.saleLineThumb}>SVC</span>
                    <div>
                      <small>SERVICE</small>
                      <strong>Ring sizing · Size 7 to 6.5</strong>
                      <p>Due September 5, 2026 · Connected to LNK-004821</p>
                    </div>
                    <strong>{money(SERVICE_PRICE)}</strong>
                  </article>
                ) : null}
              </div>
            ) : (
              <div className={styles.saleEmptyCart}>
                <span aria-hidden="true">▢</span>
                <strong>Cart is empty</strong>
                <p>Add items or services to get started.</p>
              </div>
            )}
          </div>

          {!isComplete ? (
            <footer className={styles.saleTotals}>
              <dl>
                <div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
                <div><dt>Tax</dt><dd>{money(tax)}</dd></div>
                <div><dt>Total</dt><dd>{money(total)}</dd></div>
              </dl>
            </footer>
          ) : null}
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
              <div><dt>TENDERED</dt><dd>{money(tendered)}</dd></div>
              <div><dt>BALANCE</dt><dd>{money(balance)}</dd></div>
            </dl>
            <button
              className={step === 5 ? styles.guidedTarget : ""}
              disabled={step !== 5}
              onClick={() => setStep(6)}
              type="button"
            >
              ▭ &nbsp; Tender {step === 5 ? money(total) : ""}
            </button>
            <button
              className={step === 6 ? styles.guidedTarget : ""}
              disabled={step !== 6}
              onClick={finishSale}
              type="button"
            >
              ▭ &nbsp; Complete Sale
            </button>
            <p>
              {step < 5
                ? hasItem
                  ? "Add the service to continue."
                  : "Add at least one line."
                : step === 5
                  ? "Tender the full balance."
                  : step === 6
                    ? "Balance is ready to post."
                    : "Completed today: 1"}
            </p>
          </section>
        </aside>
      </div>

      {step === 0 ? (
        <PickerDialog
          eyebrow="CLIENT SEARCH"
          title="Select Client"
          search="Alexus Jones"
          onClose={onExit}
        >
          <button autoFocus className={styles.salePickerResult} onClick={() => setStep(1)} type="button">
            <span>AJ</span>
            <p><strong>Alexus Jones</strong><small>C-10491 · (555) 013-4919 · Returning customer</small></p>
            <i>Choose →</i>
          </button>
        </PickerDialog>
      ) : null}

      {step === 2 ? (
        <PickerDialog
          eyebrow="INVENTORY SEARCH"
          title="Add Item"
          search="LNK-004821"
          onClose={() => setStep(1)}
        >
          <button autoFocus className={styles.salePickerResult} onClick={() => setStep(3)} type="button">
            <span>AB</span>
            <p>
              <strong>14K White Gold Diamond Anniversary Band</strong>
              <small>Serial LNK-004821 · Bridal Case 02 · Available</small>
            </p>
            <i>{money(ITEM_PRICE)} &nbsp; Add →</i>
          </button>
        </PickerDialog>
      ) : null}

      {step === 4 ? (
        <PickerDialog
          eyebrow="SERVICE CATALOG"
          title="Add Service"
          search="Ring sizing"
          onClose={() => setStep(3)}
        >
          <button autoFocus className={styles.salePickerResult} onClick={() => setStep(5)} type="button">
            <span>SVC</span>
            <p>
              <strong>Ring sizing · Size 7 to 6.5</strong>
              <small>Due September 5, 2026 · Recommended for this item</small>
            </p>
            <i>{money(SERVICE_PRICE)} &nbsp; Add →</i>
          </button>
        </PickerDialog>
      ) : null}
    </section>
  );
}

function PickerDialog({
  eyebrow,
  title,
  search,
  onClose,
  children,
}: {
  eyebrow: string;
  title: string;
  search: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.salePickerBackdrop}>
      <section aria-label={title} aria-modal="true" className={styles.salePicker} role="dialog">
        <header>
          <div><p>{eyebrow}</p><h2>{title}</h2></div>
          <button aria-label={`Close ${title}`} onClick={onClose} type="button">×</button>
        </header>
        <label>
          Search
          <input readOnly value={search} />
        </label>
        <div className={styles.salePickerResults}>{children}</div>
      </section>
    </div>
  );
}
