import { type ReactNode, type CSSProperties, isValidElement, cloneElement } from 'react'

type Icon3DProps = {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  float?: boolean
  delay?: number
  label?: string
}

const SIZE_PX = { sm: 18, md: 22, lg: 28 } as const

export default function Icon3D({
  children,
  className = '',
  size = 'md',
  label,
}: Icon3DProps) {
  const sizeClass =
    size === 'sm' ? 'icon-3d--sm' : size === 'lg' ? 'icon-3d--lg' : ''

  const px = SIZE_PX[size]

  const iconNode = isValidElement<{
    size?: number | string
    strokeWidth?: number | string
    color?: string
    style?: CSSProperties
  }>(children)
    ? cloneElement(children, {
        size: px,
        strokeWidth: 2,
        color: 'var(--color-light-text)',
        style: {
          ...(children.props.style || {}),
          width: px,
          height: px,
          minWidth: px,
          minHeight: px,
          display: 'block',
          overflow: 'visible',
          flexShrink: 0,
        },
      })
    : children

  return (
    <span
      className={`icon-3d ${sizeClass} ${className}`.trim()}
      aria-label={label}
      aria-hidden={!label}
    >
      {iconNode}
    </span>
  )
}
