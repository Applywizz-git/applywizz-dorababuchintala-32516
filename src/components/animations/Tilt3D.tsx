import { useRef, useState, type ReactNode, type CSSProperties } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

type Tilt3DProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  maxTilt?: number
  scale?: number
  glare?: boolean
}

export default function Tilt3D({
  children,
  className = '',
  style,
  maxTilt = 12,
  scale = 1.02,
  glare = true,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilting, setTilting] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 })

  const rotateX = useTransform(springY, [-0.5, 0.5], [maxTilt, -maxTilt])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt, maxTilt])

  const shineX = useTransform(springX, [-0.5, 0.5], [10, 90])
  const shineY = useTransform(springY, [-0.5, 0.5], [10, 90])
  const glareBg = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.28) 0%, transparent 55%)`

  const handleMove = (e: React.MouseEvent) => {
    if (window.matchMedia('(hover: none)').matches) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    x.set(px)
    y.set(py)
  }

  const handleLeave = () => {
    setTilting(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`tilt-3d ${tilting ? 'is-tilting' : ''} ${className}`.trim()}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMove}
      onMouseEnter={() => setTilting(true)}
      onMouseLeave={handleLeave}
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="tilt-3d__inner">{children}</div>
      {glare && (
        <motion.div
          className="tilt-3d__shine"
          aria-hidden="true"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  )
}
