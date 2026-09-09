import { Head } from 'vite-react-ssg'
import { openAiPixelBootstrap } from '../lib/openaiPixel'

/**
 * Loads the OpenAI Measurement Pixel for the route that renders it.
 *
 * Rendered only by src/pages/International.jsx, so the bootstrap is baked into
 * dist/international.html and appears on no other page. Using <Head> — the same
 * mechanism as Seo.jsx and JsonLd.jsx — means the script is present in the
 * served HTML rather than being appended after hydration, which matters here:
 * /international is a paid landing page, so nearly every visit is a cold direct
 * load from an ad click.
 *
 * The bootstrap is idempotent, so a client-side navigation onto this route does
 * not re-initialise the pixel. See src/lib/openaiPixel.js.
 */
export default function OpenAiPixel() {
  return (
    <Head>
      <script type="text/javascript">{openAiPixelBootstrap()}</script>
    </Head>
  )
}
