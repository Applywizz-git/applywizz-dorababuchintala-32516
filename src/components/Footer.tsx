import { motion } from 'framer-motion'
import { FiMail, FiHeart } from 'react-icons/fi'
import '../styles/contact.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      className="footer"
      role="contentinfo"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
    >
      <div className="footer__inner">
        <div>
          <motion.p
            className="footer__name"
            whileHover={{ rotateY: -4, scale: 1.02 }}
            style={{ transformStyle: 'preserve-3d', display: 'inline-block' }}
          >
            DORA BABU CHINTALA
          </motion.p>
          <p className="footer__title">Senior Software Engineer · AI &amp; Cloud Solutions · Falls Church, VA</p>
        </div>

        <div className="footer__right">
          <motion.a
            href="mailto:chintala.d23@gmail.com"
            className="footer__email"
            aria-label="Email Dora Babu Chintala"
            whileHover={{ y: -2, rotateX: 6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transformStyle: 'preserve-3d' }}
          >
            <FiMail size={16} strokeWidth={2.4} />
            chintala.d23@gmail.com
          </motion.a>
          <p className="footer__copy" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', justifyContent: 'flex-end' }}>
            © {year} Dora Babu Chintala. Crafted with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-flex', color: 'var(--color-navy)' }}
              aria-hidden="true"
            >
              <FiHeart size={14} strokeWidth={2.4} />
            </motion.span>
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
