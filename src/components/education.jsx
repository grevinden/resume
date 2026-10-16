import { Reveal, SectionHead } from './ui.jsx'
import { education } from '../data/resume.js'
import './education.css'

export default function Education() {
  return (
    <section class="section" id="education">
      <div class="container">
        <SectionHead num="05" title="Образование" lead={education.lead} />
        <div class="edu">
          {education.items.map((e) => (
            <Reveal key={e.org} delay={60}>
              <article class="edu-item">
                <time class="edu-period">{e.period}</time>
                <div class="edu-body">
                  <h3 class="edu-org">{e.org}</h3>
                  <p class="edu-field">{e.field}</p>
                  <p class="edu-note">{e.note}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
