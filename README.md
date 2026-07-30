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
| `CONTACT_EMAIL` | ⚠️ **placeholder** — replace with the real inbox |
| `site.social.linkedin` | ⚠️ confirm the URL or remove |

No phone number or street address is published anywhere. This is deliberate: a
placeholder that reaches nobody is worse than an omission. To add one, set it in
`src/config/site.js` and render it in `Footer.jsx` / `ContactDetails.jsx`.

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
| `/insights` | placeholder |
| `/privacy` | placeholder |
| `/terms` | placeholder |
| `/styleguide` | internal — delete before launch |

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

- [ ] Replace `CONTACT_EMAIL` in `src/config/site.js`
- [ ] Add `VITE_WEB3FORMS_ACCESS_KEY` locally **and** on the host, then rebuild
- [ ] Confirm or remove the LinkedIn URL
- [ ] Build out `/insights`, `/privacy`, `/terms`
- [ ] Generate `sitemap.xml` (`public/robots.txt` already references it)
- [ ] Add an Open Graph image at `public/og-default.png`
- [ ] Delete `/styleguide` (`src/pages/Styleguide.jsx`, its route, `styles/styleguide.css`)
- [ ] Remove unused hero visuals if you have settled on one
