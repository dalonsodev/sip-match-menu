import type { ReactNode } from 'react'
import type { TFunction } from 'i18next'

const SPIRITS = ['Whisky', 'Gin', 'Vodka', 'Rum', 'Tequila', 'Others']

interface SpiritFilterProps {
  spiritFilter: string
  onSpiritChange: (spirit: string) => void
  t: TFunction
}

export default function SpiritFilter({
  spiritFilter,
  onSpiritChange,
  t
}: SpiritFilterProps): ReactNode {
  return (
    <div className="menu-filter menu-filter-spirit">
      <p className="menu-filter-label">{t('menu.filter.mainSpirit')}:</p>
      {SPIRITS.map((spirit) => (
        <button
          key={spirit}
          onClick={() => onSpiritChange(spirit)}
          className={`menu-filter-btn ${spiritFilter === spirit ? 'active' : ''}`}
          aria-pressed={spiritFilter === spirit}
        >
          {t(`spirit.${spirit}`)}
        </button>
      ))}
    </div>
  )
}
