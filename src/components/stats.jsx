import { Counter, Reveal } from './ui.jsx'
import { profile } from '../data/resume.js'
import './stats.css'

export default function Stats() {
  return (
    <section class="stats" aria-label="Ключевые цифры">
      <div class="container">
        <div class="stats-grid">
          {profile.stats.map((s, i) => (
            <Reveal key={i} delay={i * 90}>
              <div class="stat">
                <div class="stat-num">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div class="stat-label">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
