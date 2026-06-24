import { useTranslation } from 'react-i18next'
import ToggleAlcohol from '../../common/ToggleAlcohol'
import { ReactNode } from 'react'

interface QuizConfirmationProps {
  quizAlcohol: boolean
  onToggle: () => void
  onStart: () => void
}

export default function QuizConfirmation({ quizAlcohol, onToggle, onStart }: QuizConfirmationProps): ReactNode {
  const { t } = useTranslation()

  return (
    <div className="quiz-confirmation">
      <h2>{t('quiz.beforeStart')}</h2>
      <p>{t('quiz.confirmAlcohol')}</p>
      <ToggleAlcohol
        alcoholFilter={quizAlcohol}
        onToggle={onToggle}
      />
      <p>{t('quiz.withoutAlcohol')}</p>
      <button onClick={onStart} className="btn-quiz">
        {t('quiz.start')}
      </button>
    </div>
  )
}
