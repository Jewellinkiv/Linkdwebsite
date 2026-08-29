"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type SiteHeaderProps = {
  current?: string;
  demoHref?: string;
};

const primaryLinks = [
  { href: "/jewelry-pos", label: "Platform", key: "platform" },
  { href: "/payments", label: "Payments", key: "payments" },
  { href: "/ecosystem", label: "Ecosystem", key: "ecosystem" },
  { href: "/integrations", label: "Integrations", key: "integrations" },
  { href: "/#migration", label: "Switch to Linkd", key: "migration" },
];

const platformLinks = [
  { href: "/jewelry-pos", label: "POS & checkout" },
  { href: "/accounting", label: "Receivables & finance" },
  { href: "/repairs", label: "Repairs & services" },
  { href: "/inventory", label: "Inventory flow" },
  { href: "/multi-store", label: "Multi-store operations" },
  { href: "/security", label: "Security & controls" },
];

export function SiteHeader({ current, demoHref = "#early-access" }: SiteHeaderProps) {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
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
        {primaryLinks.map((item) => (
          <Link
            aria-current={current === item.key ? "page" : undefined}
            href={item.href}
            key={item.key}
          >
            {item.label}
          </Link>
        ))}
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
          <nav aria-label="Mobile primary navigation">
            {primaryLinks.map((item) => (
              <Link
                aria-current={current === item.key ? "page" : undefined}
                href={item.href}
                key={item.key}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="premier-mobile-platform">
            <span>Platform workflows</span>
            {platformLinks.map((item) => (
              <Link href={item.href} key={item.href} onClick={closeMobileMenu}>
                {item.label}
              </Link>
            ))}
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
