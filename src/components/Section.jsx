import Container from './Container'

/**
 * Page section with consistent vertical rhythm.
 * `variant`: 'default' | 'alt' | 'primary'
 */
export default function Section({
  variant = 'default',
  tight = false,
  container = 'default',
  id,
  className = '',
  children,
}) {
  const variantClass =
    variant === 'alt' ? ' section--alt' : variant === 'primary' ? ' section--primary' : ''
  return (
    <section id={id} className={`section${variantClass}${tight ? ' section--tight' : ''}${className ? ' ' + className : ''}`}>
      <Container size={container}>{children}</Container>
    </section>
  )
}
