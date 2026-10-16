import { Reveal, SectionHead } from './ui.jsx'
import { about } from '../data/resume.js'
import './about.css'

export default function About() {
  return (
    <section class="section" id="about">
      <div class="container">
        <SectionHead num="01" title="Кто я" />
        <div class="about-grid">
          <Reveal delay={80} className="about-lead">
            <p class="about-quote">{about.lead}</p>
            {about.body.map((p, i) => (
              <p class="about-text" key={i}>
                {p}
              </p>
            ))}
          </Reveal>
          <div class="about-cards">
            {about.cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 110}>
                <div class="card about-card">
                  <h3 class="about-card-title">{c.title}</h3>
                  <p class="about-card-text">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
