import App from './App'
import Home from './pages/Home'
import Services from './pages/Services'
import Approach from './pages/Approach'
import About from './pages/About'
import Insights from './pages/Insights'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'
import Styleguide from './pages/Styleguide'

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
      { path: 'approach', element: <Approach /> },
      { path: 'about', element: <About /> },
      { path: 'insights', element: <Insights /> },
      { path: 'contact', element: <Contact /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'terms', element: <Terms /> },
      // Internal design reference — noindex, unlinked. Remove before launch.
      { path: 'styleguide', element: <Styleguide /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
