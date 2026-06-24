import QuizProgress from './QuizProgress'
import QuizStep from './QuizStep'
import QuizResults from './QuizResults'
import type { ReactNode } from 'react'
import type { TFunction } from 'i18next'
import type { Cocktail, CurrentQuestion, QuizOption, QuizQuestion } from '../../../types'

interface QuizContent {
  currentStep: number
  currentQuestions: CurrentQuestion[]
  quizAlcohol: boolean
  q3DynamicOptions: string[]
  filteredCocktails: Cocktail[]
  getIsSelected: (question: CurrentQuestion, opt: string) => boolean
  handleOptionSelect: (selectedOption: string, step: number) => void
  handlePrevStep: () => void
  handleNextStep: () => void
  isResultsBtnDisabled: boolean
  t: TFunction
}

export default function QuizContent({
  currentStep,
  currentQuestions,
  quizAlcohol,
  q3DynamicOptions,
  filteredCocktails,
  getIsSelected,
  handleOptionSelect,
  handlePrevStep,
  handleNextStep,
  isResultsBtnDisabled,
  t
}: QuizContent): ReactNode {
  function renderQuestion() {
    const question = currentQuestions[currentStep] || { options: [], isMulti: false }
    const isQ3Alcohol = quizAlcohol && currentStep === 2

    const optionsToDisplay =
      isQ3Alcohol && q3DynamicOptions.length > 0
        ? q3DynamicOptions.map((spirit) => ({
            value: spirit,
            label: t(`spirit.${spirit}`)
          }))
        : question.options

    return (
      <QuizStep
        question={question}
        options={optionsToDisplay}
        getIsSelected={getIsSelected}
        onSelect={(value: string) => handleOptionSelect(value, currentStep)}
        isMulti={question.isMulti}
      />
    )
  }

  function renderResults() {
    return <QuizResults cocktails={filteredCocktails} t={t} />
  }

  return (
    <>
      <QuizProgress
        currentStep={currentStep}
        totalSteps={currentQuestions.length}
        onPrev={handlePrevStep}
      />

      {currentStep < currentQuestions.length ? renderQuestion() : renderResults()}

      <div className="quiz-navigation">
        {currentStep === currentQuestions.length - 1 && (
          <button
            className="btn-primary"
            onClick={handleNextStep}
            disabled={isResultsBtnDisabled}
          >
            {t('quiz.results')}
          </button>
        )}
      </div>
    </>
  )
}
