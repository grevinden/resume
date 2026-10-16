import { profile } from '../data/resume.js'
import './footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer class="footer">
      <div class="container footer-row">
        <p class="footer-copy">
          © {year} {profile.name} · Домодедово, Россия
        </p>
        <p class="footer-tech">preact 11 + vite 8 · статика, без backend</p>
        <button class="footer-up" type="button" onClick={toTop} aria-label="Наверх страницы" title="Наверх">
          ↑
        </button>
      </div>
    </footer>
  )
}
