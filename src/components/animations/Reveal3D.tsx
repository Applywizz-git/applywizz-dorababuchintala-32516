import { useEffect, useState, type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'

type Reveal3DProps = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
  once?: boolean
  amount?: number
}

const desktopVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 48, rotateX: 18, z: -40 },
    visible: { opacity: 1, y: 0, rotateX: 0, z: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -36, rotateX: -14, z: -30 },
    visible: { opacity: 1, y: 0, rotateX: 0, z: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -48, rotateY: 16, z: -30 },
    visible: { opacity: 1, x: 0, rotateY: 0, z: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 48, rotateY: -16, z: -30 },
    visible: { opacity: 1, x: 0, rotateY: 0, z: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.86, rotateX: 12, z: -50 },
    visible: { opacity: 1, scale: 1, rotateX: 0, z: 0 },
  },
}

const mobileVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -18 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  right: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  },
}

function useIsMobileMotion() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 768px), (hover: none)').matches
      : false
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px), (hover: none)')
    const onChange = () => setIsMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

export default function Reveal3D({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
  amount = 0.25,
}: Reveal3DProps) {
  const isMobile = useIsMobileMotion()
  const variants = isMobile ? mobileVariants : desktopVariants

  return (
    <motion.div
      className={className}
      variants={variants[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: isMobile ? 0.12 : amount }}
      transition={{
        duration: isMobile ? 0.45 : 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={
        isMobile
          ? undefined
          : { transformStyle: 'preserve-3d', transformOrigin: 'center bottom' }
      }
    >
      {children}
    </motion.div>
  )
}

export function StaggerGroup({
  children,
  className = '',
  stagger = 0.08,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  const isMobile = useIsMobileMotion()

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: isMobile ? 0.05 : stagger } },
      }}
      style={isMobile ? undefined : { transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28, rotateX: 14, z: -24 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    z: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}
