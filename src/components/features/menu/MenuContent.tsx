import FilterControls from '../filter-controls/FilterControls'
import CocktailCarousel from '../../common/CocktailCarousel'
import NotFound from '../../common/NotFound'
import type { ReactNode } from 'react'
import type { TFunction } from 'i18next'
import type { Cocktail } from '../../../types'
import type useActiveCard from '../../../hooks/useActiveCard'

interface MenuContentProps {
  drinks: Cocktail[]
  hasResults: boolean
  alcoholFilter: boolean
  categoryFilter: string
  spiritFilter: string
  handleClearFilters: () => void
  handleAlcoholFilterChange: () => void
  handleCategoryFilterChange: (category: string) => void
  handleSpiritFilterChange: (spirit: string) => void
  t: TFunction
  activeCard: ReturnType<typeof useActiveCard>
}

export default function MenuContent({
  drinks,
  hasResults,
  alcoholFilter,
  categoryFilter,
  spiritFilter,
  handleClearFilters,
  handleAlcoholFilterChange,
  handleCategoryFilterChange,
  handleSpiritFilterChange,
  t,
  activeCard
}: MenuContentProps): ReactNode {
  return (
    <>
      <FilterControls
        drinksToDisplayLength={drinks.length}
        alcoholFilter={alcoholFilter}
        categoryFilter={categoryFilter}
        spiritFilter={spiritFilter}
        handleClearFilters={handleClearFilters}
        handleAlcoholFilterChange={handleAlcoholFilterChange}
        handleCategoryFilterChange={handleCategoryFilterChange}
        handleSpiritFilterChange={handleSpiritFilterChange}
        t={t}
      />
      <div
        className="cocktail-list carousel"
        role="region"
        id="cocktail-list"
        aria-label={t('a11y.carousel')}
        aria-roledescription={t('a11y.carouselRoleDesc')}
        tabIndex={-1}
      >
        {hasResults ? (
          <CocktailCarousel cocktails={drinks} activeCard={activeCard} />
        ) : (
          <NotFound />
        )}
      </div>
    </>
  )
}
