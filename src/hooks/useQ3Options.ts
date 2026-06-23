import { useCallback } from 'react'
import { AlcoholicCocktail } from '../types'

/**
 * Returns a callback that will return a collection of valid spirits to be displayed as options
 */
export default function useQ3Options(
  currentStep: number,
  quizAlcohol: boolean,
  getFilteredAfterQ2: () => AlcoholicCocktail[]
): () => string[] {

  return useCallback(() => {
    if (!quizAlcohol || currentStep !== 2) return []

    const filteredAfterQ2 = getFilteredAfterQ2()
    if (filteredAfterQ2.length < 2) return []

    const spiritsCounts: Record<string, number> = {}
    filteredAfterQ2.forEach((cocktail: AlcoholicCocktail) => {
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
