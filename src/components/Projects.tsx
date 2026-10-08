import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiFolder, FiTrendingUp } from 'react-icons/fi'
import Reveal3D from './animations/Reveal3D'
import Icon3D from './animations/Icon3D'
import Tilt3D from './animations/Tilt3D'
import '../styles/projects.css'

type Project = {
  num: string
  title: string
  categories: string[]
  description: string
  metrics: string[]
  tools: string[]
  image: string
}

const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'AI-Enabled Healthcare Professional Portal',
    categories: ['AI', 'Healthcare'],
    description:
      'Built an AI-enabled healthcare portal with Angular 19, Spring Boot, REST APIs, and MongoDB across 4 core workflows covering professional profiles, credential verification, employer matching, and onboarding.',
    metrics: [
      'Built an AI-enabled healthcare portal across 4 core workflows covering professional profiles, credential verification, employer matching, and onboarding.',
      'Structured a 5-layer architecture spanning frontend, backend, persistence, AI, and retrieval using System Design, HLD, LLD, and API Design.',
      'Developed a RAG-based learning capability using LangChain, LLM Integration, Prompt Engineering, Vector Databases, and Knowledge Retrieval.',
    ],
    tools: ['Angular 19', 'Spring Boot', 'MongoDB', 'LangChain', 'LLM Integration', 'RAG'],
    image: '/assets/projects/query-oversight.jpg',
  },
]

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  return (
    <section className="projects perspective-scene" id="projects" aria-label="Projects section">
      <div className="orb-field" aria-hidden="true">
        <div className="orb orb--1" />
      </div>

      <div className="projects__inner">
        <Reveal3D className="projects__header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Icon3D size="md"><FiFolder /></Icon3D>
              <span className="section-label">PROJECTS</span>
            </div>
            <h2 className="projects__heading">
              Things I've <em>built.</em>
            </h2>
          </div>
        </Reveal3D>

        <div className="projects__accordion" role="tablist" aria-label="Project cards accordion">
          {PROJECTS.map((project, idx) => {
            const isActive = activeIndex === idx

            return (
              <motion.article
                key={project.num}
                className={`accordion-panel accordion-panel--3d ${isActive ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                role="tabpanel"
                tabIndex={0}
                aria-expanded={isActive}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveIndex(idx)
                  }
                }}
                layout
                transition={{ layout: { duration: 0.55, ease: [0.25, 1, 0.35, 1] } }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="accordion-panel__collapsed-bar">
                  <span className="accordion-panel__num">{project.num}</span>
                  <div className="accordion-panel__collapsed-title">
                    <span>{project.title}</span>
                  </div>
                </div>

                <div className="accordion-panel__expanded-content">
                  <div className="accordion-panel__body">
                    <div className="accordion-panel__meta">
                      <span className="accordion-panel__num-large">{project.num}</span>
                      <div className="accordion-panel__tags">
                        {project.categories.map((c) => (
                          <span key={c} className="accordion-panel__cat-tag">{c}</span>
                        ))}
                      </div>
                    </div>

                    <h3 className="accordion-panel__title">{project.title}</h3>
                    <p className="accordion-panel__desc">{project.description}</p>

                    <div className="accordion-panel__metrics" aria-label="Key metrics">
                      <span className="accordion-panel__section-label">KEY OUTCOMES</span>
                      {project.metrics.map((m, i) => (
                        <motion.div
                          key={i}
                          className="accordion-panel__metric-item"
                          whileHover={{ x: 4 }}
                        >
                          <span className="accordion-panel__metric-icon">
                            <FiTrendingUp size={16} strokeWidth={2.4} />
                          </span>
                          <span>{m}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="accordion-panel__tools">
                      {project.tools.map((t) => (
                        <motion.span
                          key={t}
                          className="accordion-panel__tool-chip"
                          whileHover={{ y: -3, rotateX: 8, scale: 1.05 }}
                          style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="accordion-panel__visual-container">
                    <Tilt3D maxTilt={10} scale={1.03} className="accordion-panel__visual-box">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="accordion-panel__project-image"
                      />
                    </Tilt3D>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
