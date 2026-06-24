import type { QuizQuestion } from '../../types'

const questions: QuizQuestion[] = [
  {
    textKey: 'quiz.whenDrink',
    options: [
      { key: 'quiz.aperitif' },
      { key: 'quiz.withMeal' },
      { key: 'quiz.dessert' },
      { key: 'quiz.eveningNight' }
    ],
    isMulti: false
  },
  {
    textKey: 'quiz.cocktailStyle',
    options: [
      { key: 'quiz.strongClassic' },
      { key: 'quiz.refreshingLight' },
      { key: 'quiz.sweetFruity' }
    ],
    isMulti: false
  },
  {
    textKey: 'quiz.spirits',
    options: [
      { key: 'quiz.whisky' },
      { key: 'quiz.gin' },
      { key: 'quiz.vodka' },
      { key: 'quiz.rum' },
      { key: 'quiz.tequila' },
      { key: 'quiz.others' }
    ],
    isMulti: true
  }
]

export default questions
