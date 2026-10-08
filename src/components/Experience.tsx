import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiMapPin,
  FiBriefcase,
  FiTrendingUp,
  FiTag,
} from 'react-icons/fi'
import Reveal3D from './animations/Reveal3D'
import Icon3D from './animations/Icon3D'
import '../styles/experience.css'

type ExpItem = {
  num: string
  company: string
  role: string
  dates: string
  location: string
  summary: string
  bullets: string[]
  achievements: string[]
  tags: string[]
}

const EXPERIENCES: ExpItem[] = [
  {
    num: '01',
    company: 'Freddie Mac',
    role: 'Senior Software Engineer',
    dates: 'Oct 2024 – Present',
    location: 'McLean, VA',
    summary:
      'Applied LLM-driven knowledge retrieval and Agentic AI techniques alongside Java and Spring Boot analysis across 30+ legacy batch jobs, helping engineering teams identify dependencies and business rules for phased application modernization.',
    bullets: [
      'Designed event-driven loan-processing workflows with Spring Boot, Apache Kafka, and microservices across 12+ distributed services, increasing processing consistency while limiting tight dependencies between downstream systems.',
      'Scaled Java, Kafka, Hibernate, JDBC, and SQL processing to handle approximately 40K loan records per cycle, strengthening transaction integrity and giving operations teams more dependable reconciliation outcomes.',
      'Accelerated regression validation by 75% through Cypress, Angular 19, Jenkins, and CI/CD automation, giving developers and QA teams faster feedback before mortgage application changes reached production.',
      'Delivered cloud-native mortgage capabilities with Java, Spring Boot, Angular 19, REST APIs, AWS EKS, Kubernetes, and Docker, connecting frontend workflows with scalable backend services for dependable production processing.',
      'Integrated Agentic AI and RAG workflows using LLMs, LangChain, MCP, Prompt Engineering, and Knowledge Retrieval to analyze legacy application dependencies, extract business rules, and reduce manual investigation during modernization.',
    ],
    achievements: [
      '30+ legacy jobs analyzed',
      '12+ distributed services',
      '75% faster regression validation',
      '40K loan records/cycle',
    ],
    tags: ['Java', 'Spring Boot', 'Kafka', 'AWS', 'LLMs', 'RAG'],
  },
  {
    num: '02',
    company: 'Fidelity Investments',
    role: 'Software Engineer',
    dates: 'Jun 2023 – Sep 2024',
    location: 'Westlake, TX',
    summary:
      'Engineered Spring Boot services with Spring Security, Hibernate, SQL, and REST APIs for financial applications, giving business systems secure and maintainable access to backend transaction capabilities.',
    bullets: [
      'Deployed Dockerized microservices on AWS EKS and Kubernetes with platform teams, establishing repeatable release practices that supported zero-downtime delivery across integrated application services.',
      'Established reusable REST integrations across 12+ services using Spring Boot, Hibernate, and API Design, centralizing common backend behavior and decreasing duplicated integration work across financial systems.',
      'Automated recurring financial-processing workflows with Spring Batch, Java, SQL, and Transaction Management, giving operations teams predictable execution while preserving data integrity across downstream services.',
      'Connected financial applications through Apache Kafka and Event-Driven Architecture, enabling asynchronous service integration and resilient message processing while limiting direct dependencies between distributed services.',
      'Secured internal APIs with Spring Security and REST controls, validating access paths and protecting service-to-service communication in production.',
    ],
    achievements: [
      '12+ service integrations',
      'Zero-downtime delivery',
      'Kafka-enabled async flows',
      'Secure API controls',
    ],
    tags: ['Spring Security', 'Kubernetes', 'Kafka', 'REST', 'AWS', 'Hibernate'],
  },
  {
    num: '03',
    company: 'University of Illinois Chicago',
    role: 'Graduate Assistant - Software Engineering',
    dates: 'Sep 2021 – Jun 2023',
    location: 'Chicago, IL',
    summary:
      'Developed Java and Spring Boot applications for university initiatives, converting functional requirements into REST APIs and SQL-backed workflows that gave faculty and staff dependable access to operational functions.',
    bullets: [
      'Implemented backend services with Spring Boot, REST APIs, and SQL, creating cleaner application-to-data interactions that made university systems easier for technical contributors to maintain and extend.',
      'Optimized Java service logic and SQL access patterns to improve application response time by 30%, giving university users faster request handling across academic and administrative workflows.',
      'Automated data-processing routines with Python and SQL, increasing processing efficiency by 25% while preserving data accuracy across academic workflows.',
      'Structured reusable Java and Spring Boot components with design patterns and object-oriented principles, separating service responsibilities and reducing regression risk.',
      'Verified service and database changes through JUnit, Integration Testing, and Regression Testing, catching defects before release and increasing confidence in updates delivered to university users.',
    ],
    achievements: [
      '30% faster response time',
      '25% more efficient workflows',
      'Stronger test coverage',
      'Reduced regression risk',
    ],
    tags: ['Java', 'Spring Boot', 'REST', 'SQL', 'JUnit', 'Python'],
  },
  {
    num: '04',
    company: 'Aadyam Solutions Pvt. Ltd.',
    role: 'Software Engineer - Full Stack',
    dates: 'May 2018 – Aug 2021',
    location: 'India',
    summary:
      'Created full-stack web features with Java, Spring Boot, Angular, TypeScript, REST APIs, and SQL, translating business requirements into working functionality across frontend, backend, and persistence layers.',
    bullets: [
      'Built Angular interfaces with REST API integration, connecting user actions to Spring Boot services so application workflows behaved consistently and remained easy to extend.',
      'Implemented persistence flows with Hibernate, JDBC, SQL, ORM, and Transaction Management, supporting reliable create, update, and retrieval operations across core enterprise application functions.',
      'Connected Spring Boot components through Apache Kafka, enabling asynchronous event handling and giving application modules more flexibility than tightly coupled request-response interactions.',
      'Standardized build and release workflows with Gradle, Git, Jenkins, CI/CD, and Dependency Management, helping developers package and promote application changes consistently across delivery environments.',
      'Validated frontend and backend changes through Integration Testing, Regression Testing, and UI Automation, catching cross-layer defects earlier and supporting more dependable releases.',
    ],
    achievements: [
      'Full-stack delivery across layers',
      'Kafka-driven async processing',
      'CI/CD release consistency',
      'Cross-layer validation',
    ],
    tags: ['Angular', 'TypeScript', 'Hibernate', 'Kafka', 'Jenkins', 'Gradle'],
  },
]

export default function Experience() {
  const [openCard, setOpenCard] = useState<string | null>(null)

  const toggleCard = (num: string) => {
    const coarse = window.matchMedia('(hover: none)').matches
    if (!coarse && window.innerWidth > 768) return
    setOpenCard((prev) => (prev === num ? null : num))
  }

  return (
    <section className="experience perspective-scene" id="experience" aria-label="Work experience">
      <div className="experience__inner">
        <Reveal3D className="experience__header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Icon3D size="md"><FiBriefcase /></Icon3D>
              <span className="section-label">EXPERIENCE</span>
            </div>
            <h2 className="experience__heading">
              Where I've <em>worked.</em>
            </h2>
          </div>
          <span className="experience__count">04 positions</span>
        </Reveal3D>

        <div className="experience__list" role="list">
          {EXPERIENCES.map((exp, idx) => (
            <motion.article
              key={exp.num}
              className={`exp-card exp-card--3d${openCard === exp.num ? ' is-open' : ''}`}
              role="listitem"
              tabIndex={0}
              aria-expanded={openCard === exp.num}
              onClick={() => toggleCard(exp.num)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleCard(exp.num)
                }
              }}
              initial={{ opacity: 0, y: 40, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: idx * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <span className="exp-card__num" aria-hidden="true">{exp.num}</span>

              <div className="exp-card__main">
                <span className="exp-card__company">{exp.company}</span>
                <h3 className="exp-card__role">{exp.role}</h3>

                <div className="exp-card__meta">
                  <span className="exp-card__loc">
                    <FiMapPin size={15} strokeWidth={2.4} />
                    {exp.location}
                  </span>
                  <span className="exp-card__dot-sep" aria-hidden="true" />
                  <span className="exp-card__loc">{exp.summary.slice(0, 60)}…</span>
                </div>

                <div className="exp-card__details">
                  <p className="exp-card__summary">{exp.summary}</p>

                  <div className="exp-card__bullets">
                    {exp.bullets.map((b, i) => (
                      <p key={i} className="exp-card__bullet">{b}</p>
                    ))}
                  </div>

                  <div className="exp-card__achievements" aria-label="Key achievements">
                    {exp.achievements.map((a, i) => (
                      <span key={i} className="exp-card__achievement">
                        <FiTrendingUp size={14} strokeWidth={2.4} />
                        {a}
                      </span>
                    ))}
                  </div>

                  <div className="exp-card__tags" aria-label="Technologies used">
                    {exp.tags.map((t) => (
                      <span key={t} className="exp-card__tag">
                        <FiTag size={13} strokeWidth={2.4} />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="exp-card__right">
                <span className="exp-card__date">{exp.dates}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
