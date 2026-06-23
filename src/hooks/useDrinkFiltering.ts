import { useState } from 'react'

/**
 * Handles the filtering of drinks based on: alcohol, category, and/or spirit.
 *
 * @param deactivateCard - Deactivates a specific card
 */
export default function useDrinkFiltering(deactivateCard?: () => void) {
  const [alcoholFilter, setAlcoholFilter] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [spiritFilter, setSpiritFilter] = useState('')

  function handleAlcoholFilterChange() {
    deactivateCard?.()
    setAlcoholFilter((prev) => !prev)
    setCategoryFilter('')
    setSpiritFilter('')
  }

  function handleCategoryFilterChange(category: string): void {
    deactivateCard?.()
    setCategoryFilter((prev) => (prev === category ? '' : category))
  }

  function handleSpiritFilterChange(spirit: string): void {
    deactivateCard?.()
    setSpiritFilter((prev) => (prev === spirit ? '' : spirit))
  }

  function handleClearFilters(): void {
    deactivateCard?.()
    setCategoryFilter('')
    setSpiritFilter('')
  }

  return {
    alcoholFilter,
    categoryFilter,
    spiritFilter,
    handleAlcoholFilterChange,
    handleCategoryFilterChange,
    handleSpiritFilterChange,
    handleClearFilters
  }
}
