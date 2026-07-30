import { Link } from 'react-router-dom'

/**
 * Button / link button.
 * `variant`: 'primary' | 'accent' | 'outline' | 'ghost-light'
 * Renders a react-router <Link> when `to` is set, an <a> when `href` is set,
 * otherwise a <button>.
 */
export default function Button({
  variant = 'primary',
  size,
  to,
  href,
  className = '',
  children,
  ...rest
}) {
  const cls = `btn btn--${variant}${size === 'lg' ? ' btn--lg' : ''}${className ? ' ' + className : ''}`

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
