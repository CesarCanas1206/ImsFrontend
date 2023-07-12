import React from 'react'
import Question from '../../Form/Question/Question'
import QuestionCondition from '../../Form/QuestionCondition/QuestionCondition'

export function Rows({ questions, ...props }: any) {
  return (
    <>
      <div className="row">
        {questions?.map((child: any) => (
          <QuestionCondition key={child.id} {...child}>
            <div className="col-6">
              <Question isChild={true} key={child.id} {...child} />
            </div>
          </QuestionCondition>
        ))}
      </div>
    </>
  )
}

export default Rows
