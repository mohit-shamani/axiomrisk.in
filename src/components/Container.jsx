/** Layout width container. `size`: 'default' | 'wide' | 'narrow'. */
export default function Container({ size = 'default', as: Tag = 'div', className = '', children }) {
  const sizeClass = size === 'wide' ? ' container--wide' : size === 'narrow' ? ' container--narrow' : ''
  return <Tag className={`container${sizeClass}${className ? ' ' + className : ''}`}>{children}</Tag>
}
