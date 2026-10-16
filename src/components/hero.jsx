import { useEffect, useState } from 'preact/hooks'
import { Reveal, reducedMotion } from './ui.jsx'
import { profile } from '../data/resume.js'
import './hero.css'

/* Ротация ролей: всякий 4-я секунда — следующая, с лёгким fade */
function RoleTicker() {
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (reducedMotion()) return undefined
    let cancelled = false
    let swap = null
    let next = null
    const cycle = () => {
      setFading(true)
      next = setTimeout(() => {
        if (cancelled) return
        setIdx((i) => (i + 1) % profile.roles.length)
        setFading(false)
        next = null
        swap = setTimeout(cycle, 4000)
      }, 280)
    }
    swap = setTimeout(cycle, 4000)
    return () => {
      cancelled = true
      if (swap) clearTimeout(swap)
      if (next) clearTimeout(next)
    }
  }, [])

  return <span class={`role ${fading ? 'is-fading' : ''}`}>{profile.roles[idx]}</span>
}

/* «profile.json» в терминале: факты кандидата в виде кода */
const LINES = [
  { plain: '# profile v1.0 · 26 лет опыта', cmt: true },
  { plain: '{' },
  { indent: 1, num: '1', k: 'name', v: '"Антон Растяженко"' },
  { indent: 1, num: '2', k: 'focus', v: '["Python", "Go", "1С", "Linux/DevOps"]' },
  { indent: 1, num: '3', k: 'languages', v: '["python", "fastapi", "go", "c++", "rust"]' },
  { indent: 1, num: '4', k: 'databases', v: '["postgresql", "ms_sql"]' },
  { indent: 1, num: '5', k: 'scale', v: '{"db": "5+ TB", "tsc": "150+"}' },
  { indent: 1, num: '6', k: 'location', v: '"Домодедово, Москва область"' },
  { indent: 1, num: '7', k: 'english', v: '"C1"' },
  { indent: 1, num: '8', k: 'status', v: '"OPEN_TO_OFFERS"' },
  { plain: '}' },
]

function Term() {
  return (
    <div class="term">
      <div class="term-bar">
        <span class="term-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span class="term-title">anton@localhost · ~/profile.json</span>
      </div>
      <div class="term-body" aria-label="Факты о кандидате в виде JSON-файла profile.json">
        {LINES.map((l, i) =>
          l.indent ? (
            <div class="t-line t-indent" key={l.num}>
              <span class="t-num" aria-hidden="true">
                {l.num}
              </span>
              <span class="t-key">"{l.k}"</span>
              <span class="t-val">{l.v}</span>
              {i < LINES.length - 2 ? ',' : ''}
            </div>
          ) : (
            <div class={`t-line ${l.cmt ? 't-cmt' : ''}`} key={i}>
              {l.plain}
            </div>
          )
        )}
        <span class="t-caret" aria-hidden="true">
          ▍
        </span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section class="hero" id="top">
      <div class="hero-glow" aria-hidden="true" />
      <div class="container hero-grid">
        <Reveal className="hero-copy">
          <p class="status-pill">
            <span class="status-dot" aria-hidden="true" />
            {profile.availability}
          </p>
          <p class="hero-kicker">
            <b>hi,</b> это я
          </p>
          <h1 class="hero-name" aria-label={profile.name}>
            {profile.name.split(' ').map((w, i) => (
              <span class="h-word" key={i} aria-hidden="true">
                <span class="h-word-in" style={{ animationDelay: `${120 + i * 120}ms` }}>
                  {w}
                  {'\u00A0'}
                </span>
              </span>
            ))}
          </h1>
          <p class="role-line">
            <span class="role-caret" aria-hidden="true">
              ▍
            </span>
            <RoleTicker />
          </p>
          <p class="hero-tagline">{profile.tagline}</p>
          <div class="hero-cta">
            <a class="btn btn-primary" href="#contacts">
              Обсудить проект
            </a>
            <a class="btn btn-ghost" href="#projects">
              мои проекты →
            </a>
          </div>
          <ul class="hero-facts">
            <li>{profile.location}</li>
            <li>удалёнка · гибрид · офис</li>
            <li>{profile.english}</li>
          </ul>
        </Reveal>
        <Reveal delay={180} className="hero-term">
          <Term />
        </Reveal>
      </div>
    </section>
  )
}
