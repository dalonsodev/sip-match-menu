import { useState } from 'react'

/**
 * Returns index of current active card, and the functions to activate/deactivate it.
 */
export default function useActiveCard() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  function activateCard(index: number): void {
    setActiveIndex(index)
  }

  function deactivateCard(): void {
    setActiveIndex(null)
  }

  return {
    activeIndex,
    activateCard,
    deactivateCard
  }
}
