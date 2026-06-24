import type { ReactNode } from 'react'
import type { TFunction } from 'i18next'

interface FiltersFooterProps {
  drinksToDisplayLength: number
  hasActiveFilters: string
  onClearFilters: () => void
  t: TFunction
}

export default function FiltersFooter({
  drinksToDisplayLength,
  hasActiveFilters,
  onClearFilters,
  t
}: FiltersFooterProps): ReactNode {
  return (
    <div className="clear-filters-container">
      <p className="cocktail-count">
        <span className="cocktail-count-number">{drinksToDisplayLength}</span>
        {t('menu.cocktailCount', { count: drinksToDisplayLength })}
      </p>
      {hasActiveFilters && (
        <button onClick={() => onClearFilters()} className="clear-filters-btn">
          {t('menu.clearFilters')}
        </button>
      )}
    </div>
  )
}
