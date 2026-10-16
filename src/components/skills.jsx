import { Reveal, SectionHead } from './ui.jsx'
import { skills } from '../data/resume.js'
import './skills.css'

export default function Skills() {
  return (
    <section class="section" id="skills">
      <div class="container">
        <SectionHead
          num="02"
          title="Ключевые навыки"
          lead="Три мира: 1С — бизнес-логика, Python/Go — сервисы, Linux — фундамент. Вместе — один контур: от документа до железки."
        />
        <div class="skills-grid">
          {skills.map((group, i) => (
            <Reveal key={group.name} delay={(i % 4) * 90}>
              <div class="card skill-card">
                <h3 class="skill-name">
                  <span class="skill-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {group.name}
                </h3>
                <div class="skill-chips">
                  {group.chips.map((chip) => (
                    <span class="chip" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
