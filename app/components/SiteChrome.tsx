"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from "react";

type SiteHeaderProps = {
  current?: string;
  demoHref?: string;
};

const primaryLinks = [
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

function usesNativeNavigation(href: string) {
  return href.startsWith("http");
}

function matchesCurrentPath(href: string, pathname: string) {
  return !usesNativeNavigation(href) && !href.includes("#") && href === pathname;
}

function scrollCurrentPageHash(
  event: ReactMouseEvent<HTMLAnchorElement>,
  href: string,
  pathname: string,
) {
  if (pathname !== "/" || !href.startsWith("/#")) return;
  const target = document.getElementById(href.slice(2));
  if (!target) return;
  event.preventDefault();
  window.history.pushState({}, "", href);
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteHeader({ current, demoHref = "#early-access" }: SiteHeaderProps) {
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<{ key: string; pathname: string } | null>(null);
  const openMenuKey = openMenu?.pathname === pathname ? openMenu.key : null;
  const closeMobileMenu = () => {
    mobileMenuRef.current?.removeAttribute("open");
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const scrollPosition = window.scrollY;
    const previous = {
      bodyOverflow: document.body.style.overflow,
      bodyPosition: document.body.style.position,
      bodyTop: document.body.style.top,
      bodyWidth: document.body.style.width,
      htmlOverflow: document.documentElement.style.overflow,
    };
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = previous.htmlOverflow;
      document.body.style.overflow = previous.bodyOverflow;
      document.body.style.position = previous.bodyPosition;
      document.body.style.top = previous.bodyTop;
      document.body.style.width = previous.bodyWidth;
      window.scrollTo(0, scrollPosition);
    };
  }, [mobileMenuOpen]);

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
                {usesNativeNavigation(item.href) ? (
                  <a
                    aria-current={current === item.key ? "page" : undefined}
                    href={item.href}
                    onClick={(event) => {
                      scrollCurrentPageHash(event, item.href, pathname);
                      event.currentTarget.blur();
                      setOpenMenu(null);
                    }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    aria-current={current === item.key ? "page" : undefined}
                    href={item.href}
                    onClick={(event) => {
                      scrollCurrentPageHash(event, item.href, pathname);
                      event.currentTarget.blur();
                      setOpenMenu(null);
                    }}
                  >
                    {item.label}
                  </Link>
                )}
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
                    const active = matchesCurrentPath(child.href, pathname);
                    return usesNativeNavigation(child.href) ? (
                      <a
                        href={child.href}
                        key={child.href}
                        onClick={(event) => {
                          scrollCurrentPageHash(event, child.href, pathname);
                          event.currentTarget.blur();
                          setOpenMenu(null);
                        }}
                        rel={child.href.startsWith("http") ? "noreferrer" : undefined}
                        target={child.href.startsWith("http") ? "_blank" : undefined}
                      >
                        {child.label}
                        {child.href.startsWith("http") ? <span aria-hidden="true">↗</span> : null}
                      </a>
                    ) : (
                      <Link
                        aria-current={active ? "page" : undefined}
                        href={child.href}
                        key={child.href}
                        onClick={(event) => {
                          scrollCurrentPageHash(event, child.href, pathname);
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

      <details
        className="premier-mobile-menu"
        onToggle={(event) => {
          if (event.target === event.currentTarget) {
            setMobileMenuOpen(event.currentTarget.open);
          }
        }}
        ref={mobileMenuRef}
      >
        <summary aria-label="Open site navigation">
          <span>Menu</span>
          <i aria-hidden="true" />
        </summary>
        <div className="premier-mobile-panel">
          <nav className="premier-mobile-sections" aria-label="Mobile primary navigation">
            {primaryLinks.map((item) => {
              const children = "children" in item ? item.children : undefined;

              if (!children) {
                return usesNativeNavigation(item.href) ? (
                  <a
                    aria-current={current === item.key ? "page" : undefined}
                    href={item.href}
                    key={item.key}
                    onClick={(event) => {
                      scrollCurrentPageHash(event, item.href, pathname);
                      closeMobileMenu();
                    }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    aria-current={current === item.key ? "page" : undefined}
                    href={item.href}
                    key={item.key}
                    onClick={(event) => {
                      scrollCurrentPageHash(event, item.href, pathname);
                      closeMobileMenu();
                    }}
                  >
                    {item.label}
                  </Link>
                );
              }

              const childIsActive = children.some((child) =>
                matchesCurrentPath(child.href, pathname)
              );

              return (
                <details className="premier-mobile-group" open={childIsActive || undefined} key={item.key}>
                  <summary>
                    <span>{item.label}</span>
                    <i aria-hidden="true">⌄</i>
                  </summary>
                  <div>
                    {children.map((child) => {
                      const active = matchesCurrentPath(child.href, pathname);
                      return usesNativeNavigation(child.href) ? (
                        <a
                          href={child.href}
                          key={child.href}
                          onClick={(event) => {
                            scrollCurrentPageHash(event, child.href, pathname);
                            closeMobileMenu();
                          }}
                          rel={child.href.startsWith("http") ? "noreferrer" : undefined}
                          target={child.href.startsWith("http") ? "_blank" : undefined}
                        >
                          {child.label}
                          {child.href.startsWith("http") ? <span aria-hidden="true">↗</span> : null}
                        </a>
                      ) : (
                        <Link
                          aria-current={active ? "page" : undefined}
                          href={child.href}
                          key={child.href}
                          onClick={(event) => {
                            scrollCurrentPageHash(event, child.href, pathname);
                            closeMobileMenu();
                          }}
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
  const pathname = usePathname();

  return (
    <footer className="site-footer premier-footer">
      <div className="footer-top">
        <div>
          <span className="footer-mark">Linkd</span>
          <p>Jewelry POS and store-management software.</p>
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
          <Link
            href="/#migration"
            onClick={(event) => scrollCurrentPageHash(event, "/#migration", pathname)}
          >
            Migration
          </Link>
          <Link
            href="/#early-access"
            onClick={(event) => scrollCurrentPageHash(event, "/#early-access", pathname)}
          >
            Book a Demo
          </Link>
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
