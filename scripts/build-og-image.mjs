/**
 * Generates public/og-default.png — the Open Graph / Twitter card image.
 *
 * 1200x630 is the size every major platform crops from. The design is the
 * brand mark, wordmark and tagline on the slate-blue primary, with the same
 * chaos-to-order motif the hero uses, so a shared link looks like the site.
 *
 * This is NOT part of `npm run build`. It is a one-off asset generator; the
 * PNG it produces is committed. Regenerate with:
 *
 *   npm i --no-save sharp
 *   node scripts/build-og-image.mjs
 *
 * Text is rendered by the SVG renderer using system fonts, so the font stack
 * below lists widely available humanist sans faces close to Inter.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public', 'og-default.png')

const W = 1200
const H = 630

// Brand tokens, mirrored from src/styles/tokens.css
const SLATE = '#1E3A5F'
const INK = '#14202E'
const EMERALD = '#1F7A5C'
const EMERALD_LIGHT = '#4FBF97'
const OFFWHITE = '#F7F8FA'
const MUTED = '#A9BCD2'

const FONT = "Segoe UI, Inter, Helvetica Neue, Arial, sans-serif"

// The chaos-to-order lattice, resolved state — same idea as the hero visual.
const COLS = [770, 880, 990, 1100]
const ROWS = [250, 330, 410]
const nodes = []
for (const [ri, y] of ROWS.entries()) {
  for (const [ci, x] of COLS.entries()) {
    nodes.push({ x, y, accent: (ri + ci) % 3 === 1 })
  }
}
const edges = []
for (const [ri, y] of ROWS.entries()) {
  for (const [ci, x] of COLS.entries()) {
    if (ci < COLS.length - 1) edges.push([x, y, COLS[ci + 1], y])
    if (ri < ROWS.length - 1) edges.push([x, y, x, ROWS[ri + 1]])
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${SLATE}"/>
      <stop offset="100%" stop-color="${INK}"/>
    </linearGradient>
    <linearGradient id="trend" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="${EMERALD}"/>
      <stop offset="100%" stop-color="${EMERALD_LIGHT}"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- emerald rule, top left -->
  <rect x="80" y="150" width="64" height="4" rx="2" fill="${EMERALD_LIGHT}"/>

  <!-- brand mark: converging axes with a resolved vertex -->
  <g transform="translate(80, 62)">
    <path d="M4 34 L20 4 L36 34" fill="none" stroke="${OFFWHITE}" stroke-width="3.2"
          stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.5 24 H28.5" stroke="${OFFWHITE}" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="20" cy="4" r="4.2" fill="${EMERALD_LIGHT}"/>
  </g>
  <text x="132" y="94" font-family="${FONT}" font-size="30" font-weight="700"
        letter-spacing="-0.6" fill="${OFFWHITE}">AxiomRisk</text>

  <!-- headline -->
  <text x="80" y="250" font-family="${FONT}" font-size="76" font-weight="700"
        letter-spacing="-2.4" fill="${OFFWHITE}">Clarity in Complexity</text>

  <!-- supporting line -->
  <text x="80" y="320" font-family="${FONT}" font-size="30" font-weight="400"
        fill="${MUTED}">Risk advisory &amp; management consulting</text>
  <text x="80" y="362" font-family="${FONT}" font-size="30" font-weight="400"
        fill="${MUTED}">for businesses across India</text>

  <!-- lattice motif, right side -->
  <g opacity="0.55">
    ${edges
      .map(
        ([x1, y1, x2, y2]) =>
          `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${OFFWHITE}" stroke-width="1" opacity="0.28"/>`
      )
      .join('\n    ')}
    ${nodes
      .map(
        (n) =>
          `<circle cx="${n.x}" cy="${n.y}" r="${n.accent ? 7 : 4.5}" fill="${
            n.accent ? EMERALD_LIGHT : OFFWHITE
          }" opacity="${n.accent ? 1 : 0.5}"/>`
      )
      .join('\n    ')}
  </g>
  <path d="M770 410 L880 330 L990 330 L1100 250" fill="none" stroke="url(#trend)"
        stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- footer rule + domain -->
  <rect x="80" y="520" width="1040" height="1" fill="${OFFWHITE}" opacity="0.16"/>
  <text x="80" y="566" font-family="${FONT}" font-size="24" font-weight="600"
        letter-spacing="1.6" fill="${EMERALD_LIGHT}">AXIOMRISK.CO</text>
</svg>`

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, png)

const meta = await sharp(png).metadata()
console.log(`[og] wrote public/og-default.png — ${meta.width}x${meta.height}, ${(png.length / 1024).toFixed(1)} KB`)
