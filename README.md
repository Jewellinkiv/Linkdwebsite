# Linkd website

Public marketing site for Linkd, a jewelry POS and operations platform for
luxury retail jewelers. The site is built with Next/Vinext for OpenAI Sites and
is configured by `.openai/hosting.json`.

## What The Site Covers

- Homepage explanation of Linkd, JewelLink, and CountRetail
- Focused SEO pages for jewelry POS, repairs, inventory, accounting,
  multi-store operations, security, integrations, and ecosystem comparison
- Product screenshots, optimized WebP assets, app icons, social preview image,
  sitemap, robots file, and `llms.txt`
- Early access inquiry form backed by Postmark

## Local Setup

```bash
npm install
npm run dev
```

The local preview normally runs at `http://localhost:3000/`.

## Environment

Copy `.env.example` when setting up local or hosted form delivery:

```bash
POSTMARK_SERVER_TOKEN=
POSTMARK_FROM_EMAIL="Linkd <no-reply@linkd.com>"
LINKD_ALERT_TO_EMAIL=
POSTMARK_MESSAGE_STREAM=outbound
```

The site renders without those values, but the inquiry API returns a launch-safe
`503` until Postmark credentials and recipient settings are available.

## Validation

Run these before publishing:

```bash
npm test
npm run lint
git diff --check
```

`npm test` builds the Vinext output and verifies the rendered pages, structured
data, SEO metadata, crawl assets, social images, mobile CSS, form behavior, and
security headers.

## SEO Surface

Primary crawl routes:

- `/`
- `/jewelry-pos`
- `/repairs`
- `/inventory`
- `/accounting`
- `/multi-store`
- `/security`
- `/integrations`
- `/ecosystem`

Supporting files:

- `public/sitemap.xml`
- `public/robots.txt`
- `public/llms.txt`
- `public/site.webmanifest`
- `public/og.png`

## Publishing Notes

This project already has a Sites project id in `.openai/hosting.json`. Before a
production deployment, make sure:

- the working tree has only intentional Linkd website changes;
- Postmark runtime values are configured for the hosted environment;
- the exact source state intended for deployment is committed and pushed; and
- the production deployment is created from that saved source state.
