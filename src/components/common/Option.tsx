import type { ReactNode } from 'react'

interface OptionProps {
  option: string
  selected: boolean
  onSelect: () => void
  isMulti: boolean
}

export default function Option({ option, selected, onSelect, isMulti = false }: OptionProps): ReactNode {
  return (
    <label
      className={`menu-filter-btn quiz-option ${selected ? 'active' : ''}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          onSelect()
        }
      }}
    >
      <input
        type={isMulti ? 'checkbox' : 'radio'}
        checked={selected}
        onChange={onSelect}
        name={isMulti ? undefined : 'quiz-single'}
        style={{ display: 'none' }}
      />
      {option}
    </label>
  )
}
