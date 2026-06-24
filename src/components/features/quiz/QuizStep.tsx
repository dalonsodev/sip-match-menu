import Question from '../../common/Question'
import Option from '../../common/Option'
import type { QuizQuestion, QuizOption, CurrentQuestion } from '../../../types'

type OptionsType = string[] | {
    value: string;
    label: string;
}[]

interface QuizStepProps {
  question: CurrentQuestion
  options: OptionsType
  getIsSelected: (question: CurrentQuestion, opt: string) => boolean
  onSelect: (value: string) => void
  isMulti: boolean
}

export default function QuizStep({
  question,
  options,
  getIsSelected,
  onSelect,
  isMulti
}: QuizStepProps) {
  return (
    <Question question={question.text}>
      {options.map((item, idx) => {
        const opt = typeof item === 'object' ? item.label : item
        const value = typeof item === 'object' ? item.value : item

        return (
          <Option
            key={idx}
            option={opt}
            selected={getIsSelected(question, value)}
            onSelect={() => onSelect(value)}
            isMulti={isMulti}
          />
        )
      })}
    </Question>
  )
}
