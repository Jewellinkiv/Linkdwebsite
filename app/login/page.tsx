import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Linkd POS Login",
  description: "Sign in to the Linkd luxury retail POS platform.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-shell">
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

        <div className="login-copy">
          <p className="eyebrow">POS access</p>
          <h1>pos.linkd.com</h1>
          <p>
            Customer portal access is provided directly to approved Linkd
            retailers during onboarding.
          </p>
        </div>

        <div className="login-form">
          <div className="portal-note">
            <span>Operator portal</span>
            <p>Need an invitation or help reaching your store workspace? Our team will route you securely.</p>
          </div>
          <Link className="button button-primary" href="/#early-access">
            Request Access
          </Link>
          <div className="login-links">
            <Link href="/">Return to site</Link>
            <Link href="/ecosystem">Explore the Ecosystem</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
