import { useState, type ReactNode, isValidElement, cloneElement } from 'react'
import { motion } from 'framer-motion'
import {
  FiAward,
  FiBookOpen,
  FiShield,
  FiDatabase,
  FiCheckCircle,
  FiClipboard,
  FiActivity,
} from 'react-icons/fi'
import Reveal3D from './animations/Reveal3D'
import Icon3D from './animations/Icon3D'
import Tilt3D from './animations/Tilt3D'
import '../styles/certifications.css'

type Cert = {
  id: number
  num: string
  title: string
  issuer: string
  platform: string
  focus: string
  icon: ReactNode
}

const CERTIFICATIONS: Cert[] = [
  {
    id: 1,
    num: '01',
    title: 'AWS Academy - Data Analytics',
    issuer: 'AWS Academy',
    platform: 'AWS Academy',
    focus: 'Analytics',
    icon: <FiDatabase />,
  },
  {
    id: 2,
    num: '02',
    title: 'AWS Academy - Cloud Foundations',
    issuer: 'AWS Academy',
    platform: 'AWS Academy',
    focus: 'Cloud',
    icon: <FiClipboard />,
  },
  {
    id: 3,
    num: '03',
    title: 'AWS Academy - Cloud Security Foundations',
    issuer: 'AWS Academy',
    platform: 'AWS Academy',
    focus: 'Security',
    icon: <FiShield />,
  },
  {
    id: 4,
    num: '04',
    title: 'IBM Full Stack Software Developer Professional Certificate',
    issuer: 'Coursera',
    platform: 'Coursera',
    focus: 'Full Stack',
    icon: <FiCheckCircle />,
  },
  {
    id: 5,
    num: '05',
    title: 'Meta Back-End Developer Professional Certificate',
    issuer: 'Coursera',
    platform: 'Coursera',
    focus: 'Backend',
    icon: <FiActivity />,
  },
  {
    id: 6,
    num: '06',
    title: 'Spring: Spring Boot',
    issuer: 'LinkedIn Learning',
    platform: 'LinkedIn Learning',
    focus: 'Spring Boot',
    icon: <FiBookOpen />,
  },
]

export default function Certifications() {
  const [activeId, setActiveId] = useState<number | null>(null)

  return (
    <section
      className="certifications perspective-scene"
      id="certifications"
      aria-label="Certifications section"
    >
      <div className="orb-field" aria-hidden="true">
        <div className="orb orb--2" />
      </div>

      <div className="certifications__inner">
        <Reveal3D className="certifications__header">
          <div className="certifications__header-top">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Icon3D float size="md"><FiAward /></Icon3D>
              <span className="section-label">CERTIFICATIONS</span>
            </div>
            <span className="certifications__count">06 / certifications</span>
          </div>
          <h2 className="certifications__heading">
            Always <em>learning.</em>
          </h2>
          <p className="certifications__tagline">
            Six credentials across cloud, backend engineering, and modern software
            development practices, reinforcing my delivery capability across enterprise systems.
          </p>
        </Reveal3D>

        <div className="certifications__grid" role="list" aria-label="Certification cards">
          {CERTIFICATIONS.map((cert, i) => (
            <Tilt3D key={cert.id} maxTilt={9} scale={1.02} glare>
              <motion.article
                className={`cert-card${activeId === cert.id ? ' active' : ''}`}
                role="listitem"
                onMouseEnter={() => setActiveId(cert.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(cert.id)}
                onBlur={() => setActiveId(null)}
                tabIndex={0}
                aria-label={`${cert.title} — ${cert.issuer}`}
                initial={{ opacity: 0, y: 36, rotateX: 12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.07 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="cert-card__top">
                  <span className="cert-card__num">{cert.num}</span>
                  <span className="cert-card__badge">{cert.focus}</span>
                </div>

                <div className="cert-card__icon" aria-hidden="true">
                  {isValidElement<{ size?: number; strokeWidth?: number }>(cert.icon)
                    ? cloneElement(cert.icon, { size: 22, strokeWidth: 2 })
                    : cert.icon}
                </div>

                <h3 className="cert-card__title">{cert.title}</h3>

                <div className="cert-card__meta">
                  <span className="cert-card__issuer">
                    Issued by <strong>{cert.issuer}</strong>
                  </span>
                  <span className="cert-card__platform">{cert.platform}</span>
                </div>

                <div className="cert-card__footer">
                  <FiAward size={15} strokeWidth={2.4} />
                  <span>Verified credential</span>
                </div>
              </motion.article>
            </Tilt3D>
          ))}
        </div>
      </div>
    </section>
  )
}
