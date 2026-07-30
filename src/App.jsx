import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import './styles/index.css'

/** App shell: persistent Header + Footer around the routed page Outlet. */
export default function App() {
  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollToTop />
      <Header />
      <main id="main" className="app__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
