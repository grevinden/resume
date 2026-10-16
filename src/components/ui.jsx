import { createContext } from 'preact'
import { useCallback, useContext, useEffect, useRef, useState } from 'preact/hooks'

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- Тост (уведомления: «email скопирован» и т.п.) ---------- */

const ToastCtx = createContext(() => {})

export function useToast() {
  return useContext(ToastCtx)
}

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState('')
  const [shown, setShown] = useState(false)
  const timer = useRef(null)

  const toast = useCallback((text) => {
    setMsg(text)
    setShown(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setShown(false), 2400)
  }, [])

  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <div class={`toast ${shown ? 'is-shown' : ''}`} role="status" aria-live="polite">
        <span class="toast-dot" aria-hidden="true" />
        {msg}
      </div>
    </ToastCtx.Provider>
  )
}

/* ---------- Scroll-ревил: элемент появляется при входе в viewport ---------- */

export function Reveal({ children, delay = 0, className = '', id }) {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (reducedMotion()) {
      setInView(true)
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} id={id} class={`reveal ${inView ? 'is-in' : ''} ${className}`} style={{ '--d': `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ---------- Счётчик: число «наезжает» при первом появлении ---------- */

export function Counter({ value, suffix = '', duration = 1300 }) {
  const [n, setN] = useState(reducedMotion() ? value : 0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || started.current) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        started.current = true
        io.disconnect()
        if (reducedMotion()) {
          setN(value)
          return
        }
        const t0 = performance.now()
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / duration)
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, duration])

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

/* ---------- Заголовок секции: «// 01» + название ---------- */

export function SectionHead({ num, title, lead }) {
  return (
    <Reveal>
      <div class="section-head">
        <p class="kicker">
          <b>{num}</b>
          <span>sec</span>
        </p>
        <h2 class="h2">{title}</h2>
        {lead ? <p class="lead">{lead}</p> : null}
      </div>
    </Reveal>
  )
}

/* ---------- Копирование в буфер обмена ---------- */

export async function copyText(text, onDone) {
  const done = (ok) => onDone && onDone(ok)
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      done(true)
    } else {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
      done(true)
    }
  } catch (e) {
    done(false)
  }
}
