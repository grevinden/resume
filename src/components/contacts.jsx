import { Reveal, SectionHead, copyText, useToast } from './ui.jsx'
import { contacts } from '../data/resume.js'
import './contacts.css'

const Icon = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

const ICONS = {
  phone: (
    <Icon>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </Icon>
  ),
  email: (
    <Icon>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </Icon>
  ),
  telegram: (
    <Icon>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4z" />
    </Icon>
  ),
  max: (
    <Icon>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </Icon>
  ),
  setka: (
    <Icon>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </Icon>
  ),
}

function ExtArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

export default function Contacts() {
  const toast = useToast()
  const copyEmail = () =>
    copyText('anton@79252587842.ru', (ok) => toast(ok ? 'Почта скопирована ✓' : 'Не удалось скопировать'))

  return (
    <section class="section" id="contacts">
      <div class="container">
        <SectionHead num="05" title="Контакты" lead={contacts.lead} />
        <div class="contact-grid">
          <div class="contact-main">
            <Reveal>
              <h3 class="contact-h">{contacts.headline}</h3>
            </Reveal>
            {contacts.items.map((it, i) => (
              <Reveal key={it.id} delay={i * 80}>
                <div class="card contact-row">
                  <span class="contact-icon" aria-hidden="true">
                    {ICONS[it.id]}
                  </span>
                  <span class="contact-info">
                    <span class="contact-name">{it.name}</span>
                    {it.copy ? (
                      <a class="contact-value" href={it.href}>
                        {it.value}
                      </a>
                    ) : (
                      <span class="contact-value">{it.value}</span>
                    )}
                    {it.note ? (
                      <p class="contact-note">{it.note}</p>
                    ) : null}
                  </span>
                  <span class="contact-action">
                    {it.copy ? (
                      <button class="btn btn-ghost contact-btn" type="button" onClick={copyEmail}>
                        {it.action}
                      </button>
                    ) : (
                      <a class="btn btn-ghost contact-btn" href={it.href}>
                        {it.action} {it.external ? <ExtArrow /> : null}
                      </a>
                    )}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={140} className="contact-side">
            <div class="card contact-facts">
              <h3 class="contact-facts-title">География и формат</h3>
              <ul class="contact-facts-list">
                {contacts.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a
                class="btn btn-primary"
                href={`mailto:anton@79252587842.ru?subject=${encodeURIComponent('Предложение')}`}
              >
                Написать письмо
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
