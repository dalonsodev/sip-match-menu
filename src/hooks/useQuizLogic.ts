import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import useQuizState from './useQuizState'
import useAnswerMapping from './useAnswerMapping'
import useQuizAutoAdvance from './useQuizAutoAdvance'
import useQuizFiltering from './useQuizFiltering'
import useQ3Options from './useQ3Options'
import type { QuizQuestion, CurrentQuestion, Cocktail, AlcoholicCocktail } from '../types'

interface QuizLogicReturn extends ReturnType<typeof useQuizState> {
  currentQuestions: CurrentQuestion[]
  filteredCocktails: Cocktail[]
  q3DynamicOptions: string[]
  getIsSelected: (question: CurrentQuestion, opt: string) => boolean
  handleOptionSelect: (selectedOption: string, step: number) => void
  isResultsBtnDisabled: () => boolean
}

/**
 * Manages the state and behavior of the quiz
 * @see useQuizState for additional state properties included in the return
 */
export default function useQuizLogic(): QuizLogicReturn {
  const { t } = useTranslation()
  const state = useQuizState()
  const { standardizeAnswer } = useAnswerMapping()

  const { getFilteredAfterQ2, filterCocktails } = useQuizFiltering(
    state.answers,
    state.quizAlcohol,
    standardizeAnswer
  )

  const getQ3Options = useQ3Options(
    state.currentStep,
    state.quizAlcohol,
    getFilteredAfterQ2
  )

  const q3DynamicOptions = getQ3Options()

  const currentQuestions = useMemo(
    () =>
      state.currentQuestionsBase.map((q) => ({
        ...q,
        text: t(q.textKey),
        options: q.options.map((opt) => t(opt.key))
      })),
    [state.currentQuestionsBase, t]
  )

  useQuizAutoAdvance({ ...state, currentQuestions, getFilteredAfterQ2 })

  function getIsSelected(question: CurrentQuestion, opt: string): boolean {
    const ans = state.answers[state.currentStep]

    return question.isMulti ? (ans || []).includes(opt) : ans === opt
  }

  function handleOptionSelect(selectedOption: string, step: number): void {
    state.setAnswers((prev) => {
      const newAnswers = [...prev]
      if (newAnswers[step] === undefined) {
        newAnswers[step] = []
      }

      const question = currentQuestions[step]
      if (question.isMulti) {
        const current = Array.isArray(newAnswers[step]) ? newAnswers[step] : []

        newAnswers[step] = current.includes(selectedOption)
          ? current.filter((opt) => opt !== selectedOption)
          : [...current, selectedOption]
      } else {
        newAnswers[step] = selectedOption
      }

      return newAnswers
    })

    state.setLastAnsweredStep(step)
  }

  function isResultsBtnDisabled(): boolean {
    if (state.currentStep !== currentQuestions.length - 1) return true
    const ans = state.answers[state.currentStep]
    const q = currentQuestions[state.currentStep]
    return q?.isMulti ? !(Array.isArray(ans) && ans?.length > 0) : !ans
  }

  return {
    ...state,
    currentQuestions,
    filteredCocktails: filterCocktails(),
    q3DynamicOptions,
    getIsSelected,
    handleOptionSelect,
    isResultsBtnDisabled
  }
}
