import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-shell">
        <Link className="login-brand" href="/" aria-label="Linkd home">
          <span className="brand-logo-crop login-logo">
            <Image
              src="/assets/brand/linkd-logo-main.webp"
              alt="Linkd"
              width={1200}
              height={721}
              loading="eager"
              sizes="132px"
              unoptimized
            />
          </span>
        </Link>
        <div>
          <p className="eyebrow">Page not found</p>
          <h1>Let’s get you back to Linkd.</h1>
          <p>
            We could not find that page. Return to the Linkd overview or book
            a jewelry POS demo.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/">
              Return to Linkd
            </Link>
            <Link className="button button-secondary" href="/#early-access">
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
