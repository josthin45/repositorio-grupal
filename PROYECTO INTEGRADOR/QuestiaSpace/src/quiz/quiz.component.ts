type QuizQuestion = {
  question: string
  options: string[]
  answer: string
  detail: string
}

const customQuizStorageKey = 'questiaspace-history-custom-quiz'

const loadSavedQuestions = (): QuizQuestion[] => {
  try {
    return JSON.parse(localStorage.getItem(customQuizStorageKey) ?? '[]') as QuizQuestion[]
  } catch {
    return []
  }
}

const defaultQuestions: QuizQuestion[] = [
  {
    question: '¿Qué hecho histórico inicio la Edad Contemporánea?',
    options: ['La Revolución Francesa', 'La caída de Roma', 'El descubrimiento de América'],
    answer: 'La Revolución Francesa',
    detail: 'La Revolución Francesa de 1789 marcó un cambio político y social clave en Europa.',
  },
  {
    question: '¿Qué imperio fue gobernado desde el Tahuantinsuyo antes de la llegada española?',
    options: ['Imperio Inca', 'Imperio Bizantino', 'Imperio Romano'],
    answer: 'Imperio Inca',
    detail: 'El Tahuantinsuyo fue la organizacion politica del Imperio Inca en Sudamerica.',
  },
  {
    question: '¿Qué tratado puso fin oficialmente a la Primera Guerra Mundial?',
    options: ['Tratado de Versalles', 'Tratado de Tordesillas', 'Tratado de Utrecht'],
    answer: 'Tratado de Versalles',
    detail: 'El Tratado de Versalles se firmó en 1919 y estableció condiciones para Alemania.',
  },
  {
    question: '¿Cuál fue una consecuencia directa de la Revolución Industrial?',
    options: ['Crecimiento de las ciudades', 'Fin de la escritura', 'Desaparición del comercio'],
    answer: 'Crecimiento de las ciudades',
    detail: 'La industrializacion impulsó fabricas, migración del campo a la ciudad y nuevos trabajos.',
  },
  {
    question: '¿Qué civilización antigua construyo las pirámides de Giza?',
    options: ['Egipcia', 'Griega', 'Maya'],
    answer: 'Egipcia',
    detail: 'Las pirámides de Giza fueron construidas durante el Antiguo Egipto.',
  },
]

const savedQuestions: QuizQuestion[] = loadSavedQuestions()
const questions: QuizQuestion[] = [...defaultQuestions, ...savedQuestions]

export function setupQuiz(root: HTMLElement) {
  let current = 0
  let selected = ''
  let score = 0
  let answered = false
  const storageKey = 'questiaspace-history-best-score'
  const legacyScore = localStorage.getItem('bestScore')
  let bestScore = Number(localStorage.getItem(storageKey) ?? legacyScore ?? 0)

  const render = () => {
    const question = questions[current]
    const progress = Math.round(((current + 1) / questions.length) * 100)

    root.innerHTML = `
      <div class="quiz-status">
        <span>Pregunta ${current + 1} de ${questions.length}</span>
        <span>Puntaje: ${score} | Mejor: ${bestScore}</span>
      </div>
      <div class="progress-track" aria-hidden="true">
        <span style="width: ${progress}%"></span>
      </div> 
      <section class="quiz-form-section">
        <div class="quiz-form-card">
          <h3>Agregar pregunta</h3>
          <form id="add-question-form">
            <label>
              Pregunta
              <input name="question" type="text" placeholder="Escribe la pregunta" required />
            </label>
            <div class="quiz-form-grid">
              <label>
                Opción 1
                <input name="option1" type="text" placeholder="Primera opción" required />
              </label>
              <label>
                Opción 2
                <input name="option2" type="text" placeholder="Segunda opción" required />
              </label>
              <label>
                Opción 3
                <input name="option3" type="text" placeholder="Tercera opción" required />
              </label>
            </div>
            <label>
              Respuesta correcta
              <input name="answer" type="text" placeholder="Debe coincidir con una opción" required />
            </label>
            <label>
              Detalle
              <input name="detail" type="text" placeholder="Explicación breve (opcional)" />
            </label>
            <div class="form-actions">
              <button class="btn secondary" type="submit">Agregar pregunta</button>
              <span class="form-message" aria-live="polite"></span>
            </div>
          </form>
        </div>
      </section>
      <h2 class="activity-question">${question.question}</h2>
      <div class="option-list" aria-label="Opciones de respuesta">
        ${question.options
          .map(
            (option) => `
              <button class="option-btn ${selected === option ? 'selected' : ''}" type="button" data-option="${option}">
                ${option}
              </button>
            `,
          )
          .join('')}
      </div>
      <p class="feedback ${answered ? 'show' : ''}">
        ${
          answered
            ? selected === question.answer
              ? `Correcto. ${question.detail}`
              : `La respuesta correcta es "${question.answer}". ${question.detail}`
            : 'Selecciona una opción. El botón Comprobar se activa cuando la respuesta es válida.'
        }
      </p>
      <div class="activity-actions">
        <button class="btn primary" type="button" id="check-answer" ${!selected || answered ? 'disabled' : ''}>Comprobar</button>
        <button class="btn secondary" type="button" id="prev-question" ${current === 0 ? 'disabled' : ''}>Anterior</button>
        <button class="btn secondary" type="button" id="next-question">${current === questions.length - 1 ? 'Finalizar' : 'Siguiente'}</button>
        <button class="btn ghost" type="button" id="reset-quiz">Reiniciar intento</button>
      </div>
    `

    root.querySelectorAll<HTMLButtonElement>('.option-btn').forEach((button) => {
      button.addEventListener('click', () => {
        if (answered) return
        selected = button.dataset.option ?? ''
        render()
      })
    })

    root.querySelector<HTMLButtonElement>('#check-answer')?.addEventListener('click', () => {
      if (!selected) return

      answered = true
      if (selected === question.answer) score += 1
      bestScore = Math.max(bestScore, score)
      //LocalStorage 
      localStorage.setItem(storageKey, String(bestScore))
      localStorage.setItem('bestScore', String(bestScore))
      render()
    })

    root.querySelector<HTMLButtonElement>('#next-question')?.addEventListener('click', () => {
      if (current === questions.length - 1) {
        current = 0
        selected = ''
        answered = false
        score = 0
        render()
        return
      }

      current += 1
      selected = ''
      answered = false
      render()
    })

    root.querySelector<HTMLFormElement>('#add-question-form')?.addEventListener('submit', (event) => {
      event.preventDefault()
      const form = event.currentTarget as HTMLFormElement
      const formData = new FormData(form)
      const questionText = (formData.get('question') as string | null ?? '').trim()
      const option1 = (formData.get('option1') as string | null ?? '').trim()
      const option2 = (formData.get('option2') as string | null ?? '').trim()
      const option3 = (formData.get('option3') as string | null ?? '').trim()
      const answer = (formData.get('answer') as string | null ?? '').trim()
      const detail = (formData.get('detail') as string | null ?? '').trim() || 'Pregunta agregada por el usuario.'
      const message = root.querySelector<HTMLSpanElement>('.form-message')

      if (!questionText || !option1 || !option2 || !option3 || !answer) {
        if (message) message.textContent = 'Completa todos los campos requeridos.'
        return
      }

      if (![option1, option2, option3].includes(answer)) {
        if (message) message.textContent = 'La respuesta debe coincidir con una de las opciones.'
        return
      }

      const newQuestion: QuizQuestion = {
        question: questionText,
        options: [option1, option2, option3],
        answer,
        detail,
      }

      questions.push(newQuestion)
      savedQuestions.push(newQuestion)
      localStorage.setItem(customQuizStorageKey, JSON.stringify(savedQuestions))

      form.reset()
      if (message) message.textContent = 'Pregunta agregada correctamente.'
    })

    root.querySelector<HTMLButtonElement>('#prev-question')?.addEventListener('click', () => {
      if (current === 0) return
      current -= 1
      selected = ''
      answered = false
      render()
    })

    root.querySelector<HTMLButtonElement>('#reset-quiz')?.addEventListener('click', () => {
      current = 0
      selected = ''
      score = 0
      answered = false
      render()
    })
  }

  render()
}
