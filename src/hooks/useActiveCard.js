import { useState } from 'react'

/**
 * Returns index of current active card, and the functions to activate/deactivate it.
 *
 * @returns {{ activeIndex: number|null, activateCard: function, deactivateCard: function }}
 */
export default function useActiveCard() {
  const [activeIndex, setActiveIndex] = useState(null)

  function activateCard(index) {
    setActiveIndex(index)
  }

  function deactivateCard() {
    setActiveIndex(null)
  }

  return {
    activeIndex,
    activateCard,
    deactivateCard
  }
}
