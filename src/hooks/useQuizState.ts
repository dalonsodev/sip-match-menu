import { useState, Dispatch, SetStateAction } from 'react'
import questionsWithAlcohol from '../data/questions/withAlcohol'
import questionsNoAlcohol from '../data/questions/noAlcohol'
import { QuizAnswer, QuizQuestion } from '../types'

interface QuizStateReturn {
  showConfirmation: boolean
  quizAlcohol: boolean
  answers: QuizAnswer[]
  setAnswers: Dispatch<SetStateAction<QuizAnswer[]>>
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>
  lastAnsweredStep: number
  setLastAnsweredStep: Dispatch<SetStateAction<number>>
  skippedQ3: boolean
  setSkippedQ3: Dispatch<SetStateAction<boolean>>
  currentQuestionsBase: QuizQuestion[]
  handleStartQuiz: () => void
  handleQuizAlcoholToggle: () => void
  handlePrevStep: () => void
  handleNextStep: () => void
}

/**
 * Manages quiz state and navigation.
 */
export default function useQuizState(): QuizStateReturn {
  const [showConfirmation, setShowConfirmation] = useState(true)
  const [quizAlcohol, setQuizAlcohol] = useState(true)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [lastAnsweredStep, setLastAnsweredStep] = useState(-1)
  const [skippedQ3, setSkippedQ3] = useState(false)

  const currentQuestionsBase = quizAlcohol ? questionsWithAlcohol : questionsNoAlcohol

  function handleStartQuiz() {
    const questions = quizAlcohol ? questionsWithAlcohol : questionsNoAlcohol
    setShowConfirmation(false)
    setCurrentStep(0)
    setAnswers(questions.map((q) => (q.isMulti ? [] : null)))
  }

  function handleQuizAlcoholToggle() {
    setQuizAlcohol((prev) => !prev)
  }

  function handlePrevStep() {
    let prevStep = currentStep - 1
    const isSkippingQ3 = skippedQ3 && prevStep === 2

    if (isSkippingQ3) {
      prevStep -= 1 // Jumps to q2
      setSkippedQ3(false)
    }

    setCurrentStep(prevStep)
    setLastAnsweredStep(-1)
    setAnswers((prev) => {
      const newAnswers = [...prev]
      newAnswers[prevStep] = null
      return newAnswers
    })
  }

  function handleNextStep() {
    setCurrentStep((prev) => prev + 1)
  }

  return {
    showConfirmation,
    quizAlcohol,
    answers,
    setAnswers,
    currentStep,
    setCurrentStep,
    lastAnsweredStep,
    setLastAnsweredStep,
    skippedQ3,
    setSkippedQ3,
    currentQuestionsBase,
    handleStartQuiz,
    handleQuizAlcoholToggle,
    handlePrevStep,
    handleNextStep
  }
}
