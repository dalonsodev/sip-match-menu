import { useEffect, useRef } from 'react'

/**
 * Auto-advances the current quiz step if not enough options to display.
 *
 * @param {Object} params
 * @param {number} params.currentStep - The step from the quiz the user is currently in
 * @param {Object[]} params.currentQuestions - Questions currently displayed in the quiz
 * @param {string[]} params.answers - Currently displayed answers
 * @param {number} params.lastAnsweredStep - The previous step in the quiz
 * @param {boolean} params.quizAlcohol - Whether if the user selected alcoholic drinks
 * @param {Function} params.getFilteredAfterQ2 - Will filter out cocktails that don't match occasion & category
 * @param {Function} params.setCurrentStep - Sets the current step in the quiz
 * @param {Function} params.setLastAnsweredStep - Sets the previous step in the quiz
 * @param {Function} params.setAnswers - The answers that will be displayed
 * @param {Function} params.setSkippedQ3 - Marks Q3 as skipped
 * @returns {void}
 */
export default function useQuizAutoAdvance({
  currentStep,
  currentQuestions,
  answers,
  lastAnsweredStep,
  quizAlcohol,
  getFilteredAfterQ2,
  setCurrentStep,
  setLastAnsweredStep,
  setAnswers,
  setSkippedQ3
}) {
  const isSkippingToResults = useRef(false)

  useEffect(() => {
    if (isSkippingToResults.current) return

    if (currentStep >= currentQuestions.length) return

    const question = currentQuestions[currentStep]
    const answer = answers[currentStep]

    if (answer === undefined || answer === null) return

    // Special case: In q2 (step 1) with alcohol, check if it should skip q3
    if (
      quizAlcohol &&
      currentStep === 1 &&
      answer !== null &&
      !question.isMulti &&
      currentStep === lastAnsweredStep
    ) {
      const filteredAfterQ2 = getFilteredAfterQ2()

      if (filteredAfterQ2.length === 1) {
        setAnswers((prev) => {
          const newAnswers = [...prev]
          newAnswers[2] = null // Ignore q3 in final filter
          return newAnswers
        })
        setSkippedQ3(true)
        isSkippingToResults.current = true

        setTimeout(() => {
          setCurrentStep(currentQuestions.length)
          setLastAnsweredStep(-1)
          isSkippingToResults.current = false
        }, 150)

        return // Early exit to avoid normal/original auto-advance
      }
    }

    // Original filter for auto-advance questions
    if (
      !question.isMulti &&
      answer !== null &&
      currentStep === lastAnsweredStep &&
      currentStep < currentQuestions.length - 1
    ) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
        setLastAnsweredStep(-1)
      }, 150)
    }
  }, [
    currentStep,
    currentQuestions,
    answers,
    lastAnsweredStep,
    quizAlcohol,
    getFilteredAfterQ2,
    setCurrentStep,
    setLastAnsweredStep,
    setAnswers,
    setSkippedQ3
  ])
}
