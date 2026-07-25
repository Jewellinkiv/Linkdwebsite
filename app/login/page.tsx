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
              width={5334}
              height={3205}
              priority
              unoptimized
            />
          </span>
        </Link>

        <div className="login-copy">
          <p className="eyebrow">POS access</p>
          <h1>pos.linkd.com</h1>
          <p>
            This page is prepared as the Linkd POS portal handoff for store
            teams. When authentication is connected, this experience can move
            behind <strong>pos.linkd.com/login</strong>.
          </p>
        </div>

        <form className="login-form">
          <div className="portal-note">
            <span>Operator portal</span>
            <p>Secure POS, inventory, reports, and integration access for approved retailers.</p>
          </div>
          <label>
            Email
            <input type="email" autoComplete="email" placeholder="you@store.com" />
          </label>
          <label>
            Password
            <input type="password" autoComplete="current-password" placeholder="Password" />
          </label>
          <button className="button button-primary" type="button">
            Log In
          </button>
          <div className="login-links">
            <Link href="/">Return to site</Link>
            <Link href="/#early-access">Request access</Link>
          </div>
        </form>
      </section>
    </main>
  );
}
