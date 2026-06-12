type StudyCard = {
  front: string
  back: string
  clue: string
}

const cards: StudyCard[] = [
  {
    front: 'Revolución Francesa',
    back: 'Proceso iniciado en 1789 que cuestionó la monarquia absoluta y defendió ideas de ciudadania, libertad e igualdad.',
    clue: 'Francia, 1789',
  },
  {
    front: 'Revolución Industrial',
    back: 'Transformación económica y tecnológica basada en máquinas, fabricas y producción en serie.',
    clue: 'Siglos XVIII y XIX',
  },
  {
    front: 'Tratado de Versalles',
    back: 'Acuerdo de 1919 que cerró la Primera Guerra Mundial y estableció duras condiciones para Alemania.',
    clue: 'Primera Guerra Mundial',
  },
  {
    front: 'Tahuantinsuyo',
    back: 'Nombre del territorio organizado por el Imperio Inca, dividido en cuatro regiones o suyos.',
    clue: 'América del Sur',
  },
  {
    front: 'Guerra Fría',
    back: 'Rivalidad política, militar e ideológica entre Estados Unidos y la Unión Soviética después de 1945.',
    clue: 'Bloque capitalista y bloque socialista',
  },
]

const getSavedMastered = (storageKey: string) => {
  const saved = localStorage.getItem(storageKey)
  if (!saved) return new Set<number>()

  try {
    const indexes = JSON.parse(saved) as number[]
    return new Set(indexes.filter((index) => Number.isInteger(index) && index >= 0 && index < cards.length))
  } catch {
    return new Set<number>()
  }
}

export function setupCards(root: HTMLElement) {
  let current = 0
  let flipped = false
  const storageKey = 'questiaspace-history-mastered-cards'
  const mastered = getSavedMastered(storageKey)

  const saveProgress = () => {
    //LocalStorage
    localStorage.setItem(storageKey, JSON.stringify([...mastered]))
  }

  const render = () => {
    const card = cards[current]

    root.innerHTML = `
      <div class="quiz-status">
        <span>Tarjeta ${current + 1} de ${cards.length}</span>
        <span>Dominadas: ${mastered.size}</span>
      </div>
      <button class="flashcard ${flipped ? 'flipped' : ''}" type="button" id="flip-card" aria-label="Voltear tarjeta">
        <span class="flashcard-face front">
          <small>${card.clue}</small>
          <strong>${card.front}</strong>
        </span>
        <span class="flashcard-face back">
          <small>Explicacion</small>
          <strong>${card.back}</strong>
        </span>
      </button>
      <div class="deck-dots" aria-label="Progreso de tarjetas">
        ${cards
          .map(
            (_, index) => `
              <span class="${index === current ? 'active' : ''} ${mastered.has(index) ? 'done' : ''}"></span>
            `,
          )
          .join('')}
      </div>
      <p class="feedback show">
        Haz clic en la tarjeta para ver la explicación. Marca como dominada solo si pudiste recordarla antes de voltearla.
      </p>
      <div class="activity-actions">
        <button class="btn secondary" type="button" id="previous-card" ${current === 0 ? 'disabled' : ''}>Anterior</button>
        <button class="btn primary" type="button" id="master-card">${mastered.has(current) ? 'Quitar dominada' : 'Marcar dominada'}</button>
        <button class="btn secondary" type="button" id="next-card">${current === cards.length - 1 ? 'Volver al inicio' : 'Siguiente'}</button>
        <button class="btn ghost" type="button" id="reset-cards">Borrar avance</button>
      </div>
    `

    root.querySelector<HTMLButtonElement>('#flip-card')?.addEventListener('click', () => {
      flipped = !flipped
      render()
    })

    root.querySelector<HTMLButtonElement>('#previous-card')?.addEventListener('click', () => {
      current -= 1
      flipped = false
      render()
    })

    root.querySelector<HTMLButtonElement>('#next-card')?.addEventListener('click', () => {
      current = current === cards.length - 1 ? 0 : current + 1
      flipped = false
      render()
    })

    root.querySelector<HTMLButtonElement>('#master-card')?.addEventListener('click', () => {
      if (mastered.has(current)) {
        mastered.delete(current)
      } else {
        mastered.add(current)
      }

      saveProgress()
      render()
    })

    root.querySelector<HTMLButtonElement>('#reset-cards')?.addEventListener('click', () => {
      current = 0
      flipped = false
      mastered.clear()
      saveProgress()
      render()
    })
  }

  render()
}
