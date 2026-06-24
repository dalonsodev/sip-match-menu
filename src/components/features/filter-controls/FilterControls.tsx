import FlavorFilter from './FlavorFilter'
import SpiritFilter from './SpiritFilter'
import FiltersFooter from './FiltersFooter'
import type { ReactNode } from 'react'
import type { TFunction } from 'i18next'

interface FilterControlProps {
  alcoholFilter: boolean
  categoryFilter: string
  spiritFilter: string
  handleClearFilters: () => void
  handleCategoryFilterChange: (category: string) => void
  handleSpiritFilterChange: (spirit: string) => void
  handleAlcoholFilterChange?: () => void
  drinksToDisplayLength: number
  t: TFunction
}

export default function FilterControls({
  alcoholFilter,
  categoryFilter,
  spiritFilter,
  handleClearFilters,
  handleCategoryFilterChange,
  handleSpiritFilterChange,
  drinksToDisplayLength,
  t
}: FilterControlProps): ReactNode {
  const hasActiveFilters = categoryFilter || spiritFilter

  return (
    <div className="menu-filters">
      <FlavorFilter
        alcoholFilter={alcoholFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={handleCategoryFilterChange}
        t={t}
      />

      {alcoholFilter && (
        <SpiritFilter
          spiritFilter={spiritFilter}
          onSpiritChange={handleSpiritFilterChange}
          t={t}
        />
      )}

      <FiltersFooter
        drinksToDisplayLength={drinksToDisplayLength}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={handleClearFilters}
        t={t}
      />
    </div>
  )
}
