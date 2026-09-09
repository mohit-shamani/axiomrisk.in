// ---------------------------------------------------------------------------
// OpenAI Measurement Pixel — the single place that talks to oaiq.
//
// Scope: /international ONLY. This is a paid-acquisition landing page for
// ChatGPT ads; no other route loads the pixel. Route scoping is done by
// rendering <OpenAiPixel /> from that page, so the bootstrap ends up in that
// route's prerendered <head> and nowhere else.
//
// Data source : AxiomRisk Website Pixel
// Pixel ID    : NapjeP3rrE8W1A7FEYeAa5   (browser-safe, intended for client use)
// Conversion  : AxiomRisk International Consultation Lead
//               custom_event_name = international_form_submit_success
//               conversion event id 6aa14190fe1881a0b41e0cf71b992551
//
// Deliberately NOT implemented here: page_viewed. The optimisation event is
// the confirmed form submission only.
// ---------------------------------------------------------------------------

export const OPENAI_PIXEL_ID = 'NapjeP3rrE8W1A7FEYeAa5'
export const OPENAI_SDK_URL = 'https://bzrcdn.openai.com/sdk/oaiq.min.js'

/** The registered conversion's custom event name. */
export const OPENAI_CONVERSION_EVENT = 'international_form_submit_success'

// Ads Manager supplied debug:true for initial Event Stream verification.
// Set VITE_OAIQ_DEBUG=false and rebuild to turn it off — Vite inlines env vars
// at build time, so the value must be present when `npm run build` runs.
// Matches how VITE_WEB3FORMS_ACCESS_KEY is handled in src/lib/web3forms.js.
export const OPENAI_PIXEL_DEBUG = import.meta.env.VITE_OAIQ_DEBUG !== 'false'

// Guards a second init if the page is re-entered by client-side navigation.
// The official loader already no-ops on a second run via `if(w.oaiq)return`,
// but the init call sits outside that guard and would otherwise repeat.
const INIT_FLAG = '__axiomOaiqInitialized'

/**
 * The bootstrap, as an inline <script> body.
 *
 * This is OpenAI's official snippet verbatim, with one addition: the init call
 * is wrapped in a flag check. Without it, a client-side navigation back onto
 * /international would re-run init against an already-initialised pixel.
 */
export function openAiPixelBootstrap() {
  return (
    '!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};' +
    'q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;' +
    'var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}' +
    `(window,document,"script","${OPENAI_SDK_URL}");\n` +
    `if(!window.${INIT_FLAG}){window.${INIT_FLAG}=1;` +
    `oaiq("init",{pixelId:"${OPENAI_PIXEL_ID}",debug:${OPENAI_PIXEL_DEBUG}});}`
  )
}

/**
 * Return a callable `oaiq`, creating the queue stub if the bootstrap has not
 * run yet.
 *
 * On /international the bootstrap is baked into the prerendered <head>, so
 * `window.oaiq` exists long before any form can be submitted. This path only
 * matters if that script has not executed — in which case we recreate the same
 * queue the official loader would have, AND start the SDK ourselves. Creating
 * the stub alone would be worse than useless: the official loader's
 * `if(w.oaiq)return` guard would then see our stub and never fetch the SDK, so
 * the queued conversion would sit there forever.
 */
function ensureQueue() {
  if (typeof window === 'undefined') return null
  if (typeof window.oaiq === 'function') return window.oaiq

  const q = function () {
    q.q.push(arguments)
  }
  q.q = []
  window.oaiq = q

  try {
    const s = document.createElement('script')
    s.async = true
    s.src = OPENAI_SDK_URL
    const first = document.getElementsByTagName('script')[0]
    if (first && first.parentNode) first.parentNode.insertBefore(s, first)
    else document.head.appendChild(s)

    if (!window[INIT_FLAG]) {
      window[INIT_FLAG] = 1
      q('init', { pixelId: OPENAI_PIXEL_ID, debug: OPENAI_PIXEL_DEBUG })
    }
  } catch {
    // Blocked or unavailable: the call still queues and is simply never sent.
    // A tracking pixel must never break the page it is measuring.
  }

  return q
}

/**
 * Fire the registered conversion.
 *
 * Call ONLY after the form service has confirmed success — see the caller in
 * src/pages/International.jsx, which is invoked from ContactForm's
 * `if (result.ok)` branch. Never on click, validation, request start, HTTP
 * error, API failure or timeout.
 */
export function trackOpenAiConversion() {
  const oaiq = ensureQueue()
  if (!oaiq) return

  try {
    oaiq('measure', 'custom', { type: 'custom' }, {
      custom_event_name: OPENAI_CONVERSION_EVENT,
    })
  } catch {
    // Never let measurement surface as a user-visible error.
  }
}
