import type { TFunction } from 'i18next'
import type { ReactNode } from 'react'

interface DrinkCardHeaderProps {
  name: string
  isExpanded: boolean
  t: TFunction
}

export default function DrinkCardHeader({ name, isExpanded, t }: DrinkCardHeaderProps): ReactNode {
  return (
    <>
      <h2 className="cocktail-name">{name}</h2>
      {!isExpanded && <i className="cocktail-category">{t(`category.${name}`)}</i>}
    </>
  )
}
