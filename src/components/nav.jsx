import { useEffect, useState } from 'preact/hooks'
import { profile } from '../data/resume.js'
import './nav.css'

const links = [
  { id: 'about', label: 'Обо мне' },
  { id: 'skills', label: 'Навыки' },
  { id: 'projects', label: 'Проекты' },
  { id: 'experience', label: 'Опыт' },
  { id: 'education', label: 'Образование' },
  { id: 'contacts', label: 'Контакты' },
]

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
          <span class="brand-name">{profile.name}</span>
          <span class="brand-sub">backend · 1С · linux</span>
        </a>
        <nav class="nav-links" aria-label="Основная навигация">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} class={`nav-link ${active === l.id ? 'is-active' : ''}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <a class="btn btn-primary nav-cta" href="#contacts">
          Связаться
        </a>
      </div>
    </header>
  )
}
