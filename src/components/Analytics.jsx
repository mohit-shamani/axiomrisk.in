import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../lib/analytics'

/**
 * Sends a GA4 page view on first load and on every client-side route change.
 *
 * Required because index.html configures gtag with `send_page_view: false`.
 * Without this component GA4 would record the landing page once and every
 * internal navigation would be invisible.
 *
 * Rendered inside the Router (App.jsx) so useLocation() has a router context.
 *
 * The send is deferred one animation frame on purpose. Titles come from the
 * <Head> in Seo.jsx, which writes document.title in its own effect during the
 * same commit as this one; reading the title synchronously here would attach
 * the PREVIOUS page's title to the new page's view. By the next frame the
 * head has been committed.
 */
export default function Analytics() {
  const { pathname, search } = useLocation()
  const frame = useRef(0)

  useEffect(() => {
    const path = pathname + search

    const send = () => trackPageView({ path })

    if (typeof window.requestAnimationFrame === 'function') {
      frame.current = window.requestAnimationFrame(send)
      return () => window.cancelAnimationFrame(frame.current)
    }

    // No rAF (very old browsers, non-visual environments): fall back to a
    // macrotask, which still lands after the head effect has flushed.
    const timer = window.setTimeout(send, 0)
    return () => window.clearTimeout(timer)
  }, [pathname, search])

  return null
}
