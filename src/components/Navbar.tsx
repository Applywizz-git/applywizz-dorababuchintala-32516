import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiMenu, FiX, FiDownload } from 'react-icons/fi'
import '../styles/navbar.css'

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('#hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    NAV_ITEMS.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observerRef.current?.observe(el)
    })
    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-lock', menuOpen)
    return () => document.body.classList.remove('nav-lock')
  }, [menuOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1020) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = (href: string) => {
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMenuOpen(false)
  }

  return (
    <>
      <motion.header
        className={`navbar${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}
        role="banner"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="navbar__logo"
          onClick={() => handleNavClick('#hero')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleNavClick('#hero')}
          aria-label="Go to home"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        >
          <span className="navbar__logo-mark">DC</span>
          <span className="navbar__logo-name">Dora Babu Chintala</span>
        </motion.div>

        <nav className="navbar__nav" role="navigation" aria-label="Main navigation">
          {NAV_ITEMS.map(({ label, href }, i) => (
            <motion.button
              key={href}
              className={`navbar__link${activeSection === href ? ' active' : ''}`}
              onClick={() => handleNavClick(href)}
              aria-label={`Navigate to ${label}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i + 0.15 }}
              whileHover={{ y: -1 }}
            >
              {label}
            </motion.button>
          ))}
        </nav>

        <div className="navbar__actions">
          <motion.a
            href="/resume.pdf"
            download="Dora_Babu_Chintala_Resume.pdf"
            className="navbar__resume"
            aria-label="Download resume"
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <FiDownload size={16} strokeWidth={2.4} />
            <span>Resume</span>
          </motion.a>

          <motion.button
            className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            {menuOpen ? <FiX size={24} strokeWidth={2.4} /> : <FiMenu size={24} strokeWidth={2.4} />}
          </motion.button>
        </div>
      </motion.header>

      <nav
        className={`navbar__drawer${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {NAV_ITEMS.map(({ label, href }) => (
          <button
            key={href}
            className={`navbar__link${activeSection === href ? ' active' : ''}`}
            onClick={() => handleNavClick(href)}
            tabIndex={menuOpen ? 0 : -1}
          >
            {label}
          </button>
        ))}
        <a
          href="/resume.pdf"
          download="Dora_Babu_Chintala_Resume.pdf"
          className="navbar__resume navbar__resume--drawer"
          aria-label="Download resume"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        >
          <FiDownload size={16} strokeWidth={2.4} />
          <span>Download Resume</span>
        </a>
      </nav>
    </>
  )
}
