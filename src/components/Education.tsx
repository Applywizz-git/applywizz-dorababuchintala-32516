import { motion } from 'framer-motion'
import { FiBook, FiMapPin, FiCalendar, FiBookmark } from 'react-icons/fi'
import Reveal3D from './animations/Reveal3D'
import Icon3D from './animations/Icon3D'
import Tilt3D from './animations/Tilt3D'
import '../styles/education.css'

type EduItem = {
  year: string
  yearLabel: string
  degree: string
  institution: string
  location: string
  tags: string[]
}

const EDUCATION: EduItem[] = [
  {
    year: '2023',
    yearLabel: 'Graduated',
    degree: 'Master of Science, Management Information Systems',
    institution: 'University of Illinois Chicago',
    location: 'Chicago, IL',
    tags: ['Information Systems', 'Systems Design', 'Data-Driven Decision Making'],
  },
  {
    year: '2018',
    yearLabel: 'Graduated',
    degree: 'Bachelor of Technology, Mechanical Engineering',
    institution: 'GITAM University',
    location: 'India',
    tags: ['Mechanical Engineering', 'Problem Solving', 'Engineering Fundamentals'],
  },
]

export default function Education() {
  return (
    <section className="education perspective-scene" id="education" aria-label="Education section">
      <div className="orb-field" aria-hidden="true">
        <div className="orb orb--3" />
      </div>

      <div className="education__inner">
        <Reveal3D className="education__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Icon3D float size="md"><FiBook /></Icon3D>
            <span className="section-label">EDUCATION</span>
          </div>
          <h2 className="education__heading">
            Where I <em>studied.</em>
          </h2>
        </Reveal3D>

        <div className="education__timeline" role="list" aria-label="Education timeline">
          {EDUCATION.map((edu, i) => (
            <Tilt3D key={edu.year + edu.institution} maxTilt={8} scale={1.015} glare>
              <motion.div
                className="edu-item edu-item--3d"
                role="listitem"
                initial={{ opacity: 0, y: 40, rotateX: 14 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="edu-item__counter" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="edu-item__year">
                  <span className="edu-item__year-main" aria-hidden="true">{edu.year}</span>
                  <span className="edu-item__year-label">
                    <FiCalendar size={14} strokeWidth={2.4} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                    {edu.yearLabel}
                  </span>
                </div>

                <div className="edu-item__content">
                  <h3 className="edu-item__degree">{edu.degree}</h3>

                  <div className="edu-item__meta">
                    <p className="edu-item__institution">{edu.institution}</p>
                    <span className="edu-item__divider" aria-hidden="true" />
                    <p className="edu-item__location">
                      <FiMapPin size={14} strokeWidth={2.4} />
                      {edu.location}
                    </p>
                  </div>

                  <div className="edu-item__field-tags" aria-label="Study areas">
                    {edu.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="edu-item__field-tag"
                        whileHover={{ y: -3, rotateX: 8, scale: 1.05 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', transformStyle: 'preserve-3d' }}
                      >
                        <FiBookmark size={13} strokeWidth={2.4} />
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Tilt3D>
          ))}
        </div>
      </div>
    </section>
  )
}
