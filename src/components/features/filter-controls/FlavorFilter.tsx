import type { ReactNode } from 'react'
import type { TFunction } from 'i18next'

const CATEGORY_ALCOHOL = ['sweetAndFruity', 'refreshingAndLight', 'boldAndClassic']

const CATEGORY_NO_ALCOHOL = ['citrus', 'fruity', 'herbal']

interface FlavorFilterProps {
  alcoholFilter: boolean
  categoryFilter: string
  onCategoryChange: (category: string) => void
  t: TFunction
}

export default function FlavorFilter({
  alcoholFilter,
  categoryFilter,
  onCategoryChange,
  t
}: FlavorFilterProps): ReactNode {
  const categories = alcoholFilter ? CATEGORY_ALCOHOL : CATEGORY_NO_ALCOHOL

  return (
    <div className="menu-filter menu-filter-flavour">
      <p className="menu-filter-label">{t('menu.filter.flavorProfile')}:</p>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`menu-filter-btn ${categoryFilter === category ? 'active' : ''}`}
          aria-pressed={categoryFilter === category}
        >
          {t(`category.${category}`)}
        </button>
      ))}
    </div>
  )
}
