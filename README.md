# AxiomRisk

Marketing site for **AxiomRisk** — a B2B risk advisory and management consulting
firm serving businesses across India.

Built with Vite + React and **prerendered to static HTML at build time**, so every
route ships with its own `<title>`, meta description, canonical URL and structured
data present in the served markup (no client-side-only SEO).

---

## Quick start

```bash
npm install
cp .env.example .env     # then add your Web3Forms key — see below
npm run dev              # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Static site generation → `dist/` |
| `npm run preview` | Serve the built `dist/` locally |

---

## Configuration you must fill in

### Environment variables (`.env`)

| Variable | Purpose |
|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | Powers the `/contact` form. Free key from [web3forms.com](https://web3forms.com). Public by design — it only permits submissions to your own inbox. |

> **Rebuild after adding the key.** Vite inlines env vars at build time. A bundle
> built without the key cannot submit — the form will show its error fallback.

### Config constants (`src/config/site.js`)

| Constant | Status |
|---|---|
| `CONTACT_EMAIL` | `contact@axiomrisk.co` — confirm this mailbox exists and is monitored |
| `site.legalName` | `AxiomRisk` — trading name only, no registered entity |
| `site.social` | empty — no social profiles published yet |

No phone number, street address or social link is published anywhere. This is
deliberate: a placeholder that reaches nobody is worse than an omission. To add
one, set it in `src/config/site.js` and render it in `Footer.jsx` /
`ContactDetails.jsx`.

Nothing on the site implies a registered company — no "Pvt. Ltd.", CIN or
registration number. If an entity is incorporated later, set `site.legalName`
and fill `{{COMPANY_LEGAL_NAME}}` in `src/config/legal.js` to match.

---

## Project structure

```
src/
├── config/          Brand facts, per-route SEO, all page copy
├── components/      Reusable, page-agnostic (Seo, Button, Card, Reveal…)
├── pages/           One per route — thin, composes sections
├── sections/        Page-specific composed blocks
│   └── visuals/     Animated SVG hero visuals + registry
├── styles/          tokens.css is the single source of truth
├── routes.jsx       Route table — every path here is prerendered
└── main.jsx         ViteReactSSG entry (hydrate + prerender)
```

**Design tokens** live in `src/styles/tokens.css`. Colour, type, spacing, motion
and elevation all resolve from there — change a token, and it propagates.

**Live design reference:** `/styleguide` (noindex, unlinked). Shows the palette,
type scale, components and all four hero visual options.

---

## Routes

| Route | Status |
|---|---|
| `/` | ✅ built |
| `/services` | ✅ built |
| `/about` | ✅ built |
| `/approach` | ✅ built |
| `/contact` | ✅ built (form wired to Web3Forms) |
| `/insights` | ✅ listing with category filter |
| `/insights/:slug` | ✅ prerendered per article (markdown) |
| `/resources` | ✅ built |
| `/risk-health-check` | ✅ built (interactive self-assessment) |
| `/privacy` | ⚠️ drafted — fill placeholders + legal review |
| `/terms` | ⚠️ drafted — fill placeholders + legal review |
| `/404` | ✅ prerendered to `dist/404.html` |
| `/styleguide` | internal — delete before launch |

### Adding an insights article

1. Create `src/content/insights/your-slug.md`
2. Add frontmatter — `title`, `slug`, `metaDescription`, `category`, `author`,
   `date` (`YYYY-MM-DD`), `readTime`, `featuredImage`, `excerpt`, `draft`
3. Write the body in markdown (`##` / `###` for structure)
4. `npm run build`

That's it. The route, prerendered HTML, Article + BreadcrumbList schema, the
listing card, "Latest Insights" on the homepage, related-post links and the
sitemap entry are all derived from the file. No code changes needed.

`category` must be one of: `Enterprise Risk`, `Operational`, `Compliance`,
`Continuity`, `Strategy` (see `CATEGORIES` in `src/lib/posts.js`). Set
`draft: true` to keep a post out of the build.

**Article images** — optional. Leave `featuredImage: ""` and an abstract branded
cover renders, varied by category. For a real photo, put the file in
`public/images/insights/` and set
`featuredImage: "/images/insights/your-file.jpg"`.

### Downloadable resources

The risk register template offered on `/resources` is **not in the repo**. Add it at:

```
public/downloads/axiomrisk-risk-register-template.xlsx
```

Change the filename or format in `src/config/resources.js` if needed. Until the
file exists, the post-signup download link will 404 (the email still captures).

Switch the hero visual with one line in `src/config/site.js`:

```js
export const heroVisual = 'chaos-to-order'
// 'resolving-grid' | 'axis-shield' | 'network-lattice'
```

---

## Deployment

Any static host. Build command `npm run build`, publish directory `dist`.

Set `VITE_WEB3FORMS_ACCESS_KEY` in the host's environment variables — not just
locally — or the deployed form will not submit.

Because routes are prerendered to real `.html` files, no SPA catch-all rewrite is
required. If your host adds one, make sure it does not shadow the static files.

---

## Pre-launch checklist

**Blocking**

- [ ] Add `VITE_WEB3FORMS_ACCESS_KEY` on the host (and locally), then rebuild —
      without it every form shows its error fallback
- [ ] Add `public/og-default.png` — 1200×630, referenced by every page's `og:image`
- [ ] Add `public/downloads/axiomrisk-risk-register-template.xlsx`, or the
      `/resources` download 404s after the email is captured
- [ ] Fill the 7 `{{PLACEHOLDER}}` values in `src/config/legal.js` and have the
      privacy policy and terms reviewed by a lawyer — they are drafts
- [ ] Confirm `contact@axiomrisk.co` exists and is monitored

**Should fix**

- [ ] Delete `/styleguide` (`src/pages/Styleguide.jsx`, its route, `styles/styleguide.css`)
- [ ] Delete `public/downloads/PLACE-FILES-HERE.txt`
- [ ] Fill the 10 `{{ADD SOURCE: …}}` placeholders in the insights articles
- [ ] Remove unused hero visuals if you have settled on one
- [ ] Check the site on real devices at 375 / 414 / 768 / 1440px
- [ ] Submit a real enquiry end to end once the Web3Forms key is live
