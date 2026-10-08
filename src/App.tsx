import { useState } from 'react'
import './styles/global.css'
import './styles/animations3d.css'
import './styles/mobile.css'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <Navbar />
      <Loader durationMs={3000} onComplete={() => setReady(true)} />

      <div className={`app-shell${ready ? ' app-shell--ready' : ''}`}>
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Education />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
