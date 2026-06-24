import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'

interface ToggleAlcoholProps {
  alcoholFilter: boolean
  onToggle: () => void
}

export default function ToggleAlcohol({ alcoholFilter, onToggle }: ToggleAlcoholProps): ReactNode {
  const { t } = useTranslation()

  return (
    <div className="menu-filter-alcohol">
      <label className="toggle-label" htmlFor="alcohol-toggle">
        <span className="toggle-text">
          {t(`menu.filter.${alcoholFilter ? 'withAlcohol' : 'noAlcohol'}`)}
        </span>
        <input
          id="alcohol-toggle"
          className="toggle-input"
          type="checkbox"
          checked={alcoholFilter}
          onChange={onToggle}
          aria-label={t('a11y.toggleAlcohol')}
        />
        <span
          className="toggle-slider"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault()
              onToggle()
            }
          }}
         />
      </label>
    </div>
  )
}
