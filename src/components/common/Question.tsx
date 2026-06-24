import { ReactNode, Children } from 'react'

interface QuestionProps {
  question: string
  children: ReactNode
}

export default function Question({ question, children }: QuestionProps): ReactNode {
  const optLength = Children.count(children)
  return (
    <div className={`question-container ${optLength > 5 ? 'two-col' : ''}`}>
      <h2>{question}</h2>
      {children}
    </div>
  )
}
