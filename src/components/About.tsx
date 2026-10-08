import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'
import {
  FiMapPin,
  FiAward,
  FiTarget,
  FiLayers,
  FiShield,
  FiTrendingUp,
  FiBriefcase,
  FiMail,
  FiRefreshCw,
  FiCheckCircle,
} from 'react-icons/fi'
import Reveal3D from './animations/Reveal3D'
import Icon3D from './animations/Icon3D'
import '../styles/about.css'

const FACTS = [
  { key: 'Based In', value: 'Falls Church, VA', icon: <FiMapPin /> },
  { key: 'Experience', value: '8+ Years in Software Engineering & AI', icon: <FiBriefcase /> },
  { key: 'Focus', value: 'Java / Spring Boot / Cloud / Agentic AI', icon: <FiTarget /> },
  { key: 'Stack', value: 'Java 17/21 · Spring Boot · Angular · AWS', icon: <FiLayers /> },
  { key: 'AI', value: 'LLMs · RAG · LangChain · MCP · Vector DBs', icon: <FiAward /> },
  { key: 'Cloud', value: 'AWS EKS · Kubernetes · Docker · Kafka', icon: <FiShield /> },
  { key: 'Delivery', value: 'System Design · Microservices · CI/CD', icon: <FiTrendingUp /> },
]

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isEntranceFinished, setIsEntranceFinished] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  const rawX = useMotionValue(0)

  const smoothX = useSpring(rawX, {
    stiffness: 95,
    damping: 15,
    mass: 0.9,
  })

  const mouseRotateZ = useTransform(smoothX, [-300, 300], [-6.5, 6.5])
  const mouseX = useTransform(smoothX, [-300, 300], [-9, 9])
  const mouseRotateY = useTransform(smoothX, [-300, 300], [-2.5, 2.5])

  const entranceRotateZ = useMotionValue(0)
  const rotateZ = isEntranceFinished ? mouseRotateZ : entranceRotateZ

  useEffect(() => {
    const controls = animate(
      entranceRotateZ,
      [0, -6, 5, -3.5, 2, -1, 0],
      {
        duration: 2.2,
        ease: 'easeOut',
        onComplete: () => {
          setIsEntranceFinished(true)
        },
      }
    )
    return () => controls.stop()
  }, [entranceRotateZ])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const offset = e.clientX - centerX
    const clampedOffset = Math.max(-300, Math.min(300, offset))
    rawX.set(clampedOffset)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    rawX.set(0)
  }

  const handleDragEnd = () => {
    const currentRot = mouseRotateZ.get()
    rawX.set(0)
    if (Math.abs(currentRot) > 1) {
      animate(rawX, [currentRot * 40, -currentRot * 25, currentRot * 10, 0], {
        duration: 1.4,
        ease: 'easeOut',
      })
    }
  }

  return (
    <section
      className="about perspective-scene"
      id="about"
      aria-label="About Dora Babu Chintala"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      <div className="orb-field" aria-hidden="true">
        <div className="orb orb--2" />
      </div>

      <div className="about__inner">
        <Reveal3D direction="left" className="about__col-left">
          <div className="about__heading">
            <span className="section-label">ABOUT</span>
            <h2>
              Hi, I'm <em>Dora Babu Chintala</em>
            </h2>
          </div>

          <p className="about__intro">
            A senior software engineer with 8+ years of experience building enterprise applications and
            AI-enabled software solutions using Java, Spring Boot, Angular, AWS, and distributed
            systems. I specialize in Generative AI and Agentic AI implementations, combining full-stack
            engineering with LLM integration, RAG workflows, and cloud-native delivery to modernize
            legacy systems and automate knowledge discovery.
          </p>

          <motion.div
            className="about__quote lift-3d"
            whileHover={{ y: -6, rotateX: 4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <p>
              From legacy analysis to AI-enabled modernization — building scalable systems with
              clarity, precision, and production readiness.
            </p>
          </motion.div>
        </Reveal3D>

        <div className="about__col-middle">
          <div className="about__lanyard-anchor">
            <motion.div
              className="about__lanyard-assembly"
              style={{
                transformOrigin: '50% 0%',
                rotateZ,
                x: isEntranceFinished ? mouseX : 0,
                rotateY: isEntranceFinished ? mouseRotateY : 0,
                scale: isHovered ? 1.02 : 1,
                y: isHovered ? -3 : 0,
              }}
              drag="x"
              dragConstraints={{ left: -35, right: 35 }}
              dragElastic={0.25}
              onDragEnd={handleDragEnd}
              whileDrag={{ cursor: 'grabbing' }}
            >
              <div className="about__lanyard-strap-top" aria-hidden="true">
                <div className="about__lanyard-strap-inner" />
              </div>

              <div className="about__lanyard-hardware" aria-hidden="true">
                <div className="about__lanyard-ring" />
                <div className="about__lanyard-clip-metal" />
              </div>

              <div
                className={`about__id-flip${isFlipped ? ' is-flipped' : ''}`}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFlipped((prev) => !prev)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.stopPropagation()
                    setIsFlipped((prev) => !prev)
                  }
                }}
                role="button"
                tabIndex={0}
                aria-pressed={isFlipped}
                aria-label={
                  isFlipped
                    ? 'Flip ID card back to front'
                    : 'Flip ID card to see specialties'
                }
              >
                <motion.div
                  className="about__id-flip-inner"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front */}
                  <div className="about__id-face about__id-face--front about__id-card">
                    <div className="about__id-badge-hole" aria-hidden="true" />
                    <div className="about__id-card-header">
                      <span className="about__id-card-label">SOFTWARE ENGINEER ID</span>
                      <span className="about__id-card-dot" aria-hidden="true" />
                    </div>

                    <div className="about__id-card-body">
                      <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                        <div className="about__id-avatar" aria-hidden="true">D</div>
                        <div className="about__id-info">
                          <p className="about__id-name">Dora Babu Chintala</p>
                          <p className="about__id-title">Senior Software Engineer</p>
                          <p className="about__id-location">
                            <FiMapPin size={14} strokeWidth={2.4} />
                            Falls Church, VA
                          </p>
                        </div>
                      </div>

                      <div className="about__id-divider" />

                      <div className="about__id-meta">
                        <div className="about__id-meta-row">
                          <span className="about__id-meta-label">EXPERIENCE</span>
                          <span className="about__id-meta-value">8+ Years</span>
                        </div>
                        <div className="about__id-meta-row">
                          <span className="about__id-meta-label">STACK</span>
                          <span className="about__id-meta-value">Java / AWS / AI</span>
                        </div>
                        <div className="about__id-meta-row">
                          <span className="about__id-meta-label">FOCUS</span>
                          <span className="about__id-meta-value">Spring Boot / Kafka</span>
                        </div>
                        <div className="about__id-meta-row">
                          <span className="about__id-meta-label">STATUS</span>
                          <span className="about__id-meta-value">Available</span>
                        </div>
                      </div>

                      <div className="about__id-barcode" aria-hidden="true" />

                      <p className="about__id-flip-hint">
                        <FiRefreshCw size={14} strokeWidth={2.4} />
                        Click to flip
                      </p>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="about__id-face about__id-face--back about__id-card">
                    <div className="about__id-badge-hole" aria-hidden="true" />
                    <div className="about__id-card-header about__id-card-header--back">
                      <span className="about__id-card-label">SPECIALTIES &amp; FOCUS</span>
                      <span className="about__id-card-dot" aria-hidden="true" />
                    </div>

                    <div className="about__id-card-body about__id-card-body--back">
                      <ul className="about__id-back-list">
                        {[
                          'Java · Spring Boot · Angular',
                          'Microservices & Kafka',
                          'AWS EKS · Kubernetes · Docker',
                          'LLMs · RAG · LangChain',
                          'Legacy Modernization & Design',
                        ].map((item) => (
                          <li key={item} className="about__id-back-item">
                            <FiCheckCircle size={16} strokeWidth={2.4} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="about__id-divider" />

                      <a
                        href="mailto:chintala.d23@gmail.com"
                        className="about__id-back-cta"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiMail size={15} strokeWidth={2.4} />
                        chintala.d23@gmail.com
                      </a>

                      <p className="about__id-flip-hint">
                        <FiRefreshCw size={14} strokeWidth={2.4} />
                        Click to flip back
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <Reveal3D direction="right" delay={0.15} className="about__col-right">
          <div className="about__facts">
            <p className="about__facts-title">QUICK FACTS</p>

            {FACTS.map(({ key, value, icon }, i) => (
              <motion.div
                className="about__fact about__fact--3d"
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i, duration: 0.45 }}
              >
                <Icon3D size="md" delay={0.05 * i}>{icon}</Icon3D>
                <div className="about__fact-text">
                  <span className="about__fact-key">{key}</span>
                  <span className="about__fact-value">{value}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal3D>
      </div>
    </section>
  )
}
