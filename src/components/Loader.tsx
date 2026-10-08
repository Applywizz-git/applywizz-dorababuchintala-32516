import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Loader.css'

type LoaderProps = {
  onComplete?: () => void
  durationMs?: number
}

export default function Loader({ onComplete, durationMs = 3000 }: LoaderProps) {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const start = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / durationMs) * 100)
      setProgress(p)
      if (p < 100) {
        raf = requestAnimationFrame(tick)
      } else if (!doneRef.current) {
        doneRef.current = true
        setTimeout(() => {
          setVisible(false)
          onCompleteRef.current?.()
        }, 220)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [durationMs])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-live="polite"
          aria-busy="true"
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="loader__orb loader__orb--1" aria-hidden="true" />
          <div className="loader__orb loader__orb--2" aria-hidden="true" />

          <motion.div
            className="loader__inner"
            initial={{ opacity: 0, y: 18, rotateX: 12 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.p
              className="loader__mark"
              animate={{ rotateY: [0, 8, 0], y: [0, -4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              DC
            </motion.p>

            <h1 className="loader__name">
              DORA <em>BABU</em> CHINTALA
            </h1>
            <p className="loader__role">Senior Software Engineer · AI &amp; Cloud Solutions</p>

            <div className="loader__bar" aria-hidden="true">
              <div className="loader__bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="loader__pct">{Math.round(progress)}%</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
