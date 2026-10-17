import { useEffect, useState } from 'preact/hooks'
import portrait from '../assets/portrait.jpg'
import './preloader.css'

/* Заставка на время загрузки: пока не готовы портрет и шрифты, сайт закрыт.
   Страховка по таймауту: даже если фото не загрузится, сайт откроется. */

const MIN_MS = 450
const MAX_MS = 5000

export default function Preloader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    let alive = true
    document.documentElement.classList.add('is-booting')

    const face = new Image()
    face.src = portrait
    const photo = face.decode ? face.decode().catch(() => {}) : Promise.resolve()
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve()
    const min = new Promise((resolve) => setTimeout(resolve, MIN_MS))
    const failsafe = new Promise((resolve) => setTimeout(resolve, MAX_MS))

    const reveal = () => {
      if (!alive) return
      document.documentElement.classList.remove('is-booting')
      setDone(true)
    }

    Promise.race([Promise.all([photo, fonts, min]), failsafe]).then(reveal)

    return () => {
      alive = false
      document.documentElement.classList.remove('is-booting')
    }
  }, [])

  return (
    <div class={done ? 'preloader is-done' : 'preloader'} aria-hidden={done ? 'true' : 'false'}>
      <span class="preloader-mark" aria-hidden="true">
        АР
      </span>
      <span class="preloader-text">загрузка…</span>
      <span class="preloader-bar" aria-hidden="true">
        <i />
      </span>
    </div>
  )
}
