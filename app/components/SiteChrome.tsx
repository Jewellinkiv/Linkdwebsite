"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

type SiteHeaderProps = {
  current?: string;
  demoHref?: string;
};

const platformLinks = [
  { href: "/jewelry-pos", label: "POS & checkout" },
  { href: "/accounting", label: "Receivables & finance" },
  { href: "/repairs", label: "Repairs & services" },
  { href: "/inventory", label: "Inventory flow" },
  { href: "/multi-store", label: "Multi-store operations" },
  { href: "/security", label: "Security & controls" },
];

const primaryLinks = [
  { href: "/jewelry-pos", label: "Platform", key: "platform", children: platformLinks },
  {
    href: "/payments",
    label: "Payments",
    key: "payments",
    children: [
      { href: "/payments", label: "Payment processing" },
      { href: "/accounting", label: "Receivables & finance" },
    ],
  },
  {
    href: "/ecosystem",
    label: "Ecosystem",
    key: "ecosystem",
    children: [
      { href: "/ecosystem", label: "Linkd Ecosystem" },
      { href: "/suite-demo", label: "Guided Tours" },
      { href: "https://www.jewellink.com/", label: "JewelLink", external: true },
      { href: "https://www.countretail.com/", label: "CountRetail", external: true },
      { href: "https://jewelhire.com/", label: "JewelHire", external: true },
    ],
  },
  {
    href: "/integrations",
    label: "Integrations",
    key: "integrations",
    children: [
      { href: "/integrations", label: "Integration overview" },
      { href: "/accounting", label: "Accounting connections" },
      { href: "/security", label: "Security & controls" },
      { href: "/#migration", label: "Migration services" },
    ],
  },
  { href: "/#migration", label: "Switch to Linkd", key: "migration" },
] as const;

export function SiteHeader({ current, demoHref = "#early-access" }: SiteHeaderProps) {
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const [openMenu, setOpenMenu] = useState<{ key: string; pathname: string } | null>(null);
  const openMenuKey = openMenu?.pathname === pathname ? openMenu.key : null;
  const closeMobileMenu = () => mobileMenuRef.current?.removeAttribute("open");

  return (
    <header className="site-header premier-header">
      <Link className="brand-lockup" href="/" aria-label="Linkd home">
        <span className="brand-logo-crop">
          <Image
            src="/assets/brand/linkd-logo-main.webp"
            alt="Linkd"
            width={1200}
            height={721}
            loading="eager"
            sizes="(max-width: 540px) 112px, 132px"
            unoptimized
          />
        </span>
      </Link>

      <nav className="premier-nav" aria-label="Primary navigation">
        {primaryLinks.map((item) => {
          const children = "children" in item ? item.children : undefined;

          return (
            <div
              className={`premier-nav-group ${openMenuKey === item.key ? "is-open" : ""}`}
              key={item.key}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setOpenMenu(null);
              }}
              onFocus={() => children && setOpenMenu({ key: item.key, pathname })}
              onMouseEnter={() => children && setOpenMenu({ key: item.key, pathname })}
              onMouseLeave={() => children && setOpenMenu(null)}
            >
              <span className="premier-nav-trigger">
                <Link
                  aria-current={current === item.key ? "page" : undefined}
                  href={item.href}
                  onClick={(event) => {
                    event.currentTarget.blur();
                    setOpenMenu(null);
                  }}
                >
                  {item.label}
                </Link>
                {children ? (
                  <button
                    aria-expanded={openMenuKey === item.key}
                    aria-label={`Open ${item.label} menu`}
                    onClick={() => setOpenMenu((value) =>
                      value?.key === item.key && value.pathname === pathname
                        ? null
                        : { key: item.key, pathname }
                    )}
                    type="button"
                  >
                    <span aria-hidden="true">⌄</span>
                  </button>
                ) : null}
              </span>
              {children ? (
                <div className="premier-nav-dropdown">
                  <span>{item.label}</span>
                  {children.map((child) => {
                    const active = !child.href.startsWith("http")
                      && child.href.split("#")[0] === pathname;
                    return child.href.startsWith("http") ? (
                      <a
                        href={child.href}
                        key={child.href}
                        onClick={(event) => {
                          event.currentTarget.blur();
                          setOpenMenu(null);
                        }}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {child.label}<span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <Link
                        aria-current={active ? "page" : undefined}
                        href={child.href}
                        key={child.href}
                        onClick={(event) => {
                          event.currentTarget.blur();
                          setOpenMenu(null);
                        }}
                      >
                        {child.label}{active ? <span aria-hidden="true">✓</span> : null}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div className="premier-header-actions">
        <Link className="button button-primary" href={demoHref}>
          Book a Demo
        </Link>
      </div>

      <details className="premier-mobile-menu" ref={mobileMenuRef}>
        <summary aria-label="Open site navigation">
          <span>Menu</span>
          <i aria-hidden="true" />
        </summary>
        <div className="premier-mobile-panel">
          <nav className="premier-mobile-sections" aria-label="Mobile primary navigation">
            {primaryLinks.map((item) => {
              const children = "children" in item ? item.children : undefined;

              if (!children) {
                return (
                  <Link
                    aria-current={current === item.key ? "page" : undefined}
                    href={item.href}
                    key={item.key}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                );
              }

              const childIsActive = children.some((child) =>
                !child.href.startsWith("http") && child.href.split("#")[0] === pathname
              );

              return (
                <details className="premier-mobile-group" defaultOpen={childIsActive} key={item.key}>
                  <summary>
                    <span>{item.label}</span>
                    <i aria-hidden="true">⌄</i>
                  </summary>
                  <div>
                    {children.map((child) => {
                      const active = !child.href.startsWith("http")
                        && child.href.split("#")[0] === pathname;
                      return child.href.startsWith("http") ? (
                        <a
                          href={child.href}
                          key={child.href}
                          onClick={closeMobileMenu}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {child.label}<span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <Link
                          aria-current={active ? "page" : undefined}
                          href={child.href}
                          key={child.href}
                          onClick={closeMobileMenu}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </details>
              );
            })}
          </nav>
          <div className="premier-mobile-quicklinks">
            <span>Quick links</span>
            <Link href="/suite-demo" onClick={closeMobileMenu}>Guided Tours</Link>
            <Link href="/#early-access" onClick={closeMobileMenu}>Book a Demo</Link>
          </div>
          <Link className="button button-primary" href={demoHref} onClick={closeMobileMenu}>
            Book a Demo
          </Link>
        </div>
      </details>
    </header>
  );
}

export function SiteFooter({ demoHref = "#early-access" }: { demoHref?: string } = {}) {
  return (
    <footer className="site-footer premier-footer">
      <div className="footer-top">
        <div>
          <span className="footer-mark">Linkd</span>
          <p>The connected business system for luxury jewelry retail.</p>
        </div>
        <Link className="button footer-demo-button" href={demoHref}>
          See Linkd in Action
        </Link>
      </div>
      <div className="footer-columns">
        <nav aria-label="Platform">
          <strong>Platform</strong>
          <Link href="/payments">Payments</Link>
          <Link href="/accounting">Receivables</Link>
          <Link href="/repairs">Services</Link>
          <Link href="/inventory">Inventory</Link>
          <Link href="/multi-store">Multi-Store</Link>
        </nav>
        <nav aria-label="Explore">
          <strong>Explore</strong>
          <Link href="/jewelry-pos">POS + ERP</Link>
          <Link href="/integrations">Integrations</Link>
          <Link href="/security">Security</Link>
          <Link href="/#migration">Migration</Link>
          <Link href="/#early-access">Book a Demo</Link>
        </nav>
        <nav aria-label="Ecosystem">
          <strong>Ecosystem</strong>
          <Link href="/ecosystem">Linkd Ecosystem</Link>
          <Link href="/suite-demo">Guided Tours</Link>
          <a href="https://www.jewellink.com/" target="_blank" rel="noreferrer">JewelLink</a>
          <a href="https://www.countretail.com/" target="_blank" rel="noreferrer">CountRetail</a>
          <a href="https://jewelhire.com/" target="_blank" rel="noreferrer">JewelHire</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Linkd. All rights reserved.</p>
        <Link href="/">Back to top</Link>
      </div>
    </footer>
  );
}
