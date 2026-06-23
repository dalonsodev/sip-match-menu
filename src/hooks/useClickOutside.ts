import { RefObject, useEffect } from 'react'

/**
 * Listens for clicks outside the component.
 */
export default function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  callback: () => void
): void {

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && e.target instanceof Node && !ref.current.contains(e.target)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref, callback])
}
