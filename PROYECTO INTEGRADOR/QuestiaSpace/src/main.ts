import './style.css'
import { setupCards } from './cards/cards.component.ts'
import { setupMatching } from './matching/matching.component.ts'
import { setupQuiz } from './quiz/quiz.component.ts'

type Route = 'inicio' | 'cuestionario' | 'tarjetas' | 'relacionar'

const routes: Route[] = ['inicio', 'cuestionario', 'tarjetas', 'relacionar']
const app = document.querySelector<HTMLDivElement>('#app')!

const getRoute = (): Route => {
  const hash = window.location.hash.replace('#/', '')
  return routes.includes(hash as Route) ? (hash as Route) : 'inicio'
}

const pageHeader = (activeRoute: Route) => `
  <header class="header">
    <div class="container nav-container">
      <a class="logo" href="#/inicio" aria-label="Ir al inicio">QUESTIA SPACE</a>
      <nav class="nav" aria-label="Navegación principal">
        <a class="${activeRoute === 'inicio' ? 'active' : ''}" href="#/inicio">Inicio</a>
        <a class="${activeRoute === 'cuestionario' ? 'active' : ''}" href="#/cuestionario">Cuestionario</a>
        <a class="${activeRoute === 'tarjetas' ? 'active' : ''}" href="#/tarjetas">Tarjetas</a>
        <a class="${activeRoute === 'relacionar' ? 'active' : ''}" href="#/relacionar">Relacionar</a>
      </nav>
    </div>
  </header>
`

const footer = `
  <footer class="footer">
    <div class="container">
      <p>2026 QuestiaSpace</p>
    </div>
  </footer>
`

const getInterestedCount = (): number => {
  const stored = localStorage.getItem('questiaspace-interested-count')
  return stored ? parseInt(stored, 10) : 0
}

const renderHome = () => `
  <main>
    <section class="hero compact-hero">
      <div class="container hero-content single-column">
        <div class="hero-copy">
          <h1>Questia Space</h1>
          <p>
            QuestiaSpace personaliza el estudio con métodos de aprendizaje que consisten en responder
            preguntas, repasar tarjetas y relacionar conceptos.
          </p>
          <div class="hero-actions" aria-label="Actividades disponibles">
            <a class="btn secondary" href="#/cuestionario">Ir a cuestionario</a>
            <a class="btn secondary" href="#/tarjetas">Ir a tarjetas</a>
            <a class="btn secondary" href="#/relacionar">Ir a relacionar</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <div>
            <h2 class="section-title">Elige una página de práctica</h2>

        <div class="activity-menu">
          <a class="module-card" href="#/cuestionario">
            <span class="card-icon">01</span>
            <h3>Cuestionario</h3>
            <p>Preguntas de opción múltiple sobre la materia.</p>
          </a>
          <a class="module-card" href="#/tarjetas">
            <span class="card-icon">02</span>
            <h3>Tarjetas</h3>
            <p>Conceptos para memorizar fechas, procesos o personajes clave.</p>
          </a>
          <a class="module-card" href="#/relacionar">
            <span class="card-icon">03</span>
            <h3>Relacionar</h3>
            <p>Une conceptos y palabras clave.</p>
          </a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading single-column">
          <h2 class="section-title">¿Te interesa QuestiaSpace?</h2>
          <p>Únete a los interesados en mejorar tu forma de estudiar.</p>
        </div>
        <div class="interested-card">
          <p class="interested-count"><strong id="interested-number">${getInterestedCount()}</strong> usuarios interesados</p>
          <button class="btn primary" type="button" id="mark-interested">Marcarme como interesado</button>
          <span class="interested-message" aria-live="polite"></span>
        </div>
    <section class="section">
      <div class="container">
        <div class="section-heading single-column">
          <h2 class="section-title">Preguntas frecuentes</h2>
          <p>Encuentra respuestas a las dudas más comunes sobre QuestiaSpace.</p>
        </div>
        <div class="faq-container">
          <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false" type="button">
              <span class="accordion-title">¿Qué es QuestiaSpace?</span>
              <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content" style="display: none;">
              <p>QuestiaSpace es una plataforma educativa interactiva que ayuda a los estudiantes a reforzar sus conocimientos mediante cuestionarios, tarjetas de estudio y actividades de relación de conceptos.</p>
            </div>
          </div>

          <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false" type="button">
              <span class="accordion-title">¿Puedo agregar mi propio contenido?</span>
              <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content" style="display: none;">
              <p>Sí. El sistema incluye formularios para añadir nuevas preguntas y ampliar el material de estudio disponible.</p>
            </div>
          </div>

          <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false" type="button">
              <span class="accordion-title">¿Cómo funciona el cuestionario?</span>
              <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content" style="display: none;">
              <p>El módulo de cuestionarios permite responder preguntas de opción múltiple, verificar las respuestas y agregar nuevas preguntas mediante un formulario interactivo.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
`

const renderActivityPage = (route: Exclude<Route, 'inicio'>) => {
  const data = {
    cuestionario: {
      eyebrow: 'Evaluación interactiva',
      title: 'Cuestionario de Historia',
      description: 'Selecciona una respuesta, comprueba el resultado y mejora tu mejor puntaje.',
      target: 'quiz-app',
    },
    tarjetas: {
      eyebrow: 'Memorizacion activa',
      title: 'Tarjetas de Historia',
      description: 'Voltea cada tarjeta y marca las que ya dominas para guardar tu avance.',
      target: 'cards-app',
    },
    relacionar: {
      eyebrow: 'Conexión de ideas',
      title: 'Relacionar acontecimientos',
      description: 'Selecciona un acontecimiento y vincularlo con su consecuencia correcta.',
      target: 'matching-app',
    },
  }[route]

  return `
    <main>
      <section class="page-hero">
        <div class="container">
          <a class="back-link" href="#/inicio">Volver al inicio</a>
          <p class="eyebrow">${data.eyebrow}</p>
          <h1>${data.title}</h1>
          <p>${data.description}</p>
        </div>
      </section>

      <section class="section activity-page">
        <div class="container">
          <div class="activity-shell">
            <div id="${data.target}"></div>
          </div>
        </div>
      </section>
    </main>
  `
}

const render = () => {
  const route = getRoute()
  app.innerHTML = `
    ${pageHeader(route)}
    ${route === 'inicio' ? renderHome() : renderActivityPage(route)}
    ${footer}
  `

  if (route === 'inicio') {
    const markButton = document.querySelector<HTMLButtonElement>('#mark-interested')
    const message = document.querySelector<HTMLSpanElement>('.interested-message')

    markButton?.addEventListener('click', () => {
      const currentCount = getInterestedCount()
      const newCount = currentCount + 1
      localStorage.setItem('questiaspace-interested-count', String(newCount))

      const numberElement = document.querySelector<HTMLElement>('#interested-number')
      if (numberElement) {
        numberElement.textContent = String(newCount)
      }

      if (message) {
        message.textContent = '¡Gracias! Ya estás en la lista de interesados.'
        message.style.display = 'block'
      }

      markButton.disabled = true
      markButton.textContent = 'Ya marcado como interesado'
    })

    const accordionHeaders = document.querySelectorAll<HTMLButtonElement>('.accordion-header')
    accordionHeaders.forEach((header) => {
      header.addEventListener('click', () => {
        const isExpanded = header.getAttribute('aria-expanded') === 'true'
        const content = header.nextElementSibling as HTMLElement | null

        accordionHeaders.forEach((otherHeader) => {
          otherHeader.setAttribute('aria-expanded', 'false')
          const otherContent = otherHeader.nextElementSibling as HTMLElement | null
          if (otherContent) {
            otherContent.style.display = 'none'
          }
        })

        if (!isExpanded && content) {
          header.setAttribute('aria-expanded', 'true')
          content.style.display = 'block'
        }
      })
    })
  }

  if (route === 'cuestionario') {
    setupQuiz(document.querySelector<HTMLDivElement>('#quiz-app')!)
  }

  if (route === 'tarjetas') {
    setupCards(document.querySelector<HTMLDivElement>('#cards-app')!)
  }

  if (route === 'relacionar') {
    setupMatching(document.querySelector<HTMLDivElement>('#matching-app')!)
  }
}

window.addEventListener('hashchange', render)

if (!window.location.hash) {
  window.location.hash = '#/inicio'
} else {
  render()
}
