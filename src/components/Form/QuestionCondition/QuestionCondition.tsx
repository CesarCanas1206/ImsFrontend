import React, { useContext } from 'react'
import { isEmpty } from '../../../utilities/strings'
import FormContext from '../../../context/FormContext'
import checkConditions from './checkConditions'

export function QuestionCondition({ children, form_props: formProps }: any) {
  const context = useContext(FormContext)

  if (isEmpty(formProps?.condition) && isEmpty(formProps?.conditions)) {
    return <>{children}</>
  }

  const conditions = !isEmpty(formProps.conditions)
    ? formProps.conditions
    : [formProps.condition]

  const show = checkConditions({ conditions, getValue: context?.getValue })

  return <>{show && children}</>
}

export default QuestionCondition
