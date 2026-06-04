import { useEffect } from 'react'

/**
 * Listens for clicks outside the component.
 *
 * @param {React.RefObject} ref - Attached to the element to monitor
 * @param {Function} callback - Called when a click outside the referenced element is detected
 * @returns {void}
 */
export default function useClickOutside(ref, callback) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref, callback])
}
