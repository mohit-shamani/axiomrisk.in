import App from './App'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceLanding from './pages/ServiceLanding'
import Approach from './pages/Approach'
import About from './pages/About'
import International from './pages/International'
import Insights from './pages/Insights'
import InsightArticle from './pages/InsightArticle'
import { getPostStaticPaths } from './lib/posts'
import { serviceLandingSlugs } from './config/serviceLanding'
import Contact from './pages/Contact'
import Resources from './pages/Resources'
import RiskHealthCheck from './pages/RiskHealthCheck'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

/**
 * Route table consumed by vite-react-ssg (react-router data format).
 * Every static `path` below is prerendered to its own .html at build time.
 */
export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      {
        // Dedicated commercial service pages. Prerendered from the slugs in
        // src/config/serviceLanding.js, so adding a service page is a config
        // entry rather than a route edit.
        path: 'services/:serviceSlug',
        element: <ServiceLanding />,
        getStaticPaths: () => serviceLandingSlugs.map((s) => 'services/' + s),
      },
      { path: 'approach', element: <Approach /> },
      { path: 'about', element: <About /> },
      { path: 'international', element: <International /> },
      { path: 'insights', element: <Insights /> },
      {
        // Every published article is prerendered to its own .html file.
        // getStaticPaths is derived from the markdown files themselves, so
        // adding a post is enough — no route edits required.
        path: 'insights/:slug',
        element: <InsightArticle />,
        getStaticPaths: getPostStaticPaths,
      },
      { path: 'contact', element: <Contact /> },
      { path: 'resources', element: <Resources /> },
      { path: 'risk-health-check', element: <RiskHealthCheck /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'terms', element: <Terms /> },
      // Prerenders to dist/404.html. Static hosts (Netlify, Cloudflare Pages,
      // GitHub Pages) serve that file for unmatched paths, so an unknown URL
      // gets the branded 404 instead of the host's default. Excluded from the
      // sitemap by scripts/generate-sitemap.mjs.
      { path: '404', element: <NotFound /> },
      // Client-side catch-all for in-app navigation.
      { path: '*', element: <NotFound /> },
    ],
  },
]
