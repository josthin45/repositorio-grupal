type MatchPair = {
  id: string
  term: string
  definition: string
}

const pairs: MatchPair[] = [
  {
    id: 'french-revolution',
    term: 'Revolución Francesa',
    definition: 'Debilitó la monarquia absoluta y difundió ideas de ciudadania e igualdad.',
  },
  {
    id: 'industrial-revolution',
    term: 'Revolución Industrial',
    definition: 'Impulsó fábricas, urbanización y nuevos sistemas de trabajo.',
  },
  {
    id: 'versailles',
    term: 'Tratado de Versalles',
    definition: 'Cerró la Primera Guerra Mundial y sancionó a Alemania.',
  },
  {
    id: 'cold-war',
    term: 'Guerra Fria',
    definition: 'Enfrentó ideológicamente a Estados Unidos y la Unión Soviética.',
  },
  {
    id: 'inca-empire',
    term: 'Tahuantinsuyo',
    definition: 'Organización territorial del Imperio Inca en cuatro suyos.',
  },
]

const shuffle = (items: MatchPair[]) => [...items].sort(() => 0.5 - Math.random())

const getSavedMatches = (storageKey: string) => {
  const saved = localStorage.getItem(storageKey)
  if (!saved) return new Set<string>()

  try {
    const ids = JSON.parse(saved) as string[]
    const validIds = new Set(pairs.map((pair) => pair.id))
    return new Set(ids.filter((id) => validIds.has(id)))
  } catch {
    return new Set<string>()
  }
}

export function setupMatching(root: HTMLElement) {
  let selectedTerm = ''
  let message = 'Selecciona un acontecimiento y luego su consecuencia.'
  let definitions = shuffle(pairs)
  const storageKey = 'questiaspace-history-matches'
  const matched = getSavedMatches(storageKey)

  const saveProgress = () => {
    localStorage.setItem(storageKey, JSON.stringify([...matched]))
  }

  const render = () => {
    root.innerHTML = `
      <div class="quiz-status">
        <span>Pares completados: ${matched.size} de ${pairs.length}</span>
        <span>${matched.size === pairs.length ? 'Actividad completa' : 'En progreso'}</span>
      </div>
      <div class="matching-grid">
        <div class="match-column">
          <h2>Acontecimientos</h2>
          ${pairs
            .map(
              (pair) => `
                <button class="match-item ${selectedTerm === pair.id ? 'selected' : ''} ${matched.has(pair.id) ? 'matched' : ''}" type="button" data-term="${pair.id}" ${matched.has(pair.id) ? 'disabled' : ''}>
                  ${pair.term}
                </button>
              `,
            )
            .join('')}
        </div>
        <div class="match-column">
          <h2>Consecuencias o descripciones</h2>
          ${definitions
            .map(
              (pair) => `
                <button class="match-item ${matched.has(pair.id) ? 'matched' : ''}" type="button" data-definition="${pair.id}" ${matched.has(pair.id) ? 'disabled' : ''}>
                  ${pair.definition}
                </button>
              `,
            )
            .join('')}
        </div>
      </div>
      <p class="feedback show">${message}</p>
      <div class="activity-actions">
        <button class="btn ghost" type="button" id="reset-matching">Borrar avance</button>
      </div>
    `

    root.querySelectorAll<HTMLButtonElement>('[data-term]').forEach((button) => {
      button.addEventListener('click', () => {
        selectedTerm = button.dataset.term ?? ''
        message = 'Ahora elige la descripción que corresponde.'
        render()
      })
    })

    root.querySelectorAll<HTMLButtonElement>('[data-definition]').forEach((button) => {
      button.addEventListener('click', () => {
        const definition = button.dataset.definition ?? ''

        if (!selectedTerm) {
          message = 'Validación: primero selecciona un acontecimiento de la izquierda.'
        } else if (selectedTerm === definition) {
          matched.add(definition)
          selectedTerm = ''
          saveProgress()
          message =
            matched.size === pairs.length
              ? 'Excelente. Relacionaste todos los acontecimientos.'
              : 'Correcto. Sigue con el siguiente par.'
        } else {
          message = 'Ese par no coincide. Intenta con otra descripción.'
        }

        render()
      })
    })

    root.querySelector<HTMLButtonElement>('#reset-matching')?.addEventListener('click', () => {
      selectedTerm = ''
      matched.clear()
      definitions = shuffle(pairs)
      saveProgress()
      message = 'Selecciona un acontecimiento y luego su consecuencia.'
      render()
    })
  }

  render()
}
