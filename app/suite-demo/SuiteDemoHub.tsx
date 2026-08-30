"use client";

import Image from "next/image";
import { FormEvent, KeyboardEvent, TouchEvent, useEffect, useRef, useState } from "react";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import styles from "./suite-demo.module.css";

type Profile = {
  email: string;
  name: string;
  storeName: string;
};

type DurableAccess = {
  profile: Profile;
  resumeToken: string;
};

type LinkdProgress = {
  completedIds: string[];
  exploredIds: string[];
};

type ProductProgress = {
  complete: boolean;
  progress: number;
  total: number;
};

type SuiteProgress = Partial<Record<"jewellink" | "countretail" | "jewelhire", ProductProgress>>;

const LINKD_PROGRESS_STORAGE_KEY = "linkd-guided-demo-progress-v1";
const SUITE_ACCESS_STORAGE_KEY = "linkd-suite-demo-access-v1";
const SUITE_PROGRESS_STORAGE_KEY = "linkd-suite-product-progress-v1";
const LINKD_WORKFLOW_COUNT = 8;

const products = [
  {
    target: "linkd",
    name: "Linkd",
    role: "POS and store management",
    description:
      "Run sales, payments, balances, services, inventory, and owner reporting.",
    image: "/assets/screenshots/linkd-pos-cart-demo-card-v2.webp",
    imageAlt: "Linkd populated jewelry point of sale walkthrough",
    width: 1800,
    height: 1200,
    detail: "8 guided workflows",
    accent: "blue",
  },
  {
    target: "jewellink",
    name: "JewelLink",
    role: "Customer relationships",
    description:
      "Help associates manage clienteling, bridal, conversations, training, and follow-up.",
    image: "/assets/screenshots/jewellink-app.webp",
    imageAlt: "JewelLink clienteling and customer relationship walkthrough",
    width: 1800,
    height: 1200,
    detail: "5 guided workflows",
    accent: "violet",
  },
  {
    target: "countretail",
    name: "CountRetail",
    role: "Store analytics",
    description:
      "Review traffic, sales, marketing, inventory, predictive signals, diamonds, and Bill AI.",
    image: "/assets/screenshots/countretail-app.webp",
    imageAlt: "CountRetail retail intelligence walkthrough",
    width: 1800,
    height: 1200,
    detail: "9 guided modules",
    accent: "aqua",
  },
  {
    target: "jewelhire",
    name: "JewelHire",
    role: "Hiring and onboarding",
    description:
      "Recruit, assess, hire, and onboard jewelry-store teams in one hiring process.",
    image: "/assets/screenshots/jewelhire-recruiting-pipeline.webp",
    imageAlt: "JewelHire recruiting and onboarding walkthrough",
    width: 1271,
    height: 715,
    detail: "8–10 minute tour",
    accent: "gold",
  },
] as const;

const storySlides = [
  {
    label: "Build your suite",
    title: "Start with what your store needs now.",
    copy: "Each system solves a clear jewelry-retail problem on its own. Add the others when the business is ready—without replacing the foundation you already chose.",
    standalone: "Adopt one product without committing to the entire suite.",
    connected: "Connect another product only when shared information will help.",
    active: ["linkd", "jewellink", "countretail", "jewelhire"],
  },
  {
    label: "Operations · Linkd",
    title: "Run sales and store work in Linkd.",
    copy: "Linkd brings the counter and back office together across sales, payments, balances, services, inventory, permissions, and reporting.",
    standalone: "Use Linkd on its own as your jewelry POS and store-management system.",
    connected: "Share selected customer or store information with other products when configured.",
    active: ["linkd"],
  },
  {
    label: "Relationships · JewelLink",
    title: "Give associates a clearer next step with each customer.",
    copy: "JewelLink supports CRM, clienteling, conversations, bridal, follow-up, training, and assisted selling.",
    standalone: "Use JewelLink as a jewelry-focused customer and clienteling system.",
    connected: "Use selected Linkd customer and sales details to support follow-up when configured.",
    active: ["jewellink"],
  },
  {
    label: "Analytics · CountRetail",
    title: "See traffic, sales, marketing, and inventory together.",
    copy: "CountRetail helps owners review traffic, sales, marketing, inventory, predictive aging, diamonds, and Bill AI.",
    standalone: "Use CountRetail with the store data sources you choose to connect.",
    connected: "Add selected Linkd activity to the store-performance view when configured.",
    active: ["countretail"],
  },
  {
    label: "Hiring · JewelHire",
    title: "Build the team behind the customer experience.",
    copy: "JewelHire helps jewelry retailers attract, assess, hire, and onboard people around the specialized realities of the industry.",
    standalone: "Modernizes recruiting and onboarding for jewelry roles.",
    connected: "Keep hiring separate or connect team information when a shared process will help.",
    active: ["jewelhire"],
  },
  {
    label: "Use one or connect several",
    title: "Choose the products your store needs.",
    copy: "Linkd runs store operations, JewelLink supports relationships, CountRetail provides analytics, and JewelHire supports hiring. Each keeps its own clear job.",
    standalone: "Every product remains valuable and understandable on its own.",
    connected: "Connect only the customer, store, or team information that supports your process.",
    active: ["linkd", "jewellink", "countretail", "jewelhire"],
  },
] as const;

export default function SuiteDemoHub() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [linkdProgress, setLinkdProgress] = useState<LinkdProgress>({
    completedIds: [],
    exploredIds: [],
  });
  const [suiteProgress, setSuiteProgress] = useState<SuiteProgress>({});
  const touchStart = useRef<number | null>(null);
  const formHeadingRef = useRef<HTMLHeadingElement>(null);
  const activeStory = storySlides[activeSlide];
  const unlocked = Boolean(profile);

  useEffect(() => {
    const readLinkdProgress = () => {
      try {
        const saved = JSON.parse(
          window.localStorage.getItem(LINKD_PROGRESS_STORAGE_KEY) || "{}",
        ) as Partial<LinkdProgress>;
        const readIds = (value: unknown) => Array.isArray(value)
          ? [...new Set(value.filter((id): id is string => typeof id === "string"))]
          : [];
        setLinkdProgress({
          completedIds: readIds(saved.completedIds),
          exploredIds: readIds(saved.exploredIds),
        });
      } catch {
        setLinkdProgress({ completedIds: [], exploredIds: [] });
      }
    };
    const handleVisibility = () => {
      if (document.visibilityState === "visible") readLinkdProgress();
    };

    readLinkdProgress();
    window.addEventListener("focus", readLinkdProgress);
    window.addEventListener("pageshow", readLinkdProgress);
    window.addEventListener("storage", readLinkdProgress);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("focus", readLinkdProgress);
      window.removeEventListener("pageshow", readLinkdProgress);
      window.removeEventListener("storage", readLinkdProgress);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    const readSuiteProgress = () => {
      try {
        const saved = JSON.parse(
          window.localStorage.getItem(SUITE_PROGRESS_STORAGE_KEY) || "{}",
        ) as SuiteProgress;
        setSuiteProgress(saved && typeof saved === "object" ? saved : {});
      } catch {
        window.localStorage.removeItem(SUITE_PROGRESS_STORAGE_KEY);
        setSuiteProgress({});
      }
    };

    readSuiteProgress();
    const params = new URLSearchParams(window.location.search);
    const tour = params.get("tour");
    if (tour === "jewellink" || tour === "countretail" || tour === "jewelhire") {
      const current = (() => {
        try {
          return JSON.parse(
            window.localStorage.getItem(SUITE_PROGRESS_STORAGE_KEY) || "{}",
          ) as SuiteProgress;
        } catch {
          return {};
        }
      })();
      const progress = Math.max(1, Number.parseInt(params.get("progress") || "1", 10) || 1);
      const total = Math.max(progress, Number.parseInt(params.get("total") || "1", 10) || 1);
      const next = {
        ...current,
        [tour]: {
          complete: params.get("complete") === "1" || progress >= total,
          progress,
          total,
        },
      };
      window.localStorage.setItem(SUITE_PROGRESS_STORAGE_KEY, JSON.stringify(next));
      queueMicrotask(() => setSuiteProgress(next));
      window.history.replaceState({}, "", `${window.location.pathname}#tour-heading`);
    }

    const handleFocus = () => readSuiteProgress();
    window.addEventListener("focus", handleFocus);
    window.addEventListener("pageshow", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("pageshow", handleFocus);
    };
  }, []);

  const rememberTourLaunch = (target: typeof products[number]["target"]) => {
    if (target === "linkd") return;
    const previous = suiteProgress[target];
    const next = {
      ...suiteProgress,
      [target]: previous || { complete: false, progress: 1, total: 1 },
    };
    window.localStorage.setItem(SUITE_PROGRESS_STORAGE_KEY, JSON.stringify(next));
    setSuiteProgress(next);
  };

  useEffect(() => {
    let cancelled = false;
    const accessRequired = new URLSearchParams(window.location.search).get("access") === "required";

    const readDurableAccess = () => {
      try {
        const saved = JSON.parse(
          window.localStorage.getItem(SUITE_ACCESS_STORAGE_KEY) || "null",
        ) as DurableAccess | null;
        return saved?.profile?.email && saved.resumeToken ? saved : null;
      } catch {
        window.localStorage.removeItem(SUITE_ACCESS_STORAGE_KEY);
        return null;
      }
    };

    const restoreDurableAccess = async () => {
      const saved = readDurableAccess();
      if (!saved) return false;
      const response = await fetch("/api/suite-demo-session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resumeToken: saved.resumeToken }),
        cache: "no-store",
      });
      const result = await response.json() as { ok?: boolean; profile?: Profile };
      if (!response.ok || !result.ok || !result.profile) {
        window.localStorage.removeItem(SUITE_ACCESS_STORAGE_KEY);
        return false;
      }
      if (!cancelled) setProfile(result.profile);
      return true;
    };

    fetch("/api/suite-demo-session", { cache: "no-store" })
      .then(async (response) => response.json() as Promise<{ ok?: boolean; profile?: Profile }>)
      .then(async (result) => {
        if (cancelled) return;
        if (result.ok && result.profile) {
          setProfile(result.profile);
        } else if (!(await restoreDurableAccess()) && accessRequired) {
          setStatus("Enter your details once to open all four guided tours.");
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setSessionChecked(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function unlockTours(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");
    const form = new FormData(event.currentTarget);
    const params = new URLSearchParams(window.location.search);

    try {
      const response = await fetch("/api/suite-demo-access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") || "").trim(),
          storeName: String(form.get("storeName") || "").trim(),
          email: String(form.get("email") || "").trim(),
          website: String(form.get("website") || ""),
          sourcePath: `${window.location.pathname}${window.location.search}`,
          sourceUrl: window.location.href,
          referrer: document.referrer,
          utmSource: params.get("utm_source") || "",
          utmMedium: params.get("utm_medium") || "",
          utmCampaign: params.get("utm_campaign") || "",
          utmContent: params.get("utm_content") || "",
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        profile?: Profile;
        resumeToken?: string;
      };

      if (!response.ok || !result.ok || !result.profile || !result.resumeToken) {
        setStatus(result.message || "Please check your details and try again.");
        return;
      }

      setProfile(result.profile);
      window.localStorage.setItem(
        SUITE_ACCESS_STORAGE_KEY,
        JSON.stringify({ profile: result.profile, resumeToken: result.resumeToken }),
      );
      setStatus("All four guided tours are open.");
      window.history.replaceState({}, "", window.location.pathname);
    } catch {
      setStatus("Suite access is temporarily unavailable. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function focusAccessForm() {
    document.getElementById("suite-access")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => formHeadingRef.current?.focus(), 450);
  }

  function selectSlide(index: number) {
    const count = storySlides.length;
    setActiveSlide((index + count) % count);
  }

  function handleStoryKeys(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectSlide(activeSlide - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectSlide(activeSlide + 1);
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    touchStart.current = event.changedTouches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    if (touchStart.current === null) return;
    const end = event.changedTouches[0]?.clientX ?? touchStart.current;
    const distance = end - touchStart.current;
    touchStart.current = null;
    if (Math.abs(distance) < 48) return;
    selectSlide(activeSlide + (distance < 0 ? 1 : -1));
  }

  return (
    <main className={`premier-page ${styles.suitePage}`}>
      <SiteHeader demoHref="#suite-access" />

      <section className={`${styles.hero} ${unlocked ? styles.heroUnlocked : ""}`}>
        <aside
          className={`${styles.accessPanel} ${unlocked ? styles.accessPanelUnlocked : ""}`}
          id="suite-access"
        >
          {unlocked ? (
            <div className={styles.unlockedPanel}>
              <h1>Welcome, {profile?.name}.</h1>
              <p>
                Choose the system you wish to demo below: Linkd POS, JewelLink CRM,
                CountRetail Analytics, or JewelHire Hiring.
              </p>
              <div className={styles.unlockedActions}>
                <a className="button button-primary" href="#tour-heading">
                  Choose a guided tour
                </a>
                <small>Your access and progress stay available in this browser when you return.</small>
              </div>
            </div>
          ) : (
            <>
              <p className={styles.panelEyebrow}>Guided tour access</p>
              <h1 ref={formHeadingRef} tabIndex={-1}>Open all four guided tours.</h1>
              <p>Enter your details once, then choose any walkthrough without another form.</p>
              <form className={styles.accessForm} onSubmit={unlockTours}>
                <fieldset disabled={submitting}>
                  <label>
                    <span>Your name</span>
                    <input name="name" autoComplete="name" placeholder="John Jones" required />
                  </label>
                  <label>
                    <span>Jewelry store</span>
                    <input
                      name="storeName"
                      autoComplete="organization"
                      placeholder="Linkd Demo Jewelers"
                      required
                    />
                  </label>
                  <label>
                    <span>Work email</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="John@yourstore.com"
                      required
                    />
                  </label>
                  <label className={styles.honeypot} aria-hidden="true">
                    <span>Website</span>
                    <input name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                  <button className="button button-primary" type="submit">
                    {submitting ? "Opening your tours…" : "Open all four tours"}
                  </button>
                </fieldset>
              </form>
              <p className={styles.formStatus} aria-live="polite">{status}</p>
              <small>
                {sessionChecked ? "One submission. No installation. Guided sample data only." : "Checking existing suite access…"}
              </small>
            </>
          )}
        </aside>
      </section>

      <section className={styles.toursSection} aria-labelledby="tour-heading">
        <div className={styles.sectionHeading}>
          <p className="eyebrow">Four products. Choose where to start.</p>
          <h2 id="tour-heading">Choose your guided tour.</h2>
          <p>
            {unlocked
              ? "All four tours are open. Start anywhere and return for the others."
              : "Preview all four now. Enter your details once to start any tour."}
          </p>
        </div>

        <div className={styles.tourGrid}>
          {products.map((product) => {
            const isLinkd = product.target === "linkd";
            const productProgress = isLinkd ? null : suiteProgress[product.target];
            const exploredCount = new Set([
              ...linkdProgress.exploredIds,
              ...linkdProgress.completedIds,
            ]).size;
            const completedCount = linkdProgress.completedIds.length;
            const detail = isLinkd && exploredCount > 0
              ? completedCount === LINKD_WORKFLOW_COUNT
                ? `${LINKD_WORKFLOW_COUNT} of ${LINKD_WORKFLOW_COUNT} workflows completed`
                : `${exploredCount} of ${LINKD_WORKFLOW_COUNT} workflows explored`
              : productProgress
                ? productProgress.complete
                  ? `${productProgress.total} of ${productProgress.total} guided steps completed`
                  : productProgress.total > 1
                    ? `${Math.min(productProgress.progress, productProgress.total)} of ${productProgress.total} guided steps explored`
                    : "Guided tour started"
              : product.detail;
            const tourAction = isLinkd && exploredCount > 0
              ? completedCount === LINKD_WORKFLOW_COUNT
                ? "Review guided tour"
                : "Continue guided tour"
              : productProgress
                ? productProgress.complete
                  ? "Review guided tour"
                  : "Continue guided tour"
              : "Start guided tour";

            return (
            <article
              className={`${styles.tourCard} ${styles[product.accent]} ${unlocked ? styles.tourCardUnlocked : ""}`}
              key={product.name}
            >
              <div className={styles.cardVisual}>
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  width={product.width}
                  height={product.height}
                  sizes="(max-width: 760px) 92vw, 44vw"
                  unoptimized
                />
                <span>{product.role}</span>
              </div>
              <div className={styles.cardBody}>
                <div>
                  <p>{product.role}</p>
                  <h3>{product.name}</h3>
                </div>
                <p>{product.description}</p>
                <footer>
                  <span>{detail}</span>
                  {unlocked ? (
                    <a
                      href={`/api/suite-demo-launch?target=${product.target}`}
                      onClick={() => rememberTourLaunch(product.target)}
                    >
                      {tourAction} <span aria-hidden="true">→</span>
                    </a>
                  ) : (
                    <button type="button" onClick={focusAccessForm}>
                      Enter details to start <span aria-hidden="true">→</span>
                    </button>
                  )}
                </footer>
              </div>
            </article>
            );
          })}
        </div>
      </section>

      <section
        className={styles.storySection}
        aria-labelledby="ecosystem-story-heading"
        onKeyDown={handleStoryKeys}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        tabIndex={0}
      >
        <div className={styles.storyCopy}>
          <p className={styles.storyStep}>
            Ecosystem story <span>{activeSlide + 1} / {storySlides.length}</span>
          </p>
          <div className={styles.storyText} key={activeStory.label} aria-live="polite">
            <p className={styles.storyLabel}>{activeStory.label}</p>
            <h2 id="ecosystem-story-heading">{activeStory.title}</h2>
            <p>{activeStory.copy}</p>
            <div className={styles.storyProofs}>
              <div>
                <span>Works independently</span>
                <p>{activeStory.standalone}</p>
              </div>
              <div>
                <span>When connected</span>
                <p>{activeStory.connected}</p>
              </div>
            </div>
          </div>
          <div className={styles.storyControls}>
            <button type="button" onClick={() => selectSlide(activeSlide - 1)} aria-label="Previous ecosystem story">
              ←
            </button>
            <div aria-label="Choose ecosystem story">
              {storySlides.map((slide, index) => (
                <button
                  aria-label={`Show story ${index + 1}: ${slide.label}`}
                  aria-current={index === activeSlide ? "step" : undefined}
                  className={index === activeSlide ? styles.activeDot : undefined}
                  key={slide.label}
                  onClick={() => selectSlide(index)}
                  type="button"
                />
              ))}
            </div>
            <button type="button" onClick={() => selectSlide(activeSlide + 1)} aria-label="Next ecosystem story">
              →
            </button>
          </div>
        </div>

        <div className={styles.storyMap} aria-label="Four connected Linkd Suite systems">
          <div className={styles.mapCenter}>
            <span>One jewelry business</span>
            <strong>LINKD SUITE</strong>
            <small>Use one · connect any · grow together</small>
          </div>
          {products.map((product, index) => (
            <div
              className={`${styles.mapNode} ${styles[`mapNode${index + 1}`]} ${
                (activeStory.active as readonly string[]).includes(product.target) ? styles.mapNodeActive : ""
              }`}
              key={product.target}
            >
              <span>{product.role}</span>
              <strong>{product.name}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <p className="eyebrow">One short form. Four guided tours.</p>
        <h2>{unlocked ? "All four tours are waiting." : "Explore every product without starting over."}</h2>
        <p>
          Explore POS and store management, customer relationships, store
          analytics, and hiring at your own pace.
        </p>
        <a className="button button-primary" href={unlocked ? "#tour-heading" : "#suite-access"}>
          {unlocked ? "Choose a tour" : "Open the guided tours"}
        </a>
      </section>

      <SiteFooter demoHref="#suite-access" />
    </main>
  );
}
