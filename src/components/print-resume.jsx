import photo from '../assets/photo.jpg'
import {
  profile,
  about,
  skills,
  experience,
  projects,
  education,
  military,
  contacts,
} from '../data/resume.js'
import './print-resume.css'

/* ---------- Документное резюме: видно только при печати ----------
   На экране — display:none (см. print-resume.css). При печати
   вытесняет .screen-only и печатает A4-документ. */

function printContacts() {
  const byId = (id) => (contacts.items.find((i) => i.id === id) || {}).value
  return [
    byId('phone'),
    byId('email'),
    byId('telegram'),
    profile.location,
    profile.english,
    profile.availability,
  ].filter(Boolean)
}

export default function PrintResume() {
  const today = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article class="print-resume">
      <header class="pr-doc">
        <span class="pr-doc-title">Резюме</span>
        <span class="pr-doc-date">{today}</span>
      </header>

      <header class="pr-head">
        <div class="pr-ident">
          <h1 class="pr-name">{profile.name}</h1>
          <p class="pr-roles">{profile.roles.join('  ·  ')}</p>
          <p class="pr-contacts">{printContacts().join('  ·  ')}</p>
        </div>
        <img class="pr-photo" src={photo} alt="Фото: {profile.name}" />
      </header>

      <section class="pr-section">
        <h2 class="pr-h">Обо мне</h2>
        <p class="pr-p">{about.lead}</p>
        <p class="pr-p">{about.body[0]}</p>
      </section>

      <section class="pr-section">
        <h2 class="pr-h">Ключевые навыки</h2>
        <ul class="pr-skills">
          {skills.map((group) => (
            <li key={group.name}>
              <b>{group.name}:</b> {group.chips.join(', ')}
            </li>
          ))}
        </ul>
      </section>

      <section class="pr-section">
        <h2 class="pr-h">Опыт работы</h2>
        <ul class="pr-exp">
          {experience.map((job) => (
            <li class="pr-exp-item" key={job.period}>
              <p class="pr-exp-head">
                <span class="pr-exp-title">
                  {job.org ? `${job.org} — ` : ''}
                  {job.role}
                </span>
                <span class="pr-exp-period">{job.period}</span>
              </p>
              <p class="pr-p">{job.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section class="pr-section">
        <h2 class="pr-h">Проекты</h2>
        <ul class="pr-proj">
          {projects.map((proj) => (
            <li class="pr-proj-item" key={proj.num}>
              <p class="pr-exp-head">
                <span class="pr-exp-title">
                  {proj.title}
                  <span class="pr-proj-org">{proj.org}</span>
                </span>
              </p>
              <p class="pr-p">{proj.points[0]}</p>
            </li>
          ))}
        </ul>
      </section>

      <section class="pr-section">
        <h2 class="pr-h">Образование</h2>
        {education.items.map((edu) => (
          <p class="pr-p" key={edu.org}>
            <b>{edu.org}</b> — {edu.field}, {edu.period} ({edu.note})
          </p>
        ))}
        <p class="pr-p">{education.lead}</p>
      </section>

      <section class="pr-section">
        <h2 class="pr-h">{military.label}</h2>
        <p class="pr-mono">{military.line}</p>
      </section>
    </article>
  )
}
