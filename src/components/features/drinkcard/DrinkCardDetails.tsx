import type { ReactNode } from 'react'
import type { TFunction} from 'i18next'
import type { Cocktail } from '../../../types'

interface DrinkCardDetailsProps {
  cocktail: Cocktail
  t: TFunction
}

export default function DrinkCardDetails({ cocktail, t }: DrinkCardDetailsProps): ReactNode {
  const ingredients = cocktail.ingredients.map((ing) => t(`ingredients.${ing}`)).join(', ')
  const allergens = cocktail.allergens.map((aller) => t(`allergens.${aller}`)).join(', ')

  return (
    <div className="cocktail-content">
      <p className="cocktail-details">
        <span className="cocktail-details-label">{t('drinkCard.ingredientsLabel')}: </span>
        {ingredients}
      </p>
      <p className="cocktail-details">
        <span className="cocktail-details-label">{t('drinkCard.allergensLabel')}: </span>
        {allergens}
      </p>
    </div>
  )
}
