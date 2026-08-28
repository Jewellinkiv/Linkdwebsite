"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import CustomStory from "./CustomStory";
import InvoiceAiStory from "./InvoiceAiStory";
import InventoryManagementStory from "./InventoryManagementStory";
import InventorySecurityStory from "./InventorySecurityStory";
import MakeSaleStory from "./MakeSaleStory";
import RepairStory from "./RepairStory";
import styles from "./guided-demo.module.css";

type DemoProfile = {
  name: string;
  storeName: string;
  email: string;
};

type Workflow = {
  id: string;
  code: string;
  area: string;
  title: string;
  description: string;
  duration: string;
  steps: number;
  tone: "blue" | "violet" | "aqua" | "gold" | "navy" | "rose";
  recommended?: boolean;
};

const workflows: Workflow[] = [
  {
    id: "make-a-sale",
    code: "POS",
    area: "Sales",
    title: "Make a sale",
    description:
      "Select a client, add a serialized item, tender payment, and review the receipt.",
    duration: "3 min",
    steps: 5,
    tone: "blue",
    recommended: true,
  },
  {
    id: "repair-management",
    code: "SVC",
    area: "Services",
    title: "Repair intake & management",
    description:
      "Document the piece, collect a deposit and move the job toward pickup.",
    duration: "4 min",
    steps: 8,
    tone: "violet",
  },
  {
    id: "custom-management",
    code: "CST",
    area: "Services",
    title: "Custom intake & management",
    description:
      "Capture the idea, budget, approvals and milestones for a custom project.",
    duration: "4 min",
    steps: 8,
    tone: "rose",
  },
  {
    id: "invoice-ai",
    code: "AI",
    area: "Inventory entry",
    title: "AI invoice import",
    description:
      "Upload a vendor invoice and review the item drafts created by Vision AI.",
    duration: "3 min",
    steps: 6,
    tone: "aqua",
  },
  {
    id: "inventory-management",
    code: "INV",
    area: "Inventory",
    title: "Inventory entry & management",
    description:
      "Receive, serialize, price, tag, locate and manage jewelry inventory.",
    duration: "4 min",
    steps: 7,
    tone: "navy",
  },
  {
    id: "customer-story",
    code: "CRM",
    area: "Customers",
    title: "Know the customer",
    description:
      "See purchases, services, wishlist, balances and follow-up opportunities.",
    duration: "3 min",
    steps: 6,
    tone: "blue",
  },
  {
    id: "owner-story",
    code: "OWN",
    area: "Owner view",
    title: "Run the day as an owner",
    description:
      "Review sales, tenders, work due, aging inventory and store exceptions.",
    duration: "3 min",
    steps: 6,
    tone: "gold",
  },
  {
    id: "inventory-security",
    code: "SEC",
    area: "Security",
    title: "Resolve a security exception",
    description:
      "Run a case count, find a variance and review the item movement trail.",
    duration: "3 min",
    steps: 7,
    tone: "navy",
  },
];

const navItems = [
  "POS",
  "Customers",
  "Services",
  "Inventory",
  "Reports",
  "Office",
  "Settings",
  "Help",
];

const liveWorkflowIds = new Set([
  "make-a-sale",
  "repair-management",
  "custom-management",
  "invoice-ai",
  "inventory-management",
  "inventory-security",
]);

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

export default function GuidedDemoChooser() {
  const [profile, setProfile] = useState<DemoProfile | null>(null);
  const [selectedId, setSelectedId] = useState(workflows[0].id);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);
  const [serviceWorkspaceActive, setServiceWorkspaceActive] = useState(false);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [leadStatus, setLeadStatus] = useState("");

  const selectedWorkflow = useMemo(
    () => workflows.find((workflow) => workflow.id === selectedId) ?? workflows[0],
    [selectedId],
  );
  const activeNavItem = activeWorkflow === "invoice-ai"
    || activeWorkflow === "inventory-management"
    || activeWorkflow === "inventory-security"
    ? "Inventory"
    : serviceWorkspaceActive
      ? "Services"
      : "POS";

  async function enterDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextProfile = {
      name: String(form.get("name") || "").trim(),
      storeName: String(form.get("storeName") || "").trim(),
      email: String(form.get("email") || "").trim(),
    };

    if (!nextProfile.name || !nextProfile.storeName || !nextProfile.email) return;

    setProfile(nextProfile);

    try {
      const response = await fetch("/api/demo-access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...nextProfile,
          website: String(form.get("website") || ""),
          sourcePath: `${window.location.pathname}${window.location.search}`,
          sourceUrl: window.location.href,
          referrer: document.referrer,
        }),
        keepalive: true,
      });

      if (!response.ok) {
        setLeadStatus("Your demo is open. Contact delivery is temporarily unavailable.");
      }
    } catch {
      setLeadStatus("Your demo is open. Contact delivery is temporarily unavailable.");
    }
  }

  function changeProfile() {
    setProfile(null);
    setActiveWorkflow(null);
    setServiceWorkspaceActive(false);
    setCompletedIds([]);
    setSelectedId(workflows[0].id);
    setConfirmedId(null);
    setLeadStatus("");
  }

  function selectWorkflow(workflow: Workflow) {
    setSelectedId(workflow.id);
    setConfirmedId(null);

    if (liveWorkflowIds.has(workflow.id)) {
      if (workflow.area === "Services") setServiceWorkspaceActive(false);
      setActiveWorkflow(workflow.id);
    }
  }

  function launchSelectedWorkflow() {
    if (liveWorkflowIds.has(selectedWorkflow.id)) {
      if (selectedWorkflow.area === "Services") setServiceWorkspaceActive(false);
      setActiveWorkflow(selectedWorkflow.id);
      return;
    }

    setConfirmedId(selectedWorkflow.id);
  }

  function completeWorkflow(workflowId: string) {
    setCompletedIds((current) =>
      current.includes(workflowId) ? current : [...current, workflowId],
    );
  }

  function exitWorkflow() {
    setActiveWorkflow(null);
    setServiceWorkspaceActive(false);
  }

  return (
    <main className={styles.demoPage}>
      <header className={styles.posHeader}>
        <Link className={styles.logo} href="/" aria-label="Linkd home">
          <span className={styles.logoCrop}>
            <Image
              src="/assets/brand/linkd-logo-main.webp"
              alt="Linkd"
              width={1200}
              height={721}
              priority
              unoptimized
            />
          </span>
        </Link>

        <nav className={styles.posNav} aria-label="Linkd demo navigation">
          {navItems.map((item) => (
            <span
              className={
                item === activeNavItem
                  ? styles.activeNav
                  : undefined
              }
              key={item}
            >
              {item}
            </span>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <span className={styles.demoPill}>
            {activeWorkflow ? (
              serviceWorkspaceActive
                || activeWorkflow === "invoice-ai"
                || activeWorkflow === "inventory-management"
                || activeWorkflow === "inventory-security" ? (
                <>Parked <em>0</em></>
              ) : (
                <><b aria-hidden="true">Ⅱ</b> Park / Resume <em>0</em></>
              )
            ) : (
              <><i aria-hidden="true" /> Guided Demo</>
            )}
          </span>
          <span className={styles.headerIdentity}>
            <small>DEMO STORE</small>
            <strong>{profile?.storeName || "Your Jewelry Store"}</strong>
          </span>
          <span className={styles.headerIdentity}>
            <small>MY PORTAL</small>
            <strong>{profile?.name || "Guest User"}</strong>
          </span>
          <Link className={styles.exitButton} href="/">
            Exit demo
          </Link>
        </div>
      </header>

      <div className={styles.mobileHeaderNote}>
        <span>Guided Demo</span>
        <strong>{profile?.storeName || "Your Jewelry Store"}</strong>
      </div>

      {activeWorkflow === "make-a-sale" ? (
        <MakeSaleStory
          onComplete={() => completeWorkflow("make-a-sale")}
          onExit={exitWorkflow}
        />
      ) : activeWorkflow === "repair-management" ? (
        <RepairStory
          onComplete={() => completeWorkflow("repair-management")}
          onBenchChange={setServiceWorkspaceActive}
          onExit={exitWorkflow}
        />
      ) : activeWorkflow === "custom-management" ? (
        <CustomStory
          onComplete={() => completeWorkflow("custom-management")}
          onExit={exitWorkflow}
          onWorkspaceChange={setServiceWorkspaceActive}
        />
      ) : activeWorkflow === "invoice-ai" ? (
        <InvoiceAiStory
          onComplete={() => completeWorkflow("invoice-ai")}
          onExit={exitWorkflow}
        />
      ) : activeWorkflow === "inventory-management" ? (
        <InventoryManagementStory
          onComplete={() => completeWorkflow("inventory-management")}
          onExit={exitWorkflow}
        />
      ) : activeWorkflow === "inventory-security" ? (
        <InventorySecurityStory
          onComplete={() => completeWorkflow("inventory-security")}
          onExit={exitWorkflow}
        />
      ) : (
      <div className={styles.workspace}>
        <aside className={styles.sideColumn} aria-label="Your demo information">
          <section className={styles.panel}>
            <p className={styles.panelLabel}>YOUR DEMO</p>
            <div className={styles.profileCard}>
              <span className={styles.avatar} aria-hidden="true">
                {profile?.name.slice(0, 1).toUpperCase() || "L"}
              </span>
              <div>
                <strong>
                  {profile ? `Welcome, ${firstName(profile.name)}` : "Welcome to Linkd"}
                </strong>
                <span>{profile?.storeName || "Interactive product tour"}</span>
              </div>
            </div>
            <p className={styles.leadStatus} aria-live="polite">{leadStatus}</p>
            <button
              className={styles.outlineButton}
              type="button"
              onClick={changeProfile}
            >
              Change demo details
            </button>
            <div className={styles.divider} />
            <div className={styles.progressHeading}>
              <span>WORKFLOWS EXPLORED</span>
              <strong>{completedIds.length} / {workflows.length}</strong>
            </div>
            <div
              className={styles.progressTrack}
              aria-label={`${completedIds.length} workflows completed`}
            >
              <span style={{ width: `${Math.max(4, (completedIds.length / workflows.length) * 100)}%` }} />
            </div>
          </section>

          <section className={`${styles.panel} ${styles.guidePanel}`}>
            <p className={styles.panelLabel}>HOW IT WORKS</p>
            <ol>
              <li>
                <span>1</span>
                <p><strong>Choose a workflow</strong>Start with what matters to your store.</p>
              </li>
              <li>
                <span>2</span>
                <p><strong>Follow the guide</strong>Complete each step with sample data.</p>
              </li>
              <li>
                <span>3</span>
                <p><strong>See the connection</strong>Watch Linkd update the whole record.</p>
              </li>
            </ol>
          </section>
        </aside>

        <section className={`${styles.panel} ${styles.workflowPanel}`}>
          <div className={styles.workflowHeader}>
            <div>
              <p className={styles.panelLabel}>GUIDED WORKFLOWS</p>
              <h1>What would you like to do?</h1>
              <p>Choose a real jewelry-store workflow. You can explore the others anytime.</p>
            </div>
            <span className={styles.sampleBadge}>Sample data only</span>
          </div>

          <div className={styles.workflowGrid}>
            {workflows.map((workflow) => (
              <button
                aria-pressed={selectedId === workflow.id}
                className={`${styles.workflowCard} ${styles[workflow.tone]}`}
                key={workflow.id}
                onClick={() => selectWorkflow(workflow)}
                type="button"
              >
                <span className={styles.workflowTopline}>
                  <span className={styles.workflowCode}>{workflow.code}</span>
                  <span>{workflow.area}</span>
                  {workflow.recommended ? (
                    <span className={styles.recommendedTag}>Recommended</span>
                  ) : null}
                  {completedIds.includes(workflow.id) ? (
                    <span className={styles.completedTag}>Completed</span>
                  ) : null}
                </span>
                <strong>{workflow.title}</strong>
                <p>{workflow.description}</p>
                <span className={styles.workflowMeta}>
                  <span>{workflow.duration}</span>
                  <span>{workflow.steps} guided steps</span>
                  <i aria-hidden="true">→</i>
                </span>
              </button>
            ))}
          </div>
        </section>

        <aside className={styles.sideColumn} aria-label="Selected workflow">
          <section className={`${styles.panel} ${styles.selectedPanel}`}>
            <p className={styles.panelLabel}>SELECTED WORKFLOW</p>
            <span className={`${styles.selectedCode} ${styles[selectedWorkflow.tone]}`}>
              {selectedWorkflow.code}
            </span>
            <h2>{selectedWorkflow.title}</h2>
            <p>{selectedWorkflow.description}</p>
            <dl>
              <div>
                <dt>ESTIMATED TIME</dt>
                <dd>{selectedWorkflow.duration}</dd>
              </div>
              <div>
                <dt>GUIDED STEPS</dt>
                <dd>{selectedWorkflow.steps}</dd>
              </div>
            </dl>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={launchSelectedWorkflow}
            >
              {selectedWorkflow.id === "make-a-sale"
                ? "Start guided sale"
                : selectedWorkflow.id === "repair-management"
                  ? "Start guided repair"
                : selectedWorkflow.id === "custom-management"
                  ? "Start guided custom job"
                : selectedWorkflow.id === "invoice-ai"
                  ? "Start guided invoice import"
                : selectedWorkflow.id === "inventory-management"
                  ? "Start guided inventory entry"
                : selectedWorkflow.id === "inventory-security"
                  ? "Start guided case count"
                : confirmedId === selectedWorkflow.id
                  ? "Workflow selected"
                  : "Choose this workflow"}
              <span aria-hidden="true">→</span>
            </button>
            <p className={styles.selectedNote} aria-live="polite">
              {selectedWorkflow.id === "make-a-sale"
                ? "Opens the guided Linkd sale workspace."
                : selectedWorkflow.id === "repair-management"
                  ? "Opens the guided Linkd repair intake and service bench."
                : selectedWorkflow.id === "custom-management"
                  ? "Opens the guided Linkd custom intake, approval, and production handoff."
                : selectedWorkflow.id === "invoice-ai"
                  ? "Opens the guided Linkd invoice upload, AI review, and inventory handoff."
                : selectedWorkflow.id === "inventory-management"
                  ? "Opens the guided Linkd item entry, tagging, placement, and movement history."
                : selectedWorkflow.id === "inventory-security"
                  ? "Opens the guided Linkd case scan, variance review, and audit resolution."
                : confirmedId === selectedWorkflow.id
                ? `${selectedWorkflow.title} is ready. Its guided steps are coming next.`
                : "You can change workflows at any time."}
            </p>
          </section>

          <section className={`${styles.panel} ${styles.quickPanel}`}>
            <p className={styles.panelLabel}>QUICK START</p>
            {workflows.slice(0, 3).map((workflow) => (
              <button
                key={workflow.id}
                onClick={() => selectWorkflow(workflow)}
                type="button"
              >
                <span className={`${styles.miniCode} ${styles[workflow.tone]}`}>
                  {workflow.code}
                </span>
                <span>{workflow.title}</span>
                <i aria-hidden="true">›</i>
              </button>
            ))}
          </section>
        </aside>
      </div>
      )}

      {!profile ? (
        <div className={styles.gateBackdrop} role="presentation">
          <section
            aria-labelledby="demo-gate-title"
            aria-modal="true"
            className={styles.gateCard}
            role="dialog"
          >
            <div className={styles.gateBrand}>
              <span className={styles.gateMark}>L</span>
              <span>LINKD GUIDED DEMO</span>
            </div>
            <p className={styles.gateEyebrow}>GUIDED DEMO ACCESS</p>
            <h2 id="demo-gate-title">Create your demo store.</h2>
            <p className={styles.gateIntro}>
              Enter your details to unlock interactive Linkd workflows using sample data.
            </p>

            <form onSubmit={enterDemo}>
              <input
                className={styles.hiddenField}
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <div className={styles.gateFields}>
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Alex Morgan"
                    autoFocus
                    required
                  />
                </label>
                <label>
                  Store name
                  <input
                    name="storeName"
                    autoComplete="organization"
                    placeholder="Morgan Jewelers"
                    required
                  />
                </label>
                <label className={styles.emailField}>
                  Email
                  <input
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="alex@morganjewelers.com"
                    required
                  />
                </label>
              </div>
              <button className={styles.gateButton} type="submit">
                Enter the guided demo <span aria-hidden="true">→</span>
              </button>
              {process.env.NODE_ENV === "development" ? (
                <button
                  className={styles.localPreviewButton}
                  onClick={() =>
                    setProfile({
                      name: "Local Preview",
                      storeName: "Sissy's Log Cabin",
                      email: "preview@linkd.local",
                    })
                  }
                  type="button"
                >
                  Open with sample demo details
                </button>
              ) : null}
            </form>

            <p className={styles.consentCopy}>
              By continuing, you agree that Linkd may contact you about this demo. No live store data is used.
            </p>
          </section>
        </div>
      ) : null}
    </main>
  );
}
