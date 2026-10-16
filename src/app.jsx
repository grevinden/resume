import { ToastProvider } from './components/ui.jsx'
import Nav from './components/nav.jsx'
import Hero from './components/hero.jsx'
import Stats from './components/stats.jsx'
import About from './components/about.jsx'
import Skills from './components/skills.jsx'
import Projects from './components/projects.jsx'
import Experience from './components/experience.jsx'
import Education from './components/education.jsx'
import Military from './components/military.jsx'
import Contacts from './components/contacts.jsx'
import Footer from './components/footer.jsx'

/* ---------- Каркас страницы ---------- */

export default function App() {
  return (
    <ToastProvider>
      <a class="skip-link" href="#about">
        К содержанию
      </a>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Military />
        <Education />
        <Contacts />
      </main>
      <Footer />
    </ToastProvider>
  )
}
