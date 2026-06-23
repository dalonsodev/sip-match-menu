import type { Question } from '../../types'

const questions: Question[] = [
  {
    textKey: 'quiz.flavorExperience',
    options: [
      { key: 'quiz.citrus' },
      { key: 'quiz.fruity' },
      { key: 'quiz.herbal' }
    ],
    isMulti: false
  },
  {
    textKey: 'quiz.smoothBubbles',
    options: [
      { key: 'quiz.smoothSilky' },
      { key: 'quiz.bubbly' }
    ],
    isMulti: false
  }
]

export default questions
