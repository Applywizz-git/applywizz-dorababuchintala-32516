import { useState, type ReactNode, isValidElement, cloneElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiCode,
  FiServer,
  FiLayout,
  FiCpu,
  FiCloud,
  FiDatabase,
  FiSliders,
  FiCheckCircle,
  FiActivity,
  FiZap,
  FiLayers,
  FiGrid,
} from 'react-icons/fi'
import Reveal3D from './animations/Reveal3D'
import Icon3D from './animations/Icon3D'
import Tilt3D from './animations/Tilt3D'
import '../styles/skills.css'

export type SkillCategory = {
  num: string
  title: string
  icon: ReactNode
  skills: string[]
  highlight?: boolean
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    num: '01',
    title: 'Programming Languages',
    icon: <FiCode />,
    skills: ['Java 17/21', 'Python', 'TypeScript', 'JavaScript', 'SQL'],
    highlight: true,
  },
  {
    num: '02',
    title: 'Backend Engineering',
    icon: <FiServer />,
    skills: ['Spring Boot', 'Spring Security', 'Spring Batch', 'Hibernate', 'JDBC', 'REST APIs'],
    highlight: true,
  },
  {
    num: '03',
    title: 'Frontend Engineering',
    icon: <FiLayout />,
    skills: ['Angular 19', 'REST API Integration'],
  },
  {
    num: '04',
    title: 'Distributed Systems & Architecture',
    icon: <FiCpu />,
    skills: [
      'Apache Kafka',
      'Event-Driven Architecture',
      'Distributed Systems',
      'Microservices Architecture',
      'API Design',
      'Design Patterns',
      'Service Integration',
    ],
    highlight: true,
  },
  {
    num: '05',
    title: 'Cloud & Containers',
    icon: <FiCloud />,
    skills: ['AWS', 'Amazon EKS', 'Kubernetes', 'Docker', 'Cloud-Native Applications'],
  },
  {
    num: '06',
    title: 'Databases & Persistence',
    icon: <FiDatabase />,
    skills: ['MongoDB', 'ORM', 'Transaction Management'],
  },
  {
    num: '07',
    title: 'Build & DevOps',
    icon: <FiSliders />,
    skills: ['Gradle', 'Jenkins', 'Git', 'CI/CD', 'Sonar', 'Dependency Management', 'Build Automation'],
  },
  {
    num: '08',
    title: 'Testing',
    icon: <FiCheckCircle />,
    skills: ['JUnit', 'Cucumber', 'Cypress', 'Unit Testing', 'Integration Testing', 'Regression Testing', 'UI Automation'],
  },
  {
    num: '09',
    title: 'Observability & Reliability',
    icon: <FiActivity />,
    skills: ['ELK Stack', 'Prometheus', 'Grafana', 'Distributed Tracing', 'Logging', 'Metrics', 'Production Troubleshooting', 'Resiliency'],
  },
  {
    num: '10',
    title: 'Generative AI & Agentic AI',
    icon: <FiZap />,
    skills: [
      'Generative AI (GenAI)',
      'Agentic AI',
      'LLMs',
      'RAG',
      'LangChain',
      'MCP',
      'Prompt Engineering',
      'Vector Databases',
      'Knowledge Retrieval',
      'LLM Integration',
    ],
    highlight: true,
  },
  {
    num: '11',
    title: 'Software Design & Delivery',
    icon: <FiLayers />,
    skills: [
      'System Design',
      'High-Level Design (HLD)',
      'Low-Level Design (LLD)',
      'Framework Modernization',
      'Legacy Modernization',
      'SDLC',
      'Code Reviews',
    ],
  },
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)

  const filterCategories = ['All', ...SKILL_CATEGORIES.map((c) => c.title)]

  const filteredCategories =
    activeCategory === 'All'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.title === activeCategory)

  return (
    <section className="skills perspective-scene" id="skills" aria-label="Skills section">
      <div className="orb-field" aria-hidden="true">
        <div className="orb orb--3" />
      </div>

      <div className="skills__inner">
        <Reveal3D className="skills__header">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Icon3D size="md">
              <FiGrid />
            </Icon3D>
            <span className="section-label">TECHNICAL SKILLS</span>
          </div>
          <h2 className="skills__heading">
            In eleven <em>domains.</em>
          </h2>
          <p className="skills__subtitle">
            Comprehensive breakdown of core engineering, AI capabilities, architecture patterns, and DevOps tooling.
          </p>
        </Reveal3D>

        {/* Category Filters */}
        <motion.div
          className="skills__filters"
          role="group"
          aria-label="Filter skills by category"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {filterCategories.map((catTitle) => {
            const isActive = activeCategory === catTitle
            const categoryObj = SKILL_CATEGORIES.find((c) => c.title === catTitle)
            const icon = catTitle === 'All' ? <FiGrid /> : categoryObj?.icon

            return (
              <motion.button
                key={catTitle}
                className={`skills__filter-pill${isActive ? ' active' : ''}`}
                onClick={() => setActiveCategory(catTitle)}
                aria-pressed={isActive}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 320, damping: 18 }}
              >
                <span className="skills__filter-icon" aria-hidden="true">
                  {isValidElement<{ size?: number; strokeWidth?: number }>(icon)
                    ? cloneElement(icon as React.ReactElement<{ size?: number; strokeWidth?: number }>, {
                        size: 14,
                        strokeWidth: 2,
                      })
                    : icon}
                </span>
                {catTitle}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Skills Cards Grid */}
        <div className="skills__cards-grid" role="list" aria-label="Skill categories cards">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92, y: -12 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(i * 0.04, 0.25),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="skills__card-wrapper"
              >
                <Tilt3D maxTilt={6} className="skills__card-tilt">
                  <div
                    className={`skills-card${cat.highlight ? ' skills-card--highlight' : ''}`}
                    role="listitem"
                  >
                    <div className="skills-card__header">
                      <div className="skills-card__icon-badge">
                        <span className="skills-card__num">{cat.num}</span>
                        <div className="skills-card__icon">
                          {isValidElement<{ size?: number }>(cat.icon)
                            ? cloneElement(cat.icon as React.ReactElement<{ size?: number }>, { size: 18 })
                            : cat.icon}
                        </div>
                      </div>
                      <div className="skills-card__title-box">
                        <h3 className="skills-card__title">{cat.title}</h3>
                        <span className="skills-card__count">{cat.skills.length} Skills</span>
                      </div>
                    </div>

                    <div className="skills-card__tags">
                      {cat.skills.map((skillName) => {
                        const isHovered = hoveredTag === skillName
                        return (
                          <motion.span
                            key={skillName}
                            className={`skill-badge${isHovered ? ' active' : ''}`}
                            onMouseEnter={() => setHoveredTag(skillName)}
                            onMouseLeave={() => setHoveredTag(null)}
                            whileHover={{ scale: 1.05, y: -1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          >
                            {skillName}
                          </motion.span>
                        )
                      })}
                    </div>
                  </div>
                </Tilt3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
