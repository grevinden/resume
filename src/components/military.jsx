import { military } from '../data/resume.js'
import './military.css'

/* Военная служба: обособленный сдержанный блок — вне списка мест работы. */
export default function Military() {
  return (
    <section class="section section-compact" id="military">
      <div class="container">
        <div class="mil">
          <span class="mil-label">{military.label}</span>
          <span class="mil-text">{military.line}</span>
        </div>
      </div>
    </section>
  )
}
