import { useCallback } from 'react'

/**
 * Returns a callback that will return a collection of valid spirits to be displayed as options
 *
 * @param {number} currentStep - The step from the quiz the user is currently at
 * @param {boolean} quizAlcohol - Whether if the user selected alcoholic drinks
 * @param {Function} getFilteredAfterQ2 - Returns cocktails filtered by Q1 and Q2 answers
 * @returns {function(): string[]}
 */
export default function useQ3Options(currentStep, quizAlcohol, getFilteredAfterQ2) {
  return useCallback(() => {
    if (!quizAlcohol || currentStep !== 2) return []

    const filteredAfterQ2 = getFilteredAfterQ2()
    if (filteredAfterQ2.length < 2) return []

    const spiritsCounts = {}
    filteredAfterQ2.forEach((cocktail) => {
      const spirit = cocktail.spirit
      spiritsCounts[spirit] = (spiritsCounts[spirit] || 0) + 1
    })

    const validSpirits = Object.keys(spiritsCounts).filter((spirit) => spiritsCounts[spirit] >= 1)

    return validSpirits.sort((a, b) => {
      if (a === 'Others') return 1
      if (b === 'Others') return -1
      return a.localeCompare(b)
    })
  }, [quizAlcohol, currentStep, getFilteredAfterQ2])
}
