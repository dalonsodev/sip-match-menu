import { Link } from 'react-router-dom'
import useActiveCard from '../../../hooks/useActiveCard'
import CocktailCarousel from '../../common/CocktailCarousel'
import NotFound from '../../common/NotFound'
import type { ReactNode } from 'react'
import type { TFunction } from 'i18next'
import type { Cocktail } from '../../../types'

interface QuizResultsProps {
  cocktails: Cocktail[]
  t: TFunction
}

export default function QuizResults({ cocktails, t }: QuizResultsProps): ReactNode {
  const hasResults = cocktails.length > 0
  const activeCard = useActiveCard()

  return (
    <div className="results-container">
      <p className="cocktail-count cocktail-count-results">
        <span className="cocktail-count-number cocktail-count-number-results">
          {cocktails.length}
        </span>
        {t('menu.cocktailCountQuiz', { count: cocktails.length })}
      </p>
      <div
        className="cocktail-list carousel"
        role="region"
        aria-label={t('a11y.carousel')}
        aria-roledescription={t('a11y.carouselRoleDesc')}
      >
        {hasResults ? (
          <CocktailCarousel cocktails={cocktails} activeCard={activeCard} />
        ) : (
          <NotFound />
        )}
      </div>
      <p className="explore-menu-cta">
        {t('quiz.notSatisfied')}
        <Link to="/menu" className="explore-menu-link">
          {t('quiz.exploreMenu')}
        </Link>
      </p>
    </div>
  )
}


// import Link from React router DOM
// Bellow results div, Add link pointing to menu
//
