"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./guided-demo.module.css";

type CustomerStoryProps = {
  onComplete: () => void;
  onExit: () => void;
};

const CUSTOMER_ID = "C-10491";
const TASK_ID = "TASK-20841";

const guideSteps = [
  {
    title: "Find the customer",
    instruction:
      "Search Alexus Jones to open one customer record across sales, services, balances, and relationship details.",
  },
  {
    title: "Open Alexus’s profile",
    instruction:
      "Choose the exact customer result and bring her store relationship into view.",
  },
  {
    title: "Review the connected history",
    instruction:
      "See purchases, repairs, payments, and balances in one chronological customer story.",
  },
  {
    title: "Check wishlist and milestones",
    instruction:
      "Review what Alexus likes alongside her anniversary date and preferred jewelry details.",
  },
  {
    title: "Review Linkd’s suggestion",
    instruction:
      "Inspect why Linkd surfaced this opportunity and review the personalized outreach draft.",
  },
  {
    title: "Create the follow-up task",
    instruction:
      "Add the approved anniversary outreach to William’s queue with its customer context attached.",
  },
];

export default function CustomerStory({ onComplete, onExit }: CustomerStoryProps) {
  const [step, setStep] = useState(0);
  const completionSent = useRef(false);
  const storyRef = useRef<HTMLElement>(null);
  const isComplete = step >= 6;
  const currentGuide = guideSteps[Math.min(step, guideSteps.length - 1)];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const target = storyRef.current?.querySelector<HTMLElement>(
        isComplete
          ? "[data-customer-complete]"
          : '[data-customer-guide-target="true"]',
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

  function createTask() {
    if (step !== 5 || completionSent.current) return;
    completionSent.current = true;
    setStep(6);
    onComplete();
  }

  return (
    <section
      aria-label="Guided Know the Customer workflow"
      className={`${styles.repairStory} ${styles.customerStory}`}
      ref={storyRef}
    >
      <div className={styles.saleGuide} aria-live="polite">
        <div className={styles.saleGuideProgress}>
          <span>{isComplete ? "STORY COMPLETE" : `STEP ${step + 1} OF 6`}</span>
          <div
            aria-label="Customer walkthrough progress"
            aria-valuemax={6}
            aria-valuemin={0}
            aria-valuenow={Math.min(step, 6)}
            role="progressbar"
          >
            <i style={{ width: `${(Math.min(step, 6) / 6) * 100}%` }} />
          </div>
        </div>
        <div className={styles.saleGuideCopy}>
          <strong>{isComplete ? "Customer follow-up is ready" : currentGuide.title}</strong>
          <p>
            {isComplete
              ? "Alexus’s profile, history, wishlist, milestone, opportunity, and assigned follow-up are connected."
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
        <CustomerNavigation />
        <main className={`${styles.repairServicesMain} ${styles.customerMain}`}>
          {isComplete ? (
            <CustomerComplete onExit={onExit} />
          ) : (
            <>
              <header className={styles.customerHeader}>
                <div>
                  <p>CUSTOMER MANAGEMENT</p>
                  <h1>{step < 2 ? "Customers" : "Alexus Jones"}</h1>
                  <span>{step < 2 ? "Search and manage every customer relationship." : `${CUSTOMER_ID} · Returning customer since 2019`}</span>
                </div>
                {step >= 2 ? <span className={styles.customerLoyalPill}>● LOYAL CUSTOMER</span> : null}
              </header>

              {step === 0 ? (
                <CustomerDirectory onSearch={() => setStep(1)} />
              ) : step === 1 ? (
                <CustomerResults onOpen={() => setStep(2)} />
              ) : step === 2 ? (
                <CustomerOverview onReviewHistory={() => setStep(3)} />
              ) : step === 3 ? (
                <CustomerHistory onOpenWishlist={() => setStep(4)} />
              ) : step === 4 ? (
                <CustomerWishlist onReviewSuggestion={() => setStep(5)} />
              ) : (
                <CustomerOpportunity onCreateTask={createTask} />
              )}
            </>
          )}
        </main>
      </div>
    </section>
  );
}

function CustomerNavigation() {
  return (
    <aside className={styles.repairServicesNav}>
      <strong>CUSTOMERS</strong>
      <nav aria-label="Customer workspace">
        <span className={styles.repairServiceNavActive}>Customer Search</span>
        <span>Customer List</span>
        <span>Groups &amp; Segments</span>
        <small>RELATIONSHIPS</small>
        <span>Follow-up Queue</span>
        <span>Wishlists</span>
        <span>Important Dates</span>
        <small>ACCOUNTS</small>
        <span>House Accounts</span>
        <span>Layaways</span>
        <span>Store Credit</span>
        <small>COMMUNICATION</small>
        <span>Campaigns</span>
        <span>Message History</span>
      </nav>
    </aside>
  );
}

function CustomerDirectory({ onSearch }: { onSearch: () => void }) {
  return (
    <section className={styles.customerDirectory}>
      <div className={styles.customerKpis}>
        <div><span>ACTIVE CUSTOMERS</span><strong>8,412</strong><small>Across allowed stores</small></div>
        <div><span>FOLLOW-UPS DUE</span><strong>14</strong><small>5 high-value opportunities</small></div>
        <div><span>IMPORTANT DATES</span><strong>23</strong><small>Within the next 30 days</small></div>
      </div>
      <div className={styles.customerPanel}>
        <header><div><p>CUSTOMER SEARCH</p><h2>Find a customer</h2></div><span>Search by name, phone, email, or customer ID</span></header>
        <div className={styles.customerSearchBar}>
          <label>Customer<input aria-label="Customer search" readOnly value="Alexus Jones" /></label>
          <button className={styles.guidedTarget} data-customer-guide-target="true" onClick={onSearch} type="button">⌕ Search Customers</button>
        </div>
      </div>
      <div className={styles.customerPanel}>
        <header><div><p>RECENTLY VIEWED</p><h2>Customer records</h2></div><span>Relationship context stays connected</span></header>
        <CustomerRow initials="EP" name="Eleanor Price" meta="C-0428 · Custom project in production" value="$12,700 lifetime" />
        <CustomerRow initials="MT" name="Maya Thompson" meta="C-08317 · Repair ready for pickup" value="$6,480 lifetime" />
      </div>
    </section>
  );
}

function CustomerResults({ onOpen }: { onOpen: () => void }) {
  return (
    <section className={styles.customerPanel}>
      <header><div><p>SEARCH RESULTS</p><h2>1 customer found</h2></div><span>Search: Alexus Jones</span></header>
      <div className={styles.customerResultRow}>
        <span>AJ</span>
        <div><strong>Alexus Jones</strong><p>{CUSTOMER_ID} · (555) 013-4919 · alexus.jones@example.com</p></div>
        <dl><div><dt>LAST VISIT</dt><dd>Aug 28, 2026</dd></div><div><dt>LIFETIME SPEND</dt><dd>$18,742.80</dd></div></dl>
        <button className={styles.guidedTarget} data-customer-guide-target="true" onClick={onOpen} type="button">Open Profile →</button>
      </div>
    </section>
  );
}

function CustomerOverview({ onReviewHistory }: { onReviewHistory: () => void }) {
  return (
    <section className={styles.customerProfile}>
      <CustomerIdentity />
      <div className={styles.customerKpis}>
        <div><span>LIFETIME SPEND</span><strong>$18,742.80</strong><small>12 completed purchases</small></div>
        <div><span>SERVICE JOBS</span><strong>3</strong><small>All completed</small></div>
        <div><span>AVAILABLE CREDIT</span><strong>$250.00</strong><small>Store credit</small></div>
      </div>
      <div className={styles.customerProfileGrid}>
        <div className={styles.customerPanel}>
          <header><div><p>RELATIONSHIP SUMMARY</p><h2>What the store knows</h2></div></header>
          <dl className={styles.customerFacts}>
            <div><dt>Preferred metal</dt><dd>14K white gold</dd></div>
            <div><dt>Ring size</dt><dd>6.5</dd></div>
            <div><dt>Anniversary</dt><dd>September 18</dd></div>
            <div><dt>Preferred contact</dt><dd>Text, then email</dd></div>
          </dl>
        </div>
        <div className={styles.customerPanel}>
          <header><div><p>RECENT ACTIVITY</p><h2>Connected across Linkd</h2></div></header>
          <div className={styles.customerActivity}><span>SALE</span><p><strong>Diamond anniversary band</strong>Sale S-10428 · August 28</p><em>$5,358.38</em></div>
          <div className={styles.customerActivity}><span>SVC</span><p><strong>Prong inspection completed</strong>Service R-0874 · August 12</p><em>Closed</em></div>
        </div>
      </div>
      <button className={`${styles.customerPrimaryButton} ${styles.guidedTarget}`} data-customer-guide-target="true" onClick={onReviewHistory} type="button">Review Purchase &amp; Service History →</button>
    </section>
  );
}

function CustomerHistory({ onOpenWishlist }: { onOpenWishlist: () => void }) {
  return (
    <section className={styles.customerProfile}>
      <CustomerIdentity compact />
      <div className={styles.customerPanel}>
        <header><div><p>CONNECTED HISTORY</p><h2>Purchases, services, and balances</h2></div><span>Newest first · All stores</span></header>
        <div className={styles.customerTimeline}>
          <HistoryItem date="AUG 28" type="SALE" title="14K White Gold Diamond Anniversary Band" meta="S-10428 · Visa •••• 4242 · William Jones" value="$5,358.38" />
          <HistoryItem date="AUG 12" type="SERVICE" title="Prong inspection and cleaning" meta="R-0874 · No charge · Completed by Priya Shah" value="Closed" />
          <HistoryItem date="MAY 03" type="SALE" title="Diamond station bracelet" meta="S-09864 · Corporate · William Jones" value="$3,280.00" />
          <HistoryItem date="FEB 14" type="PAYMENT" title="House account payment" meta="Account HA-10491 · Visa payment" value="$750.00" />
        </div>
        <div className={styles.customerBalances}><span>HOUSE ACCOUNT <strong>$0.00</strong></span><span>LAYAWAY <strong>$0.00</strong></span><span>STORE CREDIT <strong>$250.00</strong></span></div>
      </div>
      <button className={`${styles.customerPrimaryButton} ${styles.guidedTarget}`} data-customer-guide-target="true" onClick={onOpenWishlist} type="button">Open Wishlist &amp; Important Dates →</button>
    </section>
  );
}

function CustomerWishlist({ onReviewSuggestion }: { onReviewSuggestion: () => void }) {
  return (
    <section className={styles.customerProfile}>
      <CustomerIdentity compact />
      <div className={styles.customerProfileGrid}>
        <div className={styles.customerPanel}>
          <header><div><p>WISHLIST</p><h2>2 saved pieces</h2></div><span>Updated August 28</span></header>
          <WishlistItem code="DE" title="1.00 ctw Diamond Stud Earrings" meta="14K white gold · Item LNK-005902" value="$2,895.00" />
          <WishlistItem code="TN" title="Diamond Tennis Necklace" meta="14K white gold · Style TN-425" value="$8,950.00" />
        </div>
        <div className={styles.customerPanel}>
          <header><div><p>IMPORTANT DATES</p><h2>Relationship milestones</h2></div></header>
          <div className={styles.customerMilestone}><span>SEP<strong>18</strong></span><p><strong>Wedding anniversary</strong>21 days away · Gift opportunity</p></div>
          <div className={styles.customerMilestone}><span>NOV<strong>04</strong></span><p><strong>Birthday</strong>68 days away · Preferred: white gold</p></div>
          <div className={styles.customerPreference}><span>♡</span><p><strong>Buying pattern</strong>Diamond gifts · White gold · $2,500–$5,500</p></div>
        </div>
      </div>
      <div className={styles.customerInsightBanner}>
        <span>✦</span><p><strong>Linkd found a timely opportunity</strong>Alexus has an anniversary in 21 days and saved matching diamond studs today.</p>
        <button className={styles.guidedTarget} data-customer-guide-target="true" onClick={onReviewSuggestion} type="button">Review Suggestion →</button>
      </div>
    </section>
  );
}

function CustomerOpportunity({ onCreateTask }: { onCreateTask: () => void }) {
  return (
    <section className={styles.customerProfile}>
      <CustomerIdentity compact />
      <div className={styles.customerOpportunity}>
        <header><span>✦</span><div><p>LINKD FOLLOW-UP SUGGESTION</p><h2>Anniversary wishlist follow-up</h2><small>High confidence · Customer context reviewed by staff</small></div><em>HIGH VALUE</em></header>
        <div className={styles.customerEvidenceGrid}>
          <div><span>WHY NOW</span><strong>Anniversary in 21 days</strong><p>September 18 is recorded on Alexus’s profile.</p></div>
          <div><span>WHAT CHANGED</span><strong>Wishlist updated today</strong><p>Diamond studs match her preferred metal and spend range.</p></div>
          <div><span>RELATIONSHIP</span><strong>$18,742.80 lifetime</strong><p>12 purchases, 3 completed services, no balance due.</p></div>
        </div>
        <div className={styles.customerDraft}>
          <div><p>PERSONALIZED OUTREACH DRAFT</p><span>Text · Staff may edit before sending</span></div>
          <blockquote>Hi Alexus — it was wonderful helping you with your anniversary band. I noticed the white-gold diamond studs you saved and thought they could be a beautiful anniversary pairing. Would you like me to set them aside?</blockquote>
        </div>
        <dl className={styles.customerTaskPreview}>
          <div><dt>Task owner</dt><dd>William Jones</dd></div>
          <div><dt>Due</dt><dd>August 31, 2026 · 10:00 AM</dd></div>
          <div><dt>Channel</dt><dd>Text follow-up</dd></div>
          <div><dt>Linked record</dt><dd>{CUSTOMER_ID} · Wishlist item LNK-005902</dd></div>
        </dl>
        <button className={`${styles.customerPrimaryButton} ${styles.guidedTarget}`} data-customer-guide-target="true" onClick={onCreateTask} type="button">＋ Create Follow-up Task</button>
        <p className={styles.customerAiNote}>Linkd suggests and explains the opportunity. A staff member reviews the context and chooses whether to create outreach.</p>
      </div>
    </section>
  );
}

function CustomerComplete({ onExit }: { onExit: () => void }) {
  return (
    <section className={styles.customerComplete} data-customer-complete tabIndex={-1}>
      <header><span>✓</span><div><p>FOLLOW-UP CREATED</p><h1>Alexus’s next moment is covered.</h1><small>{TASK_ID} · Due August 31 at 10:00 AM · William Jones</small></div><strong>READY</strong></header>
      <div className={styles.customerCompleteKpis}>
        <div><span>CUSTOMER</span><strong>Alexus Jones</strong><small>{CUSTOMER_ID}</small></div>
        <div><span>OPPORTUNITY</span><strong>Anniversary</strong><small>September 18</small></div>
        <div><span>FOLLOW-UP</span><strong>Text task</strong><small>Assigned to William</small></div>
      </div>
      <ul>
        <li><span>✓</span><p><strong>Customer story united</strong>Sales, services, balances, preferences, wishlist, and milestones stay on {CUSTOMER_ID}.</p></li>
        <li><span>✓</span><p><strong>Opportunity explained</strong>The anniversary date, wishlist change, buying pattern, and relationship value support the suggestion.</p></li>
        <li><span>✓</span><p><strong>Follow-up task created</strong>{TASK_ID} carries the approved draft and its linked customer and wishlist records.</p></li>
        <li><span>✓</span><p><strong>Owner queue updated</strong>William can see the due date, priority, context, and next action from the daily owner view.</p></li>
      </ul>
      <button type="button" onClick={onExit}>Choose another workflow</button>
    </section>
  );
}

function CustomerIdentity({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.customerIdentity} ${compact ? styles.customerIdentityCompact : ""}`}>
      <span>AJ</span><div><h2>Alexus Jones</h2><p>{CUSTOMER_ID} · alexus.jones@example.com · (555) 013-4919</p></div>
      <div><small>PRIMARY STORE</small><strong>Corporate</strong></div><div><small>ASSIGNED TO</small><strong>William Jones</strong></div>
    </div>
  );
}

function CustomerRow({ initials, name, meta, value }: { initials: string; name: string; meta: string; value: string }) {
  return <div className={styles.customerRow}><span>{initials}</span><p><strong>{name}</strong><small>{meta}</small></p><em>{value}</em></div>;
}

function HistoryItem({ date, type, title, meta, value }: { date: string; type: string; title: string; meta: string; value: string }) {
  return <div><span>{date}</span><em>{type}</em><p><strong>{title}</strong><small>{meta}</small></p><b>{value}</b></div>;
}

function WishlistItem({ code, title, meta, value }: { code: string; title: string; meta: string; value: string }) {
  return <div className={styles.customerWishlistItem}><span>{code}</span><p><strong>{title}</strong><small>{meta}</small></p><div><strong>{value}</strong><small>♡ Saved</small></div></div>;
}
