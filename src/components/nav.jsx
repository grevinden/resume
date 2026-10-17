import { useEffect, useState } from 'preact/hooks'
import { profile } from '../data/resume.js'
import './nav.css'

const links = [
  { id: 'about', label: 'Обо\u00a0мне' },
  { id: 'skills', label: 'Навыки' },
  { id: 'projects', label: 'Проекты' },
  { id: 'experience', label: 'Опыт' },
  { id: 'education', label: 'Образование' },
  { id: 'contacts', label: 'Контакты' },
]

const [firstName, ...lastParts] = profile.name.split(' ')
const lastName = lastParts.join(' ')

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('')

  // Подсвечиваем текущую секцию: «полоса perceptual focus»
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  // Фон появляется после прокрутки + тонкий прогресс-бар чтения
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setScrolled(window.scrollY > 24)
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header class={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div class="nav-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <div class="container nav-inner">
        <a class="nav-brand" href="#top" aria-label="Антон Растяженко — к началу страницы">
          <span class="logo-mark" aria-hidden="true">
            АР
          </span>
          <span class="brand-text">
            <span class="brand-name-stack">
              <span class="brand-name">{firstName}</span>
              <span class="brand-name">{lastName}</span>
            </span>
            <span class="brand-tags">
              <span class="brand-tag">1С · linux</span>
              <span class="brand-tag">backend</span>
            </span>
          </span>
        </a>
        <nav class="nav-links" aria-label="Основная навигация">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} class={`nav-link ${active === l.id ? 'is-active' : ''}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <button
          class="btn btn-print nav-cta"
          type="button"
          title="Распечатать: красивое PDF-резюме"
          onClick={() => window.print()}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          <span class="btn-print-label">Распечатать</span>
        </button>
        <a class="btn btn-primary nav-cta" href="#contacts">
          Связаться
        </a>
      </div>
    </header>
  )
}
