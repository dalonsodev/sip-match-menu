import { useTranslation } from 'react-i18next'
import DrinkCard from '../features/drinkcard/DrinkCard'
import type { ReactNode } from 'react'
import type { Cocktail } from '../../types'
import type useActiveCard from '../../hooks/useActiveCard'

interface CocktailCarouselProps {
  cocktails: Cocktail[]
  activeCard: ReturnType<typeof useActiveCard>
}

export default function CocktailCarousel({ cocktails, activeCard }: CocktailCarouselProps): ReactNode {
  const { t } = useTranslation()
  const { activeIndex, activateCard } = activeCard

  if (!cocktails || cocktails.length === 0) {
    return null
  }

  return (
    cocktails.map((cocktail, index) => {
      return (
        <div
          key={cocktail.id}
          className="cocktail-card-wrapper carousel-item"
          role="group"
          aria-roledescription={t('a11y.cocktailRoleDesc')}
          aria-label={`${index + 1} ${t('a11y.of')} ${cocktails.length}: ${cocktail.name}`}
        >
          <DrinkCard
            cocktail={cocktail}
            isActive={activeIndex === index}
            onToggle={() => activateCard(index)}
          />
        </div>
      )
    })
  )
}
