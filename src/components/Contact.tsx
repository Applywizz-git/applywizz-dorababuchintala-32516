import { motion } from 'framer-motion'
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiMessageCircle,
} from 'react-icons/fi'
import Reveal3D from './animations/Reveal3D'
import Icon3D from './animations/Icon3D'
import Tilt3D from './animations/Tilt3D'
import '../styles/contact.css'

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'chintala.d23@gmail.com',
    href: 'mailto:chintala.d23@gmail.com',
    icon: <FiMail />,
  },
  {
    label: 'Phone',
    value: '+1 (909) 802-6515',
    href: 'tel:+19098026515',
    icon: <FiPhone />,
  },
  {
    label: 'Location',
    value: 'Falls Church, VA',
    href: null as string | null,
    icon: <FiMapPin />,
  },
]

export default function Contact() {
  return (
    <section className="contact perspective-scene" id="contact" aria-label="Contact section">
      <div className="orb-field" aria-hidden="true">
        <div className="orb orb--1" />
        <div className="orb orb--2" />
      </div>

      <div className="contact__inner">
        <Reveal3D direction="left" className="contact__left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Icon3D float size="md"><FiMessageCircle /></Icon3D>
            <span className="section-label">CONTACT</span>
          </div>
          <h2 className="contact__heading">
            Let's <em>connect.</em>
          </h2>
          <p className="contact__subtext">
            Open to software engineering and AI-focused opportunities across full-stack,
            cloud-native, and enterprise application platforms. Whether it's a collaboration,
            a product role, or a technical conversation, I'd love to connect.
          </p>

          <div className="contact__links" role="list">
            {CONTACT_LINKS.map(({ label, value, href, icon }, i) => (
              <motion.div
                key={label}
                className="contact__link-item row-3d"
                role="listitem"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.45 }}
              >
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                  <Icon3D size="md" delay={0.08 * i}>{icon}</Icon3D>
                  <div>
                    <p className="contact__link-label">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="contact__link-value"
                        aria-label={`${label}: ${value}`}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="contact__link-value">{value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal3D>

        <Reveal3D direction="right" delay={0.15} className="contact__right">
          <Tilt3D maxTilt={8} scale={1.02}>
            <div className="contact__cta-box contact__cta-box--3d">
              <p className="contact__cta-title">READY TO WORK TOGETHER?</p>
              <p className="contact__cta-text">
                8+ years of software engineering and AI systems experience —<br />
                <em>let's build the next generation of intelligent products.</em>
              </p>

              <div className="contact__btns">
                <motion.a
                  href="mailto:chintala.d23@gmail.com"
                  className="contact__btn contact__btn--primary btn-3d"
                  aria-label="Send email to Dora Babu Chintala"
                  whileHover={{ y: -4, rotateX: 8 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FiSend size={16} strokeWidth={2.4} />
                  Email Me
                </motion.a>
                <motion.a
                  href="tel:+19098026515"
                  className="contact__btn contact__btn--outline btn-3d"
                  aria-label="Call Dora Babu Chintala"
                  whileHover={{ y: -4, rotateX: 8 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FiPhone size={16} strokeWidth={2.4} />
                  Call
                </motion.a>
              </div>
            </div>
          </Tilt3D>

          <motion.div
            className="availability-card"
            whileHover={{ y: -4, rotateX: 3 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            style={{ transformStyle: 'preserve-3d', marginTop: '1.25rem' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                marginBottom: '0.6rem',
              }}
            >
              AVAILABILITY
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="availability-card__pulse" aria-hidden="true" />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: 'var(--color-navy)',
                }}
              >
                Open to new opportunities
              </span>
            </div>
          </motion.div>
        </Reveal3D>
      </div>
    </section>
  )
}
