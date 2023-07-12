import React, { useContext } from 'react'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'
import FormContext from '../../../context/FormContext'
import Question from '../../Form/Question/Question'
import QuestionCondition from '../../Form/QuestionCondition/QuestionCondition'

export function Repeating({ questions, ...props }: any) {
  const { changeHandler, values } = useContext(FormContext)
  const value =
    (values.responses && values?.responses[props.reference]) ||
    values[props.reference]
  const readOnly = props.props?.readOnly

  const changeRepeatHandler = (val: any) => {
    changeHandler(props.reference, val)
  }

  const range = Array.from({ length: 11 }, (val, ind) => ind)

  const numbers = Array.from({ length: value || 0 }, (val, ind) => ind + 1)

  const useButtons = true

  return (
    <>
      Number of:{' '}
      {!readOnly && (
        <select
          className="form-select w-auto d-inline-flex"
          value={value || 0}
          onChange={(e: any) => changeRepeatHandler(e.target.value)}
        >
          {range.map((sub_section: any) => (
            <option key={sub_section} value={sub_section}>
              {sub_section}
            </option>
          ))}
        </select>
      )}
      {readOnly && value}
      {numbers.map((sub_section: any) => (
        <div key={`repeat-${sub_section}`}>
          <DynamicComponent
            component="FormHeading"
            props={{ text: `${props?.props?.question} #${sub_section}` }}
          />
          {questions?.map((child: any) => (
            <QuestionCondition
              key={child.id}
              {...child}
              sub_section={sub_section}
            >
              <Question key={child.id} {...child} sub_section={sub_section} />
            </QuestionCondition>
          ))}
        </div>
      ))}
      {useButtons && !readOnly && (
        <DynamicComponent
          component="Group"
          props={{ position: 'right' }}
          sub={[
            <DynamicComponent
              key="add"
              component="Button"
              props={{
                onClick: () => changeRepeatHandler(Number(value || 0) + 1),
                text: 'Add',
                icon: 'plus',
              }}
            />,
          ]}
        />
      )}
    </>
  )
}

export default Repeating
