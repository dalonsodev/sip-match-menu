import { useCallback } from 'react'
import cocktailData from '../data/cocktails.json'
import type { Cocktail, QuizAnswer, AlcoholicCocktail } from '../types'

const cocktails = cocktailData as Cocktail[]

interface QuizFilteringReturn {
  getFilteredAfterQ2: () => AlcoholicCocktail[]
  filterCocktails: () => Cocktail[]
}

/**
 * Returns two filtering functions:
 * - getFilteredAfterQ2(): Returns cocktails matching Q1 and Q2 answers
 * - filterCocktails(): Returns cocktails matching all quiz answers
 */
export default function useQuizFiltering(
  answers: QuizAnswer[],
  quizAlcohol: boolean,
  standardizeAnswer: (answer: QuizAnswer) => string | string[]
): QuizFilteringReturn {

  const getFilteredAfterQ2 = useCallback(() => {
    if (answers[0] === null || answers[1] === null) return []
    const q1 = standardizeAnswer(answers[0])
    const q2 = standardizeAnswer(answers[1])

    return cocktails.filter((cocktail): cocktail is AlcoholicCocktail => {
      // Core configuration safety guard: drops mismatched asset processing early
      if (!cocktail.hasAlcohol) return false

      const matchesOccasion = Array.isArray(q1)
        ? q1.some((occ) => (cocktail.occasion as string[]).includes(occ))
        : (cocktail.occasion as string[]).includes(q1)

      const matchesCategory = cocktail.category === q2

      return matchesOccasion && matchesCategory
    })
  }, [answers, standardizeAnswer])

  const filterCocktails = useCallback(() => {
    if (!answers.every((answer) => answer !== undefined)) return []

    const [q1, q2, q3] = answers.map(standardizeAnswer)

    return cocktails.filter((cocktail) => {
      if (cocktail.hasAlcohol !== quizAlcohol) return false

      if (cocktail.hasAlcohol) {
        return (
          (cocktail.occasion as string[]).includes(q1 as string) &&
          cocktail.category === q2 &&
          (!q3 || q3.includes(cocktail.spirit))
        )
      } else {
        return (!q1 || cocktail.category === q1) && (!q2 || cocktail.texture === q2)
      }
    })
  }, [answers, quizAlcohol, standardizeAnswer])

  return { getFilteredAfterQ2, filterCocktails }
}
