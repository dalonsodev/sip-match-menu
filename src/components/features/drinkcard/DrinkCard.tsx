import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import useClickOutside from '../../../hooks/useClickOutside'
import DrinkCardHeader from './DrinkCardHeader'
import DrinkCardDetails from './DrinkCardDetails'
import type { ReactNode, SyntheticEvent, KeyboardEvent } from 'react'
import type { Cocktail } from '../../../types'

interface DrinkCardProps {
  cocktail: Cocktail
  isActive: boolean
  onToggle: () => void
}

export default function DrinkCard({ cocktail, isActive, onToggle }: DrinkCardProps): ReactNode {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsExpanded(isActive)
  }, [isActive])

  function handleToggle(e: SyntheticEvent<HTMLElement>): void {
    e.stopPropagation()
    onToggle?.()
    setIsExpanded((prev) => !prev)
  }

  useClickOutside(cardRef, () => {
    if (isExpanded) setIsExpanded(false)
  })

  function handleKeyDown(e: KeyboardEvent<HTMLElement>): void {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      handleToggle(e)
    }
  }

  return (
    <article
      ref={cardRef}
      className={`cocktail-card ${isExpanded ? 'expanded' : ''}`}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
    >
      <div className="cocktail-image-wrapper">
        <img
          src={cocktail.image || cocktail.imageFallback}
          alt={`${cocktail.name} cocktail.`}
          className="cocktail-image"
          loading="lazy"
        />
        <div className="cocktail-overlay">
          <div className="cocktail-heading">
            <DrinkCardHeader isExpanded={isExpanded} name={cocktail.name} t={t} />

            <p className="cocktail-description">
              {t(`description.${cocktail.name}`) || cocktail.description}
            </p>

            <DrinkCardDetails cocktail={cocktail} t={t} />
          </div>
        </div>
      </div>
    </article>
  )
}
