import { useTranslation } from 'react-i18next'
import DrinkCard from '../features/drinkcard/DrinkCard'

export default function CocktailCarousel({ cocktails, activeCard }) {
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
