import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Login",
  description: "Sign in to the Linkd luxury retail POS platform.",
};

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-shell">
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

        <div className="login-copy">
          <p className="eyebrow">POS access</p>
          <h1>Sign in to Linkd.</h1>
          <p>
            This placeholder route is ready for the future
            <strong> pos.linkd.com/login </strong>
            handoff when authentication is connected.
          </p>
        </div>

        <form className="login-form">
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
