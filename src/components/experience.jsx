import { Reveal, SectionHead } from './ui.jsx'
import { experience } from '../data/resume.js'
import './experience.css'

export default function Experience() {
  return (
    <section class="section" id="experience">
      <div class="container">
        <SectionHead
          num="04"
          title="Опыт работы"
          lead="Полный путь: от программиста 1С в 1c.ru до интеграционных платформ и серверной комнаты розничной сети. Даты — открытые."
        />
        <div class="xp">
          {experience.map((e) => (
            <Reveal key={e.period + e.org} delay={60}>
              <article class={`xp-item ${e.current ? 'is-current' : ''}`}>
                <span class="xp-anchor" aria-hidden="true">
                  {e.current ? <span class="xp-dot-live" /> : <span class="xp-dot" />}
                </span>
                <time class="xp-period">{e.period}</time>
                <div class="xp-body">
                  <h3 class="xp-org">{e.org}</h3>
                  <p class="xp-role">
                    {e.role}
                    {e.current ? <span class="xp-now"> · сейчас</span> : null}
                  </p>
                  <p class="xp-text">{e.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
