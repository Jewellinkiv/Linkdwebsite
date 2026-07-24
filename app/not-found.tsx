import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-shell">
        <Link className="login-brand" href="/" aria-label="Linkd home">
          <span className="brand-logo-crop login-logo">
            <Image
              src="/assets/brand/linkd-logo-main.png"
              alt="Linkd"
              width={5334}
              height={3205}
              priority
              unoptimized
            />
          </span>
        </Link>
        <div>
          <p className="eyebrow">Page not found</p>
          <h1>Back to the operational core.</h1>
          <p>
            The page you requested is not part of the Linkd launch site. Return
            to the luxury jewelry POS overview or request early release access.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/">
              Return to Linkd
            </Link>
            <Link className="button button-secondary" href="/#early-access">
              Request Access
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
