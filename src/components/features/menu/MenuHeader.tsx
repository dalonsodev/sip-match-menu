import ToggleAlcohol from '../../common/ToggleAlcohol'
import type { TFunction } from 'i18next'
import type { ReactNode } from 'react'

interface MenuHeaderProps {
  alcoholFilter: boolean
  onToggle: () => void
  t: TFunction
}

export default function MenuHeader({ alcoholFilter, onToggle, t }: MenuHeaderProps): ReactNode {
  return (
    <div className="menu-header">
      <h1 className="menu-title">{t('menu.title')}</h1>
      <ToggleAlcohol alcoholFilter={alcoholFilter} onToggle={onToggle} />
    </div>
  )
}
