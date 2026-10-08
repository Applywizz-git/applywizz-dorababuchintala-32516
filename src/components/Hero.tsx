import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  FiDownload,
  FiMapPin,
  FiActivity,
  FiDatabase,
  FiBarChart2,
  FiLayers,
  FiMousePointer,
  FiShield,
  FiCpu,
} from 'react-icons/fi'
import Icon3D from './animations/Icon3D'
import '../styles/hero.css'

interface TrailPoint {
  x: number
  y: number
  t: number
  vx: number
  vy: number
}

const TRAIL_MAX = 28
const DECAY_MS = 1400
const BASE_RADIUS = 140
const OVERLAY = '#F7F2EB'

const fadeUp = {
  hidden: { opacity: 0, y: 36, rotateX: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: 0.12 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trail = useRef<TrailPoint[]>([])
  const rafId = useRef<number>(0)
  const lastPos = useRef<{ x: number; y: number; t: number } | null>(null)
  const pointer = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  })
  const dprRef = useRef(1)

  const drawBrush = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    strength: number,
    angle: number,
    stretch: number
  ) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.scale(1 + stretch * 0.55, 1 - stretch * 0.22)

    // Soft outer halo
    const outer = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 1.35)
    outer.addColorStop(0, `rgba(0,0,0,${strength * 0.55})`)
    outer.addColorStop(0.45, `rgba(0,0,0,${strength * 0.28})`)
    outer.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.beginPath()
    ctx.arc(0, 0, radius * 1.35, 0, Math.PI * 2)
    ctx.fillStyle = outer
    ctx.fill()

    // Crisp luminous core
    const core = ctx.createRadialGradient(0, 0, 0, 0, 0, radius)
    core.addColorStop(0, `rgba(0,0,0,${strength * 0.98})`)
    core.addColorStop(0.35, `rgba(0,0,0,${strength * 0.78})`)
    core.addColorStop(0.72, `rgba(0,0,0,${strength * 0.28})`)
    core.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.beginPath()
    ctx.arc(0, 0, radius, 0, Math.PI * 2)
    ctx.fillStyle = core
    ctx.fill()

    ctx.restore()
  }

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) {
      rafId.current = requestAnimationFrame(draw)
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      rafId.current = requestAnimationFrame(draw)
      return
    }

    const dpr = dprRef.current
    const W = canvas.width / dpr
    const H = canvas.height / dpr
    const now = performance.now()

    trail.current = trail.current.filter((p) => now - p.t < DECAY_MS)

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.globalCompositeOperation = 'source-over'
    ctx.clearRect(0, 0, W, H)

    // Solid yellow matching About / site --color-background (#F4EAD2)
    ctx.fillStyle = OVERLAY
    ctx.fillRect(0, 0, W, H)

    if (trail.current.length > 0) {
      ctx.globalCompositeOperation = 'destination-out'

      for (let i = 0; i < trail.current.length; i++) {
        const p = trail.current[i]
        const age = now - p.t
        const life = 1 - age / DECAY_MS
        const ease = life * life * (3 - 2 * life) // smoothstep

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        const speedN = Math.min(speed / 18, 1)
        const radius = BASE_RADIUS * (0.72 + speedN * 0.55) * (0.35 + ease * 0.75)
        if (radius < 2) continue

        const angle = Math.atan2(p.vy, p.vx) || 0
        const stretch = speedN * 0.85
        drawBrush(ctx, p.x, p.y, radius, ease, angle, stretch)
      }

      // Soft luminous rim around current pointer
      if (pointer.current.active) {
        ctx.globalCompositeOperation = 'destination-out'
        const pulse = 0.55 + Math.sin(now * 0.004) * 0.08
        drawBrush(
          ctx,
          pointer.current.x,
          pointer.current.y,
          BASE_RADIUS * 0.95,
          pulse,
          0,
          0.1
        )
      }
    }

    // Subtle edge glow on revealed areas (modern glass feel)
    if (pointer.current.active) {
      ctx.globalCompositeOperation = 'source-over'
      const glow = ctx.createRadialGradient(
        pointer.current.x,
        pointer.current.y,
        20,
        pointer.current.x,
        pointer.current.y,
        BASE_RADIUS * 1.6
      )
      glow.addColorStop(0, 'rgba(251,243,224,0.12)')
      glow.addColorStop(0.45, 'rgba(251,243,224,0.04)')
      glow.addColorStop(1, 'rgba(251,243,224,0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(pointer.current.x, pointer.current.y, BASE_RADIUS * 1.6, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.globalCompositeOperation = 'source-over'
    rafId.current = requestAnimationFrame(draw)
  }

  const resizeCanvas = () => {
    const hero = heroRef.current
    const c = canvasRef.current
    if (!hero || !c) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    dprRef.current = dpr
    const w = hero.offsetWidth
    const h = hero.offsetHeight
    c.width = Math.floor(w * dpr)
    c.height = Math.floor(h * dpr)
    c.style.width = `${w}px`
    c.style.height = `${h}px`
  }

  useEffect(() => {
    resizeCanvas()
    const ro = new ResizeObserver(resizeCanvas)
    if (heroRef.current) ro.observe(heroRef.current)
    rafId.current = requestAnimationFrame(draw)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  const addPoint = (clientX: number, clientY: number) => {
    const hero = heroRef.current
    if (!hero) return
    const rect = hero.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    const now = performance.now()

    let vx = 0
    let vy = 0
    if (lastPos.current) {
      const dt = Math.max(now - lastPos.current.t, 1)
      const dx = x - lastPos.current.x
      const dy = y - lastPos.current.y
      vx = (dx / dt) * 16
      vy = (dy / dt) * 16

      // Interpolate for a continuous modern stroke
      const dist = Math.hypot(dx, dy)
      const steps = Math.min(8, Math.floor(dist / 18))
      for (let s = 1; s <= steps; s++) {
        const t = s / (steps + 1)
        trail.current.push({
          x: lastPos.current.x + dx * t,
          y: lastPos.current.y + dy * t,
          t: now - (1 - t) * 40,
          vx,
          vy,
        })
      }
    }

    lastPos.current = { x, y, t: now }
    pointer.current = { x, y, active: true }

    trail.current.push({ x, y, t: now, vx, vy })
    if (trail.current.length > TRAIL_MAX) {
      trail.current.splice(0, trail.current.length - TRAIL_MAX)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) =>
    addPoint(e.clientX, e.clientY)
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) =>
    addPoint(e.clientX, e.clientY)
  const handleMouseLeave = () => {
    pointer.current.active = false
    lastPos.current = null
  }
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0]
    if (t) addPoint(t.clientX, t.clientY)
  }
  const handleTouchEnd = () => {
    pointer.current.active = false
    lastPos.current = null
  }

  return (
    <section
      ref={heroRef}
      className="hero perspective-scene"
      aria-label="Hero section"
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="hero__bg-layer" aria-hidden="true">
        <div
          className="hero__bg-image"
          style={{ backgroundImage: `url('/assets/hero-bg.jpg')` }}
        />
        <div className="hero__bg-tint" />
      </div>

      <canvas ref={canvasRef} className="hero__brush-canvas" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

      <div className="orb-field" aria-hidden="true">
        <div className="orb orb--1" />
        <div className="orb orb--2" />
        <div className="orb orb--3" />
      </div>

      <div className="hero__inner">
        <motion.div
          className="hero__content"
          initial="hidden"
          animate="visible"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.p className="hero__greeting" custom={0} variants={fadeUp}>
            SENIOR SOFTWARE ENGINEER · AI &amp; CLOUD SOLUTIONS
          </motion.p>

          <motion.h1 className="hero__heading heading-3d" custom={1} variants={fadeUp}>
            Hi, I&apos;m<br />
            <em>Dora Babu Chintala</em>
          </motion.h1>

          <motion.div className="hero__icon-strip" custom={2} variants={fadeUp}>
            {[
              { icon: <FiActivity />, label: 'Java', delay: 0.15 },
              { icon: <FiDatabase />, label: 'Spring Boot', delay: 0.25 },
              { icon: <FiBarChart2 />, label: 'AWS', delay: 0.35 },
              { icon: <FiLayers />, label: 'Microservices', delay: 0.45 },
              { icon: <FiShield />, label: 'LLMs', delay: 0.55 },
              { icon: <FiCpu />, label: 'Agentic AI', delay: 0.65 },
            ].map((item) => (
              <div className="hero__icon-item" key={item.label}>
                <Icon3D float delay={item.delay} label={item.label} size="lg">
                  {item.icon}
                </Icon3D>
                <span className="hero__icon-label">{item.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div className="hero__tags" custom={3} variants={fadeUp}>
            {['Java 17/21', 'Spring Boot', 'Generative AI', 'Falls Church, VA'].map(
              (tag, i) => (
                <motion.span
                  key={tag}
                  className="hero__tag"
                  whileHover={{ y: -4, rotateX: 10, scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
                  custom={i}
                >
                  {tag}
                </motion.span>
              )
            )}
          </motion.div>

          <motion.p className="hero__summary" custom={4} variants={fadeUp}>
            Senior software engineer with 8+ years of experience building enterprise applications and
            AI-enabled software solutions using Java, Spring Boot, Angular, AWS, and distributed
            architectures. Specializes in Generative AI and Agentic AI with LLMs, RAG, LangChain,
            MCP, vector databases, and knowledge retrieval.
          </motion.p>

          <motion.div className="hero__actions" custom={5} variants={fadeUp}>
            <motion.a
              href="mailto:chintala.d23@gmail.com"
              className="hero__btn hero__btn--primary btn-3d"
              aria-label="Send email to Dora Babu Chintala"
              whileHover={{ y: -3, rotateX: 8 }}
              whileTap={{ scale: 0.97 }}
            >
              Get in Touch
            </motion.a>
            <motion.button
              className="hero__btn hero__btn--outline btn-3d"
              onClick={() =>
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }
              aria-label="View work"
              whileHover={{ y: -3, rotateX: 8 }}
              whileTap={{ scale: 0.97 }}
            >
              View Work
            </motion.button>
            <motion.a
              href="/resume.pdf"
              download="Dora_Babu_Chintala_Resume.pdf"
              className="hero__btn hero__btn--outline btn-3d"
              aria-label="Download resume"
              whileHover={{ y: -3, rotateX: 8 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiDownload size={16} strokeWidth={2.4} />
              Download Resume
            </motion.a>
          </motion.div>

          <motion.div className="hero__stats" custom={6} variants={fadeUp}>
            {[
              { value: '8+', label: 'Years Experience' },
              { value: '30+', label: 'Legacy Jobs Analyzed' },
              { value: '12+', label: 'Distributed Services' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="hero__stat hero__stat--3d"
                whileHover={{ y: -6, rotateX: 12, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 280, damping: 16 }}
              >
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="hero__location"
            custom={7}
            variants={fadeUp}
            aria-label="Location: Falls Church, VA"
          >
            <FiMapPin size={15} strokeWidth={2.4} />
            Falls Church, VA
          </motion.div>
        </motion.div>
      </div>

      <div className="hero__scroll-indicator" aria-hidden="true">
        <motion.div
          className="hero__scroll-indicator-inner"
          animate={{ y: [0, 6, 0], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="hero__scroll-icon">
            <FiMousePointer size={12} />
          </span>
          <div className="hero__scroll-line" />
          Move cursor to reveal the story
        </motion.div>
      </div>
    </section>
  )
}
