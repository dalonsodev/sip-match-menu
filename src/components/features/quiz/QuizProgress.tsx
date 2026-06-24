import { useTranslation } from 'react-i18next'
import ProgressIndicator from '../../common/ProgressIndicator'
import type { ReactNode } from 'react'

interface QuizProgressProps {
  currentStep: number
  totalSteps: number
  onPrev: () => void
}

export default function QuizProgress({ currentStep, totalSteps, onPrev }: QuizProgressProps): ReactNode {
  const { t } = useTranslation()
  const progress = (currentStep + 1) / totalSteps

  return (
    <div className="progress-wrapper">
      <ProgressIndicator progress={progress} />

      {currentStep > 0 && (
        <button className="quiz-prev-btn" onClick={onPrev}>
          {t('quiz.back')}
        </button>
      )}
    </div>
  )
}
