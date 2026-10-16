import { Reveal, SectionHead } from './ui.jsx'
import { projects } from '../data/resume.js'
import './projects.css'

export default function Projects() {
  return (
    <section class="section" id="projects">
      <div class="container">
        <SectionHead
          num="03"
          title="Ключевые проекты"
          lead="Платформы, которые держали реальную нагрузку: интеграционная оболочка вокруг ядра ERP, WMS ответственного хранения, база 5+ ТБ."
        />
        <div class="projects-grid">
          {projects.map((p, i) => (
            <Reveal key={p.num} delay={(i % 3) * 90}>
              <article class="card proj">
                <div class="proj-top">
                  <span class="proj-num" aria-hidden="true">
                    {p.num}
                  </span>
                  <h3 class="proj-title">{p.title}</h3>
                </div>
                <p class="proj-org">{p.org}</p>
                <ul class="proj-list">
                  {p.points.map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
                <div class="proj-tags">
                  {p.tags.map((t) => (
                    <span class="chip chip-tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
