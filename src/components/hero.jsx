import { useEffect, useState } from 'preact/hooks'
import { Reveal, reducedMotion } from './ui.jsx'
import { profile } from '../data/resume.js'
import photo from '../assets/portrait.jpg'
import './hero.css'

/* Ротация ролей: каждые 4 секунды — следующая, с лёгким fade */
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

/* «profile.yaml» в терминале: факты кандидата в виде кода */
const LINES = [
  { plain: '# profile v1.0 · 26 лет опыта', cmt: true },
  { num: '1', k: 'name', v: 'Антон Растяженко' },
  { num: '2', k: 'focus', v: '[Python, Go, 1С, Linux/DevOps]' },
  { num: '3', k: 'languages', v: '[python, fastapi, go, c++, rust]' },
  { num: '4', k: 'databases', v: '[postgresql, ms_sql]' },
  { num: '5', k: 'scale', v: '{db: 5+ TB, tsc: 150+}' },
  { num: '6', k: 'location', v: 'Домодедово, Московская область' },
  { num: '7', k: 'english', v: 'C1' },
  { num: '8', k: 'status', v: 'ACTIVE_JOB_SEARCH' },
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
        <span class="term-title">anton@localhost · ~/profile.yaml</span>
      </div>
      <div class="term-body" aria-label="Факты о кандидате в виде YAML-файла profile.yaml">
        {LINES.map((l, i) =>
          l.k ? (
            <div class="t-line t-indent" key={l.num}>
              <span class="t-num" aria-hidden="true">
                {l.num}
              </span>
              <span class="t-key">{l.k}</span>
              <span class="t-colon">: </span>
              <span class="t-val">{l.v}</span>
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
        <div class="hero-side">
          <Reveal delay={120} className="hero-photo">
            <figure class="photo-card">
              <div class="term-bar">
                <span class="term-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span class="term-title">anton · portrait.png</span>
                <span class="photo-live" aria-hidden="true" />
              </div>
              <div class="photo-frame">
                <img
                  class="photo-img"
                  src={photo}
                  alt={`${profile.name} — портрет`}
                  width="1210"
                  height="1762"
                  decoding="async"
                />
                <span class="photo-scrim" aria-hidden="true" />
                <figcaption class="photo-caption">
                  <b>{profile.name}</b>
                  <span>backend · 1С · linux</span>
                </figcaption>
              </div>
            </figure>
          </Reveal>
          <Reveal delay={260} className="hero-term">
            <Term />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
