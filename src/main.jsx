import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'

/**
 * SSG entry. ViteReactSSG:
 *  - in the browser: hydrates the prerendered HTML and runs the SPA;
 *  - at build time (`npm run build`): walks `routes`, renders each static
 *    route to a standalone .html file with its <Seo> head baked in.
 */
export const createRoot = ViteReactSSG({ routes })
